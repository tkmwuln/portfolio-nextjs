import Image from "next/image";
import Link from "next/link";

type Metric = {
  metricLabel: string;
  metricValue: string;
  metricUnit?: string | null;
};

type ProjectCardProps = {
  title: string;
  slug: string;
  summary?: string | null;
  coverImageUrl?: string | null;
  category?: { name: string; color?: string | null } | null;
  clientName?: string | null;
  projectYear?: number | null;
  durationWeeks?: number | null;
  metrics?: Metric[];
  gradient?: string;
  index?: number;
};

const FALLBACK_GRADIENTS = [
  "linear-gradient(135deg, #c8d4f8 0%, #b8c5f5 100%)",
  "linear-gradient(135deg, #ddc8f5 0%, #c8b8f0 100%)",
  "linear-gradient(135deg, #b8f0d8 0%, #a8e8cc 100%)",
  "linear-gradient(135deg, #f5c8d4 0%, #f0b8c5 100%)",
];

export default function ProjectCard({
  title,
  slug,
  coverImageUrl,
  category,
  clientName,
  projectYear,
  metrics = [],
  gradient,
  index = 0,
}: ProjectCardProps) {
  const bg = gradient ?? FALLBACK_GRADIENTS[index % FALLBACK_GRADIENTS.length];

  return (
    <Link
      href={`/portfolio/${slug}`}
      className="group flex flex-col no-underline rounded-card overflow-hidden shadow-card bg-surface hover:bg-surface-2 transition-colors duration-200"
    >
      {/* ── Thumbnail ── */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1 / 1" }}>
        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
          {coverImageUrl ? (
            <Image src={coverImageUrl} alt={title} fill className="object-cover" />
          ) : (
            <>
              <img
                src="/images/project-thumbnail-default.png"
                alt=""
                className="object-cover w-full h-full"
              />
              <div
                className="absolute inset-0 mix-blend-multiply opacity-60"
                style={{ background: bg }}
              />
            </>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col gap-1 p-4">
        {category && (
          <p className="text-[10px] uppercase tracking-[.08em] font-semibold text-ink-3">
            {category.name}
          </p>
        )}
        <h3 className="font-display text-[15px] font-bold text-ink leading-snug tracking-tight">
          {title}
        </h3>

        {/* Metadata row */}
        <div className="flex items-center gap-2 mt-0.5">
          {projectYear && (
            <span className="text-[11px] text-ink-3">{projectYear}</span>
          )}
          {clientName && (
            <span className="text-[11px] text-ink-3">{clientName}</span>
          )}
          {metrics[0] && (
            <span className="text-[11px] text-ink-3">
              {metrics[0].metricValue}
              {metrics[0].metricUnit} {metrics[0].metricLabel}
            </span>
          )}
        </div>

        {/* CTA link */}
        <span className="text-[11px] text-ink-2 font-medium mt-1 flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
          View project
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          >
            <path
              d="M2.5 6h7m-3-3 3 3-3 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
