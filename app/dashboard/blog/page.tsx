'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const SIDEBAR = [
  { label: 'Overview', href: '/dashboard', icon: '📊' },
  { label: 'Projects', href: '/dashboard/projects', icon: '🚀' },
  { label: 'Blog', href: '/dashboard/blog', icon: '📝' },
  { label: 'Profile', href: '/dashboard/profile', icon: '👤' },
  { label: 'Access', href: '/dashboard/access', icon: '🔐' },
]

const STATIC_POSTS = [
  { id: 'b1', title: 'How Cognitive Psychology Transformed Our Fintech Onboarding', slug: 'cognitive-psychology-fintech-onboarding', published: true, createdAt: '2024-03-15', category: 'Product Management' },
  { id: 'b2', title: 'Why Government UX Needs a Different Playbook', slug: 'government-ux-playbook', published: true, createdAt: '2024-02-28', category: 'UX Design' },
  { id: 'b3', title: 'Building a Design System from Zero: Lessons from 200+ Components', slug: 'design-system-from-zero', published: true, createdAt: '2024-01-20', category: 'Design System' },
  { id: 'b4', title: 'Service Design vs UX Design: What PMs Need to Know', slug: 'service-design-vs-ux', published: false, createdAt: '2024-01-05', category: 'UX Design' },
]

type Post = { id: string; title: string; slug: string; published: boolean; createdAt: string; category?: string }
type Filter = 'all' | 'published' | 'draft'

