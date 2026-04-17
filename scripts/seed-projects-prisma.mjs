/**
 * Seed script using Prisma (handles cuid() + user FK automatically).
 * Run: node scripts/seed-projects-prisma.mjs
 */
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createRequire } from 'module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// Load .env.local
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
  console.warn('⚠️  Could not load .env.local');
}

// Use DIRECT_URL for Prisma seeding (bypasses PgBouncer)
process.env.DATABASE_URL = 'postgresql://postgres:049314wulan@db.kpnaaxsgtbtxxpubmfay.supabase.co:5432/postgres';

const { PrismaClient } = require('../app/generated/prisma/index.js');
const prisma = new PrismaClient();

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
    technologies: ['Service Design', 'UX Research', 'Figma', 'Usability Testing'],
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
    technologies: ['Product Design', 'CX Research', 'Design System', 'Figma'],
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
    technologies: ['Service Design', 'UX Research', 'Stakeholder Management'],
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
    technologies: ['UX Design', 'Psychology', 'A/B Testing', 'Mobile'],
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
    technologies: ['Design System', 'Figma', 'Storybook', 'Tokens'],
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
    technologies: ['Product Management', 'Service Design', 'Strategy'],
  },
];

async function seed() {
  console.log('🌱  Seeding projects via Prisma...\n');

  // Get or create the portfolio owner user
  let user = await prisma.user.findFirst({ where: { email: 'putri@wulandari.dev' } });
  if (!user) {
    user = await prisma.user.upsert({
      where: { email: 'putri@wulandari.dev' },
      update: {},
      create: {
        email: 'putri@wulandari.dev',
        name: 'Putri Wulandari',
        headline: 'AI Product Manager & Service Designer',
        location: 'Jakarta, Indonesia',
      },
    });
    console.log('👤  Created user:', user.email);
  } else {
    console.log('👤  Found existing user:', user.email);
  }

  for (const project of PROJECTS) {
    try {
      const result = await prisma.project.upsert({
        where: { slug: project.slug },
        update: {
          title: project.title,
          description: project.description,
          image: project.image,
          category: project.category,
          clientName: project.clientName,
          projectYear: project.projectYear,
          metricValue: project.metricValue,
          metricLabel: project.metricLabel,
          published: project.published,
          featured: project.featured,
          gradient: project.gradient,
          technologies: project.technologies,
        },
        create: {
          ...project,
          userId: user.id,
        },
      });
      console.log(`✅  ${result.slug} (id: ${result.id})`);
    } catch (err) {
      console.error(`❌  ${project.slug}:`, err.message);
    }
  }

  console.log('\n🎉  Done! Projects are now in Supabase and editable via the CMS.');
  await prisma.$disconnect();
}

seed().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
