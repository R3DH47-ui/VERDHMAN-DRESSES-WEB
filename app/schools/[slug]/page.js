import { Suspense } from "react";
import SchoolUniformClient from "./SchoolUniformClient";
import { schools } from "@/data/schools";

export function generateStaticParams() {
  return schools.map((school) => ({
    slug: school.slug,
  }));
}

async function SchoolUniformContent({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || "greenfield-public";
  return <SchoolUniformClient slug={slug} />;
}

export default function SchoolUniformPage({ params }) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto w-full max-w-7xl p-8 text-center text-muted">
          Loading school catalog...
        </div>
      }
    >
      <SchoolUniformContent params={params} />
    </Suspense>
  );
}
