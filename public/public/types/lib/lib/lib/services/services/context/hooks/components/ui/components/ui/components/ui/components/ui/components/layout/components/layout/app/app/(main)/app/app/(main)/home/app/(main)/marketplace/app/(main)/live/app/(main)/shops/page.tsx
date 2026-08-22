```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shops",
};

export default function ShopsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 text-center">
      <h1 className="text-2xl font-bold text-gray-900">Shops</h1>
      <p className="mt-2 text-gray-600">
        Explore businesses and storefronts on VicPrime Market.
      </p>
    </div>
  );
}
```
