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
  "linear-gradient(135deg, #c8d4f8 0%, #b8c5f5 100%)", // PM – periwinkle blue
  "linear-gradient(135deg, #ddc8f5 0%, #c8b8f0 100%)", // UX – soft violet
  "linear-gradient(135deg, #b8f0d8 0%, #a8e8cc 100%)", // DS – mint green
  "linear-gradient(135deg, #f5c8d4 0%, #f0b8c5 100%)", // warm pink
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
      className="group relative rounded-card overflow-hidden shadow-card block no-underline"
      style={{ height: "220px" }}
    >
      <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
        {coverImageUrl ? (
          <Image src={coverImageUrl} alt={title} fill className="object-cover" />
        ) : (
          <>
            {/* Soft purple thumbnail base */}
            <img src="/images/project-thumbnail-default.png" alt="" className="object-cover w-full h-full" />
            {/* Colored gradient overlay for variety */}
            <div className="absolute inset-0 mix-blend-multiply opacity-60" style={{ background: bg }} />
          </>
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

      <div className="absolute top-3.5 left-4 text-[11px] text-white/50 bg-black/20 backdrop-blur-sm rounded-pill px-2.5 py-1">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5">
        {category && (
          <p className="text-[10px] uppercase tracking-[.08em] font-semibold text-white/60 mb-1">
            {category.name}
          </p>
        )}
        <h3 className="font-display text-[17px] font-bold text-white leading-tight tracking-tight">
          {title}
        </h3>
        {metrics[0] && (
          <p className="text-[11px] text-white/50 mt-1">
            {metrics[0].metricValue}
            {metrics[0].metricUnit} {metrics[0].metricLabel}
            {clientName && ` · ${clientName}`}
            {projectYear && ` ${projectYear}`}
          </p>
        )}
      </div>
    </Link>
  );
}
