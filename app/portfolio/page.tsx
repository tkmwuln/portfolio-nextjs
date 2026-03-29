"use client";

import Link from "next/link";
import { useState } from "react";

const PROJECTS = [
  {
    id: "s1",
    title: "E-Health Platform — SIMRS Kesehatan",
    slug: "simrs-kesehatan",
    description: "End-to-end UX design for hospital management system serving 50k+ monthly users across Indonesia's health ecosystem. Developed SIMRS, SIMKLINIK, and vaccination health ecosystem design.",
    image: null,
    category: "Govtech",
    tags: ["UX Design", "Service Design", "E-Health"],
    clientName: "Telkom Indonesia",
    projectYear: 2024,
    metric: "50k+ MAU",
    gradient: "linear-gradient(140deg, #2c3e50 0%, #3498db 100%)",
    featured: true,
  },
  {
    id: "s2",
    title: "Strategic CX Platform",
    slug: "cx-platform",
    description: "Designed and led UX for Telkom's customer experience platform — improving conversion by 38% across checkout flows through research-driven redesign.",
    image: null,
    category: "B2B SaaS",
    tags: ["CX Design", "Product Strategy", "Research"],
    clientName: "Telkom Indonesia",
    projectYear: 2023,
    metric: "+38% Conversion",
    gradient: "linear-gradient(140deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
    featured: true,
  },
  {
    id: "s3",
    title: "Government Procurement UX",
    slug: "lkpp-procurement",
    description: "Service design & UX lead for LKPP (National Procurement Agency) digital procurement platform. Streamlined complex government procurement flows.",
    image: null,
    category: "Govtech",
    tags: ["Service Design", "Government", "UX Research"],
    clientName: "LKPP",
    projectYear: 2024,
    metric: "10M+ Users",
    gradient: "linear-gradient(140deg, #4b1248 0%, #f0c27b 100%)",
    featured: true,
  },
  {
    id: "s4",
    title: "Fintech Onboarding — D7 Retention",
    slug: "fintech-onboarding",
    description: "Redesigned fintech onboarding flow that improved 7-day retention by 61% using cognitive psychology principles and behavior-driven design.",
    image: null,
    category: "Fintech",
    tags: ["UX Design", "Onboarding", "Psychology"],
    clientName: "WeekndLabs Studio",
    projectYear: 2022,
    metric: "+61% D7 Retention",
    gradient: "linear-gradient(140deg, #373b44 0%, #4286f4 100%)",
    featured: false,
  },
  {
    id: "s5",
    title: "Design System — 200+ Components",
    slug: "design-system",
    description: "Built a comprehensive design system from scratch with 200+ tokens and components for multi-product ecosystem, including documentation and governance framework.",
    image: null,
    category: "Design System",
    tags: ["Design System", "Component Library", "Docs"],
    clientName: "WeekndLabs Studio",
    projectYear: 2021,
    metric: "200+ Components",
    gradient: "linear-gradient(140deg, #1a1c2c 0%, #4a192c 100%)",
    featured: false,
  },
  {
    id: "s6",
    title: "INA DIGITAL — National Identity Platform",
    slug: "ina-digital",
    description: "Currently leading product management and design at INA Digital, Indonesia's national digital identity and government service platform.",
    image: null,
    category: "Govtech",
    tags: ["Product Management", "Government", "Identity"],
    clientName: "INA DIGITAL",
    projectYear: 2025,
    metric: "National Scale",
    gradient: "linear-gradient(140deg, #141e30 0%, #243b55 100%)",
    featured: true,
  },
  {
    id: "s7",
    title: "Blockchain Service Design",
    slug: "blockchain-service",
    description: "UX and service design for blockchain-based government services, simplifying complex decentralized workflows for non-technical users.",
    image: null,
    category: "Blockchain",
    tags: ["Blockchain", "Service Design", "UX"],
    clientName: "WeekndLabs Studio",
    projectYear: 2023,
    metric: "3 Products",
    gradient: "linear-gradient(140deg, #1f1c2c 0%, #928dab 100%)",
    featured: false,
  },
  {
    id: "s8",
    title: "EMR & Vaccination Ecosystem",
    slug: "emr-vaccination",
    description: "Electronic Medical Records and vaccination management UX design, part of Indonesia's Satu Sehat (One Digital Health) initiative.",
    image: null,
    category: "E-Health",
    tags: ["E-Health", "UX Design", "Government"],
    clientName: "Telkom Indonesia",
    projectYear: 2024,
    metric: "Satu Sehat",
    gradient: "linear-gradient(140deg, #2b5876 0%, #4e4376 100%)",
    featured: false,
  },
];

const ALL_CATEGORIES = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

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
                style={{ background: project.gradient }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="relative z-10 flex items-center gap-2">
                  <span className="text-[10px] bg-white/20 text-white/80 px-2.5 py-1 rounded-pill font-semibold tracking-wider uppercase backdrop-blur-sm">
                    {project.category}
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
                    {project.tags.slice(0, 2).map((tag) => (
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
