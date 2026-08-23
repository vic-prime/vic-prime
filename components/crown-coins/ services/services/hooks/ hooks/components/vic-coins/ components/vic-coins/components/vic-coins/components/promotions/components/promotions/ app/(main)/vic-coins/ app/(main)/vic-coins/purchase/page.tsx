"use client";

import { VicCoinBalance } from "@/components/vic-coins/VicCoinBalance";
import { PurchaseVicCoinsForm } from "@/components/vic-coins/PurchaseVicCoinsForm";
import { useVicCoinWallet } from "@/hooks/useVicCoinWallet";

export default function PurchaseVicCoinsPage() {
  const { refresh } = useVicCoinWallet();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-2 text-2xl font-bold text-gray-900">
        Purchase Vic-Coins
      </h1>
      <p className="mb-6 text-gray-600">
        Vic-Coins are used to promote your products, stores, and posts.
      </p>

      <div className="mb-8">
        <VicCoinBalance />
      </div>

      <PurchaseVicCoinsForm onSuccess={refresh} />
    </div>
  );
}
