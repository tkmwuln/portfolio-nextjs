'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState, Suspense } from 'react'
import Sidebar from '@/app/components/dashboard/Sidebar'

type FormData = {
  title: string
  slug: string
  excerpt: string
  content: string
  tags: string
  category: string
  readTime: number
  coverImageUrl: string
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
  const [images, setImages] = useState<string[]>([])
  const [imageUrlInput, setImageUrlInput] = useState('')
  
  const [form, setForm] = useState<FormData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    tags: '',
    category: '',
    readTime: 1,
    coverImageUrl: '',
    status: 'draft',
  })

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      setUserId(user.id)

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
            category: post.category || '',
            readTime: post.readTimeMin || 1,
            coverImageUrl: post.coverImageUrl || '',
            status: post.status || 'draft',
          })
          if (post.coverImageUrl) setImages([post.coverImageUrl])
        }
      }
    }
    init()
  }, [supabase, router, editId])

  // Word count & Read time estimation
  useEffect(() => {
    const words = form.content.trim() ? form.content.trim().split(/\s+/).length : 0
    const minutes = Math.max(1, Math.ceil(words / 200))
    setForm(f => ({ ...f, readTime: minutes }))
  }, [form.content])

  const setTitle = (val: string) => {
    const slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    setForm(f => ({ ...f, title: val, slug }))
  }

  const update = (k: keyof FormData, v: any) => setForm(f => ({ ...f, [k]: v }))

  const addImageUrl = () => {
    if (!imageUrlInput.trim()) return
    setImages(prev => [...prev, imageUrlInput.trim()])
    if (!form.coverImageUrl) update('coverImageUrl', imageUrlInput.trim())
    setImageUrlInput('')
  }

  const handleSave = async (publishOverride?: boolean) => {
    if (!form.title.trim()) { setMsg({ type: 'error', text: 'Title is required.' }); return }
    setSaving(true)
    setMsg(null)

    const isPublishing = publishOverride !== undefined ? publishOverride : (form.status === 'published')
    const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean)
    
    const payload = {
      ...form,
      tags,
      status: isPublishing ? 'published' : 'draft',
      userId,
      coverImageUrl: images[0] || form.coverImageUrl,
      readTimeMin: form.readTime
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
        setMsg({ type: 'success', text: isPublishing ? '✅ Published!' : '✅ Saved as draft!' })
        if (!editId) {
          setTimeout(() => router.push(`/dashboard/blog/new?edit=${data.id}`), 800)
        }
      }
    } catch {
      setMsg({ type: 'error', text: 'Network error. Please try again.' })
    }
    setSaving(false)
  }

  const wordCount = form.content.trim() ? form.content.trim().split(/\s+/).length : 0

  return (
    <div className="min-h-screen bg-[#f8f9fc] flex flex-col md:flex-row">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link href="/dashboard/blog" className="text-ink-3 hover:text-ink text-[13px] no-underline">← Blog</Link>
            <h1 className="font-display text-[24px] font-bold text-ink">New Post</h1>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleSave(false)} 
              disabled={saving}
              className="px-5 py-2 rounded-[10px] text-[13px] font-semibold text-ink-2 bg-white border border-[var(--border)] hover:bg-card2 transition-all disabled:opacity-50"
            >
              📝 Save Draft
            </button>
            <button 
              onClick={() => handleSave(true)} 
              disabled={saving}
              className="px-6 py-2 rounded-[10px] text-[13px] font-bold text-white bg-ink hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              🚀 Publish
            </button>
          </div>
        </div>

        {msg && (
          <div className={`mb-6 px-4 py-3 rounded-[12px] text-[13px] font-medium border animate-in fade-in slide-in-from-top-2 ${msg.type === 'success' ? 'bg-[#f0fdf4] text-[#16a34a] border-[#bcf0da]' : 'bg-[#fef2f2] text-[#dc2626] border-[#fecaca]'}`}>
            {msg.text}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <div className="flex-1 space-y-6">
            
            {/* Title Section */}
            <div className="bg-white rounded-[16px] border border-[var(--border)] p-6 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <label className="text-[10px] font-bold text-ink-3 uppercase tracking-widest">Title</label>
                <button className="text-[11px] font-bold text-accent flex items-center gap-1 hover:opacity-70 bg-transparent border-0 cursor-pointer">
                  ✨ Generate with AI
                </button>
              </div>
              <input
                value={form.title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. How I Used Cognitive Psychology to Redesign Onboarding"
                className="w-full bg-transparent text-[18px] font-medium text-ink outline-none placeholder:text-ink-3/40 border-0 p-0"
              />
              <div className="mt-4 pt-4 border-t border-[#f1f1f5]">
                <label className="text-[10px] font-bold text-ink-3 uppercase tracking-widest block mb-2">Slug (URL)</label>
                <input
                  value={form.slug}
                  onChange={e => update('slug', e.target.value)}
                  placeholder="auto-generated-from-title"
                  className="w-full bg-transparent text-[13px] text-ink-2 font-mono outline-none p-0 border-0"
                />
              </div>
              <div className="mt-4 pt-4 border-t border-[#f1f1f5]">
                <label className="text-[10px] font-bold text-ink-3 uppercase tracking-widest block mb-2">Excerpt / Summary</label>
                <textarea
                  value={form.excerpt}
                  onChange={e => update('excerpt', e.target.value)}
                  placeholder="A one-liner that compels people to read..."
                  rows={2}
                  className="w-full bg-transparent text-[14px] text-ink-2 outline-none resize-none p-0 border-0"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="bg-white rounded-[16px] border border-[var(--border)] p-6 shadow-sm">
              <label className="text-[10px] font-bold text-ink-3 uppercase tracking-widest block mb-4">Content (Markdown)</label>
              <div className="relative">
                <textarea
                  value={form.content}
                  onChange={e => update('content', e.target.value)}
                  placeholder="# Start writing here&#10;&#10;Use markdown: **bold**, _italic_, ## Heading, - list item, [link](url)&#10;&#10;Tip: write naturally, edit later 🖋️"
                  className="w-full min-h-[500px] bg-transparent text-[15px] leading-relaxed text-ink outline-none border-0 p-0 resize-y font-serif italic text-ink-3/60"
                  style={{ fontStyle: form.content ? 'normal' : 'italic' }}
                />
              </div>
              <div className="mt-6 pt-4 border-t border-[#f1f1f5] flex justify-between items-center text-[10px] text-ink-3 font-semibold uppercase tracking-widest">
                <span>~{form.readTime} min read - {wordCount} words</span>
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="w-full lg:w-[320px] space-y-6">
            
            {/* Images Card */}
            <div className="bg-white rounded-[16px] border border-[var(--border)] p-6 shadow-sm">
              <label className="text-[10px] font-bold text-ink-3 uppercase tracking-widest block mb-1">Images</label>
              <p className="text-[10px] text-ink-3/60 mb-4 font-medium italic">First image used as cover. Up to 5 images.</p>
              
              <div className="space-y-3">
                <button className="w-full py-4 border-2 border-dashed border-[#e2e8f0] rounded-[12px] flex flex-col items-center justify-center gap-2 hover:bg-[#f8fafc] transition-all group bg-transparent cursor-pointer">
                  <span className="text-[16px] group-hover:scale-110 transition-transform">📁</span>
                  <span className="text-[11px] font-bold text-ink-3">Upload from device (multiple)</span>
                </button>
                
                <div className="flex gap-2">
                  <input 
                    value={imageUrlInput}
                    onChange={e => setImageUrlInput(e.target.value)}
                    placeholder="Or paste image URL..." 
                    className="flex-1 bg-card2 border border-[var(--border)] rounded-[10px] px-3 py-2 text-[12px] outline-none"
                  />
                  <button onClick={addImageUrl} className="bg-[#f1f5f9] hover:bg-[#e2e8f0] text-accent p-2 rounded-[10px] font-bold text-[14px] border-0 cursor-pointer">+</button>
                </div>
                
                {images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {images.map((img, i) => (
                      <div key={i} className="aspect-square rounded-[8px] bg-card2 border border-[var(--border)] overflow-hidden relative group">
                        <img src={img} className="w-full h-full object-cover" />
                        <button 
                          onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))}
                          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-bold transition-opacity border-0 cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Classification Card */}
            <div className="bg-white rounded-[16px] border border-[var(--border)] p-6 shadow-sm space-y-6">
              <div>
                <label className="text-[10px] font-bold text-ink-3 uppercase tracking-widest block mb-3">Category</label>
                <select 
                  value={form.category}
                  onChange={e => update('category', e.target.value)}
                  className="w-full bg-card2 border border-[var(--border)] rounded-[10px] px-3 py-2.5 text-[12px] font-medium text-ink outline-none appearance-none cursor-pointer"
                >
                  <option value="">Select category...</option>
                  <option value="UX Design">UX Design</option>
                  <option value="Product Strategy">Product Strategy</option>
                  <option value="Psychology">Psychology</option>
                  <option value="Tech">Tech</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-ink-3 uppercase tracking-widest block mb-3">Tags (comma-separated)</label>
                <input
                  value={form.tags}
                  onChange={e => update('tags', e.target.value)}
                  placeholder="UX, Onboarding, Psychology"
                  className="w-full bg-card2 border border-[var(--border)] rounded-[10px] px-3 py-2.5 text-[12px] outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-ink-3 uppercase tracking-widest block mb-3">Read Time (min) — auto-estimated</label>
                <input
                  type="number"
                  value={form.readTime}
                  onChange={e => update('readTime', parseInt(e.target.value))}
                  className="w-full bg-card2 border border-[var(--border)] rounded-[10px] px-3 py-2.5 text-[12px] font-bold outline-none"
                />
              </div>
            </div>

            {/* Footer Actions */}
            <div className="bg-white rounded-[16px] border border-[var(--border)] p-6 shadow-sm">
               <div className="flex items-center justify-between mb-6">
                 <div>
                   <p className="text-[13px] font-bold text-ink mb-0.5">Publish Now</p>
                   <p className="text-[10px] text-ink-3 font-medium">Post visible to public</p>
                 </div>
                 <button 
                  onClick={() => update('status', form.status === 'published' ? 'draft' : 'published')}
                  className={`w-12 h-6 rounded-full relative transition-colors duration-200 border-0 cursor-pointer ${form.status === 'published' ? 'bg-[#10b981]' : 'bg-[#e2e8f0]'}`}
                 >
                   <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-200 ${form.status === 'published' ? 'right-1' : 'left-1'}`} />
                 </button>
               </div>
               
               <button 
                onClick={() => handleSave(false)} 
                disabled={saving}
                className="w-full bg-ink text-white font-bold text-[13px] py-4 rounded-[12px] hover:opacity-90 transition-all border-0 cursor-pointer disabled:opacity-50"
               >
                 {saving ? 'Saving...' : '💾 Save Draft'}
               </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function DashboardBlogNewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" /></div>}>
      <BlogFormInner />
    </Suspense>
  )
}
