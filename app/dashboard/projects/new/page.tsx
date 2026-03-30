'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'

const SIDEBAR = [
  { label: 'Overview', href: '/dashboard', icon: '📊' },
  { label: 'Projects', href: '/dashboard/projects', icon: '🚀' },
  { label: 'Blog', href: '/dashboard/blog', icon: '📝' },
  { label: 'Profile', href: '/dashboard/profile', icon: '👤' },
  { label: 'Access', href: '/dashboard/access', icon: '🔐' },
]

const CATEGORIES = [
  'Govtech · E-Health', 'B2B SaaS', 'Govtech', 'Fintech',
  'Design System', 'Blockchain', 'E-Health',
]

const GRADIENTS = [
  { label: '🔵 PM — Periwinkle (default)', value: 'linear-gradient(135deg, #c8d4f8 0%, #b8c5f5 100%)' },
  { label: '🟣 UX — Soft Violet', value: 'linear-gradient(135deg, #ddc8f5 0%, #c8b8f0 100%)' },
  { label: '🟢 DS — Mint Green', value: 'linear-gradient(135deg, #b8f0d8 0%, #a8e8cc 100%)' },
  { label: '🌊 Navy → Blue', value: 'linear-gradient(140deg, #2c3e50 0%, #3498db 100%)' },
  { label: '🌙 Midnight Blue', value: 'linear-gradient(140deg, #141e30 0%, #243b55 100%)' },
  { label: '🟤 Plum → Peach', value: 'linear-gradient(140deg, #4b1248 0%, #f0c27b 100%)' },
  { label: '🫐 Purple Lavender', value: 'linear-gradient(140deg, #1f1c2c 0%, #928dab 100%)' },
]

const INPUT_CLS = "w-full px-4 py-2.5 rounded-[12px] border border-[var(--border)] bg-card2 text-ink text-[14px] outline-none focus:border-accent transition-colors"

type DocMode = 'none' | 'link' | 'upload'

