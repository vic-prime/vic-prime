"use client";

import { useCallback, useEffect, useState } from "react";
import { promotionsService } from "@/services/promotions.service";
import type { Paginated, Promotion } from "@/types";

export function usePromotions(params?: { page?: number; limit?: number }) {
  const [data, setData] = useState<Paginated<Promotion> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPromotions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await promotionsService.list(params);
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load promotions",
      );
    } finally {
      setLoading(false);
    }
  }, [params?.page, params?.limit]);

  useEffect(() => {
    void loadPromotions();
  }, [loadPromotions]);

  return { data, loading, error, refresh: loadPromotions };
}
