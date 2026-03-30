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

export default function DashboardProfilePage() {
  const router = useRouter()
  const supabase = createClient()
  const fileInputRef = useRef<HTMLInputElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [photoPreview, setPhotoPreview] = useState<string>('/images/profile-pic.png')

  const [form, setForm] = useState({
    name: 'Putri Wulandari',
    headline: 'AI Product Manager & Service Designer',
    bio: '💫 I\'m a digital Product Manager and Service Designer. I love using cognitive psychology to humanize tech and solve people problems.',
    location: 'Jakarta, Indonesia',
    linkedinUrl: 'https://www.linkedin.com/in/putriwulandari-ptrwuln/',
    notionUrl: 'https://ptrwulan.notion.site/',
    cvUrl: 'https://drive.google.com/file/d/1TUy0n71AlVlbuL9dx5qte_1tGUB7EPVu/view',
    email: '',
    openToWork: true,
  })

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      setUser(user)
      setForm(f => ({ ...f, email: user.email || '' }))
      setLoading(false)
    }
    load()
  }, [supabase, router])

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setPhotoPreview(url)
    // In production: upload to Supabase Storage and get URL
  }

  const handleSave = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 600))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-page flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      </div>
    )
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
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-[13px] font-medium no-underline transition-all duration-200 ${
                item.href === '/dashboard/profile' ? 'bg-accent-soft text-accent' : 'text-ink-2 hover:bg-card2 hover:text-ink'
              }`}
            >
              <span>{item.icon}</span>{item.label}
            </Link>
          ))}
        </nav>
        {/* ← Go to Website */}
        <div className="space-y-2 mt-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 w-full px-3 py-2.5 rounded-[12px] text-[13px] font-semibold text-accent bg-accent-soft no-underline transition-all duration-200 hover:bg-accent hover:text-white"
          >
            🌐 View Live Site ↗
          </Link>
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-[13px] text-ink-2 hover:text-ink no-underline transition-all duration-200">
            ← Back to Site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-[28px] font-extrabold text-ink tracking-tight">Profile</h1>
            <p className="text-ink-2 text-sm mt-1">Manage your public profile information</p>
          </div>
          <button onClick={handleSave} disabled={saving} className="btn-primary text-[13px] py-2.5 px-5">
            {saving ? 'Saving…' : saved ? '✅ Saved!' : '💾 Save Changes'}
          </button>
        </div>

        <div className="space-y-5">
          {/* Profile Photo with upload */}
          <div className="card p-6">
            <h2 className="font-display font-bold text-ink text-[15px] mb-4">Profile Photo</h2>
            <div className="flex items-center gap-5">
              <div className="relative group">
                <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-[var(--border)] shrink-0 relative">
                  <img
                    src={photoPreview}
                    alt="Putri Wulandari"
                    className="object-cover w-full h-full absolute inset-0 z-10"
                  />
                  <div className="w-full h-full absolute inset-0 z-0 flex items-center justify-center bg-gradient-to-br from-accent to-violet text-white text-2xl font-bold font-display">PW</div>
                </div>
                {/* Hover overlay */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center z-20"
                >
                  <span className="text-white text-[10px] font-semibold text-center leading-tight">📷<br/>Change</span>
                </div>
              </div>
              <div>
                <p className="font-medium text-ink text-[14px]">{form.name}</p>
                <p className="text-ink-3 text-[12px] mt-0.5">{user?.email}</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-2 text-[12px] text-accent hover:underline cursor-pointer bg-transparent border-0 p-0"
                >
                  📷 Upload new photo
                </button>
                <p className="text-ink-3 text-[10px] mt-1">JPG, PNG · max 5MB · replaces <code className="bg-card2 px-1 py-0.5 rounded">/public/images/profile-pic.png</code></p>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </div>

          {/* Basic Info */}
          <div className="card p-6 space-y-4">
            <h2 className="font-display font-bold text-ink text-[15px]">Basic Information</h2>
            <div>
              <label className="label uppercase text-ink-3 mb-1.5 block text-[11px] font-semibold">Full Name</label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={INPUT_CLS} />
            </div>
            <div>
              <label className="label uppercase text-ink-3 mb-1.5 block text-[11px] font-semibold">Headline</label>
              <input value={form.headline} onChange={e => setForm(f => ({ ...f, headline: e.target.value }))} className={INPUT_CLS} />
            </div>
            <div>
              <label className="label uppercase text-ink-3 mb-1.5 block text-[11px] font-semibold">Location</label>
              <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} className={INPUT_CLS} />
            </div>
            <div>
              <label className="label uppercase text-ink-3 mb-1.5 block text-[11px] font-semibold">Bio</label>
              <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} rows={4} className={`${INPUT_CLS} resize-none`} />
            </div>
            <div className="flex items-center justify-between p-4 rounded-[12px] bg-card2">
              <div>
                <p className="font-medium text-ink text-[13px]">Open to Work</p>
                <p className="text-ink-3 text-[11px]">Show &ldquo;Available for opportunities&rdquo; badge</p>
              </div>
              <div
                onClick={() => {
                  const next = !form.openToWork;
                  setForm(f => ({ ...f, openToWork: next }));
                  localStorage.setItem('openToWork', String(next));
                  window.dispatchEvent(new Event('openToWorkChange'));
                }}
                className={`w-10 h-5 rounded-full relative transition-colors duration-200 cursor-pointer ${form.openToWork ? 'bg-accent' : 'bg-card'} border border-[var(--border)]`}
              >
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${form.openToWork ? 'left-5' : 'left-0.5'}`} />
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="card p-6 space-y-4">
            <h2 className="font-display font-bold text-ink text-[15px]">Links & Contact</h2>
            <div>
              <label className="label uppercase text-ink-3 mb-1.5 block text-[11px] font-semibold">LinkedIn URL</label>
              <input value={form.linkedinUrl} onChange={e => setForm(f => ({ ...f, linkedinUrl: e.target.value }))} placeholder="https://linkedin.com/in/..." className={INPUT_CLS} />
            </div>
            <div>
              <label className="label uppercase text-ink-3 mb-1.5 block text-[11px] font-semibold">Notion Portfolio URL</label>
              <input value={form.notionUrl} onChange={e => setForm(f => ({ ...f, notionUrl: e.target.value }))} placeholder="https://notion.site/..." className={INPUT_CLS} />
            </div>
            <div>
              <label className="label uppercase text-ink-3 mb-1.5 block text-[11px] font-semibold">CV / Resume URL (Google Drive)</label>
              <input value={form.cvUrl} onChange={e => setForm(f => ({ ...f, cvUrl: e.target.value }))} placeholder="https://drive.google.com/..." className={INPUT_CLS} />
            </div>
          </div>

          {/* Save + View Site */}
          <div className="flex gap-3 flex-wrap">
            <button onClick={handleSave} disabled={saving} className="btn-primary">
              {saving ? 'Saving…' : saved ? '✅ Saved!' : '💾 Save Profile'}
            </button>
            <Link href="/" target="_blank" className="btn-ghost">
              🌐 View Live Site ↗
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
