"use client";

import { useAuth } from "@/hooks/useAuth";
import { cn, timeAgo } from "@/lib/utils";
import type { Message } from "@/types";

export function MessageBubble({ message }: { message: Message }) {
  const { user } = useAuth();
  const isOwn = message.sender_id === user?.id;

  return (
    <div
      className={cn(
        "flex flex-col",
        isOwn ? "items-end" : "items-start",
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2",
          isOwn
            ? "bg-brand-600 text-white rounded-br-md"
            : "bg-gray-100 text-gray-900 rounded-bl-md",
        )}
      >
        <p className="text-sm break-words">{message.content}</p>

        {message.product_ref && (
          <a
            href={`/marketplace/products/${message.product_ref}`}
            className="mt-2 block rounded-lg bg-white/20 px-3 py-2 text-xs font-semibold hover:bg-white/30"
          >
            📦 View Product →
          </a>
        )}

        {message.store_ref && (
          <a
            href={`/marketplace/stores/${message.store_ref}`}
            className="mt-2 block rounded-lg bg-white/20 px-3 py-2 text-xs font-semibold hover:bg-white/30"
          >
            🏪 View Store →
          </a>
        )}
      </div>

      <span
        className={cn(
          "mt-1 text-xs text-gray-400",
          isOwn ? "text-right" : "text-left",
        )}
      >
        {timeAgo(message.created_at)}
        {isOwn && message.read && " · Read"}
      </span>
    </div>
  );
}
