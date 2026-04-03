/**
 * OpenStates SDK — typed API client for state legislature data.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { searchBills, getBillDetail, searchLegislators } from "us-gov-open-data-mcp/sdk/openstates";
 *
 *   const bills = await searchBills({ jurisdiction: "ca", query: "climate" });
 *   const bill = await getBillDetail("ocd-bill/abc123");
 *   const people = await searchLegislators({ jurisdiction: "ny" });
 *
 * Requires OPENSTATES_API_KEY. Get one at https://openstates.org/accounts/signup/
 * Docs: https://docs.openstates.org/api-v3/
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const client = createClient({
  baseUrl: "https://v3.openstates.org",
  name: "openstates",
  auth: {
    type: "header",
    envParams: { "X-API-KEY": "OPENSTATES_API_KEY" },
  },
  rateLimit: { perSecond: 2, burst: 5 },
  cacheTtlMs: 30 * 60 * 1000, // 30 minutes
});

// ─── Types ───────────────────────────────────────────────────────────

export interface OpenStatesPagination {
  total_items: number;
  page: number;
  per_page: number;
  max_page: number;
}

export interface OpenStatesBillResult {
  results: Record<string, unknown>[];
  pagination: OpenStatesPagination;
}

export interface OpenStatesPeopleResult {
  results: Record<string, unknown>[];
  pagination: OpenStatesPagination;
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Search bills across state legislatures.
 *
 * Example:
 *   const data = await searchBills({ jurisdiction: "ca", query: "housing", page: 1, limit: 20 });
 */
export async function searchBills(opts: {
  jurisdiction?: string;
  query?: string;
  session?: string;
  page?: number;
  limit?: number;
}): Promise<OpenStatesBillResult> {
  const params = qp({
    jurisdiction: opts.jurisdiction,
    q: opts.query,
    session: opts.session,
    page: opts.page ?? 1,
    per_page: opts.limit ?? 20,
  });
  return client.get<OpenStatesBillResult>("/bills", params);
}

/**
 * Get full bill detail by OpenStates ID.
 *
 * Example:
 *   const bill = await getBillDetail("ocd-bill/abc123-def456");
 */
export async function getBillDetail(openstatesId: string): Promise<Record<string, unknown>> {
  return client.get<Record<string, unknown>>(`/bills/${encodeURIComponent(openstatesId)}`);
}

/**
 * Search state legislators.
 *
 * Example:
 *   const people = await searchLegislators({ jurisdiction: "tx", name: "Smith" });
 */
export async function searchLegislators(opts: {
  jurisdiction?: string;
  name?: string;
  page?: number;
  limit?: number;
}): Promise<OpenStatesPeopleResult> {
  const params = qp({
    jurisdiction: opts.jurisdiction,
    name: opts.name,
    page: opts.page ?? 1,
    per_page: opts.limit ?? 20,
  });
  return client.get<OpenStatesPeopleResult>("/people", params);
}

/** Clear cached responses. */
export function clearCache(): void {
  client.clearCache();
}
