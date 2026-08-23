import { Spinner } from "@/components/ui/Spinner";

export default function LoadingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <Spinner className="h-10 w-10 text-brand-600" />
        <p className="mt-4 text-sm text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
