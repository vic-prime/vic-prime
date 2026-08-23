"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";

export function AdminDashboard() {
  const { user } = useAuth();

  if (!user || user.role !== "administrator") {
    return null;
  }

  const adminItems = [
    {
      title: "Users",
      description: "Manage all users",
      href: "/admin/users",
      icon: "👥",
    },
    {
      title: "Stores",
      description: "Manage all stores",
      href: "/admin/stores",
      icon: "🏪",
    },
    {
      title: "Products",
      description: "Manage all products",
      href: "/admin/products",
      icon: "📦",
    },
    {
      title: "Posts",
      description: "Moderate posts and content",
      href: "/admin/posts",
      icon: "📝",
    },
    {
      title: "Live Streams",
      description: "Monitor live streams",
      href: "/admin/live",
      icon: "🔴",
    },
    {
      title: "Gifts",
      description: "Manage gift catalogue",
      href: "/admin/gifts",
      icon: "🎁",
    },
    {
      title: "Crown Coin Packages",
      description: "Configure Crown Coin packages",
      href: "/admin/crown-coin-packages",
      icon: "🪙",
    },
    {
      title: "Crown Coin Transactions",
      description: "View all Crown Coin transactions",
      href: "/admin/crown-coin-transactions",
      icon: "💳",
    },
    {
      title: "Vic-Coins",
      description: "Manage Vic-Coin system",
      href: "/admin/vic-coins",
      icon: "Ⓥ",
    },
    {
      title: "Promotions",
      description: "Manage all promotions",
      href: "/admin/promotions",
      icon: "📈",
    },
    {
      title: "Reports",
      description: "View platform reports",
      href: "/admin/reports",
      icon: "📊",
    },
    {
      title: "Support",
      description: "Manage support tickets",
      href: "/admin/support",
      icon: "🛟",
    },
    {
      title: "Moderation",
      description: "Review reports and moderate",
      href: "/admin/moderation",
      icon: "🛡️",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-gray-900 to-gray-700 p-6 text-white">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="mt-2 text-gray-300">
          Manage the entire VicPrime Market platform.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {adminItems.map((item) => (
          <Link key={item.title} href={item.href}>
            <Card className="h-full transition-all hover:border-brand-200 hover:shadow-md">
              <div className="flex items-start gap-3">
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
