
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createAdmin() {
  const email = 'putri@wulandari.dev';
  const password = 'wulan049314'; // Let's try a variation or a new one

  console.log(`Checking if user ${email} exists...`);
  
  // Try to create the user
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  });

  if (error) {
    if (error.message.includes('already registered')) {
      console.log('User already exists. Resetting password...');
      // Update password for existing user
      const { data: users, error: listError } = await supabase.auth.admin.listUsers();
      if (listError) {
        console.error('Error listing users:', listError);
        return;
      }
      
      const user = users.users.find(u => u.email === email);
      if (user) {
        const { error: updateError } = await supabase.auth.admin.updateUserById(
          user.id,
          { password }
        );
        if (updateError) {
          console.error('Error updating password:', updateError);
        } else {
          console.log(`Successfully reset password for ${email} to ${password}`);
        }
      }
    } else {
      console.error('Error creating user:', error.message);
    }
  } else {
    console.log(`Successfully created admin user: ${email} with password: ${password}`);
  }
}

createAdmin();
