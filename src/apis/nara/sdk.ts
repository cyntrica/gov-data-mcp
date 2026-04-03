/**
 * NARA SDK — typed API client for the National Archives catalog.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { searchRecords, getRecord } from "us-gov-open-data-mcp/sdk/nara";
 *
 *   const results = await searchRecords({ query: "civil war" });
 *   const record = await getRecord("12345");
 *
 * No API key required. Rate limited to 10,000 queries/month.
 * Docs: https://catalog.archives.gov/api/v2/
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const client = createClient({
  baseUrl: "https://catalog.archives.gov/api/v2",
  name: "nara",
  rateLimit: { perSecond: 2, burst: 5 },
  cacheTtlMs: 60 * 60 * 1000, // 1 hour — archival data rarely changes
});

// ─── Types ───────────────────────────────────────────────────────────

export interface NaraSearchResponse {
  opaResponse: {
    results: {
      result: Record<string, unknown>[];
      totalResults: number;
    };
    [key: string]: unknown;
  };
}

export interface NaraRecordResponse {
  opaResponse: {
    result: Record<string, unknown>;
    [key: string]: unknown;
  };
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Search the National Archives catalog.
 *
 * Example:
 *   const data = await searchRecords({ query: "declaration of independence", limit: 10 });
 */
export async function searchRecords(opts: {
  query: string;
  limit?: number;
  offset?: number;
}): Promise<NaraSearchResponse> {
  const params = qp({
    q: opts.query,
    limit: opts.limit ?? 20,
    offset: opts.offset ?? 0,
  });
  return client.get<NaraSearchResponse>("/", params);
}

/**
 * Get a full record by NARA ID.
 *
 * Example:
 *   const record = await getRecord("1667751");
 */
export async function getRecord(naraId: string): Promise<NaraRecordResponse> {
  return client.get<NaraRecordResponse>(`/${encodeURIComponent(naraId)}`);
}

/** Clear cached responses. */
export function clearCache(): void {
  client.clearCache();
}
