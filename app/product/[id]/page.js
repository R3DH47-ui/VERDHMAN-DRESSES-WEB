import { Suspense } from "react";
import ProductDetailClient from "./ProductDetailClient";
import { products } from "@/data/products";

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

async function ProductDetailContent({ params }) {
  const resolvedParams = await params;
  const productId = resolvedParams?.id || "prod-001";
  return <ProductDetailClient productId={productId} />;
}

export default function ProductDetailPage({ params }) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto w-full max-w-7xl p-8 text-center text-muted">
          Loading uniform details...
        </div>
      }
    >
      <ProductDetailContent params={params} />
    </Suspense>
  );
}
