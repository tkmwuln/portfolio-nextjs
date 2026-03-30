import Link from "next/link";
import { prisma } from '@/lib/prisma'

async function getProfileData() {
  try {
    const user = await prisma.user.findFirst({
      include: { skills: true },
    });
    return user;
  } catch (error) {
    console.error("Failed to fetch profile data:", error);
    return null;
  }
}

const EXPERIENCE = [
  {
    company: "INA DIGITAL",
    role: "Product Manager & Design",
    period: "Nov 2025 – Present",
    duration: "5 months",
    location: "Jakarta, Indonesia",
    logo: "🏛️",
    description: "Leading product management and design at Indonesia's national digital transformation agency. Developing national digital identity and government service platforms.",
    current: true,
  },
  {
    company: "Telkom Indonesia",
    role: "UX Designer Lead",
    period: "Oct 2024 – Nov 2025",
    duration: "1 yr 2 mo",
    location: "Indonesia",
    logo: "📡",
    description: "Leading solution designer for complex digital products including Telkom's Strategic CX Platform, LKPP Government Procurement, and E-Health ecosystem (SIMRS, SIMKLINIK, EMR, vaccination).",
    current: false,
  },
  {
    company: "Telkom Indonesia",
    role: "UX Design Lead",
    period: "Jun 2023 – Nov 2025",
    duration: "2 yrs 6 mo",
    location: "Jakarta, Indonesia",
    logo: "📡",
    description: "Facilitation & Initiative design standardization. Lead and facilitator of 11 design tribe technology commercialization teams. Building a love of user-centric product design.",
    current: false,
  },
  {
    company: "WeekndLabs Studio",
    role: "Crafting & Founding",
    period: "Feb 2018 – Feb 2026",
    duration: "8 yrs 1 mo",
    location: "Bandung",
    logo: "⚡",
    description: "Co-founded design studio offering DevOps, Application Development, UI/UX Service, and Illustrator Service. Built design systems, blockchain UX, and fintech products.",
    current: false,
  },
];

const SERVICES = [
  { icon: "🎨", name: "UX Design", desc: "End-to-end user experience design from research to delivery" },
  { icon: "🔬", name: "UX Research", desc: "Qualitative & quantitative research, usability testing" },
  { icon: "🗺️", name: "Service Design", desc: "Service blueprints, journey maps, systems thinking" },
  { icon: "📋", name: "Project Management", desc: "Agile PM, roadmap, stakeholder alignment" },
  { icon: "🤝", name: "Interaction Design", desc: "Micro-interactions, prototyping, motion design" },
  { icon: "🌐", name: "Web Design", desc: "Responsive web design and design systems" },
];

const DEFAULT_SKILLS = [
  "Cognitive Psychology", "System Thinking", "CX Design", "Service Design",
  "Design Strategy", "UX Research", "Figma", "Prototyping", "User Testing",
  "Agile / Scrum", "OKR Framework", "Stakeholder Management",
  "Design Systems", "Information Architecture", "AI Product Management",
];

