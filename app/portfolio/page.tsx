import { prisma } from '@/lib/prisma';
import PortfolioClient from './PortfolioClient';
import { STATIC_PROJECTS } from '@/lib/projects';

export const dynamic = 'force-dynamic';

export default async function PortfolioPage() {
  let dbProjects: typeof STATIC_PROJECTS = [];

  try {
    const rows = await prisma.project.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });

    // Merge DB data with static thumbnails/gradients as fallback
    dbProjects = rows.map(row => {
      const staticMatch = STATIC_PROJECTS.find(s => s.slug === row.slug);
      return {
        id: row.id,
        title: row.title,
        slug: row.slug ?? row.id,
        description: row.description,
        image: row.image ?? staticMatch?.image ?? null,
        category: row.category ?? staticMatch?.category ?? '',
        clientName: row.clientName ?? staticMatch?.clientName ?? '',
        projectYear: row.projectYear ?? staticMatch?.projectYear ?? new Date().getFullYear(),
        metricValue: row.metricValue ?? staticMatch?.metricValue ?? null,
        metricLabel: row.metricLabel ?? staticMatch?.metricLabel ?? 'impact',
        published: row.published,
        featured: row.featured,
        gradient: row.gradient ?? staticMatch?.gradient ?? '',
      };
    });
  } catch {
    // DB unavailable — use static data
  }

  const display = dbProjects.length > 0 ? dbProjects : STATIC_PROJECTS;
  return <PortfolioClient projects={display} />;
}
