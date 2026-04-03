/**
 * WQP SDK — Water Quality Portal API client.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { searchStations, getResults } from "us-gov-open-data-mcp/sdk/wqp";
 *
 *   const stations = await searchStations({ stateCode: "06", countyCode: "037" });
 *   const results = await getResults({ siteId: "USGS-01646500", characteristicName: "Temperature, water" });
 *
 * No API key required.
 * Docs: https://www.waterqualitydata.us/webservices_documentation/
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://www.waterqualitydata.us",
  name: "wqp",
  rateLimit: { perSecond: 2, burst: 5 },
  cacheTtlMs: 30 * 60 * 1000, // 30 min
  timeoutMs: 60_000, // WQP queries can be slow
});

// ─── Types ──────────────────────────────────────────────────────────

export interface WqpStation {
  OrganizationIdentifier: string;
  OrganizationFormalName: string;
  MonitoringLocationIdentifier: string;
  MonitoringLocationName: string;
  MonitoringLocationTypeName: string;
  HUCEightDigitCode: string;
  LatitudeMeasure: string;
  LongitudeMeasure: string;
  StateCode: string;
  CountyCode: string;
}

export interface WqpResult {
  ActivityIdentifier: string;
  ActivityStartDate: string;
  CharacteristicName: string;
  ResultMeasureValue: string;
  ResultMeasure_MeasureUnitCode: string;
  MonitoringLocationIdentifier: string;
  ActivityMediaName: string;
}

// ─── Functions ──────────────────────────────────────────────────────

/**
 * Search water quality monitoring stations by state/county/HUC.
 */
export async function searchStations(opts: {
  stateCode?: string;
  countyCode?: string;
  huc?: string;
  siteType?: string;
  limit?: number;
}): Promise<WqpStation[]> {
  const params = qp({
    statecode: opts.stateCode ? `US:${opts.stateCode}` : undefined,
    countycode: opts.stateCode && opts.countyCode ? `US:${opts.stateCode}:${opts.countyCode}` : undefined,
    huc: opts.huc,
    siteType: opts.siteType,
    mimeType: "json",
    sorted: "no",
    zip: "no",
  });
  const data = await api.get<WqpStation[]>("/data/Station/search", params);
  const limit = opts.limit ?? 50;
  return Array.isArray(data) ? data.slice(0, limit) : [];
}

/**
 * Get water quality sample results by station/parameter.
 */
export async function getResults(opts: {
  siteId?: string;
  characteristicName?: string;
  stateCode?: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
}): Promise<WqpResult[]> {
  const params = qp({
    siteid: opts.siteId,
    characteristicName: opts.characteristicName,
    statecode: opts.stateCode ? `US:${opts.stateCode}` : undefined,
    startDateLo: opts.startDate,
    startDateHi: opts.endDate,
    mimeType: "json",
    sorted: "no",
    zip: "no",
  });
  const data = await api.get<WqpResult[]>("/data/Result/search", params);
  const limit = opts.limit ?? 50;
  return Array.isArray(data) ? data.slice(0, limit) : [];
}

export const clearCache = () => api.clearCache();
