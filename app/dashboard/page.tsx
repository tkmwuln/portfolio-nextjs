'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// Synced with /dashboard/projects static data
const STATIC_PROJECTS = [
  { id: 's1', title: 'E-Health Platform — SIMRS Kesehatan', slug: 'simrs-kesehatan', published: true, featured: true },
  { id: 's2', title: 'Strategic CX Platform', slug: 'cx-platform', published: true, featured: true },
  { id: 's3', title: 'Government Procurement UX', slug: 'lkpp-procurement', published: true, featured: false },
  { id: 's4', title: 'Fintech Onboarding — D7 Retention', slug: 'fintech-onboarding', published: true, featured: false },
  { id: 's5', title: 'Design System — 200+ Components', slug: 'design-system', published: true, featured: false },
  { id: 's6', title: 'INA DIGITAL — National Identity Platform', slug: 'ina-digital', published: true, featured: false },
  { id: 's7', title: 'Blockchain Service Design', slug: 'blockchain-service', published: false, featured: false },
  { id: 's8', title: 'EMR & Vaccination Ecosystem', slug: 'emr-vaccination', published: true, featured: false },
]

const STATIC_POSTS = [
  { id: 'b1', title: 'How Cognitive Psychology Transformed Our Fintech Onboarding', slug: 'cognitive-psychology-fintech-onboarding', published: true },
  { id: 'b2', title: 'Why Government UX Needs a Different Playbook', slug: 'government-ux-playbook', published: true },
  { id: 'b3', title: 'Building a Design System from Zero: Lessons from 200+ Components', slug: 'design-system-from-zero', published: true },
  { id: 'b4', title: 'Service Design vs UX Design: What PMs Need to Know', slug: 'service-design-vs-ux', published: false },
]

type NavItem = { label: string; href: string; icon: string; desc: string }
const NAV: NavItem[] = [
  { label: 'Projects', href: '/dashboard/projects', icon: '🚀', desc: 'Manage case studies' },
  { label: 'Blog', href: '/dashboard/blog', icon: '📝', desc: 'Write & publish posts' },
  { label: 'Profile', href: '/dashboard/profile', icon: '👤', desc: 'Edit your info' },
  { label: 'Access', href: '/dashboard/access', icon: '🔐', desc: 'Manage visibility' },
]

