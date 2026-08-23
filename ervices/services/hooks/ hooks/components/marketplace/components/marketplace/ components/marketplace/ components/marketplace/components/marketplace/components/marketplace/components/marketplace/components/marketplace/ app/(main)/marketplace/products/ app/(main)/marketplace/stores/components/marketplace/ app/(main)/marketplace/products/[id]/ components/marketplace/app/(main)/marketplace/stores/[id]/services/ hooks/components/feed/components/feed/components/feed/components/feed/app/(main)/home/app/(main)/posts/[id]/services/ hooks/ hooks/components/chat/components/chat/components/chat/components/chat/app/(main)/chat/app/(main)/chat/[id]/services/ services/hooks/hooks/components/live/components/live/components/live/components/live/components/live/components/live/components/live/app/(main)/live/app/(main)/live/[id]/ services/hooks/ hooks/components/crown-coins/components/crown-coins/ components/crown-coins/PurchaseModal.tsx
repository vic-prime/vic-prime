"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { crownCoinsService } from "@/services/crown-coins.service";
import { formatCurrency, formatNumber } from "@/lib/utils";
import type { CrownCoinPackage } from "@/types";

declare global {
  interface Window {
    FlutterwaveCheckout?: (config: {
      public_key: string;
      tx_ref: string;
      amount: number;
      currency: string;
      payment_options?: string;
      customer: {
        email: string;
        phone_number?: string;
        name: string;
      };
      customizations: {
        title: string;
        description: string;
        logo?: string;
      };
      callback: (data: unknown) => void;
      onclose: () => void;
    }) => void;
  }
}

export function PurchaseModal({
  selectedPackage,
  onClose,
  onSuccess,
}: {
  selectedPackage: CrownCoinPackage;
  onClose: () => void;
  onSuccess?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [flutterwaveLoaded, setFlutterwaveLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.flutterwave.com/v3.js";
    script.async = true;
    script.onload = () => setFlutterwaveLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePurchase = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await crownCoinsService.purchasePackage({
        package_id: selectedPackage.id,
      });

      if (response.checkout_url) {
        setCheckoutUrl(response.checkout_url);
      } else if (flutterwaveLoaded && window.FlutterwaveCheckout) {
        const publicKey =
          process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || "";

        if (!publicKey) {
          setError("Payment service is not configured.");
          return;
        }

        window.FlutterwaveCheckout({
          public_key: publicKey,
          tx_ref: response.tx_ref,
          amount: response.amount,
          currency: response.currency,
          payment_options: "card,banktransfer,mobilemoney",
          customer: {
            email: "customer@vicprime.com",
            name: "VicPrime User",
          },
          customizations: {
            title: "VicPrime Market",
            description: `${selectedPackage.crown_coins} Crown Coins`,
          },
          callback: (data) => {
            onSuccess?.();
            onClose();
          },
          onclose: () => {
            setLoading(false);
          },
        });
      } else {
        setError("Payment service is not available.");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to initialize payment",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <Card className="w-full max-w-md space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Confirm Purchase
        </h2>
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

        {checkoutUrl ? (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              You will be redirected to complete your payment securely.
            </p>
            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <Button className="w-full" size="lg">
                Open Payment Page
              </Button>
            </a>
          </div>
        ) : (
          <>
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
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                onClick={handlePurchase}
                loading={loading}
                className="flex-1"
              >
                Proceed to Payment
              </Button>
            </div>
          </>
        )}

        <p className="text-xs text-gray-400">
          By proceeding, you agree to VicPrime Market terms of service. Crown
          Coins are non-refundable and cannot be converted to cash.
        </p>
      </Card>
    </div>
  );
}
