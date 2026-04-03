/**
 * FOIA.gov SDK — typed API client for Freedom of Information Act data.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { getAgencies, getAnnualReport } from "us-gov-open-data-mcp/sdk/foia";
 *
 *   const agencies = await getAgencies();
 *   const report = await getAnnualReport("DOJ");
 *
 * No API key required.
 * Docs: https://www.foia.gov/developer/
 */

import { createClient } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const client = createClient({
  baseUrl: "https://www.foia.gov/api",
  name: "foia",
  rateLimit: { perSecond: 2, burst: 5 },
  cacheTtlMs: 60 * 60 * 1000, // 1 hour — FOIA data updates infrequently
});

// ─── Types ───────────────────────────────────────────────────────────

export interface FoiaAgencyResponse {
  data: Record<string, unknown>[];
  [key: string]: unknown;
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * List all federal agencies with FOIA contact information.
 *
 * Example:
 *   const data = await getAgencies();
 *   console.log(data.data.length);
 */
export async function getAgencies(): Promise<FoiaAgencyResponse> {
  return client.get<FoiaAgencyResponse>("/agency_components");
}

/**
 * Get annual FOIA report statistics for an agency.
 *
 * Example:
 *   const report = await getAnnualReport("DOJ");
 */
export async function getAnnualReport(agencyAbbreviation: string): Promise<Record<string, unknown>> {
  return client.get<Record<string, unknown>>(`/annual_foia_report/component/${encodeURIComponent(agencyAbbreviation)}`);
}

/** Clear cached responses. */
export function clearCache(): void {
  client.clearCache();
}
