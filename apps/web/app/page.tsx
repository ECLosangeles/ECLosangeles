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
import { getHomePageContent } from '@/lib/content';

export default async function HomePage() {
  const { hero, statements, programs, values, events, knowYourRights, vision, membership } =
    await getHomePageContent();

  return (
    <>
      <Hero
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
      <ProgramGrid programs={programs.items} eyebrow={programs.eyebrow} title={programs.title} />
      <ValuesBlock values={values.items} eyebrow={values.eyebrow} title={values.title} />
      <EventsRail
        flyers={events.flyers}
        eyebrow={events.eyebrow}
        title={events.title}
        description={events.description}
        allEventsHref={events.href || '/events'}
        allEventsLabel={events.allEventsLabel}
      />
      <KnowYourRights videos={knowYourRights.videos} />
      <VisionStrip
        items={vision.items}
        eyebrow={vision.eyebrow}
        title={vision.title}
        description={vision.description}
        ctaLabel={vision.ctaLabel}
        ctaHref={vision.href || '/membership'}
      />
      <MembershipBlock
        eyebrow={membership.eyebrow}
        title={membership.title}
        description={membership.description}
        joinHref={membership.href || '/membership'}
      />
    </>
  );
}
