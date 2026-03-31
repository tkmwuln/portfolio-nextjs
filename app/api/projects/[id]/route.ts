import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// GET /api/projects/[id]
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(project);
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown' }, { status: 500 });
  }
}

// PUT /api/projects/[id]
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('cms_token');
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const project = await prisma.project.update({
      where: { id },
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        content: body.content,
        image: body.image,
        category: body.category,
        clientName: body.clientName,
        projectYear: body.projectYear ? Number(body.projectYear) : null,
        metricValue: body.metricValue,
        metricLabel: body.metricLabel,
        gradient: body.gradient,
        demoUrl: body.demoUrl,
        sourceUrl: body.sourceUrl,
        docUrl: body.docUrl,
        docLabel: body.docLabel,
        role: body.role,
        technologies: body.technologies ?? [],
        published: body.published ?? true,
        featured: body.featured ?? false,
      },
    });
    return NextResponse.json(project);
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown' }, { status: 500 });
  }
}

// DELETE /api/projects/[id]
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('cms_token');
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown' }, { status: 500 });
  }
}
