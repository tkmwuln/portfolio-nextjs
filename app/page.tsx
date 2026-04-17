import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import BentoMetrics, { defaultMetrics } from './components/sections/BentoMetrics'
import HeroSection from './components/sections/HeroSection'
import HomeProjectsSection from './components/sections/HomeProjectsSection'
import LatestBlogs from './components/sections/LatestBlogs'
import { prisma } from '@/lib/prisma'
import { STATIC_PROJECTS, type Project } from '@/lib/projects'
import { STATIC_POSTS, type StaticPost } from '@/lib/posts'

export const dynamic = 'force-dynamic'

type BlogItem = {
  id: string; slug: string; title: string;
  createdAt: string | Date; gradient?: string | null;
  tags?: { id: string; name: string }[];
  readTime?: string | null; excerpt?: string | null;
}

type ProfileData = {
  fullName: string; headline: string; bio: string | null;
  avatarUrl: string | null; location: string; openToWork: boolean;
}

async function getPageData() {
  const defaultProfile: ProfileData = {
    fullName: 'Putri Wulandari',
    headline: 'AI Product Manager & Service Designer',
    bio: null, avatarUrl: null,
    location: 'Jakarta, Indonesia', openToWork: true,
  }

  // Projects
  let projects: Project[] = STATIC_PROJECTS
  try {
    const rows = await prisma.project.findMany({
      where: { published: true }, orderBy: { createdAt: 'desc' }, take: 6,
    })
    if (rows.length > 0) {
      projects = rows.map(row => {
        const s = STATIC_PROJECTS.find(x => x.slug === row.slug)
        return {
          id: row.id, title: row.title, slug: row.slug ?? row.id,
          description: row.description,
          image: row.image ?? s?.image ?? null,
          category: row.category ?? s?.category ?? '',
          clientName: row.clientName ?? s?.clientName ?? '',
          projectYear: row.projectYear ?? s?.projectYear ?? new Date().getFullYear(),
          metricValue: row.metricValue ?? s?.metricValue ?? null,
          metricLabel: row.metricLabel ?? s?.metricLabel ?? 'impact',
          published: row.published, featured: row.featured,
          gradient: row.gradient ?? s?.gradient ?? '',
        }
      })
    }
  } catch { /* use STATIC_PROJECTS */ }

  // Blog posts
  let posts: BlogItem[] = STATIC_POSTS as StaticPost[]
  try {
    const dbPosts = await prisma.blogPost.findMany({
      where: { published: true }, include: { tags: true },
      orderBy: { createdAt: 'desc' }, take: 6,
    })
    if (dbPosts.length > 0) posts = dbPosts
  } catch { /* use STATIC_POSTS */ }

  // Profile
  let profile: ProfileData = defaultProfile
  try {
    const user = await prisma.user.findFirst()
    if (user) {
      profile = {
        fullName: user.name ?? 'Putri Wulandari',
        headline: user.headline ?? 'AI Product Manager & Service Designer',
        bio: user.bio ?? null, avatarUrl: user.avatar ?? null,
        location: user.location ?? 'Jakarta, Indonesia', openToWork: true,
      }
    }
  } catch { /* use defaultProfile */ }

  return { projects, posts, profile }
}

export default async function HomePage() {
  const { projects, posts, profile } = await getPageData().catch(() => ({
    projects: STATIC_PROJECTS,
    posts: STATIC_POSTS as BlogItem[],
    profile: {
      fullName: 'Putri Wulandari',
      headline: 'AI Product Manager & Service Designer',
      bio: null, avatarUrl: null,
      location: 'Jakarta, Indonesia', openToWork: true,
    },
  }))

  // Init supabase session (safe to ignore failure)
  try {
    const cookieStore = await cookies()
    createClient(cookieStore)
  } catch { /* no session */ }

  return (
    <div className="min-h-screen bg-page">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-8 space-y-3">
        <HeroSection profile={profile} projectCount={projects.length} />
        <BentoMetrics metrics={defaultMetrics} />
        <HomeProjectsSection projects={projects} />
        <LatestBlogs posts={posts.slice(0, 6)} />
      </div>
    </div>
  )
}
