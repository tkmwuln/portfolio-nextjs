/**
 * Seed script: upserts the 6 canonical portfolio projects (with AI thumbnails) into Supabase.
 * Run from project root: node scripts/seed-projects.mjs
 *
 * Requires env vars: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local manually since we're not in Next.js runtime
const envPath = join(__dirname, '..', '.env.local');
try {
  const envContent = readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const [key, ...vals] = line.split('=');
    if (key && key.trim() && !key.startsWith('#')) {
      process.env[key.trim()] = vals.join('=').trim().replace(/^["']|["']$/g, '');
    }
  }
} catch {
  console.warn('⚠️  Could not load .env.local — relying on existing env vars');
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error('❌  Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);

const PROJECTS = [
  {
    title: 'E-Health Platform — SIMRS Kesehatan',
    slug: 'simrs-kesehatan',
    description: "End-to-end UX design for hospital management system serving 50k+ monthly users across Indonesia's health ecosystem.",
    image: '/images/thumb-simrs-kesehatan.png',
    category: 'Govtech · E-Health',
    clientName: 'Telkom Indonesia',
    projectYear: 2024,
    metricValue: '50k+',
    metricLabel: 'MAU',
    published: true,
    featured: true,
    gradient: 'linear-gradient(140deg, #2c3e50 0%, #3498db 100%)',
  },
  {
    title: 'Strategic CX Platform',
    slug: 'cx-platform',
    description: "Designed and led UX for Telkom's customer experience platform — improving conversion by 38% across checkout flows.",
    image: '/images/thumb-cx-platform.png',
    category: 'B2B SaaS',
    clientName: 'Telkom Indonesia',
    projectYear: 2023,
    metricValue: '+38%',
    metricLabel: 'conversion',
    published: true,
    featured: true,
    gradient: 'linear-gradient(140deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
  },
  {
    title: 'Government Procurement UX',
    slug: 'lkpp-procurement',
    description: 'Service design & UX lead for LKPP (National Procurement Agency) digital procurement platform.',
    image: '/images/thumb-lkpp-procurement.png',
    category: 'Govtech',
    clientName: 'LKPP',
    projectYear: 2024,
    metricValue: '+61%',
    metricLabel: 'efficiency',
    published: true,
    featured: false,
    gradient: 'linear-gradient(140deg, #4b1248 0%, #f0c27b 100%)',
  },
  {
    title: 'Fintech Onboarding — D7 Retention',
    slug: 'fintech-onboarding',
    description: 'Redesigned fintech onboarding flow that improved 7-day retention by 61% using cognitive psychology principles.',
    image: '/images/thumb-fintech-onboarding.png',
    category: 'Fintech',
    clientName: 'WeekndLabs Studio',
    projectYear: 2022,
    metricValue: '+61%',
    metricLabel: 'D7 retention',
    published: true,
    featured: false,
    gradient: 'linear-gradient(140deg, #373b44 0%, #4286f4 100%)',
  },
  {
    title: 'Design System — 200+ Components',
    slug: 'design-system',
    description: 'Built a comprehensive design system from scratch with 200+ tokens and components for multi-product ecosystem.',
    image: '/images/thumb-design-system.png',
    category: 'Design System',
    clientName: 'WeekndLabs Studio',
    projectYear: 2021,
    metricValue: '200+',
    metricLabel: 'components',
    published: true,
    featured: false,
    gradient: 'linear-gradient(140deg, #1a1c2c 0%, #4a192c 100%)',
  },
  {
    title: 'INA DIGITAL — PM & Design',
    slug: 'ina-digital',
    description: "Currently leading product management and design at INA Digital, Indonesia's national digital identity platform.",
    image: '/images/thumb-ina-digital.png',
    category: 'Govtech',
    clientName: 'INA DIGITAL',
    projectYear: 2025,
    metricValue: null,
    metricLabel: null,
    published: true,
    featured: false,
    gradient: 'linear-gradient(140deg, #141e30 0%, #243b55 100%)',
  },
];

async function seed() {
  console.log('🌱  Seeding projects into Supabase...\n');

  for (const project of PROJECTS) {
    const { data, error } = await supabase
      .from('projects')
      .upsert(project, { onConflict: 'slug' })
      .select()
      .single();

    if (error) {
      console.error(`❌  ${project.slug}: ${error.message}`);
    } else {
      console.log(`✅  ${project.slug} → id: ${data?.id ?? '(upserted)'}`);
    }
  }

  console.log('\n🎉  Done! Check your Supabase dashboard to confirm.');
}

seed().catch(console.error);
