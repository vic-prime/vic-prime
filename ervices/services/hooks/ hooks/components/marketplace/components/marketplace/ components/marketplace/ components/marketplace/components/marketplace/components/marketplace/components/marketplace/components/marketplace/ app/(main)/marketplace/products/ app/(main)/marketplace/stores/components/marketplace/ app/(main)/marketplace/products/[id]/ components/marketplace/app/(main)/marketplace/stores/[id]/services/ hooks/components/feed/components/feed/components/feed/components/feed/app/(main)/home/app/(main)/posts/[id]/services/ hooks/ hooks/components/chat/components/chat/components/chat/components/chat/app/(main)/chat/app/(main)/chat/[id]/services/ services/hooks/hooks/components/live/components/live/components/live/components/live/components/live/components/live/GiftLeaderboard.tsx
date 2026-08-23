"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { giftsService, type GiftLeaderboardEntry } from "@/services/gifts.service";
import { formatNumber } from "@/lib/utils";

export function GiftLeaderboard({ liveId }: { liveId: string }) {
  const [entries, setEntries] = useState<GiftLeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    giftsService
      .getLeaderboard(liveId)
      .then((data) => {
        if (!cancelled) {
          setEntries(data);
        }
      })
      .catch(() => {
        // Handle error silently
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [liveId]);

  if (loading) {
    return <p className="text-center text-sm text-gray-500">Loading...</p>;
  }

  if (entries.length === 0) {
    return (
      <p className="text-center text-sm text-gray-500">
        No gifts yet. Be the first to gift!
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-900">Top Gifters</h3>
      {entries.map((entry, idx) => (
        <div
          key={entry.user_id}
          className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3"
        >
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
              idx === 0
                ? "bg-yellow-100 text-yellow-700"
                : idx === 1
                  ? "bg-gray-200 text-gray-700"
                  : idx === 2
                    ? "bg-orange-100 text-orange-700"
                    : "bg-gray-100 text-gray-600"
            }`}
          >
            {idx + 1}
          </span>
          <img
            src="/default-avatar.svg"
            alt={entry.username}
            className="h-9 w-9 rounded-full"
          />
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">
              {entry.username || `User ${entry.user_id.slice(0, 8)}`}
            </p>
          </div>
          <span className="text-sm font-bold text-brand-600">
            {formatNumber(entry.total_crown_coins)} 🪙
          </span>
        </div>
      ))}
    </div>
  );
}
