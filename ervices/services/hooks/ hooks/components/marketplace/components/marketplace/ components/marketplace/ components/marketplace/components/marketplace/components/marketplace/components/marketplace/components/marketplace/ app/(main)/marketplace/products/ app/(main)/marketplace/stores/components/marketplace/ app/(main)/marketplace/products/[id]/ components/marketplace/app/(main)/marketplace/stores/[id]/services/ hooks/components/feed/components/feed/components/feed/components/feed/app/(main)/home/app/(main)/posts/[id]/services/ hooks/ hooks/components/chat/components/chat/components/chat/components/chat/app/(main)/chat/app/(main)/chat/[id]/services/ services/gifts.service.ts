import { apiGet, apiPost, endpoints } from "@/lib/api";
import type { Gift, GiftTransaction } from "@/types";

export interface SendGiftPayload {
  gift_id: string;
  quantity: number;
  request_id: string;
}

export interface GiftLeaderboardEntry {
  user_id: string;
  username: string;
  total_crown_coins: number;
}

export const giftsService = {
  list: () => apiGet<Gift[]>(endpoints.gifts.list),

  send: (liveId: string, payload: SendGiftPayload) =>
    apiPost<GiftTransaction>(endpoints.gifts.send(liveId), {
      body: payload,
    }),

  getLeaderboard: (liveId: string) =>
    apiGet<GiftLeaderboardEntry[]>(endpoints.gifts.leaderboard(liveId)),
};
