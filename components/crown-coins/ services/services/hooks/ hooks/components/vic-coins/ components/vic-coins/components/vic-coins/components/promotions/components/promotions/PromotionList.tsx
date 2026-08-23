"use client";

import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { usePromotions } from "@/hooks/usePromotions";
import { formatNumber, timeAgo } from "@/lib/utils";

export function PromotionList() {
  const { data, loading, error } = usePromotions({ limit: 20 });

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full" />
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
        No promotions yet. Create your first promotion to boost visibility!
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTargetTypeIcon = (type: string) => {
    switch (type) {
      case "product":
        return "📦";
      case "store":
        return "🏪";
      case "post":
        return "📝";
      default:
        return "📈";
    }
  };

  return (
    <div className="space-y-3">
      {data.items.map((promotion) => (
        <Card key={promotion.id} className="flex items-center gap-3 p-4">
          <span className="text-2xl">
            {getTargetTypeIcon(promotion.target_type)}
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">
              {promotion.target_type.charAt(0).toUpperCase() +
                promotion.target_type.slice(1)}{" "}
              Promotion
            </p>
            <p className="text-xs text-gray-500">
              ID: {promotion.target_id} · {timeAgo(promotion.created_at)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-gray-900">
              {formatNumber(promotion.vic_coins_spent)} Ⓥ
            </p>
            <p className="text-xs text-gray-500">
              ~{formatNumber(promotion.estimated_reach)} reach
            </p>
            <span
              className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(
                promotion.status,
              )}`}
            >
              {promotion.status}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}
