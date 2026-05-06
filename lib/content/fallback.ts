import type { PortfolioPage } from "./types";

const marketImage = "/portfolio-market.png";

export const fallbackPortfolioPage: PortfolioPage = {
  seoTitle: "Alex Carter | Data Analyst & AI Generalist",
  seoDescription:
    "A retro AI office portfolio for a data analyst and AI consultant helping teams automate workflows, build dashboards, and make better decisions.",
  brandName: "Alex Carter",
  brandTagline: "Data Analyst / AI Generalist",
  navItems: [
    { label: "About", anchor: "#about" },
    { label: "Services", anchor: "#services" },
    { label: "Projects", anchor: "#projects" },
    { label: "Experience", anchor: "#experience" },
    { label: "Contact", anchor: "#contact" }
  ],
  hero: {
    eyebrow: "Retro AI Office now processing",
    headline: "I turn messy business data into AI-powered operating systems.",
    subheadline:
      "I help businesses implement AI, automate workflows, build data pipelines, create dashboards, and improve decision-making with practical analytics systems.",
    primaryCta: { label: "Send a Brief", href: "mailto:hello@example.com" },
    secondaryCta: { label: "Tour Services", href: "#services" },
    image: {
      fallbackSrc: marketImage,
      alt: "Original dark editorial shelf of fictional creative products"
    },
    stats: [
      { value: "AI", label: "workflow automation and practical agents" },
      { value: "BI", label: "dashboards, metrics, and decision systems" },
      { value: "ELT", label: "pipelines from raw tools to clean reporting" }
    ],
    marquee: [
      "AI automation",
      "Data pipelines",
      "Executive dashboards",
      "Workflow systems",
      "CRM cleanup",
      "Forecasting",
      "RAG assistants",
      "Decision intelligence"
    ]
  },
  about: {
    eyebrow: "Employee record",
    title: "Part analyst, part systems thinker, part AI implementation desk.",
    body:
      "I work with founders and teams who know their operations could be smarter, but need someone to connect the dots between business process, data quality, dashboards, and AI automation. My work is practical: clean inputs, useful interfaces, human review, and measurable time saved.",
    image: {
      fallbackSrc: marketImage,
      alt: "Shelf detail with original portfolio packaging imagery"
    },
    callouts: [
      { value: "Audit", label: "Map business workflows, data sources, gaps, and automation opportunities." },
      { value: "Build", label: "Create pipelines, dashboards, AI assistants, and repeatable operating systems." },
      { value: "Adopt", label: "Document, train, and refine so teams actually use the new system." }
    ]
  },
  services: {
    eyebrow: "Department directory",
    title: "AI and data services by department.",
    description:
      "Move through the Retro AI Office to see where I help teams improve visibility, automate repetitive work, and make faster decisions.",
    items: [
      {
        eyebrow: "Desk 01",
        title: "AI Workflow Automation",
        description:
          "Automations for approvals, reporting, document processing, CRM updates, intake forms, and recurring admin work.",
        tags: ["AI Agents", "Zapier", "Make"]
      },
      {
        eyebrow: "Desk 02",
        title: "Dashboards and BI",
        description:
          "Executive dashboards and operational reports that make KPIs, bottlenecks, revenue, and forecasts easier to read.",
        tags: ["Power BI", "Looker", "Sheets"]
      },
      {
        eyebrow: "Desk 03",
        title: "Data Pipelines",
        description:
          "ELT/ETL workflows that clean exports, connect systems, standardize metrics, and reduce manual spreadsheet work.",
        tags: ["SQL", "Python", "APIs"]
      },
      {
        eyebrow: "Desk 04",
        title: "AI Consulting",
        description:
          "AI readiness audits, tool selection, implementation plans, guardrails, prompt systems, and team enablement.",
        tags: ["Strategy", "RAG", "Training"]
      }
    ]
  },
  projects: {
    eyebrow: "Proof of work",
    title: "Case files from the analytics cabinet.",
    description:
      "Each case study can be edited in Sanity with custom imagery, links, categories, years, and tags.",
    items: [
      {
        _id: "fallback-project-1",
        title: "Northstar Pantry",
        excerpt:
          "A decision dashboard that combined marketing, revenue, and finance exports into one executive operating view.",
        category: "BI Dashboard",
        year: "2026",
        image: {
          fallbackSrc: marketImage,
          alt: "Original product shelf visual for Northstar Pantry"
        },
        tags: ["Power BI", "ELT", "KPI Design"],
        link: { label: "View Case Study", href: "#" },
        accent: "#ef3e36"
      },
      {
        _id: "fallback-project-2",
        title: "Parcel Club",
        excerpt:
          "A workflow automation system for intake, routing, follow-ups, and weekly performance reporting.",
        category: "Automation",
        year: "2025",
        image: {
          fallbackSrc: marketImage,
          alt: "Original product shelf visual for Parcel Club"
        },
        tags: ["Make", "CRM", "Ops"],
        link: { label: "View Case Study", href: "#" },
        accent: "#f3c623"
      },
      {
        _id: "fallback-project-3",
        title: "Signal Room",
        excerpt:
          "A prototype AI assistant for searching internal SOPs, summarizing requests, and escalating exceptions.",
        category: "AI Assistant",
        year: "2025",
        image: {
          fallbackSrc: marketImage,
          alt: "Original product shelf visual for Signal Room"
        },
        tags: ["RAG", "Docs", "Review Loop"],
        link: { label: "View Case Study", href: "#" },
        accent: "#1ba784"
      }
    ]
  },
  experience: {
    eyebrow: "Work history",
    title: "Experience across analytics, automation, and AI implementation.",
    description:
      "Replace these entries with roles, residencies, collaborations, or client chapters in Sanity.",
    items: [
      {
        _id: "fallback-exp-1",
        role: "Independent Data & AI Consultant",
        company: "AI Office Studio",
        timeframe: "2022 - Present",
        summary:
          "Partner with small businesses and teams to audit processes, build dashboards, automate workflows, and implement practical AI systems.",
        tags: ["AI Automation", "Dashboards", "Consulting"]
      },
      {
        _id: "fallback-exp-2",
        role: "Data Analyst",
        company: "Market Lane Labs",
        timeframe: "2019 - 2022",
        summary:
          "Built reporting systems, cleaned datasets, defined KPIs, and helped operations leaders make better weekly decisions.",
        tags: ["SQL", "BI", "Operations"]
      },
      {
        _id: "fallback-exp-3",
        role: "Automation Specialist",
        company: "Counterform Studio",
        timeframe: "2016 - 2019",
        summary:
          "Designed no-code and low-code automations across sales, finance, marketing, and internal admin workflows.",
        tags: ["Zapier", "APIs", "Process Design"]
      }
    ]
  },
  contact: {
    eyebrow: "Request form",
    title: "Bring a messy workflow. Leave with a smarter office system.",
    description:
      "Available for AI readiness audits, dashboard builds, workflow automation, data pipeline projects, and practical AI implementation sprints.",
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
