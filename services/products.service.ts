import { apiGet, endpoints } from "@/lib/api";
import { buildQuery } from "@/lib/utils";
import type { Paginated, Product, Review } from "@/types";

export interface ProductListParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  storeId?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "newest" | "price_low" | "price_high";
}

export const productsService = {
  list: (params: ProductListParams = {}) =>
    apiGet<Paginated<Product>>(
      `${endpoints.products.list}${buildQuery(params)}`,
    ),

  get: (id: string) => apiGet<Product>(endpoints.products.get(id)),

  getReviews: (productId: string) =>
    apiGet<Review[]>(endpoints.products.reviews(productId)),
};
