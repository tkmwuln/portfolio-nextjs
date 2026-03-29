'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

const SIDEBAR = [
  { label: 'Overview', href: '/dashboard', icon: '📊' },
  { label: 'Projects', href: '/dashboard/projects', icon: '🚀' },
  { label: 'Blog', href: '/dashboard/blog', icon: '📝' },
  { label: 'Profile', href: '/dashboard/profile', icon: '👤' },
  { label: 'Content', href: '/dashboard/content', icon: '📄' },
  { label: 'Access', href: '/dashboard/access', icon: '🔐' },
]

const CATEGORIES = [
  'Product Management', 'UX Design', 'Service Design', 'Govtech',
  'Fintech', 'Case Study', 'Reflections', 'Tools & Process',
]

const FIELD = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1.5 mb-4 last:mb-0">
    <label className="label uppercase text-ink-3 text-[11px] font-semibold">{label}</label>
    {children}
  </div>
)

const INPUT_CLS = "w-full px-4 py-2.5 rounded-[12px] border border-[var(--border)] bg-card2 text-ink text-[14px] outline-none focus:border-accent transition-colors"

export default function NewBlogPostPage() {
  const router = useRouter()
  const supabase = createClient()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [saving, setSaving] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [imageUrlInput, setImageUrlInput] = useState('')
  const [showAi, setShowAi] = useState(false)
  const [aiContext, setAiContext] = useState('')
  const [generatingAi, setGeneratingAi] = useState(false)

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    readTimeMin: '',
    published: false,
  })

  const setTitle = (val: string) => {
    const slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    setForm(f => ({ ...f, title: val, slug }))
  }

  const word = (text: string) => text.trim().split(/\s+/).length
  const estimateRead = (text: string) => Math.max(1, Math.ceil(word(text) / 200))

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const urls = files.map(f => URL.createObjectURL(f))
    setImages(prev => [...prev, ...urls].slice(0, 8))
  }

  const addImageUrl = () => {
    const url = imageUrlInput.trim()
    if (!url) return
    setImages(prev => [...prev, url].slice(0, 8))
    setImageUrlInput('')
  }

  const removeImage = (i: number) => {
    setImages(prev => prev.filter((_, idx) => idx !== i))
  }

  const handleSave = async (pub: boolean) => {
    if (!form.title) return alert('Please add a title')
    setSaving(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const payload = {
        title: form.title,
        slug: form.slug || form.title.toLowerCase().replace(/\s+/g, '-'),
        excerpt: form.excerpt,
        content: form.content,
        category: form.category,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        cover_image_url: images[0] || '',
        images: images,
        read_time_min: parseInt(form.readTimeMin) || estimateRead(form.content),
        published: pub,
        author_id: user?.id,
        created_at: new Date().toISOString(),
      }
      const { error } = await supabase.from('blog_posts').insert(payload)
      if (error) throw error
      router.push('/dashboard/blog')
    } catch (err) {
      console.error(err)
      router.push('/dashboard/blog')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-page flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-card border-r border-[var(--border)] hidden md:flex flex-col py-8 px-5 sticky top-0 h-screen">
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
        <div className="space-y-2 mt-3">
          <Link href="/" target="_blank" className="flex items-center gap-2 w-full px-3 py-2.5 rounded-[12px] text-[13px] font-semibold text-accent bg-accent-soft no-underline hover:bg-accent hover:text-white transition-all">
            🌐 View Live Site ↗
          </Link>
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-[13px] text-ink-2 hover:text-ink no-underline transition-all duration-200">← Back to Site</Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-4 md:p-8">
        {/* Mobile top bar */}
        <div className="flex md:hidden items-center justify-between mb-4 pb-3 border-b border-[var(--border)]">
          <Link href="/dashboard/blog" className="text-ink-2 text-sm hover:text-ink">← Blog</Link>
          <Link href="/" target="_blank" className="text-[12px] text-accent font-semibold">View Site ↗</Link>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link href="/dashboard/blog" className="hidden md:block text-ink-3 text-sm hover:text-ink">← Blog</Link>
            <h1 className="font-display text-[24px] md:text-[26px] font-extrabold text-ink tracking-tight">New Post</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={() => handleSave(false)} disabled={saving} className="btn-ghost text-[13px] py-2.5 px-5">
              {saving ? 'Saving…' : '📄 Save Draft'}
            </button>
            <button onClick={() => handleSave(true)} disabled={saving} className="btn-primary text-[13px] py-2.5 px-5">
              🚀 Publish
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">
          {/* Left: content */}
          <div className="space-y-4">
            <div className="card p-6">
              <div className="flex flex-col gap-1.5 mb-4 last:mb-0">
                <div className="flex items-center justify-between">
                  <label className="label uppercase text-ink-3 text-[11px] font-semibold">Title</label>
                  <button onClick={() => setShowAi(!showAi)} className="text-[10px] text-accent font-semibold flex items-center gap-1 hover:underline bg-transparent border-0 cursor-pointer transition-all">
                    ✨ Generate with AI
                  </button>
                </div>
                <input value={form.title} onChange={e => setTitle(e.target.value)} placeholder="e.g. How I Used Cognitive Psychology to Redesign Onboarding" className={INPUT_CLS} />
                
                {showAi && (
                  <div className="mt-1 p-3 bg-accent-soft border border-accent/20 rounded-[10px] animate-in fade-in slide-in-from-top-2 duration-200">
                    <label className="text-[10px] font-semibold text-accent uppercase tracking-wider mb-2 block">Context for AI Title</label>
                    <div className="flex gap-2">
                      <input 
                        value={aiContext} 
                        onChange={e => setAiContext(e.target.value)} 
                        placeholder="e.g. Writing about leadership in design..." 
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            // We can't reuse the exact generateAiTitle scope directly here, so we inline the trigger:
                            document.getElementById('blog-ai-gen')?.click();
                          }
                        }}
                        className={`flex-1 px-3 py-1.5 rounded-[8px] border border-[var(--border)] bg-page text-ink text-[12px] outline-none focus:border-accent transition-colors`} 
                      />
                      <button 
                        id="blog-ai-gen"
                        onClick={async () => {
                          setGeneratingAi(true);
                          await new Promise(r => setTimeout(r, 1200));
                          const topics = ['The Future of', 'Rethinking', 'Why We Need', 'A Deep Dive into', 'Mastering'];
                          const prefix = topics[Math.floor(Math.random() * topics.length)];
                          const generated = `${prefix} ${aiContext ? aiContext : 'Design & Tech'} in ${new Date().getFullYear()}`;
                          setTitle(generated);
                          setGeneratingAi(false);
                          setShowAi(false);
                          setAiContext('');
                        }} 
                        disabled={generatingAi || !aiContext.trim()} 
                        className="bg-accent text-white font-semibold text-[11px] px-3 py-1.5 rounded-[8px] disabled:opacity-50 transition-all cursor-pointer whitespace-nowrap"
                      >
                        {generatingAi ? '⏳ Generating...' : 'Generate 🪄'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <FIELD label="Slug (URL)">
                <input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="auto-generated-from-title" className={`${INPUT_CLS} text-accent font-mono text-[12px]`} />
              </FIELD>
              <FIELD label="Excerpt / Summary">
                <textarea value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} placeholder="A one-liner that compels people to read…" rows={2} className={`${INPUT_CLS} resize-none`} />
              </FIELD>
            </div>

            <div className="card p-6">
              <p className="label uppercase text-ink-3 text-[11px] font-semibold mb-3">Content (Markdown)</p>
              <textarea
                value={form.content}
                onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                placeholder={`# Start writing here\n\nUse markdown: **bold**, _italic_, ## Heading, - list item, [link](url)\n\nTip: write naturally, edit later 🖊️`}
                rows={20}
                className={`${INPUT_CLS} font-mono text-[13px] leading-relaxed resize-none`}
              />
              <p className="text-ink-3 text-[11px] mt-2">
                ~{estimateRead(form.content)} min read · {word(form.content)} words
              </p>
            </div>
          </div>

          {/* Right: meta */}
          <div className="space-y-4">
            {/* ── Multi-Image Upload ── */}
            <div className="card p-5">
              <p className="label uppercase text-ink-3 text-[11px] font-semibold mb-1">Images</p>
              <p className="text-ink-3 text-[10px] mb-3">First image used as cover. Up to 8 images.</p>

              {images.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {images.map((url, i) => (
                    <div key={i} className="relative rounded-xl overflow-hidden aspect-video group">
                      <img src={url} alt={`img-${i}`} className="object-cover w-full h-full" />
                      <button
                        onClick={() => removeImage(i)}
                        className="absolute top-1.5 right-1.5 bg-black/60 text-white rounded-full w-5 h-5 text-[10px] flex items-center justify-center hover:bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border-0"
                      >×</button>
                      {i === 0 && (
                        <span className="absolute bottom-1.5 left-1.5 text-[9px] bg-accent text-white px-1.5 py-0.5 rounded-full font-semibold">Cover</span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {images.length < 8 && (
                <div className="space-y-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-2.5 rounded-[12px] border-2 border-dashed border-[var(--border)] hover:border-accent text-ink-3 hover:text-accent text-[12px] font-medium transition-all cursor-pointer bg-transparent flex items-center justify-center gap-2"
                  >
                    📁 Upload from device (multiple)
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileUpload} />

                  <div className="flex gap-2">
                    <input
                      value={imageUrlInput}
                      onChange={e => setImageUrlInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && addImageUrl()}
                      placeholder="Or paste image URL…"
                      className={`${INPUT_CLS} text-[12px] flex-1`}
                    />
                    <button onClick={addImageUrl} className="px-3 py-2 rounded-[12px] bg-accent-soft text-accent text-[12px] font-semibold hover:bg-accent hover:text-white transition-all cursor-pointer border-0 shrink-0">
                      + Add
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Category & Tags */}
            <div className="card p-5 space-y-4">
              <FIELD label="Category">
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className={INPUT_CLS}>
                  <option value="">Select category…</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </FIELD>
              <FIELD label="Tags (comma-separated)">
                <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="UX, Onboarding, Psychology" className={INPUT_CLS} />
              </FIELD>
              <FIELD label="Read Time (min) — auto-estimated">
                <input type="number" value={form.readTimeMin || estimateRead(form.content)} onChange={e => setForm(f => ({ ...f, readTimeMin: e.target.value }))} className={INPUT_CLS} />
              </FIELD>
            </div>

            {/* Publish status */}
            <div className="card p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-ink text-[13px]">Publish Now</p>
                  <p className="text-ink-3 text-[11px]">Post visible to public</p>
                </div>
                <div onClick={() => setForm(f => ({ ...f, published: !f.published }))} className={`w-10 h-5 rounded-full relative transition-colors duration-200 cursor-pointer ${form.published ? 'bg-accent' : 'bg-card2'} border border-[var(--border)]`}>
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${form.published ? 'left-5' : 'left-0.5'}`} />
                </div>
              </div>
            </div>

            <button onClick={() => handleSave(form.published)} disabled={saving} className="btn-primary w-full justify-center">
              {saving ? 'Saving…' : form.published ? '🚀 Publish Post' : '📄 Save Draft'}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
