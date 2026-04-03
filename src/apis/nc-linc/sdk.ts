/**
 * NC LINC SDK — typed API client for NC OSBM LINC open data.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { searchDatasets, queryDataset } from "us-gov-open-data-mcp/sdk/nc-linc";
 *
 *   const results = await searchDatasets({ query: "employment", limit: 10 });
 *   const records = await queryDataset({ datasetId: "employment-and-income-linc", limit: 20 });
 *
 * No API key required.
 * Docs: https://linc.osbm.nc.gov/
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ─────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://linc.osbm.nc.gov/api/v1",
  name: "nc-linc",
  rateLimit: { perSecond: 5, burst: 10 },
  cacheTtlMs: 30 * 60 * 1000, // 30 min — state data updates infrequently
});

// ─── Types ──────────────────────────────────────────────────────────

/** LINC dataset search result. */
export interface LincDataset {
  datasetid?: string;
  metas?: {
    title?: string;
    description?: string;
    keyword?: string[];
    records_count?: number;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/** LINC dataset search response. */
export interface LincSearchResponse {
  datasets?: LincDataset[];
  nhits?: number;
  [key: string]: unknown;
}

/** LINC record query response. */
export interface LincQueryResponse {
  records?: Array<{
    recordid?: string;
    fields?: Record<string, unknown>;
    [key: string]: unknown;
  }>;
  nhits?: number;
  [key: string]: unknown;
}

// ─── Public API ─────────────────────────────────────────────────────

/**
 * Search across all LINC datasets by keyword.
 *
 * Example:
 *   const results = await searchDatasets({ query: "population", limit: 10 });
 */
export async function searchDatasets(opts: {
  query: string;
  limit?: number;
}): Promise<LincSearchResponse> {
  const params = qp({
    q: opts.query,
    rows: opts.limit ?? 10,
  });
  return api.get<LincSearchResponse>("/explore/dataset/", params);
}

/**
 * Query a specific LINC dataset with optional filters.
 *
 * Example:
 *   const data = await queryDataset({ datasetId: "employment-and-income-linc", where: "county='Wake'", limit: 20 });
 */
export async function queryDataset(opts: {
  datasetId: string;
  where?: string;
  limit?: number;
  offset?: number;
}): Promise<LincQueryResponse> {
  const params = qp({
    where: opts.where,
    limit: opts.limit ?? 20,
    offset: opts.offset,
  });
  return api.get<LincQueryResponse>(
    `/explore/dataset/${encodeURIComponent(opts.datasetId)}/records`,
    params,
  );
}

/** Clear NC LINC cache. */
export function clearCache(): void {
  api.clearCache();
}
