"use client";

import { useCallback, useEffect, useState } from "react";
import { chatService } from "@/services/chat.service";
import type { Conversation, Paginated } from "@/types";

export function useConversations() {
  const [data, setData] = useState<Paginated<Conversation> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadConversations = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await chatService.getConversations({ limit: 20 });
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load conversations",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadConversations();
  }, [loadConversations]);

  return { data, loading, error, refresh: loadConversations };
}
