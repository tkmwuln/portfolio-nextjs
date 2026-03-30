"use client";

import Link from "next/link";
import { useState } from "react";

export default function PortfolioClient({ projects }: { projects: any[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const ALL_CATEGORIES = ["All", ...Array.from(new Set(projects.map((p) => p.category || "Uncategorized")))];

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => (p.category || "Uncategorized") === activeCategory);

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
                  ? "bg-ink text-white border-ink dark:bg-white dark:text-white dark:border-white"
                  : "bg-transparent text-ink-2 border-[var(--border)] hover:border-ink-2 hover:text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project, index) => (
            <Link
              key={project.id}
              href={`/portfolio/${project.slug}`}
              className="group card overflow-hidden block no-underline hover:-translate-y-1 transition-transform duration-300"
            >
              {/* Cover */}
              <div
                className="h-48 w-full flex items-end p-5 relative overflow-hidden"
                style={{ background: project.gradient || "linear-gradient(140deg, #2c3e50 0%, #3498db 100%)" }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="relative z-10 flex items-center gap-2">
                  <span className="text-[10px] bg-white/20 text-white/80 px-2.5 py-1 rounded-pill font-semibold tracking-wider uppercase backdrop-blur-sm">
                    {project.category || "Uncategorized"}
                  </span>
                  {project.featured && (
                    <span className="text-[10px] bg-accent/80 text-white px-2.5 py-1 rounded-pill font-semibold tracking-wider uppercase">
                      Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-display text-[16px] font-bold text-ink leading-tight tracking-tight group-hover:text-accent transition-colors duration-200">
                    {project.title}
                  </h3>
                  <span className="text-[11px] text-ink-3 shrink-0 mt-0.5">
                    {project.projectYear}
                  </span>
                </div>
                <p className="text-[12px] text-ink-2 leading-relaxed mb-3 line-clamp-2">
                  {project.description}
                </p>

                {/* Metric */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {(project.tags || []).slice(0, 2).map((tag: string) => (
                      <span key={tag} className="text-[10px] text-ink-3 bg-card2 px-2 py-0.5 rounded-full border border-[var(--border)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-accent">
                    {project.metric}
                  </span>
                </div>

                {project.clientName && (
                  <p className="text-[11px] text-ink-3 mt-2">
                    {project.clientName}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
