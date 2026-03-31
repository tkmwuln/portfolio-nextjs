import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// GET /api/blog
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get('all') === 'true';

    const posts = await prisma.blogPost.findMany({
      where: all ? {} : { published: true },
      include: { tags: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(posts);
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown' }, { status: 500 });
  }
}

// POST /api/blog
export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('cms_token');
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const userId = body.userId as string;
    if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });

    const post = await prisma.blogPost.create({
      data: {
        title: body.title,
        slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        excerpt: body.excerpt || null,
        content: body.content || '',
        published: body.published ?? false,
        userId,
        tags: body.tags?.length
          ? {
              connectOrCreate: (body.tags as string[]).map((name: string) => ({
                where: { name },
                create: { name },
              })),
            }
          : undefined,
      },
      include: { tags: true },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown' }, { status: 500 });
  }
}
