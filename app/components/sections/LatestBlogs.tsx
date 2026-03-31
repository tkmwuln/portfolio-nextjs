// app/components/sections/LatestBlogs.tsx
// Blog list — horizontal slider, Google Antigravity style
// Adapted from LatestBlogs.tsx reference design

"use client";

import Link from "next/link";
import { useRef, useState } from "react";

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  createdAt: string | Date;
  gradient?: string | null;
  tags?: { id: string; name: string }[];
  readTime?: string | null;
  excerpt?: string | null;
};

type LatestBlogsProps = {
  posts: BlogPost[];
};

export default function LatestBlogs({ posts }: LatestBlogsProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const ITEM_W = 290; // card width + gap

  const slide = (dir: 1 | -1) => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollTo({ left: el.scrollLeft + dir * ITEM_W, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = sliderRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  if (!posts.length) return null;

  return (
    <section className="py-4">
      {/* Section header */}
      <div className="flex items-end justify-between mb-7 px-1">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-accent font-semibold mb-1.5">
            Writing
          </p>
          <h2 className="font-display text-[28px] font-extrabold tracking-tight text-ink">
            Latest Articles
          </h2>
        </div>
        <Link
          href="/blog"
          className="text-[13px] font-medium text-ink-2 no-underline
                     border-b border-[var(--border)] pb-0.5
                     hover:text-accent hover:border-accent transition-colors"
        >
          View all articles →
        </Link>
      </div>

      {/* Slider */}
      <div className="relative">
        {/* Fade masks */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 z-10"
          style={{
            background: "linear-gradient(to right, var(--bg-page, #0d0f18) 0%, transparent 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10"
          style={{
            background: "linear-gradient(to left, var(--bg-page, #0d0f18) 0%, transparent 100%)",
          }}
        />

        <div
          ref={sliderRef}
          onScroll={onScroll}
          className="flex gap-5 overflow-x-auto scroll-smooth pb-2 scrollbar-hide"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {posts.map((post, i) => (
            <BlogSliderItem key={post.id} post={post} index={i} />
          ))}
        </div>

        {/* Arrow controls */}
        <div className="flex gap-2 mt-5">
          <ArrowBtn dir="left" disabled={!canPrev} onClick={() => slide(-1)} />
          <ArrowBtn dir="right" disabled={!canNext} onClick={() => slide(1)} />
        </div>
      </div>
    </section>
  );
}

// ── Individual blog card ──────────────────────────────────
function BlogSliderItem({ post, index }: { post: BlogPost; index: number }) {
  const tag = post.tags?.[0]?.name;
  const publishedAt = post.createdAt
    ? new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(post.createdAt))
    : null;

  const FALLBACK_BG = [
    "linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)",
    "linear-gradient(135deg,#1a0533,#2d1b69,#11998e)",
    "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
    "linear-gradient(135deg,#373b44,#4286f4)",
    "linear-gradient(135deg,#141e30,#243b55)",
  ];

  const bg = post.gradient || FALLBACK_BG[index % FALLBACK_BG.length];

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex-none no-underline"
      style={{ width: "260px", scrollSnapAlign: "start" }}
    >
      {/* Square gradient thumbnail */}
      <div
        className="w-full rounded-2xl overflow-hidden mb-4 flex items-center justify-center relative"
        style={{ height: "200px", background: bg }}
      >
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
        {/* Big initials watermark */}
        <span
          className="font-display text-[64px] font-extrabold select-none transition-transform duration-400 group-hover:scale-105"
          style={{ color: "rgba(255,255,255,0.09)", lineHeight: 1 }}
        >
          {post.title.slice(0, 2).toUpperCase()}
        </span>
        {/* Tag badge */}
        {tag && (
          <span className="absolute bottom-3 left-3 text-[10px] text-white/80 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full font-semibold tracking-wide uppercase">
            {tag}
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        className="text-[16px] font-semibold leading-snug text-ink mb-2
                   group-hover:text-accent transition-colors duration-200"
        style={{ letterSpacing: "-0.01em" }}
      >
        {post.title}
      </h3>

      {/* Date · Read time */}
      <div className="flex items-center gap-2 mb-3">
        {publishedAt && (
          <span className="text-[12px] text-ink-3">{publishedAt}</span>
        )}
        {post.readTime && (
          <>
            <span className="text-ink-3 text-[10px]">·</span>
            <span className="text-[12px] text-ink-3">{post.readTime}</span>
          </>
        )}
      </div>

      {/* Read link */}
      <div
        className="flex items-center gap-1.5 text-[12px] font-semibold text-ink-2
                   group-hover:text-accent transition-colors duration-200"
      >
        Read article
        <svg
          width="13"
          height="13"
          viewBox="0 0 14 14"
          fill="none"
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        >
          <path
            d="M3 7h8M7.5 4l3.5 3-3.5 3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </Link>
  );
}

// ── Arrow button ──────────────────────────────────────────
function ArrowBtn({
  dir,
  disabled,
  onClick,
}: {
  dir: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-10 h-10 rounded-full border border-[var(--border)] bg-card
                 flex items-center justify-center
                 transition-all duration-150 cursor-pointer
                 hover:border-accent hover:text-accent
                 disabled:opacity-25 disabled:cursor-default
                 disabled:hover:border-[var(--border)] disabled:hover:text-ink"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        {dir === "left" ? (
          <path
            d="M10 12L6 8l4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M6 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
}
