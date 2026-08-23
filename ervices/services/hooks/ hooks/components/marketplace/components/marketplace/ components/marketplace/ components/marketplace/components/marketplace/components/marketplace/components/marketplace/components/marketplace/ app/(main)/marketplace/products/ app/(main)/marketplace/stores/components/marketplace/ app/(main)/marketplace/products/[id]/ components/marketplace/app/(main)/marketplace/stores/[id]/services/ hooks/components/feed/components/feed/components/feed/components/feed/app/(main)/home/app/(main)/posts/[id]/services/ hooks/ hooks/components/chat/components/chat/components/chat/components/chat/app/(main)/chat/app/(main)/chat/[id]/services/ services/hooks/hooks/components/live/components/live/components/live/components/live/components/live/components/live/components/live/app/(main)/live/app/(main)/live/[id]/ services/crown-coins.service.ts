import { apiGet, apiPost, endpoints } from "@/lib/api";
import { buildQuery } from "@/lib/utils";
import type {
  CrownCoinPackage,
  CrownCoinTransaction,
  CrownCoinWallet,
  Paginated,
} from "@/types";

export interface PurchasePackagePayload {
  package_id: string;
}

export interface CrownCoinPurchaseResponse {
  transaction_id: string;
  tx_ref: string;
  amount: number;
  currency: string;
  crown_coins: number;
  status: "pending" | "successful" | "failed";
  checkout_url?: string;
}

export const crownCoinsService = {
  getBalance: () =>
    apiGet<CrownCoinWallet>(endpoints.crownCoins.balance),

  getPackages: () =>
    apiGet<CrownCoinPackage[]>(endpoints.crownCoins.packages),

  purchasePackage: (payload: PurchasePackagePayload) =>
    apiPost<CrownCoinPurchaseResponse>(endpoints.crownCoins.purchase, {
      body: payload,
    }),

  getTransactions: (params?: { page?: number; limit?: number }) =>
    apiGet<Paginated<CrownCoinTransaction>>(
      `${endpoints.crownCoins.transactions}${buildQuery(params)}`,
    ),
};
