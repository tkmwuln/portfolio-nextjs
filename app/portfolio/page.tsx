import { prisma } from '@/lib/prisma';
import PortfolioClient from './PortfolioClient';

export default async function PortfolioPage() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return <PortfolioClient projects={projects} />;
}
