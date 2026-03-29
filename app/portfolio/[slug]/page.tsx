import Link from "next/link";

const CV_URL = "https://drive.google.com/file/d/1TUy0n71AlVlbuL9dx5qte_1tGUB7EPVu/view";

const PROJECTS: Record<string, {
  title: string; category: string; client: string; year: number;
  metric: string; description: string; gradient: string;
  tags: string[]; overview: string; process: string[]; outcome: string;
}> = {
  "simrs-kesehatan": {
    title: "E-Health Platform — SIMRS Kesehatan",
    category: "Govtech · E-Health",
    client: "Telkom Indonesia",
    year: 2024,
    metric: "50k+ MAU",
    gradient: "linear-gradient(140deg, #2c3e50 0%, #3498db 100%)",
    tags: ["UX Design", "Service Design", "E-Health", "Govtech"],
    description: "End-to-end UX design for hospital management system serving 50k+ monthly users.",
    overview: "Led the design of SIMRS (Sistem Informasi Manajemen Rumah Sakit) — a comprehensive hospital management platform. This included SIMKLINIK, EMR, and vaccination modules as part of Indonesia's Satu Sehat (One Digital Health) initiative under Telkom Indonesia.",
    process: [
      "Discovery & Research: Shadowed medical staff, patients, and administrators to map pain points in existing pen-and-paper workflows",
      "Service Blueprint: Mapped 47 touchpoints across patient journey — from registration to medical record archiving",
      "Ideation & Design: Created 160+ screens across 8 modules with 3 user roles (admin, dokter, perawat)",
      "Usability Testing: 5-round moderated testing with hospital staff at RSUD partner hospitals",
      "Iteration & Handoff: Delivered annotated Figma specs with 200+ component variants",
    ],
    outcome: "The platform now serves 50,000+ monthly active users across 12 partner hospitals. Patient registration time reduced by 67%. Medical record retrieval from 8 minutes to under 30 seconds.",
  },
  "cx-platform": {
    title: "Strategic CX Platform",
    category: "B2B SaaS",
    client: "Telkom Indonesia",
    year: 2023,
    metric: "+38% Conversion",
    gradient: "linear-gradient(140deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
    tags: ["CX Design", "Product Strategy", "Research", "SaaS"],
    description: "Designing Telkom's customer experience platform that improved checkout conversion by 38%.",
    overview: "Designed and led UX for Telkom's Strategic Customer Experience Platform — a B2B SaaS product enabling enterprise clients to manage customer journeys. Responsible for end-to-end product experience from research to shipped features.",
    process: [
      "Stakeholder alignment: Facilitated 11 design tribe teams across Telkom tech commercialization",
      "CX Audit: Analyzed 200+ customer journey maps to identify top friction points",
      "Design Standards: Established design standardization across 11 product teams",
      "A/B Testing: Ran 12 experiments across checkout, onboarding, and dashboard flows",
      "Metrics Framework: Built CX measurement framework aligned to business KPIs",
    ],
    outcome: "Checkout conversion improved by 38%. D30 retention up by 24%. NPS score increased from 34 to 61 across B2B client base.",
  },
  "lkpp-procurement": {
    title: "Government Procurement UX",
    category: "Govtech",
    client: "LKPP",
    year: 2024,
    metric: "10M+ Users",
    gradient: "linear-gradient(140deg, #4b1248 0%, #f0c27b 100%)",
    tags: ["Service Design", "Government", "UX Research", "Procurement"],
    description: "Service design & UX lead for LKPP digital procurement platform used by 10M+ Indonesians.",
    overview: "Led UX design for LKPP (Lembaga Kebijakan Pengadaan Barang/Jasa Pemerintah) — Indonesia's National Government Procurement Agency. Simplified complex multi-stakeholder procurement processes into a digital-first experience.",
    process: [
      "Policy Research: Studied procurement regulations across 34 provinces",
      "User Interviews: Conducted 40+ interviews with procurement officers, vendors, and auditors",
      "Journey Mapping: Mapped 5 key procurement workflows with 30+ decision points each",
      "Prototype Testing: Remote and in-person testing with government procurement staff",
      "Accessibility: Ensured WCAG 2.1 AA compliance for government platform",
    ],
    outcome: "Platform serves 10M+ registered users. Procurement cycle time reduced by 45%. Vendor onboarding from 30 days to 3 days.",
  },
  "fintech-onboarding": {
    title: "Fintech Onboarding — D7 Retention",
    category: "Fintech",
    client: "WeekndLabs Studio",
    year: 2022,
    metric: "+61% D7 Retention",
    gradient: "linear-gradient(140deg, #373b44 0%, #4286f4 100%)",
    tags: ["UX Design", "Onboarding", "Psychology", "Fintech"],
    description: "Onboarding redesign using cognitive psychology that boosted 7-day retention by 61%.",
    overview: "Applied cognitive psychology principles to redesign a fintech app's onboarding experience. Used Fogg Behavior Model, progressive disclosure, and trust signaling to reduce early churn and increase activation.",
    process: [
      "Behavioral Analysis: Analyzed drop-off points using Mixpanel & Hotjar across 10k sessions",
      "Psychology Framework: Applied Fogg's B=MAP model to redesign motivation & ability triggers",
      "Content Strategy: Rewrote all onboarding copy using plain language principles",
      "Visual Design: Created warm, trust-building visual language replacing sterile fintech aesthetics",
      "A/B Testing: 8-week experiment with 2,400 users split across 3 variants",
    ],
    outcome: "7-day retention increased by 61%. D30 retention up 34%. App Store rating improved from 3.2 to 4.6 stars within 3 months of launch.",
  },
  "design-system": {
    title: "Design System — 200+ Components",
    category: "Design System",
    client: "WeekndLabs Studio",
    year: 2021,
    metric: "200+ Components",
    gradient: "linear-gradient(140deg, #1a1c2c 0%, #4a192c 100%)",
    tags: ["Design System", "Component Library", "Documentation", "Figma"],
    description: "Built a comprehensive design system from 0 to 200+ components for multi-product ecosystem.",
    overview: "Founded and built a design system from scratch for WeekndLabs Studio's multi-product portfolio spanning DevOps tools, UI/UX products, and illustration services. Includes tokens, components, patterns, and governance.",
    process: [
      "Audit: Catalogued 1,200+ UI elements across 6 existing products",
      "Token Architecture: Defined 340+ design tokens across color, typography, spacing, and animation",
      "Component Design: Built 200+ Figma components with auto-layout, variants, and documentation",
      "Developer Handoff: Created React component library in parallel with design",
      "Governance: Established contribution process and versioning protocol",
    ],
    outcome: "Design-to-dev time reduced by 60%. New feature UI delivery time from 2 weeks to 3 days. Adopted across 6 active products.",
  },
  "ina-digital": {
    title: "INA DIGITAL — National Identity Platform",
    category: "Govtech",
    client: "INA DIGITAL",
    year: 2025,
    metric: "National Scale",
    gradient: "linear-gradient(140deg, #141e30 0%, #243b55 100%)",
    tags: ["Product Management", "Government", "Digital Identity", "Strategy"],
    description: "Leading PM & Design at INA Digital — Indonesia's national digital identity platform.",
    overview: "Currently serving as Product Manager & Design Lead at INA DIGITAL — Indonesia's government digital transformation agency responsible for national digital identity and citizen services. Leading product strategy, design, and cross-functional execution.",
    process: [
      "Product Strategy: Defining OKRs and roadmap for national-scale digital identity features",
      "Stakeholder Management: Coordinating across 10+ government ministries and agencies",
      "UX Leadership: Leading design for citizen-facing digital identity services",
      "Agile Execution: Running 2-week sprint cycles with cross-functional teams",
      "Impact Measurement: Building analytics framework for government service effectiveness",
    ],
    outcome: "Currently in active development. Platform targets 180M+ Indonesian citizens. Working toward full digital identity rollout by 2026.",
  },
  "blockchain-service": {
    title: "Blockchain Service Design",
    category: "Blockchain",
    client: "WeekndLabs Studio",
    year: 2023,
    metric: "3 Products",
    gradient: "linear-gradient(140deg, #1f1c2c 0%, #928dab 100%)",
    tags: ["Blockchain", "Service Design", "UX", "Web3"],
    description: "UX and service design for blockchain-based government services.",
    overview: "Designed 3 blockchain-based service products, making complex decentralized technology accessible to non-technical government users and citizens. Focus on trust, transparency, and simplicity.",
    process: [
      "Research: Studied blockchain UX patterns and failure modes across 20+ Web3 products",
      "Mental Model Mapping: Bridged blockchain complexity with familiar government service mental models",
      "Prototype: Built interactive prototypes testing key blockchain concepts with non-tech users",
      "Plain Language: Rewrote all blockchain interactions in plain Indonesian",
      "Trust Design: Designed visual trust signals replacing cryptographic jargon",
    ],
    outcome: "Reduced user comprehension time from 12 minutes to 2.5 minutes. Successfully shipped 3 blockchain-powered services for government clients.",
  },
  "emr-vaccination": {
    title: "EMR & Vaccination Ecosystem",
    category: "E-Health",
    client: "Telkom Indonesia",
    year: 2024,
    metric: "Satu Sehat",
    gradient: "linear-gradient(140deg, #2b5876 0%, #4e4376 100%)",
    tags: ["E-Health", "UX Design", "Government", "Healthcare"],
    description: "Electronic Medical Records and vaccination management UX for Indonesia's Satu Sehat initiative.",
    overview: "Designed the EMR (Electronic Medical Records) and national vaccination management modules as part of Indonesia's One Digital Health (Satu Sehat) initiative — a nationwide initiative to digitize all healthcare data.",
    process: [
      "Regulatory Compliance: Ensured design meets MoH (Ministry of Health) data standards",
      "Clinical Workflow: Shadowed doctors and nurses to understand EMR usage patterns",
      "Data Architecture UX: Designed complex medical data entry with validation UX",
      "Vaccination Tracking: Created vaccine schedule tracking for 270M+ citizens",
      "Integration Design: Designed data flow between hospital systems and national health database",
    ],
    outcome: "EMR system integrated across 12 hospitals. Vaccination record digitization serving millions of Indonesian citizens under MoH Satu Sehat program.",
  },
};

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = PROJECTS[resolvedParams.slug];

  if (!project) {
    return (
      <div className="min-h-screen bg-page flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-ink mb-4">Project Not Found</h1>
          <Link href="/portfolio" className="btn-primary">← Back to Portfolio</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page">
      {/* Hero */}
      <div
        className="w-full h-[400px] flex items-end relative overflow-hidden"
        style={{ background: project.gradient }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 pb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] bg-white/20 text-white/80 px-3 py-1 rounded-pill font-semibold tracking-wider uppercase backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-display text-[42px] font-extrabold text-white tracking-tight leading-tight max-w-2xl">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-6 mt-4 text-white/60 text-sm">
            <span>Client: <strong className="text-white">{project.client}</strong></span>
            <span>Year: <strong className="text-white">{project.year}</strong></span>
            <span>Impact: <strong className="text-white">{project.metric}</strong></span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto w-full max-w-[1280px] px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div className="card p-8">
              <h2 className="font-display text-xl font-bold text-ink mb-4 tracking-tight">Overview</h2>
              <p className="text-ink-2 leading-relaxed">{project.overview}</p>
            </div>

            {/* Process */}
            <div className="card p-8">
              <h2 className="font-display text-xl font-bold text-ink mb-6 tracking-tight">Design Process</h2>
              <div className="space-y-4">
                {project.process.map((step, i) => {
                  const [label, ...rest] = step.split(": ");
                  return (
                    <div key={i} className="flex gap-4">
                      <div className="w-7 h-7 rounded-full bg-accent-soft text-accent flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-ink text-sm">{label}</p>
                        {rest.length > 0 && (
                          <p className="text-ink-2 text-sm mt-0.5">{rest.join(": ")}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Outcome */}
            <div
              className="rounded-[var(--r-lg)] p-8 text-white"
              style={{ background: project.gradient }}
            >
              <h2 className="font-display text-xl font-bold mb-4 tracking-tight">Outcomes & Impact</h2>
              <p className="text-white/80 leading-relaxed">{project.outcome}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Author Card */}
            <div
              className="rounded-[var(--r-lg)] p-6 text-white relative overflow-hidden"
              style={{ background: "linear-gradient(140deg, #0d0f1a 0%, #1a1f42 100%)" }}
            >
              <div
                className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(91,120,255,.3) 0%, transparent 70%)" }}
              />
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-full overflow-hidden relative ring-2 ring-white/20 shrink-0">
                  <img
                    src="/images/profile-pic.png"
                    alt="Putri Wulandari"
                    className="object-cover w-full h-full absolute inset-0 z-10"
                  />
                  <div className="w-full h-full absolute inset-0 z-0 flex items-center justify-center bg-gradient-to-br from-accent to-violet text-white text-sm font-bold">
                    PW
                  </div>
                </div>
                <div>
                  <p className="font-display font-bold text-white text-[14px]">Putri Wulandari</p>
                  <p className="text-white/50 text-[11px]">PM & UX Lead</p>
                </div>
              </div>
              <p className="text-white/60 text-[12px] leading-relaxed">AI Product Manager & Service Designer based in Jakarta, ID.</p>
            </div>

            {/* Project Info */}
            <div className="card p-6">
              <h3 className="font-display text-base font-bold text-ink mb-4">Project Info</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-ink-3 label uppercase">Client</p>
                  <p className="text-ink font-medium mt-1">{project.client}</p>
                </div>
                <div>
                  <p className="text-ink-3 label uppercase">Category</p>
                  <p className="text-ink font-medium mt-1">{project.category}</p>
                </div>
                <div>
                  <p className="text-ink-3 label uppercase">Year</p>
                  <p className="text-ink font-medium mt-1">{project.year}</p>
                </div>
                <div>
                  <p className="text-ink-3 label uppercase">Key Metric</p>
                  <p className="text-[22px] font-display font-extrabold text-accent tracking-tight mt-1">
                    {project.metric}
                  </p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="card p-6">
              <h3 className="font-display text-base font-bold text-ink mb-4">Skills Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="pill pill-blue text-[11px]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Download Case Study */}
            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-pill font-semibold text-[13px] no-underline transition-all duration-200 border-2 border-accent text-accent hover:bg-accent hover:text-white"
            >
              ↓ Download Case Study Doc
            </a>

            <Link
              href="https://www.linkedin.com/in/putriwulandari-ptrwuln/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center text-center block"
            >
              Discuss This Project ↗
            </Link>

            <Link href="/portfolio" className="btn-ghost w-full justify-center text-center block">
              ← All Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
