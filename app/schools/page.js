"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowUpRight, PhoneCall, HelpCircle, GraduationCap } from "lucide-react";
import Tabs from "@/components/ui/Tabs";
import SearchBar from "@/components/ui/SearchBar";
import Badge from "@/components/ui/Badge";
import { schools } from "@/data/schools";
import { cn } from "@/lib/cn";

export default function SchoolsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);

  // Compute dynamic tab counts
  const dynamicSchoolTabs = useMemo(() => {
    const conventCount = schools.filter((s) => s.type === "convent").length;
    const publicCount = schools.filter((s) => s.type === "public").length;
    const intlCount = schools.filter((s) => s.type === "international").length;

    return [
      { id: "all", label: "ALL SCHOOLS (84+)" },
      { id: "convent", label: `CONVENT SCHOOLS (${conventCount})` },
      { id: "public", label: `PUBLIC SCHOOLS (${publicCount})` },
      { id: "international", label: `INTERNATIONAL (${intlCount})` },
    ];
  }, []);

  const filteredSchools = useMemo(() => {
    return schools.filter((school) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        school.name.toLowerCase().includes(query) ||
        school.location.toLowerCase().includes(query) ||
        school.board.toLowerCase().includes(query) ||
        school.monogram.toLowerCase().includes(query);

      let matchesTab = true;
      if (activeTab === "convent") {
        matchesTab = school.type === "convent";
      } else if (activeTab === "public") {
        matchesTab = school.type === "public";
      } else if (activeTab === "international") {
        matchesTab = school.type === "international";
      }

      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab]);

  const displayedSchools = filteredSchools.slice(0, visibleCount);

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-10 py-6 md:py-10 space-y-8 bg-paper text-ink">
      {/* Centered Serif Title & Subtitle */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="type-eyebrow text-brand">Institutional Network</span>
        <h1 className="text-2xl md:text-4xl font-bold text-ink tracking-tight">
          Authorized Schools Directory
        </h1>
        <p className="text-xs md:text-sm text-muted">
          Browse verified uniform regulations, standard crests, and tailoring charts for partner institutions.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery("")}
          placeholder="Search institution by name, branch or sector..."
        />
      </div>

      {/* Dynamic School Type Tabs */}
      <div className="flex justify-center overflow-x-auto no-scrollbar">
        <Tabs
          tabs={dynamicSchoolTabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </div>

      {/* School Cards Grid (3 columns desktop, 2 tablet, 1 mobile) */}
      {displayedSchools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-stretch">
          {displayedSchools.map((school) => (
            <div
              key={school.id}
              className="group bg-surface border border-line rounded-card p-4 md:p-5 flex flex-col justify-between hover:shadow-card hover:border-line-strong transition duration-200 h-full"
            >
              <div>
                {/* Header: Unique Monogram / Crest Badge + Board Badge */}
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-[10px] border flex items-center justify-center shrink-0 shadow-2xs font-bold text-base",
                      school.monogramBg || "bg-tile text-ink border-line"
                    )}
                  >
                    {school.monogram}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="mb-1">
                      <Badge variant={school.boardColor || "brand"} size="sm">
                        {school.board}
                      </Badge>
                    </div>

                    {/* Clamped Name to 2 lines with reserved minimum height for grid symmetry */}
                    <h2
                      className="text-base md:text-lg font-bold text-ink leading-snug group-hover:text-brand transition line-clamp-2 min-h-[2.8rem]"
                      title={school.name}
                    >
                      {school.name}
                    </h2>
                    <p className="text-xs text-muted truncate mt-0.5">
                      {school.location}
                    </p>
                  </div>
                </div>

                {/* Class Range */}
                <div className="mt-4 pt-3 border-t border-line flex items-center justify-between text-xs text-muted">
                  <span>{school.classes}</span>
                </div>

                {/* Uniform Colors swatch row */}
                <div className="mt-2.5 flex items-center gap-2 text-xs text-ink font-medium">
                  <span className="text-muted text-[11px]">Uniform:</span>
                  <div className="flex items-center gap-1.5">
                    {school.uniformColors?.map((color, idx) => (
                      <span
                        key={idx}
                        className="w-3.5 h-3.5 rounded-full border border-line-strong inline-block shrink-0 shadow-2xs"
                        style={{ backgroundColor: color }}
                        title={school.uniformColorNames?.[idx] || color}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-muted truncate">
                    ({school.uniformColorNames?.join(", ")})
                  </span>
                </div>
              </div>

              {/* Full-width VIEW UNIFORM LIST button pinned to the bottom */}
              <div className="mt-5 pt-3 border-t border-line">
                <Link
                  href={`/schools/${school.slug}`}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-btn border border-ink text-ink text-xs font-bold uppercase tracking-wider hover:bg-tile transition duration-150 active:scale-[0.98]"
                >
                  View uniform list
                  <ArrowUpRight size={14} strokeWidth={2} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-surface border border-line rounded-card p-8 shadow-soft">
          <GraduationCap size={44} className="mx-auto text-muted mb-2" />
          <h2 className="text-lg font-bold text-ink">No institutions found</h2>
          <p className="text-xs text-muted mt-1 max-w-sm mx-auto">
            We could not find any school matching &quot;{searchQuery}&quot;. You can request addition below.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setActiveTab("all");
            }}
            className="mt-4 px-4 py-2 rounded-btn bg-ink text-white text-xs font-bold uppercase tracking-wider hover:bg-brand transition"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Load More Button if filtered list has more */}
      {filteredSchools.length > visibleCount && (
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="px-6 py-2.5 rounded-btn border border-ink text-ink font-bold text-xs uppercase tracking-wider hover:bg-tile transition"
          >
            Load More Schools
          </button>
        </div>
      )}

      {/* 2-Column High-Contrast Institutional Request Banner */}
      <div className="relative bg-[#111111] text-white rounded-card p-6 md:p-8 overflow-hidden shadow-card border border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {/* Left Column: Copy & Helpline */}
          <div className="lg:col-span-2 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-white/15 text-white text-[11px] font-bold tracking-wider uppercase border border-white/20">
              <HelpCircle size={14} className="text-brand" />
              Institutional Services
            </div>

            <h2 className="text-xl md:text-3xl font-bold text-white">
              Can’t Find Your Child’s School?
            </h2>

            <p className="text-xs md:text-sm text-white/80 leading-relaxed max-w-xl">
              Submit your school’s prescribed uniform selection prospectus. Our master tailors will verify board regulations, color dyes, and monogram embroidery standards.
            </p>

            <div className="pt-2 flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center shrink-0">
                <PhoneCall size={16} className="text-white" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-white/70 block leading-none">
                  School Desk Helpline
                </span>
                <a
                  href="tel:18002001979"
                  className="text-base font-bold text-white hover:text-brand-tint transition"
                >
                  1800-200-1979 (Toll-Free)
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: High-contrast Request Button */}
          <div className="lg:text-right flex lg:justify-end">
            <button
              type="button"
              onClick={() => alert("School addition request received. Our desk will contact you within 24 hours.")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-btn bg-brand text-white font-bold text-xs uppercase tracking-wider hover:bg-brand-dark transition duration-150 active:scale-[0.98] shadow-md"
            >
              REQUEST SCHOOL ADDITION
              <ArrowUpRight size={15} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Footnote */}
        <div className="mt-6 pt-4 border-t border-white/10 text-white/50 text-xs flex items-center justify-between">
          <span>Official supplier for 80+ institutions across North India</span>
          <span className="text-[11px]">Est. 1979</span>
        </div>
      </div>
    </div>
  );
}
