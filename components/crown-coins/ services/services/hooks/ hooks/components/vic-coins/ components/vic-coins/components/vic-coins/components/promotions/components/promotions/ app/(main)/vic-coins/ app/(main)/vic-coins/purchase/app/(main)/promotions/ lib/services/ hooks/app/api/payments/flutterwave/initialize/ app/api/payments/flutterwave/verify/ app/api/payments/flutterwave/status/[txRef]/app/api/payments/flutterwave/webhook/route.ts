import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/api";

/**
 * SECURE WEBHOOK PROXY ROUTE
 * 
 * This endpoint receives Flutterwave webhooks.
 * 
 * IMPORTANT SECURITY NOTES:
 * - The webhook signature must be verified by the backend
 * - The backend verifies the transaction directly with Flutterwave
 * - Crown Coins are credited ONLY after server-side verification
 * - Idempotency: The same webhook can be safely received multiple times
 * - The backend ensures Crown Coins are credited exactly once
 */
export async function POST(request: NextRequest) {
  try {
    // Get the raw body for signature verification
    const rawBody = await request.text();
    const signature = request.headers.get("verif-hash") || "";

    if (!signature) {
      return NextResponse.json(
        { error: "Webhook signature is required" },
        { status: 401 },
      );
    }

    let body: Record<string, unknown>;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { error: "Invalid webhook payload" },
        { status: 400 },
      );
    }

    // Forward the webhook to the Cloudflare Worker backend
    // The backend verifies the signature and transaction with Flutterwave
    const response = await fetch(
      `${API_BASE_URL}/api/payments/flutterwave/webhook`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "verif-hash": signature,
        },
        body: rawBody,
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || data.message || "Webhook processing failed" },
        { status: response.status },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
