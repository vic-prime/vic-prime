import type { Metadata } from "next";
import { Feed } from "@/components/feed/Feed";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Home Feed</h1>
      <Feed />
    </div>
  );
}
