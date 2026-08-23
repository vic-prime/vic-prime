"use client";

import { useCallback, useEffect, useState } from "react";
import { notificationsService } from "@/services/notifications.service";
import type { Notification, Paginated } from "@/types";

export function useNotifications(params?: {
  page?: number;
  limit?: number;
  unreadOnly?: boolean;
}) {
  const [data, setData] = useState<Paginated<Notification> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await notificationsService.list(params);
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load notifications",
      );
    } finally {
      setLoading(false);
    }
  }, [params?.page, params?.limit, params?.unreadOnly]);

  useEffect(() => {
    void loadNotifications();
  }, [loadNotifications]);

  return { data, loading, error, refresh: loadNotifications };
}
