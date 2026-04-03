/**
 * TriMet SDK — typed API client for TriMet real-time transit data.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { getArrivals } from "us-gov-open-data-mcp/sdk/trimet";
 *
 *   const arrivals = await getArrivals({ stopId: "8989" });
 *
 * Requires TRIMET_APP_ID env var.
 * Signup: https://developer.trimet.org/
 */

import { createClient } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://developer.trimet.org/ws/V1",
  name: "trimet",
  auth: {
    type: "query",
    envParams: { appID: "TRIMET_APP_ID" },
  },
  rateLimit: { perSecond: 5, burst: 10 },
  cacheTtlMs: 30 * 1000, // 30 seconds — real-time data
});

// ─── Types ───────────────────────────────────────────────────────────

/** Single arrival record from TriMet. */
export interface TriMetArrival {
  locid?: number;
  dir?: number;
  lat?: number;
  lng?: number;
  route?: number;
  shortSign?: string;
  fullSign?: string;
  estimated?: string;
  scheduled?: string;
  status?: string;
  blockID?: number;
  tripID?: string;
  departed?: boolean;
  detour?: boolean;
  piece?: string;
  [key: string]: unknown;
}

/** TriMet arrivals API response. */
export interface TriMetArrivalsResponse {
  resultSet: {
    arrival?: TriMetArrival[];
    queryTime?: string;
    [key: string]: unknown;
  };
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Get real-time arrivals for a TriMet stop location.
 *
 * Example:
 *   const data = await getArrivals({ stopId: "8989" });
 */
export async function getArrivals(opts: {
  stopId: string;
}): Promise<TriMetArrival[]> {
  const data = await api.get<TriMetArrivalsResponse>("/arrivals", {
    locIDs: opts.stopId,
    json: "true",
  });
  return data.resultSet?.arrival ?? [];
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
