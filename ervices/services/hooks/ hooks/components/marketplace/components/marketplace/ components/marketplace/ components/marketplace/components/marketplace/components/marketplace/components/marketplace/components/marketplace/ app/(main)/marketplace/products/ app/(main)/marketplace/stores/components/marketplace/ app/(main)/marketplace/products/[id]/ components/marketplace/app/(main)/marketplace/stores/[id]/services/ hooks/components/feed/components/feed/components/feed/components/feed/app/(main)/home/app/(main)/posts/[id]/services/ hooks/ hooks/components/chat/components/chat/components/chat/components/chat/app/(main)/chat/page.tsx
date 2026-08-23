"use client";

import { useState } from "react";
import { ConversationList } from "@/components/chat/ConversationList";
import { NewConversationModal } from "@/components/chat/NewConversationModal";
import { Button } from "@/components/ui/Button";

export default function ChatPage() {
  const [showNewConversation, setShowNewConversation] = useState(false);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Private Chat</h1>
        <Button onClick={() => setShowNewConversation(true)}>
          New Chat
        </Button>
      </div>

      <ConversationList />

      {showNewConversation && (
        <NewConversationModal
          onClose={() => setShowNewConversation(false)}
        />
      )}
    </div>
  );
}
