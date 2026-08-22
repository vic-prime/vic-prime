```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { CATEGORIES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Marketplace",
};

export default function MarketplacePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
        <p className="mt-2 text-gray-600">
          Discover products, services, and stores from across the VicPrime
          community.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {CATEGORIES.map((category) => (
          <Link key={category.id} href={`/marketplace?category=${category.id}`}>
            <Card className="flex h-full flex-col items-center justify-center text-center transition-colors hover:border-brand-200 hover:shadow-md">
              <span className="text-3xl">{category.icon}</span>
              <span className="mt-3 text-sm font-semibold text-gray-900">
                {category.label}
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
```
