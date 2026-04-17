import { prisma } from '@/lib/prisma';
import BlogClient from './BlogClient';
import { STATIC_POSTS } from '@/lib/posts';

// Force dynamic rendering — fetches from DB at request time
export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  type Post = {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    published: boolean;
    createdAt: Date | string;
    updatedAt?: Date | string;
    userId?: string;
    tags: { id: string; name: string }[];
    category?: string;
    readTime?: string;
    gradient?: string;
  };

  let posts: Post[] = [];

  try {
    const dbPosts = await prisma.blogPost.findMany({
      where: { published: true },
      include: { tags: true },
      orderBy: { createdAt: 'desc' },
    });
    posts = dbPosts;
  } catch {
    // DB unavailable — use static fallback
  }

  // Use static posts if DB is empty or unavailable
  const display = posts.length > 0 ? posts : STATIC_POSTS;
  return <BlogClient posts={display} />;
}
