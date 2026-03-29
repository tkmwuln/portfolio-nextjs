import Link from "next/link";

const POSTS: Record<string, {
  title: string; date: string; readTime: string; category: string;
  tags: string[]; gradient: string; excerpt: string; content: string[];
}> = {
  "cognitive-psychology-ux-design": {
    title: "How Cognitive Psychology Makes Better UX",
    date: "2025-03-15",
    readTime: "8 min read",
    category: "UX Design",
    tags: ["UX Research", "Psychology", "Product Design"],
    gradient: "linear-gradient(140deg, #1f1c2c 0%, #928dab 100%)",
    excerpt: "Most UX problems don't come from bad design — they come from skipping steps.",
    content: [
      "## Why Skipping Steps Breaks UX",
      "Most UX problems don't come from bad design. They come from skipping steps. We jump into screens too fast. We start polishing before we understand. Cognitive psychology gives us the language to talk about *why* users behave the way they do — and it's the foundation of everything I do.",
      "## Fogg's Behavior Model in Practice",
      "B.J. Fogg's Behavior Model (B = Motivation × Ability × Prompt) changed how I think about every screen. If a user doesn't complete an action, it's because: motivation is low, ability is too hard, or the prompt came at the wrong time. Designing with this model means I ask different questions at every step.",
      "## Cognitive Load Theory",
      "Miller's Law tells us humans can hold 7 (± 2) items in working memory at a time. Yet we regularly see forms with 15 fields, dashboards with 30 KPIs, and navigation menus with 12 items. Every unnecessary element is cognitive load tax — charged against the user's attention budget.",
      "## Progressive Disclosure",
      "The solution isn't to remove features — it's to reveal them progressively. Show only what's needed right now. Earn the right to show more. The onboarding we redesigned for a fintech client went from 12 steps shown upfront to a 3-step progressive flow — and D7 retention went up 61%.",
      "## Applying This in Government Design",
      "In govtech, the stakes are even higher. Users aren't choosing your product — they're required to use it. That means you can't rely on intrinsic motivation. You must rely on ability and triggering. Every workflow I design for government starts with: what's the cognitive load at each step, and how do we reduce it without losing necessary complexity?",
    ],
  },
  "service-design-govtech-indonesia": {
    title: "Service Design in Indonesian Govtech: What Works",
    date: "2025-02-28",
    readTime: "12 min read",
    category: "Service Design",
    tags: ["Service Design", "Govtech", "Indonesia"],
    gradient: "linear-gradient(140deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
    excerpt: "After designing for LKPP, Telkom, and INA DIGITAL — here's what I've learned about making government digital services actually usable.",
    content: [
      "## The Reality of Govtech UX in Indonesia",
      "When I started working on government digital services, I had a rude awakening: the tools that work beautifully in consumer tech often fail spectacularly in govtech. Why? Because government users are not your typical tech users. They span 60+ year old civil servants using Windows XP to Gen-Z procurement officers on mobile.",
      "## Service Blueprint First, Screens Second",
      "Every successful government project I've led started with a service blueprint — not wireframes. Service blueprints force you to map frontstage and backstage actions, support processes, physical evidence, and pain points across the entire journey. For LKPP, this produced a 47-touchpoint map before a single pixel was drawn.",
      "## The 5 Principles I Live By",
      "**1. Plain language is UX.** Rewriting 'Submit Pengadaan Barang/Jasa' to 'Kirim Permintaan Pembelian' increased task completion by 34%. **2. Offline-first thinking.** Many users have unreliable internet. Design for graceful degradation. **3. Progressive trust.** Government apps often fail because they ask for too much data too early. **4. Design for the 80th percentile user.** Not the power user. **5. Stakeholder alignment is UX.** If ministry A and ministry B disagree on a field, the user pays the price.",
      "## Real Metrics from the Field",
      "LKPP procurement cycle time reduced from 30 days to 3 days for standard purchases. SIMRS hospital registration from 8 minutes to under 30 seconds. These aren't design wins — they're operational transformations that service design made possible.",
    ],
  },
  "ai-product-management-2025": {
    title: "AI Product Management in 2025: A PM's Perspective",
    date: "2025-01-20",
    readTime: "10 min read",
    category: "Product Strategy",
    tags: ["AI", "Product Management", "Strategy"],
    gradient: "linear-gradient(140deg, #4b1248 0%, #f0c27b 100%)",
    excerpt: "What does it actually mean to be an AI Product Manager? Beyond the buzzwords.",
    content: [
      "## What AI PM Actually Means in 2025",
      "Every PM job posting now says 'AI Product Manager.' But what does that actually mean? After leading AI product initiatives at INA DIGITAL, I've developed a clearer picture of the role — and it's not what most people think.",
      "## It's Still About People Problems",
      "The biggest mistake I see: AI PMs who optimize for model accuracy instead of user outcomes. Remember: users don't care if your model achieves 94% accuracy. They care if the product solves their problem. AI is a lever, not a goal.",
      "## The New PM Skill Stack",
      "AI PMs need: **Data literacy** (not data science), **Probabilistic thinking** (AI outputs are probabilities, not facts), **Failure mode analysis** (AI fails differently from traditional software), **Ethical reasoning** (bias, fairness, transparency), and **Explainability UX** (how do you show AI reasoning to non-technical users?).",
      "## Designing for AI Uncertainty",
      "Traditional design assumes deterministic outputs. AI introduces uncertainty. My approach: always show confidence levels visually, provide manual override, explain the reasoning in plain language, and never hide when the AI is uncertain. Trust is the product.",
      "## The Road Ahead",
      "AI product management isn't about replacing human judgment — it's about augmenting human decisions at scale. The best AI products I've seen feel almost invisible. They make the right thing the easy thing, surfacing AI only when it adds genuine value.",
    ],
  },
  "fintech-onboarding-lessons": {
    title: "61% Retention Boost: Lessons from Redesigning Fintech Onboarding",
    date: "2024-11-10",
    readTime: "15 min read",
    category: "Case Study",
    tags: ["Fintech", "Onboarding", "Case Study"],
    gradient: "linear-gradient(140deg, #373b44 0%, #4286f4 100%)",
    excerpt: "A behind-the-scenes look at how we improved 7-day retention by 61%.",
    content: [
      "## The Brief",
      "A fintech client had a problem: 72% of new users churned before day 7. The product actually worked well — the onboarding was the problem. They asked us to redesign it. This is the full story.",
      "## Step 1: Stop Guessing, Start Watching",
      "We spent 2 weeks in pure discovery: Mixpanel funnel analysis, Hotjar session recordings (10,000 sessions), and 12 user interviews. The finding: users didn't understand *what* the app did or *why* they should trust it. The onboarding was a feature tour, not a value demonstration.",
      "## The Fogg Model Applied",
      "**Motivation**: Users had low motivation because the value wasn't demonstrated fast enough. Fix: Show the 'aha moment' (account opening + first simulated investment) within 90 seconds. **Ability**: The KYC flow had 12 steps crammed into one session. Fix: Split into 3 phases over 3 days. **Prompt**: Notifications were generic. Fix: Behavior-triggered prompts based on where each user stopped.",
      "## What We Changed",
      "1. Rewrote all onboarding copy from legal-speak to conversational Indonesian. 2. Added a simulated 'preview mode' before account creation. 3. Replaced progress bar with milestone celebration moments. 4. Split KYC into digestible phases. 5. Built a warm, trustworthy visual language replacing cold fintech aesthetics.",
      "## Results After 8 Weeks",
      "D7 retention up 61%. D30 retention up 34%. App Store rating from 3.2 → 4.6 stars. Support tickets about onboarding down 78%. The lesson: onboarding isn't a tutorial — it's a trust-building relationship.",
    ],
  },
  "design-system-from-zero": {
    title: "Building a Design System from Zero to 200+ Components",
    date: "2024-09-05",
    readTime: "11 min read",
    category: "Design Tools",
    tags: ["Design System", "Figma", "Process"],
    gradient: "linear-gradient(140deg, #1a1c2c 0%, #4a192c 100%)",
    excerpt: "The honest story of building a design system from scratch.",
    content: [
      "## Why We Needed a Design System",
      "By 2020, WeekndLabs had 6 products, 4 designers, 8 developers, and 1,200+ UI elements that didn't talk to each other. Every new feature started from scratch. Consistency was a myth. We needed a design system.",
      "## Phase 1: The Audit",
      "We spent 3 weeks cataloguing every UI element across all 6 products. Color palette: 47 shades of what should have been 6. Button variants: 23 (we needed 4). The audit was painful — but it was the foundation.",
      "## Token Architecture",
      "Design tokens are the backbone. We defined 340+ tokens across: color (primitive → semantic → component), typography (scale, families, weights), spacing (4px grid system), border radius, shadow, and animation. Every token had a name, a value, and a documented purpose.",
      "## The Component Build Process",
      "Each component followed a spec doc before design: variants needed, states (default, hover, focus, disabled, error), accessibility requirements, and responsive behavior. Then Figma design, then code review together with dev. No more 'it looked different in Figma.'",
      "## What Actually Stuck",
      "The components that got adopted: those built *with* developers, not *for* them. The governance model: lightweight pull-request-style contribution process. The thing that almost killed it: perfectionism. Ship v1, iterate. A real v1 beats a perfect v0 every time.",
    ],
  },
  "blockchain-ux-for-non-techies": {
    title: "Making Blockchain UX Accessible to Non-Tech Government Users",
    date: "2024-07-22",
    readTime: "9 min read",
    category: "UX Design",
    tags: ["Blockchain", "Web3", "Accessibility"],
    gradient: "linear-gradient(140deg, #2c3e50 0%, #3498db 100%)",
    excerpt: "Blockchain UI is broken for most people. Here's how we simplified it for government.",
    content: [
      "## The Problem with Blockchain UX",
      "Blockchain products are designed by engineers, for engineers. Hash codes, gas fees, wallet addresses — none of this means anything to the average civil servant who just needs to verify a procurement document. We had to make blockchain invisible.",
      "## Mental Model First",
      "The breakthrough insight: don't teach users about blockchain. Use concepts they already understand. 'Permanent record that can't be changed' instead of 'immutable ledger.' 'Shared audit log' instead of 'distributed ledger.' 'Verification stamp' instead of 'cryptographic signature.'",
      "## Plain Indonesian Language",
      "Every technical term was rewritten. We ran comprehension tests: users read the original interface and the plain language version, then explained back what it meant. The comprehension time dropped from 12 minutes to 2.5 minutes. Language is UX.",
      "## Trust Signals",
      "Users don't trust what they don't understand. We designed visual trust signals: a green checkmark with 'Verified by [Institution]', timestamps in human-readable format, and a simple audit trail showing who approved what, when. No cryptographic hashes visible to end users.",
      "## The Result",
      "3 blockchain-powered government services shipped. All with 80%+ task completion rates in usability testing with non-technical staff. Blockchain was the technology — trust was the product.",
    ],
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = POSTS[resolvedParams.slug];

  if (!post) {
    return (
      <div className="min-h-screen bg-page flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-ink mb-4">Post Not Found</h1>
          <Link href="/blog" className="btn-primary">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page">
      {/* Hero */}
      <div
        className="w-full h-80 flex items-end relative overflow-hidden"
        style={{ background: post.gradient }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-[860px] px-6 pb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="text-[11px] bg-white/20 text-white/80 px-3 py-1 rounded-pill font-semibold tracking-wider uppercase backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-display text-[36px] font-extrabold text-white tracking-tight leading-tight max-w-2xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-4 mt-4 text-white/50 text-sm">
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.readTime}</span>
            <span>·</span>
            <span>{post.category}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto w-full max-w-[860px] px-6 py-12">
        <div className="card p-10">
          <p className="text-ink-2 text-[15px] leading-relaxed mb-8 italic border-l-4 border-accent pl-5">
            {post.excerpt}
          </p>

          <div className="space-y-6">
            {post.content.map((block, i) => {
              if (block.startsWith("## ")) {
                return (
                  <h2 key={i} className="font-display text-[22px] font-bold text-ink tracking-tight mt-8 mb-3">
                    {block.replace("## ", "")}
                  </h2>
                );
              }
              // Render inline bold (**text**)
              const rendered = block.split(/(\*\*[^*]+\*\*)/).map((part, j) => {
                if (part.startsWith("**") && part.endsWith("**")) {
                  return <strong key={j} className="font-semibold text-ink">{part.slice(2, -2)}</strong>;
                }
                return part;
              });
              return (
                <p key={i} className="text-ink-2 leading-relaxed text-[15px]">
                  {rendered}
                </p>
              );
            })}
          </div>

          {/* Author */}
          <div className="mt-12 pt-8 border-t border-[var(--border)] flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden relative shrink-0">
              <img
                src="/images/profile-pic.png"
                alt="Putri Wulandari"
                className="object-cover w-full h-full absolute inset-0 z-10 bg-card"
              />
              <div className="w-full h-full absolute inset-0 z-0 flex items-center justify-center bg-gradient-to-br from-accent to-violet text-white text-sm font-bold font-display">
                PW
              </div>
            </div>
            <div>
              <p className="font-display font-bold text-ink text-[15px]">Putri Wulandari</p>
              <p className="text-ink-3 text-[12px]">AI Product Manager · Service Designer · UX Lead at INA DIGITAL</p>
            </div>
            <a
              href="https://www.linkedin.com/in/putriwulandari-ptrwuln/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto btn-ghost text-[12px] py-2 px-4 shrink-0"
            >
              Follow ↗
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6 gap-4">
          <Link href="/blog" className="btn-ghost">← All Articles</Link>
          <a
            href="https://www.linkedin.com/in/putriwulandari-ptrwuln/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Discuss on LinkedIn ↗
          </a>
        </div>
      </div>
    </div>
  );
}
