import { apiGet, apiPatch, endpoints } from "@/lib/api";
import { buildQuery } from "@/lib/utils";
import type { Notification, Paginated } from "@/types";

export const notificationsService = {
  list: (params?: { page?: number; limit?: number; unreadOnly?: boolean }) =>
    apiGet<Paginated<Notification>>(
      `${endpoints.notifications.list}${buildQuery(params)}`,
    ),

  markAsRead: (notificationId: string) =>
    apiPatch<{ success: boolean }>(
      endpoints.notifications.read(notificationId),
    ),

  markAllAsRead: () =>
    apiPatch<{ success: boolean }>(endpoints.notifications.readAll),
};
