'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const SIDEBAR = [
  { label: 'Overview', href: '/dashboard', icon: '📊' },
  { label: 'Projects', href: '/dashboard/projects', icon: '🚀' },
  { label: 'Blog', href: '/dashboard/blog', icon: '📝' },
  { label: 'Profile', href: '/dashboard/profile', icon: '👤' },
  { label: 'Content', href: '/dashboard/content', icon: '📄' },
  { label: 'Access', href: '/dashboard/access', icon: '🔐' },
]

const INPUT_CLS = "w-full px-4 py-2.5 rounded-[12px] border border-[var(--border)] bg-card2 text-ink text-[14px] outline-none focus:border-accent transition-colors"

const DEFAULT_METRICS = [
  { label: 'Avg Conversion Lift', value: '+38%', sub: 'across checkout projects', variant: 'blue' },
  { label: 'Retention Impact', value: '+61%', sub: 'D7 retention - Fintech onboarding', variant: 'light' },
  { label: 'Users Impacted', value: '50k+', sub: 'monthly active users', variant: 'dark' },
  { label: 'Components Built', value: '200+', sub: 'design system tokens', variant: 'violet' },
]

const DEFAULT_ABOUT = {
  name: 'Putri Wulandari',
  headline: 'AI Product Manager · Service Designer · UX Lead',
  bio: "💫 I'm a digital Product Manager and Service Designer. I love using cognitive psychology to humanize tech and solve people problems. I am a keen learner, team player, and enjoy taking on new challenges and side projects.",
  availability: 'Available for new opportunities',
  openToWork: true,
  // CV
  cvLink: 'https://drive.google.com/file/d/1TUy0n71AlVlbuL9dx5qte_1tGUB7EPVu/view',
  cvFileName: '',
  // Portfolio Page Section Header
  portfolioTitle: 'Portfolio Showcase',
  portfolioSubtitle: 'Case Studies',
  portfolioDescription: 'Selected case studies spanning Govtech, Fintech, E-Health, and B2B SaaS — built with research, shipped with care.',
  // Blog Page Section Header
  blogTitle: 'Ideas & Insights',
  blogSubtitle: 'Blog',
  blogDescription: 'Thoughts on product management, UX design, and building digital products.',
  // Hero
  heroLabel: 'Senior PM & UX Manager · Portfolio',
  heroTitle: 'Turning complex problems into elegant products',
  heroBio: 'Building digital experiences that balance deep user empathy with measurable business outcomes — from research to shipped product.',
  collaborators: 'Gojek, Tokopedia, Bank Jago, Traveloka',
  expertise: 'UX Research, PRD, Figma, OKR, A/B Test, Design Sys., Roadmap, SQL',
  // Services & Skills Headers
  servicesLabel: 'What I Do',
  servicesTitle: 'Services',
  skillsLabel: 'Expertise',
  skillsTitle: 'Skills & Tools',
  ctaTitle: 'Let\'s Work Together',
  ctaDesc: 'Open to PM, UX Lead, and Service Design opportunities. 500+ connections on LinkedIn.',
}

type Tab = 'about' | 'hero' | 'pages' | 'metrics'