export default function AdminBlogPage() {
  const router = useRouter()
  const supabase = createClient()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<Filter>('all')

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data } = await supabase.from('blog_posts').select('id, title, slug, published, createdAt, category').order('createdAt', { ascending: false })
      const live = data || []
      setPosts(live.length > 0 ? live : STATIC_POSTS)
      setLoading(false)
    }
    load()
  }, [supabase, router])

  const togglePublish = async (id: string, current: boolean) => {
    await supabase.from('blog_posts').update({ published: !current }).eq('id', id)
    setPosts(p => p.map(x => x.id === id ? { ...x, published: !current } : x))
  }

  const deletePost = async (id: string) => {
    if (!confirm('Delete this post?')) return
    await supabase.from('blog_posts').delete().eq('id', id)
    setPosts(p => p.filter(x => x.id !== id))
  }

  const published = posts.filter(p => p.published)
  const drafts = posts.filter(p => !p.published)
  const filtered = filter === 'all' ? posts : filter === 'published' ? published : drafts

  return (
    <div className="min-h-screen bg-page flex">
      {/* Mobile-aware sidebar */}
      <aside className="w-64 shrink-0 bg-card border-r border-[var(--border)] hidden md:flex flex-col py-8 px-5 sticky top-0 h-screen">
        <div className="mb-8">
          <Link href="/" className="font-display font-extrabold text-[17px] tracking-tight text-ink no-underline" style={{ letterSpacing: '-0.03em' }}>
            Putri Wulandari<span className="text-accent">.</span>
          </Link>
          <p className="text-[11px] text-ink-3 mt-1 font-semibold tracking-wider uppercase">Admin Dashboard</p>
        </div>
        <nav className="space-y-1 flex-1">
          {SIDEBAR.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-[13px] font-medium no-underline transition-all duration-200 ${
                item.href === '/dashboard/blog' ? 'bg-accent-soft text-accent' : 'text-ink-2 hover:bg-card2 hover:text-ink'
              }`}
            >
              <span>{item.icon}</span>{item.label}
            </Link>
          ))}
        </nav>
        <div className="space-y-2 mt-3">
          <Link href="/" target="_blank" className="flex items-center gap-2 w-full px-3 py-2.5 rounded-[12px] text-[13px] font-semibold text-accent bg-accent-soft no-underline hover:bg-accent hover:text-white transition-all duration-200">
            🌐 View Live Site ↗
          </Link>
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-[13px] text-ink-2 hover:text-ink no-underline transition-all duration-200">
            ← Back to Site
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
        {/* Mobile top nav */}
        <div className="flex md:hidden items-center justify-between mb-4 pb-3 border-b border-[var(--border)]">
          <Link href="/dashboard" className="font-display font-extrabold text-[15px] text-ink no-underline">← Dashboard</Link>
          <Link href="/" target="_blank" className="text-[12px] text-accent font-semibold">View Site ↗</Link>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="font-display text-[24px] md:text-[28px] font-extrabold text-ink tracking-tight">Blog Posts</h1>
            <p className="text-ink-2 text-sm mt-1">{posts.length} total · {published.length} published · {drafts.length} draft</p>
          </div>
          <Link href="/dashboard/blog/new" className="btn-primary text-[13px] py-2.5 px-5">
            ✏️ Write Post
          </Link>
        </div>

        {/* Filter tabs with counters */}
        <div className="flex gap-2 mb-5 flex-wrap">
          {([
            { key: 'all', label: `All`, count: posts.length },
            { key: 'published', label: `Published`, count: published.length },
            { key: 'draft', label: `Draft`, count: drafts.length },
          ] as { key: Filter, label: string, count: number }[]).map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-pill text-[12px] font-semibold transition-all border ${
                filter === f.key
                  ? 'bg-ink text-white border-ink dark:bg-white dark:text-white dark:border-white'
                  : 'bg-card2 text-ink-2 border-[var(--border)] hover:border-ink hover:text-ink'
              }`}
            >
              {f.label}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                filter === f.key
                  ? 'bg-white/20 text-white dark:bg-black/20 dark:text-inherit'
                  : 'bg-[var(--border)] text-ink-3'
              }`}>{f.count}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="card p-10 text-center">
            <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin mx-auto" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="card p-10 text-center">
            <p className="text-ink-2 mb-4">No {filter === 'all' ? '' : filter} posts yet.</p>
            <Link href="/dashboard/blog/new" className="btn-primary">✏️ Write Post</Link>
          </div>
        ) : (
          <div className="card overflow-hidden">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left px-5 py-3 text-ink-3 font-semibold tracking-wider text-[11px] uppercase">Title</th>
                  <th className="text-left px-4 py-3 text-ink-3 font-semibold tracking-wider text-[11px] uppercase hidden sm:table-cell">Category</th>
                  <th className="text-left px-4 py-3 text-ink-3 font-semibold tracking-wider text-[11px] uppercase">Status</th>
                  <th className="text-left px-4 py-3 text-ink-3 font-semibold tracking-wider text-[11px] uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b border-[var(--border)] hover:bg-card2 transition-colors last:border-0">
                    <td className="px-5 py-3.5">
                      <div>
                        <p className="font-medium text-ink">{p.title}</p>
                        <p className="text-[11px] text-ink-3 mt-0.5 font-mono">/blog/{p.slug}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 hidden sm:table-cell">
                      {p.category && (
                        <span className="text-[11px] bg-accent-soft text-accent px-2 py-0.5 rounded-pill font-semibold">{p.category}</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <button
                        onClick={() => togglePublish(p.id, p.published)}
                        className={`px-3 py-1 rounded-pill text-[11px] font-semibold cursor-pointer border-0 transition-all duration-200 ${
                          p.published ? 'bg-[rgba(34,201,129,0.15)] text-[#22c981]' : 'bg-card2 text-ink-3'
                        }`}
                      >
                        {p.published ? '✅ Published' : '📝 Draft'}
                      </button>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <Link href={`/dashboard/blog/new?edit=${p.slug}`} className="text-accent text-[12px] no-underline hover:underline font-medium">Edit ✏️</Link>
                        <span className="text-ink-3">·</span>
                        <button onClick={() => deletePost(p.id)} className="text-red-400 hover:text-red-500 text-[12px] cursor-pointer bg-transparent border-0">Delete</button>
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
