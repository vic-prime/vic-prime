"use client";

import { useState, type FormEvent } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { reviewsService } from "@/services/reviews.service";

interface ReviewFormProps {
  productId: string;
  storeId: string;
  onSuccess?: () => void;
}

export function ReviewForm({ productId, storeId, onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await reviewsService.create({
        product_id: productId,
        store_id: storeId,
        rating,
        content: content.trim() || undefined,
      });
      setSuccess(true);
      setContent("");
      setRating(5);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="border-green-200 bg-green-50 text-center">
        <p className="text-lg font-semibold text-green-900">
          Review Submitted!
        </p>
        <p className="mt-2 text-sm text-green-700">
          Thank you for your feedback.
        </p>
      </Card>
    );
  }

  return (
    <Card className="space-y-4">
      <h3 className="font-semibold text-gray-900">Write a Review</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Rating
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-3xl transition-colors ${
                  star <= rating ? "text-yellow-500" : "text-gray-300 hover:text-yellow-400"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Review
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your experience..."
            rows={4}
            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <Button type="submit" loading={loading} className="w-full">
          Submit Review
        </Button>

        <p className="text-xs text-gray-500">
          Only verified purchases can leave reviews. The backend determines
          eligibility.
        </p>
      </form>
    </Card>
  );
}
