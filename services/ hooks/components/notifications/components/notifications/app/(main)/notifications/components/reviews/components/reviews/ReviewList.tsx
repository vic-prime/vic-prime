"use client";

import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { reviewsService } from "@/services/reviews.service";
import { useEffect, useState } from "react";
import { timeAgo } from "@/lib/utils";
import type { Paginated, Review } from "@/types";

export function ReviewList({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Paginated<Review> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    reviewsService
      .list({ productId, limit: 20 })
      .then((data) => {
        if (!cancelled) {
          setReviews(data);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load reviews",
          );
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [productId]);

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full" />
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

  if (!reviews || reviews.items.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white px-4 py-10 text-center text-gray-600">
        No reviews yet. Be the first to review this product!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {reviews.items.map((review) => (
        <Card key={review.id} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src="/default-avatar.svg"
                alt="User"
                className="h-8 w-8 rounded-full"
              />
              <span className="text-sm font-semibold text-gray-900">
                User {review.user_id.slice(0, 8)}
              </span>
            </div>
            <span className="text-xs text-gray-500">
              {timeAgo(review.created_at)}
            </span>
          </div>
          <div className="mt-2">
            <span className="text-yellow-500">
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </span>
          </div>
          {review.content && (
            <p className="mt-2 text-sm text-gray-700">{review.content}</p>
          )}
          {review.verified_purchase && (
            <span className="mt-2 inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
              ✓ Verified Purchase
            </span>
          )}
        </Card>
      ))}
    </div>
  );
}
