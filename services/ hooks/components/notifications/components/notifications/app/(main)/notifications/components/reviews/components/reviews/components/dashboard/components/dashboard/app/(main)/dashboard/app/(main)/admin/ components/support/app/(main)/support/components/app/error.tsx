"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <span className="text-6xl">⚠️</span>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          Something went wrong
        </h1>
        <p className="mt-2 text-gray-600">
          An unexpected error occurred. Please try again.
        </p>
        {error.digest && (
          <p className="mt-2 text-xs text-gray-400">
            Error ID: {error.digest}
          </p>
        )}
        <button
          onClick={reset}
          className="mt-4 rounded-full bg-brand-600 px-6 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
