import { apiGet, apiPost, endpoints } from "@/lib/api";
import { buildQuery } from "@/lib/utils";
import type {
  Paginated,
  VicCoinTransaction,
  VicCoinWallet,
} from "@/types";

export interface PurchaseVicCoinsPayload {
  amount: number;
}

export const vicCoinsService = {
  getBalance: () =>
    apiGet<VicCoinWallet>(endpoints.vicCoins.balance),

  getTransactions: (params?: { page?: number; limit?: number }) =>
    apiGet<Paginated<VicCoinTransaction>>(
      `${endpoints.vicCoins.transactions}${buildQuery(params)}`,
    ),

  purchase: (payload: PurchaseVicCoinsPayload) =>
    apiPost<{ success: boolean; balance: number }>(endpoints.vicCoins.purchase, {
      body: payload,
    }),
};
