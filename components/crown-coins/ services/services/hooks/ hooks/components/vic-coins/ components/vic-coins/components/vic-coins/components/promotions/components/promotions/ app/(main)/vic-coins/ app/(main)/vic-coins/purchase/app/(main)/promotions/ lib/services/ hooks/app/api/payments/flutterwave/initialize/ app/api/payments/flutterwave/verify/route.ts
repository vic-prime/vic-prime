import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/api";

/**
 * SECURE PROXY ROUTE FOR FLUTTERWAVE PAYMENT VERIFICATION
 * 
 * This route proxies verification requests to the Cloudflare Worker backend.
 * The backend verifies directly with Flutterwave's API using the secret key.
 * The frontend NEVER has access to the secret key.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.tx_ref) {
      return NextResponse.json(
        { error: "Transaction reference is required" },
        { status: 400 },
      );
    }

    // Forward verification request to Cloudflare Worker
    const response = await fetch(
      `${API_BASE_URL}/api/payments/flutterwave/verify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: request.headers.get("Authorization") || "",
        },
        body: JSON.stringify({ tx_ref: body.tx_ref }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || data.message || "Verification failed" },
        { status: response.status },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
