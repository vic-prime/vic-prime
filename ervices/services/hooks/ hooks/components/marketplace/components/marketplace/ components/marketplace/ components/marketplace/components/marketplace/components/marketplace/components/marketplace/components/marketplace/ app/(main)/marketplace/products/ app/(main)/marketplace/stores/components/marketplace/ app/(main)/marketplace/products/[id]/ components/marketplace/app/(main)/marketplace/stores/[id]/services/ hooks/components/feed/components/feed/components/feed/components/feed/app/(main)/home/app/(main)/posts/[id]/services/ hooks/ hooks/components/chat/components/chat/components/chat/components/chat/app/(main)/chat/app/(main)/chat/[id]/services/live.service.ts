import { apiGet, apiPost, apiPatch, endpoints } from "@/lib/api";
import { buildQuery } from "@/lib/utils";
import type { GiftTransaction, LiveComment, LiveStream, Paginated } from "@/types";

export interface CreateLivePayload {
  title: string;
  description?: string;
  coverUrl?: string;
}

export interface LiveListParams {
  page?: number;
  limit?: number;
  status?: "scheduled" | "live" | "ended";
  userId?: string;
}

export const liveService = {
  list: (params: LiveListParams = {}) =>
    apiGet<Paginated<LiveStream>>(
      `${endpoints.live.list}${buildQuery(params)}`,
    ),

  get: (id: string) => apiGet<LiveStream>(endpoints.live.get(id)),

  create: (payload: CreateLivePayload) =>
    apiPost<LiveStream>(endpoints.live.create, { body: payload }),

  start: (id: string) =>
    apiPatch<{ success: boolean }>(endpoints.live.start(id)),

  end: (id: string) =>
    apiPatch<{ success: boolean }>(endpoints.live.end(id)),

  getComments: (liveId: string, params?: { page?: number; limit?: number }) =>
    apiGet<Paginated<LiveComment>>(
      `${endpoints.live.comments(liveId)}${buildQuery(params)}`,
    ),

  sendComment: (liveId: string, content: string) =>
    apiPost<LiveComment>(endpoints.live.comments(liveId), {
      body: { content },
    }),

  getViewers: (liveId: string) =>
    apiGet<{ count: number }>(endpoints.live.viewers(liveId)),

  getFeaturedProducts: (liveId: string) =>
    apiGet<string[]>(endpoints.live.products(liveId)),
};
