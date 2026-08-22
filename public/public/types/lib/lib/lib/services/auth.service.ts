```ts
import { apiGet, apiPost, endpoints } from "@/lib/api";
import type { User } from "@/types";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  full_name?: string;
  role?: "customer" | "store_owner";
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const authService = {
  login: (payload: LoginPayload) =>
    apiPost<AuthResponse>(endpoints.auth.login, {
      body: payload,
      auth: false,
    }),

  register: (payload: RegisterPayload) =>
    apiPost<AuthResponse>(endpoints.auth.register, {
      body: payload,
      auth: false,
    }),

  me: () => apiGet<User>(endpoints.auth.me),

  logout: () => apiPost<{ success: boolean }>(endpoints.auth.logout),

  forgotPassword: (email: string) =>
    apiPost<{ success: boolean }>(endpoints.auth.forgot, {
      body: { email },
      auth: false,
    }),

  resetPassword: (token: string, password: string) =>
    apiPost<{ success: boolean }>(endpoints.auth.reset, {
      body: { token, password },
      auth: false,
    }),
};
```
