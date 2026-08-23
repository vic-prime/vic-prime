"use client";

import { useCallback, useEffect, useState } from "react";
import { postsService, type PostListParams } from "@/services/posts.service";
import type { Paginated, Post } from "@/types";

export function usePosts(params: PostListParams = {}) {
  const [data, setData] = useState<Paginated<Post> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(params.page || 1);

  const loadPosts = useCallback(async (pageNum: number) => {
    setLoading(true);
    setError(null);

    try {
      const result = await postsService.list({
        ...params,
        page: pageNum,
      });
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load feed");
    } finally {
      setLoading(false);
    }
  }, [params.userId, params.storeId, params.limit]);

  useEffect(() => {
    void loadPosts(page);
  }, [loadPosts, page]);

  const refresh = useCallback(() => {
    void loadPosts(page);
  }, [loadPosts, page]);

  const loadMore = useCallback(() => {
    if (data?.hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [data?.hasMore]);

  return { data, loading, error, page, setPage, refresh, loadMore };
}
