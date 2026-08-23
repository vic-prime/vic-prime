import type { Metadata } from "next";
import { LivePlayer } from "@/components/live/LivePlayer";

export const metadata: Metadata = {
  title: "Live Stream",
};

export default function LiveDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <LivePlayer liveId={params.id} />;
}
