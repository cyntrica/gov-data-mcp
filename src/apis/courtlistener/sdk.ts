/**
 * CourtListener SDK — typed API client for case law and court opinions.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { searchOpinions, getOpinion } from "us-gov-open-data-mcp/sdk/courtlistener";
 *
 *   const results = await searchOpinions({ query: "first amendment", court: "scotus" });
 *   const opinion = await getOpinion(12345);
 *
 * Requires COURTLISTENER_API_KEY. Get one at https://www.courtlistener.com/help/api/rest/
 * Docs: https://www.courtlistener.com/help/api/rest/
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const client = createClient({
  baseUrl: "https://www.courtlistener.com/api/rest/v4",
  name: "courtlistener",
  auth: {
    type: "header",
    envParams: { Authorization: "COURTLISTENER_API_KEY" },
    prefix: "Token ",
  },
  rateLimit: { perSecond: 2, burst: 5 },
  cacheTtlMs: 60 * 60 * 1000, // 1 hour
});

// ─── Types ───────────────────────────────────────────────────────────

export interface CourtListenerSearchResult {
  count: number;
  next: string | null;
  previous: string | null;
  results: Record<string, unknown>[];
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Search case law opinions.
 *
 * Example:
 *   const data = await searchOpinions({ query: "qualified immunity", court: "scotus", limit: 10 });
 */
export async function searchOpinions(opts: {
  query?: string;
  court?: string;
  filed_after?: string;
  filed_before?: string;
  limit?: number;
}): Promise<CourtListenerSearchResult> {
  const params = qp({
    q: opts.query,
    type: "o",
    court: opts.court,
    filed_after: opts.filed_after,
    filed_before: opts.filed_before,
    page_size: opts.limit ?? 20,
  });
  return client.get<CourtListenerSearchResult>("/search/", params);
}

/**
 * Get a full opinion by ID.
 *
 * Example:
 *   const opinion = await getOpinion(12345);
 */
export async function getOpinion(id: number): Promise<Record<string, unknown>> {
  return client.get<Record<string, unknown>>(`/opinions/${id}/`);
}

/** Clear cached responses. */
export function clearCache(): void {
  client.clearCache();
}
