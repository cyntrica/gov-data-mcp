/**
 * VA SDK — typed API client for Department of Veterans Affairs facilities.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { searchFacilities } from "us-gov-open-data-mcp/sdk/va";
 *
 * Requires VA_API_KEY env var. Signup: https://developer.va.gov/
 * Docs: https://developer.va.gov/explore/api/va-facilities
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://api.va.gov/services",
  name: "va",
  auth: { type: "header", envParams: { apikey: "VA_API_KEY" } },
  rateLimit: { perSecond: 5, burst: 10 },
  cacheTtlMs: 60 * 60 * 1000, // 1 hour
});

// ─── Types ───────────────────────────────────────────────────────────

/** VA facility record. */
export interface VaFacility {
  id?: string;
  type?: string;
  attributes?: {
    name?: string;
    facilityType?: string;
    classification?: string;
    website?: string;
    lat?: number;
    long?: number;
    address?: { physical?: { address1?: string; city?: string; state?: string; zip?: string } };
    phone?: { main?: string };
    hours?: Record<string, string>;
    services?: { health?: string[]; benefits?: string[]; other?: string[] };
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/** VA facilities API response. */
interface FacilitiesResponse {
  data: VaFacility[];
  meta?: { pagination?: { totalEntries?: number; currentPage?: number; perPage?: number; totalPages?: number } };
}

// ═══════════════════════════════════════════════════════════════════════
// FACILITIES
// ═══════════════════════════════════════════════════════════════════════

/**
 * Search VA facilities by state and type.
 *
 * Example:
 *   await searchFacilities({ state: "CA", type: "health", limit: 10 });
 */
export async function searchFacilities(opts: {
  state?: string;
  type?: "health" | "benefits" | "cemetery" | "vet_center";
  limit?: number;
  page?: number;
}): Promise<{ facilities: VaFacility[]; totalEntries: number }> {
  const params = qp({
    state: opts.state,
    type: opts.type,
    per_page: opts.limit ?? 20,
    page: opts.page ?? 1,
  });
  const res = await api.get<FacilitiesResponse>("/va_facilities/v1/facilities", params);
  return {
    facilities: res?.data ?? [],
    totalEntries: res?.meta?.pagination?.totalEntries ?? 0,
  };
}

/** Clear VA API cache. */
export function clearCache(): void {
  api.clearCache();
}
