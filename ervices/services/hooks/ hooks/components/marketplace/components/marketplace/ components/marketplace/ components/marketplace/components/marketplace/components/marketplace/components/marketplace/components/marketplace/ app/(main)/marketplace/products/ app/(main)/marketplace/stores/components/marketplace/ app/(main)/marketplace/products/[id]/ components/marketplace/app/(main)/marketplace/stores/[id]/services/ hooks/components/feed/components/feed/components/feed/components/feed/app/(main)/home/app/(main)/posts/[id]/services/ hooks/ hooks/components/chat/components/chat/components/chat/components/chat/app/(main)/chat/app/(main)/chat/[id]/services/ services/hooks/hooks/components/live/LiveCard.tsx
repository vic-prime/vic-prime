import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { formatNumber, timeAgo } from "@/lib/utils";
import type { LiveStream } from "@/types";

export function LiveCard({ stream }: { stream: LiveStream }) {
  const isLive = stream.status === "live";

  return (
    <Link href={`/live/${stream.id}`}>
      <Card className="group overflow-hidden p-0 transition-shadow hover:shadow-md">
        <div className="relative aspect-video w-full overflow-hidden bg-gray-900">
          {stream.cover_url ? (
            <img
              src={stream.cover_url}
              alt={stream.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
              <span className="text-4xl">📺</span>
            </div>
          )}

          {isLive && (
            <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
              <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
              LIVE
            </span>
          )}

          <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2 py-1 text-xs text-white">
            👁 {formatNumber(stream.viewer_count)}
          </span>
        </div>

        <div className="p-4">
          <h3 className="line-clamp-1 font-semibold text-gray-900">
            {stream.title}
          </h3>
          {stream.description && (
            <p className="mt-1 line-clamp-2 text-sm text-gray-600">
              {stream.description}
            </p>
          )}
          <p className="mt-2 text-xs text-gray-500">
            {isLive
              ? "Streaming now"
              : stream.status === "scheduled"
                ? "Scheduled"
                : `Ended ${timeAgo(stream.ended_at || stream.created_at)}`}
          </p>
        </div>
      </Card>
    </Link>
  );
}
