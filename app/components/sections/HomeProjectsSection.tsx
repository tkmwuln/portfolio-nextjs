"use client";

import Link from "next/link";
import ProjectCard from "../portfolio/ProjectCard";
import { useLang } from "../../context/LangContext";
import { STATIC_PROJECTS } from "@/lib/projects";

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
