"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient();

async function getBlogPosts() {
  try {
    return await prisma.blogPost.findMany({
      where: { published: true },
      include: { tags: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return [];
  }
}

function formatDate(dateStr: string | Date) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
}

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogPosts().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  const ALL_CATS = ["All", ...Array.from(new Set(posts.map((p) => p.category || "Uncategorized")))];

  const filtered = activeCategory === "All"
    ? posts
    : posts.filter((p) => (p.category || "Uncategorized") === activeCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-page">
        <div className="mx-auto w-full max-w-[1280px] px-6 py-12 flex items-center justify-center">
          <p className="text-ink-2">Loading articles...</p>
        </div>
      </div>
    );
  }

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
        {activeCategory === "All" && filtered.length > 0 && (
          <Link
            href={`/blog/${filtered[0].slug}`}
            className="group block no-underline mb-6"
          >
            <div className="card overflow-hidden hover:-translate-y-1 transition-transform duration-300">
              <div
                className="h-56 w-full flex items-end relative overflow-hidden"
                style={{ background: filtered[0].gradient || "linear-gradient(140deg, #1f1c2c 0%, #928dab 100%)" }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
                <div className="relative z-10 p-6 w-full flex items-end justify-between">
                  <div>
                    {(filtered[0].tags || []).map((t: any) => (
                      <span key={t.id} className="text-[10px] bg-white/20 text-white/80 px-2.5 py-1 rounded-pill font-semibold tracking-wider uppercase backdrop-blur-sm mr-1.5">
                        {t.name}
                      </span>
                    ))}
                  </div>
                  <span className="text-[10px] bg-accent text-white px-2.5 py-1 rounded-pill font-semibold">Featured</span>
                </div>
              </div>
              <div className="p-7">
                <div className="flex items-center gap-3 text-ink-3 text-[12px] mb-3">
                  <span>{formatDate(filtered[0].createdAt)}</span>
                  <span>·</span>
                  <span>{filtered[0].readTime || "5 min read"}</span>
                </div>
                <h2 className="font-display text-[22px] font-bold text-ink tracking-tight leading-tight mb-3 group-hover:text-accent transition-colors duration-200">
                  {filtered[0].title}
                </h2>
                <p className="text-ink-2 text-sm leading-relaxed">{filtered[0].excerpt}</p>
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
                style={{ background: post.gradient || "linear-gradient(140deg, #2c3e50 0%, #3498db 100%)" }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <span className="text-[10px] bg-white/25 text-white/90 px-2.5 py-1 rounded-pill font-semibold tracking-wider uppercase backdrop-blur-sm">
                    {post.category || "Uncategorized"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 text-ink-3 text-[11px] mb-2">
                  <span>{formatDate(post.createdAt)}</span>
                  <span>·</span>
                  <span>{post.readTime || "5 min read"}</span>
                </div>
                <h3 className="font-display text-[15px] font-bold text-ink tracking-tight leading-tight mb-2 group-hover:text-accent transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-ink-2 text-[12px] leading-relaxed line-clamp-2 mb-3">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-1">
                  {(post.tags || []).slice(0, 2).map((tag: any) => (
                    <span key={tag.id} className="text-[10px] text-ink-3 bg-card2 px-2 py-0.5 rounded-full border border-[var(--border)]">
                      {tag.name}
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
