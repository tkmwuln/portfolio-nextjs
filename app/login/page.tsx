'use client'

import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const supabase = createClient()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setErrorMsg(error.message)
      } else {
        router.push('/dashboard')
        // Force a page refresh to ensure middleware sees the new session
        setTimeout(() => window.location.reload(), 100)
      }
    } catch (err: any) {
      setErrorMsg('An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-page p-6">
      <div className="max-w-[400px] w-full">
        <div className="text-center mb-10">
          <Link href="/" className="font-display font-extrabold text-[24px] tracking-tight text-ink no-underline" style={{ letterSpacing: '-0.04em' }}>
            Putri Wulandari<span className="text-accent">.</span>
          </Link>
          <div className="h-px w-12 bg-accent/30 mx-auto mt-4 mb-2" />
          <h2 className="text-[13px] font-semibold text-ink-3 uppercase tracking-[0.2em] mb-8">Admin Access</h2>
        </div>

        <div className="card p-8 md:p-10 shadow-2xl shadow-accent/5">
          <form className="space-y-5" onSubmit={handleLogin}>
            {errorMsg && (
              <div className="p-3 rounded-[10px] bg-red-50 text-red-500 text-[12px] font-medium border border-red-100 animate-in fade-in slide-in-from-top-1">
                ⚠️ {errorMsg}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-ink-3 uppercase tracking-wider mb-2 ml-1">Email</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full bg-card2 border border-[var(--border)] rounded-[12px] px-4 py-3 text-[14px] text-ink focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-all placeholder:text-ink-3"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-ink-3 uppercase tracking-wider mb-2 ml-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-card2 border border-[var(--border)] rounded-[12px] px-4 py-3 text-[14px] text-ink focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-all placeholder:text-ink-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 px-6 text-[14px] font-bold tracking-tight mt-4 disabled:opacity-50 flex items-center justify-center gap-2 group shadow-lg shadow-accent/20"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign into Dashboard <span className="group-hover:translate-x-1 transition-transform">→</span></>
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <Link href="/" className="text-[12px] text-ink-3 hover:text-accent no-underline transition-colors font-medium">
              ← Return to portfolio home
            </Link>
          </div>
        </div>
        
        <p className="text-center mt-8 text-[11px] text-ink-3 px-8 leading-relaxed">
          This dashboard is for authorized administrative use only.
        </p>
      </div>
    </div>
  )
}