"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useFlutterwavePayment } from "@/hooks/useFlutterwavePayment";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { isFlutterwaveConfigured } from "@/lib/flutterwave";
import type { CrownCoinPackage } from "@/types";

interface FlutterwavePaymentModalProps {
  selectedPackage: CrownCoinPackage;
  userEmail: string;
  userName: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export function FlutterwavePaymentModal({
  selectedPackage,
  userEmail,
  userName,
  onClose,
  onSuccess,
}: FlutterwavePaymentModalProps) {
  const {
    step,
    error,
    txRef,
    checkoutUrl,
    initializePayment,
    reset,
  } = useFlutterwavePayment(selectedPackage, userEmail, userName);

  const [paymentConfigured] = useState(isFlutterwaveConfigured());

  useEffect(() => {
    if (step === "success") {
      onSuccess?.();
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step, onClose, onSuccess]);

  const handleInitialize = () => {
    void initializePayment();
  };

  const getStepContent = () => {
    switch (step) {
      case "idle":
      case "initializing":
        return null;

      case "ready":
        return (
          <div className="space-y-3">
            <div className="rounded-xl bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Package</span>
                <span className="font-semibold text-gray-900">
                  {formatNumber(selectedPackage.crown_coins)} Crown Coins
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-gray-600">Price</span>
                <span className="font-semibold text-brand-600">
                  {formatCurrency(selectedPackage.price, selectedPackage.currency)}
                </span>
              </div>
              {txRef && (
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-gray-600">Reference</span>
                  <span className="font-mono text-xs text-gray-900">
                    {txRef}
                  </span>
                </div>
              )}
            </div>

            {checkoutUrl ? (
              <a
                href={checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Button className="w-full" size="lg">
                  Open Secure Payment Page
                </Button>
              </a>
            ) : (
              <p className="text-sm text-gray-600">
                Complete your payment in the Flutterwave window.
              </p>
            )}
          </div>
        );

      case "processing":
        return (
          <div className="space-y-3 text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-brand-600 border-t-transparent" />
            <p className="font-semibold text-gray-900">
              Payment verification is pending...
            </p>
            <p className="text-sm text-gray-600">
              This may take a few seconds. Do not close this window.
            </p>
            {txRef && (
              <p className="text-xs text-gray-500">
                Transaction Reference:{" "}
                <span className="font-mono">{txRef}</span>
              </p>
            )}
          </div>
        );

      case "success":
        return (
          <div className="space-y-3 text-center">
            <span className="text-6xl">✅</span>
            <p className="text-lg font-semibold text-green-900">
              Your Crown Coins have been credited!
            </p>
            <p className="text-sm text-gray-600">
              {formatNumber(selectedPackage.crown_coins)} Crown Coins added to
              your wallet.
            </p>
          </div>
        );

      case "failed":
        return (
          <div className="space-y-3 text-center">
            <span className="text-6xl">❌</span>
            <p className="text-lg font-semibold text-red-900">
              Payment could not be completed
            </p>
            {error && <p className="text-sm text-red-700">{error}</p>}
            <Button onClick={reset} variant="outline" className="w-full">
              Try Again
            </Button>
          </div>
        );

      case "cancelled":
        return (
          <div className="space-y-3 text-center">
            <span className="text-6xl">🚫</span>
            <p className="text-lg font-semibold text-gray-900">
              Payment cancelled
            </p>
            {error && <p className="text-sm text-gray-600">{error}</p>}
            <Button onClick={reset} variant="outline" className="w-full">
              Try Again
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  if (!paymentConfigured) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
        <Card className="w-full max-w-md space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Payment Service Not Configured
          </h2>
          <p className="text-sm text-gray-600">
            The payment service is not configured. Please contact the
            administrator to enable Crown Coin purchases.
          </p>
          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <Card className="w-full max-w-md space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Purchase Crown Coins
          </h2>
          {step !== "processing" && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              ✕
            </button>
          )}
        </div>

        {step === "idle" || step === "initializing" ? (
          <div className="space-y-4">
            <div className="rounded-xl bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Package</span>
                <span className="font-semibold text-gray-900">
                  {formatNumber(selectedPackage.crown_coins)} Crown Coins
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-gray-600">Price</span>
                <span className="font-semibold text-brand-600">
                  {formatCurrency(selectedPackage.price, selectedPackage.currency)}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-600">
              You are about to purchase{" "}
              <span className="font-semibold text-gray-900">
                {formatNumber(selectedPackage.crown_coins)} Crown Coins
              </span>{" "}
              for{" "}
              <span className="font-semibold text-gray-900">
                {formatCurrency(selectedPackage.price, selectedPackage.currency)}
              </span>
              . Payment will be processed securely via Flutterwave.
            </p>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={step === "initializing"}
              >
                Cancel
              </Button>
              <Button
                onClick={handleInitialize}
                loading={step === "initializing"}
                className="flex-1"
                size="lg"
              >
                {step === "initializing" ? "Initializing..." : "Proceed to Payment"}
              </Button>
            </div>
          </div>
        ) : (
          getStepContent()
        )}

        <p className="text-xs text-gray-400">
          Crown Coins are non-refundable and cannot be converted to cash.
          Transactions are recorded for audit purposes.
        </p>
      </Card>
    </div>
  );
}
