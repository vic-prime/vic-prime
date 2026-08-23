"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { crownCoinsService } from "@/services/crown-coins.service";
import { flutterwaveService } from "@/services/flutterwave.service";
import { isFlutterwaveConfigured } from "@/lib/flutterwave";
import type { CrownCoinPackage } from "@/types";

type PaymentStep =
  | "idle"
  | "initializing"
  | "ready"
  | "processing"
  | "success"
  | "failed"
  | "cancelled";

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
      callback: (data: { status: string; tx_ref: string; transaction_id: string }) => void;
      onclose: () => void;
    }) => void;
  }
}

export function useFlutterwavePayment(
  selectedPackage: CrownCoinPackage | null,
  userEmail: string,
  userName: string,
) {
  const [step, setStep] = useState<PaymentStep>("idle");
  const [error, setError] = useState<string | null>(null);
  const [txRef, setTxRef] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [flutterwaveLoaded, setFlutterwaveLoaded] = useState(false);
  const verificationTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load Flutterwave script
  useEffect(() => {
    if (!isFlutterwaveConfigured()) {
      setError("Payment service is not configured.");
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.flutterwave.com/v3.js";
    script.async = true;
    script.onload = () => setFlutterwaveLoaded(true);
    script.onerror = () => setError("Failed to load payment service.");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      if (verificationTimerRef.current) {
        clearInterval(verificationTimerRef.current);
      }
    };
  }, []);

  const pollPaymentStatus = useCallback(
    async (transactionRef: string) => {
      let attempts = 0;
      const maxAttempts = 12; // Poll for up to 2 minutes (12 * 10 seconds)

      verificationTimerRef.current = setInterval(async () => {
        attempts += 1;

        try {
          const status = await flutterwaveService.getPaymentStatus(
            transactionRef,
          );

          if (status.status === "successful" && status.crown_coins_credited) {
            if (verificationTimerRef.current) {
              clearInterval(verificationTimerRef.current);
            }
            setStep("success");
          } else if (
            status.status === "failed" ||
            status.status === "cancelled" ||
            status.status === "refunded"
          ) {
            if (verificationTimerRef.current) {
              clearInterval(verificationTimerRef.current);
            }
            setStep("failed");
            setError(
              `Payment ${status.status}. Please try again or contact support.`,
            );
          }
        } catch {
          // Ignore polling errors, continue trying
        }

        if (attempts >= maxAttempts) {
          if (verificationTimerRef.current) {
            clearInterval(verificationTimerRef.current);
          }
          setStep("failed");
          setError(
            "Payment verification timed out. Please check your transaction history or contact support.",
          );
        }
      }, 10000); // Poll every 10 seconds
    },
    [],
  );

  const initializePayment = useCallback(async () => {
    if (!selectedPackage) {
      setError("No package selected.");
      return;
    }

    if (!isFlutterwaveConfigured()) {
      setError("Payment service is not configured.");
      return;
    }

    setStep("initializing");
    setError(null);

    try {
      const response = await crownCoinsService.purchasePackage({
        package_id: selectedPackage.id,
      });

      setTxRef(response.tx_ref);

      if (response.checkout_url) {
        // Backend provided a direct checkout URL
        setCheckoutUrl(response.checkout_url);
        setStep("ready");
        // Poll for payment status
        pollPaymentStatus(response.tx_ref);
        return;
      }

      if (!flutterwaveLoaded || !window.FlutterwaveCheckout) {
        setError("Payment service is not available. Please try again.");
        setStep("failed");
        return;
      }

      const publicKey = process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY;

      if (!publicKey) {
        setError("Payment service is not configured.");
        setStep("failed");
        return;
      }

      setStep("ready");

      window.FlutterwaveCheckout({
        public_key: publicKey,
        tx_ref: response.tx_ref,
        amount: response.amount,
        currency: response.currency,
        payment_options: "card,banktransfer,mobilemoney",
        customer: {
          email: userEmail || "customer@vicprime.com",
          name: userName || "VicPrime User",
        },
        customizations: {
          title: "VicPrime Market",
          description: `${selectedPackage.crown_coins} Crown Coins`,
          logo: "/vicprime-mark.svg",
        },
        callback: (data) => {
          if (data.status === "successful") {
            setStep("processing");
            pollPaymentStatus(response.tx_ref);
          } else {
            setStep("failed");
            setError("Payment was not completed. Please try again.");
          }
        },
        onclose: () => {
          setStep("cancelled");
          setError("Payment window closed. Your transaction may still be processing.");
        },
      });
    } catch (err) {
      setStep("failed");
      setError(
        err instanceof Error ? err.message : "Failed to initialize payment",
      );
    }
  }, [
    selectedPackage,
    flutterwaveLoaded,
    pollPaymentStatus,
    userEmail,
    userName,
  ]);

  const reset = useCallback(() => {
    setStep("idle");
    setError(null);
    setTxRef(null);
    setCheckoutUrl(null);
    if (verificationTimerRef.current) {
      clearInterval(verificationTimerRef.current);
    }
  }, []);

  return {
    step,
    error,
    txRef,
    checkoutUrl,
    flutterwaveLoaded,
    initializePayment,
    reset,
  };
}
