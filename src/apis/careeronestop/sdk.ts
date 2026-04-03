/**
 * CareerOneStop SDK — typed API client for DOL career resources.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { searchOccupations, getLicensing } from "us-gov-open-data-mcp/sdk/careeronestop";
 *
 *   const results = await searchOccupations("software developer", "US");
 *   const licenses = await getLicensing("software", "TX");
 *
 * Requires CAREERONESTOP_TOKEN env var.
 * Docs: https://www.careeronestop.org/Developers/WebAPI/web-api.aspx
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://api.careeronestop.org/v1",
  name: "careeronestop",
  auth: {
    type: "header",
    envParams: { Authorization: "CAREERONESTOP_TOKEN" },
    prefix: "Bearer ",
  },
  rateLimit: { perSecond: 5, burst: 10 },
  cacheTtlMs: 24 * 60 * 60 * 1000, // 24 hours — occupation data changes slowly
});

// ─── Types ───────────────────────────────────────────────────────────

export interface OccupationResult {
  OnetCode?: string;
  OnetTitle?: string;
  OccupationDescription?: string;
  [key: string]: unknown;
}

export interface OccupationSearchResponse {
  OccupationList?: OccupationResult[];
  [key: string]: unknown;
}

export interface LicenseResult {
  Name?: string;
  Type?: string;
  Agency?: string;
  Url?: string;
  State?: string;
  [key: string]: unknown;
}

export interface LicenseSearchResponse {
  LicenseList?: LicenseResult[];
  [key: string]: unknown;
}

// ─── Helpers ─────────────────────────────────────────────────────────

/**
 * Get the userId for API calls. Uses the API token as userId
 * (CareerOneStop uses the same token for both auth and userId in many endpoints).
 */
function getUserId(): string {
  return process.env.CAREERONESTOP_TOKEN ?? "anonymous";
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Search occupations by keyword.
 */
export async function searchOccupations(keyword: string, location?: string): Promise<OccupationResult[]> {
  const userId = getUserId();
  const loc = location ?? "US";
  const data = await api.get<OccupationSearchResponse>(
    `/occupation/${encodeURIComponent(userId)}/${encodeURIComponent(keyword)}/${encodeURIComponent(loc)}/0`,
  );
  return data.OccupationList ?? [];
}

/**
 * Get licensing/certification requirements for an occupation in a state.
 */
export async function getLicensing(keyword: string, state: string): Promise<LicenseResult[]> {
  const userId = getUserId();
  const data = await api.get<LicenseSearchResponse>(
    `/licensefinder/${encodeURIComponent(userId)}/${encodeURIComponent(keyword)}/${encodeURIComponent(state)}`,
  );
  return data.LicenseList ?? [];
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
