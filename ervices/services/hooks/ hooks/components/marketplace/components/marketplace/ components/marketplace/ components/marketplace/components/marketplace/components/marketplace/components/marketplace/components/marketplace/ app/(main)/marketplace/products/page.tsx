import type { Metadata } from "next";
import { ProductList } from "@/components/marketplace/ProductList";
import { CategoryFilter } from "@/components/marketplace/CategoryFilter";
import { SearchBar } from "@/components/marketplace/SearchBar";

export const metadata: Metadata = {
  title: "Products",
};

export default function ProductsPage({
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
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <SearchBar initialValue={search} />
        <CategoryFilter currentCategory={category} />
      </div>
      <ProductList category={category} search={search} page={page} />
    </div>
  );
}
