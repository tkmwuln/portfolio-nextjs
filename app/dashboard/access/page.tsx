'use client'

import Link from 'next/link'
import { useState } from 'react'

const SIDEBAR = [
  { label: 'Overview', href: '/dashboard', icon: '📊' },
  { label: 'Projects', href: '/dashboard/projects', icon: '🚀' },
  { label: 'Blog', href: '/dashboard/blog', icon: '📝' },
  { label: 'Profile', href: '/dashboard/profile', icon: '👤' },
  { label: 'Access', href: '/dashboard/access', icon: '🔐' },
]

type AccessLevel = 'public' | 'invited' | 'private'

const PROJECTS_ACCESS = [
  { id: 's1', title: 'E-Health Platform — SIMRS Kesehatan', access: 'public' as AccessLevel },
  { id: 's2', title: 'Strategic CX Platform', access: 'public' as AccessLevel },
  { id: 's3', title: 'Government Procurement UX', access: 'public' as AccessLevel },
  { id: 's4', title: 'Fintech Onboarding', access: 'invited' as AccessLevel },
  { id: 's5', title: 'Design System', access: 'public' as AccessLevel },
  { id: 's6', title: 'INA DIGITAL', access: 'private' as AccessLevel },
]

const INVITED_USERS = [
  { id: '1', name: 'Hiring Manager A', email: 'hiring@company.com', role: 'Viewer', addedAt: '2025-03-01', access: ['s4'] },
  { id: '2', name: 'Recruiter B', email: 'recruiter@talent.co', role: 'Viewer', addedAt: '2025-02-15', access: ['s4', 's6'] },
]

const ACCESS_BADGE: Record<AccessLevel, string> = {
  public: 'bg-[rgba(34,201,129,0.15)] text-[#22c981]',
  invited: 'bg-[rgba(245,166,35,0.15)] text-[#f5a623]',
  private: 'bg-[rgba(232,97,154,0.15)] text-[#e8619a]',
}

const ACCESS_LABEL: Record<AccessLevel, string> = {
  public: '🌐 Public',
  invited: '🔑 Invited Only',
  private: '🔒 Private',
}

