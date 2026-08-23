import { apiGet, apiPost, endpoints } from "@/lib/api";
import { buildQuery } from "@/lib/utils";
import type { Paginated, Promotion } from "@/types";

export interface CreatePromotionPayload {
  target_type: "product" | "store" | "post";
  target_id: string;
  vic_coins_spent: number;
}

export const promotionsService = {
  list: (params?: { page?: number; limit?: number; status?: string }) =>
    apiGet<Paginated<Promotion>>(
      `${endpoints.promotions.list}${buildQuery(params)}`,
    ),

  get: (id: string) =>
    apiGet<Promotion>(endpoints.promotions.get(id)),

  create: (payload: CreatePromotionPayload) =>
    apiPost<Promotion>(endpoints.promotions.create, {
      body: payload,
    }),
};
