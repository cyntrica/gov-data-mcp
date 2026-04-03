/**
 * SAMHSA SDK — FindTreatment.gov treatment facility locator.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { searchTreatment } from "us-gov-open-data-mcp/sdk/samhsa";
 *
 *   const facilities = await searchTreatment({ address: "Washington, DC", serviceType: "MH" });
 *
 * No API key required.
 * Docs: https://findtreatment.gov/
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://findtreatment.gov/locator/api",
  name: "samhsa",
  rateLimit: { perSecond: 2, burst: 5 },
  cacheTtlMs: 60 * 60 * 1000, // 1 hour — facility data changes infrequently
});

// ─── Types ──────────────────────────────────────────────────────────

export interface TreatmentFacility {
  name1: string;
  name2: string;
  street1: string;
  street2: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  website: string;
  typeFacility: string;
  services: string[];
  latitude: number;
  longitude: number;
}

// ─── Functions ──────────────────────────────────────────────────────

/**
 * Search for substance abuse and mental health treatment facilities.
 */
export async function searchTreatment(opts: {
  address: string;
  serviceType?: string;
  limit?: number;
}): Promise<TreatmentFacility[]> {
  const params = qp({
    sAddr: opts.address,
    sType: opts.serviceType ?? "BOTH",
    limitValue: opts.limit ?? 25,
  });
  const data = await api.get<{ rows?: TreatmentFacility[] }>("/", params);
  return data?.rows ?? [];
}

export const clearCache = () => api.clearCache();
