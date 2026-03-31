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
  "linear-gradient(140deg, #2c3e50 0%, #3498db 100%)",
  "linear-gradient(140deg, #0f2027 0%, #2c5364 100%)",
  "linear-gradient(140deg, #4b1248 0%, #f0c27b 100%)",
  "linear-gradient(140deg, #373b44 0%, #4286f4 100%)",
  "linear-gradient(140deg, #1a1c2c 0%, #4a192c 100%)",
  "linear-gradient(140deg, #141e30 0%, #243b55 100%)",
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
      className="group flex flex-col no-underline bg-transparent focus-visible:outline-none"
      style={{ touchAction: "manipulation" }}
    >
      {/* ── Square Thumbnail ── */}
      <div
        className="relative w-full rounded-[16px] overflow-hidden"
        style={{ aspectRatio: "1 / 1" }}
      >
        <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.04]">
          {coverImageUrl ? (
            <Image
              src={coverImageUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 80vw, 290px"
            />
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
      <div className="flex flex-col gap-1.5 pt-3.5 px-0.5">
        {/* Title */}
        <p className="font-display text-[15px] font-semibold text-ink leading-snug tracking-tight group-hover:text-ink transition-colors duration-200 line-clamp-2">
          {title}
        </p>

        {/* Metadata row */}
        <div className="flex items-center gap-2 flex-wrap">
          {projectYear && (
            <span className="text-[12px] text-ink-3">{projectYear}</span>
          )}
          {clientName && projectYear && (
            <span className="text-[12px] text-ink-3 opacity-40">·</span>
          )}
          {category && (
            <span className="text-[12px] text-ink-3">{category.name}</span>
          )}
          {metrics[0] && (
            <>
              <span className="text-[12px] text-ink-3 opacity-40">·</span>
              <span className="text-[12px] text-ink-3 font-semibold">
                {metrics[0].metricValue}
              </span>
            </>
          )}
        </div>

        {/* CTA */}
        <span className="text-[12px] text-ink-2 font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-200 mt-0.5">
          View project
          <svg
            width="13"
            height="13"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
            className="text-ink-3 transition-transform duration-200 group-hover:translate-x-0.5"
          >
            <path
              d="M2.5 6h7m-3-3 3 3-3 3"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
