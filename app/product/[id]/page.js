import { Suspense } from "react";
import ProductDetailClient from "./ProductDetailClient";
import { products } from "@/data/products";

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  const productId = resolvedParams?.id || "prod-001";

  return (
    <Suspense
      fallback={
        <div className="mx-auto w-full max-w-[1280px] p-8 text-center text-muted">
          Loading uniform details...
        </div>
      }
    >
      <ProductDetailClient productId={productId} />
    </Suspense>
  );
}
