/**
 * CFTC SDK — typed API client for Commitments of Traders (COT) reports
 * via the Socrata SODA API.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { querySoda, DATASET_IDS } from "us-gov-open-data-mcp/sdk/cftc";
 *
 *   const data = await querySoda(DATASET_IDS.legacyFuturesOnly, { market_name: "WHEAT", limit: 10 });
 *   console.log(data);
 *
 * No API key required.
 * Docs: https://www.cftc.gov/MarketReports/CommitmentsofTraders/index.htm
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const client = createClient({
  baseUrl: "https://publicreporting.cftc.gov/resource",
  name: "cftc",
  rateLimit: { perSecond: 5, burst: 10 },
  cacheTtlMs: 7 * 24 * 60 * 60 * 1000, // 1 week — data updates weekly
});

// ─── Dataset IDs ────────────────────────────────────────────────────

/** Socrata dataset identifiers for CFTC COT reports. */
export const DATASET_IDS = {
  legacyFuturesOnly: "6dca-aqww",
  legacyCombined: "jun7-fc8e",
  disaggregatedFutures: "72hh-3qpy",
  disaggregatedCombined: "kh3c-gbw2",
  tffFutures: "gpe5-46if",
  tffCombined: "yw9f-hn96",
  supplementalCit: "4zgm-a668",
  productHierarchy: "rj6x-va3z",
} as const;

// ─── Types ──────────────────────────────────────────────────────────

/** Options for SODA queries. */
export interface SodaQueryOpts {
  select?: string;
  where?: string;
  order?: string;
  limit?: number;
  offset?: number;
  q?: string;
}

// ─── Public API ─────────────────────────────────────────────────────

/**
 * Generic Socrata SODA query against a CFTC dataset.
 *
 * Example:
 *   const rows = await querySoda("6dca-aqww", { where: "market_and_exchange_names LIKE '%WHEAT%'", limit: 25 });
 */
export async function querySoda(
  datasetId: string,
  opts: SodaQueryOpts = {},
): Promise<Record<string, unknown>[]> {
  const params = qp({
    $select: opts.select,
    $where: opts.where,
    $order: opts.order,
    $limit: opts.limit ?? 100,
    $offset: opts.offset,
    $q: opts.q,
  });
  return client.get<Record<string, unknown>[]>(`/${datasetId}.json`, params);
}

/**
 * Query Legacy COT report (commercial vs non-commercial positions).
 *
 * Example:
 *   const data = await getLegacyCot({ futuresOnly: true, marketName: "CRUDE OIL" });
 */
export async function getLegacyCot(opts: {
  futuresOnly?: boolean;
  marketName?: string;
  limit?: number;
  offset?: number;
}): Promise<Record<string, unknown>[]> {
  const datasetId = opts.futuresOnly !== false
    ? DATASET_IDS.legacyFuturesOnly
    : DATASET_IDS.legacyCombined;
  const where = opts.marketName
    ? `upper(market_and_exchange_names) LIKE '%${opts.marketName.toUpperCase().replace(/'/g, "''")}%'`
    : undefined;
  return querySoda(datasetId, {
    where,
    order: "report_date_as_yyyy_mm_dd DESC",
    limit: opts.limit,
    offset: opts.offset,
  });
}

/**
 * Query Disaggregated COT report (producer/merchant, swap dealer, managed money).
 *
 * Example:
 *   const data = await getDisaggregatedCot({ futuresOnly: true, marketName: "NATURAL GAS" });
 */
export async function getDisaggregatedCot(opts: {
  futuresOnly?: boolean;
  marketName?: string;
  limit?: number;
  offset?: number;
}): Promise<Record<string, unknown>[]> {
  const datasetId = opts.futuresOnly !== false
    ? DATASET_IDS.disaggregatedFutures
    : DATASET_IDS.disaggregatedCombined;
  const where = opts.marketName
    ? `upper(market_and_exchange_names) LIKE '%${opts.marketName.toUpperCase().replace(/'/g, "''")}%'`
    : undefined;
  return querySoda(datasetId, {
    where,
    order: "report_date_as_yyyy_mm_dd DESC",
    limit: opts.limit,
    offset: opts.offset,
  });
}

/**
 * Query Traders in Financial Futures (TFF) report.
 *
 * Example:
 *   const data = await getTffCot({ futuresOnly: true, marketName: "S&P 500" });
 */
export async function getTffCot(opts: {
  futuresOnly?: boolean;
  marketName?: string;
  limit?: number;
  offset?: number;
}): Promise<Record<string, unknown>[]> {
  const datasetId = opts.futuresOnly !== false
    ? DATASET_IDS.tffFutures
    : DATASET_IDS.tffCombined;
  const where = opts.marketName
    ? `upper(market_and_exchange_names) LIKE '%${opts.marketName.toUpperCase().replace(/'/g, "''")}%'`
    : undefined;
  return querySoda(datasetId, {
    where,
    order: "report_date_as_yyyy_mm_dd DESC",
    limit: opts.limit,
    offset: opts.offset,
  });
}

/**
 * Query Supplemental CIT report (commodity index trader positions).
 *
 * Example:
 *   const data = await getCitCot({ marketName: "CORN" });
 */
export async function getCitCot(opts: {
  marketName?: string;
  limit?: number;
  offset?: number;
} = {}): Promise<Record<string, unknown>[]> {
  const where = opts.marketName
    ? `upper(market_and_exchange_names) LIKE '%${opts.marketName.toUpperCase().replace(/'/g, "''")}%'`
    : undefined;
  return querySoda(DATASET_IDS.supplementalCit, {
    where,
    order: "report_date_as_yyyy_mm_dd DESC",
    limit: opts.limit,
    offset: opts.offset,
  });
}

/**
 * List available products/markets from the CFTC product hierarchy.
 *
 * Example:
 *   const products = await getProducts("wheat");
 */
export async function getProducts(search?: string): Promise<Record<string, unknown>[]> {
  return querySoda(DATASET_IDS.productHierarchy, {
    q: search,
    limit: 100,
  });
}

/** Clear cached responses. */
export function clearCache(): void {
  client.clearCache();
}
