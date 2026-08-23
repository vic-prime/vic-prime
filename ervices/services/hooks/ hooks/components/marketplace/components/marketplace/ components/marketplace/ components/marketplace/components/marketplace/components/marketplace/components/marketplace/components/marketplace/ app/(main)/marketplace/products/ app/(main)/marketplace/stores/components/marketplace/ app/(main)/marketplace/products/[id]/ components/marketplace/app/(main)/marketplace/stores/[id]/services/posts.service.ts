import { apiGet, apiPost, apiDelete, endpoints } from "@/lib/api";
import { buildQuery } from "@/lib/utils";
import type { Comment, Paginated, Post } from "@/types";

export interface PostListParams {
  page?: number;
  limit?: number;
  userId?: string;
  storeId?: string;
}

export interface CreatePostPayload {
  content: string;
  media?: string[];
  productRef?: string;
  storeRef?: string;
  serviceRef?: string;
  liveAnnouncement?: boolean;
}

export const postsService = {
  list: (params: PostListParams = {}) =>
    apiGet<Paginated<Post>>(`${endpoints.feed.list}${buildQuery(params)}`),

  get: (id: string) => apiGet<Post>(endpoints.feed.getPost(id)),

  create: (payload: CreatePostPayload) =>
    apiPost<Post>(endpoints.feed.createPost, { body: payload }),

  like: (id: string) =>
    apiPost<{ success: boolean; likes_count: number }>(
      endpoints.feed.like(id),
    ),

  unlike: (id: string) =>
    apiDelete<{ success: boolean; likes_count: number }>(
      endpoints.feed.like(id),
    ),

  getComments: (postId: string, params?: { page?: number; limit?: number }) =>
    apiGet<Paginated<Comment>>(
      `${endpoints.feed.comments(postId)}${buildQuery(params)}`,
    ),

  createComment: (postId: string, content: string) =>
    apiPost<Comment>(endpoints.feed.comments(postId), {
      body: { content },
    }),

  share: (postId: string) =>
    apiPost<{ success: boolean; shares_count: number }>(
      endpoints.feed.share(postId),
    ),

  save: (postId: string) =>
    apiPost<{ success: boolean }>(endpoints.feed.save(postId)),

  unsave: (postId: string) =>
    apiDelete<{ success: boolean }>(endpoints.feed.save(postId)),

  report: (postId: string, reason: string) =>
    apiPost<{ success: boolean }>(endpoints.feed.report(postId), {
      body: { reason },
    }),
};
