import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { storesService } from "@/services/stores.service";
import { StoreDetail } from "@/components/marketplace/StoreDetail";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const store = await storesService.get(params.id);
    return {
      title: store.name,
      description: store.description,
    };
  } catch {
    return { title: "Store" };
  }
}

export default async function StoreDetailPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const store = await storesService.get(params.id);
    return <StoreDetail store={store} />;
  } catch {
    notFound();
  }
}