export default function NewProjectPage() {
  const router = useRouter()
  const supabase = createClient()
  const [saving, setSaving] = useState(false)
  const [docMode, setDocMode] = useState<DocMode>('none')
  const [docEnabled, setDocEnabled] = useState(true)
  const [uploadingDoc, setUploadingDoc] = useState(false)

  const [showAi, setShowAi] = useState(false)
  const [aiContext, setAiContext] = useState('')
  const [generatingAi, setGeneratingAi] = useState(false)
  
  const [form, setForm] = useState({
    title: '', description: '', content: '', image: '',
    category: '', clientName: '', projectYear: new Date().getFullYear(),
    slug: '', metricValue: '', metricLabel: '',
    gradient: GRADIENTS[0].value, published: true, featured: false, showDetails: true,
    docUrl: '', docLabel: 'Download Case Study',
    role: '', tags: '',
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const update = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }))
  const setTitle = (val: string) => {
    const slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    setForm(f => ({ ...f, title: val, slug }))
  }

  const handleDocUpload = async (file: File) => {
    setUploadingDoc(true)
    try {
      // For demo: store as object URL or Google Drive link
      const reader = new FileReader()
      reader.onload = () => {
        // In production this would upload to Supabase Storage
        // For now, we just note the filename
        update('docLabel', file.name.replace(/\.[^.]+$/, '') || 'Download Document')
      }
      reader.readAsDataURL(file)
      alert(`📄 Document "${file.name}" noted! In production, this uploads to Supabase Storage. For now, paste the Google Drive/Notion link instead.`)
    } finally {
      setUploadingDoc(false)
    }
  }

  const handleSave = async () => {
    if (!form.title) return alert('Title is required')
    setSaving(true)
    try {
      const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 60)
      const payload = {
        title: form.title,
        description: form.description,
        content: form.content,
        image: form.image || null,
        category: form.category,
        clientName: form.clientName,
        projectYear: form.projectYear,
        slug,
        metricValue: form.metricValue || null,
        gradient: form.gradient,
        published: form.published,
        featured: form.featured,
        docUrl: form.docUrl || null,
        docLabel: form.docLabel,
        role: form.role,
        technologies: form.tags ? form.tags.split(',').map(t => t.trim()) : [],
        createdAt: new Date().toISOString(),
      }
      const { error } = await supabase.from('projects').insert(payload)
      if (error) {
        console.warn('Supabase insert failed (expected in demo):', error.message)
      }
      router.push('/dashboard/projects')
    } catch (e) {
      console.error(e)
      router.push('/dashboard/projects')
    } finally {
      setSaving(false)
    }
  }

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
        <div className="space-y-2 mt-3">
          <Link href="/" target="_blank" className="flex items-center gap-2 w-full px-3 py-2.5 rounded-[12px] text-[13px] font-semibold text-accent bg-accent-soft no-underline hover:bg-accent hover:text-white transition-all duration-200">
            🌐 View Live Site ↗
          </Link>
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-[13px] text-ink-2 hover:text-ink no-underline transition-all duration-200">
            ← Back to Site
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link href="/dashboard/projects" className="text-ink-3 text-sm hover:text-ink">← Projects</Link>
            <h1 className="font-display text-[26px] font-extrabold text-ink tracking-tight">New Project</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={() => { update('published', false); handleSave() }} disabled={saving} className="btn-ghost text-[13px] py-2.5 px-5">
              📄 Save Draft
            </button>
            <button onClick={handleSave} disabled={saving} className="btn-primary text-[13px] py-2.5 px-5">
              {saving ? 'Saving…' : '🚀 Publish'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_300px] gap-5">
          {/* Left */}
          <div className="space-y-4">
            {/* Basic info */}
            <div className="card p-6 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="label uppercase text-ink-3 text-[11px] font-semibold block">Project Title *</label>
                  <button onClick={() => setShowAi(!showAi)} className="text-[10px] text-accent font-semibold flex items-center gap-1 hover:underline bg-transparent border-0 cursor-pointer transition-all">
                    ✨ Generate with AI
                  </button>
                </div>
                <input value={form.title} onChange={e => setTitle(e.target.value)} placeholder="e.g. E-Health Platform — SIMRS Kesehatan" className={INPUT_CLS} />
                
                {showAi && (
                  <div className="mt-2 p-3 bg-accent-soft border border-accent/20 rounded-[10px] animate-in fade-in slide-in-from-top-2 duration-200">
                    <label className="text-[10px] font-semibold text-accent uppercase tracking-wider mb-2 block">Context for AI Title</label>
                    <div className="flex gap-2">
                      <input 
                        value={aiContext} 
                        onChange={e => setAiContext(e.target.value)} 
                        placeholder="e.g. App to help doctors manage patients..." 
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            document.getElementById('proj-ai-gen')?.click();
                          }
                        }}
                        className={`flex-1 px-3 py-1.5 rounded-[8px] border border-[var(--border)] bg-page text-ink text-[12px] outline-none focus:border-accent transition-colors`} 
                      />
                      <button 
                        id="proj-ai-gen"
                        onClick={async () => {
                          setGeneratingAi(true);
                          // Mock AI generation delay
                          await new Promise(r => setTimeout(r, 1200));
                          const contextWords = aiContext.trim() ? aiContext.split(' ') : ['Digital'];
                          const prefix = contextWords[Math.floor(Math.random() * contextWords.length)];
                          const generated = `${prefix.charAt(0).toUpperCase() + prefix.slice(1)} Platform — Scalable Solution for ${aiContext ? 'Users' : 'Enterprise'}`;
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
              <div>
                <label className="label uppercase text-ink-3 text-[11px] font-semibold mb-1.5 block">Slug (URL path)</label>
                <input value={form.slug} onChange={e => update('slug', e.target.value)} placeholder="auto-generated" className={`${INPUT_CLS} font-mono text-accent text-[12px]`} />
              </div>
              <div>
                <label className="label uppercase text-ink-3 text-[11px] font-semibold mb-1.5 block">Short Description</label>
                <textarea value={form.description} onChange={e => update('description', e.target.value)} placeholder="A concise line describing the project and its impact…" rows={2} className={`${INPUT_CLS} resize-none`} />
              </div>
              <div>
                <label className="label uppercase text-ink-3 text-[11px] font-semibold mb-1.5 block">Full Case Study Content</label>
                <textarea value={form.content} onChange={e => update('content', e.target.value)} placeholder="Write the full case study here. Can include Overview, Process, Outcomes…" rows={10} className={`${INPUT_CLS} resize-none font-mono text-[13px]`} />
              </div>
            </div>

            {/* Document Download Feature */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-display font-bold text-ink text-[15px]">Project Document</h3>
                  <p className="text-ink-3 text-[12px] mt-0.5">Attach a downloadable case study doc for visitors</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-ink-3">{docEnabled ? '↓ Download visible' : '🚫 Hidden'}</span>
                  <div
                    onClick={() => setDocEnabled(d => !d)}
                    className={`w-10 h-5 rounded-full relative transition-colors duration-200 cursor-pointer ${docEnabled ? 'bg-accent' : 'bg-card2'} border border-[var(--border)]`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${docEnabled ? 'left-5' : 'left-0.5'}`} />
                  </div>
                </div>
              </div>
              {!docEnabled && (
                <div className="p-3 rounded-[10px] bg-card2 text-ink-3 text-[12px] text-center mb-4">Download button hidden from website visitors</div>
              )}

              <div className="flex gap-2 mb-4">
                {(['none', 'link', 'upload'] as DocMode[]).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setDocMode(mode)}
                    className={`flex-1 py-2 rounded-[10px] text-[12px] font-semibold transition-all border ${docMode === mode ? 'bg-accent text-white border-accent' : 'bg-card2 text-ink-2 border-[var(--border)] hover:border-accent hover:text-accent'}`}
                  >
                    {mode === 'none' ? '🚫 No Document' : mode === 'link' ? '🔗 Link (Drive/Notion)' : '⬆ Upload File'}
                  </button>
                ))}
              </div>

              {docMode === 'link' && (
                <div className="space-y-3">
                  <div>
                    <label className="label uppercase text-ink-3 text-[11px] font-semibold mb-1.5 block">Document URL (Google Drive / Notion / Figma)</label>
                    <input value={form.docUrl} onChange={e => update('docUrl', e.target.value)} placeholder="https://drive.google.com/file/d/..." className={INPUT_CLS} />
                  </div>
                  <div>
                    <label className="label uppercase text-ink-3 text-[11px] font-semibold mb-1.5 block">Button Label</label>
                    <input value={form.docLabel} onChange={e => update('docLabel', e.target.value)} placeholder="Download Case Study" className={INPUT_CLS} />
                  </div>
                  {form.docUrl && (
                    <div className="flex items-center gap-2 p-3 rounded-[10px] bg-accent-soft">
                      <span className="text-accent text-sm">📄</span>
                      <span className="text-accent text-[12px] font-medium">Document linked: visitors can download via button on case study page</span>
                    </div>
                  )}
                </div>
              )}

              {docMode === 'upload' && (
                <div className="space-y-3">
                  <div
                    className="border-2 border-dashed border-[var(--border)] rounded-xl p-6 text-center cursor-pointer hover:border-accent hover:bg-accent-soft transition-all"
                    onClick={() => document.getElementById('doc-upload')?.click()}
                  >
                    <div className="text-2xl mb-2">{uploadingDoc ? '⏳' : '📁'}</div>
                    <p className="text-sm text-ink-2 font-medium">{uploadingDoc ? 'Processing…' : 'Click to upload document'}</p>
                    <p className="text-[11px] text-ink-3 mt-1">PDF, DOCX, PPTX · max 20MB</p>
                  </div>
                  <input id="doc-upload" type="file" accept=".pdf,.docx,.pptx,.doc" className="hidden" onChange={e => e.target.files?.[0] && handleDocUpload(e.target.files[0])} />
                  <div className="p-3 rounded-[10px] bg-[rgba(245,166,35,0.1)] border border-[rgba(245,166,35,0.2)]">
                    <p className="text-[11px] text-[#c48b00]">💡 <strong>Tip:</strong> Upload to Google Drive and use the link option for best reliability and analytics tracking.</p>
                  </div>
                  <div>
                    <label className="label uppercase text-ink-3 text-[11px] font-semibold mb-1.5 block">Or paste document URL directly</label>
                    <input value={form.docUrl} onChange={e => update('docUrl', e.target.value)} placeholder="https://..." className={INPUT_CLS} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">
            {/* Cover thumbnail */}
            <div className="card p-4">
              <p className="label uppercase text-ink-3 text-[11px] font-semibold mb-3">Thumbnail</p>
              <div className="rounded-xl overflow-hidden aspect-video mb-3 relative" style={{ background: form.gradient }}>
                {form.image && <img src={form.image} alt="cover" className="object-cover w-full h-full absolute inset-0" />}
                {!form.image && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-3xl font-extrabold text-white/30">{form.title.slice(0, 2).toUpperCase() || 'PW'}</span>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <div>
                  <label className="label uppercase text-ink-3 text-[10px] font-semibold mb-1 block">Image URL (optional)</label>
                  <input value={form.image} onChange={e => update('image', e.target.value)} placeholder="/images/project-thumbnail-default.png" className={`${INPUT_CLS} text-[12px]`} />
                </div>
                <div>
                  <label className="label uppercase text-ink-3 text-[10px] font-semibold mb-1 block">Card Gradient</label>
                  <select value={form.gradient} onChange={e => update('gradient', e.target.value)} className={`${INPUT_CLS} text-[12px]`}>
                    {GRADIENTS.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Project details */}
            <div className="card p-4 space-y-3">
              <p className="label uppercase text-ink-3 text-[11px] font-semibold">Project Details</p>
              <div>
                <label className="label uppercase text-ink-3 text-[10px] font-semibold mb-1 block">Client / Company</label>
                <input value={form.clientName} onChange={e => update('clientName', e.target.value)} placeholder="Telkom Indonesia" className={INPUT_CLS} />
              </div>
              <div>
                <label className="label uppercase text-ink-3 text-[10px] font-semibold mb-1 block">Category</label>
                <select value={form.category} onChange={e => update('category', e.target.value)} className={INPUT_CLS}>
                  <option value="">Select…</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="label uppercase text-ink-3 text-[10px] font-semibold mb-1 block">Year</label>
                <input type="number" value={form.projectYear} onChange={e => update('projectYear', +e.target.value)} className={INPUT_CLS} />
              </div>
              <div>
                <label className="label uppercase text-ink-3 text-[10px] font-semibold mb-1 block">Your Role</label>
                <input value={form.role} onChange={e => update('role', e.target.value)} placeholder="Lead UX Designer & PM" className={INPUT_CLS} />
              </div>
              <div>
                <label className="label uppercase text-ink-3 text-[10px] font-semibold mb-1 block">Key Metric Value</label>
                <input value={form.metricValue} onChange={e => update('metricValue', e.target.value)} placeholder="+38%" className={INPUT_CLS} />
              </div>
              <div>
                <label className="label uppercase text-ink-3 text-[10px] font-semibold mb-1 block">Tags / Skills (comma-sep)</label>
                <input value={form.tags} onChange={e => update('tags', e.target.value)} placeholder="UX Design, Service Design" className={INPUT_CLS} />
              </div>
            </div>

            {/* Publish */}
            <div className="card p-4 space-y-3">
              {([
                { key: 'published', label: 'Published', desc: 'Visible on portfolio site' },
                { key: 'featured', label: 'Featured', desc: 'Show in homepage section' },
                { key: 'showDetails', label: 'Show Details Page', desc: 'Allow visitors to see case study' },
              ] as { key: 'published'|'featured'|'showDetails', label: string, desc: string }[]).map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-ink text-[13px]">{label}</p>
                    <p className="text-ink-3 text-[11px]">{desc}</p>
                  </div>
                  <div
                    onClick={() => update(key, !form[key])}
                    className={`w-10 h-5 rounded-full relative transition-colors duration-200 cursor-pointer ${form[key] ? 'bg-accent' : 'bg-card2'} border border-[var(--border)]`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${form[key] ? 'left-5' : 'left-0.5'}`} />
                  </div>
                </div>
              ))}
            </div>

            <button onClick={handleSave} disabled={saving} className="btn-primary w-full justify-center">
              {saving ? 'Saving…' : '🚀 Create Project'}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
