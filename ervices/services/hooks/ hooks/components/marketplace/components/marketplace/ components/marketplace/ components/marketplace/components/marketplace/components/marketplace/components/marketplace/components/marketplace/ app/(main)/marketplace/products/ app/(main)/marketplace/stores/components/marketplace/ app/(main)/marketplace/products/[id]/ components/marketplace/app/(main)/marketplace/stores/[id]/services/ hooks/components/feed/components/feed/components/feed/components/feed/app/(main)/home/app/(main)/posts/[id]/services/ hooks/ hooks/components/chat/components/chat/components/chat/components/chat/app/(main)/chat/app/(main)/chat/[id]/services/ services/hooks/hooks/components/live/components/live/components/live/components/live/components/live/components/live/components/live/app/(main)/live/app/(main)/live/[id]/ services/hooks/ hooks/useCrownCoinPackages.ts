"use client";

import { useCallback, useEffect, useState } from "react";
import { crownCoinsService } from "@/services/crown-coins.service";
import type { CrownCoinPackage } from "@/types";

export function useCrownCoinPackages() {
  const [packages, setPackages] = useState<CrownCoinPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPackages = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await crownCoinsService.getPackages();
      setPackages(data.filter((pkg) => pkg.status === "active"));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load Crown Coin packages",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPackages();
  }, [loadPackages]);

  return { packages, loading, error, refresh: loadPackages };
}
