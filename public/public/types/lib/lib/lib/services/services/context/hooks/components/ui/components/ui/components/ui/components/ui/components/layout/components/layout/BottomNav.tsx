```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/home", label: "Home", icon: HomeIcon },
  { href: "/marketplace", label: "Marketplace", icon: MarketplaceIcon },
  { href: "/live", label: "Live", icon: LiveIcon },
  { href: "/shops", label: "Shops", icon: ShopsIcon },
  { href: "/chat", label: "Chat", icon: ChatIcon },
  { href: "/profile", label: "Profile", icon: ProfileIcon },
];

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 10.5L12 3.75l8.25 6.75V20.25a1.5 1.5 0 01-1.5 1.5h-4.5v-6h-4.5v6h-4.5a1.5 1.5 0 01-1.5-1.5V10.5z" />
    </svg>
  );
}

function MarketplaceIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 8.25h16.5M4.5 8.25l1.5 12h12l1.5-12M9 11.25V8.25m3 3V8.25m3 3V8.25M5.25 8.25l1.5-3.75h10.5l1.5 3.75" />
    </svg>
  );
}

function LiveIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a1.5 1.5 0 001.5-1.5v-10.5a1.5 1.5 0 00-1.5-1.5h-9A1.5 1.5 0 003 6.75v10.5a1.5 1.5 0 001.5 1.5z" />
    </svg>
  );
}

function ShopsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.25m11.25 0H4.5m13.5 0h3.75M4.5 21V4.5A1.5 1.5 0 016 3h9a1.5 1.5 0 011.5 1.5V21m-12 0h12" />
    </svg>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm3.75 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm3.75 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM21 12c0 4.556-4.03 8.25-9 8.25a9.8 9.8 0 01-2.925-.433L3 21l1.183-3.087A8.025 8.025 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
  );
}

function ProfileIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0" />
    </svg>
  );
}

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-100 bg-white/95 backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-lg grid-cols-6">
        {navItems.map((item) => {
          const isActive =
            item.href === "/home"
              ? pathname === "/home"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 py-2 text-[11px] font-medium transition-colors",
                isActive ? "text-brand-600" : "text-gray-500 hover:text-gray-800",
              )}
            >
              <item.icon className="h-6 w-6" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```
