/**
 * Flutterwave Payment Integration Utilities
 * 
 * IMPORTANT SECURITY NOTES:
 * - Never expose FLUTTERWAVE_SECRET_KEY in the browser
 * - Never expose FLUTTERWAVE_WEBHOOK_SECRET in the browser
 * - Only NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY is safe for client-side use
 * - All payment verification must happen server-side
 */

export const FLUTTERWAVE_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || "";

export const FLUTTERWAVE_SECRET_KEY =
  process.env.FLUTTERWAVE_SECRET_KEY || "";

export const FLUTTERWAVE_WEBHOOK_SECRET =
  process.env.FLUTTERWAVE_WEBHOOK_SECRET || "";

export const FLUTTERWAVE_API_BASE = "https://api.flutterwave.com/v3";

export const FLUTTERWAVE_ENDPOINTS = {
  initialize: `${FLUTTERWAVE_API_BASE}/payments`,
  verify: (transactionId: string) =>
    `${FLUTTERWAVE_API_BASE}/transactions/${transactionId}/verify`,
  refund: `${FLUTTERWAVE_API_BASE}/refunds`,
};

export interface FlutterwaveInitializePayload {
  tx_ref: string;
  amount: number;
  currency: string;
  redirect_url?: string;
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
  meta?: Record<string, string>;
}

export interface FlutterwaveInitializeResponse {
  status: string;
  message: string;
  data: {
    link: string;
  };
}

export interface FlutterwaveVerifyResponse {
  status: string;
  message: string;
  data: {
    id: number;
    tx_ref: string;
    flw_ref: string;
    amount: number;
    currency: string;
    charged_amount: number;
    status: string;
    payment_type: string;
    customer: {
      email: string;
      name: string;
      phone_number?: string;
    };
    created_at: string;
    meta?: Record<string, string>;
  };
}

export function isFlutterwaveConfigured(): boolean {
  return Boolean(FLUTTERWAVE_PUBLIC_KEY && FLUTTERWAVE_SECRET_KEY);
}
