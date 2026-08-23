"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import { storesService } from "@/services/stores.service";
import { productsService } from "@/services/products.service";
import type { Product, Store, Review } from "@/types";
import { useAuth } from "@/hooks/useAuth";

export function ProductDetail({ product }: { product: Product }) {
  const { user } = useAuth();
  const [store, setStore] = useState<Store | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingStore, setLoadingStore] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "description" | "reviews" | "store"
  >("description");

  useEffect(() => {
    let cancelled = false;
    setLoadingStore(true);

    Promise.all([
      storesService.get(product.store_id).catch(() => null),
      productsService.getReviews(product.id).catch(() => []),
    ])
      .then(([storeData, reviewsData]) => {
        if (!cancelled) {
          setStore(storeData);
          setReviews(reviewsData);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoadingStore(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [product.id, product.store_id]);

  const mainImage = product.images?.[0] || "/default-avatar.svg";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100">
            <img
              src={mainImage}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-gray-200"
                >
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-2 text-3xl font-bold text-brand-600">
            {formatCurrency(product.price, product.currency)}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </p>

          {product.description && (
            <p className="mt-4 text-gray-700">{product.description}</p>
          )}

          <div className="mt-6 flex flex-col gap-3">
            <Button size="lg" className="w-full">
              Contact Seller
            </Button>
            <Button variant="outline" size="lg" className="w-full">
              Save Product
            </Button>
            <Button variant="outline" size="lg" className="w-full">
              Share
            </Button>
          </div>

          {product.variations && product.variations.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-gray-900">Variations</h3>
              <div className="mt-2 space-y-3">
                {product.variations.map((variation) => (
                  <div key={variation.id}>
                    <span className="text-sm font-medium text-gray-700">
                      {variation.name}
                    </span>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {variation.options.map((option) => (
                        <span
                          key={option}
                          className="rounded-full border border-gray-300 px-3 py-1 text-xs text-gray-700"
                        >
                          {option}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10">
        <div className="flex gap-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("description")}
            className={`pb-3 text-sm font-medium ${
              activeTab === "description"
                ? "border-b-2 border-brand-600 text-brand-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-3 text-sm font-medium ${
              activeTab === "reviews"
                ? "border-b-2 border-brand-600 text-brand-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Reviews ({reviews.length})
          </button>
          <button
            onClick={() => setActiveTab("store")}
            className={`pb-3 text-sm font-medium ${
              activeTab === "store"
                ? "border-b-2 border-brand-600 text-brand-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Store
          </button>
        </div>

        <div className="py-6">
          {activeTab === "description" && (
            <div className="prose max-w-none">
              <p>{product.description || "No description provided."}</p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              {reviews.length === 0 ? (
                <p className="text-gray-600">No reviews yet.</p>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">
                          {review.user_id}
                        </span>
                        <span className="text-yellow-500">
                          {"★".repeat(review.rating)}
                          {"☆".repeat(5 - review.rating)}
                        </span>
                      </div>
                      <p className="mt-2 text-gray-700">{review.content}</p>
                      {review.verified_purchase && (
                        <span className="mt-2 inline-block rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                          Verified Purchase
                        </span>
                      )}
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "store" && (
            <div>
              {loadingStore ? (
                <p>Loading store...</p>
              ) : store ? (
                <Card>
                  <div className="flex items-center gap-4">
                    <img
                      src={store.logo_url || "/default-avatar.svg"}
                      alt={store.name}
                      className="h-16 w-16 rounded-xl object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {store.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {store.description || "No description"}
                      </p>
                    </div>
                    <a
                      href={`/marketplace/stores/${store.id}`}
                      className="ml-auto"
                    >
                      <Button variant="outline" size="sm">
                        View Store
                      </Button>
                    </a>
                  </div>
                </Card>
              ) : (
                <p className="text-gray-600">Store information unavailable.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
