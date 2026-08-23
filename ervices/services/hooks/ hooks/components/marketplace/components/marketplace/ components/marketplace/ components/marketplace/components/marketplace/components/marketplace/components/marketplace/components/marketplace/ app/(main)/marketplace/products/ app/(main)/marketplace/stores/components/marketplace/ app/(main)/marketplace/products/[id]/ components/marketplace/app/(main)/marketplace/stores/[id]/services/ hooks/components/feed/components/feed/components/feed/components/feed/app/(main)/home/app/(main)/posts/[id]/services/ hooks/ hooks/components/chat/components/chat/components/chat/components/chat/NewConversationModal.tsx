"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { chatService } from "@/services/chat.service";

export function NewConversationModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!userId.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const conversation = await chatService.createConversation([
        userId.trim(),
      ]);
      router.push(`/chat/${conversation.id}`);
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create conversation",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <Card className="w-full max-w-md space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Start New Conversation
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            label="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter user ID"
            required
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" loading={loading} className="flex-1">
              Start Chat
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
