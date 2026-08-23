"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { flutterwaveService } from "@/services/flutterwave.service";
import { formatNumber, timeAgo } from "@/lib/utils";

export function PaymentStatusChecker({ txRef }: { txRef: string }) {
  const [status, setStatus] = useState<Awaited<
    ReturnType<typeof flutterwaveService.getPaymentStatus>
  > | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkStatus = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await flutterwaveService.getPaymentStatus(txRef);
      setStatus(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to check payment status",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void checkStatus();
  }, [txRef]);

  if (loading) {
    return <p className="text-sm text-gray-500">Checking payment status...</p>;
  }

  if (error) {
    return (
      <Card className="bg-red-50 border-red-200">
        <p className="text-sm text-red-700">{error}</p>
        <Button onClick={checkStatus} variant="outline" size="sm" className="mt-3">
          Retry
        </Button>
      </Card>
    );
  }

  if (!status) {
    return null;
  }

  const getStatusColor = (paymentStatus: string) => {
    switch (paymentStatus) {
      case "successful":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      case "refunded":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="space-y-3">
      <h3 className="font-semibold text-gray-900">Payment Status</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Reference</span>
          <span className="font-mono text-xs text-gray-900">{status.tx_ref}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Status</span>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(
              status.status,
            )}`}
          >
            {status.status}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Amount</span>
          <span className="text-sm font-semibold text-gray-900">
            {formatNumber(status.amount)} {status.currency}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Crown Coins</span>
          <span className="text-sm font-semibold text-gray-900">
            {status.crown_coins_credited
              ? `${formatNumber(status.crown_coins)} credited`
              : "Not credited"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Last Updated</span>
          <span className="text-sm text-gray-900">
            {timeAgo(status.updated_at)}
          </span>
        </div>
      </div>

      {(status.status === "pending" || status.status === "failed") && (
        <Button onClick={checkStatus} variant="outline" size="sm" className="w-full">
          Refresh Status
        </Button>
      )}
    </Card>
  );
}
