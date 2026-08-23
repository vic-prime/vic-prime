"use client";

import { useCallback, useEffect, useState } from "react";
import { vicCoinsService } from "@/services/vic-coins.service";
import type { VicCoinWallet } from "@/types";

export function useVicCoinWallet() {
  const [wallet, setWallet] = useState<VicCoinWallet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBalance = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await vicCoinsService.getBalance();
      setWallet(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load Vic-Coin balance",
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
