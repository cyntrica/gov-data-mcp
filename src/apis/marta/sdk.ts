/**
 * MARTA SDK — typed API client for MARTA real-time rail data.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { getTrainArrivals } from "us-gov-open-data-mcp/sdk/marta";
 *
 *   const arrivals = await getTrainArrivals();
 *
 * Requires MARTA_API_KEY env var.
 * Signup: https://itsmarta.com/app-developer-resources.aspx
 */

import { createClient } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://developerservices.itsmarta.com:18096/itsmarta",
  name: "marta",
  auth: {
    type: "query",
    envParams: { apiKey: "MARTA_API_KEY" },
  },
  rateLimit: { perSecond: 3, burst: 6 },
  cacheTtlMs: 15 * 1000, // 15 seconds — real-time data
});

// ─── Types ───────────────────────────────────────────────────────────

/** MARTA train arrival record. */
export interface MartaTrainArrival {
  DESTINATION?: string;
  DIRECTION?: string;
  EVENT_TIME?: string;
  LINE?: string;
  NEXT_ARR?: string;
  STATION?: string;
  TRAIN_ID?: string;
  WAITING_SECONDS?: string;
  LATITUDE?: string;
  LONGITUDE?: string;
  [key: string]: unknown;
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Get real-time train arrivals for the entire MARTA rail system.
 *
 * Example:
 *   const arrivals = await getTrainArrivals();
 */
export async function getTrainArrivals(): Promise<MartaTrainArrival[]> {
  const data = await api.get<MartaTrainArrival[]>(
    "/railrealtimearrivals/developerservices/traindata",
  );
  return Array.isArray(data) ? data : [];
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
