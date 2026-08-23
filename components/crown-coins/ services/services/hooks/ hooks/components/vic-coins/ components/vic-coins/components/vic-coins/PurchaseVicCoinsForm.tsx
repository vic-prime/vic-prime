"use client";

import { useState, type FormEvent } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { vicCoinsService } from "@/services/vic-coins.service";
import { formatCurrency } from "@/lib/utils";

const VIC_COIN_RATE = 5; // 1 Vic-Coin = 5 FCFA
const MIN_VIC_COINS = 50; // Minimum 50 Vic-Coins = 250 FCFA

export function PurchaseVicCoinsForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const [amount, setAmount] = useState<string>("50");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const vicCoinAmount = parseInt(amount, 10) || 0;
  const totalFCFA = vicCoinAmount * VIC_COIN_RATE;
  const estimatedReach = vicCoinAmount; // 1 Vic-Coin = approximately 1 person

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (vicCoinAmount < MIN_VIC_COINS) {
      setError(`Minimum purchase is ${MIN_VIC_COINS} Vic-Coins.`);
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await vicCoinsService.purchase({ amount: vicCoinAmount });
      setSuccess(true);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Purchase failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Purchase Vic-Coins</h2>
      <p className="text-sm text-gray-600">
        Vic-Coins are used to promote your products, stores, and posts.
      </p>

      <div className="rounded-xl bg-gray-50 p-4">
        <p className="text-sm text-gray-600">Exchange Rate</p>
        <p className="text-lg font-bold text-gray-900">
          1 Vic-Coin = {VIC_COIN_RATE} FCFA
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Minimum: {MIN_VIC_COINS} Vic-Coins ={" "}
          {formatCurrency(MIN_VIC_COINS * VIC_COIN_RATE)}
        </p>
      </div>

      {success ? (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-6 text-center">
          <p className="text-lg font-semibold text-green-900">
            Vic-Coins Purchased Successfully!
          </p>
          <p className="mt-2 text-sm text-green-700">
            Your balance has been updated. You can now create promotions.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Vic-Coin Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min={MIN_VIC_COINS}
            step={1}
            required
            hint={`Minimum ${MIN_VIC_COINS} Vic-Coins`}
          />

          <div className="rounded-xl bg-blue-50 p-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-700">Total Cost</span>
              <span className="text-sm font-bold text-gray-900">
                {formatCurrency(totalFCFA)}
              </span>
            </div>
            <div className="mt-2 flex justify-between">
              <span className="text-sm text-gray-700">Estimated Reach</span>
              <span className="text-sm font-bold text-gray-900">
                ~{estimatedReach.toLocaleString()} people
              </span>
            </div>
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <Button type="submit" loading={loading} className="w-full" size="lg">
            Purchase Vic-Coins
          </Button>
        </form>
      )}
    </Card>
  );
}
