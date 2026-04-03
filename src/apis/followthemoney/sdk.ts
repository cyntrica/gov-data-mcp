/**
 * FollowTheMoney SDK — state campaign finance data.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { searchContributions } from "us-gov-open-data-mcp/sdk/followthemoney";
 *
 *   const data = await searchContributions({ state: "CA", year: 2024 });
 *
 * Requires `FTM_API_KEY` env var.
 * Signup: https://www.followthemoney.org/our-data/apis
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://api.followthemoney.org",
  name: "followthemoney",
  auth: {
    type: "query",
    envParams: { APIKey: "FTM_API_KEY" },
  },
  rateLimit: { perSecond: 2, burst: 5 },
  cacheTtlMs: 60 * 60 * 1000, // 1 hour
});

// ─── Types ──────────────────────────────────────────────────────────

export interface FtmRecord {
  [key: string]: unknown;
}

export interface FtmResponse {
  records?: {
    record?: FtmRecord[];
  };
}

// ─── Functions ──────────────────────────────────────────────────────

/**
 * Search state campaign finance contributions.
 */
export async function searchContributions(opts: {
  state?: string;
  candidateId?: string;
  donorId?: string;
  year?: number;
  limit?: number;
}): Promise<FtmRecord[]> {
  const params = qp({
    s: opts.state,
    "c-t-eid": opts.candidateId,
    "d-eid": opts.donorId,
    y: opts.year,
    mode: "json",
  });
  const data = await api.get<FtmResponse>("/", params);
  const records = data?.records?.record ?? [];
  const limit = opts.limit ?? 50;
  return records.slice(0, limit);
}

export const clearCache = () => api.clearCache();
