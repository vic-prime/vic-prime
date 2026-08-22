```tsx
import type { ReactNode } from "react";
import BottomNav from "@/components/layout/BottomNav";
import Header from "@/components/layout/Header";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <BottomNav />
    </div>
  );
}
```
