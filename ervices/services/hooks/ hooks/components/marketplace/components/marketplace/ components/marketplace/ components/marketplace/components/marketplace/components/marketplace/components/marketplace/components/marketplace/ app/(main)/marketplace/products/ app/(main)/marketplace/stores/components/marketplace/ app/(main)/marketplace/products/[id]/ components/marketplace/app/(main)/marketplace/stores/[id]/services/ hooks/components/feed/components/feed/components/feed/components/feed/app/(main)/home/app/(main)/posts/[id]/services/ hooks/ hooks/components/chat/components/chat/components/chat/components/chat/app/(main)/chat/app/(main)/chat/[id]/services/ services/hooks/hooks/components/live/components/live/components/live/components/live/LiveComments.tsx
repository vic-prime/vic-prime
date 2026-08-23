"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLiveStream } from "@/hooks/useLiveStream";
import type { LiveComment } from "@/types";

export function LiveComments({ liveId }: { liveId: string }) {
  const { user } = useAuth();
  const { comments, sendComment } = useLiveStream(liveId);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setSending(true);
    try {
      await sendComment(input.trim());
      setInput("");
    } catch {
      // Handle error
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {comments.length === 0 ? (
          <p className="text-center text-sm text-gray-500">
            No comments yet. Be the first to say hello!
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-2">
              <img
                src="/default-avatar.svg"
                alt="User"
                className="h-7 w-7 rounded-full flex-shrink-0"
              />
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-900">
                  User {comment.user_id.slice(0, 8)}
                </p>
                <p className="text-sm text-gray-700">{comment.content}</p>
              </div>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {user && (
        <form
          onSubmit={handleSubmit}
          className="flex gap-2 border-t border-gray-700 px-4 py-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Comment..."
            className="flex-1 rounded-full border border-gray-600 bg-gray-800 px-4 py-2 text-sm text-white outline-none placeholder:text-gray-400 focus:border-brand-500"
          />
          <button
            type="submit"
            disabled={sending || !input.trim()}
            className="rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
          >
            {sending ? "..." : "Send"}
          </button>
        </form>
      )}
    </div>
  );
}
