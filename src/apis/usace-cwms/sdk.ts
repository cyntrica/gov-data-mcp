/**
 * USACE CWMS SDK — typed API client for Corps of Engineers water management data.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { getLocations, getTimeseries, getLevels } from "us-gov-open-data-mcp/sdk/usace-cwms";
 *
 *   const locations = await getLocations({ office: "SWL", names: "Mississippi*" });
 *   const ts = await getTimeseries({ name: "Keys.Flow.Inst.1Hour.0.Ccp-Rev", office: "SWL" });
 *
 * No API key required (public read access).
 * Docs: https://cwms-data.usace.army.mil/cwms-data/swagger-ui.html
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ─────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://cwms-data.usace.army.mil/cwms-data",
  name: "usace-cwms",
  rateLimit: { perSecond: 5, burst: 10 },
  cacheTtlMs: 15 * 60 * 1000, // 15 min — water data updates frequently
});

// ─── Types ──────────────────────────────────────────────────────────

/** CWMS location. */
export interface CwmsLocation {
  name?: string;
  office?: string;
  latitude?: number;
  longitude?: number;
  "location-type"?: string;
  "time-zone"?: string;
  county?: string;
  state?: string;
  nation?: string;
  [key: string]: unknown;
}

/** CWMS locations response. */
export interface CwmsLocationsResponse {
  locations?: {
    locations?: CwmsLocation[];
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/** CWMS time-series value. */
export interface CwmsTimeseriesValue {
  "date-time"?: number;
  value?: number;
  "quality-code"?: number;
  [key: string]: unknown;
}

/** CWMS time-series response. */
export interface CwmsTimeseriesResponse {
  name?: string;
  office?: string;
  unit?: string;
  values?: CwmsTimeseriesValue[] | number[][];
  "regular-interval-values"?: {
    values?: Array<Array<[number, number, number]>>;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/** CWMS level entry. */
export interface CwmsLevel {
  "level-id"?: string;
  "office-id"?: string;
  "level-date"?: string;
  "constant-value"?: number;
  "level-units"?: string;
  [key: string]: unknown;
}

/** CWMS levels response. */
export interface CwmsLevelsResponse {
  levels?: {
    levels?: CwmsLevel[];
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

// ─── Public API ─────────────────────────────────────────────────────

/**
 * Search CWMS monitoring locations by name, office, or type.
 *
 * Example:
 *   const locs = await getLocations({ office: "SWL", names: "Mississippi*" });
 */
export async function getLocations(opts: {
  office?: string;
  names?: string;
  locationType?: string;
}): Promise<unknown> {
  const params = qp({
    office: opts.office,
    names: opts.names,
    "location-type": opts.locationType,
    format: "json",
  });
  return api.get("/locations", params);
}

/**
 * Get time-series data: water level, flow, storage, precipitation.
 *
 * Example:
 *   const ts = await getTimeseries({ name: "Keys.Flow.Inst.1Hour.0.Ccp-Rev", office: "SWL", begin: "2024-01-01T00:00:00Z" });
 */
export async function getTimeseries(opts: {
  name: string;
  office?: string;
  begin?: string;
  end?: string;
}): Promise<unknown> {
  const params = qp({
    name: opts.name,
    office: opts.office,
    begin: opts.begin,
    end: opts.end,
    format: "json",
  });
  return api.get("/timeseries", params);
}

/**
 * Get water level data for a location.
 *
 * Example:
 *   const levels = await getLevels({ office: "SWL", levelIdMask: "Mississippi*" });
 */
export async function getLevels(opts: {
  office?: string;
  levelIdMask?: string;
}): Promise<unknown> {
  const params = qp({
    office: opts.office,
    "level-id-mask": opts.levelIdMask,
    format: "json",
  });
  return api.get("/levels", params);
}

/** Clear USACE CWMS cache. */
export function clearCache(): void {
  api.clearCache();
}
