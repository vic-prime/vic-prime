"use client";

import { useCallback, useEffect, useState } from "react";
import { liveService, type LiveListParams } from "@/services/live.service";
import type { LiveStream, Paginated } from "@/types";

export function useLiveStreams(params: LiveListParams = {}) {
  const [data, setData] = useState<Paginated<LiveStream> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStreams = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await liveService.list(params);
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load live streams",
      );
    } finally {
      setLoading(false);
    }
  }, [params.page, params.limit, params.status, params.userId]);

  useEffect(() => {
    void loadStreams();
  }, [loadStreams]);

  return { data, loading, error, refresh: loadStreams };
}
