/**
 * USITC SDK — typed API client for U.S. International Trade Commission DataWeb.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { getTradeData } from "us-gov-open-data-mcp/sdk/usitc";
 *
 *   const data = await getTradeData({ htsCode: "8471", year: "2023", tradeType: "import" });
 *
 * No API key required (public endpoint).
 * Docs: https://dataweb.usitc.gov/
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://datawebws.usitc.gov/api/v1",
  name: "usitc",
  rateLimit: { perSecond: 5, burst: 10 },
  cacheTtlMs: 24 * 60 * 60 * 1000, // 24 hours — trade data updates infrequently
});

// ─── Types ───────────────────────────────────────────────────────────

export interface TradeRecord {
  hts?: string;
  description?: string;
  country?: string;
  year?: string;
  value?: number;
  quantity?: number;
  unit?: string;
  [key: string]: unknown;
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Query U.S. import/export trade statistics.
 */
export async function getTradeData(opts: {
  htsCode?: string;
  countryCode?: string;
  year?: string;
  tradeType?: "import" | "export" | "balance";
}): Promise<TradeRecord[]> {
  const params = qp({
    hts: opts.htsCode,
    partner: opts.countryCode,
    year: opts.year,
    tradeType: opts.tradeType ?? "import",
    format: "json",
  });
  return api.get<TradeRecord[]>("/trade", params);
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
