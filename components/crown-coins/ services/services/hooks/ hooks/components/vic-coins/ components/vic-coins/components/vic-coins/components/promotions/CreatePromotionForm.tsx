"use client";

import { useState, type FormEvent } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { promotionsService } from "@/services/promotions.service";
import { useVicCoinWallet } from "@/hooks/useVicCoinWallet";
import { formatNumber } from "@/lib/utils";

type PromotionTargetType = "product" | "store" | "post";

export function CreatePromotionForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const { wallet } = useVicCoinWallet();
  const [targetType, setTargetType] = useState<PromotionTargetType>("product");
  const [targetId, setTargetId] = useState("");
  const [vicCoinsSpent, setVicCoinsSpent] = useState<string>("50");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const coinsSpent = parseInt(vicCoinsSpent, 10) || 0;
  const estimatedReach = coinsSpent; // 1 Vic-Coin = approximately 1 person
  const insufficientBalance = coinsSpent > (wallet?.balance || 0);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!targetId.trim()) {
      setError("Please enter a target ID.");
      return;
    }

    if (coinsSpent < 1) {
      setError("Vic-Coins spent must be at least 1.");
      return;
    }

    if (insufficientBalance) {
      setError("Insufficient Vic-Coin balance.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await promotionsService.create({
        target_type: targetType,
        target_id: targetId.trim(),
        vic_coins_spent: coinsSpent,
      });
      setSuccess(true);
      setTargetId("");
      setVicCoinsSpent("50");
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create promotion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">
        Create Promotion
      </h2>
      <p className="text-sm text-gray-600">
        Promote your products, stores, or posts to reach more people.
      </p>

      <div className="rounded-xl bg-gray-50 p-3">
        <p className="text-sm text-gray-700">
          Your Vic-Coin Balance:{" "}
          <span className="font-bold text-gray-900">
            {formatNumber(wallet?.balance || 0)} Ⓥ
          </span>
        </p>
      </div>

      {success ? (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-6 text-center">
          <p className="text-lg font-semibold text-green-900">
            Promotion Created Successfully!
          </p>
          <p className="mt-2 text-sm text-green-700">
            Your promotion is now active and reaching your target audience.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Target Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setTargetType("product")}
                className={`rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                  targetType === "product"
                    ? "border-brand-600 bg-brand-50 text-brand-700"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Product
              </button>
              <button
                type="button"
                onClick={() => setTargetType("store")}
                className={`rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                  targetType === "store"
                    ? "border-brand-600 bg-brand-50 text-brand-700"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Store
              </button>
              <button
                type="button"
                onClick={() => setTargetType("post")}
                className={`rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                  targetType === "post"
                    ? "border-brand-600 bg-brand-50 text-brand-700"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Post
              </button>
            </div>
          </div>

          <Input
            label="Target ID"
            value={targetId}
            onChange={(e) => setTargetId(e.target.value)}
            placeholder={`Enter ${targetType} ID`}
            required
          />

          <Input
            label="Vic-Coins to Spend"
            type="number"
            value={vicCoinsSpent}
            onChange={(e) => setVicCoinsSpent(e.target.value)}
            min={1}
            step={1}
            required
            error={insufficientBalance ? "Insufficient balance" : undefined}
            hint={`Estimated reach: ~${estimatedReach.toLocaleString()} people`}
          />

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <Button
            type="submit"
            loading={loading}
            disabled={insufficientBalance}
            className="w-full"
            size="lg"
          >
            Create Promotion
          </Button>
        </form>
      )}
    </Card>
  );
}
