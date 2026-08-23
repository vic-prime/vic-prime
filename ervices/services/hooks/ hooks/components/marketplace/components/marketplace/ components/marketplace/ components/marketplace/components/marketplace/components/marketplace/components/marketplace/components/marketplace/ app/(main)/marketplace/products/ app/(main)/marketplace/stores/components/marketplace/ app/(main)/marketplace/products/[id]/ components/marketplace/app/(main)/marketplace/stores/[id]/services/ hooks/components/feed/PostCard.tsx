"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { postsService } from "@/services/posts.service";
import { formatNumber, timeAgo } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import type { Comment, Post, User } from "@/types";

interface PostCardProps {
  post: Post;
  author?: User;
}

export function PostCard({ post, author }: PostCardProps) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes_count);
  const [sharesCount, setSharesCount] = useState(post.shares_count);
  const [comments, setComments] = useState<Comment[]>([]);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);

  const handleLike = async () => {
    try {
      if (liked) {
        const result = await postsService.unlike(post.id);
        setLiked(false);
        setLikesCount(result.likes_count);
      } else {
        const result = await postsService.like(post.id);
        setLiked(true);
        setLikesCount(result.likes_count);
      }
    } catch {
      // Handle error
    }
  };

  const handleSave = async () => {
    try {
      if (saved) {
        await postsService.unsave(post.id);
        setSaved(false);
      } else {
        await postsService.save(post.id);
        setSaved(true);
      }
    } catch {
      // Handle error
    }
  };

  const handleShare = async () => {
    try {
      const result = await postsService.share(post.id);
      setSharesCount(result.shares_count);
    } catch {
      // Handle error
    }
  };

  const toggleComments = async () => {
    if (!showComments && comments.length === 0) {
      setLoadingComments(true);
      try {
        const result = await postsService.getComments(post.id);
        setComments(result.items);
      } catch {
        // Handle error
      } finally {
        setLoadingComments(false);
      }
    }
    setShowComments((prev) => !prev);
  };

  const handleSubmitComment = async () => {
    if (!commentText.trim()) return;

    try {
      const comment = await postsService.createComment(post.id, commentText);
      setComments((prev) => [comment, ...prev]);
      setCommentText("");
    } catch {
      // Handle error
    }
  };

  const authorName = author?.full_name || author?.username || "Unknown User";
  const authorAvatar = author?.avatar_url || "/default-avatar.svg";

  return (
    <Card className="space-y-4">
      {/* Author */}
      <div className="flex items-center gap-3">
        <Link href={`/profile/${post.user_id}`}>
          <img
            src={authorAvatar}
            alt={authorName}
            className="h-10 w-10 rounded-full object-cover"
          />
        </Link>
        <div className="flex-1">
          <Link
            href={`/profile/${post.user_id}`}
            className="font-semibold text-gray-900 hover:underline"
          >
            {authorName}
          </Link>
          <p className="text-xs text-gray-500">{timeAgo(post.created_at)}</p>
        </div>
        <button
          onClick={() => postsService.report(post.id, "inappropriate")}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Report post"
        >
          ⋯
        </button>
      </div>

      {/* Content */}
      <p className="text-gray-900">{post.content}</p>

      {/* Media */}
      {post.media && post.media.length > 0 && (
        <div
          className={`grid gap-2 ${
            post.media.length === 1
              ? "grid-cols-1"
              : post.media.length === 2
                ? "grid-cols-2"
                : "grid-cols-2"
          }`}
        >
          {post.media.map((mediaUrl, idx) => (
            <div
              key={idx}
              className="overflow-hidden rounded-xl bg-gray-100"
            >
              <img
                src={mediaUrl}
                alt={`Post media ${idx + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Product reference */}
      {post.product_ref && (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
          <p className="text-xs text-gray-500">Featured Product</p>
          <Link
            href={`/marketplace/products/${post.product_ref}`}
            className="text-sm font-semibold text-brand-600 hover:underline"
          >
            View Product →
          </Link>
        </div>
      )}

      {/* Store reference */}
      {post.store_ref && (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
          <p className="text-xs text-gray-500">Featured Store</p>
          <Link
            href={`/marketplace/stores/${post.store_ref}`}
            className="text-sm font-semibold text-brand-600 hover:underline"
          >
            Visit Store →
          </Link>
        </div>
      )}

      {/* Live announcement */}
      {post.live_announcement && (
        <div className="rounded-xl border border-brand-200 bg-brand-50 p-3">
          <p className="text-sm font-semibold text-brand-700">
            🔴 Live Announcement
          </p>
          <Link href="/live" className="text-sm text-brand-600 hover:underline">
            Watch Live →
          </Link>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 border-t border-gray-100 pt-3">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 text-sm font-medium ${
            liked ? "text-brand-600" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <span>{liked ? "❤️" : "🤍"}</span>
          {formatNumber(likesCount)}
        </button>
        <button
          onClick={toggleComments}
          className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <span>💬</span>
          {formatNumber(post.comments_count)}
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <span>↗️</span>
          {formatNumber(sharesCount)}
        </button>
        <button
          onClick={handleSave}
          className={`ml-auto text-sm font-medium ${
            saved ? "text-brand-600" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {saved ? "Saved" : "Save"}
        </button>
      </div>

      {/* Comments */}
      {showComments && (
        <div className="space-y-3 border-t border-gray-100 pt-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 rounded-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-500"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmitComment();
                }
              }}
            />
            <Button
              size="sm"
              onClick={handleSubmitComment}
              disabled={!commentText.trim()}
            >
              Post
            </Button>
          </div>

          {loadingComments ? (
            <p className="text-sm text-gray-500">Loading comments...</p>
          ) : comments.length === 0 ? (
            <p className="text-sm text-gray-500">No comments yet.</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-2">
                <img
                  src="/default-avatar.svg"
                  alt="User"
                  className="h-8 w-8 rounded-full"
                />
                <div className="flex-1 rounded-xl bg-gray-100 p-2">
                  <p className="text-xs font-semibold text-gray-900">
                    User {comment.user_id.slice(0, 8)}
                  </p>
                  <p className="text-sm text-gray-700">{comment.content}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </Card>
  );
}
