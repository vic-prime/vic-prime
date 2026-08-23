import { apiGet, apiPost, apiPatch, endpoints } from "@/lib/api";
import { buildQuery } from "@/lib/utils";
import type { Conversation, Message, Paginated } from "@/types";

export interface SendMessagePayload {
  content: string;
  attachments?: string[];
  productRef?: string;
  storeRef?: string;
}

export const chatService = {
  getConversations: (params?: { page?: number; limit?: number }) =>
    apiGet<Paginated<Conversation>>(
      `${endpoints.chat.conversations}${buildQuery(params)}`,
    ),

  getConversation: (id: string) =>
    apiGet<Conversation>(endpoints.chat.getConversation(id)),

  createConversation: (participantIds: string[]) =>
    apiPost<Conversation>(endpoints.chat.create, {
      body: { participant_ids: participantIds },
    }),

  getMessages: (
    conversationId: string,
    params?: { page?: number; limit?: number },
  ) =>
    apiGet<Paginated<Message>>(
      `${endpoints.chat.messages(conversationId)}${buildQuery(params)}`,
    ),

  sendMessage: (conversationId: string, payload: SendMessagePayload) =>
    apiPost<Message>(endpoints.chat.send(conversationId), {
      body: payload,
    }),

  markAsRead: (conversationId: string) =>
    apiPatch<{ success: boolean }>(endpoints.chat.read(conversationId)),
};
