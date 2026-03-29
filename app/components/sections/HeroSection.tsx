"use client";

import Link from "next/link";
import { useLang } from "../../context/LangContext";
import { useState, useEffect } from "react";

function CountUp({ value, duration = 1500 }: { value: number, duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (value === 0) return;
    let startTime: number | null = null;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo function for smooth deceleration
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeProgress * value));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };

    animationFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return <>{count}</>;
}

type Profile = {
  fullName: string;
  headline?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
  location?: string | null;
  openToWork: boolean;
};

type HeroSectionProps = {
  profile: Profile;
  projectCount: number;
  yearsExperience?: number;
  industries?: { label: string; colorClass: string }[];
};

const defaultIndustries = [
  { label: "E-commerce", colorClass: "pill-blue" },
  { label: "Fintech", colorClass: "pill-violet" },
  { label: "B2B SaaS", colorClass: "pill-green" },
  { label: "Govtech", colorClass: "pill-amber" },
];

const COLLABORATORS = ["Gojek", "Tokopedia", "Bank Jago", "Traveloka"];
const EXPERTISE = ["UX Research", "PRD", "Figma", "OKR", "A/B Test", "Design Sys.", "Roadmap", "SQL"];

const LINKEDIN_URL = "https://www.linkedin.com/in/putriwulandari-ptrwuln/";
const CV_URL = "https://drive.google.com/file/d/1TUy0n71AlVlbuL9dx5qte_1tGUB7EPVu/view";
const AVATAR_URL = "/images/profile-pic.png";

function LinkedInIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function HeroSection({
  profile,
  projectCount,
  yearsExperience = 8,
  industries = defaultIndustries,
}: HeroSectionProps) {
  const { t } = useLang();
  const avatarUrl = profile.avatarUrl || AVATAR_URL;

  return (
    <div className="bento bento-hero animate-fade-up">
      {/* ── Main Hero Card ── */}
      <div className="card-lg p-10 flex flex-col justify-between relative overflow-hidden">
        <div
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(61,90,241,.07) 0%, transparent 70%)" }}
        />
        <span className="absolute top-9 right-10 text-3xl text-accent/10 select-none">✦</span>

        <div>
          <p className="label uppercase tracking-widest text-ink-3 mb-4">{t("hero.label")}</p>
          <h1 className="font-display text-[48px] font-extrabold tracking-tighter leading-none text-ink">
            {t("hero.title1")}{" "}
            <span className="text-gradient">{t("hero.title_gradient")}</span>
            <br />
            {t("hero.title2")}
          </h1>
          <p className="mt-4 text-sm text-ink-2 leading-relaxed max-w-lg font-light">
            {profile.bio ?? t("hero.bio")}
          </p>
        </div>

        <div className="flex gap-3 flex-wrap items-center">
          <Link href="/portfolio" className="btn-primary">{t("hero.cta_primary")}</Link>
          <a href={CV_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost">{t("hero.cta_secondary")}</a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--border)] hover:border-[#0077b5] hover:bg-[#0077b5] hover:text-white text-ink-2 transition-all duration-200"
          >
            <LinkedInIcon size={15} />
          </a>
        </div>
      </div>

      {/* ── Products Shipped + Collaborated + Expertise ── */}
      <div className="card p-6 flex flex-col justify-between animate-fade-up delay-100 overflow-hidden">
        {/* Products header */}
        <div>
          <p className="label uppercase tracking-widest text-ink-3 mb-2">{t("products.label")}</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {industries.map((ind) => (
              <span key={ind.label} className={`pill ${ind.colorClass}`}>{ind.label}</span>
            ))}
          </div>
        </div>

        {/* Collaborated With — horizontal pills */}
        <div className="mb-3">
          <p className="label uppercase tracking-widest text-ink-3 mb-2 text-[10px]">Collaborated With</p>
          <div className="flex flex-wrap gap-1">
            {COLLABORATORS.map(c => (
              <span key={c} className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-ink-2 border border-[var(--border)] bg-card2">{c}</span>
            ))}
          </div>
        </div>

        {/* Count */}
        <div>
          <div className="font-display text-[48px] font-extrabold tracking-tighter leading-none text-ink">
            <CountUp value={projectCount} /><span className="text-[24px] text-ink-3">+</span>
          </div>
          <p className="text-xs text-ink-3 mt-1">{t("products.sub")}</p>
        </div>
      </div>

      {/* ── Profile Card ── */}
      <div
        className="rounded-[var(--r-lg)] p-6 flex flex-col justify-between relative overflow-hidden animate-fade-up delay-200"
        style={{ background: "linear-gradient(140deg, #0d0f1a 0%, #1a1f42 100%)" }}
      >
        <div
          className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(61,90,241,.35) 0%, transparent 70%)" }}
        />

        {/* Avatar row + available + location inline */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-full overflow-hidden relative ring-2 ring-white/10 shrink-0">
            <img
              src={avatarUrl}
              alt="Putri Wulandari"
              className="object-cover w-full h-full absolute inset-0 z-10 bg-card"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            <div className="w-full h-full absolute inset-0 z-0 flex items-center justify-center bg-gradient-to-br from-accent to-violet text-white text-sm font-bold">PW</div>
          </div>
          <div className="min-w-0">
            {profile.openToWork && (
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_0_2px_rgba(34,201,129,.2)]" />
                <span className="text-[10px] text-white/60">{t("profile.available")}</span>
              </div>
            )}
            {profile.location && (
              <p className="text-[9px] text-white/30">📍 {profile.location}</p>
            )}
          </div>
        </div>

        {/* Name + headline */}
        <div className="mb-2">
          <h2 className="font-display text-[18px] font-bold text-white leading-tight tracking-tight">Putri Wulandari</h2>
          <p className="text-[11px] text-white/40 mt-0.5">{profile.headline ?? "AI Product Manager & Service Designer"}</p>
        </div>

        {/* Expertise pills */}
        <div className="my-2">
          <p className="text-[9px] font-semibold uppercase tracking-widest text-white/30 mb-1.5">Expertise</p>
          <div className="flex flex-wrap gap-1">
            {EXPERTISE.map(skill => (
              <span key={skill} className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white/60 border border-white/10 bg-white/5">{skill}</span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { num: `${yearsExperience}yr`, label: t("stat.exp") },
            { num: "4★", label: t("stat.rating") },
          ].map((s) => (
            <div key={s.label} className="rounded-xl py-2 text-center" style={{ background: "rgba(255,255,255,.07)" }}>
              <div className="font-display text-[18px] font-extrabold text-white leading-none">{s.num}</div>
              <div className="text-[9px] text-white/30 mt-0.5 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
