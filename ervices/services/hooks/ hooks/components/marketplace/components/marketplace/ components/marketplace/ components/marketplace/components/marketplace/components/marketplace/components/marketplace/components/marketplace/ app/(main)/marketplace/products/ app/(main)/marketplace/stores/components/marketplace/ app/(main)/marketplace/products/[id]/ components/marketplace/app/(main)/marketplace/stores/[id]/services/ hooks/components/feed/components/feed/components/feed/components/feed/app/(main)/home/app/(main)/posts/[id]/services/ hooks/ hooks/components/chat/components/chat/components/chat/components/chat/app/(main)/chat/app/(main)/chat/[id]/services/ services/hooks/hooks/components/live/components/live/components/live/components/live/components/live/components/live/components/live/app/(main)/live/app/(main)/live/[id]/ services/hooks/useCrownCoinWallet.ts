"use client";

import { useCallback, useEffect, useState } from "react";
import { crownCoinsService } from "@/services/crown-coins.service";
import type { CrownCoinWallet } from "@/types";

export function useCrownCoinWallet() {
  const [wallet, setWallet] = useState<CrownCoinWallet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBalance = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await crownCoinsService.getBalance();
      setWallet(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load Crown Coin balance",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadBalance();
  }, [loadBalance]);

  return { wallet, loading, error, refresh: loadBalance };
}
