"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { chatService } from "@/services/chat.service";
import type { Message, Paginated } from "@/types";

export function useMessages(conversationId: string) {
  const [data, setData] = useState<Paginated<Message> | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesRef = useRef<Message[]>([]);

  const loadMessages = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await chatService.getMessages(conversationId, {
        limit: 50,
      });
      messagesRef.current = result.items;
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load messages");
    } finally {
      setLoading(false);
    }
  }, [conversationId]);

  useEffect(() => {
    void loadMessages();
  }, [loadMessages]);

  const sendMessage = useCallback(
    async (content: string, options?: { productRef?: string; storeRef?: string }) => {
      setSending(true);
      setError(null);

      try {
        const message = await chatService.sendMessage(conversationId, {
          content,
          productRef: options?.productRef,
          storeRef: options?.storeRef,
        });

        messagesRef.current = [...messagesRef.current, message];
        setData((prev) =>
          prev
            ? {
                ...prev,
                items: [...prev.items, message],
                total: prev.total + 1,
              }
            : prev,
        );

        return message;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to send message");
        throw err;
      } finally {
        setSending(false);
      }
    },
    [conversationId],
  );

  const markAsRead = useCallback(async () => {
    try {
      await chatService.markAsRead(conversationId);
    } catch {
      // Silent failure for read receipt
    }
  }, [conversationId]);

  return {
    messages: data?.items || [],
    loading,
    sending,
    error,
    sendMessage,
    markAsRead,
    refresh: loadMessages,
  };
}
