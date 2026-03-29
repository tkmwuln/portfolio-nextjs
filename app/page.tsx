import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Link from 'next/link'
import ProjectCard from './components/portfolio/ProjectCard'
import BentoMetrics, { defaultMetrics } from './components/sections/BentoMetrics'
import HeroSection from './components/sections/HeroSection'
import HomeProjectsSection from './components/sections/HomeProjectsSection'

export default async function HomePage() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  // Fetch featured projects
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .order('createdAt', { ascending: false })
    .limit(6)

  // Fetch user profile
  const { data: user } = await supabase
    .from('users')
    .select('*')
    .single()

  const profile = {
    fullName: user?.name ?? 'Putri Wulandari',
    headline: user?.headline ?? 'AI Product Manager & Service Designer',
    bio: user?.bio ?? null,
    avatarUrl: user?.avatar ?? null,
    location: user?.location ?? 'Jakarta, Indonesia',
    openToWork: true,
  }

  return (
    <div className="min-h-screen bg-page">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-8 space-y-3">
        <HeroSection profile={profile} projectCount={projects?.length ?? 0} />
        <BentoMetrics metrics={defaultMetrics} />
        <HomeProjectsSection projects={projects ?? []} />
      </div>
    </div>
  )
}
