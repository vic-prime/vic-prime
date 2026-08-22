```ts
export type Role = "customer" | "store_owner" | "administrator";

export interface User {
  id: string;
  username: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  role: Role;
  created_at: string;
}

export interface Store {
  id: string;
  owner_id: string;
  name: string;
  slug: string;
  logo_url?: string;
  banner_url?: string;
  description?: string;
  category: string;
  location?: string;
  country?: string;
  followers_count: number;
  rating: number;
  products_count: number;
  services_count: number;
  created_at: string;
}

export interface ProductVariation {
  id: string;
  name: string;
  options: string[];
}

export interface Product {
  id: string;
  store_id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  currency: string;
  stock: number;
  category: string;
  images: string[];
  videos: string[];
  variations?: ProductVariation[];
  status: "draft" | "published" | "archived";
  created_at: string;
}

export interface Service {
  id: string;
  store_id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  duration_minutes?: number;
  location?: string;
  category: string;
  status: "draft" | "published" | "archived";
  images: string[];
  created_at: string;
}

export interface Post {
  id: string;
  user_id: string;
  content: string;
  media: string[];
  product_ref?: string;
  store_ref?: string;
  service_ref?: string;
  live_announcement?: boolean;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  saves_count: number;
  created_at: string;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  parent_id?: string;
  likes_count: number;
  created_at: string;
}

export interface LiveStream {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  cover_url?: string;
  status: "scheduled" | "live" | "ended";
  viewer_count: number;
  started_at?: string;
  ended_at?: string;
  products?: string[];
  created_at: string;
}

export interface LiveComment {
  id: string;
  live_id: string;
  user_id: string;
  content: string;
  created_at: string;
}

export interface Gift {
  id: string;
  name: string;
  icon_url?: string;
  crown_coin_value: number;
  status: "active" | "inactive";
  created_at: string;
}

export interface GiftTransaction {
  id: string;
  sender_id: string;
  receiver_id: string;
  live_id: string;
  gift_id: string;
  quantity: number;
  crown_coin_value: number;
  total_crown_coins: number;
  created_at: string;
}

export interface CrownCoinWallet {
  user_id: string;
  balance: number;
  updated_at: string;
}

export interface CrownCoinPackage {
  id: string;
  crown_coins: number;
  price: number;
  currency: string;
  status: "active" | "inactive";
  created_at: string;
}

export interface CrownCoinTransaction {
  id: string;
  user_id: string;
  type: "purchase" | "gift_sent" | "gift_received" | "adjustment" | "refund";
  amount: number;
  balance_after?: number;
  reference?: string;
  created_at: string;
}

export interface VicCoinWallet {
  user_id: string;
  balance: number;
  updated_at: string;
}

export interface VicCoinTransaction {
  id: string;
  user_id: string;
  type: "purchase" | "promotion_spend" | "adjustment" | "refund";
  amount: number;
  reference?: string;
  created_at: string;
}

export interface Promotion {
  id: string;
  user_id: string;
  target_type: "product" | "store" | "post";
  target_id: string;
  vic_coins_spent: number;
  estimated_reach: number;
  status: "pending" | "active" | "completed" | "cancelled";
  created_at: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  last_message?: Message;
  unread_count: number;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  attachments?: string[];
  product_ref?: string;
  store_ref?: string;
  read: boolean;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  body: string;
  data?: Record<string, string>;
  read: boolean;
  created_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  store_id: string;
  rating: number;
  content?: string;
  verified_purchase: boolean;
  created_at: string;
}

export interface PaymentTransaction {
  id: string;
  user_id: string;
  package_id: string;
  provider: string;
  provider_transaction_id?: string;
  tx_ref: string;
  amount: number;
  currency: string;
  crown_coins: number;
  status: "pending" | "successful" | "failed" | "cancelled" | "refunded";
  created_at: string;
  updated_at: string;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
```
