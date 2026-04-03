/**
 * ITA Trade SDK — typed API client for International Trade Administration.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { searchTariffRates, searchTradeEvents } from "us-gov-open-data-mcp/sdk/ita-trade";
 *
 *   const tariffs = await searchTariffRates({ query: "steel", htsSubheading: "7206" });
 *   const events = await searchTradeEvents({ query: "technology" });
 *
 * Requires ITA_API_KEY env var.
 * Docs: https://developer.trade.gov/
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://api.trade.gov/gateway/v1",
  name: "ita-trade",
  auth: {
    type: "header",
    envParams: { "subscription-key": "ITA_API_KEY" },
  },
  rateLimit: { perSecond: 5, burst: 10 },
  cacheTtlMs: 60 * 60 * 1000, // 1 hour
});

// ─── Types ───────────────────────────────────────────────────────────

export interface TariffRate {
  tariff_line?: string;
  hts_subheading?: string;
  partner_country?: string;
  tariff_rate?: string;
  base_rate?: string;
  final_year?: string;
  rule_text?: string;
  source?: string;
  [key: string]: unknown;
}

export interface TradeEvent {
  name?: string;
  event_type?: string;
  start_date?: string;
  end_date?: string;
  cost?: string;
  registration_url?: string;
  description?: string;
  country?: string;
  city?: string;
  source?: string;
  [key: string]: unknown;
}

interface SearchResponse<T> {
  total: number;
  offset: number;
  sources_used: string[];
  results: T[];
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Search FTA tariff rates by keyword, HTS subheading, and/or partner country.
 */
export async function searchTariffRates(opts?: {
  query?: string;
  htsSubheading?: string;
  partnerCountry?: string;
  limit?: number;
}): Promise<SearchResponse<TariffRate>> {
  const params = qp({
    q: opts?.query,
    hts_subheading: opts?.htsSubheading,
    partner_country: opts?.partnerCountry,
    size: opts?.limit ?? 25,
  });
  return api.get<SearchResponse<TariffRate>>("/tariff_rates/search", params);
}

/**
 * Search international trade events by keyword and/or country.
 */
export async function searchTradeEvents(opts?: {
  query?: string;
  country?: string;
  limit?: number;
}): Promise<SearchResponse<TradeEvent>> {
  const params = qp({
    q: opts?.query,
    countries: opts?.country,
    size: opts?.limit ?? 25,
  });
  return api.get<SearchResponse<TradeEvent>>("/trade_events/search", params);
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
