import { fallbackPortfolioPage } from "@/lib/content/fallback";
import type {
  ContactChannel,
  EditableImage,
  EditableLink,
  ExperienceItem,
  NavItem,
  PortfolioPage,
  Project,
  ServiceItem,
  Stat
} from "@/lib/content/types";
import { client, sanityConfigured } from "./client";

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[K] extends object
      ? DeepPartial<T[K]>
      : T[K] | null;
};

const PORTFOLIO_QUERY = `*[_type == "portfolioPage" && _id == "portfolioPage"][0]{
  seoTitle,
  seoDescription,
  brandName,
  brandTagline,
  navItems[]{label, anchor},
  hero{
    eyebrow,
    headline,
    subheadline,
    primaryCta{label, href, isExternal},
    secondaryCta{label, href, isExternal},
    image{..., alt},
    stats[]{value, label},
    marquee
  },
  about{
    eyebrow,
    title,
    body,
    image{..., alt},
    callouts[]{value, label}
  },
  services{
    eyebrow,
    title,
    description,
    items[]{eyebrow, title, description, tags}
  },
  projects{
    eyebrow,
    title,
    description,
    "items": select(
      count(items) > 0 => items[]->{
        _id,
        title,
        slug,
        excerpt,
        category,
        year,
        image{..., alt},
        tags,
        link{label, href, isExternal},
        accent
      },
      *[_type == "project" && featured == true] | order(orderRank asc, year desc)[0...6]{
        _id,
        title,
        slug,
        excerpt,
        category,
        year,
        image{..., alt},
        tags,
        link{label, href, isExternal},
        accent
      }
    )
  },
  experience{
    eyebrow,
    title,
    description,
    "items": select(
      count(items) > 0 => items[]->{
        _id,
        role,
        company,
        timeframe,
        summary,
        tags,
        link{label, href, isExternal}
      },
      *[_type == "experience"] | order(orderRank asc, timeframe desc)[0...8]{
        _id,
        role,
        company,
        timeframe,
        summary,
        tags,
        link{label, href, isExternal}
      }
    )
  },
  contact{
    eyebrow,
    title,
    description,
    availabilityLabel,
    availabilityText,
    channels[]{label, href, detail},
    primaryCta{label, href, isExternal}
  },
  footer{
    note,
    links[]{label, href, isExternal}
  }
}`;

export async function getPortfolioPage(): Promise<PortfolioPage> {
  if (!sanityConfigured) {
    return fallbackPortfolioPage;
  }

  try {
    const data = await client.fetch<DeepPartial<PortfolioPage> | null>(
      PORTFOLIO_QUERY,
      {},
      { next: { revalidate: 60 } }
    );

    return data ? mergeWithFallback(data) : fallbackPortfolioPage;
  } catch {
    return fallbackPortfolioPage;
  }
}

function hasItems<T>(items?: T[] | null): items is T[] {
  return Array.isArray(items) && items.length > 0;
}

function withFallback<T>(value: T | null | undefined, fallback: T): T {
  return value ?? fallback;
}

function mergeLink(
  link: DeepPartial<EditableLink> | undefined,
  fallback: EditableLink
): EditableLink {
  return {
    label: withFallback(link?.label, fallback.label),
    href: withFallback(link?.href, fallback.href),
    isExternal: withFallback(link?.isExternal, fallback.isExternal)
  };
}

function mergeWithFallback(data: DeepPartial<PortfolioPage>): PortfolioPage {
  const fallback = fallbackPortfolioPage;

  return {
    seoTitle: withFallback(data.seoTitle, fallback.seoTitle),
    seoDescription: withFallback(data.seoDescription, fallback.seoDescription),
    brandName: withFallback(data.brandName, fallback.brandName),
    brandTagline: withFallback(data.brandTagline, fallback.brandTagline),
    navItems: hasItems(data.navItems)
      ? (data.navItems as NavItem[])
      : fallback.navItems,
    hero: {
      eyebrow: withFallback(data.hero?.eyebrow, fallback.hero.eyebrow),
      headline: withFallback(data.hero?.headline, fallback.hero.headline),
      subheadline: withFallback(
        data.hero?.subheadline,
        fallback.hero.subheadline
      ),
      primaryCta: mergeLink(data.hero?.primaryCta, fallback.hero.primaryCta),
      secondaryCta: mergeLink(
        data.hero?.secondaryCta,
        fallback.hero.secondaryCta
      ),
      image: (data.hero?.image as EditableImage | undefined) ?? fallback.hero.image,
      stats: hasItems(data.hero?.stats)
        ? (data.hero?.stats as Stat[])
        : fallback.hero.stats,
      marquee: hasItems(data.hero?.marquee)
        ? (data.hero?.marquee as string[])
        : fallback.hero.marquee
    },
    about: {
      eyebrow: withFallback(data.about?.eyebrow, fallback.about.eyebrow),
      title: withFallback(data.about?.title, fallback.about.title),
      body: withFallback(data.about?.body, fallback.about.body),
      image: (data.about?.image as EditableImage | undefined) ?? fallback.about.image,
      callouts: hasItems(data.about?.callouts)
        ? (data.about?.callouts as Stat[])
        : fallback.about.callouts
    },
    services: {
      eyebrow: withFallback(data.services?.eyebrow, fallback.services.eyebrow),
      title: withFallback(data.services?.title, fallback.services.title),
      description: withFallback(
        data.services?.description,
        fallback.services.description
      ),
      items: hasItems(data.services?.items)
        ? (data.services?.items as ServiceItem[])
        : fallback.services.items
    },
    projects: {
      eyebrow: withFallback(data.projects?.eyebrow, fallback.projects.eyebrow),
      title: withFallback(data.projects?.title, fallback.projects.title),
      description: withFallback(
        data.projects?.description,
        fallback.projects.description
      ),
      items: hasItems(data.projects?.items)
        ? (data.projects?.items as Project[])
        : fallback.projects.items
    },
    experience: {
      eyebrow: withFallback(
        data.experience?.eyebrow,
        fallback.experience.eyebrow
      ),
      title: withFallback(data.experience?.title, fallback.experience.title),
      description: withFallback(
        data.experience?.description,
        fallback.experience.description
      ),
      items: hasItems(data.experience?.items)
        ? (data.experience?.items as ExperienceItem[])
        : fallback.experience.items
    },
    contact: {
      eyebrow: withFallback(data.contact?.eyebrow, fallback.contact.eyebrow),
      title: withFallback(data.contact?.title, fallback.contact.title),
      description: withFallback(
        data.contact?.description,
        fallback.contact.description
      ),
      availabilityLabel: withFallback(
        data.contact?.availabilityLabel,
        fallback.contact.availabilityLabel
      ),
      availabilityText: withFallback(
        data.contact?.availabilityText,
        fallback.contact.availabilityText
      ),
      channels: hasItems(data.contact?.channels)
        ? (data.contact?.channels as ContactChannel[])
        : fallback.contact.channels,
      primaryCta: mergeLink(
        data.contact?.primaryCta,
        fallback.contact.primaryCta
      )
    },
    footer: {
      note: withFallback(data.footer?.note, fallback.footer.note),
      links: hasItems(data.footer?.links)
        ? (data.footer?.links as EditableLink[])
        : fallback.footer.links
    }
  };
}
