/**
 * JPL SDK — typed API client for NASA JPL Solar System Dynamics APIs.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { getCloseApproaches, getSmallBody, getFireballs } from "us-gov-open-data-mcp/sdk/jpl";
 *
 * No API key required.
 * Docs: https://ssd-api.jpl.nasa.gov/
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://ssd-api.jpl.nasa.gov",
  name: "jpl",
  rateLimit: { perSecond: 3, burst: 6 },
  cacheTtlMs: 60 * 60 * 1000, // 1 hour
});

// ─── Types ───────────────────────────────────────────────────────────

/** Close approach data — CAD API returns parallel arrays in `fields` and `data`. */
export interface CadResponse {
  signature?: { version?: string; source?: string };
  count?: number;
  fields?: string[];
  data?: string[][];
}

/** Small body database lookup response. */
export interface SbdbResponse {
  object?: {
    fullname?: string;
    kind?: string;
    des?: string;
    spkid?: string;
    orbit_class?: { name?: string; code?: string };
    pha?: boolean;
    neo?: boolean;
    [key: string]: unknown;
  };
  orbit?: {
    elements?: Record<string, unknown>[];
    [key: string]: unknown;
  };
  phys_par?: Record<string, unknown>[];
  ca_data?: string[][];
  ca_fields?: string[];
  [key: string]: unknown;
}

/** Fireball API response. */
export interface FireballResponse {
  signature?: { version?: string; source?: string };
  count?: number;
  fields?: string[];
  data?: string[][];
}

// ═══════════════════════════════════════════════════════════════════════
// CLOSE APPROACHES
// ═══════════════════════════════════════════════════════════════════════

/**
 * Get asteroid/comet close approaches to Earth.
 *
 * Example:
 *   await getCloseApproaches({ dateMin: "2024-01-01", dateMax: "2024-12-31", distMax: "0.05" });
 */
export async function getCloseApproaches(opts: {
  dateMin?: string;
  dateMax?: string;
  distMax?: string;
  limit?: number;
}): Promise<{ count: number; fields: string[]; data: string[][] }> {
  const params = qp({
    "date-min": opts.dateMin,
    "date-max": opts.dateMax,
    "dist-max": opts.distMax,
    body: "Earth",
    sort: "dist",
    limit: opts.limit ?? 20,
  });
  const res = await api.get<CadResponse>("/cad.api", params);
  return {
    count: res?.count ?? 0,
    fields: res?.fields ?? [],
    data: res?.data ?? [],
  };
}

// ═══════════════════════════════════════════════════════════════════════
// SMALL BODY DATABASE
// ═══════════════════════════════════════════════════════════════════════

/**
 * Look up asteroid/comet orbital data by name, designation, or SPK-ID.
 *
 * Example:
 *   await getSmallBody("Apophis");
 *   await getSmallBody("2023 DW");
 */
export async function getSmallBody(name: string): Promise<SbdbResponse> {
  const params = qp({
    sstr: name,
    "phys-par": "true",
    "close-approach": "true",
  });
  const res = await api.get<SbdbResponse>("/sbdb.api", params);
  return res ?? {};
}

// ═══════════════════════════════════════════════════════════════════════
// FIREBALLS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Get reported fireball/bolide events.
 *
 * Example:
 *   await getFireballs({ dateMin: "2024-01-01", dateMax: "2024-12-31", limit: 20 });
 */
export async function getFireballs(opts: {
  dateMin?: string;
  dateMax?: string;
  limit?: number;
}): Promise<{ count: number; fields: string[]; data: string[][] }> {
  const params = qp({
    "date-min": opts.dateMin,
    "date-max": opts.dateMax,
    limit: opts.limit ?? 20,
  });
  const res = await api.get<FireballResponse>("/fireball.api", params);
  return {
    count: res?.count ?? 0,
    fields: res?.fields ?? [],
    data: res?.data ?? [],
  };
}

/** Clear JPL API cache. */
export function clearCache(): void {
  api.clearCache();
}
