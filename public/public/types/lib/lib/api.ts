```ts
import { getAccessToken } from "./auth-token";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://vic-prime.fonvicnuelfondom.workers.dev";

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

type RequestOptions = Omit<RequestInit, "body" | "headers"> & {
  body?: unknown;
  formData?: FormData;
  headers?: HeadersInit;
  auth?: boolean;
};

function getErrorMessage(data: unknown, fallback = "An unexpected error occurred"): string {
  if (typeof data === "string" && data.trim()) {
    return data;
  }

  if (data && typeof data === "object") {
    const obj = data as Record<string, unknown>;
    const message = obj.message ?? obj.error ?? obj.detail;

    if (typeof message === "string" && message.trim()) {
      return message;
    }
  }

  return fallback;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const {
    auth = true,
    body,
    formData,
    headers,
    ...rest
  } = options;

  const finalHeaders = new Headers(headers);

  if (auth) {
    const token = getAccessToken();

    if (token) {
      finalHeaders.set("Authorization", `Bearer ${token}`);
    }
  }

  let finalBody: BodyInit | undefined;

  if (formData) {
    finalBody = formData;
  } else if (body !== undefined) {
    finalHeaders.set("Content-Type", "application/json");
    finalBody = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: finalHeaders,
    body: finalBody,
  });

  const contentType = response.headers.get("content-type");
  let data: unknown = null;

  try {
    data = contentType?.includes("application/json")
      ? await response.json()
      : await response.text();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new ApiError(
      response.status,
      getErrorMessage(data, `Request failed with status ${response.status}`),
      data,
    );
  }

  return data as T;
}

export const apiGet = <T>(path: string, options: Omit<RequestOptions, "method"> = {}) =>
  request<T>(path, { ...options, method: "GET" });

export const apiPost = <T>(path: string, options: Omit<RequestOptions, "method"> = {}) =>
  request<T>(path, { ...options, method: "POST" });

export const apiPatch = <T>(path: string, options: Omit<RequestOptions, "method"> = {}) =>
  request<T>(path, { ...options, method: "PATCH" });

export const apiDelete = <T>(path: string, options: Omit<RequestOptions, "method"> = {}) =>
  request<T>(path, { ...options, method: "DELETE" });

export const endpoints = {
  auth: {
    register: "/api/auth/register",
    login: "/api/auth/login",
    me: "/api/auth/me",
    logout: "/api/auth/logout",
    forgot: "/api/auth/forgot",
    reset: "/api/auth/reset",
  },
  users: {
    me: "/api/users/me",
    get: (id: string) => `/api/users/${id}`,
    follow: (id: string) => `/api/users/${id}/follow`,
  },
  stores: {
    list: "/api/stores",
    get: (id: string) => `/api/stores/${id}`,
    products: (storeId: string) => `/api/stores/${storeId}/products`,
    services: (storeId: string) => `/api/stores/${storeId}/services`,
    posts: (storeId: string) => `/api/stores/${storeId}/posts`,
    reviews: (storeId: string) => `/api/stores/${storeId}/reviews`,
    follow: (storeId: string) => `/api/stores/${storeId}/follow`,
  },
  products: {
    list: "/api/products",
    create: "/api/products",
    get: (id: string) => `/api/products/${id}`,
    update: (id: string) => `/api/products/${id}`,
    delete: (id: string) => `/api/products/${id}`,
    reviews: (productId: string) => `/api/products/${productId}/reviews`,
  },
  feed: {
    list: "/api/feed",
    createPost: "/api/posts",
    getPost: (id: string) => `/api/posts/${id}`,
    like: (id: string) => `/api/posts/${id}/like`,
    comments: (id: string) => `/api/posts/${id}/comments`,
    share: (id: string) => `/api/posts/${id}/share`,
    save: (id: string) => `/api/posts/${id}/save`,
    report: (id: string) => `/api/posts/${id}/report`,
  },
  chat: {
    conversations: "/api/conversations",
    create: "/api/conversations",
    getConversation: (id: string) => `/api/conversations/${id}`,
    messages: (id: string) => `/api/conversations/${id}/messages`,
    send: (id: string) => `/api/conversations/${id}/messages`,
    read: (id: string) => `/api/conversations/${id}/read`,
  },
  live: {
    list: "/api/live",
    create: "/api/live",
    get: (id: string) => `/api/live/${id}`,
    start: (id: string) => `/api/live/${id}/start`,
    end: (id: string) => `/api/live/${id}/end`,
    comments: (id: string) => `/api/live/${id}/comments`,
    products: (id: string) => `/api/live/${id}/products`,
    viewers: (id: string) => `/api/live/${id}/viewers`,
  },
  gifts: {
    list: "/api/gifts",
    send: (liveId: string) => `/api/live/${liveId}/gift`,
    leaderboard: (liveId: string) => `/api/live/${liveId}/gift-leaderboard`,
  },
  crownCoins: {
    balance: "/api/crown-coins/balance",
    packages: "/api/crown-coins/packages",
    purchase: "/api/crown-coins/purchase",
    transactions: "/api/crown-coins/transactions",
  },
  payments: {
    flutterwaveInitialize: "/api/payments/flutterwave/initialize",
    flutterwaveWebhook: "/api/payments/flutterwave/webhook",
  },
  vicCoins: {
    balance: "/api/vic-coins/balance",
    transactions: "/api/vic-coins/transactions",
    purchase: "/api/vic-coins/purchase",
  },
  promotions: {
    list: "/api/promotions",
    create: "/api/promotions",
    get: (id: string) => `/api/promotions/${id}`,
  },
  notifications: {
    list: "/api/notifications",
    read: (id: string) => `/api/notifications/${id}/read`,
    readAll: "/api/notifications/read-all",
  },
  reviews: {
    list: "/api/reviews",
    create: "/api/reviews",
  },
  support: {
    tickets: "/api/support",
    messages: (id: string) => `/api/support/${id}/messages`,
  },
};
```
