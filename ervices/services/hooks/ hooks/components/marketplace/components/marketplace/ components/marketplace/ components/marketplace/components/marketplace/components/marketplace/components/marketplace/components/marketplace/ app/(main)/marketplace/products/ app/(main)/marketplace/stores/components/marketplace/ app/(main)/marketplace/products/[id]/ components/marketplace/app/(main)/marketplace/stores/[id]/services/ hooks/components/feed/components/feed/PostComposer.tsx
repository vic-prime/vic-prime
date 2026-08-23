"use client";

import { useState, type FormEvent } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { postsService } from "@/services/posts.service";
import { useAuth } from "@/hooks/useAuth";

export function PostComposer({ onPosted }: { onPosted?: () => void }) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<string[]>([]);
  const [productRef, setProductRef] = useState("");
  const [storeRef, setStoreRef] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    setError(null);

    try {
      await postsService.create({
        content: content.trim(),
        media: media.length > 0 ? media : undefined,
        productRef: productRef.trim() || undefined,
        storeRef: storeRef.trim() || undefined,
      });

      setContent("");
      setMedia([]);
      setProductRef("");
      setStoreRef("");
      onPosted?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Card className="space-y-3">
      <h2 className="font-semibold text-gray-900">Create Post</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share something with the community..."
          rows={3}
          className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
        />
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            value={productRef}
            onChange={(e) => setProductRef(e.target.value)}
            placeholder="Product ID (optional)"
            className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-500"
          />
          <input
            type="text"
            value={storeRef}
            onChange={(e) => setStoreRef(e.target.value)}
            placeholder="Store ID (optional)"
            className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-500"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <div className="flex justify-end">
          <Button type="submit" loading={loading} disabled={!content.trim()}>
            Post
          </Button>
        </div>
      </form>
    </Card>
  );
}
