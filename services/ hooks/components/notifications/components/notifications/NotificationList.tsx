"use client";

import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { NotificationItem } from "./NotificationItem";
import { useNotifications } from "@/hooks/useNotifications";
import { notificationsService } from "@/services/notifications.service";

export function NotificationList() {
  const { data, loading, error, refresh } = useNotifications({ limit: 20 });

  const handleMarkAllRead = async () => {
    try {
      await notificationsService.markAllAsRead();
      refresh();
    } catch {
      // Handle error
    }
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-6 text-center text-red-700">
        {error}
      </div>
    );
  }

  if (!data || data.items.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white px-4 py-10 text-center text-gray-600">
        No notifications yet.
      </div>
    );
  }

  const unreadCount = data.items.filter((n) => !n.read).length;

  return (
    <div className="space-y-3">
      {unreadCount > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {unreadCount} unread notification{unreadCount > 1 ? "s" : ""}
          </p>
          <Button variant="outline" size="sm" onClick={handleMarkAllRead}>
            Mark all as read
          </Button>
        </div>
      )}
      {data.items.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRead={refresh}
        />
      ))}
    </div>
  );
}