export default function AccessManagementPage() {
  const [projects, setProjects] = useState(PROJECTS_ACCESS)
  const [invitedUsers, setInvitedUsers] = useState(INVITED_USERS)
  const [showInviteForm, setShowInviteForm] = useState(false)
  const [inviteForm, setInviteForm] = useState({ name: '', email: '' })
  const [saved, setSaved] = useState<string | null>(null)

  const cycleAccess = (id: string) => {
    const ORDER: AccessLevel[] = ['public', 'invited', 'private']
    setProjects(p => p.map(x => {
      if (x.id !== id) return x
      const next = ORDER[(ORDER.indexOf(x.access) + 1) % ORDER.length]
      return { ...x, access: next }
    }))
    setSaved(id)
    setTimeout(() => setSaved(null), 1500)
  }

  const removeUser = (id: string) => {
    if (!confirm('Remove this user\'s access?')) return
    setInvitedUsers(u => u.filter(x => x.id !== id))
  }

  const handleInvite = () => {
    if (!inviteForm.email) return
    setInvitedUsers(u => [...u, {
      id: Date.now().toString(),
      name: inviteForm.name || inviteForm.email.split('@')[0],
      email: inviteForm.email,
      role: 'Viewer',
      addedAt: new Date().toISOString().split('T')[0],
      access: [],
    }])
    setInviteForm({ name: '', email: '' })
    setShowInviteForm(false)
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
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-[13px] font-medium no-underline transition-all duration-200 ${item.href === '/dashboard/access' ? 'bg-accent-soft text-accent' : 'text-ink-2 hover:bg-card2 hover:text-ink'}`}>
              <span>{item.icon}</span>{item.label}
            </Link>
          ))}
        </nav>
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-[13px] text-ink-2 hover:text-ink no-underline transition-all duration-200">
          ← Back to Site
        </Link>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="font-display text-[28px] font-extrabold text-ink tracking-tight">Access Management</h1>
            <p className="text-ink-2 text-sm mt-1">Control who can view each project case study</p>
          </div>
          <button
            onClick={() => setShowInviteForm(true)}
            className="btn-primary text-[13px] py-2.5 px-5"
          >
            + Invite User
          </button>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-6">
          {(Object.entries(ACCESS_LABEL) as [AccessLevel, string][]).map(([level, label]) => (
            <div key={level} className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-pill text-[11px] font-semibold ${ACCESS_BADGE[level]}`}>{label}</span>
              <span className="text-ink-3 text-[12px]">
                {level === 'public' ? '— anyone can view' : level === 'invited' ? '— invited users only' : '— hidden from all'}
              </span>
            </div>
          ))}
        </div>

        {/* Project Access Table */}
        <div className="card overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-[var(--border)]">
            <h2 className="font-display font-bold text-ink text-[16px]">Project Visibility</h2>
            <p className="text-ink-3 text-[12px] mt-0.5">Click the badge to cycle through access levels</p>
          </div>
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left px-5 py-3 text-ink-3 font-semibold tracking-wider text-[11px] uppercase">Project</th>
                <th className="text-left px-4 py-3 text-ink-3 font-semibold tracking-wider text-[11px] uppercase">Access Level</th>
                <th className="text-left px-4 py-3 text-ink-3 font-semibold tracking-wider text-[11px] uppercase">Invited Users</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-b border-[var(--border)] hover:bg-card2 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-ink">{p.title}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => cycleAccess(p.id)}
                        className={`px-3 py-1.5 rounded-pill text-[11px] font-semibold cursor-pointer border-0 transition-all duration-200 ${ACCESS_BADGE[p.access]}`}
                      >
                        {ACCESS_LABEL[p.access]}
                      </button>
                      {saved === p.id && (
                        <span className="text-[11px] text-[#22c981] animate-fade-in">✓ Saved</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-ink-3 text-[12px]">
                    {p.access === 'invited'
                      ? `${invitedUsers.filter(u => u.access.includes(p.id)).length} users`
                      : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Invited Users */}
        <div className="card overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between">
            <div>
              <h2 className="font-display font-bold text-ink text-[16px]">Invited Users</h2>
              <p className="text-ink-3 text-[12px] mt-0.5">Users who have been granted access to private projects</p>
            </div>
            <span className="text-[12px] text-ink-2 bg-card2 px-3 py-1 rounded-pill">{invitedUsers.length} users</span>
          </div>
          {invitedUsers.length === 0 ? (
            <div className="p-8 text-center text-ink-2 text-sm">No invited users yet</div>
          ) : (
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left px-5 py-3 text-ink-3 font-semibold tracking-wider text-[11px] uppercase">User</th>
                  <th className="text-left px-4 py-3 text-ink-3 font-semibold tracking-wider text-[11px] uppercase">Role</th>
                  <th className="text-left px-4 py-3 text-ink-3 font-semibold tracking-wider text-[11px] uppercase">Added</th>
                  <th className="text-left px-4 py-3 text-ink-3 font-semibold tracking-wider text-[11px] uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invitedUsers.map((u) => (
                  <tr key={u.id} className="border-b border-[var(--border)] hover:bg-card2 transition-colors">
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-ink">{u.name}</p>
                      <p className="text-[11px] text-ink-3 mt-0.5">{u.email}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="px-3 py-1 rounded-pill text-[11px] font-semibold bg-accent-soft text-accent">
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-ink-3">{u.addedAt}</td>
                    <td className="px-4 py-3.5">
                      <button
                        onClick={() => removeUser(u.id)}
                        className="text-red-400 hover:text-red-500 text-[12px] cursor-pointer bg-transparent border-0"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Invite Form Modal */}
        {showInviteForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="card p-8 w-full max-w-md">
              <h3 className="font-display font-bold text-ink text-[18px] mb-5">Invite User</h3>
              <div className="space-y-4">
                <div>
                  <label className="label uppercase text-ink-3 mb-1.5 block">Name</label>
                  <input
                    value={inviteForm.name}
                    onChange={e => setInviteForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Hiring Manager"
                    className="w-full px-4 py-2.5 rounded-[12px] border border-[var(--border)] bg-card2 text-ink text-[14px] outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="label uppercase text-ink-3 mb-1.5 block">Email *</label>
                  <input
                    value={inviteForm.email}
                    onChange={e => setInviteForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="someone@company.com"
                    type="email"
                    className="w-full px-4 py-2.5 rounded-[12px] border border-[var(--border)] bg-card2 text-ink text-[14px] outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={handleInvite} className="btn-primary flex-1 justify-center">Send Invite</button>
                <button onClick={() => setShowInviteForm(false)} className="btn-ghost flex-1 justify-center">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
