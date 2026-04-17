import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Manual env parsing since we might have run issues with dotenv
const envPath = path.resolve('.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, ...value] = line.split('=');
  if (key && value) env[key.trim()] = value.join('=').trim();
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createAdmin() {
  const email = 'putri@wulandari.dev';
  const password = 'wulan049314'; // Using a clean password

  console.log(`🚀 Creating/Resetting admin: ${email}`);
  
  // 1. Check if user exists
  const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) {
    console.error('❌ Error listing users:', listError.message);
    return;
  }

  const existingUser = users.find(u => u.email === email);

  if (existingUser) {
    console.log('🔄 User exists. Updating password...');
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      existingUser.id,
      { password, email_confirm: true }
    );
    if (updateError) {
      console.error('❌ Update failed:', updateError.message);
    } else {
      console.log('✅ Password reset successful!');
    }
  } else {
    console.log('✨ Creating new user...');
    const { error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    });
    if (createError) {
      console.error('❌ Creation failed:', createError.message);
    } else {
      console.log('✅ Admin user created successfully!');
    }
  }
  
  console.log('\n-----------------------------------');
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);
  console.log('-----------------------------------');
}

createAdmin();
