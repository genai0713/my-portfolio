"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Mail, Menu, X } from "lucide-react";
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

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
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

const projectPositions = ["center", "left center", "right center", "center 35%"];

function linkProps(link?: EditableLink) {
  const href = link?.href || "#";
  const isExternal = link?.isExternal || /^https?:\/\//.test(href);

  return {
    href,
    target: isExternal ? "_blank" : undefined,
    rel: isExternal ? "noreferrer" : undefined
  };
}

function imageSrc(image?: EditableImage, width = 1600, height = 1100) {
  return (
    urlForImage(image)
      ?.width(width)
      .height(height)
      .fit("crop")
      .quality(90)
      .url() ||
    image?.fallbackSrc ||
    "/portfolio-market.png"
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
      className="section-reveal mx-auto mb-10 grid max-w-7xl gap-5 px-5 sm:px-8 lg:grid-cols-[0.74fr_1fr] lg:px-10"
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-120px" }}
    >
      <motion.p
        className="w-fit border border-[var(--line)] bg-[#0f0f0e] px-3 py-2 text-xs font-black uppercase text-[var(--yellow)]"
        variants={fadeUp}
      >
        {eyebrow}
      </motion.p>
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

function MotionSection({
  id,
  className,
  children
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`motion-section ${className || ""}`}>
      {children}
    </section>
  );
}

function Marquee({ items }: { items: string[] }) {
  const shouldReduceMotion = useReducedMotion();
  const repeated = useMemo(() => [...items, ...items], [items]);

  return (
    <div className="marquee-track overflow-hidden border-y border-[var(--line)] bg-[#090908]">
      <motion.div
        className="marquee-content flex w-max items-center gap-3 py-4"
        animate={shouldReduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {repeated.map((item, index) => (
          <span
            className="mx-1 border border-[var(--line)] bg-[#171715] px-4 py-2 text-sm font-black uppercase text-[var(--ink)]"
            key={`${item}-${index}`}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const accent = project.accent || ["#ef3e36", "#f3c623", "#1ba784", "#3e9cff"][index % 4];
  const style = { "--accent": accent } as CSSProperties;

  return (
    <motion.article
      className="project-card group relative flex min-h-full flex-col overflow-hidden rounded-[6px] border border-[var(--line)] bg-[#10100f] shelf-shadow will-change-transform"
      style={style}
      variants={fadeUp}
      whileHover={{ y: -10, rotateX: 1.5, rotateY: -1.5 }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
    >
      <a className="focus-ring block h-full" {...linkProps(project.link)}>
        <div className="relative aspect-[4/3] overflow-hidden border-b border-[var(--line)] bg-[#171715]">
          <Image
            src={imageSrc(project.image, 1200, 900)}
            alt={project.image?.alt || project.title}
            fill
            className="project-image object-cover transition duration-700 ease-out group-hover:scale-110"
            sizes="(min-width: 1024px) 33vw, 100vw"
            style={{
              objectPosition: projectPositions[index % projectPositions.length]
            }}
          />
          <div className="absolute inset-0 product-sheen opacity-70 transition duration-700 group-hover:opacity-100" />
          <div
            className="absolute left-4 top-4 h-10 w-10 border border-black/30"
            style={{ backgroundColor: accent }}
          />
        </div>
        <div className="flex h-full flex-col gap-6 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-black uppercase text-[var(--muted)]">
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>
          <div>
            <h3 className="font-display text-3xl leading-[1.03] text-[var(--ink)] sm:text-4xl">
              {project.title}
            </h3>
            <p className="mt-4 text-sm leading-6 text-[var(--muted)] sm:text-base">
              {project.excerpt}
            </p>
          </div>
          <div className="mt-auto flex flex-wrap gap-2">
            {project.tags?.map((tag) => (
              <span
                className="border border-[var(--line)] bg-[#080807] px-3 py-1 text-xs font-bold uppercase text-[var(--ink)]"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
          {project.link?.label ? (
            <span className="inline-flex w-fit items-center gap-2 border-b border-[var(--accent)] pb-1 text-sm font-black uppercase text-[var(--ink)] transition duration-300 group-hover:gap-3 group-hover:text-[var(--yellow)]">
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
  const rootRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const heroImage = imageSrc(page.hero.image, 2200, 1400);
  const aboutImage = imageSrc(page.about.image, 1400, 1200);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;

    if (!root || shouldReduceMotion) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        autoAlpha: 0,
        y: 44,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.1
      });

      gsap.to(".hero-artwork", {
        yPercent: 9,
        scale: 1.06,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 0.8
        }
      });

      gsap.utils.toArray<HTMLElement>(".section-reveal").forEach((section) => {
        gsap.from(section, {
          autoAlpha: 0,
          y: 42,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true
          }
        });
      });

      gsap.utils.toArray<HTMLElement>(".image-parallax").forEach((image) => {
        gsap.to(image, {
          yPercent: -8,
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: image,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.9
          }
        });
      });

      gsap.from(".service-card", {
        autoAlpha: 0,
        y: 36,
        duration: 0.72,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: "#services",
          start: "top 72%",
          once: true
        }
      });

      gsap.from(".project-card", {
        autoAlpha: 0,
        y: 46,
        rotateX: 5,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: "#projects",
          start: "top 72%",
          once: true
        }
      });

      gsap.from(".experience-row", {
        autoAlpha: 0,
        y: 28,
        duration: 0.72,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: "#experience",
          start: "top 72%",
          once: true
        }
      });

      gsap.to(".marquee-content", {
        xPercent: -12,
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

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <main ref={rootRef} className="min-h-screen bg-[#050505] text-[var(--ink)]">
      <motion.div
        aria-hidden
        className="fixed left-0 top-0 z-[70] h-1 w-full origin-left bg-[var(--yellow)]"
        style={{ scaleX }}
      />

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
          <a className="focus-ring flex min-w-0 flex-col" href="#top">
            <span className="text-base font-black uppercase text-[var(--ink)]">
              {page.brandName}
            </span>
            <span className="hidden text-xs font-bold uppercase text-[var(--muted)] sm:block">
              {page.brandTagline}
            </span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {page.navItems.map((item) => (
              <a
                className="focus-ring relative px-4 py-2 text-xs font-black uppercase text-[var(--muted)] transition duration-300 after:absolute after:inset-x-4 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-[var(--yellow)] after:transition-transform after:duration-300 hover:bg-white/10 hover:text-[var(--ink)] hover:after:scale-x-100"
                href={item.anchor}
                key={`${item.label}-${item.anchor}`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            className="focus-ring hidden items-center gap-2 border border-[var(--line)] bg-[var(--ink)] px-4 py-2 text-sm font-black uppercase text-[#050505] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--yellow)] hover:shadow-[0_16px_40px_rgba(243,198,35,0.16)] lg:inline-flex"
            {...linkProps(page.contact.primaryCta)}
          >
            {page.contact.primaryCta.label}
            <Mail aria-hidden className="h-4 w-4" />
          </a>

          <button
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            className="focus-ring inline-flex h-11 w-11 items-center justify-center border border-[var(--line)] bg-[#10100f] text-[var(--ink)] lg:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            type="button"
          >
            {menuOpen ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
          </button>
        </nav>

        {menuOpen ? (
          <div className="border-t border-[var(--line)] bg-[#080807] px-5 py-4 lg:hidden">
            <div className="grid gap-2">
              {page.navItems.map((item) => (
                <a
                  className="focus-ring border border-[var(--line)] px-4 py-3 text-sm font-black uppercase text-[var(--ink)]"
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

      <section
        className="hero-section relative isolate overflow-hidden border-b border-[var(--line)]"
        id="top"
      >
        <Image
          src={heroImage}
          alt={page.hero.image?.alt || page.brandName}
          fill
          priority
          className="hero-artwork absolute inset-0 -z-20 object-cover will-change-transform"
          sizes="100vw"
        />
        <div className="absolute inset-0 -z-10 bg-[#050505]/70" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-[#050505]" />

        <div className="mx-auto flex min-h-[88svh] max-w-7xl flex-col justify-end px-5 pb-10 pt-32 sm:px-8 lg:px-10 lg:pb-14">
          <motion.div
            className="max-w-6xl"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <motion.p
              className="hero-reveal mb-5 w-fit border border-white/20 bg-[#050505]/70 px-3 py-2 text-xs font-black uppercase text-[var(--yellow)] backdrop-blur"
              variants={fadeUp}
            >
              {page.hero.eyebrow}
            </motion.p>
            <motion.h1
              className="hero-reveal font-display text-5xl leading-[0.98] text-[var(--ink)] sm:text-7xl lg:text-8xl"
              variants={fadeUp}
            >
              {page.hero.headline}
            </motion.h1>
            <motion.p
              className="hero-reveal mt-6 max-w-3xl text-base leading-7 text-[#e6ded0] sm:text-xl sm:leading-8"
              variants={fadeUp}
            >
              {page.hero.subheadline}
            </motion.p>
            <motion.div
              className="hero-reveal mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              variants={fadeUp}
            >
              <a
                className="focus-ring inline-flex items-center justify-center gap-2 border border-[var(--ink)] bg-[var(--ink)] px-5 py-3 text-sm font-black uppercase text-[#050505] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--yellow)] hover:shadow-[0_18px_44px_rgba(243,198,35,0.18)]"
                {...linkProps(page.hero.primaryCta)}
              >
                {page.hero.primaryCta.label}
                <ArrowUpRight aria-hidden className="h-4 w-4" />
              </a>
              <a
                className="focus-ring inline-flex items-center justify-center gap-2 border border-white/25 bg-[#050505]/70 px-5 py-3 text-sm font-black uppercase text-[var(--ink)] backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                {...linkProps(page.hero.secondaryCta)}
              >
                {page.hero.secondaryCta.label}
                <ArrowUpRight aria-hidden className="h-4 w-4" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        <div className="mx-auto grid max-w-7xl border-t border-white/15 bg-[#050505]/80 px-5 backdrop-blur sm:grid-cols-3 sm:px-8 lg:px-10">
          {page.hero.stats.map((stat) => (
            <div
              className="border-b border-white/10 py-5 sm:border-b-0 sm:border-r sm:border-white/10 sm:last:border-r-0"
              key={`${stat.value}-${stat.label}`}
            >
              <p className="font-display text-4xl leading-none text-[var(--ink)]">
                {stat.value}
              </p>
              <p className="mt-2 max-w-xs text-sm font-bold uppercase text-[var(--muted)]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Marquee items={page.hero.marquee} />

      <MotionSection className="py-20 sm:py-28" id="about">
        <SectionIntro
          eyebrow={page.about.eyebrow}
          title={page.about.title}
          description={page.about.body}
        />
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-10">
          <motion.div
            className="section-reveal relative min-h-[420px] overflow-hidden border border-[var(--line)] bg-[#11110f] shelf-shadow"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-120px" }}
          >
            <Image
              src={aboutImage}
              alt={page.about.image?.alt || page.about.title}
              fill
              className="image-parallax object-cover will-change-transform"
              sizes="(min-width: 1024px) 46vw, 100vw"
              style={{ objectPosition: "left center" }}
            />
            <div className="absolute inset-0 product-sheen" />
          </motion.div>

          <motion.div
            className="section-reveal grid gap-4"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
          >
            {page.about.callouts.map((callout, index) => (
              <motion.div
                className="grid gap-3 border border-[var(--line)] bg-[#10100f] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/30 sm:grid-cols-[0.36fr_1fr] sm:p-6"
                key={`${callout.value}-${index}`}
                variants={fadeUp}
              >
                <p className="font-display text-4xl leading-none text-[var(--ink)]">
                  {callout.value}
                </p>
                <p className="text-base leading-7 text-[var(--muted)]">
                  {callout.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </MotionSection>

      <MotionSection className="border-y border-[var(--line)] bg-[#080807] py-20 sm:py-28" id="services">
        <SectionIntro
          eyebrow={page.services.eyebrow}
          title={page.services.title}
          description={page.services.description}
        />
        <motion.div
          className="mx-auto grid max-w-7xl gap-4 px-5 sm:px-8 md:grid-cols-2 lg:grid-cols-4 lg:px-10"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
        >
          {page.services.items.map((service, index) => (
            <motion.article
              className="service-card group relative min-h-[360px] overflow-hidden rounded-[6px] border border-[var(--line)] bg-[#11110f] p-5 transition duration-500 hover:-translate-y-1.5 hover:border-white/40 hover:shadow-[0_30px_70px_rgba(0,0,0,0.34)] sm:p-6"
              key={`${service.title}-${index}`}
              variants={fadeUp}
            >
              <div
                aria-hidden
                className="absolute right-5 top-5 h-12 w-12 border border-black/30"
                style={{
                  backgroundColor: ["#ef3e36", "#f3c623", "#1ba784", "#3e9cff"][index % 4]
                }}
              />
              <p className="text-xs font-black uppercase text-[var(--yellow)]">
                {service.eyebrow}
              </p>
              <h3 className="mt-16 font-display text-3xl leading-[1.03] text-[var(--ink)]">
                {service.title}
              </h3>
              <p className="mt-5 text-sm leading-6 text-[var(--muted)]">
                {service.description}
              </p>
              <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
                {service.tags?.map((tag) => (
                  <span
                    className="border border-[var(--line)] bg-[#060605] px-3 py-1 text-xs font-bold uppercase text-[var(--ink)]"
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </MotionSection>

      <MotionSection className="py-20 sm:py-28" id="projects">
        <SectionIntro
          eyebrow={page.projects.eyebrow}
          title={page.projects.title}
          description={page.projects.description}
        />
        <motion.div
          className="mx-auto grid max-w-7xl gap-4 px-5 sm:px-8 lg:grid-cols-3 lg:px-10"
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
      </MotionSection>

      <MotionSection className="border-y border-[var(--line)] bg-[#080807] py-20 sm:py-28" id="experience">
        <SectionIntro
          eyebrow={page.experience.eyebrow}
          title={page.experience.title}
          description={page.experience.description}
        />
        <motion.div
          className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
        >
          {page.experience.items.map((item, index) => (
            <motion.article
              className="experience-row grid gap-4 border-t border-[var(--line)] py-7 transition duration-300 hover:border-white/30 last:border-b md:grid-cols-[0.32fr_0.42fr_1fr]"
              key={item._id || `${item.role}-${index}`}
              variants={fadeUp}
            >
              <p className="text-sm font-black uppercase text-[var(--yellow)]">
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
                      className="border border-[var(--line)] px-3 py-1 text-xs font-bold uppercase text-[var(--ink)]"
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                  {item.link?.label ? (
                    <a
                      className="focus-ring inline-flex items-center gap-1 border-b border-[var(--green)] text-xs font-black uppercase text-[var(--ink)] transition duration-300 hover:gap-2 hover:text-[var(--yellow)]"
                      {...linkProps(item.link)}
                    >
                      {item.link.label}
                      <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                    </a>
                  ) : null}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </MotionSection>

      <MotionSection className="py-20 sm:py-28" id="contact">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_0.78fr] lg:px-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
          >
            <motion.p
              className="w-fit border border-[var(--line)] bg-[#0f0f0e] px-3 py-2 text-xs font-black uppercase text-[var(--yellow)]"
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
            <motion.a
              className="focus-ring mt-8 inline-flex items-center gap-2 border border-[var(--ink)] bg-[var(--ink)] px-5 py-3 text-sm font-black uppercase text-[#050505] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--yellow)] hover:shadow-[0_18px_44px_rgba(243,198,35,0.18)]"
              variants={fadeUp}
              {...linkProps(page.contact.primaryCta)}
            >
              {page.contact.primaryCta.label}
              <ArrowUpRight aria-hidden className="h-4 w-4" />
            </motion.a>
          </motion.div>

          <motion.div
            className="section-reveal border border-[var(--line)] bg-[#10100f] p-5 shelf-shadow sm:p-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-120px" }}
          >
            <div className="border-b border-[var(--line)] pb-5">
              <p className="text-xs font-black uppercase text-[var(--yellow)]">
                {page.contact.availabilityLabel}
              </p>
              <p className="mt-3 font-display text-3xl leading-[1.05] text-[var(--ink)]">
                {page.contact.availabilityText}
              </p>
            </div>
            <div className="divide-y divide-[var(--line)]">
              {page.contact.channels.map((channel) => (
                <a
                  className="focus-ring flex items-center justify-between gap-4 py-5 text-[var(--ink)] transition duration-300 hover:translate-x-1 hover:text-[var(--yellow)]"
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
      </MotionSection>

      <footer className="border-t border-[var(--line)] bg-[#080807]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <p className="max-w-2xl text-sm leading-6 text-[var(--muted)]">
            {page.footer.note}
          </p>
          <div className="flex flex-wrap gap-2">
            {page.footer.links.map((link) => (
              <a
                className="focus-ring border border-[var(--line)] px-3 py-2 text-xs font-black uppercase text-[var(--ink)] transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
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
