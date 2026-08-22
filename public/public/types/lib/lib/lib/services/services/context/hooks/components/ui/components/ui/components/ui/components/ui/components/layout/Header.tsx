```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { cn, getInitials } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const { user } = useAuth();

  const desktopNav = [
    { href: "/home", label: "Home" },
    { href: "/marketplace", label: "Marketplace" },
    { href: "/live", label: "Live" },
    { href: "/shops", label: "Shops" },
    { href: "/chat", label: "Chat" },
    { href: "/profile", label: "Profile" },
  ];

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-gray-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/vicprime-mark.svg"
            alt="VicPrime Market"
            className="h-9 w-9 rounded-xl"
          />
          <span className="hidden text-lg font-bold tracking-tight text-gray-900 sm:block">
            VicPrime Market
          </span>
        </Link>

        <div className="hidden flex-1 max-w-xl md:block">
          <input
            type="search"
            placeholder="Search products, stores, people..."
            className="w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-brand-300 focus:bg-white focus:ring-2 focus:ring-brand-100"
          />
        </div>

        <nav className="hidden items-center gap-5 md:flex">
          {desktopNav.map((item) => {
            const isActive =
              item.href === "/home"
                ? pathname === "/home"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  isActive
                    ? "text-brand-600"
                    : "text-gray-600 hover:text-gray-900",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <Link
              href="/profile"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              aria-label="Profile"
            >
              {getInitials(user.full_name || user.username)}
            </Link>
          ) : (
            <Link
              href="/home"
              className="text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
```
