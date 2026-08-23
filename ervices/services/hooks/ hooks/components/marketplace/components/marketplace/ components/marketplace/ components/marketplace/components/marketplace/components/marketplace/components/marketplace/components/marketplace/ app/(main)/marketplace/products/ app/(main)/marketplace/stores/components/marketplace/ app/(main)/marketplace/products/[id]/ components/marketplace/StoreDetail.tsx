"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "./ProductCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { storesService } from "@/services/stores.service";
import type { Product, Service, Post, Review, Store } from "@/types";
import { useAuth } from "@/hooks/useAuth";

export function StoreDetail({ store }: { store: Store }) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<
    "products" | "services" | "posts" | "reviews"
  >("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    Promise.all([
      storesService.getProducts(store.id, { limit: 10 }),
      storesService.getServices(store.id, { limit: 10 }),
      storesService.getPosts(store.id, { limit: 10 }),
      storesService.getReviews(store.id, { limit: 10 }),
    ])
      .then(([productsData, servicesData, postsData, reviewsData]) => {
        if (!cancelled) {
          setProducts(productsData.items);
          setServices(servicesData.items);
          setPosts(postsData.items);
          setReviews(reviewsData.items);
        }
      })
      .catch(() => {
        // Error handled by loading state
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [store.id]);

  const handleFollow = async () => {
    try {
      await storesService.follow(store.id);
      store.followers_count += 1;
    } catch {
      // Handle error
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Store header */}
      <div className="relative mb-8">
        <div className="h-48 w-full overflow-hidden rounded-2xl bg-gray-200">
          {store.banner_url ? (
            <img
              src={store.banner_url}
              alt={store.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-r from-brand-500 to-brand-700" />
          )}
        </div>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-4">
            <img
              src={store.logo_url || "/default-avatar.svg"}
              alt={store.name}
              className="h-20 w-20 rounded-2xl border-4 border-white object-cover shadow-md"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{store.name}</h1>
              <p className="text-sm text-gray-600">{store.category}</p>
              <p className="text-xs text-gray-500">
                {store.followers_count} followers ·{" "}
                {store.location || "Unknown location"}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleFollow}>Follow</Button>
            <Button variant="outline">Private Chat</Button>
          </div>
        </div>
        {store.description && (
          <p className="mt-4 text-gray-700">{store.description}</p>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("products")}
          className={`pb-3 text-sm font-medium ${
            activeTab === "products"
              ? "border-b-2 border-brand-600 text-brand-600"
              : "text-gray-500"
          }`}
        >
          Products ({products.length})
        </button>
        <button
          onClick={() => setActiveTab("services")}
          className={`pb-3 text-sm font-medium ${
            activeTab === "services"
              ? "border-b-2 border-brand-600 text-brand-600"
              : "text-gray-500"
          }`}
        >
          Services ({services.length})
        </button>
        <button
          onClick={() => setActiveTab("posts")}
          className={`pb-3 text-sm font-medium ${
            activeTab === "posts"
              ? "border-b-2 border-brand-600 text-brand-600"
              : "text-gray-500"
          }`}
        >
          Posts ({posts.length})
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`pb-3 text-sm font-medium ${
            activeTab === "reviews"
              ? "border-b-2 border-brand-600 text-brand-600"
              : "text-gray-500"
          }`}
        >
          Reviews ({reviews.length})
        </button>
      </div>

      {/* Tab content */}
      <div className="py-6">
        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full" />
            ))}
          </div>
        ) : (
          <>
            {activeTab === "products" && (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
                {products.length === 0 && (
                  <p className="col-span-full text-gray-600">No products.</p>
                )}
              </div>
            )}
            {activeTab === "services" && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                  <Card key={service.id}>
                    <h3 className="font-semibold">{service.name}</h3>
                    <p className="text-sm text-gray-600">
                      {service.description}
                    </p>
                    <p className="mt-2 font-bold text-brand-600">
                      {service.price} {service.currency}
                    </p>
                  </Card>
                ))}
                {services.length === 0 && (
                  <p className="text-gray-600">No services.</p>
                )}
              </div>
            )}
            {activeTab === "posts" && (
              <div className="space-y-4">
                {posts.map((post) => (
                  <Card key={post.id}>
                    <p>{post.content}</p>
                  </Card>
                ))}
                {posts.length === 0 && (
                  <p className="text-gray-600">No posts.</p>
                )}
              </div>
            )}
            {activeTab === "reviews" && (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </span>
                    </div>
                    <p>{review.content}</p>
                  </Card>
                ))}
                {reviews.length === 0 && (
                  <p className="text-gray-600">No reviews.</p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
