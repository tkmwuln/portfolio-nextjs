'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  published: boolean
  createdAt: string
  tags?: { id: string; name: string }[]
}

const SIDEBAR = [
  { label: 'Overview', href: '/dashboard', icon: '📊' },
  { label: 'Projects', href: '/dashboard/projects', icon: '🚀' },
  { label: 'Blog', href: '/dashboard/blog', icon: '📝' },
  { label: 'Profile', href: '/dashboard/profile', icon: '👤' },
  { label: 'Content', href: '/dashboard/content', icon: '📄' },
  { label: 'Access', href: '/dashboard/access', icon: '🔐' },
]

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function DashboardBlogPage() {
  const router = useRouter()
  const supabase = createClient()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const res = await fetch('/api/blog?all=true')
      if (res.ok) {
        const data = await res.json()
        setPosts(data)
      }
      setLoading(false)
    }
    load()
  }, [supabase, router])

  const togglePublish = async (post: BlogPost) => {
    const res = await fetch(`/api/blog/${post.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...post, published: !post.published }),
    })
    if (res.ok) {
      setPosts(p => p.map(x => x.id === post.id ? { ...x, published: !post.published } : x))
    }
  }

  const deletePost = async (id: string) => {
    if (!confirm('Delete this post? This cannot be undone.')) return
    setDeleting(id)
    const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setPosts(p => p.filter(x => x.id !== id))
    }
    setDeleting(null)
  }

  const filtered = posts.filter(p =>
    filter === 'all' ? true : filter === 'published' ? p.published : !p.published
  )

  return (
    <div className="min-h-screen bg-page flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-card border-r border-[var(--border)] flex flex-col py-8 px-5 sticky top-0 h-screen">
        <div className="mb-8">
          <Link href="/" className="font-display font-extrabold text-[17px] tracking-tight text-ink no-underline" style={{ letterSpacing: '-0.03em' }}>
            Putri Wulandari<span className="text-accent">.</span>
          </Link>
          <p className="text-[11px] text-ink-3 mt-1 font-semibold tracking-wider uppercase">Admin Dashboard</p>
        </div>
        <nav className="space-y-1 flex-1">
          {SIDEBAR.map(item => (
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-[13px] font-medium no-underline transition-all duration-200 ${item.href === '/dashboard/blog' ? 'bg-accent-soft text-accent' : 'text-ink-2 hover:bg-card2 hover:text-ink'}`}>
              <span>{item.icon}</span>{item.label}
            </Link>
          ))}
        </nav>
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-[13px] text-ink-2 hover:text-ink no-underline transition-all duration-200">
          ← Back to Site
        </Link>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="font-display text-[28px] font-extrabold text-ink tracking-tight">Blog Posts</h1>
            <p className="text-ink-2 text-sm mt-1">{posts.length} total · synced from database</p>
          </div>
          <Link href="/dashboard/blog/new" className="btn-primary text-[13px] py-2.5 px-5">
            + New Post
          </Link>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-5">
          {(['all', 'published', 'draft'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`flex items-center gap-1.5 px-4 py-1.5 rounded-pill text-[12px] font-semibold transition-all border cursor-pointer ${filter === f ? 'bg-ink text-white border-ink' : 'bg-card2 text-ink-2 border-[var(--border)] hover:border-ink hover:text-ink'}`}>
              {f === 'all' ? 'All' : f === 'published' ? 'Published' : 'Draft'}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${filter === f ? 'bg-white/20 text-white' : 'bg-[var(--border)] text-ink-3'}`}>
                {f === 'all' ? posts.length : f === 'published' ? posts.filter(p => p.published).length : posts.filter(p => !p.published).length}
              </span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="card p-10 text-center">
            <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin mx-auto" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="card p-12 text-center">
            <p className="text-4xl mb-3">📝</p>
            <p className="font-display text-lg font-bold text-ink mb-1">No posts yet</p>
            <p className="text-ink-2 text-sm mb-4">Create your first blog post to get started.</p>
            <Link href="/dashboard/blog/new" className="btn-primary inline-flex">+ New Post</Link>
          </div>
        ) : (
          <div className="card overflow-hidden">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left px-5 py-3 text-ink-3 font-semibold tracking-wider text-[11px] uppercase">Title</th>
                  <th className="text-left px-4 py-3 text-ink-3 font-semibold tracking-wider text-[11px] uppercase">Tags</th>
                  <th className="text-left px-4 py-3 text-ink-3 font-semibold tracking-wider text-[11px] uppercase">Date</th>
                  <th className="text-left px-4 py-3 text-ink-3 font-semibold tracking-wider text-[11px] uppercase">Status</th>
                  <th className="text-left px-4 py-3 text-ink-3 font-semibold tracking-wider text-[11px] uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(post => (
                  <tr key={post.id} className="border-b border-[var(--border)] hover:bg-card2 transition-colors duration-150 last:border-0">
                    <td className="px-5 py-3.5">
                      <p className="font-semibold text-ink">{post.title}</p>
                      <p className="text-[11px] text-ink-3 mt-0.5 font-mono">/blog/{post.slug}</p>
                      {post.excerpt && <p className="text-[11px] text-ink-3 mt-0.5 line-clamp-1">{post.excerpt}</p>}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex flex-wrap gap-1">
                        {(post.tags || []).slice(0, 2).map(t => (
                          <span key={t.id} className="text-[10px] px-2 py-0.5 bg-accent-soft text-accent rounded-full font-medium">{t.name}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-[12px] text-ink-2">{formatDate(post.createdAt)}</td>
                    <td className="px-4 py-3.5">
                      <button
                        onClick={() => togglePublish(post)}
                        className={`px-3 py-1 rounded-pill text-[11px] font-semibold cursor-pointer border-0 transition-all duration-200 ${post.published ? 'bg-[rgba(34,201,129,0.15)] text-[#22c981]' : 'bg-card2 text-ink-3'}`}
                      >
                        {post.published ? '✅ Published' : '📝 Draft'}
                      </button>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <Link href={`/dashboard/blog/new?edit=${post.id}`} className="text-accent text-[12px] no-underline hover:underline font-medium">
                          Edit ✏️
                        </Link>
                        <span className="text-ink-3">·</span>
                        <a href={`/blog/${post.slug}`} target="_blank" className="text-ink-2 text-[12px] no-underline hover:underline">
                          View ↗
                        </a>
                        <span className="text-ink-3">·</span>
                        <button
                          onClick={() => deletePost(post.id)}
                          disabled={deleting === post.id}
                          className="text-red-400 hover:text-red-500 text-[12px] cursor-pointer bg-transparent border-0 disabled:opacity-50"
                        >
                          {deleting === post.id ? '...' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
