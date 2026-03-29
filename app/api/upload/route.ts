import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // Generate a unique path for the storage bucket
    const ext = file.name.split('.').pop() || 'png';
    const path = `uploads/${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`;

    // Upload to 'images' or 'portfolio' bucket depending on your schema.
    // Using 'images' as it's the most common default name, but can be updated via env var.
    const bucketName = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || 'images';

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(path, file, { contentType: file.type || 'image/png' });

    if (error) {
      // In case the bucket doesn't exist, you might see "Bucket not found".
      // Make sure the bucket is created and set to "public" in your Supabase Dashboard!
      return NextResponse.json({ error: error.message, suggestion: `Ensure bucket '${bucketName}' is created and public in Supabase.` }, { status: 500 });
    }

    // Retrieve public URL to serve directly to the frontend
    const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(path);

    // Expected: 200 OK + { url: 'https://[ref].supabase.co/storage/v1/...' }
    return NextResponse.json({ url: publicUrlData.publicUrl }, { status: 200 });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
