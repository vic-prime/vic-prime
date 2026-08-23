import { apiGet, apiPost, endpoints } from "@/lib/api";

export interface FlutterwavePaymentStatus {
  transaction_id: string;
  tx_ref: string;
  status: "pending" | "successful" | "failed" | "cancelled" | "refunded";
  crown_coins_credited: boolean;
  amount: number;
  currency: string;
  crown_coins: number;
  created_at: string;
  updated_at: string;
}

export const flutterwaveService = {
  getPaymentStatus: (txRef: string) =>
    apiGet<FlutterwavePaymentStatus>(
      `${endpoints.payments.flutterwaveInitialize}/${txRef}`,
    ),

  verifyPayment: (txRef: string) =>
    apiPost<{ success: boolean; status: FlutterwavePaymentStatus }>(
      `${endpoints.payments.flutterwaveInitialize}/verify`,
      {
        body: { tx_ref: txRef },
      },
    ),
};
