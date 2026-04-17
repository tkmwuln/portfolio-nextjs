import { createClient } from '@/utils/supabase/server';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// GET /api/blog
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get('all') === 'true';

    const posts = await prisma.blogPost.findMany({
      where: all ? {} : { status: 'published' },
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
    const supabase = createClient(cookieStore);
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const userId = user.id;
    if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });

    const post = await prisma.blogPost.create({
      data: {
        title: body.title,
        slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        excerpt: body.excerpt || null,
        content: body.content || '',
        coverImageUrl: body.coverImageUrl || null,
        readTimeMin: body.readTimeMin || 1,
        status: body.status || (body.published ? 'published' : 'draft'),
        authorId: userId,
        tags: body.tags?.length
          ? {
              connectOrCreate: (body.tags as string[]).map((name: string) => {
                const tagSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                return {
                  where: { name },
                  create: { name, slug: tagSlug },
                };
              }),
            }
          : undefined,
      },
      include: { tags: true },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (err: unknown) {
    console.error('Error creating post:', err);
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown' }, { status: 500 });
  }
}
