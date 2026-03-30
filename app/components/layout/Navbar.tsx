"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useLang } from "../../context/LangContext";

const NAV_KEYS = [
  { key: "nav.home", href: "/" },
  { key: "nav.portfolio", href: "/portfolio" },
  { key: "nav.about", href: "/about" },
  { key: "nav.blog", href: "/blog" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openToWork, setOpenToWork] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLang();

  useEffect(() => {
    // Scroll handling
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    
    // OpenToWork global sync
    const sync = () => setOpenToWork(localStorage.getItem('openToWork') !== 'false');
    window.addEventListener('storage', sync);
    window.addEventListener('openToWorkChange', sync);
    sync(); // initial load
    
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener('storage', sync);
      window.removeEventListener('openToWorkChange', sync);
    };
  }, []);

  // Close mobile menu on route change
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      <nav
        className={`sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 py-3.5 transition-all duration-500 ${
          scrolled
            ? "bg-white/30 dark:bg-[#FFFFFF]/50 backdrop-blur-2xl border-b border-white/60 dark:border-white/[0.04] shadow-[0_2px_24px_rgba(0,0,0,0.07)] dark:shadow-[0_4px_40px_rgba(0,0,0,0.7)]"
            : "bg-white/10 dark:bg-[#FFFFFF]/20 backdrop-blur-xl border-b border-transparent"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-display font-extrabold text-[17px] tracking-tight text-ink no-underline flex items-baseline gap-0.5"
          style={{ letterSpacing: "-0.03em" }}
        >
          Putri Wulandari<span className="text-accent">.</span>
        </Link>

        {/* Desktop Nav links */}
        <div className="hidden md:flex gap-1">
          {NAV_KEYS.map(({ key, href }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`px-3.5 py-1.5 rounded-pill text-[13px] font-medium no-underline transition-all duration-200 ${
                  active 
                    ? "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] text-ink dark:bg-white/10 dark:shadow-none dark:text-white" 
                    : "text-ink-2 hover:bg-black/5 dark:hover:bg-white/10 hover:text-ink"
                }`}
              >
                {t(key)}
              </Link>
            );
          })}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            title="Toggle language"
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-pill text-[12px] font-bold tracking-widest text-ink-2 hover:text-ink border border-[var(--border)] hover:border-[var(--fg)] transition-all duration-200 cursor-pointer bg-transparent"
            style={{ letterSpacing: "0.06em" }}
          >
            <span className={lang === "en" ? "text-ink" : "text-ink-3"}>EN</span>
            <span className="text-ink-3 font-light">|</span>
            <span className={lang === "id" ? "text-ink" : "text-ink-3"}>ID</span>
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={toggleTheme}
            title="Toggle dark mode"
            className="w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border)] hover:border-[var(--fg)] text-ink-2 hover:text-ink transition-all duration-200 cursor-pointer bg-transparent"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          {/* Open to work badge – desktop only */}
          {openToWork && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-[10px] bg-success/10 border border-success/20 ml-1">
              <span className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_0_2px_rgba(34,201,129,.2)]"></span>
              <span className="text-[10px] font-semibold text-success uppercase tracking-wide">Open to work</span>
            </div>
          )}

          {/* CTA – desktop */}
          <a
            href="https://www.linkedin.com/in/putriwulandari-ptrwuln/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-[13px] py-2.5 px-5 hidden sm:inline-flex"
          >
            {t("nav.lets_talk")}
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="flex md:hidden w-8 h-8 items-center justify-center rounded-full border border-[var(--border)] text-ink-2 hover:text-ink cursor-pointer bg-transparent transition-colors"
            aria-label="Open menu"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-0 right-0 h-full w-72 bg-card border-l border-[var(--border)] flex flex-col py-8 px-6 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <span className="font-display font-extrabold text-[16px] text-ink">Menu</span>
              <button onClick={() => setMobileOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border)] text-ink-2 cursor-pointer bg-transparent text-sm">✕</button>
            </div>
            <nav className="space-y-1 flex-1">
              {NAV_KEYS.map(({ key, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center px-4 py-3 rounded-[12px] text-[14px] font-medium no-underline transition-all ${
                    pathname === href || (href !== "/" && pathname.startsWith(href))
                      ? "bg-accent-soft text-accent"
                      : "text-ink-2 hover:bg-card2 hover:text-ink"
                  }`}
                >
                  {t(key)}
                </Link>
              ))}
            </nav>
            <div className="space-y-3 mt-6">
              <button onClick={toggleLang} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-pill text-[13px] font-bold text-ink-2 border border-[var(--border)] bg-transparent cursor-pointer">
                <span className={lang === "en" ? "text-ink" : "text-ink-3"}>EN</span>
                <span className="text-ink-3 font-light">|</span>
                <span className={lang === "id" ? "text-ink" : "text-ink-3"}>ID</span>
              </button>
              <a href="https://www.linkedin.com/in/putriwulandari-ptrwuln/" target="_blank" rel="noopener noreferrer" className="btn-primary w-full text-center justify-center text-[13px] py-3">
                {t("nav.lets_talk")}
              </a>
              {openToWork && (
                <div className="nav-available justify-center">{t("nav.open_to_work")}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
