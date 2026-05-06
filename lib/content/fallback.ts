import type { PortfolioPage } from "./types";

const marketImage = "/portfolio-market.png";

export const fallbackPortfolioPage: PortfolioPage = {
  seoTitle: "Alex Carter | Product-minded creative developer",
  seoDescription:
    "A modern personal portfolio for a design engineer, powered by Next.js, Sanity, Tailwind CSS, and Framer Motion.",
  brandName: "Alex Carter",
  brandTagline: "Design engineer and launch partner",
  navItems: [
    { label: "About", anchor: "#about" },
    { label: "Services", anchor: "#services" },
    { label: "Projects", anchor: "#projects" },
    { label: "Experience", anchor: "#experience" },
    { label: "Contact", anchor: "#contact" }
  ],
  hero: {
    eyebrow: "Open late for ambitious launches",
    headline: "Alex Carter stocks bold digital products with a human pulse.",
    subheadline:
      "A personal portfolio for a hands-on creative technologist who turns fuzzy product ideas into polished websites, brand systems, and launch-ready experiences.",
    primaryCta: { label: "Start a Project", href: "mailto:hello@example.com" },
    secondaryCta: { label: "Browse the Shelf", href: "#projects" },
    image: {
      fallbackSrc: marketImage,
      alt: "Original dark editorial shelf of fictional creative products"
    },
    stats: [
      { value: "10+", label: "years shipping digital products" },
      { value: "42", label: "launches packaged with care" },
      { value: "3", label: "sweet spots: strategy, design, code" }
    ],
    marquee: [
      "Product strategy",
      "Editorial web design",
      "Frontend systems",
      "Sanity CMS",
      "Motion details",
      "Launch support"
    ]
  },
  about: {
    eyebrow: "Behind the counter",
    title: "Part strategist, part designer, part code-floor closer.",
    body:
      "I build premium web experiences for founders, studios, and teams that need the craft of a boutique shop with the speed of a launch room. The work blends sharp positioning, tactile interfaces, accessible frontend systems, and CMS workflows clients can actually use.",
    image: {
      fallbackSrc: marketImage,
      alt: "Shelf detail with original portfolio packaging imagery"
    },
    callouts: [
      { value: "Taste", label: "Editorial direction, hierarchy, and brand feel" },
      { value: "Systems", label: "Reusable components, clean content models, resilient UI" },
      { value: "Momentum", label: "Fast prototypes that survive the real launch" }
    ]
  },
  services: {
    eyebrow: "Counter specials",
    title: "Services packed like the good stuff on the top shelf.",
    description:
      "Choose a focused sprint or combine aisles for a full identity-to-launch build.",
    items: [
      {
        eyebrow: "Aisle 01",
        title: "Editorial Websites",
        description:
          "Bold portfolio, studio, and product sites with art direction, responsive systems, animation, and Vercel deployment.",
        tags: ["Next.js", "Tailwind", "Motion"]
      },
      {
        eyebrow: "Aisle 02",
        title: "CMS Architecture",
        description:
          "Sanity schemas, previews, and author-friendly content controls that keep every headline, image, and link editable.",
        tags: ["Sanity", "GROQ", "Content Ops"]
      },
      {
        eyebrow: "Aisle 03",
        title: "Product Prototypes",
        description:
          "Clickable, investor-ready flows that test messaging, interaction patterns, and technical direction before the build gets heavy.",
        tags: ["UX", "React", "Strategy"]
      },
      {
        eyebrow: "Aisle 04",
        title: "Launch Polish",
        description:
          "Performance tuning, accessibility passes, animation refinement, QA, analytics, and handoff docs for calm launch days.",
        tags: ["A11y", "QA", "Vercel"]
      }
    ]
  },
  projects: {
    eyebrow: "Featured projects",
    title: "Recent goods from the cold case.",
    description:
      "Each case study can be edited in Sanity with custom imagery, links, categories, years, and tags.",
    items: [
      {
        _id: "fallback-project-1",
        title: "Northstar Pantry",
        excerpt:
          "A premium content hub and lead-generation system for a climate analytics startup entering a crowded market.",
        category: "SaaS Website",
        year: "2026",
        image: {
          fallbackSrc: marketImage,
          alt: "Original product shelf visual for Northstar Pantry"
        },
        tags: ["Positioning", "Next.js", "CMS"],
        link: { label: "View Case Study", href: "#" },
        accent: "#ef3e36"
      },
      {
        _id: "fallback-project-2",
        title: "Parcel Club",
        excerpt:
          "A playful storefront and member portal for a local delivery collective with weekly drops and editorial inventory.",
        category: "Commerce",
        year: "2025",
        image: {
          fallbackSrc: marketImage,
          alt: "Original product shelf visual for Parcel Club"
        },
        tags: ["Art Direction", "React", "Systems"],
        link: { label: "View Case Study", href: "#" },
        accent: "#f3c623"
      },
      {
        _id: "fallback-project-3",
        title: "Signal Room",
        excerpt:
          "An internal operating dashboard redesigned around faster scanning, cleaner content models, and executive-ready reporting.",
        category: "Product UI",
        year: "2025",
        image: {
          fallbackSrc: marketImage,
          alt: "Original product shelf visual for Signal Room"
        },
        tags: ["Dashboard", "UX", "Frontend"],
        link: { label: "View Case Study", href: "#" },
        accent: "#1ba784"
      }
    ]
  },
  experience: {
    eyebrow: "Shelf history",
    title: "A career built across brand, product, and frontend delivery.",
    description:
      "Replace these entries with roles, residencies, collaborations, or client chapters in Sanity.",
    items: [
      {
        _id: "fallback-exp-1",
        role: "Independent Design Engineer",
        company: "Alex Carter Studio",
        timeframe: "2022 - Present",
        summary:
          "Partnered with early-stage teams and creative studios to turn strategy into fast, distinctive, CMS-powered digital launches.",
        tags: ["Strategy", "Design Systems", "Next.js"]
      },
      {
        _id: "fallback-exp-2",
        role: "Senior Frontend Developer",
        company: "Market Lane Labs",
        timeframe: "2019 - 2022",
        summary:
          "Led frontend architecture for content-heavy product experiences, improving speed, accessibility, and editorial flexibility.",
        tags: ["React", "Performance", "A11y"]
      },
      {
        _id: "fallback-exp-3",
        role: "Brand Systems Designer",
        company: "Counterform Studio",
        timeframe: "2016 - 2019",
        summary:
          "Built visual systems, campaign pages, and interactive prototypes for founders preparing high-stakes releases.",
        tags: ["Identity", "Prototyping", "Launches"]
      }
    ]
  },
  contact: {
    eyebrow: "Ring the bell",
    title: "Bring a rough idea. Leave with the good stuff.",
    description:
      "Available for focused website builds, Sanity migrations, launch polish, and product storytelling sprints.",
    availabilityLabel: "Currently booking",
    availabilityText: "June and July build slots",
    channels: [
      {
        label: "Email",
        href: "mailto:hello@example.com",
        detail: "hello@example.com"
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com",
        detail: "Professional updates"
      },
      {
        label: "Calendar",
        href: "https://cal.com",
        detail: "Book a 20 minute intro"
      }
    ],
    primaryCta: { label: "Send a Brief", href: "mailto:hello@example.com" }
  },
  footer: {
    note: "Original portfolio concept. Built with Next.js, Tailwind CSS, Framer Motion, Sanity, and Vercel.",
    links: [
      { label: "Email", href: "mailto:hello@example.com" },
      { label: "LinkedIn", href: "https://www.linkedin.com", isExternal: true },
      { label: "GitHub", href: "https://github.com", isExternal: true }
    ]
  }
};
