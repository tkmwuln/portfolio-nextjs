'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { STATIC_PROJECTS } from '@/lib/projects'

type Project = {
  id: string; title: string; slug: string | null; published: boolean;
  featured: boolean; category?: string; clientName?: string;
  metricValue?: string | null; projectYear?: number; image?: string | null;
}

const SIDEBAR = [
  { label: 'Overview', href: '/dashboard', icon: '📊' },
  { label: 'Projects', href: '/dashboard/projects', icon: '🚀' },
  { label: 'Blog', href: '/dashboard/blog', icon: '📝' },
  { label: 'Profile', href: '/dashboard/profile', icon: '👤' },
  { label: 'Content', href: '/dashboard/content', icon: '📄' },
  { label: 'Access', href: '/dashboard/access', icon: '🔐' },
]

export default function AdminProjectsPage() {
  const router = useRouter()
  const supabase = createClient()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data, error } = await supabase.from('projects').select('id, title, slug, published, featured, category, clientName, metricValue, projectYear').order('createdAt', { ascending: false })
      // Merge Supabase data with static fallback
      const live = data || []
      const merged: Project[] = live.length > 0 ? live : STATIC_PROJECTS
      // Add any static slugs not in live data
      if (live.length > 0) {
        STATIC_PROJECTS.forEach(sp => {
          if (!live.find(p => p.slug === sp.slug)) merged.push(sp)
        })
      }
      setProjects(merged)
      setLoading(false)
    }
    load()
  }, [supabase, router])

  const togglePublish = async (id: string, current: boolean) => {
    await supabase.from('projects').update({ published: !current }).eq('id', id)
    setProjects(p => p.map(x => x.id === id ? { ...x, published: !current } : x))
  }

  const toggleFeatured = async (id: string, current: boolean) => {
    await supabase.from('projects').update({ featured: !current }).eq('id', id)
    setProjects(p => p.map(x => x.id === id ? { ...x, featured: !current } : x))
  }

  const deleteProject = async (id: string) => {
    if (!confirm('Delete this project? This cannot be undone.')) return
    const isStatic = id.startsWith('s')
    if (!isStatic) {
      await supabase.from('projects').delete().eq('id', id)
    }
    setProjects(p => p.filter(x => x.id !== id))
  }

  const filtered = projects.filter(p =>
    filter === 'all' ? true : filter === 'published' ? p.published : !p.published
  )

  return (
    <div className="min-h-screen bg-page flex">
      <aside className="w-64 shrink-0 bg-card border-r border-[var(--border)] flex flex-col py-8 px-5 sticky top-0 h-screen">
        <div className="mb-8">
          <Link href="/" className="font-display font-extrabold text-[17px] tracking-tight text-ink no-underline" style={{ letterSpacing: '-0.03em' }}>
            Putri Wulandari<span className="text-accent">.</span>
          </Link>
          <p className="text-[11px] text-ink-3 mt-1 font-semibold tracking-wider uppercase">Admin Dashboard</p>
        </div>
        <nav className="space-y-1 flex-1">
          {SIDEBAR.map(item => (
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-[13px] font-medium no-underline transition-all duration-200 ${item.href === '/dashboard/projects' ? 'bg-accent-soft text-accent' : 'text-ink-2 hover:bg-card2 hover:text-ink'}`}>
              <span>{item.icon}</span>{item.label}
            </Link>
          ))}
        </nav>
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-[13px] text-ink-2 hover:text-ink no-underline transition-all duration-200">
          ← Back to Site
        </Link>
      </aside>

      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="font-display text-[28px] font-extrabold text-ink tracking-tight">Projects</h1>
            <p className="text-ink-2 text-sm mt-1">{projects.length} total · synced from portfolio</p>
          </div>
          <Link href="/dashboard/projects/new" className="btn-primary text-[13px] py-2.5 px-5">
            + New Project
          </Link>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-5">
          {(['all', 'published', 'draft'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`flex items-center gap-1.5 px-4 py-1.5 rounded-pill text-[12px] font-semibold transition-all border cursor-pointer ${filter === f ? 'bg-ink text-white border-ink dark:bg-white dark:text-white dark:border-white' : 'bg-card2 text-ink-2 border-[var(--border)] hover:border-ink hover:text-ink'}`}>
              {f === 'all' ? 'All' : f === 'published' ? 'Published' : 'Draft'}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${filter === f ? 'bg-white/20 text-white dark:bg-black/20 dark:text-inherit' : 'bg-[var(--border)] text-ink-3'}`}>
                {f === 'all' ? projects.length : f === 'published' ? projects.filter(p => p.published).length : projects.filter(p => !p.published).length}
              </span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="card p-10 text-center">
            <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin mx-auto" />
          </div>
        ) : (
          <div className="card overflow-hidden">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left px-4 py-3 text-ink-3 font-semibold tracking-wider text-[11px] uppercase w-10"></th>
                  <th className="text-left px-5 py-3 text-ink-3 font-semibold tracking-wider text-[11px] uppercase">Project</th>
                  <th className="text-left px-4 py-3 text-ink-3 font-semibold tracking-wider text-[11px] uppercase">Category</th>
                  <th className="text-left px-4 py-3 text-ink-3 font-semibold tracking-wider text-[11px] uppercase">Metric</th>
                  <th className="text-left px-4 py-3 text-ink-3 font-semibold tracking-wider text-[11px] uppercase">Year</th>
                  <th className="text-left px-4 py-3 text-ink-3 font-semibold tracking-wider text-[11px] uppercase">Status</th>
                  <th className="text-left px-4 py-3 text-ink-3 font-semibold tracking-wider text-[11px] uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b border-[var(--border)] hover:bg-card2 transition-colors duration-150 last:border-0">
                    <td className="px-4 py-3">
                      <div className="w-10 h-10 rounded-[8px] overflow-hidden bg-card2 border border-[var(--border)] shrink-0 relative">
                        {p.image ? (
                          <Image src={p.image} alt={p.title} fill className="object-cover" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-[10px] text-ink-3 font-bold">
                            {p.title?.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div>
                        <p className="font-semibold text-ink">{p.title}</p>
                        {p.slug && <p className="text-[11px] text-ink-3 mt-0.5 font-mono">/portfolio/{p.slug}</p>}
                        {p.clientName && <p className="text-[11px] text-ink-3">📍 {p.clientName}</p>}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-[12px] text-ink-2">{p.category || '—'}</td>
                    <td className="px-4 py-3.5">
                      {p.metricValue && (
                        <span className="text-[13px] font-bold font-display text-accent">{p.metricValue}</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-[12px] text-ink-2">{p.projectYear || '—'}</td>
                    <td className="px-4 py-3.5">
                      <button
                        onClick={() => togglePublish(p.id, p.published)}
                        className={`px-3 py-1 rounded-pill text-[11px] font-semibold cursor-pointer border-0 transition-all duration-200 ${p.published ? 'bg-[rgba(34,201,129,0.15)] text-[#22c981]' : 'bg-card2 text-ink-3'}`}
                      >
                        {p.published ? '✅ Published' : '📝 Draft'}
                      </button>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <Link
                          href={p.slug ? `/dashboard/projects/new?edit=${p.slug}` : '/dashboard/projects/new'}
                          className="text-accent text-[12px] no-underline hover:underline font-medium transition-colors"
                        >
                          Edit ✏️
                        </Link>
                        <span className="text-ink-3">·</span>
                        <button onClick={() => deleteProject(p.id)} className="text-red-400 hover:text-red-500 text-[12px] cursor-pointer bg-transparent border-0">
                          Delete
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
