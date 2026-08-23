"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { crownCoinsService } from "@/services/crown-coins.service";
import { formatNumber, timeAgo } from "@/lib/utils";
import type { CrownCoinTransaction, Paginated } from "@/types";

export function TransactionHistory() {
  const [transactions, setTransactions] = useState<
    Paginated<CrownCoinTransaction> | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    crownCoinsService
      .getTransactions({ limit: 20 })
      .then((data) => {
        if (!cancelled) {
          setTransactions(data);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load transactions",
          );
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

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-14 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-6 text-center text-red-700">
        {error}
      </div>
    );
  }

  if (!transactions || transactions.items.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white px-4 py-10 text-center text-gray-600">
        No transactions yet.
      </div>
    );
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "purchase":
        return "💳";
      case "gift_sent":
        return "🎁";
      case "gift_received":
        return "🎉";
      case "adjustment":
        return "⚙️";
      case "refund":
        return "↩️";
      default:
        return "🪙";
    }
  };

  const getTransactionLabel = (type: string) => {
    switch (type) {
      case "purchase":
        return "Purchase";
      case "gift_sent":
        return "Gift Sent";
      case "gift_received":
        return "Gift Received";
      case "adjustment":
        return "Adjustment";
      case "refund":
        return "Refund";
      default:
        return type;
    }
  };

  return (
    <div className="space-y-2">
      {transactions.items.map((transaction) => (
        <Card
          key={transaction.id}
          className="flex items-center gap-3 p-3"
        >
          <span className="text-2xl">
            {getTransactionIcon(transaction.type)}
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">
              {getTransactionLabel(transaction.type)}
            </p>
            <p className="text-xs text-gray-500">
              {timeAgo(transaction.created_at)}
            </p>
          </div>
          <div className="text-right">
            <p
              className={`text-sm font-bold ${
                transaction.amount > 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {transaction.amount > 0 ? "+" : ""}
              {formatNumber(transaction.amount)} 🪙
            </p>
            {transaction.balance_after !== undefined && (
              <p className="text-xs text-gray-500">
                Balance: {formatNumber(transaction.balance_after)}
              </p>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
