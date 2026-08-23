import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/api";

/**
 * SECURE PROXY ROUTE FOR FLUTTERWAVE PAYMENT STATUS
 * 
 * Returns the current status of a payment transaction.
 * Status is determined by the backend, which has the authoritative record.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { txRef: string } },
) {
  try {
    const { txRef } = params;

    if (!txRef) {
      return NextResponse.json(
        { error: "Transaction reference is required" },
        { status: 400 },
      );
    }

    // Query the backend for payment status
    const response = await fetch(
      `${API_BASE_URL}/api/payments/flutterwave/status/${txRef}`,
      {
        method: "GET",
        headers: {
          Authorization: request.headers.get("Authorization") || "",
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || data.message || "Failed to get payment status" },
        { status: response.status },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Payment status error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
