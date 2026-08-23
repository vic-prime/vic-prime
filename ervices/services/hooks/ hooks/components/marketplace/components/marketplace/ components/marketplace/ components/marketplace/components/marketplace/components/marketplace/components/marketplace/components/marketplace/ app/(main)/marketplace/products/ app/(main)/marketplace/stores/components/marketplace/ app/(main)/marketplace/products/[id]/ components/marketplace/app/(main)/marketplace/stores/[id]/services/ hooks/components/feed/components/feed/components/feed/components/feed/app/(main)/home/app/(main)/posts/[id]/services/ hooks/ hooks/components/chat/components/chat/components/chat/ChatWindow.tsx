"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MessageBubble } from "./MessageBubble";
import { useMessages } from "@/hooks/useMessages";
import { useAuth } from "@/hooks/useAuth";

export function ChatWindow({ conversationId }: { conversationId: string }) {
  const { user } = useAuth();
  const {
    messages,
    loading,
    sending,
    error,
    sendMessage,
    markAsRead,
  } = useMessages(conversationId);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    void markAsRead();
  }, [markAsRead, messages.length]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      await sendMessage(input.trim());
      setInput("");
    } catch {
      // Error handled by hook
    }
  };

  return (
    <Card className="flex h-[calc(100vh-10rem)] flex-col p-0 overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-100 px-4 py-3">
        <h2 className="font-semibold text-gray-900">Conversation</h2>
        <p className="text-xs text-gray-500">
          Conversation ID: {conversationId.slice(0, 16)}...
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-500">Loading messages...</p>
          </div>
        ) : error ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-red-600">{error}</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-500">
              No messages yet. Say hello! 👋
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 border-t border-gray-100 px-4 py-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
        />
        <Button type="submit" loading={sending} disabled={!input.trim()}>
          Send
        </Button>
      </form>
    </Card>
  );
}