export default async function AboutPage() {
  const profile = await getProfileData();

  const skills = profile?.skills?.map(s => s.name) || DEFAULT_SKILLS;

  return (
    <div className="min-h-screen bg-page">
      <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6 py-8 md:py-12 space-y-6 md:space-y-8">


        <div
          className="rounded-[var(--r-xl)] p-8 md:p-12 flex flex-col md:flex-row items-start gap-8 relative overflow-hidden"
          style={{ background: "linear-gradient(140deg, #0d0f1a 0%, #1a1f42 100%)" }}
        >
          <div
            className="absolute -top-20 -right-20 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(61,90,241,.2) 0%, transparent 70%)" }}
          />

          {/* Avatar */}
          <div className="w-24 h-24 rounded-full overflow-hidden relative shrink-0 ring-4 ring-white/10">
            <img
              src={profile?.avatar || "/images/profile-pic.png"}
              alt={profile?.name || "Putri Wulandari"}
              className="object-cover w-full h-full absolute inset-0 z-10 bg-card"
            />
            {/* Fallback initials */}
            <div className="w-full h-full absolute inset-0 z-0 flex items-center justify-center bg-gradient-to-br from-accent to-violet text-white text-2xl font-bold font-display">
              PW
            </div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-success shadow-[0_0_0_4px_rgba(34,201,129,.2)]" />
              <span className="text-[12px] text-white/60">Available for new opportunities</span>
            </div>
            <h1 className="font-display text-[42px] font-extrabold text-white tracking-tight leading-tight mb-2">
              {profile?.name || "Putri Wulandari"}
            </h1>
            <p className="text-white/50 text-[15px] mb-4">
              AI Product Manager · Service Designer · UX Lead
            </p>
            <p className="text-white/70 max-w-xl leading-relaxed text-sm">
              {profile?.bio || "💫 I'm a digital Product Manager and Service Designer. I love using cognitive psychology to humanize tech and solve people problems. I am a keen learner, team player, and enjoy taking on new challenges and side projects."}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <a
                href={profile?.linkedin || "https://www.linkedin.com/in/putriwulandari-ptrwuln/"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent text-[13px] py-2.5 px-5"
              >
                Connect on LinkedIn ↗
              </a>
              <a
                href="https://drive.google.com/file/d/1TUy0n71AlVlbuL9dx5qte_1tGUB7EPVu/view"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium cursor-pointer no-underline transition-all duration-200 px-5 py-2.5 rounded-pill text-[13px] text-white/70 hover:text-white border border-white/20 hover:border-white/50"
              >
                Download CV ↓
              </a>
              <a
                href="https://ptrwulan.notion.site/Hey-I-m-Putri-Wulandari-bc84907898ac4321b9dc987c5f3043cb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium cursor-pointer no-underline transition-all duration-200 px-5 py-2.5 rounded-pill text-[13px] text-white/70 hover:text-white border border-white/20 hover:border-white/50"
              >
                Notion Portfolio ↗
              </a>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="card p-8">
          <p className="label uppercase tracking-widest text-ink-3 mb-2">What I Do</p>
          <h2 className="font-display text-2xl font-bold text-ink tracking-tight mb-6">Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((s) => (
              <div key={s.name} className="p-5 rounded-[var(--r)] bg-card2 border border-[var(--border)] hover:border-accent/30 transition-colors duration-200">
                <div className="text-2xl mb-3">{s.icon}</div>
                <h3 className="font-display font-bold text-ink text-[15px] mb-1">{s.name}</h3>
                <p className="text-ink-2 text-[12px] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="card p-8">
          <p className="label uppercase tracking-widest text-ink-3 mb-2">Career</p>
          <h2 className="font-display text-2xl font-bold text-ink tracking-tight mb-6">Experience</h2>
          <div className="space-y-0">
            {EXPERIENCE.map((exp, i) => (
              <div key={i} className="flex gap-5 pb-8 relative">
                {/* Timeline line */}
                {i < EXPERIENCE.length - 1 && (
                  <div className="absolute left-5 top-10 bottom-0 w-[1px] bg-[var(--border)]" />
                )}
                {/* Logo circle */}
                <div className="w-10 h-10 rounded-full bg-card2 border border-[var(--border)] flex items-center justify-center text-lg shrink-0 z-10">
                  {exp.logo}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-display font-bold text-ink text-[15px]">{exp.role}</h3>
                    {exp.current && (
                      <span className="text-[10px] bg-success/15 text-success px-2 py-0.5 rounded-pill font-semibold">Current</span>
                    )}
                  </div>
                  <p className="text-accent text-[13px] font-semibold">{exp.company}</p>
                  <p className="text-ink-3 text-[12px] mt-0.5 mb-2">
                    {exp.period} · {exp.duration} · {exp.location}
                  </p>
                  <p className="text-ink-2 text-[13px] leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="card p-8">
          <p className="label uppercase tracking-widest text-ink-3 mb-2">Expertise</p>
          <h2 className="font-display text-2xl font-bold text-ink tracking-tight mb-6">Skills & Tools</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="expertise-tag">{skill}</span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="card p-8 text-center">
          <h2 className="font-display text-2xl font-bold text-ink tracking-tight mb-2">
            Let&apos;s Work Together
          </h2>
          <p className="text-ink-2 text-sm mb-6 max-w-md mx-auto">
            Open to PM, UX Lead, and Service Design opportunities. 500+ connections on LinkedIn.
          </p>
          <a
            href={profile?.linkedin || "https://www.linkedin.com/in/putriwulandari-ptrwuln/"}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Connect on LinkedIn ↗
          </a>
        </div>
      </div>
    </div>
  );
}
