import { apiGet, apiPost, endpoints } from "@/lib/api";
import { buildQuery } from "@/lib/utils";
import type { Paginated, Review } from "@/types";

export interface CreateReviewPayload {
  product_id: string;
  store_id: string;
  rating: number;
  content?: string;
}

export const reviewsService = {
  list: (params?: {
    page?: number;
    limit?: number;
    productId?: string;
    storeId?: string;
    userId?: string;
  }) =>
    apiGet<Paginated<Review>>(
      `${endpoints.reviews.list}${buildQuery(params)}`,
    ),

  create: (payload: CreateReviewPayload) =>
    apiPost<Review>(endpoints.reviews.create, {
      body: payload,
    }),
};
