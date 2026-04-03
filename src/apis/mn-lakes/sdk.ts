/**
 * MN Lakes SDK — typed API client for Minnesota DNR LakeFinder.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { searchLakes, nearbyLakes, lakeDetail } from "us-gov-open-data-mcp/sdk/mn-lakes";
 *
 *   const results = await searchLakes({ name: "Mille Lacs" });
 *   const nearby = await nearbyLakes({ lat: 46.2, lon: -94.3, radius: 10 });
 *   const detail = await lakeDetail({ id: "21005700" });
 *
 * No API key required.
 * Docs: http://services.dnr.state.mn.us/api/lakefinder
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ─────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "http://services.dnr.state.mn.us/api/lakefinder",
  name: "mn-lakes",
  rateLimit: { perSecond: 5, burst: 10 },
  cacheTtlMs: 60 * 60 * 1000, // 1 hour — lake data changes very infrequently
});

// ─── Types ──────────────────────────────────────────────────────────

/** MN lake summary. */
export interface MnLake {
  id?: string;
  name?: string;
  county?: string;
  "nearest-town"?: string;
  acres?: number;
  "max-depth"?: number;
  [key: string]: unknown;
}

/** MN lake detail (includes fish species, surveys, etc.). */
export interface MnLakeDetail extends MnLake {
  fish?: Array<{
    species?: string;
    [key: string]: unknown;
  }>;
  surveys?: Array<{
    type?: string;
    date?: string;
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
}

// ─── Public API ─────────────────────────────────────────────────────

/**
 * Search Minnesota lakes by name.
 *
 * Example:
 *   const results = await searchLakes({ name: "Mille Lacs" });
 */
export async function searchLakes(opts: {
  name: string;
}): Promise<unknown> {
  const params = qp({ name: opts.name });
  return api.get("/by_name/v1", params);
}

/**
 * Find lakes near a latitude/longitude point.
 *
 * Example:
 *   const nearby = await nearbyLakes({ lat: 46.2, lon: -94.3, radius: 10 });
 */
export async function nearbyLakes(opts: {
  lat: number;
  lon: number;
  radius?: number;
}): Promise<unknown> {
  const params = qp({
    lat: opts.lat,
    lon: opts.lon,
    radius: opts.radius ?? 5,
  });
  return api.get("/by_point/v1", params);
}

/**
 * Get full lake details by ID including fish species, surveys, and water quality.
 *
 * Example:
 *   const detail = await lakeDetail({ id: "21005700" });
 */
export async function lakeDetail(opts: {
  id: string;
}): Promise<unknown> {
  const params = qp({ id: opts.id });
  return api.get("/by_id/v1", params);
}

/** Clear MN Lakes cache. */
export function clearCache(): void {
  api.clearCache();
}
