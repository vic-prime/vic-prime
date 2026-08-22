```tsx
"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ApiError } from "@/lib/api";
import { clearAccessToken, getAccessToken, setAccessToken } from "@/lib/auth-token";
import { authService, type RegisterPayload } from "@/services/auth.service";
import type { User } from "@/types";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const refresh = useCallback(async () => {
    const token = getAccessToken();

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const currentUser = await authService.me();
      setUser(currentUser);
    } catch (err) {
      clearAccessToken();
      setUser(null);

      if (err instanceof ApiError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const login = useCallback(async (email: string, password: string) => {
    clearError();
    setLoading(true);

    try {
      const response = await authService.login({ email, password });
      setAccessToken(response.token);
      setUser(response.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [clearError]);

  const register = useCallback(async (payload: RegisterPayload) => {
    clearError();
    setLoading(true);

    try {
      const response = await authService.register(payload);
      setAccessToken(response.token);
      setUser(response.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [clearError]);

  const logout = useCallback(async () => {
    clearError();

    try {
      await authService.logout();
    } finally {
      clearAccessToken();
      setUser(null);
    }
  }, [clearError]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      error,
      login,
      register,
      logout,
      refresh,
      setUser,
    }),
    [error, loading, login, logout, refresh, register, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
```
