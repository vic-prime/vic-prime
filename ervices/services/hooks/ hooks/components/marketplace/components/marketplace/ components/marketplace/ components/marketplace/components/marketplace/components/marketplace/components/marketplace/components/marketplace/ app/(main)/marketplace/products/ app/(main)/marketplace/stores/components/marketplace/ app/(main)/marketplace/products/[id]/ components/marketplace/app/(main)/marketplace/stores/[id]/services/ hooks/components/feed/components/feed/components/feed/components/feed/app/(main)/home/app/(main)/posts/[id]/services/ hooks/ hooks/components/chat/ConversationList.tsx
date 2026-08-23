"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { useConversations } from "@/hooks/useConversations";
import { timeAgo, cn } from "@/lib/utils";
import type { Conversation } from "@/types";

export function ConversationList() {
  const pathname = usePathname();
  const { data, loading, error } = useConversations();

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
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
        No conversations yet. Start chatting with a store or user!
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {data.items.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          active={pathname.includes(conversation.id)}
        />
      ))}
    </div>
  );
}

function ConversationItem({
  conversation,
  active,
}: {
  conversation: Conversation;
  active: boolean;
}) {
  const lastMessage = conversation.last_message;
  const otherParticipant = conversation.participants[0] || "User";

  return (
    <Link href={`/chat/${conversation.id}`}>
      <Card
        className={cn(
          "flex items-center gap-3 p-3 transition-colors hover:bg-gray-50",
          active && "border-brand-200 bg-brand-50",
        )}
      >
        <div className="relative">
          <img
            src="/default-avatar.svg"
            alt={otherParticipant}
            className="h-12 w-12 rounded-full object-cover"
          />
          {conversation.unread_count > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
              {conversation.unread_count}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="truncate text-sm font-semibold text-gray-900">
              {otherParticipant}
            </h3>
            {lastMessage && (
              <span className="text-xs text-gray-500">
                {timeAgo(lastMessage.created_at)}
              </span>
            )}
          </div>
          {lastMessage ? (
            <p className="truncate text-sm text-gray-600">
              {lastMessage.content}
            </p>
          ) : (
            <p className="text-sm text-gray-400">No messages yet</p>
          )}
        </div>
      </Card>
    </Link>
  );
}
