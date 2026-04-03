/**
 * NSF SDK — typed API client for National Science Foundation award data.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { searchAwards, getAwardDetail } from "us-gov-open-data-mcp/sdk/nsf";
 *
 *   const results = await searchAwards({ keyword: "machine learning", institution: "MIT" });
 *   console.log(results.response.award);
 *
 *   const award = await getAwardDetail("2401234");
 *   console.log(award.response.award[0].title);
 *
 * No API key required.
 * Docs: https://www.research.gov/common/webapi/awardapisearch-v1.htm
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://api.nsf.gov/services/v1",
  name: "nsf",
  rateLimit: { perSecond: 5, burst: 10 },
  cacheTtlMs: 60 * 60 * 1000, // 1 hour — award data updates infrequently
});

// ─── Types ───────────────────────────────────────────────────────────

/** NSF award record. */
export interface NsfAward {
  id: string;
  title: string;
  piName: string;
  piEmail?: string;
  piPhone?: string;
  coPDPI?: string;
  startDate: string;
  expDate: string;
  awardeeName: string;
  fundsObligatedAmt: string;
  abstractText?: string;
  fundProgramName?: string;
  [key: string]: unknown;
}

/** NSF API response envelope. */
export interface NsfResponse {
  response: {
    award: NsfAward[];
    [key: string]: unknown;
  };
}

// ─── Constants ──────────────────────────────────────────────────────

const SEARCH_FIELDS = "id,title,piName,startDate,expDate,awardeeName,fundsObligatedAmt,abstractText";
const DETAIL_FIELDS = "id,title,piName,startDate,expDate,awardeeName,fundsObligatedAmt,abstractText,piEmail,piPhone,coPDPI,fundProgramName";

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Search NSF research awards by keyword, PI, institution, and program.
 *
 * Example:
 *   const result = await searchAwards({ keyword: "quantum computing", limit: 10 });
 */
export async function searchAwards(opts: {
  keyword?: string;
  piName?: string;
  institution?: string;
  program?: string;
  offset?: number;
  limit?: number;
} = {}): Promise<NsfResponse> {
  const params = qp({
    keyword: opts.keyword,
    piName: opts.piName,
    institution: opts.institution,
    fundProgramName: opts.program,
    printFields: SEARCH_FIELDS,
    offset: opts.offset,
    rpp: opts.limit ?? 25,
  });
  return api.get<NsfResponse>("/awards.json", params);
}

/**
 * Get NSF award details by award ID.
 *
 * Example:
 *   const result = await getAwardDetail("2401234");
 */
export async function getAwardDetail(awardId: string): Promise<NsfResponse> {
  return api.get<NsfResponse>(`/awards/${awardId}.json`, qp({
    printFields: DETAIL_FIELDS,
  }));
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
