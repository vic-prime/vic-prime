"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { giftsService } from "@/services/gifts.service";
import type { Gift } from "@/types";

export function GiftPanel({
  liveId,
  onGiftSent,
}: {
  liveId: string;
  onGiftSent?: () => void;
}) {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    giftsService
      .list()
      .then((data) => {
        if (!cancelled) {
          setGifts(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Failed to load gifts");
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
  }, []);

  const handleSendGift = async () => {
    if (!selectedGift) return;

    setSending(true);
    setError(null);

    try {
      await giftsService.send(liveId, {
        gift_id: selectedGift.id,
        quantity,
        request_id: `gift_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      });
      setSelectedGift(null);
      setQuantity(1);
      onGiftSent?.();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to send gift",
      );
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return <p className="text-center text-sm text-gray-500">Loading gifts...</p>;
  }

  if (error && gifts.length === 0) {
    return <p className="text-center text-sm text-red-600">{error}</p>;
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900">Send Gifts</h3>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {gifts.map((gift) => (
          <button
            key={gift.id}
            onClick={() => {
              setSelectedGift(gift);
              setQuantity(1);
            }}
            className={`rounded-xl border p-3 text-center transition-colors ${
              selectedGift?.id === gift.id
                ? "border-brand-500 bg-brand-50"
                : "border-gray-200 bg-white hover:border-brand-300"
            }`}
          >
            <span className="text-3xl">
              {gift.icon_url || "🎁"}
            </span>
            <p className="mt-1 text-xs font-semibold text-gray-900">
              {gift.name}
            </p>
            <p className="text-xs text-brand-600">
              {gift.crown_coin_value} 🪙
            </p>
          </button>
        ))}
      </div>

      {selectedGift && (
        <div className="rounded-xl border border-brand-200 bg-brand-50 p-4">
          <h4 className="font-semibold text-gray-900">
            Send {selectedGift.name}
          </h4>
          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="h-9 w-9 rounded-full border border-gray-300 bg-white text-lg font-bold text-gray-700 hover:bg-gray-50"
            >
              -
            </button>
            <span className="text-lg font-bold text-gray-900">{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="h-9 w-9 rounded-full border border-gray-300 bg-white text-lg font-bold text-gray-700 hover:bg-gray-50"
            >
              +
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-700">
            Total:{" "}
            <span className="font-bold text-brand-600">
              {selectedGift.crown_coin_value * quantity} 🪙
            </span>
          </p>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          <Button
            onClick={handleSendGift}
            loading={sending}
            className="mt-3 w-full"
          >
            Send Gift
          </Button>
        </div>
      )}
    </div>
  );
}
