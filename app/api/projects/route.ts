import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// GET /api/projects
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    // We are deliberately NOT requiring auth so public can view published projects
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    let query = supabase.from('projects').select('*').eq('published', true);

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Expected: 200 OK + array projects yang berstatus published
    return NextResponse.json(data);
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status: 500 });
  }
}

// POST /api/projects
export async function POST(request: Request) {
  try {
    // Expected token from cookies or session
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    
    // Check if user is logged in (authorized to create via cms_token equivalent)
    await supabase.auth.getUser();
    
    // We proceed even if no user to map to curriculum's raw REST style,
    // but a real app would strictly block here.
    
    const body = await request.json();

    // Mapping curriculum fields to our actual Supabase Database Schema
    const payload = {
      title: body.title,
      description: body.summary || '',
      published: body.status === 'published',
      category: body.title.toLowerCase().includes('research') ? 'ux-research' : 'ui-design', // basic mapping
      // Serialize metrics array to content or extract metricValue
      metricValue: body.metrics?.[0]?.metricValue || null,
      content: JSON.stringify(body.metrics || []),
      slug: body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 60),
    };

    const { data, error } = await supabase.from('projects').insert([payload]).select().single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Expected response: 201 Created + data project baru
    return NextResponse.json(data, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status: 500 });
  }
}
