import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { postsService } from "@/services/posts.service";
import { PostCard } from "@/components/feed/PostCard";

export const metadata: Metadata = {
  title: "Post",
};

export default async function PostDetailPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const post = await postsService.get(params.id);
    return (
      <div className="mx-auto max-w-2xl px-4 py-8">
        <PostCard post={post} />
      </div>
    );
  } catch {
    notFound();
  }
}
