import type { Metadata } from "next";
import { CrownCoinBalance } from "@/components/crown-coins/CrownCoinBalance";
import { TransactionHistory } from "@/components/crown-coins/TransactionHistory";

export const metadata: Metadata = {
  title: "Crown Coins",
};

export default function CrownCoinsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Crown Coins</h1>
      <div className="space-y-6">
        <CrownCoinBalance />
        <div>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            Transaction History
          </h2>
          <TransactionHistory />
        </div>
      </div>
    </div>
  );
}
