import {createReadStream} from 'node:fs'
import path from 'node:path'
import {getCliClient} from 'sanity/cli'
import {PROGRAMS} from './programData'

type UploadedImage = {
  _id: string
}

const client = getCliClient({apiVersion: '2026-05-13'})

const webPublicDir = path.resolve(process.cwd(), '..', 'apps', 'web', 'public')

async function uploadImage(relativePath: string) {
  const filename = path.basename(relativePath)
  const filePath = path.join(webPublicDir, relativePath)
  const asset = (await client.assets.upload('image', createReadStream(filePath), {
    filename,
    source: {
      name: 'ECLA website seed',
      id: relativePath,
    },
  })) as UploadedImage

  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
  }
}

async function buildHomePage() {
  const [
    heroImage,
    inclusivenessImage,
    diversityImage,
    transparencyImage,
    accountabilityImage,
    intergenerationalImage,
    responsivenessImage,
    servantLeadershipImage,
    teamworkImage,
  ] = await Promise.all([
    uploadImage('brand/hero.png'),
    uploadImage('brand/values/Inclusiveness.PNG'),
    uploadImage('brand/values/diversity.PNG'),
    uploadImage('brand/values/transparency.PNG'),
    uploadImage('brand/values/accountability.PNG'),
    uploadImage('brand/values/intergenerational_interaction.PNG'),
    uploadImage('brand/values/community_responsiveness.PNG'),
    uploadImage('brand/values/servantleadership.PNG'),
    uploadImage('brand/values/teamwork.PNG'),
  ])

  const programItems = await Promise.all(
    PROGRAMS.map(async (program) => {
      const icon = await uploadImage(program.iconPath)

      return {
        _key: program.slug,
        title: program.title,
        slug: {_type: 'slug', current: program.slug},
        summary: program.summary,
        glyph: program.glyph,
        tone: program.tone,
        icon: {...icon, alt: program.iconAlt},
      }
    }),
  )

  return {
    _id: 'homePage',
    _type: 'homePage',
    title: 'Home Page',
    hero: {
      tagline: 'Serving Greater LA since 2019',
      title: 'A trusted neighbor for Ethiopian families across',
      titleEmphasis: 'Greater Los Angeles',
      lead: "An inclusive, nonpolitical, nonreligious civic organization - supporting our community's social, economic, educational, health, and cultural needs.",
      welcomeChip: 'እንኳን ደህና መጣችሁ',
      image: {
        ...heroImage,
        alt: 'Ethiopian Community Los Angeles members gathered together',
      },
      ctas: [
        {label: 'Donate', href: '/donate'},
        {label: 'Become a member', href: '/membership'},
        {label: 'Volunteer', href: '/about'},
        {label: 'Get services ->', href: '/programs'},
      ],
      notes: [
        {label: '501(c)(3)', body: 'Volunteer-powered community care'},
        {label: 'Greater LA', body: 'Services, culture, and family support'},
      ],
    },
    mission: {
      eyebrow: 'Our mission',
      statement:
        'To address the social, economic, educational, health, immigration, and cultural needs of Ethiopian immigrants in Greater Los Angeles - and to promote the cultural heritage of Ethiopia at large.',
      tagline: 'Inclusive - Nonpolitical - Nonreligious',
    },
    programs: {
      eyebrow: 'What we do',
      title: 'Programs that meet you where you are.',
      items: programItems,
    },
    values: {
      eyebrow: 'What we stand for',
      title: 'Eight values, lived - not laminated.',
      items: [
        {
          order: 1,
          name: 'Inclusiveness',
          image: {...inclusivenessImage, alt: 'Community members gathered together'},
          description:
            'Every member of the community belongs at ECLA, regardless of background, faith, or politics.',
        },
        {
          order: 2,
          name: 'Diversity',
          image: {...diversityImage, alt: 'Diverse community gathering'},
          description:
            'Our strength is the range of voices, generations, and experiences in our community.',
        },
        {
          order: 3,
          name: 'Transparency',
          image: {...transparencyImage, alt: 'Open community conversation'},
          description:
            'Open about our finances, our decisions, and our limits. Annual reports and bylaws are public.',
        },
        {
          order: 4,
          name: 'Accountability',
          image: {...accountabilityImage, alt: 'Community accountability moment'},
          description: 'We answer to our members and to the community we serve.',
        },
        {
          order: 5,
          name: 'Intergenerational interaction',
          image: {...intergenerationalImage, alt: 'Elders and youth connecting'},
          description:
            'Elders and youth learn from each other - programs are built across generations, not in silos.',
        },
        {
          order: 6,
          name: 'Community responsiveness',
          image: {...responsivenessImage, alt: 'Community members responding together'},
          description:
            'We listen first. Programs grow from what members ask for, not what we assume they need.',
        },
        {
          order: 7,
          name: 'Servant leadership',
          image: {...servantLeadershipImage, alt: 'Volunteer leadership in action'},
          description:
            "Our board and volunteers serve - they don't direct. ECLA is 100% volunteer-powered.",
        },
        {
          order: 8,
          name: 'Teamwork',
          image: {...teamworkImage, alt: 'Teamwork at a community event'},
          description:
            'No one carries it alone. Every event, every program, is built by many hands.',
        },
      ],
    },
    originStory: {
      eyebrow: 'Our story',
      title: 'Built by neighbors, in a town hall.',
      paragraphs: [
        'ECLA started in conversations between Ethiopian Angelenos who saw their neighbors falling through the cracks - language barriers at the DMV, parents unsure how to enroll a child, elders missing benefits they qualified for.',
        "On September 28, 2019, those conversations became a town hall. By the end of the meeting, eleven volunteers had been elected to a founding board. Six months later, the pandemic arrived - and ECLA's first major work became bilingual health panels for community members navigating COVID in their second language.",
      ],
      readMoreLabel: 'Read the full history',
      href: '/about',
      timeline: [
        {
          date: 'Sep 2019',
          body: 'Town hall meeting brings the community together to discuss forming an organization.',
        },
        {
          date: 'Oct 2019',
          body: 'Eleven-member founding board elected. ECLA officially begins.',
        },
        {
          date: '2020',
          body: 'Operations shift virtual during COVID-19. Bilingual community health panels launch.',
        },
        {
          date: '2021-2022',
          body: 'Subcommittees form. Programs expand to immigration, mental health, and youth.',
        },
        {
          date: 'Today',
          body: 'Seven program areas serving Ethiopian families across Greater Los Angeles.',
        },
      ],
    },
    events: {
      eyebrow: 'Community events',
      title: "What's happening at ECLA",
      description:
        'Coffee mornings, book signings, festivals, conferences, galas - community life happens in person.',
      allEventsLabel: 'All events ->',
      href: '/events',
    },
    vision: {
      eyebrow: "Where we're going",
      title: 'Programs in motion - and on the way.',
      description:
        'Some of these are running today. Some are next on the roadmap. Volunteer time and member dues fund every one of them.',
      ctaLabel: 'Get involved ->',
      href: '/membership',
      items: [
        'Health fairs',
        'Weekly Amharic lessons',
        'STEM lab',
        'Youth mentorship',
        'Job fairs',
        'College counseling',
        'Mental health counseling',
        'Elder engagement',
        'Legal support services',
      ],
    },
    membership: {
      eyebrow: 'Membership',
      title: 'Join us. The community runs on its members.',
      description:
        'Members vote on board elections, get a say in priorities, and help fund every program ECLA runs.',
      href: '/membership',
    },
  }
}

/**
 * This script deliberately does NOT delete the documents left over from the
 * bilingual setup (`homePage-en`, `homePage-am`, and the Studio-generated
 * Amharic page). They hold real translation work, and an earlier version of
 * this script removed them sight-unseen.
 *
 * They are harmless: the website loads the fixed `homePage` id rather than
 * `*[_type == "homePage"][0]`, so a leftover document can never be served by
 * accident. A snapshot lives in `legacy/` if the dataset is ever tidied.
 */
async function seed() {
  const document = await buildHomePage()

  await client.createOrReplace(document)
  console.log(`Seeded ${document._id}`)
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
