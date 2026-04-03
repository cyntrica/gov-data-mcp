/**
 * SBIR SDK — typed API client for SBIR/STTR award data.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { searchAwards } from "us-gov-open-data-mcp/sdk/sbir";
 *
 * No API key required.
 * Docs: https://www.sbir.gov/
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://www.sbir.gov/api",
  name: "sbir",
  rateLimit: { perSecond: 3, burst: 6 },
  cacheTtlMs: 60 * 60 * 1000, // 1 hour
});

// ─── Types ───────────────────────────────────────────────────────────

/** SBIR/STTR award record. */
export interface SbirAward {
  company?: string;
  award_title?: string;
  agency?: string;
  branch?: string;
  phase?: string;
  program?: string;
  award_year?: string;
  award_amount?: number;
  abstract?: string;
  research_keywords?: string;
  ri_name?: string;
  ri_phone?: string;
  ri_email?: string;
  address1?: string;
  city?: string;
  state?: string;
  zip?: string;
  hubzone_owned?: string;
  woman_owned?: string;
  socially_economically_disadvantaged?: string;
  [key: string]: unknown;
}

/** SBIR awards API response. */
interface AwardsResponse {
  results: SbirAward[];
  numFound: number;
}

// ═══════════════════════════════════════════════════════════════════════
// AWARDS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Search SBIR/STTR awards by keyword, agency, company, or year.
 *
 * Example:
 *   await searchAwards({ keyword: "artificial intelligence", agency: "DOD", limit: 10 });
 */
export async function searchAwards(opts: {
  keyword?: string;
  agency?: string;
  company?: string;
  year?: number;
  limit?: number;
  offset?: number;
}): Promise<{ awards: SbirAward[]; numFound: number }> {
  const params = qp({
    keyword: opts.keyword,
    agency: opts.agency,
    company: opts.company,
    year: opts.year,
    rows: opts.limit ?? 20,
    start: opts.offset ?? 0,
  });
  const res = await api.get<AwardsResponse>("/awards.json", params);
  return {
    awards: res?.results ?? [],
    numFound: res?.numFound ?? 0,
  };
}

/** Clear SBIR API cache. */
export function clearCache(): void {
  api.clearCache();
}
