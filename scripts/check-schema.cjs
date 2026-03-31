const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envContent = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf-8');
for (const line of envContent.split('\n')) {
  const [key, ...vals] = line.split('=');
  if (key && key.trim() && !key.startsWith('#')) {
    process.env[key.trim()] = vals.join('=').trim();
  }
}

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function main() {
  const { data, error } = await sb.from('projects').select('*').limit(1);
  if (error) { console.log('Error:', error.message); return; }
  const cols = data && data[0] ? Object.keys(data[0]) : [];
  console.log('Existing columns:', cols.join(', ') || '(empty table)');
  
  // Try a test insert to see what columns are accepted
  const test = await sb.from('projects').insert({
    title: '_schema_test_',
    description: 'test',
    published: false,
    image: '/images/test.png',
    slug: '_schema_test_',
    category: 'Test',
    clientName: 'Test',
    projectYear: 2024,
    metricValue: 'test',
    gradient: 'none',
  }).select().single();
  
  if (test.error) {
    console.log('Insert test error:', test.error.message);
  } else {
    console.log('Insert OK, real columns:', Object.keys(test.data || {}).join(', '));
    await sb.from('projects').delete().eq('slug', '_schema_test_');
  }
}

main().catch(console.error);
