import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/api";

/**
 * SECURE PROXY ROUTE FOR FLUTTERWAVE PAYMENT INITIALIZATION
 * 
 * This route acts as a secure proxy to the Cloudflare Worker backend.
 * It ensures that sensitive operations are handled server-side.
 * 
 * The actual Flutterwave secret key is NEVER exposed to the browser.
 * The Cloudflare Worker handles the actual Flutterwave API call.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.package_id) {
      return NextResponse.json(
        { error: "Package ID is required" },
        { status: 400 },
      );
    }

    // Forward the request to the Cloudflare Worker backend
    const response = await fetch(
      `${API_BASE_URL}/api/crown-coins/purchase`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: request.headers.get("Authorization") || "",
        },
        body: JSON.stringify(body),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || data.message || "Payment initialization failed" },
        { status: response.status },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Payment initialization error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
