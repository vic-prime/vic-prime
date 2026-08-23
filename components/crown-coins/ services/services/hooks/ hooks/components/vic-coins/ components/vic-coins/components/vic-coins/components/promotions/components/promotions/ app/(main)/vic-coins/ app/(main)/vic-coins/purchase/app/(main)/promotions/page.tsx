"use client";

import { CreatePromotionForm } from "@/components/promotions/CreatePromotionForm";
import { PromotionList } from "@/components/promotions/PromotionList";
import { usePromotions } from "@/hooks/usePromotions";

export default function PromotionsPage() {
  const { refresh } = usePromotions({ limit: 20 });

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-2 text-2xl font-bold text-gray-900">Promotions</h1>
      <p className="mb-6 text-gray-600">
        Boost your visibility and reach more customers with Vic-Coins.
      </p>

      <div className="space-y-6">
        <CreatePromotionForm onSuccess={refresh} />
        <div>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            Your Promotions
          </h2>
          <PromotionList />
        </div>
      </div>
    </div>
  );
}
