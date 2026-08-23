"use client";

import { PostComposer } from "./PostComposer";
import { PostCard } from "./PostCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { usePosts } from "@/hooks/usePosts";

export function Feed() {
  const { data, loading, error, loadMore, refresh } = usePosts({ limit: 10 });

  return (
    <div className="space-y-4">
      <PostComposer onPosted={refresh} />

      {loading && !data ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-6 text-center text-red-700">
          {error}
        </div>
      ) : !data || data.items.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-10 text-center text-gray-600">
          No posts yet. Be the first to share something!
        </div>
      ) : (
        <>
          {data.items.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}

          {data.hasMore && (
            <div className="flex justify-center">
              <button
                onClick={loadMore}
                className="rounded-full border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
