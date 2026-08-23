import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { Store } from "@/types";

export function StoreCard({ store }: { store: Store }) {
  return (
    <Link href={`/marketplace/stores/${store.id}`}>
      <Card className="group flex items-center gap-4 p-4 transition-shadow hover:shadow-md">
        <img
          src={store.logo_url || "/default-avatar.svg"}
          alt={store.name}
          className="h-16 w-16 rounded-xl object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{store.name}</h3>
          <p className="text-xs text-gray-500">
            {store.category} · {store.followers_count} followers
          </p>
        </div>
      </Card>
    </Link>
  );
}
