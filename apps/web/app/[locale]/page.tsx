import {
  EventsRail,
  Hero,
  KnowYourRights,
  MembershipBlock,
  MissionBlock,
  ProgramGrid,
  ValuesBlock,
  VisionStrip,
} from '@eclosangeles/ui';
import type { Locale } from '@/i18n/routing';
import { getHomePageContent } from '@/lib/content';
import { withLocalePrefix } from '@/lib/withLocalePrefix';

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const linkPrefix = `/${locale}`;
  const { hero, statements, programs, values, events, knowYourRights, vision, membership } =
    getHomePageContent();

  return (
    <>
      <Hero
        linkPrefix={linkPrefix}
        imageSrc={hero.imageSrc}
        imageAlt={hero.imageAlt}
        tagline={hero.tagline}
        title={hero.title}
        titleEmphasis={hero.titleEmphasis}
        lead={hero.lead}
        ctas={hero.ctas}
        welcomeChip={hero.welcomeChip}
      />
      <MissionBlock statements={statements} />
      <ProgramGrid
        programs={programs.items}
        linkPrefix={linkPrefix}
        eyebrow={programs.eyebrow}
        title={programs.title}
      />
      <ValuesBlock values={values.items} eyebrow={values.eyebrow} title={values.title} />
      <EventsRail
        flyers={events.flyers}
        eyebrow={events.eyebrow}
        title={events.title}
        description={events.description}
        allEventsHref={withLocalePrefix(linkPrefix, events.href, '/events')}
        allEventsLabel={events.allEventsLabel}
      />
      <KnowYourRights videos={knowYourRights.videos} />
      <VisionStrip
        items={vision.items}
        eyebrow={vision.eyebrow}
        title={vision.title}
        description={vision.description}
        ctaLabel={vision.ctaLabel}
        ctaHref={withLocalePrefix(linkPrefix, vision.href, '/membership')}
      />
      <MembershipBlock
        eyebrow={membership.eyebrow}
        title={membership.title}
        description={membership.description}
        joinHref={withLocalePrefix(linkPrefix, membership.href, '/membership')}
      />
    </>
  );
}
