"use client";

import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";

export function StoreCategoryFilter({ currentCategory }: { currentCategory?: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/marketplace/stores"
        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          !currentCategory
            ? "bg-brand-600 text-white"
            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
        }`}
      >
        All
      </Link>
      {CATEGORIES.map((cat) => (
        <Link
          key={cat.id}
          href={`/marketplace/stores?category=${cat.id}`}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            currentCategory === cat.id
              ? "bg-brand-600 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          {cat.icon} {cat.label}
        </Link>
      ))}
    </div>
  );
}
