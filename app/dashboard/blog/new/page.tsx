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


  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col md:flex-row font-body text-[#0f172a]">
      <Sidebar />

      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/blog" className="flex items-center gap-2 text-[#94a3b8] hover:text-[#475569] text-[14px] font-medium transition-colors no-underline">
              <span className="text-[18px]">←</span> Blog
            </Link>
            <h1 className="font-display text-[28px] font-bold text-[#0f172a] tracking-tight">New Post</h1>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleSave(false)} 
              disabled={saving}
              className="px-6 py-2.5 rounded-full text-[14px] font-semibold text-[#475569] bg-white border border-[#e2e8f0] hover:bg-[#f8fafc] hover:border-[#cbd5e1] transition-all shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              📄 Save Draft
            </button>
            <button 
              onClick={() => handleSave(true)} 
              disabled={saving}
              className="px-8 py-2.5 rounded-full text-[14px] font-bold text-white bg-[#0f172a] hover:bg-[#1e293b] transition-all flex items-center gap-2 shadow-md shadow-slate-200 cursor-pointer disabled:opacity-50"
            >
              🚀 Publish
            </button>
          </div>
        </div>

        {msg && (
          <div className={`mb-8 px-6 py-4 rounded-2xl text-[14px] font-medium border animate-in fade-in slide-in-from-top-4 ${msg.type === 'success' ? 'bg-[#f0fdf4] text-[#16a34a] border-[#bcf0da]' : 'bg-[#fef2f2] text-[#dc2626] border-[#fecaca]'}`}>
            {msg.type === 'success' ? '✨ ' : '⚠️ '}{msg.text}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Content Area */}
          <div className="flex-1 space-y-8">
            
            {/* Title Section */}
            <div className="bg-white rounded-[24px] border border-[#e2e8f0] p-8 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <label className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-[0.1em]">Title</label>
                <button className="text-[11px] font-bold text-[#6366f1] flex items-center gap-1.5 hover:opacity-70 bg-white border border-[#eef2ff] px-3 py-1 rounded-full cursor-pointer transition-all shadow-sm">
                  ✨ Generate with AI
                </button>
              </div>
              <input
                value={form.title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. How I Used Cognitive Psychology to Redesign Onboarding"
                className="w-full bg-transparent text-[22px] font-semibold text-[#0f172a] outline-none placeholder:text-[#cbd5e1] border-0 p-0 mb-6"
              />
              
              <div className="pt-6 border-t border-[#f1f5f9]">
                <label className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-[0.1em] block mb-3">Slug (URL)</label>
                <input
                  value={form.slug}
                  onChange={e => update('slug', e.target.value)}
                  placeholder="auto-generated-from-title"
                  className="w-full bg-[#f8fafc] text-[13px] text-[#475569] font-mono outline-none px-4 py-2.5 rounded-xl border border-[#f1f5f9] focus:border-[#e2e8f0] transition-colors"
                />
              </div>

              <div className="mt-6 pt-6 border-t border-[#f1f5f9]">
                <label className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-[0.1em] block mb-3">Excerpt / Summary</label>
                <textarea
                  value={form.excerpt}
                  onChange={e => update('excerpt', e.target.value)}
                  placeholder="A one-liner that compels people to read..."
                  rows={2}
                  className="w-full bg-transparent text-[15px] text-[#475569] outline-none resize-none p-0 border-0 leading-relaxed placeholder:text-[#cbd5e1]"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="bg-white rounded-[24px] border border-[#e2e8f0] p-8 shadow-sm min-h-[600px] flex flex-col">
              <label className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-[0.1em] block mb-6">Content (Markdown)</label>
              <div className="relative flex-1">
                <textarea
                  value={form.content}
                  onChange={e => update('content', e.target.value)}
                  placeholder="# Start writing here&#10;&#10;Use markdown: **bold**, _italic_, ## Heading, - list item, [link](url)&#10;&#10;Tip: write naturally, edit later 🖋️"
                  className="w-full h-full min-h-[500px] bg-transparent text-[16px] leading-[1.8] text-[#334155] outline-none border-0 p-0 resize-none placeholder:text-[#cbd5e1]"
                />
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="w-full lg:w-[360px] space-y-8">
            
            {/* Images Card */}
            <div className="bg-white rounded-[24px] border border-[#e2e8f0] p-8 shadow-sm">
              <label className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-[0.1em] block mb-1">Images</label>
              <p className="text-[10px] text-[#94a3b8] mb-6 font-medium">First image used as cover. Up to 8 images.</p>
              
              <div className="space-y-4">
                <button className="w-full py-8 border-2 border-dashed border-[#e2e8f0] rounded-[20px] flex flex-col items-center justify-center gap-3 hover:bg-[#f8fafc] hover:border-[#cbd5e1] transition-all group bg-transparent cursor-pointer">
                  <span className="text-[20px] filter grayscale group-hover:grayscale-0 transition-all opacity-60 group-hover:opacity-100">📂</span>
                  <span className="text-[12px] font-bold text-[#64748b]">Upload from device (multiple)</span>
                </button>
                
                <div className="flex gap-2">
                  <input 
                    value={imageUrlInput}
                    onChange={e => setImageUrlInput(e.target.value)}
                    placeholder="Or paste image URL..." 
                    className="flex-1 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#cbd5e1] transition-all"
                  />
                  <button onClick={addImageUrl} className="bg-[#eff6ff] hover:bg-[#dbeafe] text-[#2563eb] px-4 rounded-xl font-bold text-[18px] border-0 cursor-pointer transition-colors">+</button>
                </div>
                
                {images.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {images.map((img, i) => (
                      <div key={i} className="aspect-square rounded-[12px] bg-[#f8fafc] border border-[#e2e8f0] overflow-hidden relative group shadow-sm">
                        <img src={img} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                        <button 
                          onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))}
                          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[12px] font-bold transition-opacity border-0 cursor-pointer backdrop-blur-[2px]"
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
            <div className="bg-white rounded-[24px] border border-[#e2e8f0] p-8 shadow-sm space-y-8">
              <div>
                <label className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-[0.1em] block mb-3">Category</label>
                <div className="relative">
                  <select 
                    value={form.category}
                    onChange={e => update('category', e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-4 py-3 text-[13px] font-semibold text-[#0f172a] outline-none appearance-none cursor-pointer focus:border-[#cbd5e1] transition-all"
                  >
                    <option value="">Select category...</option>
                    <option value="UX Design">UX Design</option>
                    <option value="Product Strategy">Product Strategy</option>
                    <option value="Psychology">Psychology</option>
                    <option value="Tech">Tech</option>
                    <option value="Development">Development</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#94a3b8]">↓</div>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-[0.1em] block mb-3">Tags (comma-separated)</label>
                <input
                  value={form.tags}
                  onChange={e => update('tags', e.target.value)}
                  placeholder="UX, Onboarding, Psychology"
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#cbd5e1] transition-all placeholder:text-[#cbd5e1] font-medium"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-[0.1em] block mb-3">Read Time (min) — auto-estimated</label>
                <input
                  type="number"
                  value={form.readTime}
                  onChange={e => update('readTime', parseInt(e.target.value))}
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-4 py-3 text-[13px] font-bold text-[#0f172a] outline-none focus:border-[#cbd5e1] transition-all"
                />
              </div>
            </div>

            {/* Publishing Card */}
            <div className="bg-white rounded-[24px] border border-[#e2e8f0] p-8 shadow-sm">
               <div className="flex items-center justify-between mb-8">
                 <div>
                   <p className="text-[14px] font-bold text-[#0f172a] mb-1">Publish Now</p>
                   <p className="text-[11px] text-[#64748b] font-medium">Post visible to public</p>
                 </div>
                 <button 
                  onClick={() => update('status', form.status === 'published' ? 'draft' : 'published')}
                  className={`w-12 h-6 rounded-full relative transition-all duration-300 border-0 cursor-pointer ${form.status === 'published' ? 'bg-[#10b981] shadow-inner' : 'bg-[#e2e8f0]'}`}
                 >
                   <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300 transform ${form.status === 'published' ? 'translate-x-7' : 'translate-x-1'}`} />
                 </button>
               </div>
               
               <button 
                onClick={() => handleSave(false)} 
                disabled={saving}
                className="w-full bg-[#0f172a] text-white font-bold text-[14px] py-4 rounded-2xl hover:bg-[#1e293b] transition-all border-0 cursor-pointer disabled:opacity-50 shadow-md shadow-slate-200 flex items-center justify-center gap-2"
               >
                 {saving ? (
                   <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                 ) : (
                   <>💾 Save Draft</>
                 )}
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
