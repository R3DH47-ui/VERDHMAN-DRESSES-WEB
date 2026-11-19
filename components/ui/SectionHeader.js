import Link from "next/link";

export default function SectionHeader({ title, viewAllHref = "#", subtitle }) {
  return (
    <div className="flex items-end justify-between mb-4">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-ink tracking-tight">{title}</h2>
        {subtitle && (
          <p className="text-muted text-xs mt-0.5">{subtitle}</p>
        )}
      </div>
      <Link
        href={viewAllHref}
        className="text-brand text-xs font-bold uppercase tracking-wide hover:text-brand-dark transition duration-150 shrink-0"
      >
        VIEW ALL
      </Link>
    </div>
  );
}
