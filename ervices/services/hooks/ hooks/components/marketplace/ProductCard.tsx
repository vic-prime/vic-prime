import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  const imageUrl = product.images?.[0] || "/default-avatar.svg";

  return (
    <Link href={`/marketplace/products/${product.id}`}>
      <Card className="group overflow-hidden p-0 transition-shadow hover:shadow-md">
        <div className="aspect-square w-full overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-3">
          <h3 className="line-clamp-1 text-sm font-semibold text-gray-900">
            {product.name}
          </h3>
          <p className="mt-1 text-sm font-bold text-brand-600">
            {formatCurrency(product.price, product.currency)}
          </p>
          <p className="mt-1 text-xs text-gray-500">{product.category}</p>
        </div>
      </Card>
    </Link>
  );
}
