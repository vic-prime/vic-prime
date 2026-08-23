import type { Metadata } from "next";
import { SupportTicketForm } from "@/components/support/SupportTicketForm";

export const metadata: Metadata = {
  title: "Support",
};

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-2 text-2xl font-bold text-gray-900">Support</h1>
      <p className="mb-6 text-gray-600">
        Need help? Submit a support ticket and our team will assist you.
      </p>
      <SupportTicketForm />
    </div>
  );
}
