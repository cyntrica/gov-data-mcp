/**
 * ERCOT SDK — typed API client for the Electric Reliability Council of Texas.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { getGridConditions, getPrices } from "us-gov-open-data-mcp/sdk/ercot";
 *
 * Requires ERCOT_API_KEY env var — register at https://apiexplorer.ercot.com/
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://api.ercot.com/api/public-reports",
  name: "ercot",
  auth: {
    type: "header",
    envParams: { "Ocp-Apim-Subscription-Key": "ERCOT_API_KEY" },
  },
  rateLimit: { perSecond: 5, burst: 10 },
  cacheTtlMs: 5 * 60 * 1000, // 5 minutes — grid data updates frequently
});

// ─── Types ───────────────────────────────────────────────────────────

/** ERCOT API response wrapper. */
export interface ErcotResponse {
  data?: ErcotRecord[];
  fields?: string[];
  total?: number;
  [key: string]: unknown;
}

/** Individual data record. */
export interface ErcotRecord {
  deliveryDate?: string;
  hourEnding?: string;
  interval?: string;
  value?: number | string | null;
  settlementPoint?: string;
  settlementPointPrice?: number | null;
  systemLoad?: number | null;
  totalCapacity?: number | null;
  windOutput?: number | null;
  solarOutput?: number | null;
  [key: string]: unknown;
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Get grid conditions — load forecasts by weather zone.
 */
export async function getGridConditions(opts: {
  deliveryDateFrom?: string;
  deliveryDateTo?: string;
  limit?: number;
  offset?: number;
} = {}): Promise<ErcotResponse> {
  const params = qp({
    deliveryDateFrom: opts.deliveryDateFrom,
    deliveryDateTo: opts.deliveryDateTo,
    size: opts.limit,
    offset: opts.offset,
  });
  return api.get<ErcotResponse>("/np6-345-cd/lf_by_model_weather_zone", params);
}

/**
 * Get settlement point prices.
 */
export async function getPrices(opts: {
  deliveryDateFrom?: string;
  deliveryDateTo?: string;
  settlementPoint?: string;
  limit?: number;
  offset?: number;
} = {}): Promise<ErcotResponse> {
  const params = qp({
    deliveryDateFrom: opts.deliveryDateFrom,
    deliveryDateTo: opts.deliveryDateTo,
    settlementPoint: opts.settlementPoint,
    size: opts.limit,
    offset: opts.offset,
  });
  return api.get<ErcotResponse>("/np6-788-cd/spp_node_zone_hub", params);
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
