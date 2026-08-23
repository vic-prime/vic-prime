"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";

export function StoreOwnerDashboard() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const dashboardItems = [
    {
      title: "My Store",
      description: "Manage your store profile and settings",
      href: "/dashboard/store",
      icon: "🏪",
    },
    {
      title: "Products",
      description: "Add, edit, and manage products",
      href: "/dashboard/products",
      icon: "📦",
    },
    {
      title: "Services",
      description: "Manage your services",
      href: "/dashboard/services",
      icon: "🛠️",
    },
    {
      title: "Posts",
      description: "Create and manage posts",
      href: "/dashboard/posts",
      icon: "📝",
    },
    {
      title: "Orders & Requests",
      description: "View customer orders and requests",
      href: "/dashboard/orders",
      icon: "📋",
    },
    {
      title: "Customers",
      description: "Manage your customer relationships",
      href: "/dashboard/customers",
      icon: "👥",
    },
    {
      title: "Chat",
      description: "Respond to customer messages",
      href: "/chat",
      icon: "💬",
    },
    {
      title: "Live",
      description: "Start live streams and engage",
      href: "/live",
      icon: "🔴",
    },
    {
      title: "Vic-Coins",
      description: "Purchase and manage Vic-Coins",
      href: "/vic-coins",
      icon: "Ⓥ",
    },
    {
      title: "Promotions",
      description: "Create and track promotions",
      href: "/promotions",
      icon: "📈",
    },
    {
      title: "Analytics",
      description: "View store performance",
      href: "/dashboard/analytics",
      icon: "📊",
    },
    {
      title: "Reviews",
      description: "Manage product and store reviews",
      href: "/dashboard/reviews",
      icon: "⭐",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-brand-600 to-brand-700 p-6 text-white">
        <h1 className="text-2xl font-bold">Welcome, {user.username}!</h1>
        <p className="mt-2 text-brand-100">
          Manage your store, products, and promotions from here.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dashboardItems.map((item) => (
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
