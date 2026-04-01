'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState, Suspense } from 'react'

const SIDEBAR = [
  { label: 'Overview', href: '/dashboard', icon: '📊' },
  { label: 'Projects', href: '/dashboard/projects', icon: '🚀' },
  { label: 'Blog', href: '/dashboard/blog', icon: '📝' },
  { label: 'Profile', href: '/dashboard/profile', icon: '👤' },
  { label: 'Content', href: '/dashboard/content', icon: '📄' },
  { label: 'Access', href: '/dashboard/access', icon: '🔐' },
]

type FormData = {
  title: string
  slug: string
  excerpt: string
  content: string
  tags: string
  status: 'published' | 'draft' | 'archived'
}

function BlogFormInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get('edit')
  const supabase = createClient()

  const [saving, setSaving] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [form, setForm] = useState<FormData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    tags: '',
    status: 'draft',
  })

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      setUserId(user.id)

      // Load existing post if editing
      if (editId) {
        const res = await fetch(`/api/blog/${editId}`)
        if (res.ok) {
          const post = await res.json()
          setForm({
            title: post.title || '',
            slug: post.slug || '',
            excerpt: post.excerpt || '',
            content: post.content || '',
            tags: (post.tags || []).map((t: { name: string }) => t.name).join(', '),
            status: post.status || 'draft',
          })
        }
      }
    }
    init()
  }, [supabase, router, editId])

  const setTitle = (val: string) => {
    const slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    setForm(f => ({ ...f, title: val, slug }))
  }

  const update = (k: keyof FormData, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSave = async (publish = false) => {
    if (!form.title.trim()) { setMsg({ type: 'error', text: 'Title is required.' }); return }
    setSaving(true)
    setMsg(null)

    const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean)
    const payload = {
      title: form.title,
      slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt: form.excerpt,
      content: form.content,
      tags,
      status: publish ? 'published' : form.status,
      userId,
    }

    const url = editId ? `/api/blog/${editId}` : '/api/blog'
    const method = editId ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()

      if (!res.ok) {
        setMsg({ type: 'error', text: data.error || 'Failed to save post.' })
      } else {
        setMsg({ type: 'success', text: publish ? '✅ Published!' : '✅ Saved as draft!' })
        if (!editId) {
          setTimeout(() => router.push(`/dashboard/blog/new?edit=${data.id}`), 800)
        }
      }
    } catch {
      setMsg({ type: 'error', text: 'Network error. Please try again.' })
    }
    setSaving(false)
  }

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
      <main className="flex-1 p-8 max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link href="/dashboard/blog" className="text-[12px] text-ink-3 hover:text-ink no-underline mb-1 inline-block">← Back to Blog</Link>
            <h1 className="font-display text-[28px] font-extrabold text-ink tracking-tight">
              {editId ? 'Edit Post' : 'New Blog Post'}
            </h1>
          </div>
          <div className="flex gap-2">
            <button onClick={() => handleSave(false)} disabled={saving} className="btn-ghost text-[13px] py-2 px-4 disabled:opacity-50 cursor-pointer">
              {saving ? 'Saving…' : 'Save Draft'}
            </button>
            <button onClick={() => handleSave(true)} disabled={saving} className="btn-primary text-[13px] py-2 px-5 disabled:opacity-50 cursor-pointer">
              {saving ? 'Publishing…' : 'Publish'}
            </button>
          </div>
        </div>

        {msg && (
          <div className={`mb-4 px-4 py-3 rounded-[12px] text-[13px] font-medium ${msg.type === 'success' ? 'bg-[rgba(34,201,129,0.12)] text-[#22c981]' : 'bg-red-50 text-red-600'}`}>
            {msg.text}
          </div>
        )}

        <div className="space-y-4">
          {/* Title */}
          <div className="card p-5">
            <label className="block text-[11px] font-semibold text-ink-3 uppercase tracking-wider mb-2">Title *</label>
            <input
              value={form.title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Your post title..."
              className="w-full bg-transparent text-ink font-display text-[22px] font-bold tracking-tight outline-none placeholder:text-ink-3 border-0"
            />
            <div className="mt-2 pt-2 border-t border-[var(--border)]">
              <label className="block text-[10px] font-semibold text-ink-3 uppercase tracking-wider mb-1">Slug</label>
              <input
                value={form.slug}
                onChange={e => update('slug', e.target.value)}
                className="text-[12px] text-ink-2 bg-transparent outline-none font-mono w-full"
                placeholder="auto-generated-from-title"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div className="card p-5">
            <label className="block text-[11px] font-semibold text-ink-3 uppercase tracking-wider mb-2">Excerpt</label>
            <textarea
              value={form.excerpt}
              onChange={e => update('excerpt', e.target.value)}
              rows={3}
              placeholder="Short summary shown in blog list..."
              className="w-full bg-transparent text-ink text-[14px] outline-none placeholder:text-ink-3 resize-none"
            />
          </div>

          {/* Content */}
          <div className="card p-5">
            <label className="block text-[11px] font-semibold text-ink-3 uppercase tracking-wider mb-2">Content (Markdown)</label>
            <textarea
              value={form.content}
              onChange={e => update('content', e.target.value)}
              rows={20}
              placeholder="Write your post in Markdown..."
              className="w-full bg-card2 rounded-[12px] p-4 text-ink text-[13px] font-mono outline-none placeholder:text-ink-3 resize-y border border-[var(--border)]"
            />
          </div>

          {/* Tags + Status */}
          <div className="card p-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-ink-3 uppercase tracking-wider mb-2">Tags (comma separated)</label>
                <input
                  value={form.tags}
                  onChange={e => update('tags', e.target.value)}
                  placeholder="UX Design, Product, Research"
                  className="w-full bg-card2 rounded-[10px] px-3 py-2 text-[13px] text-ink outline-none border border-[var(--border)]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-ink-3 uppercase tracking-wider mb-2">Status</label>
                <button
                  onClick={() => update('status', form.status === 'published' ? 'draft' : 'published')}
                  className={`px-4 py-2 rounded-pill text-[12px] font-semibold border-0 cursor-pointer transition-all ${form.status === 'published' ? 'bg-[rgba(34,201,129,0.15)] text-[#22c981]' : 'bg-card2 text-ink-3'}`}
                >
                  {form.status === 'published' ? '✅ Published' : '📝 Draft'}
                </button>
              </div>
            </div>
          </div>

          {/* View Post link (if editing & published) */}
          {editId && form.status === 'published' && form.slug && (
            <a href={`/blog/${form.slug}`} target="_blank" className="text-accent text-[13px] no-underline hover:underline font-medium">
              View published post ↗
            </a>
          )}
        </div>
      </main>
    </div>
  )
}

export default function DashboardBlogNewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-page flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" /></div>}>
      <BlogFormInner />
    </Suspense>
  )
}
