import Image from 'next/image';
import { MOTIF_SRCS } from '../brand';
import styles from './PageMotifs.module.css';

export interface PageMotifsProps {
  /**
   * Anything stable and unique to the page — the pathname is ideal. The same
   * seed always produces the same scatter, which is what keeps the server and
   * client renders identical and stops the motifs jumping between visits.
   */
  seed: string;
  /** How many motifs to scatter down the page. */
  count?: number;
}

interface Placement {
  src: string;
  /** Percentage down the page. */
  top: number;
  /** Distance from the nearest edge, in px. Negative bleeds off-page. */
  inset: number;
  side: 'left' | 'right';
  size: number;
  rotate: number;
  opacity: number;
}

/** FNV-1a. Any cheap, stable string -> int would do. */
function hashSeed(seed: string): number {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/** mulberry32 — small, deterministic, and good enough for scattering artwork. */
function makeRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const between = (random: () => number, min: number, max: number): number =>
  min + random() * (max - min);

/**
 * Builds the scatter.
 *
 * The page is split into equal horizontal bands and one motif is dropped inside
 * each, alternating sides. That reads as random while guaranteeing they stay
 * spread out — true random placement clumps, and clumps look like a mistake.
 */
function buildPlacements(seed: string, count: number): ReadonlyArray<Placement> {
  const random = makeRandom(hashSeed(seed));
  const band = 100 / count;

  // Deal the three motifs out evenly, then shuffle — sorting on a random key
  // drawn per item, which is a real shuffle, unlike a random comparator — so
  // pages don't all open with the same one.
  const pool: string[] = [];
  while (pool.length < count) pool.push(...MOTIF_SRCS);
  const sources = pool
    .slice(0, count)
    .map((src) => ({ src, key: random() }))
    .sort((a, b) => a.key - b.key)
    .map((entry) => entry.src);

  const startOnLeft = random() < 0.5;

  return sources.map((src, index) => ({
    src,
    top: band * index + between(random, band * 0.15, band * 0.7),
    inset: Math.round(between(random, -70, 8)),
    side: (index % 2 === 0) === startOnLeft ? 'left' : 'right',
    size: Math.round(between(random, 116, 188)),
    rotate: Math.round(between(random, -24, 24)),
    opacity: Number(between(random, 0.1, 0.16).toFixed(3)),
  }));
}

/**
 * The cultural motifs — lion, sun, jebena — scattered down a page as a
 * background theme.
 *
 * Rendered as an overlay rather than behind the content: every section on this
 * site paints an opaque background, so anything underneath would be invisible.
 * `mix-blend-mode: multiply` at a low opacity keeps them reading as a tint over
 * the page instead of a sticker on top of it, and the layer never takes a
 * pointer event. Purely decorative, so it is hidden from assistive tech.
 *
 * Hidden on narrow screens, where there is no margin for artwork to sit in
 * without landing on the text.
 */
export function PageMotifs({ seed, count = 6 }: PageMotifsProps) {
  const placements = buildPlacements(seed, count);

  return (
    <div className={styles.layer} aria-hidden="true">
      {placements.map((placement, index) => (
        <Image
          // Placements are positional, not identified by anything else.
          key={`${placement.src}-${index}`}
          className={styles.motif}
          src={placement.src}
          alt=""
          width={placement.size}
          height={placement.size}
          style={{
            top: `${placement.top}%`,
            [placement.side]: `${placement.inset}px`,
            width: `${placement.size}px`,
            opacity: placement.opacity,
            transform: `rotate(${placement.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}
