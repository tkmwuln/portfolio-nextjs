"use client";

import Link from "next/link";
import { useState } from "react";

const SAMPLE_POSTS = [
  {
    id: "1",
    slug: "cognitive-psychology-ux-design",
    title: "How Cognitive Psychology Makes Better UX",
    excerpt: "Most UX problems don't come from bad design — they come from skipping steps. Exploring how Fogg's Behavior Model, cognitive load theory, and progressive disclosure create delightful digital products.",
    tags: ["UX Research", "Psychology", "Product Design"],
    date: "2025-03-15",
    readTime: "8 min read",
    category: "UX Design",
    gradient: "linear-gradient(140deg, #1f1c2c 0%, #928dab 100%)", // Muted violet
    published: true,
  },
  {
    id: "2",
    slug: "service-design-govtech-indonesia",
    title: "Service Design in Indonesian Govtech: What Works",
    excerpt: "After designing for LKPP, Telkom, and INA DIGITAL — here's what I've learned about making government digital services actually usable for 10M+ Indonesians across different tech literacy levels.",
    tags: ["Service Design", "Govtech", "Indonesia"],
    date: "2025-02-28",
    readTime: "12 min read",
    category: "Service Design",
    gradient: "linear-gradient(140deg, #0f2027 0%, #203a43 50%, #2c5364 100%)", // Soft muted Teal/Dark
    published: true,
  },
  {
    id: "3",
    slug: "ai-product-management-2025",
    title: "AI Product Management in 2025: A PM's Perspective",
    excerpt: "What does it actually mean to be an AI Product Manager? Beyond the buzzwords — breaking down how AI changes the PM role, what skills matter most, and how I approach building AI-powered products.",
    tags: ["AI", "Product Management", "Strategy"],
    date: "2025-01-20",
    readTime: "10 min read",
    category: "Product Strategy",
    gradient: "linear-gradient(140deg, #4b1248 0%, #f0c27b 100%)", // Soft Plum to Peach
    published: true,
  },
  {
    id: "4",
    slug: "fintech-onboarding-lessons",
    title: "61% Retention Boost: Lessons from Redesigning Fintech Onboarding",
    excerpt: "A behind-the-scenes look at how we improved 7-day retention by 61% — the research process, behavioral design decisions, the mistakes we made, and what actually moved the needle.",
    tags: ["Fintech", "Onboarding", "Case Study"],
    date: "2024-11-10",
    readTime: "15 min read",
    category: "Case Study",
    gradient: "linear-gradient(140deg, #373b44 0%, #4286f4 100%)", // Soft Steel to Ocean
    published: true,
  },
  {
    id: "5",
    slug: "design-system-from-zero",
    title: "Building a Design System from Zero to 200+ Components",
    excerpt: "The honest story of building a design system from scratch — what worked, what failed, how to get designer-developer collaboration right, and the governance model that actually stuck.",
    tags: ["Design System", "Figma", "Process"],
    date: "2024-09-05",
    readTime: "11 min read",
    category: "Design Tools",
    gradient: "linear-gradient(140deg, #1a1c2c 0%, #4a192c 100%)", // Soft Wine to Dark
    published: true,
  },
  {
    id: "6",
    slug: "blockchain-ux-for-non-techies",
    title: "Making Blockchain UX Accessible to Non-Tech Government Users",
    excerpt: "Blockchain UI is broken for most people. Here's how we simplified decentralized workflows using plain Indonesian language, familiar mental models, and trust-first design.",
    tags: ["Blockchain", "Web3", "Accessibility"],
    date: "2024-07-22",
    readTime: "9 min read",
    category: "UX Design",
    gradient: "linear-gradient(140deg, #2c3e50 0%, #3498db 100%)", // Soft Navy to Blue
    published: true,
  },
];

const ALL_CATS = ["All", ...Array.from(new Set(SAMPLE_POSTS.map((p) => p.category)))];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? SAMPLE_POSTS
    : SAMPLE_POSTS.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-page">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-12">

        {/* Header */}
        <div className="mb-10">
          <p className="label uppercase tracking-widest text-ink-3 mb-3">Writing</p>
          <h1 className="font-display text-[48px] font-extrabold tracking-tighter leading-none text-ink mb-4">
            Blog & <span className="text-gradient">Articles</span>
          </h1>
          <p className="text-ink-2 max-w-lg text-sm font-light leading-relaxed">
            Thoughts on UX design, product management, service design, and building 
            digital products that actually work for real people.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {ALL_CATS.map((cat) => (
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

        {/* Featured post (first item) */}
        {activeCategory === "All" && (
          <Link
            href={`/blog/${SAMPLE_POSTS[0].slug}`}
            className="group block no-underline mb-6"
          >
            <div className="card overflow-hidden hover:-translate-y-1 transition-transform duration-300">
              <div
                className="h-56 w-full flex items-end relative overflow-hidden"
                style={{ background: SAMPLE_POSTS[0].gradient }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
                <div className="relative z-10 p-6 w-full flex items-end justify-between">
                  <div>
                    {SAMPLE_POSTS[0].tags.map((t) => (
                      <span key={t} className="text-[10px] bg-white/20 text-white/80 px-2.5 py-1 rounded-pill font-semibold tracking-wider uppercase backdrop-blur-sm mr-1.5">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="text-[10px] bg-accent text-white px-2.5 py-1 rounded-pill font-semibold">Featured</span>
                </div>
              </div>
              <div className="p-7">
                <div className="flex items-center gap-3 text-ink-3 text-[12px] mb-3">
                  <span>{formatDate(SAMPLE_POSTS[0].date)}</span>
                  <span>·</span>
                  <span>{SAMPLE_POSTS[0].readTime}</span>
                </div>
                <h2 className="font-display text-[22px] font-bold text-ink tracking-tight leading-tight mb-3 group-hover:text-accent transition-colors duration-200">
                  {SAMPLE_POSTS[0].title}
                </h2>
                <p className="text-ink-2 text-sm leading-relaxed">{SAMPLE_POSTS[0].excerpt}</p>
                <div className="mt-4 text-accent text-[13px] font-semibold">
                  Read article →
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(activeCategory === "All" ? filtered.slice(1) : filtered).map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group card overflow-hidden block no-underline hover:-translate-y-1 transition-transform duration-300"
            >
              {/* Gradient cover */}
              <div
                className="h-32 w-full relative"
                style={{ background: post.gradient }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <span className="text-[10px] bg-white/25 text-white/90 px-2.5 py-1 rounded-pill font-semibold tracking-wider uppercase backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 text-ink-3 text-[11px] mb-2">
                  <span>{formatDate(post.date)}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-display text-[15px] font-bold text-ink tracking-tight leading-tight mb-2 group-hover:text-accent transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-ink-2 text-[12px] leading-relaxed line-clamp-2 mb-3">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-[10px] text-ink-3 bg-card2 px-2 py-0.5 rounded-full border border-[var(--border)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Subscribe CTA */}
        <div className="mt-10 card p-8 text-center">
          <h2 className="font-display text-xl font-bold text-ink tracking-tight mb-2">Stay Updated</h2>
          <p className="text-ink-2 text-sm mb-4">Follow on LinkedIn for new articles and insights.</p>
          <a
            href="https://www.linkedin.com/in/putriwulandari-ptrwuln/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Follow on LinkedIn ↗
          </a>
        </div>
      </div>
    </div>
  );
}
