"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  BarChart3,
  Bot,
  Database,
  FileSpreadsheet,
  Mail,
  Menu,
  Sparkles,
  Workflow,
  X
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { urlForImage } from "@/lib/sanity/image";
import type {
  EditableImage,
  EditableLink,
  PortfolioPage,
  Project
} from "@/lib/content/types";

gsap.registerPlugin(ScrollTrigger);

type PortfolioExperienceProps = {
  page: PortfolioPage;
};

type Department = {
  name: string;
  code: string;
  accent: string;
  icon: "marketing" | "sales" | "finance" | "hr" | "ops" | "data" | "ai";
  headline: string;
  summary: string;
  monitor: string[];
  services: string[];
  proofHref: string;
  deskItems: string[];
};

const departments: Department[] = [
  {
    name: "Marketing",
    code: "MKT-01",
    accent: "#e4572e",
    icon: "marketing",
    headline: "Campaign intelligence and content ops that know what is working.",
    summary:
      "I connect campaign data, customer segments, and AI-assisted reporting so marketing teams stop guessing and start steering.",
    monitor: ["CAC trend: -18%", "Lead source mix", "AI content QA"],
    services: ["Attribution dashboards", "Audience segmentation", "AI content workflows"],
    proofHref: "#projects",
    deskItems: ["sticky: launch", "folder: personas", "chart: funnel"]
  },
  {
    name: "Sales",
    code: "SAL-02",
    accent: "#2f7d59",
    icon: "sales",
    headline: "Pipeline systems that turn scattered activity into visible revenue signals.",
    summary:
      "I automate CRM hygiene, build sales dashboards, and create AI assistants for follow-ups, summaries, and qualification.",
    monitor: ["Pipeline health", "Next-best action", "Forecast delta"],
    services: ["CRM automation", "Lead scoring", "Forecast dashboards"],
    proofHref: "#projects",
    deskItems: ["rolodex", "phone log", "deal slips"]
  },
  {
    name: "Finance",
    code: "FIN-03",
    accent: "#c08a19",
    icon: "finance",
    headline: "Sharper financial visibility without the monthly spreadsheet chase.",
    summary:
      "I build reliable data flows from messy exports into clean financial views, variance reports, and operating models.",
    monitor: ["Variance: 4.2%", "Cash runway", "Budget alerts"],
    services: ["Finance pipelines", "Variance analysis", "Board-ready reporting"],
    proofHref: "#projects",
    deskItems: ["ledger", "calculator", "receipts"]
  },
  {
    name: "HR",
    code: "HR-04",
    accent: "#b85b7b",
    icon: "hr",
    headline: "People operations with cleaner data and less repetitive admin.",
    summary:
      "I help HR teams standardize data, automate employee workflows, and surface workforce insights responsibly.",
    monitor: ["Onboarding queue", "Survey themes", "Attrition signals"],
    services: ["People dashboards", "Onboarding automation", "Policy assistants"],
    proofHref: "#projects",
    deskItems: ["forms", "badge tray", "survey notes"]
  },
  {
    name: "Operations",
    code: "OPS-05",
    accent: "#4666a9",
    icon: "ops",
    headline: "Operational workflows that stop living in inboxes and memory.",
    summary:
      "I map the real process, automate the repeatable pieces, and give operators dashboards they can trust under pressure.",
    monitor: ["SLA monitor", "Queue aging", "Exception log"],
    services: ["Workflow automation", "Ops dashboards", "Process mining"],
    proofHref: "#projects",
    deskItems: ["dispatch board", "label maker", "runbook"]
  },
  {
    name: "Data & Analytics",
    code: "DAT-06",
    accent: "#277c8e",
    icon: "data",
    headline: "Data pipelines, models, and dashboards that make decisions easier.",
    summary:
      "I turn raw systems into analysis-ready datasets, define metrics, and build dashboards with clear business logic.",
    monitor: ["dbt run: clean", "Metric layer", "Exec dashboard"],
    services: ["Data modeling", "ELT pipelines", "BI dashboards"],
    proofHref: "#projects",
    deskItems: ["data tapes", "query notes", "metric cards"]
  },
  {
    name: "AI Automation Desk",
    code: "AI-07",
    accent: "#6f5aa7",
    icon: "ai",
    headline: "Practical AI assistants and automations that fit the way teams work.",
    summary:
      "I design AI workflows with clear guardrails: document processing, internal assistants, reporting agents, and human review loops.",
    monitor: ["Agent runbook", "RAG index", "Review queue"],
    services: ["AI workflow design", "RAG assistants", "Automation guardrails"],
    proofHref: "#projects",
    deskItems: ["prompt cards", "model notes", "approval stamp"]
  }
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
  }
};

const stagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

const iconMap = {
  marketing: Sparkles,
  sales: BarChart3,
  finance: FileSpreadsheet,
  hr: Mail,
  ops: Workflow,
  data: Database,
  ai: Bot
};

function linkProps(link?: EditableLink) {
  const href = link?.href || "#";
  const isExternal = link?.isExternal || /^https?:\/\//.test(href);

  return {
    href,
    target: isExternal ? "_blank" : undefined,
    rel: isExternal ? "noreferrer" : undefined
  };
}

function imageSrc(image?: EditableImage, width = 1200, height = 900) {
  return (
    urlForImage(image)
      ?.width(width)
      .height(height)
      .fit("crop")
      .quality(88)
      .url() ||
    image?.fallbackSrc ||
    "/portfolio-market.png"
  );
}

function RetroButton({
  children,
  href,
  variant = "primary",
  className = ""
}: {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "light";
  className?: string;
}) {
  const base =
    "focus-ring retro-button inline-flex items-center justify-center gap-2 rounded-[3px] border-2 px-5 py-3 text-sm font-black uppercase shadow-[4px_4px_0_var(--button-shadow)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--button-shadow)] active:translate-x-1 active:translate-y-1 active:shadow-none";
  const variants = {
    primary:
      "border-[var(--ink)] bg-[var(--red)] text-white [--button-shadow:#2b2924] hover:bg-[#bf4425] hover:text-white",
    secondary:
      "border-[var(--ink)] bg-[var(--paper)] text-[var(--ink)] [--button-shadow:#cfc5ad] hover:bg-[var(--yellow)] hover:text-[var(--ink)]",
    light:
      "border-[var(--ink)] bg-[var(--yellow)] text-[var(--ink)] [--button-shadow:#2b2924] hover:bg-[#ffd769] hover:text-[var(--ink)]"
  };

  return (
    <a className={`${base} ${variants[variant]} ${className}`} href={href}>
      {children}
      <ArrowUpRight aria-hidden className="h-4 w-4" />
    </a>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      className="section-reveal mx-auto mb-12 grid max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-[0.38fr_1fr] lg:px-10"
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div variants={fadeUp}>
        <p className="stamp-label w-fit rotate-[-1deg] rounded-[3px] border-2 border-[var(--ink)] bg-[var(--yellow)] px-3 py-2 text-xs font-black uppercase text-[var(--ink)] shadow-[3px_3px_0_#2b2924]">
          {eyebrow}
        </p>
      </motion.div>
      <motion.div className="max-w-4xl" variants={fadeUp}>
        <h2 className="font-display text-4xl leading-[1.02] text-[var(--ink)] sm:text-5xl lg:text-7xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">
            {description}
          </p>
        ) : null}
      </motion.div>
    </motion.div>
  );
}

