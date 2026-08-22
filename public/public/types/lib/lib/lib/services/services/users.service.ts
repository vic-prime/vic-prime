```ts
import { apiDelete, apiGet, apiPatch, apiPost, endpoints } from "@/lib/api";
import type { User } from "@/types";

export interface UpdateProfilePayload {
  username?: string;
  full_name?: string;
  avatar_url?: string;
}

export const usersService = {
  get: (id: string) => apiGet<User>(endpoints.users.get(id)),

  updateProfile: (payload: UpdateProfilePayload) =>
    apiPatch<User>(endpoints.users.me, { body: payload }),

  follow: (id: string) =>
    apiPost<{ success: boolean }>(endpoints.users.follow(id)),

  unfollow: (id: string) =>
    apiDelete<{ success: boolean }>(endpoints.users.follow(id)),
};
```
