"use client";

import { useState } from "react";
import { useStores } from "@/hooks/useStores";
import { StoreCard } from "./StoreCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";

export function StoreList({
  category,
  search,
  page,
}: {
  category?: string;
  search?: string;
  page: number;
}) {
  const [currentPage, setCurrentPage] = useState(page);
  const { data, loading, error } = useStores({
    category: category || undefined,
    search: search || undefined,
    page: currentPage,
    limit: 12,
  });

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-6 text-center text-red-700">
        {error}
      </div>
    );
  }

  if (!data || data.items.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white px-4 py-10 text-center text-gray-600">
        No stores found.
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.items.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>

      {data.total > 0 && (
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button
            variant="outline"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {Math.ceil(data.total / 12)}
          </span>
          <Button
            variant="outline"
            disabled={currentPage >= Math.ceil(data.total / 12)}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
