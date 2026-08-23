import type { Metadata } from "next";
import { ChatWindow } from "@/components/chat/ChatWindow";

export const metadata: Metadata = {
  title: "Chat",
};

export default function ChatDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <ChatWindow conversationId={params.id} />
    </div>
  );
}
