import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { productsService } from "@/services/products.service";
import { ProductDetail } from "@/components/marketplace/ProductDetail";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const product = await productsService.get(params.id);
    return {
      title: product.name,
      description: product.description,
    };
  } catch {
    return {
      title: "Product",
    };
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const product = await productsService.get(params.id);
    return <ProductDetail product={product} />;
  } catch {
    notFound();
  }
}
