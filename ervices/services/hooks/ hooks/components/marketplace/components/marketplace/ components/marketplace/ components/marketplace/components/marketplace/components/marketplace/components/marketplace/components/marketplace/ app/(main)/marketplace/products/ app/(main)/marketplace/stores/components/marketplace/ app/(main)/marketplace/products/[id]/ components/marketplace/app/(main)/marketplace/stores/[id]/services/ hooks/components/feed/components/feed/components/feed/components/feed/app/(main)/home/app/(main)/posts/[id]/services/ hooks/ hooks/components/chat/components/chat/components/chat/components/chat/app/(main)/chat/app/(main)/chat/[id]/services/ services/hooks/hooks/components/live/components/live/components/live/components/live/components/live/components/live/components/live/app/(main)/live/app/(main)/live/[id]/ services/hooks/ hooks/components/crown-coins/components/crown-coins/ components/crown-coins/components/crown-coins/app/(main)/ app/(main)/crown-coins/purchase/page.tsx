"use client";

import { useState } from "react";
import { CrownCoinBalance } from "@/components/crown-coins/CrownCoinBalance";
import { PackageCard } from "@/components/crown-coins/PackageCard";
import { PurchaseModal } from "@/components/crown-coins/PurchaseModal";
import { useCrownCoinPackages } from "@/hooks/useCrownCoinPackages";
import { Skeleton } from "@/components/ui/Skeleton";
import type { CrownCoinPackage } from "@/types";

export default function PurchaseCrownCoinsPage() {
  const { packages, loading, error } = useCrownCoinPackages();
  const [selectedPackage, setSelectedPackage] =
    useState<CrownCoinPackage | null>(null);

  const handlePurchaseSuccess = () => {
    setSelectedPackage(null);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-2 text-2xl font-bold text-gray-900">
        Purchase Crown Coins
      </h1>
      <p className="mb-6 text-gray-600">
        Crown Coins are used to send virtual gifts during live streams.
      </p>

      <div className="mb-8">
        <CrownCoinBalance showPurchaseButton={false} />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-6 text-center text-red-700">
          {error}
        </div>
      ) : packages.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-10 text-center text-gray-600">
          No Crown Coin packages available right now.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              package={pkg}
              selected={selectedPackage?.id === pkg.id}
              onSelect={setSelectedPackage}
            />
          ))}
        </div>
      )}

      {selectedPackage && (
        <PurchaseModal
          selectedPackage={selectedPackage}
          onClose={() => setSelectedPackage(null)}
          onSuccess={handlePurchaseSuccess}
        />
      )}
    </div>
  );
}
