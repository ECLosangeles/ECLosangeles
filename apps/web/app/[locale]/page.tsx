import {
  EventsRail,
  Hero,
  KnowYourRights,
  MembershipBlock,
  MissionBlock,
  OriginStory,
  ProgramGrid,
  ValuesBlock,
  VisionStrip,
} from '@eclosangeles/ui';
import { TIMELINE, VALUES, VISION } from '@/lib/mock-data';
import type { Locale } from '@/i18n/routing';
import { getHomePageContent } from '@/lib/sanity/home';
import { withLocalePrefix } from '@/lib/withLocalePrefix';

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const linkPrefix = `/${locale}`;
  const content = await getHomePageContent(locale);
  const hero = content?.hero;
  const mission = content?.mission;
  const programs = content?.programs;
  const values = content?.values;
  const originStory = content?.originStory;
  const events = content?.events;
  const knowYourRights = content?.knowYourRights;
  const vision = content?.vision;
  const membership = content?.membership;

  return (
    <>
      <Hero
        linkPrefix={linkPrefix}
        imageSrc={hero?.imageSrc || undefined}
        imageAlt={hero?.imageAlt || undefined}
        tagline={hero?.tagline || undefined}
        title={hero?.title || undefined}
        titleEmphasis={hero?.titleEmphasis || undefined}
        lead={hero?.lead || undefined}
        ctas={hero?.ctas?.length ? hero.ctas : undefined}
        notes={hero?.notes?.length ? hero.notes : undefined}
        welcomeChip={hero?.welcomeChip || undefined}
      />
      <MissionBlock
        eyebrow={mission?.eyebrow || undefined}
        mission={mission?.statement || undefined}
        tagline={mission?.tagline || undefined}
      />
      {programs?.items?.length ? (
        <ProgramGrid
          programs={programs.items}
          linkPrefix={linkPrefix}
          eyebrow={programs.eyebrow || undefined}
          title={programs.title || undefined}
        />
      ) : null}
      <ValuesBlock
        values={values?.items?.length ? values.items : VALUES}
        eyebrow={values?.eyebrow || undefined}
        title={values?.title || undefined}
      />
      <OriginStory
        timeline={originStory?.timeline?.length ? originStory.timeline : TIMELINE}
        eyebrow={originStory?.eyebrow || undefined}
        title={originStory?.title || undefined}
        paragraphs={originStory?.paragraphs?.length ? originStory.paragraphs : undefined}
        readMoreHref={withLocalePrefix(linkPrefix, originStory?.href, '/about')}
        readMoreLabel={originStory?.readMoreLabel || undefined}
      />
      <EventsRail
        flyers={events?.flyers?.length ? events.flyers : []}
        eyebrow={events?.eyebrow || undefined}
        title={events?.title || undefined}
        description={events?.description || undefined}
        allEventsHref={withLocalePrefix(linkPrefix, events?.href, '/events')}
        allEventsLabel={events?.allEventsLabel || undefined}
      />
      <KnowYourRights
        videos={knowYourRights?.videos?.length ? knowYourRights.videos : []}
        eyebrow={knowYourRights?.eyebrow || undefined}
        title={knowYourRights?.title || undefined}
        description={knowYourRights?.description || undefined}
      />
      <VisionStrip
        items={vision?.items?.length ? vision.items : VISION}
        eyebrow={vision?.eyebrow || undefined}
        title={vision?.title || undefined}
        description={vision?.description || undefined}
        ctaLabel={vision?.ctaLabel || undefined}
        ctaHref={withLocalePrefix(linkPrefix, vision?.href, '/membership')}
      />
      <MembershipBlock
        eyebrow={membership?.eyebrow || undefined}
        title={membership?.title || undefined}
        description={membership?.description || undefined}
        joinHref={withLocalePrefix(linkPrefix, membership?.href, '/membership')}
      />
    </>
  );
}