export default function DashboardContentPage() {
  const router = useRouter()
  const supabase = createClient()
  const photoInputRef = useRef<HTMLInputElement>(null)
  const cvInputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('about')
  const [photoPreview, setPhotoPreview] = useState('/images/profile-pic.png')
  const [cvFileName, setCvFileName] = useState('')

  const [about, setAbout] = useState(DEFAULT_ABOUT)
  const [metrics, setMetrics] = useState(DEFAULT_METRICS)

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      setLoading(false)
    }
    load()
  }, [supabase, router])

  const handleSave = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 700))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPhotoPreview(URL.createObjectURL(file))
  }

  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setCvFileName(file.name)
    setAbout(a => ({ ...a, cvFileName: file.name }))
  }

  const updateMetric = (i: number, field: string, val: string) => {
    setMetrics(ms => ms.map((m, idx) => idx === i ? { ...m, [field]: val } : m))
  }

  const TABS: { key: Tab; label: string }[] = [
    { key: 'about', label: '👤 About & CV' },
    { key: 'hero', label: '🏠 Hero Section' },
    { key: 'pages', label: '📄 Page Headers' },
    { key: 'metrics', label: '📊 Metrics Cards' },
  ]

  if (loading) return (
    <div className="min-h-screen bg-page flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen bg-page flex">
      <aside className="w-64 shrink-0 bg-card border-r border-[var(--border)] hidden md:flex flex-col py-8 px-5 sticky top-0 h-screen">
        <div className="mb-8">
          <Link href="/" className="font-display font-extrabold text-[17px] tracking-tight text-ink no-underline" style={{ letterSpacing: '-0.03em' }}>
            Putri Wulandari<span className="text-accent">.</span>
          </Link>
          <p className="text-[11px] text-ink-3 mt-1 font-semibold tracking-wider uppercase">Admin Dashboard</p>
        </div>
        <nav className="space-y-1 flex-1">
          {SIDEBAR.map(item => (
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-[13px] font-medium no-underline transition-all duration-200 ${item.href === '/dashboard/content' ? 'bg-accent-soft text-accent' : 'text-ink-2 hover:bg-card2 hover:text-ink'}`}>
              <span>{item.icon}</span>{item.label}
            </Link>
          ))}
        </nav>
        <div className="space-y-2 mt-3">
          <Link href="/" target="_blank" className="flex items-center gap-2 w-full px-3 py-2.5 rounded-[12px] text-[13px] font-semibold text-accent bg-accent-soft no-underline hover:bg-accent hover:text-white transition-all">
            🌐 View Live Site ↗
          </Link>
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-[13px] text-ink-2 hover:text-ink no-underline transition-all">← Back to Site</Link>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-8 max-w-4xl overflow-x-hidden">
        {/* Mobile top bar */}
        <div className="flex md:hidden items-center justify-between mb-4 pb-3 border-b border-[var(--border)]">
          <Link href="/dashboard" className="font-display font-extrabold text-[15px] text-ink no-underline">← Dashboard</Link>
          <Link href="/" target="_blank" className="text-[12px] text-accent font-semibold">View Site ↗</Link>
        </div>

        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className="font-display text-[24px] md:text-[28px] font-extrabold text-ink tracking-tight">Content Editor</h1>
            <p className="text-ink-2 text-sm mt-1">Edit About, Hero, Page Headers, Metrics & CV</p>
          </div>
          <button onClick={handleSave} disabled={saving} className="btn-primary text-[13px] py-2.5 px-5">
            {saving ? 'Saving…' : saved ? '✅ Saved!' : '💾 Save Changes'}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {TABS.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`px-4 py-2 rounded-pill text-[13px] font-semibold border transition-all cursor-pointer ${activeTab === tab.key ? 'bg-ink text-white border-ink dark:bg-white dark:text-white dark:border-white' : 'bg-card2 text-ink-2 border-[var(--border)] hover:text-ink hover:border-ink'}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── About & CV Tab ── */}
        {activeTab === 'about' && (
          <div className="space-y-5">
            {/* Profile Photo */}
            <div className="card p-6">
              <h2 className="font-display font-bold text-ink text-[15px] mb-4">Profile Photo</h2>
              <div className="flex items-center gap-5">
                <div className="relative group">
                  <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-[var(--border)] relative">
                    <img src={photoPreview} alt="Profile" className="object-cover w-full h-full absolute inset-0 z-10" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                    <div className="w-full h-full absolute inset-0 z-0 flex items-center justify-center bg-gradient-to-br from-accent to-violet text-white text-2xl font-bold">PW</div>
                  </div>
                  <div onClick={() => photoInputRef.current?.click()} className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center z-20">
                    <span className="text-white text-[10px] font-semibold text-center leading-tight">📷<br/>Change</span>
                  </div>
                </div>
                <div>
                  <button onClick={() => photoInputRef.current?.click()} className="text-[13px] text-accent hover:underline cursor-pointer bg-transparent border-0 p-0 block mb-1">
                    📷 Upload new photo
                  </button>
                  <p className="text-ink-3 text-[11px]">Used on About page and profile card</p>
                </div>
              </div>
              <input ref={photoInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
            </div>

            {/* Basic Info */}
            <div className="card p-6 space-y-4">
              <h2 className="font-display font-bold text-ink text-[15px]">About Page Content</h2>
              <div>
                <label className="label uppercase text-ink-3 text-[11px] font-semibold mb-1.5 block">Display Name</label>
                <input value={about.name} onChange={e => setAbout(a => ({ ...a, name: e.target.value }))} className={INPUT_CLS} />
              </div>
              <div>
                <label className="label uppercase text-ink-3 text-[11px] font-semibold mb-1.5 block">Headline / Role</label>
                <input value={about.headline} onChange={e => setAbout(a => ({ ...a, headline: e.target.value }))} className={INPUT_CLS} />
              </div>
              <div>
                <label className="label uppercase text-ink-3 text-[11px] font-semibold mb-1.5 block">Bio</label>
                <textarea value={about.bio} onChange={e => setAbout(a => ({ ...a, bio: e.target.value }))} rows={4} className={`${INPUT_CLS} resize-none`} />
              </div>
              <div className="flex items-center justify-between p-4 rounded-[12px] bg-card2">
                <div>
                  <p className="font-medium text-ink text-[13px]">Open to Work</p>
                  <p className="text-ink-3 text-[11px]">Show &ldquo;Available for opportunities&rdquo; badge</p>
                </div>
                <div
                  onClick={() => {
                    const next = !about.openToWork;
                    setAbout(a => ({ ...a, openToWork: next }));
                    localStorage.setItem('openToWork', String(next));
                    window.dispatchEvent(new Event('openToWorkChange'));
                  }}
                  className={`w-10 h-5 rounded-full relative transition-colors duration-200 cursor-pointer ${about.openToWork ? 'bg-accent' : 'bg-card'} border border-[var(--border)]`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${about.openToWork ? 'left-5' : 'left-0.5'}`} />
                </div>
              </div>
              {about.openToWork && (
                <div>
                  <label className="label uppercase text-ink-3 text-[11px] font-semibold mb-1.5 block">Availability Text</label>
                  <input value={about.availability} onChange={e => setAbout(a => ({ ...a, availability: e.target.value }))} className={INPUT_CLS} placeholder="Available for new opportunities" />
                </div>
              )}
            </div>

            {/* CV Upload / Link */}
            <div className="card p-6 space-y-4">
              <h2 className="font-display font-bold text-ink text-[15px]">CV / Resume</h2>
              <div className="p-4 rounded-[12px] bg-card2 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="text-2xl shrink-0">📄</span>
                  <div className="min-w-0">
                    <p className="text-ink text-[13px] font-medium truncate">{cvFileName || 'No file uploaded'}</p>
                    <p className="text-ink-3 text-[11px]">Upload a PDF or link to Google Drive</p>
                  </div>
                </div>
                <button onClick={() => cvInputRef.current?.click()} className="px-3 py-2 rounded-[10px] bg-accent-soft text-accent text-[12px] font-semibold cursor-pointer border-0 hover:bg-accent hover:text-white transition-all shrink-0">
                  Upload CV
                </button>
                <input ref={cvInputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleCvUpload} />
              </div>
              <div>
                <label className="label uppercase text-ink-3 text-[11px] font-semibold mb-1.5 block">Or paste CV / Drive link</label>
                <input
                  value={about.cvLink}
                  onChange={e => setAbout(a => ({ ...a, cvLink: e.target.value }))}
                  placeholder="https://drive.google.com/file/d/..."
                  className={`${INPUT_CLS} text-[13px]`}
                />
              </div>
              {about.cvLink && (
                <a href={about.cvLink} target="_blank" rel="noopener noreferrer" className="text-accent text-[12px] hover:underline">
                  ↗ Preview CV link
                </a>
              )}
            </div>

            {/* Services & Skills Section */}
            <div className="card p-6 space-y-4">
              <h2 className="font-display font-bold text-ink text-[15px]">Services & Skills Section Labels</h2>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label uppercase text-ink-3 text-[10px] font-semibold mb-1.5 block">Services Eyebrow</label>
                  <input value={about.servicesLabel} onChange={e => setAbout(a => ({ ...a, servicesLabel: e.target.value }))} className={INPUT_CLS} />
                </div>
                <div>
                  <label className="label uppercase text-ink-3 text-[10px] font-semibold mb-1.5 block">Services Title</label>
                  <input value={about.servicesTitle} onChange={e => setAbout(a => ({ ...a, servicesTitle: e.target.value }))} className={INPUT_CLS} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label uppercase text-ink-3 text-[10px] font-semibold mb-1.5 block">Skills Eyebrow</label>
                  <input value={about.skillsLabel} onChange={e => setAbout(a => ({ ...a, skillsLabel: e.target.value }))} className={INPUT_CLS} />
                </div>
                <div>
                  <label className="label uppercase text-ink-3 text-[10px] font-semibold mb-1.5 block">Skills Title</label>
                  <input value={about.skillsTitle} onChange={e => setAbout(a => ({ ...a, skillsTitle: e.target.value }))} className={INPUT_CLS} />
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="card p-6 space-y-4">
              <h2 className="font-display font-bold text-ink text-[15px]">Call to Action (Let&apos;s Work Together)</h2>
              <div>
                <label className="label uppercase text-ink-3 text-[11px] font-semibold mb-1.5 block">Title</label>
                <input value={about.ctaTitle} onChange={e => setAbout(a => ({ ...a, ctaTitle: e.target.value }))} className={INPUT_CLS} />
              </div>
              <div>
                <label className="label uppercase text-ink-3 text-[11px] font-semibold mb-1.5 block">Description</label>
                <textarea value={about.ctaDesc} onChange={e => setAbout(a => ({ ...a, ctaDesc: e.target.value }))} rows={2} className={`${INPUT_CLS} resize-none`} />
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <button onClick={handleSave} disabled={saving} className="btn-primary">
                {saving ? 'Saving…' : saved ? '✅ Saved!' : '💾 Save About & CV'}
              </button>
              <Link href="/about" target="_blank" className="btn-ghost">Preview About Page ↗</Link>
            </div>
          </div>
        )}

        {/* ── Hero Section Tab ── */}
        {activeTab === 'hero' && (
          <div className="space-y-5">
            <div className="card p-6 space-y-4">
              <h2 className="font-display font-bold text-ink text-[15px]">Homepage Hero</h2>
              <div>
                <label className="label uppercase text-ink-3 text-[11px] font-semibold mb-1.5 block">Eyebrow / Label</label>
                <input value={about.heroLabel} onChange={e => setAbout(a => ({ ...a, heroLabel: e.target.value }))} className={INPUT_CLS} />
              </div>
              <div>
                <label className="label uppercase text-ink-3 text-[11px] font-semibold mb-1.5 block">Hero Title</label>
                <textarea value={about.heroTitle} onChange={e => setAbout(a => ({ ...a, heroTitle: e.target.value }))} rows={2} className={`${INPUT_CLS} resize-none`} />
              </div>
              <div>
                <label className="label uppercase text-ink-3 text-[11px] font-semibold mb-1.5 block">Hero Bio / Tagline</label>
                <textarea value={about.heroBio} onChange={e => setAbout(a => ({ ...a, heroBio: e.target.value }))} rows={3} className={`${INPUT_CLS} resize-none`} />
              </div>
              <div>
                <label className="label uppercase text-ink-3 text-[11px] font-semibold mb-1.5 block">Collaborated With (comma separated)</label>
                <input value={about.collaborators} onChange={e => setAbout(a => ({ ...a, collaborators: e.target.value }))} className={INPUT_CLS} placeholder="Gojek, Tokopedia, Bank Jago, Traveloka" />
              </div>
              <div>
                <label className="label uppercase text-ink-3 text-[11px] font-semibold mb-1.5 block">Expertise Pills (comma separated)</label>
                <input value={about.expertise} onChange={e => setAbout(a => ({ ...a, expertise: e.target.value }))} className={INPUT_CLS} placeholder="UX Research, PRD, Figma, OKR" />
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <button onClick={handleSave} disabled={saving} className="btn-primary">
                {saving ? 'Saving…' : saved ? '✅ Saved!' : '💾 Save Hero'}
              </button>
              <Link href="/" target="_blank" className="btn-ghost">Preview Homepage ↗</Link>
            </div>
          </div>
        )}

        {/* ── Page Headers Tab ── */}
        {activeTab === 'pages' && (
          <div className="space-y-5">
            {/* Portfolio Page */}
            <div className="card p-6 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">🚀</span>
                <h2 className="font-display font-bold text-ink text-[15px]">Portfolio Page Header</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label uppercase text-ink-3 text-[10px] font-semibold mb-1.5 block">Eyebrow / Label</label>
                  <input value={about.portfolioSubtitle} onChange={e => setAbout(a => ({ ...a, portfolioSubtitle: e.target.value }))} className={`${INPUT_CLS} text-[13px]`} placeholder="Case Studies" />
                </div>
                <div>
                  <label className="label uppercase text-ink-3 text-[10px] font-semibold mb-1.5 block">Main Title</label>
                  <input value={about.portfolioTitle} onChange={e => setAbout(a => ({ ...a, portfolioTitle: e.target.value }))} className={`${INPUT_CLS} text-[13px] font-bold`} placeholder="Portfolio Showcase" />
                </div>
              </div>
              <div>
                <label className="label uppercase text-ink-3 text-[10px] font-semibold mb-1.5 block">Description</label>
                <textarea value={about.portfolioDescription} onChange={e => setAbout(a => ({ ...a, portfolioDescription: e.target.value }))} rows={2} className={`${INPUT_CLS} resize-none text-[13px]`} />
              </div>
              {/* Live preview */}
              <div className="rounded-[12px] p-5 bg-card2 border border-[var(--border)]">
                <p className="label uppercase text-ink-3 text-[10px] tracking-widest mb-2">{about.portfolioSubtitle}</p>
                <h3 className="font-display text-[24px] font-extrabold text-ink tracking-tight leading-none mb-2">{about.portfolioTitle} <span className="text-gradient">Showcase</span></h3>
                <p className="text-ink-2 text-[12px] leading-relaxed">{about.portfolioDescription}</p>
              </div>
            </div>

            {/* Blog Page */}
            <div className="card p-6 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">📝</span>
                <h2 className="font-display font-bold text-ink text-[15px]">Blog Page Header</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label uppercase text-ink-3 text-[10px] font-semibold mb-1.5 block">Eyebrow / Label</label>
                  <input value={about.blogSubtitle} onChange={e => setAbout(a => ({ ...a, blogSubtitle: e.target.value }))} className={`${INPUT_CLS} text-[13px]`} placeholder="Blog" />
                </div>
                <div>
                  <label className="label uppercase text-ink-3 text-[10px] font-semibold mb-1.5 block">Main Title</label>
                  <input value={about.blogTitle} onChange={e => setAbout(a => ({ ...a, blogTitle: e.target.value }))} className={`${INPUT_CLS} text-[13px] font-bold`} placeholder="Ideas & Insights" />
                </div>
              </div>
              <div>
                <label className="label uppercase text-ink-3 text-[10px] font-semibold mb-1.5 block">Description</label>
                <textarea value={about.blogDescription} onChange={e => setAbout(a => ({ ...a, blogDescription: e.target.value }))} rows={2} className={`${INPUT_CLS} resize-none text-[13px]`} />
              </div>
              {/* Live preview */}
              <div className="rounded-[12px] p-5 bg-card2 border border-[var(--border)]">
                <p className="label uppercase text-ink-3 text-[10px] tracking-widest mb-2">{about.blogSubtitle}</p>
                <h3 className="font-display text-[24px] font-extrabold text-ink tracking-tight leading-none mb-2">{about.blogTitle}</h3>
                <p className="text-ink-2 text-[12px] leading-relaxed">{about.blogDescription}</p>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <button onClick={handleSave} disabled={saving} className="btn-primary">
                {saving ? 'Saving…' : saved ? '✅ Saved!' : '💾 Save Page Headers'}
              </button>
              <Link href="/portfolio" target="_blank" className="btn-ghost">Preview Portfolio ↗</Link>
              <Link href="/blog" target="_blank" className="btn-ghost">Preview Blog ↗</Link>
            </div>
          </div>
        )}

        {/* ── Metrics Tab ── */}
        {activeTab === 'metrics' && (
          <div className="space-y-4">
            <div className="p-4 rounded-[12px] bg-accent-soft border border-accent/20">
              <p className="text-accent text-[13px]">✏️ These 4 metric cards appear on the homepage — Conversion Lift, Retention, Users Impacted, Components Built</p>
            </div>
            {metrics.map((m, i) => (
              <div key={i} className="card p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-ink text-[14px]">Card {i + 1}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded-pill font-semibold ${m.variant === 'blue' ? 'bg-[#3d5af1] text-white' : m.variant === 'dark' ? 'bg-[#0d0f1a] text-white' : m.variant === 'violet' ? 'bg-violet text-white' : 'bg-card2 text-ink'}`}>
                    {m.variant}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label uppercase text-ink-3 text-[10px] font-semibold mb-1 block">Label</label>
                    <input value={m.label} onChange={e => updateMetric(i, 'label', e.target.value)} className={`${INPUT_CLS} text-[13px]`} />
                  </div>
                  <div>
                    <label className="label uppercase text-ink-3 text-[10px] font-semibold mb-1 block">Value (big number)</label>
                    <input value={m.value} onChange={e => updateMetric(i, 'value', e.target.value)} className={`${INPUT_CLS} text-[13px] font-bold`} />
                  </div>
                </div>
                <div>
                  <label className="label uppercase text-ink-3 text-[10px] font-semibold mb-1 block">Subtitle</label>
                  <input value={m.sub} onChange={e => updateMetric(i, 'sub', e.target.value)} className={`${INPUT_CLS} text-[13px]`} />
                </div>
                <div>
                  <label className="label uppercase text-ink-3 text-[10px] font-semibold mb-1 block">Style Variant</label>
                  <select value={m.variant} onChange={e => updateMetric(i, 'variant', e.target.value)} className={`${INPUT_CLS} text-[13px]`}>
                    <option value="blue">🔵 Blue (accent)</option>
                    <option value="light">⬜ Light (card)</option>
                    <option value="dark">⬛ Dark (midnight)</option>
                    <option value="violet">🟣 Violet gradient</option>
                  </select>
                </div>
              </div>
            ))}
            <div className="flex gap-3 flex-wrap">
              <button onClick={handleSave} disabled={saving} className="btn-primary">
                {saving ? 'Saving…' : saved ? '✅ Saved!' : '💾 Save Metrics'}
              </button>
              <Link href="/" target="_blank" className="btn-ghost">Preview Homepage ↗</Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
