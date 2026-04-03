/**
 * Colorado Water SDK — typed API client for Colorado Division of Water Resources.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { getStations, getReadings, getWaterRights } from "us-gov-open-data-mcp/sdk/co-water";
 *
 * Optional CO_WATER_API_KEY env var — 1000 calls/day without a key.
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://dwr.state.co.us/Rest/GET/api/v2",
  name: "co-water",
  auth: {
    type: "query",
    envParams: { apiKey: "CO_WATER_API_KEY" },
  },
  rateLimit: { perSecond: 5, burst: 10 },
  cacheTtlMs: 10 * 60 * 1000, // 10 minutes
});

// ─── Types ───────────────────────────────────────────────────────────

/** Colorado water API response wrapper. */
export interface CoWaterResponse<T = CoWaterRecord> {
  ResultCount?: number;
  ResultList?: T[];
  [key: string]: unknown;
}

/** Telemetry station record. */
export interface CoWaterStation {
  abbrev?: string;
  stationName?: string;
  county?: string;
  waterDistrict?: number;
  division?: number;
  latitude?: number;
  longitude?: number;
  parameter?: string;
  stationType?: string;
  [key: string]: unknown;
}

/** Telemetry time series record. */
export interface CoWaterReading {
  abbrev?: string;
  parameter?: string;
  measDate?: string;
  measValue?: number | null;
  measUnit?: string;
  flagA?: string;
  flagB?: string;
  [key: string]: unknown;
}

/** Water rights / structure record. */
export interface CoWaterRight {
  structureName?: string;
  wdid?: string;
  county?: string;
  waterSource?: string;
  appropriationDate?: string;
  adjudicationDate?: string;
  adminNumber?: string;
  decreedAmount?: number | null;
  decreedUnits?: string;
  structureType?: string;
  [key: string]: unknown;
}

/** Generic record type. */
export interface CoWaterRecord {
  [key: string]: unknown;
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Search telemetry stations.
 * @param county - County name (e.g. "Boulder", "Denver")
 * @param waterDistrict - Water district number
 * @param division - Water division number
 */
export async function getStations(opts: {
  county?: string;
  waterDistrict?: number;
  division?: number;
  limit?: number;
} = {}): Promise<CoWaterResponse<CoWaterStation>> {
  const params = qp({
    format: "json",
    county: opts.county,
    waterDistrict: opts.waterDistrict,
    division: opts.division,
    pageSize: opts.limit ?? 100,
  });
  return api.get<CoWaterResponse<CoWaterStation>>("/telemetrystations/telemetrystation", params);
}

/**
 * Get real-time telemetry readings.
 * @param abbrev - Station abbreviation
 * @param parameter - Parameter name: DISCHRG (discharge), GAGE_HT (gage height), AIRTEMP, STORAGE, etc.
 * @param start - Start date/time
 * @param end - End date/time
 */
export async function getReadings(opts: {
  abbrev: string;
  parameter?: string;
  start?: string;
  end?: string;
  limit?: number;
}): Promise<CoWaterResponse<CoWaterReading>> {
  const params = qp({
    format: "json",
    abbrev: opts.abbrev,
    parameter: opts.parameter || "DISCHRG",
    "min-measDate": opts.start,
    "max-measDate": opts.end,
    pageSize: opts.limit ?? 500,
  });
  return api.get<CoWaterResponse<CoWaterReading>>("/telemetrystations/telemetrytimeseriesraw", params);
}

/**
 * Search water rights / structures.
 * @param county - County name
 * @param waterSource - Water source name (e.g. "South Platte River")
 */
export async function getWaterRights(opts: {
  county?: string;
  waterSource?: string;
  waterDistrict?: number;
  limit?: number;
} = {}): Promise<CoWaterResponse<CoWaterRight>> {
  const params = qp({
    format: "json",
    county: opts.county,
    waterSource: opts.waterSource,
    waterDistrict: opts.waterDistrict,
    pageSize: opts.limit ?? 100,
  });
  return api.get<CoWaterResponse<CoWaterRight>>("/structures", params);
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
