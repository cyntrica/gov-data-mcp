/**
 * OpenSecrets SDK — federal campaign finance data.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { getCandidateSummary, getTopContributors, getIndustryTotals } from "us-gov-open-data-mcp/sdk/opensecrets";
 *
 *   const summary = await getCandidateSummary("N00007360", 2024);
 *
 * Requires `OPENSECRETS_API_KEY` env var.
 * Signup: https://www.opensecrets.org/api/admin/index.php?function=signup
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://www.opensecrets.org/api",
  name: "opensecrets",
  auth: {
    type: "query",
    envParams: { apikey: "OPENSECRETS_API_KEY" },
  },
  rateLimit: { perSecond: 2, burst: 5 },
  cacheTtlMs: 60 * 60 * 1000, // 1 hour
});

// ─── Types ──────────────────────────────────────────────────────────

export interface CandidateSummary {
  cand_name: string;
  cid: string;
  cycle: string;
  state: string;
  party: string;
  chamber: string;
  total: string;
  spent: string;
  cash_on_hand: string;
  debt: string;
  [key: string]: unknown;
}

export interface Contributor {
  org_name: string;
  total: string;
  pacs: string;
  indivs: string;
  [key: string]: unknown;
}

export interface IndustryEntry {
  industry_code: string;
  industry_name: string;
  indivs: string;
  pacs: string;
  total: string;
  [key: string]: unknown;
}

// ─── Functions ──────────────────────────────────────────────────────

/**
 * Get candidate fundraising summary.
 */
export async function getCandidateSummary(cid: string, cycle?: number): Promise<CandidateSummary | null> {
  const params = qp({
    method: "candSummary",
    cid,
    cycle,
    output: "json",
  });
  const data = await api.get<{ response?: { summary?: { "@attributes": CandidateSummary } } }>("/", params);
  return data?.response?.summary?.["@attributes"] ?? null;
}

/**
 * Get top contributors to a candidate.
 */
export async function getTopContributors(cid: string, cycle?: number): Promise<Contributor[]> {
  const params = qp({
    method: "candContrib",
    cid,
    cycle,
    output: "json",
  });
  const data = await api.get<{ response?: { contributors?: { contributor?: Array<{ "@attributes": Contributor }> } } }>("/", params);
  const contributors = data?.response?.contributors?.contributor ?? [];
  return contributors.map((c) => c["@attributes"]);
}

/**
 * Get industry contribution totals for a candidate.
 */
export async function getIndustryTotals(cid: string, cycle?: number): Promise<IndustryEntry[]> {
  const params = qp({
    method: "candIndustry",
    cid,
    cycle,
    output: "json",
  });
  const data = await api.get<{ response?: { industries?: { industry?: Array<{ "@attributes": IndustryEntry }> } } }>("/", params);
  const industries = data?.response?.industries?.industry ?? [];
  return industries.map((i) => i["@attributes"]);
}

export const clearCache = () => api.clearCache();
