type MetricItem = {
  label: string;
  value: string;
  sub?: string;
  variant: "blue" | "dark" | "light" | "violet";
  href?: string;
};

type BentoMetricsProps = {
  metrics: MetricItem[];
};

const variantStyles: Record<MetricItem["variant"], string> = {
  blue: "bg-[#3d5af1] text-white",
  dark: "bg-[#0d0f1a] text-white",
  violet: "bg-gradient-to-br from-violet to-[#b47aff] text-white",
  light: "bg-card text-ink",
};

export default function BentoMetrics({ metrics }: BentoMetricsProps) {
  return (
    <div className="bento bento-metrics">
      {metrics.slice(0, 4).map((m, i) => (
        m.variant === "blue"
          ? (
        <div
          key={`${m.label}-${i}`}
          className={`rounded-card p-6 shadow-card relative overflow-hidden flex flex-col justify-between cursor-pointer transition-transform duration-200 hover:-translate-y-1 ${variantStyles[m.variant]}`}
        >
          <p
            className={`label uppercase tracking-wider ${
              m.variant === "blue"
                ? "text-white/75"
                : m.variant === "light"
                  ? "text-ink-3"
                  : "text-white/60"
            }`}
          >
            {m.label}
          </p>

          <div>
            <div className="font-display text-[48px] font-extrabold tracking-tighter leading-none">
              {m.value}
            </div>
            {m.sub && (
              <p className={`text-[11px] mt-1 ${m.variant === "light" ? "text-ink-3" : "text-white/50"}`}>
                {m.sub}
              </p>
            )}
          </div>

          <div
            className={`absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              m.variant === "blue"
                ? "bg-white/20 text-white ring-1 ring-white/25"
                : m.variant === "light"
                  ? "bg-accent-soft text-accent"
                  : "bg-white/15 text-white"
            }`}
          >
            ↗
          </div>
        </div>
            )
          : (
        <div
          key={`${m.label}-${i}`}
          className={`rounded-card p-6 shadow-card relative overflow-hidden flex flex-col justify-between cursor-pointer transition-transform duration-200 hover:-translate-y-1 ${variantStyles[m.variant]}`}
        >
          <p className={`label uppercase tracking-wider ${m.variant === "light" ? "text-ink-3" : "text-white/60"}`}>
            {m.label}
          </p>

          <div>
            <div className="font-display text-[48px] font-extrabold tracking-tighter leading-none">
              {m.value}
            </div>
            {m.sub && (
              <p className={`text-[11px] mt-1 ${m.variant === "light" ? "text-ink-3" : "text-white/50"}`}>
                {m.sub}
              </p>
            )}
          </div>

          <div
            className={`absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              m.variant === "light" ? "bg-accent-soft text-accent" : "bg-white/15 text-white"
            }`}
          >
            ↗
          </div>
        </div>
            )
      ))}
    </div>
  );
}

export const defaultMetrics: MetricItem[] = [
  {
    label: "Avg Conversion Lift",
    value: "+38%",
    sub: "across checkout projects",
    variant: "blue",
  },
  {
    label: "Retention Impact",
    value: "+61%",
    sub: "D7 retention - Fintech onboarding",
    variant: "light",
  },
  {
    label: "Users Impacted",
    value: "50k+",
    sub: "monthly active users",
    variant: "dark",
  },
  {
    label: "Components Built",
    value: "200+",
    sub: "design system tokens",
    variant: "violet",
  },
];
