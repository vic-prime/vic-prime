"use client";

import { Card } from "@/components/ui/Card";
import { notificationsService } from "@/services/notifications.service";
import { timeAgo } from "@/lib/utils";
import type { Notification } from "@/types";

export function NotificationItem({
  notification,
  onRead,
}: {
  notification: Notification;
  onRead?: () => void;
}) {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "private_message":
        return "💬";
      case "new_follower":
        return "👤";
      case "like":
        return "❤️";
      case "comment":
        return "💭";
      case "live_started":
        return "🔴";
      case "gift_received":
        return "🎁";
      case "crown_coin_purchase":
        return "🪙";
      case "promotion":
        return "📈";
      case "review":
        return "⭐";
      case "support_message":
        return "🛟";
      default:
        return "🔔";
    }
  };

  const handleClick = async () => {
    if (!notification.read) {
      try {
        await notificationsService.markAsRead(notification.id);
        onRead?.();
      } catch {
        // Silent failure
      }
    }
  };

  return (
    <button onClick={handleClick} className="block w-full text-left">
      <Card
        className={`flex items-start gap-3 p-3 transition-colors hover:bg-gray-50 ${
          !notification.read ? "border-brand-200 bg-brand-50/50" : ""
        }`}
      >
        <span className="text-2xl flex-shrink-0">
          {getNotificationIcon(notification.type)}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900">
            {notification.title}
          </p>
          <p className="text-sm text-gray-600">{notification.body}</p>
          <p className="mt-1 text-xs text-gray-500">
            {timeAgo(notification.created_at)}
          </p>
        </div>
        {!notification.read && (
          <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-brand-600" />
        )}
      </Card>
    </button>
  );
}
