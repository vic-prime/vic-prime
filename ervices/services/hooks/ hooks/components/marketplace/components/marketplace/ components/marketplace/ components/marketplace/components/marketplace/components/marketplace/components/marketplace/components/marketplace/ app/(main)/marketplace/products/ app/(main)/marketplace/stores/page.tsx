import type { Metadata } from "next";
import { StoreList } from "@/components/marketplace/StoreList";
import { StoreSearch } from "@/components/marketplace/StoreSearch";
import { StoreCategoryFilter } from "@/components/marketplace/StoreCategoryFilter";

export const metadata: Metadata = {
  title: "Stores",
};

export default function StoresPage({
  searchParams,
}: {
  searchParams?: { category?: string; search?: string; page?: string };
}) {
  const category = searchParams?.category || "";
  const search = searchParams?.search || "";
  const page = searchParams?.page ? parseInt(searchParams.page, 10) : 1;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Stores</h1>
        <StoreSearch initialValue={search} />
        <StoreCategoryFilter currentCategory={category} />
      </div>
      <StoreList category={category} search={search} page={page} />
    </div>
  );
}
