"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useLiveStream } from "@/hooks/useLiveStream";
import { liveService } from "@/services/live.service";
import { formatNumber } from "@/lib/utils";
import { LiveComments } from "./LiveComments";
import { GiftPanel } from "./GiftPanel";
import { GiftLeaderboard } from "./GiftLeaderboard";

export function LivePlayer({ liveId }: { liveId: string }) {
  const { user } = useAuth();
  const { stream, viewerCount, loading, error, refresh } = useLiveStream(liveId);
  const [showGifts, setShowGifts] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing((prev) => !prev);
  };

  const handleEndStream = async () => {
    try {
      await liveService.end(liveId);
      await refresh();
    } catch {
      // Handle error
    }
  };

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
        <p className="text-gray-500">Loading live stream...</p>
      </div>
    );
  }

  if (error || !stream) {
    return (
      <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
        <p className="text-red-600">{error || "Stream not found"}</p>
      </div>
    );
  }

  const isCreator = stream.user_id === user?.id;
  const isLive = stream.status === "live";

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main video area */}
        <div className="lg:col-span-2">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-900">
            {stream.cover_url ? (
              <img
                src={stream.cover_url}
                alt={stream.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-6xl">📺</span>
              </div>
            )}

            {isLive && (
              <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-sm font-bold text-white">
                <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                LIVE
              </span>
            )}

            <span className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1 text-sm text-white">
              👁 {formatNumber(viewerCount)}
            </span>

            {isCreator && isLive && (
              <button
                onClick={handleEndStream}
                className="absolute bottom-4 right-4 rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                End Stream
              </button>
            )}
          </div>

          {/* Stream info */}
          <div className="mt-4">
            <h1 className="text-xl font-bold text-gray-900">{stream.title}</h1>
            {stream.description && (
              <p className="mt-1 text-gray-600">{stream.description}</p>
            )}

            <div className="mt-3 flex items-center gap-3">
              <img
                src="/default-avatar.svg"
                alt="Creator"
                className="h-10 w-10 rounded-full"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  User {stream.user_id.slice(0, 8)}
                </p>
                <p className="text-xs text-gray-500">
                  {isLive ? "Streaming now" : "Stream ended"}
                </p>
              </div>
              {!isCreator && (
                <Button
                  variant={isFollowing ? "outline" : "primary"}
                  size="sm"
                  onClick={handleFollow}
                >
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              )}
            </div>

            <div className="mt-3 flex gap-2">
              <Button
                variant={showGifts ? "primary" : "outline"}
                size="sm"
                onClick={() => setShowGifts((prev) => !prev)}
              >
                🎁 Gifts
              </Button>
              <Button
                variant={showLeaderboard ? "primary" : "outline"}
                size="sm"
                onClick={() => setShowLeaderboard((prev) => !prev)}
              >
                🏆 Leaderboard
              </Button>
              <Button variant="outline" size="sm">
                ↗️ Share
              </Button>
            </div>

            {showGifts && (
              <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4">
                <GiftPanel liveId={liveId} onGiftSent={refresh} />
              </div>
            )}

            {showLeaderboard && (
              <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4">
                <GiftLeaderboard liveId={liveId} />
              </div>
            )}
          </div>
        </div>

        {/* Comments sidebar */}
        <div className="h-[500px] overflow-hidden rounded-2xl bg-gray-900 text-white lg:h-[600px]">
          <LiveComments liveId={liveId} />
        </div>
      </div>
    </div>
  );
}
