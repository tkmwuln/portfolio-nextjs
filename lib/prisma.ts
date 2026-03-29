import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

// Bridge the Prisma call to your active Supabase DB instance
export const prisma = {
  project: {
    count: async () => {
      const cookieStore = await cookies();
      const supabase = createClient(cookieStore);
      const { count } = await supabase.from('projects').select('*', { count: 'exact', head: true });
      return count || 0;
    }
  }
};
