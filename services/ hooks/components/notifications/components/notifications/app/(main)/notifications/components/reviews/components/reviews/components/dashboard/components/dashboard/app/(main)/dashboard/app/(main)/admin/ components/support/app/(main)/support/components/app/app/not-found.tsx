import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <span className="text-6xl">🔍</span>
        <h1 className="mt-4 text-3xl font-bold text-gray-900">404</h1>
        <p className="mt-2 text-lg font-semibold text-gray-700">
          Page Not Found
        </p>
        <p className="mt-2 text-gray-600">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block rounded-full bg-brand-600 px-6 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
