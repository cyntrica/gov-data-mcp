/**
 * PATH Train SDK — typed API client for PATH real-time arrival data.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { getArrivals } from "us-gov-open-data-mcp/sdk/path-train";
 *
 *   const arrivals = await getArrivals();
 *
 * No API key required.
 */

import { createClient } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://www.panynj.gov/bin/portauthority",
  name: "path-train",
  rateLimit: { perSecond: 3, burst: 6 },
  cacheTtlMs: 30 * 1000, // 30 seconds — real-time data
});

// ─── Types ───────────────────────────────────────────────────────────

/** PATH station arrival data. */
export interface PathStationData {
  stationName?: string;
  stationCode?: string;
  arrivals?: PathArrival[];
  [key: string]: unknown;
}

/** Individual PATH train arrival. */
export interface PathArrival {
  lineName?: string;
  lineColor?: string;
  projectedArrival?: string;
  lastUpdated?: string;
  status?: string;
  headSign?: string;
  direction?: string;
  [key: string]: unknown;
}

/** PATH arrivals API response. */
export interface PathResponse {
  results?: PathStationData[];
  [key: string]: unknown;
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Get real-time PATH train arrivals for all stations.
 *
 * Example:
 *   const data = await getArrivals();
 */
export async function getArrivals(): Promise<PathStationData[]> {
  const data = await api.get<PathResponse>("/ridepath.json");
  return data.results ?? [];
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
