```tsx
import Link from "next/link";
import { APP_NAME, APP_TAGLINE } from "@/lib/constants";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between px-5 py-4 sm:px-8">
        <div className="flex items-center gap-2">
          <img
            src="/vicprime-mark.svg"
            alt="VicPrime Market"
            className="h-10 w-10 rounded-xl"
          />
          <span className="text-lg font-bold tracking-tight text-gray-900">
            {APP_NAME}
          </span>
        </div>
        <Link
          href="/home"
          className="text-sm font-semibold text-brand-600 hover:text-brand-700"
        >
          Open app
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 text-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {APP_NAME}
          </h1>
          <p className="mt-4 text-lg text-gray-600 sm:text-xl">{APP_TAGLINE}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/home"
              className="inline-flex h-12 items-center justify-center rounded-full bg-brand-600 px-6 text-sm font-medium text-white transition-colors hover:bg-brand-700"
            >
              Explore Feed
            </Link>
            <Link
              href="/marketplace"
              className="inline-flex h-12 items-center justify-center rounded-full border border-gray-300 bg-white px-6 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50"
            >
              Browse Marketplace
            </Link>
          </div>
        </div>
      </main>

      <footer className="px-5 py-6 text-center text-xs text-gray-400 sm:px-8">
        © {new Date().getFullYear()} VicPrime Market. One Marketplace. Every
        Business.
      </footer>
    </div>
  );
}
```
