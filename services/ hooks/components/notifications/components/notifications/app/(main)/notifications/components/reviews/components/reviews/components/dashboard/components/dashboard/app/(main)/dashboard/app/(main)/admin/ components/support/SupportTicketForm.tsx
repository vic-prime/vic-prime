"use client";

import { useState, type FormEvent } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function SupportTicketForm() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    // Simulate API call - replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSuccess(true);
    setSubject("");
    setMessage("");
    setLoading(false);
  };

  if (success) {
    return (
      <Card className="border-green-200 bg-green-50 text-center">
        <p className="text-lg font-semibold text-green-900">
          Support Ticket Submitted!
        </p>
        <p className="mt-2 text-sm text-green-700">
          Our team will respond to you soon.
        </p>
      </Card>
    );
  }

  return (
    <Card className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Contact Support</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          label="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="What do you need help with?"
          required
        />
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your issue..."
            rows={5}
            required
            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
        </div>
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
        <Button type="submit" loading={loading} className="w-full">
          Submit Ticket
        </Button>
      </form>
    </Card>
  );
}
