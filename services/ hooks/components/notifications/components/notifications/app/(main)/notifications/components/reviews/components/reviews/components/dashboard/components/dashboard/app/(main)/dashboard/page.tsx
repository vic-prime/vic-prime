"use client";

import type { Metadata } from "next";
import { StoreOwnerDashboard } from "@/components/dashboard/StoreOwnerDashboard";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";
import { useAuth } from "@/hooks/useAuth";
import { Spinner } from "@/components/ui/Spinner";

export default function DashboardPage() {
  const { user, loading } = useAuth();

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
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Please sign in to access your dashboard.
        </p>
      </div>
    );
  }

  if (user.role === "administrator") {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <AdminDashboard />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <StoreOwnerDashboard />
    </div>
  );
}