const SIDEBAR_ITEMS = [
  { label: 'Overview', href: '/dashboard', icon: '📊' },
  ...NAV,
]

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [projects, setProjects] = useState<any[]>(STATIC_PROJECTS)
  const [posts, setPosts] = useState<any[]>(STATIC_POSTS)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
        if (!user) { router.push('/login'); return }

        const { data: projectsData } = await supabase
          .from('projects').select('id, title, slug, featured, published').order('createdAt', { ascending: false })
        const { data: postsData } = await supabase
          .from('blog_posts').select('id, title, slug, published').order('createdAt', { ascending: false })

        if (projectsData && projectsData.length > 0) setProjects(projectsData)
        if (postsData && postsData.length > 0) setPosts(postsData)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [supabase, router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-page flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 rounded-full border-2 border-accent border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-ink-2 text-sm">Loading dashboard…</p>
        </div>
      </div>
    )
  }

  const stats = [
    { label: 'Projects', value: projects.length, icon: '🚀', color: 'bg-[#3d5af1]' },
    { label: 'Featured', value: projects.filter(p => p.featured).length, icon: '⭐', color: 'bg-gradient-to-br from-violet to-[#b47aff]' },
    { label: 'Blog Posts', value: posts.length, icon: '📝', color: 'bg-[#22c981]' },
    { label: 'Published', value: projects.filter(p => p.published).length, icon: '✅', color: 'bg-[#1a1c2c]' },
  ]

  const SidebarContent = () => (
    <>
      <div className="mb-8">
        <Link href="/" className="font-display font-extrabold text-[17px] tracking-tight text-ink no-underline" style={{ letterSpacing: '-0.03em' }}>
          Putri Wulandari<span className="text-accent">.</span>
        </Link>
        <p className="text-[11px] text-ink-3 mt-1 font-semibold tracking-wider uppercase">Admin Dashboard</p>
      </div>
      <nav className="space-y-1 flex-1">
        {SIDEBAR_ITEMS.map(item => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-[13px] font-medium no-underline transition-all duration-200 ${
              item.href === '/dashboard' ? 'bg-accent-soft text-accent' : 'text-ink-2 hover:bg-card2 hover:text-ink'
            }`}
          >
            <span className="text-[16px]">{item.icon}</span>{item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto space-y-2">
        <Link href="/" target="_blank" className="flex items-center gap-2 w-full px-3 py-2.5 rounded-[12px] text-[13px] font-semibold text-accent bg-accent-soft no-underline hover:bg-accent hover:text-white transition-all">
          🌐 View Live Site ↗
        </Link>
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-[13px] text-ink-2 hover:text-ink no-underline transition-all duration-200">
          ← Back to Site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-[13px] text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-500 transition-all duration-200 cursor-pointer text-left bg-transparent border-0"
        >
          🚪 Logout
        </button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-page">
      <div className="flex min-h-screen relative">

        {/* Desktop Sidebar */}
        <aside className="w-64 shrink-0 bg-card border-r border-[var(--border)] hidden md:flex flex-col py-8 px-5 sticky top-0 h-screen">
          <SidebarContent />
        </aside>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
            <aside className="absolute left-0 top-0 h-full w-72 bg-card flex flex-col py-8 px-5">
              <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 text-ink-3 text-xl bg-transparent border-0 cursor-pointer">✕</button>
              <SidebarContent />
            </aside>
          </div>
        )}

        {/* Main */}
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          {/* Mobile top bar */}
          <div className="flex md:hidden items-center justify-between mb-5 pb-3 border-b border-[var(--border)]">
            <button onClick={() => setSidebarOpen(true)} className="flex items-center gap-2 text-ink-2 bg-transparent border-0 cursor-pointer text-[14px]">
              ☰ Menu
            </button>
            <Link href="/" className="font-display font-extrabold text-[15px] text-ink no-underline">Putri Wulandari<span className="text-accent">.</span></Link>
            <Link href="/" target="_blank" className="text-[12px] text-accent font-semibold">Site ↗</Link>
          </div>

          {/* Header */}
          <div className="flex items-start justify-between mb-6 md:mb-8">
            <div>
              <h1 className="font-display text-[22px] md:text-[28px] font-extrabold text-ink tracking-tight">Good day, Putri 👋</h1>
              <p className="text-ink-2 text-sm mt-1">{user?.email}</p>
            </div>
            <div className="flex gap-2">
              <Link href="/portfolio" target="_blank" className="btn-ghost text-[13px] py-2 px-4 hidden sm:inline-flex">View Site ↗</Link>
              <Link href="/dashboard/projects/new" className="btn-primary text-[13px] py-2 px-4">+ New Project</Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {stats.map((s) => (
              <div key={s.label} className={`${s.color} rounded-[var(--r)] p-5 text-white`}>
                <div className="text-2xl mb-3">{s.icon}</div>
                <div className="font-display text-[32px] md:text-[36px] font-extrabold leading-none">{s.value}</div>
                <div className="text-[12px] text-white/60 mt-1 font-semibold uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="card p-5 md:p-6 mb-6">
            <h2 className="font-display font-bold text-ink text-[16px] mb-4 tracking-tight">Quick Actions</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {NAV.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="p-4 rounded-[var(--r)] bg-card2 border border-[var(--border)] hover:border-accent/30 hover:bg-accent-soft no-underline transition-all duration-200 group"
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="font-display font-bold text-ink text-[14px] group-hover:text-accent transition-colors">{item.label}</div>
                  <div className="text-ink-3 text-[11px] mt-0.5 hidden sm:block">{item.desc}</div>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Projects */}
            <div className="card p-5 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-ink text-[15px] tracking-tight">Recent Projects</h2>
                <Link href="/dashboard/projects" className="text-[12px] text-accent hover:underline no-underline">View all →</Link>
              </div>
              {projects.length > 0 ? (
                <div className="space-y-2">
                  {projects.slice(0, 5).map((p) => (
                    <div key={p.id} className="flex items-center justify-between p-3 rounded-[12px] bg-card2 hover:bg-accent-soft transition-colors duration-200">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-ink text-[13px] truncate">{p.title}</p>
                        <p className="text-[11px] text-ink-3 mt-0.5">
                          {p.published ? '✅ Published' : '📝 Draft'}
                          {p.featured && ' · ⭐ Featured'}
                        </p>
                      </div>
                      <Link href={p.slug ? `/dashboard/projects/new?edit=${p.slug}` : '/dashboard/projects/new'} className="text-[12px] text-accent no-underline hover:underline shrink-0 ml-2">
                        Edit →
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-ink-2 text-sm mb-3">No projects yet</p>
                  <Link href="/dashboard/projects/new" className="btn-primary text-[13px] py-2 px-4">+ Add Project</Link>
                </div>
              )}
            </div>

            {/* Recent Posts */}
            <div className="card p-5 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-ink text-[15px] tracking-tight">Blog Posts</h2>
                <Link href="/dashboard/blog" className="text-[12px] text-accent hover:underline no-underline">View all →</Link>
              </div>
              {posts.length > 0 ? (
                <div className="space-y-2">
                  {posts.slice(0, 5).map((p) => (
                    <div key={p.id} className="flex items-center justify-between p-3 rounded-[12px] bg-card2 hover:bg-accent-soft transition-colors duration-200">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-ink text-[13px] truncate">{p.title}</p>
                        <p className="text-[11px] text-ink-3 mt-0.5">{p.published ? '✅ Published' : '📝 Draft'}</p>
                      </div>
                      <Link href={`/dashboard/blog/new?edit=${p.slug}`} className="text-[12px] text-accent no-underline hover:underline shrink-0 ml-2">
                        Edit →
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-ink-2 text-sm mb-3">No posts yet</p>
                  <Link href="/dashboard/blog/new" className="btn-primary text-[13px] py-2 px-4">+ Write Post</Link>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
