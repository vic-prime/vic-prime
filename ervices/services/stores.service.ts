import { apiDelete, apiGet, apiPost, endpoints } from "@/lib/api";
import { buildQuery } from "@/lib/utils";
import type { Paginated, Post, Product, Review, Service, Store } from "@/types";

export interface StoreListParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  country?: string;
}

export const storesService = {
  list: (params: StoreListParams = {}) =>
    apiGet<Paginated<Store>>(`${endpoints.stores.list}${buildQuery(params)}`),

  get: (id: string) => apiGet<Store>(endpoints.stores.get(id)),

  getProducts: (storeId: string, params?: { page?: number; limit?: number }) =>
    apiGet<Paginated<Product>>(
      `${endpoints.stores.products(storeId)}${buildQuery(params)}`,
    ),

  getServices: (storeId: string, params?: { page?: number; limit?: number }) =>
    apiGet<Paginated<Service>>(
      `${endpoints.stores.services(storeId)}${buildQuery(params)}`,
    ),

  getPosts: (storeId: string, params?: { page?: number; limit?: number }) =>
    apiGet<Paginated<Post>>(
      `${endpoints.stores.posts(storeId)}${buildQuery(params)}`,
    ),

  getReviews: (storeId: string, params?: { page?: number; limit?: number }) =>
    apiGet<Paginated<Review>>(
      `${endpoints.stores.reviews(storeId)}${buildQuery(params)}`,
    ),

  follow: (storeId: string) =>
    apiPost<{ success: boolean }>(endpoints.stores.follow(storeId)),

  unfollow: (storeId: string) =>
    apiDelete<{ success: boolean }>(endpoints.stores.follow(storeId)),
};
