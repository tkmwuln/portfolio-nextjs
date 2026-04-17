'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { STATIC_PROJECTS } from '@/lib/projects'
import Sidebar from '@/app/components/dashboard/Sidebar'

type Project = {
  id: string; title: string; slug: string | null; status: 'published' | 'draft' | 'archived';
  featured?: boolean; category?: string; clientName?: string;
  metricValue?: string | null; projectYear?: number; cover_image_url?: string | null;
}

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
      const { data, error } = await supabase.from('projects').select('id, title, slug, status, category_id, client_name, project_year, cover_image_url').order('created_at', { ascending: false })
      // Merge Supabase data with static fallback
      const live = data || []
      const merged: Project[] = live.length > 0 ? live : STATIC_PROJECTS as any
      // Add any static slugs not in live data
      if (live.length > 0) {
        STATIC_PROJECTS.forEach(sp => {
          if (!live.find(p => p.slug === sp.slug)) merged.push(sp as any)
        })
      }
      setProjects(merged)
      setLoading(false)
    }
    load()
  }, [supabase, router])

  const togglePublish = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'published' ? 'draft' : 'published'
    await supabase.from('projects').update({ status: nextStatus }).eq('id', id)
    setProjects(p => p.map(x => x.id === id ? { ...x, status: nextStatus as any } : x))
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
    filter === 'all' ? true : filter === 'published' ? p.status === 'published' : p.status !== 'published'
  )

  return (
    <div className="min-h-screen bg-page flex flex-col md:flex-row">
      <Sidebar />

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
            <button key={f} onClick={() => setFilter(f)} className={`flex items-center gap-1.5 px-4 py-1.5 rounded-pill text-[12px] font-semibold transition-all border cursor-pointer ${filter === f ? 'bg-ink text-white border-ink' : 'bg-card2 text-ink-2 border-[var(--border)] hover:border-ink hover:text-ink'}`}>
              {f === 'all' ? 'All' : f === 'published' ? 'Published' : 'Draft'}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${filter === f ? 'bg-white/20 text-white' : 'bg-[var(--border)] text-ink-3'}`}>
                {f === 'all' ? projects.length : f === 'published' ? projects.filter(p => p.status === 'published').length : projects.filter(p => p.status !== 'published').length}
              </span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="card p-10 text-center">
            <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin mx-auto" />
          </div>
        ) : (
          <div className="card overflow-x-auto">
            <table className="w-full text-[13px] min-w-[800px]">
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
                        {p.cover_image_url ? (
                          <img src={p.cover_image_url} alt={p.title} className="w-full h-full object-cover" />
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
                        onClick={() => togglePublish(p.id, p.status)}
                        className={`px-3 py-1 rounded-pill text-[11px] font-semibold cursor-pointer border-0 transition-all duration-200 ${p.status === 'published' ? 'bg-[rgba(34,201,129,0.15)] text-[#22c981]' : 'bg-card2 text-ink-3'}`}
                      >
                        {p.status === 'published' ? '✅ Published' : '📝 Draft'}
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
                        <button onClick={() => deleteProject(p.id)} className="text-red-400 hover:text-red-500 text-[12px] cursor-pointer bg-transparent border-0 p-0">
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
