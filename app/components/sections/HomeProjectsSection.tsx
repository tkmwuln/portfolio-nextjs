"use client";

import Link from "next/link";
import { useRef, useState, useCallback, useEffect } from "react";
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
  metricLabel?: string | null;
  published?: boolean;
  gradient?: string;
};

const CARD_WIDTH = 272; // px — card width
const CARD_GAP = 20;    // px — gap between cards

export default function HomeProjectsSection({ projects }: { projects: Project[] }) {
  const { t } = useLang();
  const display = projects.length > 0 ? projects : STATIC_PROJECTS;

  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Drag state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const updateArrows = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows, { passive: true });
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scrollBy = (dir: 1 | -1) => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (CARD_WIDTH + CARD_GAP) * 2, behavior: "smooth" });
  };

  // Mouse drag handlers
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (sliderRef.current?.offsetLeft ?? 0);
    scrollLeft.current = sliderRef.current?.scrollLeft ?? 0;
    if (sliderRef.current) sliderRef.current.style.cursor = "grabbing";
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    sliderRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.2;
  };
  const onMouseUp = () => {
    isDragging.current = false;
    if (sliderRef.current) sliderRef.current.style.cursor = "grab";
  };

  return (
    <section id="projects" className="pt-6">
      {/* Header row */}
      <div className="flex items-end justify-between mb-5">
        <div>
          <p className="label uppercase text-ink-3">{t("projects.label")}</p>
          <h2 className="font-display text-3xl font-bold text-ink tracking-tight">
            {t("projects.heading")}
          </h2>
        </div>

        {/* Arrow controls + View all */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1">
            <button
              onClick={() => scrollBy(-1)}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className={`w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-200 cursor-pointer bg-transparent ${
                canScrollLeft
                  ? "border-[var(--border)] text-ink hover:bg-card2 hover:border-ink"
                  : "border-[var(--border)] text-ink-3 opacity-40 cursor-not-allowed"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={() => scrollBy(1)}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className={`w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-200 cursor-pointer bg-transparent ${
                canScrollRight
                  ? "border-[var(--border)] text-ink hover:bg-card2 hover:border-ink"
                  : "border-[var(--border)] text-ink-3 opacity-40 cursor-not-allowed"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <Link href="/portfolio" className="btn-ghost text-[13px]">
            {t("projects.view_all")}
          </Link>
        </div>
      </div>

      {/* Slider */}
      <div className="relative">
        {/* Left fade mask */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 z-10 transition-opacity duration-300"
          style={{
            background: "linear-gradient(to right, var(--bg-page), transparent)",
            opacity: canScrollLeft ? 1 : 0,
          }}
        />
        {/* Right fade mask */}
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 z-10"
          style={{ background: "linear-gradient(to left, var(--bg-page), transparent)" }}
        />

        <div
          ref={sliderRef}
          className="flex gap-5 overflow-x-auto select-none pb-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            cursor: "grab",
            touchAction: "pan-x",
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {display.map((project, index) => (
            <div
              key={project.id}
              className="shrink-0"
              style={{ width: CARD_WIDTH }}
            >
              <ProjectCard
                title={project.title}
                slug={project.slug ?? String(project.id)}
                summary={project.description}
                coverImageUrl={project.image}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
