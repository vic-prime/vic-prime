"use client";

import { useEffect, useState } from "react";
import { storesService, type StoreListParams } from "@/services/stores.service";
import type { Paginated, Store } from "@/types";

export function useStores(params: StoreListParams = {}) {
  const [data, setData] = useState<Paginated<Store> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    storesService
      .list(params)
      .then((result) => {
        if (!cancelled) {
          setData(result);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load stores");
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
    params.country,
  ]);

  return { data, loading, error };
}
