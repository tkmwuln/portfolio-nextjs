import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// GET /api/projects — public, returns all published projects with static image fallback
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get('all') === 'true';

    const projects = await prisma.project.findMany({
      where: all ? {} : { status: 'published' },
      orderBy: { createdAt: 'desc' },
      include: { category: true, metrics: true, images: true }
    });
    return NextResponse.json(projects);
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown' }, { status: 500 });
  }
}

// POST /api/projects — create new project (requires auth)
export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('cms_token');
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    if (!body.userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });

    const slug = body.slug || body.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    const project = await prisma.project.create({
      data: {
        title: body.title,
        slug,
        summary: body.description || '',
        content: body.content || null,
        coverImageUrl: body.image || null,
        status: body.published ? 'published' : 'draft',
        category: body.categoryId ? { connect: { id: body.categoryId } } : undefined,
        clientName: body.clientName || null,
        projectYear: body.projectYear ? Number(body.projectYear) : null,
        role: body.role || null,
        createdBy: body.userId,
      },
    });
    return NextResponse.json(project, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown' }, { status: 500 });
  }
}
