```tsx
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import type { RegisterPayload } from "@/services/auth.service";

export function RegisterForm() {
  const router = useRouter();
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"customer" | "store_owner">("customer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const payload: RegisterPayload = {
      username,
      email,
      password,
      full_name: fullName || undefined,
      role,
    };

    try {
      await register(payload);
      router.push("/home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="vicprime_user"
        required
        autoComplete="username"
      />

      <Input
        label="Full name"
        value={fullName}
        onChange={(event) => setFullName(event.target.value)}
        placeholder="Aminata Diallo"
        autoComplete="name"
      />

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@example.com"
        required
        autoComplete="email"
      />

      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="••••••••"
        required
        minLength={8}
        autoComplete="new-password"
        hint="At least 8 characters recommended."
      />

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Account type
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setRole("customer")}
            className={`rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
              role === "customer"
                ? "border-brand-600 bg-brand-50 text-brand-700"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Customer
          </button>
          <button
            type="button"
            onClick={() => setRole("store_owner")}
            className={`rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
              role === "store_owner"
                ? "border-brand-600 bg-brand-50 text-brand-700"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Store Owner
          </button>
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <Button type="submit" loading={loading} className="w-full" size="lg">
        Create account
      </Button>
    </form>
  );
}
```
