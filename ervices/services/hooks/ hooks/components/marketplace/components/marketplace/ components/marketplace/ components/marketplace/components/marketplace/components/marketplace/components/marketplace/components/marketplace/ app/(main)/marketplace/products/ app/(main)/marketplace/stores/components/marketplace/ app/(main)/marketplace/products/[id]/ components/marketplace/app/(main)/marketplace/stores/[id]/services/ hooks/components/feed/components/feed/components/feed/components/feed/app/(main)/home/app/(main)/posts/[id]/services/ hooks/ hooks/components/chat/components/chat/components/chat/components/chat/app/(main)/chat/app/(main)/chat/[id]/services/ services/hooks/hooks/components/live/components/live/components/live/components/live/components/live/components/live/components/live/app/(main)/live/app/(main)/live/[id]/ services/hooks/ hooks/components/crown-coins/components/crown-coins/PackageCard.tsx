"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatCurrency, formatNumber } from "@/lib/utils";
import type { CrownCoinPackage } from "@/types";

interface PackageCardProps {
  package: CrownCoinPackage;
  onSelect: (pkg: CrownCoinPackage) => void;
  selected?: boolean;
  loading?: boolean;
}

export function PackageCard({
  package: pkg,
  onSelect,
  selected = false,
  loading = false,
}: PackageCardProps) {
  return (
    <Card
      className={`relative transition-all ${
        selected
          ? "border-brand-500 ring-2 ring-brand-500"
          : "hover:border-brand-300"
      }`}
    >
      <div className="text-center">
        <p className="text-4xl">🪙</p>
        <p className="mt-3 text-3xl font-bold text-gray-900">
          {formatNumber(pkg.crown_coins)}
        </p>
        <p className="text-sm text-gray-600">Crown Coins</p>
        <p className="mt-3 text-xl font-semibold text-brand-600">
          {formatCurrency(pkg.price, pkg.currency)}
        </p>
        <Button
          onClick={() => onSelect(pkg)}
          loading={loading && selected}
          disabled={loading && selected}
          variant={selected ? "primary" : "outline"}
          className="mt-4 w-full"
        >
          {selected ? "Selected" : "Select Package"}
        </Button>
      </div>
    </Card>
  );
}
