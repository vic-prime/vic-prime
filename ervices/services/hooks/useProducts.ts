"use client";

import { useEffect, useState } from "react";
import {
  productsService,
  type ProductListParams,
} from "@/services/products.service";
import type { Paginated, Product } from "@/types";

export function useProducts(params: ProductListParams = {}) {
  const [data, setData] = useState<Paginated<Product> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    productsService
      .list(params)
      .then((result) => {
        if (!cancelled) {
          setData(result);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load products",
          );
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [
    params.page,
    params.limit,
    params.category,
    params.search,
    params.storeId,
    params.minPrice,
    params.maxPrice,
    params.sortBy,
  ]);

  return { data, loading, error };
}
