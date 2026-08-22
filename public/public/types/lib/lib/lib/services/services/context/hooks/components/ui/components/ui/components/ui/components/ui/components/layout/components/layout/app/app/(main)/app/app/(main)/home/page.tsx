```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">Home Feed</h1>
      <p className="mt-2 text-gray-600">
        Your personalized social commerce feed will appear here.
      </p>
    </div>
  );
}
```
