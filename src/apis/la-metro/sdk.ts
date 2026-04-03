/**
 * LA Metro SDK — typed API client for Los Angeles County Metropolitan Transportation Authority.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { getVehicles, getRoutes, getStops } from "us-gov-open-data-mcp/sdk/la-metro";
 *
 *   const vehicles = await getVehicles();
 *   const routes = await getRoutes();
 *   const stops = await getStops({ route: "720" });
 *
 * No API key required.
 * Docs: https://developer.metro.net/
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://api.metro.net",
  name: "la-metro",
  rateLimit: { perSecond: 5, burst: 10 },
  cacheTtlMs: 60 * 1000, // 1 minute — real-time data
});

// ─── Types ───────────────────────────────────────────────────────────

/** Vehicle position. */
export interface LaMetroVehicle {
  id?: string;
  latitude?: number;
  longitude?: number;
  current_stop_sequence?: number;
  current_status?: string;
  timestamp?: number;
  stop_id?: string;
  trip_id?: string;
  route_id?: string;
  vehicle_id?: string;
  [key: string]: unknown;
}

/** Route info. */
export interface LaMetroRoute {
  id?: string;
  route_id?: string;
  route_short_name?: string;
  route_long_name?: string;
  route_type?: number;
  route_color?: string;
  route_text_color?: string;
  agency_id?: string;
  [key: string]: unknown;
}

/** Stop info. */
export interface LaMetroStop {
  id?: string;
  stop_id?: string;
  stop_name?: string;
  stop_lat?: number;
  stop_lon?: number;
  stop_code?: string;
  zone_id?: string;
  [key: string]: unknown;
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Get real-time vehicle positions for all LA Metro buses and rail.
 */
export async function getVehicles(): Promise<unknown> {
  return api.get<unknown>("/LACMTA/vehicle_positions/all");
}

/**
 * List all LA Metro routes.
 */
export async function getRoutes(): Promise<unknown> {
  return api.get<unknown>("/LACMTA/routes");
}

/**
 * List stops, optionally filtered by route code.
 */
export async function getStops(opts?: {
  route?: string;
}): Promise<unknown> {
  const params = qp({
    route_code: opts?.route,
  });
  return api.get<unknown>("/LACMTA/stops", params);
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
