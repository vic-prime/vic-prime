"use client";

import { useState } from "react";
import { LiveGrid } from "@/components/live/LiveGrid";
import { CreateLiveModal } from "@/components/live/CreateLiveModal";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

export default function LivePage() {
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Live Streams</h1>
          <p className="mt-2 text-gray-600">
            Watch live streams, send gifts, and connect with creators.
          </p>
        </div>
        {user && (
          <Button onClick={() => setShowCreateModal(true)}>
            🔴 Go Live
          </Button>
        )}
      </div>

      <LiveGrid />

      {showCreateModal && (
        <CreateLiveModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}
