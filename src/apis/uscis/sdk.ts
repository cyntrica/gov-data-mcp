/**
 * USCIS SDK — typed API client for U.S. Citizenship and Immigration Services.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { getCaseStatus } from "us-gov-open-data-mcp/sdk/uscis";
 *
 *   const status = await getCaseStatus("EAC2190000001");
 *
 * No API key required (public endpoint).
 * Docs: https://egov.uscis.gov/casestatus/
 */

import { createClient } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://egov.uscis.gov/csol/api",
  name: "uscis",
  rateLimit: { perSecond: 2, burst: 5 },
  cacheTtlMs: 5 * 60 * 1000, // 5 minutes — case status can change
});

// ─── Types ───────────────────────────────────────────────────────────

export interface CaseStatus {
  receiptNumber?: string;
  formType?: string;
  caseStatus?: string;
  caseStatusDescription?: string;
  latestAction?: string;
  latestActionDate?: string;
  [key: string]: unknown;
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Check case status by receipt number.
 */
export async function getCaseStatus(receiptNumber: string): Promise<CaseStatus> {
  return api.get<CaseStatus>(`/case-status/${encodeURIComponent(receiptNumber)}`);
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
