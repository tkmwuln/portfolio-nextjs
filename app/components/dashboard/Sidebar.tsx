'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'

const NAV = [
  { label: 'Overview', href: '/dashboard', icon: '📊' },
  { label: 'Projects', href: '/dashboard/projects', icon: '🚀' },
  { label: 'Blog', href: '/dashboard/blog', icon: '📝' },
  { label: 'Profile', href: '/dashboard/profile', icon: '👤' },
  { label: 'Access', href: '/dashboard/access', icon: '🔐' },
]

export default function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const SidebarContent = () => (
    <>
      <div className="mb-8">
        <Link href="/" className="font-display font-extrabold text-[17px] tracking-tight text-ink no-underline" style={{ letterSpacing: '-0.03em' }}>
          Putri Wulandari<span className="text-accent">.</span>
        </Link>
        <p className="text-[11px] text-ink-3 mt-1 font-semibold tracking-wider uppercase">Admin Dashboard</p>
      </div>
      
      <nav className="space-y-1 flex-1">
        {NAV.map(item => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-[13px] font-medium no-underline transition-all duration-200 ${
                active ? 'bg-accent-soft text-accent' : 'text-ink-2 hover:bg-card2 hover:text-ink'
              }`}
            >
              <span className="text-[16px]">{item.icon}</span>{item.label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto pt-6 space-y-2 border-t border-[var(--border)]">
        <Link 
          href="/" 
          target="_blank" 
          className="flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-[13px] font-semibold text-accent hover:bg-accent-soft no-underline transition-all"
        >
          🌐 View Live Site ↗
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-[13px] text-red-500 hover:bg-red-50 dark:hover:bg-red-950/10 transition-all duration-200 cursor-pointer text-left bg-transparent border-0"
        >
          🚪 Logout
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* desktop sidebar */}
      <aside className="w-64 shrink-0 bg-card border-r border-[var(--border)] hidden md:flex flex-col py-8 px-5 sticky top-0 h-screen">
        <SidebarContent />
      </aside>

      {/* mobile trigger */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-[var(--border)] bg-card sticky top-0 z-40">
        <button onClick={() => setSidebarOpen(true)} className="flex items-center gap-2 text-ink-2 bg-transparent border-0 cursor-pointer text-[14px]">
          ☰ Menu
        </button>
        <Link href="/" className="font-display font-extrabold text-[15px] text-ink no-underline">
          Putri Wulandari<span className="text-accent">.</span>
        </Link>
        <div className="w-8" /> {/* spacer */}
      </div>

      {/* mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-72 bg-card flex flex-col py-8 px-5 shadow-2xl animate-in slide-in-from-left duration-300">
            <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 text-ink-3 text-xl bg-transparent border-0 cursor-pointer p-2 translate-x-2">✕</button>
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  )
}
