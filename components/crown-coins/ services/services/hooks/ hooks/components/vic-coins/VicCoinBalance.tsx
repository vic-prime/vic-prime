"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { useVicCoinWallet } from "@/hooks/useVicCoinWallet";
import { formatNumber } from "@/lib/utils";

export function VicCoinBalance() {
  const { wallet, loading, error } = useVicCoinWallet();

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
    <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-blue-100">Vic-Coin Balance</p>
          <p className="mt-1 text-3xl font-bold">
            {formatNumber(wallet?.balance || 0)} Ⓥ
          </p>
        </div>
        <Link
          href="/vic-coins/purchase"
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50"
        >
          Purchase
        </Link>
      </div>
    </Card>
  );
}
