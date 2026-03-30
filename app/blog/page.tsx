import { prisma } from '@/lib/prisma';
import BlogClient from './BlogClient';

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    include: { tags: true },
    orderBy: { createdAt: "desc" },
  });

  return <BlogClient posts={posts} />;
}
