"use client";

import { LiveCard } from "./LiveCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { useLiveStreams } from "@/hooks/useLiveStreams";

export function LiveGrid() {
  const { data, loading, error } = useLiveStreams({
    status: "live",
    limit: 12,
  });

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="aspect-video w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-6 text-center text-red-700">
        {error}
      </div>
    );
  }

  if (!data || data.items.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white px-4 py-10 text-center text-gray-600">
        No live streams right now. Be the first to go live!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.items.map((stream) => (
        <LiveCard key={stream.id} stream={stream} />
      ))}
    </div>
  );
}
