```tsx
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="flex items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/vicprime-mark.svg"
            alt="VicPrime Market"
            className="h-10 w-10 rounded-xl"
          />
          <span className="text-lg font-bold tracking-tight text-gray-900">
            {APP_NAME}
          </span>
        </Link>
        <Link
          href="/"
          className="text-sm font-semibold text-brand-600 hover:text-brand-700"
        >
          Back to home
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">{children}</div>
      </main>

      <footer className="px-5 py-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} VicPrime Market
      </footer>
    </div>
  );
}
```
