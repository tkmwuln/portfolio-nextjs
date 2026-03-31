/**
 * Canonical static project data — used by every page that renders projects.
 * When Supabase has live data, this is the fallback/seed source.
 * Image paths reference AI-generated thumbnails in /public/images/.
 */

export type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string | null;
  category: string;
  clientName: string;
  projectYear: number;
  metricValue: string | null;
  metricLabel?: string;
  published: boolean;
  featured: boolean;
  gradient: string;
};

export const STATIC_PROJECTS: Project[] = [
  {
    id: 's1',
    title: 'E-Health Platform — SIMRS Kesehatan',
    slug: 'simrs-kesehatan',
    description:
      'End-to-end UX design for hospital management system serving 50k+ monthly users across Indonesia\'s health ecosystem.',
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
    id: 's2',
    title: 'Strategic CX Platform',
    slug: 'cx-platform',
    description:
      'Designed and led UX for Telkom\'s customer experience platform — improving conversion by 38% across checkout flows.',
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
    id: 's3',
    title: 'Government Procurement UX',
    slug: 'lkpp-procurement',
    description:
      'Service design & UX lead for LKPP (National Procurement Agency) digital procurement platform.',
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
    id: 's4',
    title: 'Fintech Onboarding — D7 Retention',
    slug: 'fintech-onboarding',
    description:
      'Redesigned fintech onboarding flow that improved 7-day retention by 61% using cognitive psychology principles.',
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
    id: 's5',
    title: 'Design System — 200+ Components',
    slug: 'design-system',
    description:
      'Built a comprehensive design system from scratch with 200+ tokens and components for multi-product ecosystem.',
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
    id: 's6',
    title: 'INA DIGITAL — PM & Design',
    slug: 'ina-digital',
    description:
      'Currently leading product management and design at INA Digital, Indonesia\'s national digital identity platform.',
    image: '/images/thumb-ina-digital.png',
    category: 'Govtech',
    clientName: 'INA DIGITAL',
    projectYear: 2025,
    metricValue: null,
    published: true,
    featured: false,
    gradient: 'linear-gradient(140deg, #141e30 0%, #243b55 100%)',
  },
];
