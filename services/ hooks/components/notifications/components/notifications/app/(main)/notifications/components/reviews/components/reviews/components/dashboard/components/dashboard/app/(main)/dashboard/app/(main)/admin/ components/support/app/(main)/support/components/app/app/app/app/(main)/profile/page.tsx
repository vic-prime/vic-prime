"use client";

import { useAuth } from "@/hooks/useAuth";
import { CrownCoinBalance } from "@/components/crown-coins/CrownCoinBalance";
import { VicCoinBalance } from "@/components/vic-coins/VicCoinBalance";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
import { getInitials } from "@/lib/utils";

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="h-8 w-8 text-brand-600" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="mt-2 text-gray-600">
          Please sign in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Profile</h1>

      <div className="space-y-6">
        <Card className="flex items-center gap-4">
          {user.avatar_url ? (
            <img
              src={user.avatar_url}
              alt={user.username}
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 text-xl font-bold text-white">
              {getInitials(user.full_name || user.username)}
            </div>
          )}
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900">
              {user.full_name || user.username}
            </h2>
            <p className="text-sm text-gray-600">@{user.username}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
            {user.role}
          </span>
        </Card>

        <CrownCoinBalance />
        <VicCoinBalance />

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" onClick={() => (window.location.href = "/dashboard")}>
            Dashboard
          </Button>
          <Button variant="outline" onClick={() => (window.location.href = "/notifications")}>
            Notifications
          </Button>
          <Button variant="outline" onClick={() => (window.location.href = "/support")}>
            Support
          </Button>
          <Button variant="danger" onClick={() => void logout()}>
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
