```ts
export function cn(...classes: Array<string | null | false | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function buildQuery(params?: Record<string, string | number | boolean | undefined>): string {
  if (!params) {
    return "";
  }

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

export function formatCurrency(amount: number, currency = "XOF"): string {
  try {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
}

export function formatNumber(value: number): string {
  try {
    return new Intl.NumberFormat("en-US").format(value);
  } catch {
    return String(value);
  }
}

export function timeAgo(date: string | number | Date): string {
  const timestamp = new Date(date).getTime();

  if (Number.isNaN(timestamp)) {
    return "unknown";
  }

  const seconds = Math.round((Date.now() - timestamp) / 1000);

  if (seconds < 60) {
    return "just now";
  }

  const intervals: Record<string, number> = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, intervalSeconds] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / intervalSeconds);

    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

export function getInitials(name?: string): string {
  if (!name) {
    return "VP";
  }

  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return "VP";
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}
```