function Marquee({ items }: { items: string[] }) {
  const shouldReduceMotion = useReducedMotion();
  const repeated = useMemo(() => [...items, ...items], [items]);

  return (
    <div className="marquee-track overflow-hidden border-y-2 border-[var(--ink)] bg-[var(--green)] text-[var(--ink)]">
      <motion.div
        className="marquee-content flex w-max items-center gap-3 py-3"
        animate={shouldReduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {repeated.map((item, index) => (
          <span
            className="mx-1 rounded-full border-2 border-[var(--ink)] bg-[var(--paper)] px-4 py-2 text-xs font-black uppercase shadow-[3px_3px_0_#2b2924]"
            key={`${item}-${index}`}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function RetroOfficeHero() {
  return (
    <div className="hero-artwork office-hero-card relative min-h-[420px] overflow-hidden rounded-[18px] border-2 border-[var(--ink)] bg-[#e8dcc2] p-5 shadow-[10px_10px_0_#2b2924] will-change-transform">
      <div className="absolute right-5 top-5 rounded-[3px] border-2 border-[var(--ink)] bg-[var(--yellow)] px-3 py-1 text-xs font-black uppercase">
        Dept. AI / Analytics
      </div>
      <div className="absolute left-6 top-8 h-24 w-20 rotate-[-4deg] rounded-[4px] border-2 border-[var(--ink)] bg-[#f9f0dc] p-3 shadow-[4px_4px_0_#b9aa8b]">
        <div className="mb-2 h-2 w-12 bg-[var(--red)]" />
        <div className="mb-2 h-2 w-9 bg-[var(--ink)]/50" />
        <div className="h-2 w-11 bg-[var(--ink)]/35" />
      </div>
      <div className="desk-object absolute bottom-20 left-8 h-16 w-28 rotate-[3deg] rounded-t-[10px] border-2 border-[var(--ink)] bg-[#cf6f3c] shadow-[5px_5px_0_#2b2924]">
        <div className="mx-auto mt-3 h-2 w-16 rounded-full bg-[#7f3b25]" />
      </div>
      <div className="desk-object absolute bottom-20 right-7 h-28 w-24 rotate-[-2deg] border-2 border-[var(--ink)] bg-[#b8c7a3] shadow-[5px_5px_0_#2b2924]">
        <div className="border-b-2 border-[var(--ink)] bg-[#f7edcf] px-2 py-1 text-[10px] font-black uppercase">
          Files
        </div>
        <div className="m-3 h-2 bg-[var(--ink)]/40" />
        <div className="mx-3 h-2 bg-[var(--ink)]/30" />
      </div>
      <div className="absolute bottom-8 left-1/2 h-7 w-[78%] -translate-x-1/2 rounded-[4px] border-2 border-[var(--ink)] bg-[#8f5a3c] shadow-[0_10px_0_#6d422b]" />
      <div className="crt-monitor absolute left-1/2 top-24 w-[58%] -translate-x-1/2">
        <div className="rounded-[22px] border-[3px] border-[var(--ink)] bg-[#383530] p-4 shadow-[8px_8px_0_#2b2924]">
          <div className="monitor-screen rounded-[14px] border-2 border-[var(--ink)] bg-[#d8f4ce] p-4 text-[var(--ink)] shadow-inner">
            <div className="mb-4 flex items-center justify-between text-xs font-black uppercase">
              <span>AI-OFFICE.EXE</span>
              <span>READY</span>
            </div>
            <div className="grid gap-2">
              <div className="h-3 w-[78%] bg-[var(--ink)]" />
              <div className="h-3 w-[52%] bg-[#2f7d59]" />
              <div className="h-3 w-[68%] bg-[#e4572e]" />
              <div className="mt-3 grid grid-cols-5 gap-2">
                {[42, 68, 36, 82, 56].map((height, index) => (
                  <div className="flex h-20 items-end" key={height}>
                    <div
                      className="w-full rounded-t-[3px] border-2 border-[var(--ink)] bg-[var(--yellow)]"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto h-9 w-24 border-x-[3px] border-[var(--ink)] bg-[#383530]" />
        <div className="mx-auto h-6 w-44 rounded-b-[10px] border-[3px] border-[var(--ink)] bg-[#383530]" />
      </div>
    </div>
  );
}

function DepartmentIcon({ department }: { department: Department }) {
  const Icon = iconMap[department.icon];

  return (
    <div
      className="flex h-12 w-12 items-center justify-center rounded-[10px] border-2 border-[var(--ink)] shadow-[3px_3px_0_#2b2924]"
      style={{ backgroundColor: department.accent }}
    >
      <Icon aria-hidden className="h-6 w-6 text-white" />
    </div>
  );
}

function DepartmentVisual({
  department,
  activeIndex
}: {
  department: Department;
  activeIndex: number;
}) {
  return (
    <div className="office-scene relative overflow-hidden rounded-[18px] border-2 border-[var(--ink)] bg-[#eadfc6] p-5 shadow-[9px_9px_0_#2b2924]">
      <div
        className="department-sign mb-5 inline-flex rotate-[-1deg] items-center gap-3 rounded-[4px] border-2 border-[var(--ink)] px-4 py-2 text-sm font-black uppercase text-white shadow-[4px_4px_0_#2b2924]"
        style={{ backgroundColor: department.accent }}
      >
        <DepartmentIcon department={department} />
        <span>{department.name}</span>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_0.62fr]">
        <div className="relative min-h-[300px] rounded-[14px] border-2 border-[var(--ink)] bg-[#f7edcf] p-5">
          <div className="office-object absolute right-5 top-5 h-24 w-16 rotate-[3deg] rounded-[3px] border-2 border-[var(--ink)] bg-[#c9b995] shadow-[4px_4px_0_#2b2924]">
            <div className="border-b-2 border-[var(--ink)] bg-white/45 px-2 py-1 text-[9px] font-black uppercase">
              {department.code}
            </div>
          </div>
          <div className="crt-monitor mx-auto mt-5 max-w-[320px]">
            <div className="rounded-[18px] border-[3px] border-[var(--ink)] bg-[#393631] p-3 shadow-[6px_6px_0_#2b2924]">
              <div className="monitor-screen min-h-[172px] rounded-[12px] border-2 border-[var(--ink)] bg-[#d8f4ce] p-4">
                <div className="mb-4 flex items-center justify-between text-[10px] font-black uppercase">
                  <span>{department.code}</span>
                  <span>RUN {String(activeIndex + 1).padStart(2, "0")}</span>
                </div>
                <div className="space-y-3">
                  {department.monitor.map((line, index) => (
                    <div className="flex items-center gap-2" key={line}>
                      <span className="h-2 w-2 rounded-full bg-[var(--red)]" />
                      <div
                        className="h-3 rounded-full border border-[var(--ink)]"
                        style={{
                          width: `${88 - index * 14}%`,
                          backgroundColor: index === 1 ? department.accent : "#f3c623"
                        }}
                      />
                      <span className="text-[10px] font-black uppercase">{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mx-auto h-7 w-20 border-x-[3px] border-[var(--ink)] bg-[#393631]" />
            <div className="mx-auto h-5 w-36 rounded-b-[8px] border-[3px] border-[var(--ink)] bg-[#393631]" />
          </div>
          <div className="absolute bottom-5 left-5 right-5 h-8 rounded-[4px] border-2 border-[var(--ink)] bg-[#8f5a3c]" />
        </div>

        <div className="grid content-start gap-3">
          {department.deskItems.map((item, index) => (
            <div
              className="office-object rounded-[6px] border-2 border-[var(--ink)] bg-white/70 px-3 py-3 text-xs font-black uppercase shadow-[3px_3px_0_#2b2924]"
              key={item}
              style={{ transform: `rotate(${index % 2 === 0 ? -1.5 : 1.5}deg)` }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServicesOffice({ activeIndex }: { activeIndex: number }) {
  const activeDepartment = departments[activeIndex];

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-10">
      <div className="department-stack grid gap-5">
        {departments.map((department, index) => (
          <article
            className={`department-panel rounded-[16px] border-2 border-[var(--ink)] bg-[#fff8e7] p-5 shadow-[5px_5px_0_#cfc5ad] transition duration-300 ${
              activeIndex === index ? "is-active" : ""
            }`}
            data-department-index={index}
            key={department.name}
            style={{ "--department-accent": department.accent } as CSSProperties}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <DepartmentIcon department={department} />
                <div>
                  <p className="text-xs font-black uppercase text-[var(--muted)]">
                    {department.code}
                  </p>
                  <h3 className="font-display text-3xl leading-none text-[var(--ink)]">
                    {department.name}
                  </h3>
                </div>
              </div>
              <span className="rounded-full border-2 border-[var(--ink)] bg-[var(--yellow)] px-3 py-1 text-[10px] font-black uppercase shadow-[2px_2px_0_#2b2924]">
                Dept.
              </span>
            </div>
            <h4 className="max-w-xl text-xl font-black leading-tight text-[var(--ink)]">
              {department.headline}
            </h4>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
              {department.summary}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {department.services.map((service) => (
                <span
                  className="rounded-full border-2 border-[var(--ink)] bg-white px-3 py-1 text-xs font-black uppercase"
                  key={service}
                >
                  {service}
                </span>
              ))}
            </div>
            <a
              className="focus-ring mt-5 inline-flex items-center gap-2 rounded-[3px] border-2 border-[var(--ink)] bg-[var(--department-accent)] px-4 py-2 text-sm font-black uppercase text-white shadow-[3px_3px_0_#2b2924] transition duration-300 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#2b2924]"
              href={department.proofHref}
            >
              Proof of work
              <ArrowUpRight aria-hidden className="h-4 w-4" />
            </a>
          </article>
        ))}
      </div>

      <div className="department-visual-wrap lg:sticky lg:top-28 lg:self-start">
        <DepartmentVisual department={activeDepartment} activeIndex={activeIndex} />
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const accent = project.accent || ["#e4572e", "#c08a19", "#2f7d59", "#277c8e"][index % 4];

  return (
    <motion.article
      className="project-card group relative overflow-hidden rounded-[18px] border-2 border-[var(--ink)] bg-[#fff8e7] shadow-[7px_7px_0_#2b2924] transition duration-300 hover:-translate-y-1"
      style={{ "--project-accent": accent } as CSSProperties}
      variants={fadeUp}
      whileHover={{ rotate: index % 2 === 0 ? -0.6 : 0.6 }}
    >
      <a className="focus-ring block h-full" {...linkProps(project.link)}>
        <div className="flex items-center justify-between border-b-2 border-[var(--ink)] bg-[var(--project-accent)] px-4 py-3 text-xs font-black uppercase text-white">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden bg-[#d8f4ce]">
          <Image
            src={imageSrc(project.image)}
            alt={project.image?.alt || project.title}
            fill
            className="project-image object-cover mix-blend-multiply opacity-80 transition duration-700 ease-out group-hover:scale-105 group-hover:opacity-95"
            sizes="(min-width: 1024px) 33vw, 100vw"
          />
          <div className="absolute inset-4 rounded-[10px] border-2 border-[var(--ink)] bg-[#f7edcf]/84 p-3">
            <div className="mb-3 flex gap-1">
              <span className="h-3 w-3 rounded-full border border-[var(--ink)] bg-[var(--red)]" />
              <span className="h-3 w-3 rounded-full border border-[var(--ink)] bg-[var(--yellow)]" />
              <span className="h-3 w-3 rounded-full border border-[var(--ink)] bg-[var(--green)]" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-3/4 rounded bg-[var(--ink)]" />
              <div className="h-3 w-1/2 rounded bg-[var(--project-accent)]" />
              <div className="grid grid-cols-4 gap-2 pt-3">
                {[55, 82, 44, 70].map((height) => (
                  <div className="flex h-16 items-end" key={height}>
                    <div
                      className="w-full rounded-t border-2 border-[var(--ink)] bg-[var(--yellow)]"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="p-5 sm:p-6">
          <h3 className="font-display text-3xl leading-[1.03] text-[var(--ink)] sm:text-4xl">
            {project.title}
          </h3>
          <p className="mt-4 text-sm leading-6 text-[var(--muted)] sm:text-base">
            {project.excerpt}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags?.map((tag) => (
              <span
                className="rounded-full border-2 border-[var(--ink)] bg-white px-3 py-1 text-xs font-black uppercase"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
          {project.link?.label ? (
            <span className="mt-6 inline-flex items-center gap-2 border-b-2 border-[var(--project-accent)] text-sm font-black uppercase text-[var(--ink)] transition duration-300 group-hover:gap-3">
              {project.link.label}
              <ArrowUpRight aria-hidden className="h-4 w-4" />
            </span>
          ) : null}
        </div>
      </a>
    </motion.article>
  );
}

export function PortfolioExperience({ page }: PortfolioExperienceProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;

    if (!root || shouldReduceMotion) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        autoAlpha: 0,
        y: 36,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1
      });

      gsap.to(".hero-artwork", {
        yPercent: 7,
        rotate: 0.6,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 0.9
        }
      });

      gsap.utils.toArray<HTMLElement>(".section-reveal").forEach((section) => {
        gsap.from(section, {
          autoAlpha: 0,
          y: 34,
          duration: 0.82,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true
          }
        });
      });

      gsap.utils.toArray<HTMLElement>(".department-panel").forEach((panel) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveDepartmentFromPanel(panel),
          onEnterBack: () => setActiveDepartmentFromPanel(panel)
        });
      });

      gsap.from(".project-card", {
        autoAlpha: 0,
        y: 36,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.11,
        scrollTrigger: {
          trigger: "#projects",
          start: "top 72%",
          once: true
        }
      });

      gsap.from(".experience-row", {
        autoAlpha: 0,
        y: 28,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: "#experience",
          start: "top 74%",
          once: true
        }
      });

      gsap.to(".office-object", {
        y: -14,
        ease: "none",
        scrollTrigger: {
          trigger: "#services",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.1
        }
      });

      gsap.to(".marquee-content", {
        xPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: ".marquee-track",
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      ScrollTrigger.refresh();
    }, root);

    function setActiveDepartmentFromPanel(panel: HTMLElement) {
      const index = Number(panel.dataset.departmentIndex || 0);
      if (!Number.isNaN(index)) {
        setActiveIndex(index);
      }
    }

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <main
      ref={rootRef}
      className="min-h-screen overflow-hidden bg-[var(--paper)] text-[var(--ink)]"
    >
      <motion.div
        aria-hidden
        className="fixed left-0 top-0 z-[70] h-1.5 w-full origin-left bg-[var(--red)]"
        style={{ scaleX }}
      />

      <header className="fixed left-0 right-0 top-0 z-50 border-b-2 border-[var(--ink)] bg-[#f8f0dc]/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
          <a className="focus-ring flex min-w-0 items-center gap-3" href="#top">
            <span className="grid h-11 w-11 place-items-center rounded-[8px] border-2 border-[var(--ink)] bg-[var(--green)] text-lg font-black text-white shadow-[3px_3px_0_#2b2924]">
              AI
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="text-base font-black uppercase text-[var(--ink)]">
                {page.brandName}
              </span>
              <span className="hidden text-xs font-black uppercase text-[var(--muted)] sm:block">
                {page.brandTagline}
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {page.navItems.map((item) => (
              <a
                className="focus-ring relative rounded-[3px] px-4 py-2 text-xs font-black uppercase text-[var(--ink)] transition duration-300 after:absolute after:inset-x-4 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-[var(--red)] after:transition-transform after:duration-300 hover:bg-[#fff8e7] hover:after:scale-x-100"
                href={item.anchor}
                key={`${item.label}-${item.anchor}`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <RetroButton href={page.contact.primaryCta.href} variant="light" className="hidden lg:inline-flex">
            {page.contact.primaryCta.label}
          </RetroButton>

          <button
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-[8px] border-2 border-[var(--ink)] bg-[var(--paper)] text-[var(--ink)] shadow-[3px_3px_0_#2b2924] lg:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            type="button"
          >
            {menuOpen ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
          </button>
        </nav>

        {menuOpen ? (
          <div className="border-t-2 border-[var(--ink)] bg-[var(--paper)] px-5 py-4 lg:hidden">
            <div className="grid gap-2">
              {page.navItems.map((item) => (
                <a
                  className="focus-ring rounded-[6px] border-2 border-[var(--ink)] bg-[#fff8e7] px-4 py-3 text-sm font-black uppercase text-[var(--ink)] shadow-[3px_3px_0_#cfc5ad]"
                  href={item.anchor}
                  key={`${item.label}-${item.anchor}-mobile`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <section className="hero-section relative px-5 pb-16 pt-32 sm:px-8 lg:px-10" id="top">
        <div className="mx-auto grid max-w-7xl items-end gap-10 lg:grid-cols-[1.02fr_0.88fr]">
          <motion.div
            className="max-w-5xl"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <motion.p
              className="hero-reveal stamp-label mb-6 w-fit rotate-[-1.5deg] rounded-[3px] border-2 border-[var(--ink)] bg-[var(--yellow)] px-3 py-2 text-xs font-black uppercase text-[var(--ink)] shadow-[3px_3px_0_#2b2924]"
              variants={fadeUp}
            >
              {page.hero.eyebrow}
            </motion.p>
            <motion.h1
              className="hero-reveal font-display text-5xl leading-[0.96] text-[var(--ink)] sm:text-7xl lg:text-8xl"
              variants={fadeUp}
            >
              {page.hero.headline}
            </motion.h1>
            <motion.p
              className="hero-reveal mt-6 max-w-3xl text-base leading-7 text-[var(--muted)] sm:text-xl sm:leading-8"
              variants={fadeUp}
            >
              {page.hero.subheadline}
            </motion.p>
            <motion.div
              className="hero-reveal mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              variants={fadeUp}
            >
              <RetroButton href={page.hero.primaryCta.href}>
                {page.hero.primaryCta.label}
              </RetroButton>
              <RetroButton href={page.hero.secondaryCta.href} variant="secondary">
                {page.hero.secondaryCta.label}
              </RetroButton>
            </motion.div>
          </motion.div>

          <RetroOfficeHero />
        </div>

        <div className="section-reveal mx-auto mt-12 grid max-w-7xl gap-3 sm:grid-cols-3">
          {page.hero.stats.map((stat, index) => (
            <div
              className="file-tab rounded-[14px] border-2 border-[var(--ink)] bg-[#fff8e7] p-5 shadow-[5px_5px_0_#cfc5ad]"
              key={`${stat.value}-${stat.label}`}
              style={{ transform: `rotate(${[-1.2, 0.7, -0.4][index % 3]}deg)` }}
            >
              <p className="font-display text-4xl leading-none text-[var(--ink)]">
                {stat.value}
              </p>
              <p className="mt-2 max-w-xs text-sm font-black uppercase text-[var(--muted)]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Marquee items={page.hero.marquee} />

      <section className="py-20 sm:py-28" id="about">
        <SectionIntro
          eyebrow={page.about.eyebrow}
          title={page.about.title}
          description={page.about.body}
        />
        <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:px-8 lg:grid-cols-3 lg:px-10">
          {page.about.callouts.map((callout, index) => (
            <motion.article
              className="section-reveal rounded-[18px] border-2 border-[var(--ink)] bg-[#fff8e7] p-6 shadow-[6px_6px_0_#cfc5ad]"
              key={`${callout.value}-${index}`}
              style={{ transform: `rotate(${index === 1 ? 0.8 : -0.7}deg)` }}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
            >
              <p className="mb-8 w-fit rounded-[3px] border-2 border-[var(--ink)] bg-[var(--green)] px-3 py-1 text-xs font-black uppercase text-white">
                Note {index + 1}
              </p>
              <h3 className="font-display text-4xl leading-none">{callout.value}</h3>
              <p className="mt-4 text-base leading-7 text-[var(--muted)]">
                {callout.label}
              </p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="border-y-2 border-[var(--ink)] bg-[#e8dcc2] py-20 sm:py-28" id="services">
        <SectionIntro
          eyebrow="Department directory"
          title="Retro AI Office services, organized by business department."
          description="Scroll through the office. Each department shows how I help teams automate work, clarify data, and make better decisions with practical AI."
        />
        <ServicesOffice activeIndex={activeIndex} />
      </section>

      <section className="py-20 sm:py-28" id="projects">
        <SectionIntro
          eyebrow={page.projects.eyebrow}
          title={page.projects.title}
          description={page.projects.description}
        />
        <motion.div
          className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-3 lg:px-10"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
        >
          {page.projects.items.map((project, index) => (
            <ProjectCard
              index={index}
              key={project._id || `${project.title}-${index}`}
              project={project}
            />
          ))}
        </motion.div>
      </section>

      <section className="border-y-2 border-[var(--ink)] bg-[#f6e7c7] py-20 sm:py-28" id="experience">
        <SectionIntro
          eyebrow={page.experience.eyebrow}
          title={page.experience.title}
          description={page.experience.description}
        />
        <motion.div
          className="mx-auto grid max-w-7xl gap-4 px-5 sm:px-8 lg:px-10"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
        >
          {page.experience.items.map((item, index) => (
            <motion.article
              className="experience-row grid gap-5 rounded-[18px] border-2 border-[var(--ink)] bg-[#fff8e7] p-5 shadow-[5px_5px_0_#cfc5ad] md:grid-cols-[0.22fr_0.32fr_1fr]"
              key={item._id || `${item.role}-${index}`}
              variants={fadeUp}
            >
              <p className="w-fit rounded-[3px] border-2 border-[var(--ink)] bg-[var(--yellow)] px-3 py-2 text-xs font-black uppercase text-[var(--ink)]">
                {item.timeframe}
              </p>
              <div>
                <h3 className="font-display text-3xl leading-[1.05] text-[var(--ink)]">
                  {item.role}
                </h3>
                <p className="mt-2 text-sm font-black uppercase text-[var(--muted)]">
                  {item.company}
                </p>
              </div>
              <div>
                <p className="text-base leading-7 text-[var(--muted)]">
                  {item.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags?.map((tag) => (
                    <span
                      className="rounded-full border-2 border-[var(--ink)] bg-white px-3 py-1 text-xs font-black uppercase"
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="py-20 sm:py-28" id="contact">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_0.78fr] lg:px-10">
          <motion.div
            className="section-reveal"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
          >
            <motion.p
              className="stamp-label w-fit rotate-[-1deg] rounded-[3px] border-2 border-[var(--ink)] bg-[var(--yellow)] px-3 py-2 text-xs font-black uppercase text-[var(--ink)] shadow-[3px_3px_0_#2b2924]"
              variants={fadeUp}
            >
              {page.contact.eyebrow}
            </motion.p>
            <motion.h2
              className="mt-6 font-display text-5xl leading-[1] text-[var(--ink)] sm:text-7xl"
              variants={fadeUp}
            >
              {page.contact.title}
            </motion.h2>
            <motion.p
              className="mt-6 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg"
              variants={fadeUp}
            >
              {page.contact.description}
            </motion.p>
            <motion.div variants={fadeUp}>
              <RetroButton href={page.contact.primaryCta.href} className="mt-8">
                {page.contact.primaryCta.label}
              </RetroButton>
            </motion.div>
          </motion.div>

          <motion.div
            className="section-reveal rounded-[18px] border-2 border-[var(--ink)] bg-[#fff8e7] p-5 shadow-[8px_8px_0_#2b2924] sm:p-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-120px" }}
          >
            <div className="border-b-2 border-dashed border-[var(--ink)] pb-5">
              <p className="text-xs font-black uppercase text-[var(--red)]">
                {page.contact.availabilityLabel}
              </p>
              <p className="mt-3 font-display text-3xl leading-[1.05] text-[var(--ink)]">
                {page.contact.availabilityText}
              </p>
            </div>
            <div className="divide-y-2 divide-dashed divide-[var(--ink)]">
              {page.contact.channels.map((channel) => (
                <a
                  className="focus-ring flex items-center justify-between gap-4 py-5 text-[var(--ink)] transition duration-300 hover:translate-x-1 hover:text-[var(--red)]"
                  href={channel.href}
                  key={`${channel.label}-${channel.href}`}
                  rel={/^https?:\/\//.test(channel.href) ? "noreferrer" : undefined}
                  target={/^https?:\/\//.test(channel.href) ? "_blank" : undefined}
                >
                  <span>
                    <span className="block text-sm font-black uppercase">
                      {channel.label}
                    </span>
                    <span className="mt-1 block text-sm text-[var(--muted)]">
                      {channel.detail}
                    </span>
                  </span>
                  <ArrowUpRight aria-hidden className="h-5 w-5 shrink-0" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t-2 border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <p className="max-w-2xl text-sm leading-6 text-[#f4e8cb]">
            {page.footer.note}
          </p>
          <div className="flex flex-wrap gap-2">
            {page.footer.links.map((link) => (
              <a
                className="focus-ring rounded-[3px] border-2 border-[#f4e8cb] px-3 py-2 text-xs font-black uppercase text-[#f4e8cb] transition duration-300 hover:-translate-y-0.5 hover:bg-[#f4e8cb] hover:text-[var(--ink)]"
                key={`${link.label}-${link.href}`}
                {...linkProps(link)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
