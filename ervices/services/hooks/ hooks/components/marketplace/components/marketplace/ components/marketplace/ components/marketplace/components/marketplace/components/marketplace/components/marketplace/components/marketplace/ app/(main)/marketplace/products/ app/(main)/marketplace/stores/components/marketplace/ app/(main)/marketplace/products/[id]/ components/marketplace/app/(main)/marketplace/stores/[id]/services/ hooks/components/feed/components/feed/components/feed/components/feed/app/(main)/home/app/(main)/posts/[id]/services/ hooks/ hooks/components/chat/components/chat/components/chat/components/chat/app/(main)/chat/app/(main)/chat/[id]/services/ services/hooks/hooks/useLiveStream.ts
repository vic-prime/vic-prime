"use client";

import { useCallback, useEffect, useState } from "react";
import { liveService } from "@/services/live.service";
import type { LiveComment, LiveStream } from "@/types";

export function useLiveStream(liveId: string) {
  const [stream, setStream] = useState<LiveStream | null>(null);
  const [comments, setComments] = useState<LiveComment[]>([]);
  const [viewerCount, setViewerCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStream = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [streamData, commentsData, viewersData] = await Promise.all([
        liveService.get(liveId),
        liveService.getComments(liveId, { limit: 50 }),
        liveService.getViewers(liveId),
      ]);

      setStream(streamData);
      setComments(commentsData.items);
      setViewerCount(viewersData.count);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load live stream",
      );
    } finally {
      setLoading(false);
    }
  }, [liveId]);

  useEffect(() => {
    void loadStream();
  }, [loadStream]);

  const sendComment = useCallback(
    async (content: string) => {
      try {
        const comment = await liveService.sendComment(liveId, content);
        setComments((prev) => [...prev, comment]);
        return comment;
      } catch (err) {
        throw err;
      }
    },
    [liveId],
  );

  return {
    stream,
    comments,
    viewerCount,
    loading,
    error,
    sendComment,
    refresh: loadStream,
  };
}
