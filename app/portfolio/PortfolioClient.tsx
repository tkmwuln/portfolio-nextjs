"use client";

import { useState } from "react";
import ProjectCard from "@/app/components/portfolio/ProjectCard";
import { STATIC_PROJECTS, type Project } from "@/lib/projects";

export default function PortfolioClient({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const display = projects.length > 0 ? projects : STATIC_PROJECTS;

  const ALL_CATEGORIES = [
    "All",
    ...Array.from(new Set(display.map((p) => p.category || "Uncategorized"))),
  ];

  const filtered =
    activeCategory === "All"
      ? display
      : display.filter((p) => (p.category || "Uncategorized") === activeCategory);

  return (
    <div className="min-h-screen bg-page">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <p className="label uppercase tracking-widest text-ink-3 mb-3">Case Studies</p>
          <h1 className="font-display text-[48px] font-extrabold tracking-tighter leading-none text-ink mb-4">
            Portfolio <span className="text-gradient">Showcase</span>
          </h1>
          <p className="text-ink-2 max-w-lg text-sm font-light leading-relaxed">
            Selected case studies spanning Govtech, Fintech, E-Health, and B2B SaaS —
            built with research, shipped with care.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-pill text-[12px] font-semibold tracking-wide transition-all duration-200 cursor-pointer border ${
                activeCategory === cat
                  ? "bg-ink text-white border-ink"
                  : "bg-transparent text-ink-2 border-[var(--border)] hover:border-ink-2 hover:text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              slug={project.slug ?? String(project.id)}
              summary={project.description}
              coverImageUrl={project.image ?? null}
              category={project.category ? { name: String(project.category) } : null}
              clientName={project.clientName ?? null}
              projectYear={project.projectYear ?? null}
              metrics={
                project.metricValue
                  ? [{ metricLabel: project.metricLabel || "impact", metricValue: String(project.metricValue) }]
                  : []
              }
              gradient={project.gradient}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
