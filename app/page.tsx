import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Link from 'next/link'
import ProjectCard from './components/portfolio/ProjectCard'
import BentoMetrics, { defaultMetrics } from './components/sections/BentoMetrics'
import HeroSection from './components/sections/HeroSection'
import HomeProjectsSection from './components/sections/HomeProjectsSection'
import { PrismaClient } from './generated/prisma/client'

const prisma = new PrismaClient()

export default async function HomePage() {
  try {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    // Fetch featured projects
    const projects = await prisma.project.findMany({
      where: { published: true, featured: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
    })

    // Fetch user profile
    const user = await prisma.user.findFirst()

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
  } catch (error) {
    console.error('Home page error:', error)
    // Fallback UI
    return (
      <div className="min-h-screen bg-page">
        <div className="mx-auto w-full max-w-[1280px] px-6 py-8 space-y-3">
          <HeroSection profile={{
            fullName: 'Putri Wulandari',
            headline: 'AI Product Manager & Service Designer',
            bio: null,
            avatarUrl: null,
            location: 'Jakarta, Indonesia',
            openToWork: true,
          }} projectCount={0} />
          <BentoMetrics metrics={defaultMetrics} />
          <HomeProjectsSection projects={[]} />
        </div>
      </div>
    )
  }
}
