import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.auth.signOut()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Logged out successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}