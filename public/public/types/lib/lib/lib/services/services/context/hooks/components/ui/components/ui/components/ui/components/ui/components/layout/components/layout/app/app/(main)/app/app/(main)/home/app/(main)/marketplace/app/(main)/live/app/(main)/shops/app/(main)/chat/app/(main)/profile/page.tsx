```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 text-center">
      <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
      <p className="mt-2 text-gray-600">
        Your VicPrime profile, stores, posts, and wallet overview will appear
        here.
      </p>
    </div>
  );
}
```
