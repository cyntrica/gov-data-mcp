/**
 * ISO-NE SDK — typed API client for ISO New England.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { getLoad, getFuelMix } from "us-gov-open-data-mcp/sdk/iso-ne";
 *
 * Requires ISO_NE_USERNAME and ISO_NE_PASSWORD env vars.
 * Register at https://www.iso-ne.com/markets-operations/iso-express
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

// ISO-NE uses HTTP Basic Auth via a pre-built Authorization header.
// The env var ISO_NE_AUTH should be set to "Basic <base64(user:pass)>".
// If not set, requests will be unauthenticated (limited access).
const api = createClient({
  baseUrl: "https://webservices.iso-ne.com/api/v1.1",
  name: "iso-ne",
  auth: {
    type: "header",
    envParams: { Authorization: "ISO_NE_AUTH" },
  },
  defaultHeaders: {
    Accept: "application/json",
  },
  rateLimit: { perSecond: 3, burst: 6 },
  cacheTtlMs: 5 * 60 * 1000, // 5 minutes — real-time data
});

// ─── Types ───────────────────────────────────────────────────────────

/** ISO-NE generation fuel mix response. */
export interface IsoneGenFuelMixResponse {
  GenFuelMixes?: {
    GenFuelMix?: IsoneFuelMixEntry[];
  };
  [key: string]: unknown;
}

/** Individual fuel mix entry. */
export interface IsoneFuelMixEntry {
  BeginDate?: string;
  FuelCategory?: string;
  FuelCategoryRollup?: string;
  GenMw?: number | null;
  MarginalFlag?: string;
  [key: string]: unknown;
}

/** ISO-NE system load response. */
export interface IsoneLoadResponse {
  FiveMinSystemLoads?: {
    FiveMinSystemLoad?: IsoneLoadEntry[];
  };
  SystemLoads?: {
    SystemLoad?: IsoneLoadEntry[];
  };
  [key: string]: unknown;
}

/** Individual load entry. */
export interface IsoneLoadEntry {
  BeginDate?: string;
  LoadMw?: number | null;
  NativeLoad?: number | null;
  ArdDemand?: number | null;
  [key: string]: unknown;
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Get current system load/demand.
 */
export async function getLoad(): Promise<IsoneLoadResponse> {
  return api.get<IsoneLoadResponse>("/fiveminutesystemload/current.json");
}

/**
 * Get current generation fuel mix breakdown.
 */
export async function getFuelMix(): Promise<IsoneGenFuelMixResponse> {
  return api.get<IsoneGenFuelMixResponse>("/genfuelmix/current.json");
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
