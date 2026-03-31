import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// GET /api/projects — public, returns all published projects with static image fallback
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get('all') === 'true';

    const projects = await prisma.project.findMany({
      where: all ? {} : { published: true },
      orderBy: { createdAt: 'desc' },
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
        description: body.description || '',
        content: body.content || null,
        image: body.image || null,
        demoUrl: body.demoUrl || null,
        sourceUrl: body.sourceUrl || null,
        technologies: body.technologies || [],
        featured: body.featured ?? false,
        published: body.published ?? true,
        category: body.category || null,
        clientName: body.clientName || null,
        projectYear: body.projectYear ? Number(body.projectYear) : null,
        metricValue: body.metricValue || null,
        metricLabel: body.metricLabel || null,
        gradient: body.gradient || null,
        docUrl: body.docUrl || null,
        docLabel: body.docLabel || null,
        role: body.role || null,
        userId: body.userId,
      },
    });
    return NextResponse.json(project, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown' }, { status: 500 });
  }
}
