"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { useCrownCoinWallet } from "@/hooks/useCrownCoinWallet";
import { formatNumber } from "@/lib/utils";

export function CrownCoinBalance({
  showPurchaseButton = true,
}: {
  showPurchaseButton?: boolean;
}) {
  const { wallet, loading, error } = useCrownCoinWallet();

  if (loading) {
    return <Skeleton className="h-24 w-full" />;
  }

  if (error) {
    return (
      <Card className="bg-red-50 border-red-200">
        <p className="text-sm text-red-700">{error}</p>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-brand-600 to-brand-700 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-brand-100">Crown Coin Balance</p>
          <p className="mt-1 text-3xl font-bold">
            {formatNumber(wallet?.balance || 0)} 🪙
          </p>
        </div>
        {showPurchaseButton && (
          <Link
            href="/crown-coins/purchase"
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-600 hover:bg-brand-50"
          >
            Purchase
          </Link>
        )}
      </div>
    </Card>
  );
}
