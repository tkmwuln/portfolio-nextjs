"use client";

import { createContext, useContext, useState } from "react";

export type Lang = "en" | "id";

type LangContextType = {
  lang: Lang;
  toggleLang: () => void;
  t: (key: string) => string;
};

const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.portfolio": "Portfolio",
    "nav.about": "About",
    "nav.blog": "Blog",
    "nav.open_to_work": "Open to work",
    "nav.lets_talk": "Let's Talk ↗",

    // Hero
    "hero.label": "Senior PM & UX Manager · Portfolio",
    "hero.title1": "Turning",
    "hero.title_gradient": "complex problems",
    "hero.title2": "into elegant products",
    "hero.bio":
      "Building digital experiences that balance deep user empathy with measurable business outcomes — from research to shipped product.",
    "hero.cta_primary": "View Case Studies ↗",
    "hero.cta_secondary": "Download CV",

    // Profile card
    "profile.available": "Available now",

    // Products card
    "products.label": "Products Shipped",
    "products.sub": "across 4 industries · 2018–2025",

    // Stats
    "stat.exp": "Exp.",
    "stat.rating": "Rating",

    // Projects section
    "projects.label": "Portfolio",
    "projects.heading": "Featured Projects",
    "projects.view_all": "View all",
    "projects.empty": "No projects yet. Add your first one from admin.",
    "projects.go_admin": "Go to Admin",

    // Metrics
    "metric.conversion": "Avg Conversion Lift",
    "metric.conversion_sub": "across checkout projects",
    "metric.retention": "Retention Impact",
    "metric.retention_sub": "D7 retention · Fintech onboarding",
    "metric.users": "Users Impacted",
    "metric.users_sub": "monthly active users",
    "metric.components": "Components Built",
    "metric.components_sub": "design system tokens",
  },
  id: {
    // Navbar
    "nav.home": "Beranda",
    "nav.portfolio": "Portofolio",
    "nav.about": "Tentang",
    "nav.blog": "Blog",
    "nav.open_to_work": "Buka untuk kerja",
    "nav.lets_talk": "Mari Bicara ↗",

    // Hero
    "hero.label": "Senior PM & Manajer UX · Portofolio",
    "hero.title1": "Mengubah",
    "hero.title_gradient": "masalah kompleks",
    "hero.title2": "menjadi produk elegan",
    "hero.bio":
      "Membangun pengalaman digital yang menyeimbangkan empati mendalam terhadap pengguna dengan hasil bisnis yang terukur — dari riset hingga produk yang diluncurkan.",
    "hero.cta_primary": "Lihat Studi Kasus ↗",
    "hero.cta_secondary": "Unduh CV",

    // Profile card
    "profile.available": "Tersedia sekarang",

    // Products card
    "products.label": "Produk Diluncurkan",
    "products.sub": "di 4 industri · 2018–2025",

    // Stats
    "stat.exp": "Pengalaman",
    "stat.rating": "Rating",

    // Projects section
    "projects.label": "Portofolio",
    "projects.heading": "Proyek Unggulan",
    "projects.view_all": "Lihat semua",
    "projects.empty": "Belum ada proyek. Tambahkan dari admin.",
    "projects.go_admin": "Ke Admin",

    // Metrics
    "metric.conversion": "Peningkatan Konversi",
    "metric.conversion_sub": "di proyek checkout",
    "metric.retention": "Dampak Retensi",
    "metric.retention_sub": "Retensi D7 · Onboarding Fintech",
    "metric.users": "Pengguna Terdampak",
    "metric.users_sub": "pengguna aktif bulanan",
    "metric.components": "Komponen Dibangun",
    "metric.components_sub": "token sistem desain",
  },
};

const LangContext = createContext<LangContextType>({
  lang: "en",
  toggleLang: () => {},
  t: (key) => key,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const toggleLang = () => setLang((prev) => (prev === "en" ? "id" : "en"));

  const t = (key: string): string =>
    translations[lang][key] ?? translations["en"][key] ?? key;

  return (
    <LangContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
