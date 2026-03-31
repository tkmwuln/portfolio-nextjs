/**
 * Static blog post data — used as fallback when DB has no posts.
 * These are real article summaries based on the portfolio's domain.
 */

export type StaticPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: { id: string; name: string }[];
  createdAt: string;
  readTime: string;
  gradient: string;
  coverImage?: string | null;
  published: boolean;
};

export const STATIC_POSTS: StaticPost[] = [
  {
    id: 'b1',
    slug: 'cognitive-psychology-fintech-onboarding',
    title: 'How Cognitive Psychology Transformed Our Fintech Onboarding',
    excerpt:
      'By applying principles of cognitive load theory and progressive disclosure, we redesigned a fintech onboarding flow that boosted D7 retention by 61%.',
    content:
      '## Introduction\n\nWhen we started redesigning the onboarding flow for a leading fintech app, we faced a common challenge: users were dropping off at an alarming rate during the first 7 days. The solution wasn\'t more features — it was less cognitive friction.\n\n## The Problem\n\nOur initial research revealed that users were overwhelmed by the number of steps and decisions required during onboarding. We had 14 screens before a user could make their first transaction.\n\n## Applying Cognitive Load Theory\n\nWe restructured the flow using three principles:\n1. **Chunking** — grouping related information together\n2. **Progressive disclosure** — showing only what\'s needed at each step\n3. **Recognition over recall** — using visual cues instead of text labels\n\n## Results\n\nAfter launching the redesigned flow, D7 retention improved by 61% and the average time to first transaction dropped from 8 minutes to 2.5 minutes.',
    category: 'Product Management',
    tags: [{ id: 't1', name: 'UX Design' }, { id: 't2', name: 'Fintech' }],
    createdAt: '2024-03-15',
    readTime: '5 min read',
    gradient: 'linear-gradient(140deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    coverImage: '/images/blog-cognitive-fintech.png',
    published: true,
  },
  {
    id: 'b2',
    slug: 'government-ux-playbook',
    title: 'Why Government UX Needs a Different Playbook',
    excerpt:
      'Designing for government users requires a fundamentally different approach than consumer apps. Here\'s what 2 years of govtech UX taught me.',
    content:
      '## The Government UX Challenge\n\nAfter working on consumer apps for years, moving to government UX felt like learning design from scratch. The users are different, the stakeholders are different, and the constraints are completely different.\n\n## Key Differences\n\n**Diverse user base**: Government services need to work for everyone from teens to seniors, across all literacy levels and digital comfort zones.\n\n**Legal constraints**: Every design decision needs to be vetted against regulations and accessibility laws.\n\n**Procurement processes**: Design changes go through layers of approval that can take months.\n\n## What Works\n\n1. **Extreme simplicity** — if a 70-year-old can use it intuitively, it\'s good enough\n2. **Offline-first thinking** — many users have unstable internet\n3. **Accessibility from day one** — not as an afterthought',
    category: 'UX Design',
    tags: [{ id: 't3', name: 'Govtech' }, { id: 't4', name: 'Accessibility' }],
    createdAt: '2024-02-28',
    readTime: '7 min read',
    gradient: 'linear-gradient(140deg, #4b1248 0%, #f0c27b 100%)',
    coverImage: '/images/blog-government-ux.png',
    published: true,
  },
  {
    id: 'b3',
    slug: 'design-system-from-zero',
    title: 'Building a Design System from Zero: Lessons from 200+ Components',
    excerpt:
      'What I learned after building a full design system with over 200 components for a B2B SaaS platform — the wins, the failures, and what I\'d do differently.',
    content:
      '## Why We Built It\n\nWe had 5 product teams building separate implementations of the same UI patterns. Inconsistency was killing our product quality and slowing down every team.\n\n## The Foundation\n\nBefore the first component, we spent 3 weeks on:\n- Design tokens (colors, spacing, typography, shadows)\n- Naming conventions that worked for both designers and developers\n- Contribution guidelines\n\n## The Hard Parts\n\nThe technical implementation was easy. The hard parts were:\n1. Getting team buy-in\n2. Keeping the system up to date\n3. Documenting edge cases\n\n## Results\n\nAfter 6 months, new feature development was 40% faster and our visual inconsistency issues dropped by 80%.',
    category: 'Design System',
    tags: [{ id: 't5', name: 'Design System' }, { id: 't6', name: 'B2B SaaS' }],
    createdAt: '2024-01-20',
    readTime: '9 min read',
    gradient: 'linear-gradient(140deg, #1a1c2c 0%, #4a192c 100%)',
    coverImage: '/images/blog-design-system.png',
    published: true,
  },
  {
    id: 'b4',
    slug: 'service-design-vs-ux',
    title: 'Service Design vs UX Design: What Product Managers Need to Know',
    excerpt:
      'The line between service design and UX design is blurrier than you think. Understanding the difference will make you a better product leader.',
    content:
      '## The Confusion\n\nProduct managers often use "service design" and "UX design" interchangeably. They\'re not the same thing, and conflating them leads to incomplete product strategies.\n\n## UX Design\n\nUX design focuses on the user\'s interaction with a specific digital touchpoint — an app, a website, a feature. It\'s about making that specific moment as smooth and delightful as possible.\n\n## Service Design\n\nService design zooms out to look at the entire service ecosystem — frontend and backend, digital and physical, the user journey AND the employee journey. It considers all touchpoints holistically.\n\n## Why This Matters for PMs\n\nWhen you only think about UX, you might design a beautiful app experience that falls apart because the backend processes, customer support scripts, and operations workflows weren\'t designed to match.',
    category: 'Product Management',
    tags: [{ id: 't7', name: 'Service Design' }, { id: 't8', name: 'Product' }],
    createdAt: '2024-01-05',
    readTime: '6 min read',
    gradient: 'linear-gradient(140deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    coverImage: '/images/blog-service-design.png',
    published: true,
  },
  {
    id: 'b5',
    slug: 'ai-product-management-2024',
    title: 'AI Product Management in 2024: What\'s Actually Different',
    excerpt:
      'Being a PM on an AI product is fundamentally different from traditional software PM. Here\'s what I\'ve learned from 18 months of hands-on AI product work.',
    content:
      '## The Shift\n\nTraditional PM skills still matter — but AI products introduce new dimensions of uncertainty, ethics, and evaluation that require a different mental model.\n\n## What\'s Different\n\n**Non-deterministic outputs**: You can\'t write a spec that says "when user clicks X, Y happens." AI systems have probabilistic outputs that require statistical thinking.\n\n**Evaluation frameworks**: Instead of QA checklists, you need evaluation datasets, human raters, and benchmark metrics.\n\n**Ethical guardrails**: Every AI feature needs to consider bias, fairness, and potential misuse before shipping.\n\n## What Stays the Same\n\n- User research is still essential\n- Prioritization frameworks still work\n- Stakeholder communication is still the hardest part',
    category: 'AI & Product',
    tags: [{ id: 't9', name: 'AI' }, { id: 't10', name: 'Product Management' }],
    createdAt: '2023-12-10',
    readTime: '8 min read',
    gradient: 'linear-gradient(140deg, #141e30 0%, #243b55 100%)',
    coverImage: '/images/blog-ai-product.png',
    published: true,
  },
];
