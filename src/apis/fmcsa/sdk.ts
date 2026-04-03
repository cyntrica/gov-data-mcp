/**
 * FMCSA SDK — typed API client for Federal Motor Carrier Safety Administration.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { searchCarriersByName, getCarrierDetail } from "us-gov-open-data-mcp/sdk/fmcsa";
 *
 *   const carriers = await searchCarriersByName("Swift");
 *   const detail = await getCarrierDetail(12345);
 *
 * Requires FMCSA_API_KEY env var.
 * Docs: https://mobile.fmcsa.dot.gov/QCDevsite/docs/qcApi
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://mobile.fmcsa.dot.gov/qc/services",
  name: "fmcsa",
  auth: {
    type: "query",
    envParams: { webKey: "FMCSA_API_KEY" },
  },
  rateLimit: { perSecond: 5, burst: 10 },
  cacheTtlMs: 60 * 60 * 1000, // 1 hour
});

// ─── Types ───────────────────────────────────────────────────────────

export interface CarrierRecord {
  dotNumber?: number;
  legalName?: string;
  dbaName?: string;
  carrierOperation?: string;
  phyStreet?: string;
  phyCity?: string;
  phyState?: string;
  phyZipcode?: string;
  phyCountry?: string;
  totalDrivers?: number;
  totalPowerUnits?: number;
  safetyRating?: string;
  safetyRatingDate?: string;
  [key: string]: unknown;
}

interface FmcsaResponse {
  content?: CarrierRecord[];
  [key: string]: unknown;
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Search carriers by legal name.
 */
export async function searchCarriersByName(name: string): Promise<CarrierRecord[]> {
  const encoded = encodeURIComponent(name);
  const data = await api.get<FmcsaResponse>(`/carriers/name/${encoded}`);
  return data.content ?? [];
}

/**
 * Search carriers by state code.
 */
export async function searchCarriersByState(stateCode: string): Promise<CarrierRecord[]> {
  const data = await api.get<FmcsaResponse>("/carriers", qp({ stateCode }));
  return data.content ?? [];
}

/**
 * Get detailed carrier safety profile by DOT number.
 */
export async function getCarrierDetail(dotNumber: number): Promise<CarrierRecord | null> {
  const data = await api.get<FmcsaResponse>(`/carriers/${dotNumber}`);
  return data.content?.[0] ?? null;
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
