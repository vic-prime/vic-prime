import type { Metadata } from "next";
import { VicCoinBalance } from "@/components/vic-coins/VicCoinBalance";
import { VicCoinTransactionHistory } from "@/components/vic-coins/VicCoinTransactionHistory";

export const metadata: Metadata = {
  title: "Vic-Coins",
};

export default function VicCoinsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Vic-Coins</h1>
      <div className="space-y-6">
        <VicCoinBalance />
        <div>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            Transaction History
          </h2>
          <VicCoinTransactionHistory />
        </div>
      </div>
    </div>
  );
}
