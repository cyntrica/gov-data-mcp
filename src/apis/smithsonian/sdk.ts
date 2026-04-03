/**
 * Smithsonian SDK — typed API client for the Smithsonian Open Access API.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { searchCollections, getRecord } from "us-gov-open-data-mcp/sdk/smithsonian";
 *
 *   const results = await searchCollections("Wright brothers airplane");
 *   console.log(results.rowCount, results.rows);
 *
 * Requires SMITHSONIAN_API_KEY env var. Get one at https://api.data.gov/signup/
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://api.si.edu/openaccess/api/v1.0",
  name: "smithsonian",
  auth: { type: "query", envParams: { api_key: "SMITHSONIAN_API_KEY" } },
  rateLimit: { perSecond: 5, burst: 10 },
  cacheTtlMs: 60 * 60 * 1000, // 1 hour — collection data rarely changes
});

// ─── Types ───────────────────────────────────────────────────────────

export interface SmithsonianSearchResult {
  rowCount: number;
  rows: Record<string, unknown>[];
}

export interface SmithsonianRecord {
  id: string;
  title?: string;
  unitCode?: string;
  content?: Record<string, unknown>;
  [key: string]: unknown;
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Search Smithsonian collections by keyword, museum, or date.
 */
export async function searchCollections(opts: {
  query: string;
  limit?: number;
  offset?: number;
}): Promise<SmithsonianSearchResult> {
  const params = qp({
    q: opts.query,
    rows: opts.limit ?? 10,
    start: opts.offset ?? 0,
  });

  const data = await api.get<{ response: SmithsonianSearchResult }>("/search", params);
  return data.response;
}

/**
 * Get full record details by ID, including images.
 */
export async function getRecord(id: string): Promise<SmithsonianRecord> {
  const data = await api.get<{ response: SmithsonianRecord }>(`/content/${id}`);
  return data.response;
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
