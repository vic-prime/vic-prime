import type { Metadata } from "next";
import { NotificationList } from "@/components/notifications/NotificationList";

export const metadata: Metadata = {
  title: "Notifications",
};

export default function NotificationsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Notifications</h1>
      <NotificationList />
    </div>
  );
}
