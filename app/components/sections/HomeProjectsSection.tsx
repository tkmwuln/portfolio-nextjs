"use client";

import Link from "next/link";
import ProjectCard from "../portfolio/ProjectCard";
import { useLang } from "../../context/LangContext";

const STATIC_PROJECTS = [
  {
    id: "s1",
    title: "E-Health Platform — SIMRS Kesehatan",
    slug: "simrs-kesehatan",
    description: "End-to-end UX design for hospital management system serving 50k+ monthly users across Indonesia's health ecosystem.",
    image: null,
    category: "Govtech · E-Health",
    clientName: "Telkom Indonesia",
    projectYear: 2024,
    metricValue: "50k+",
    published: true,
    gradient: "linear-gradient(140deg, #2c3e50 0%, #3498db 100%)", // Soft Navy to Blue
  },
  {
    id: "s2",
    title: "Strategic CX Platform",
    slug: "cx-platform",
    description: "Designed and led UX for Telkom's customer experience platform — improving conversion by 38% across checkout flows.",
    image: null,
    category: "B2B SaaS",
    clientName: "Telkom Indonesia",
    projectYear: 2023,
    metricValue: "+38%",
    published: true,
    gradient: "linear-gradient(140deg, #0f2027 0%, #203a43 50%, #2c5364 100%)", // Soft muted Teal/Dark
  },
  {
    id: "s3",
    title: "Government Procurement UX",
    slug: "lkpp-procurement",
    description: "Service design & UX lead for LKPP (National Procurement Agency) digital procurement platform.",
    image: null,
    category: "Govtech",
    clientName: "LKPP",
    projectYear: 2024,
    metricValue: "+61%",
    published: true,
    gradient: "linear-gradient(140deg, #4b1248 0%, #f0c27b 100%)", // Soft Plum to Peach
  },
  {
    id: "s4",
    title: "Fintech Onboarding — D7 Retention",
    slug: "fintech-onboarding",
    description: "Redesigned fintech onboarding flow that improved 7-day retention by 61% using cognitive psychology principles.",
    image: null,
    category: "Fintech",
    clientName: "WeekndLabs Studio",
    projectYear: 2022,
    metricValue: "+61%",
    published: true,
    gradient: "linear-gradient(140deg, #373b44 0%, #4286f4 100%)", // Soft Steel to Ocean
  },
  {
    id: "s5",
    title: "Design System — 200+ Components",
    slug: "design-system",
    description: "Built a comprehensive design system from scratch with 200+ tokens and components for multi-product ecosystem.",
    image: null,
    category: "Design System",
    clientName: "WeekndLabs Studio",
    projectYear: 2021,
    metricValue: "200+",
    published: true,
    gradient: "linear-gradient(140deg, #1a1c2c 0%, #4a192c 100%)", // Soft Wine to Dark
  },
  {
    id: "s6",
    title: "INA DIGITAL — PM & Design",
    slug: "ina-digital",
    description: "Currently leading product management and design at INA Digital, Indonesia's national digital identity platform.",
    image: null,
    category: "Govtech",
    clientName: "INA DIGITAL",
    projectYear: 2025,
    metricValue: null,
    published: true,
    gradient: "linear-gradient(140deg, #141e30 0%, #243b55 100%)", // Soft Midnight Blue
  },
];

type Project = {
  id: string;
  title: string;
  slug?: string | null;
  description?: string | null;
  image?: string | null;
  category?: string | null;
  clientName?: string | null;
  projectYear?: number | null;
  metricValue?: string | null;
  published?: boolean;
  gradient?: string;
};

export default function HomeProjectsSection({ projects }: { projects: Project[] }) {
  const { t } = useLang();
  const display = projects.length > 0 ? projects : STATIC_PROJECTS;

  return (
    <section id="projects" className="pt-6">
      <div className="flex items-end justify-between mb-4">
        <div>
          <p className="label uppercase text-ink-3">{t("projects.label")}</p>
          <h2 className="font-display text-3xl font-bold text-ink tracking-tight">
            {t("projects.heading")}
          </h2>
        </div>
        <Link href="/portfolio" className="btn-ghost">
          {t("projects.view_all")}
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {display.slice(0, 6).map((project, index) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            slug={project.slug ?? String(project.id)}
            summary={project.description}
            coverImageUrl={project.image}
            category={project.category ? { name: String(project.category) } : null}
            clientName={project.clientName ?? null}
            projectYear={project.projectYear ?? null}
            metrics={
              project.metricValue
                ? [{ metricLabel: "impact", metricValue: String(project.metricValue) }]
                : []
            }
            gradient={project.gradient}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
