export type EditableLink = {
  label: string;
  href: string;
  isExternal?: boolean;
};

export type EditableImage = {
  asset?: {
    _ref?: string;
    _type?: string;
  };
  alt?: string;
  fallbackSrc?: string;
};

export type NavItem = {
  label: string;
  anchor: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type ServiceItem = {
  eyebrow: string;
  title: string;
  description: string;
  tags: string[];
};

export type Project = {
  _id?: string;
  title: string;
  slug?: {
    current?: string;
  };
  excerpt: string;
  category: string;
  year: string;
  image?: EditableImage;
  tags: string[];
  link?: EditableLink;
  accent?: string;
};

export type ExperienceItem = {
  _id?: string;
  role: string;
  company: string;
  timeframe: string;
  summary: string;
  tags: string[];
  link?: EditableLink;
};

export type ContactChannel = {
  label: string;
  href: string;
  detail: string;
};

export type PortfolioPage = {
  seoTitle: string;
  seoDescription: string;
  brandName: string;
  brandTagline: string;
  navItems: NavItem[];
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    primaryCta: EditableLink;
    secondaryCta: EditableLink;
    image?: EditableImage;
    stats: Stat[];
    marquee: string[];
  };
  about: {
    eyebrow: string;
    title: string;
    body: string;
    image?: EditableImage;
    callouts: Stat[];
  };
  services: {
    eyebrow: string;
    title: string;
    description: string;
    items: ServiceItem[];
  };
  projects: {
    eyebrow: string;
    title: string;
    description: string;
    items: Project[];
  };
  experience: {
    eyebrow: string;
    title: string;
    description: string;
    items: ExperienceItem[];
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    availabilityLabel: string;
    availabilityText: string;
    channels: ContactChannel[];
    primaryCta: EditableLink;
  };
  footer: {
    note: string;
    links: EditableLink[];
  };
};
