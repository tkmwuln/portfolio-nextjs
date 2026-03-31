import { prisma } from '@/lib/prisma';
import BlogClient from './BlogClient';

// Force dynamic rendering — this page fetches from DB and must not be prerendered
export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  let posts: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    tags: { id: string; name: string }[];
  }[] = [];

  try {
    posts = await prisma.blogPost.findMany({
      where: { published: true },
      include: { tags: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch {
    // DB unavailable at build time — render empty state
  }

  return <BlogClient posts={posts} />;
}
