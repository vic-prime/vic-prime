```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat",
};

export default function ChatPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 text-center">
      <h1 className="text-2xl font-bold text-gray-900">Private Chat</h1>
      <p className="mt-2 text-gray-600">
        Your private conversations will appear here.
      </p>
    </div>
  );
}
```
