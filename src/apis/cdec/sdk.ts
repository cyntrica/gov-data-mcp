/**
 * CDEC SDK — typed API client for the California Data Exchange Center.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { getSensorData, getStationMeta } from "us-gov-open-data-mcp/sdk/cdec";
 *
 * No API key required — public data.
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://cdec.water.ca.gov",
  name: "cdec",
  rateLimit: { perSecond: 5, burst: 10 },
  cacheTtlMs: 10 * 60 * 1000, // 10 minutes — sensor data updates periodically
});

// ─── Types ───────────────────────────────────────────────────────────

/** CDEC sensor data record. */
export interface CdecSensorRecord {
  stationId?: string;
  durCode?: string;
  sensorNumber?: number;
  sensorType?: string;
  date?: string;
  obsDate?: string;
  value?: number | null;
  dataFlag?: string;
  units?: string;
  [key: string]: unknown;
}

/** CDEC station metadata. */
export interface CdecStationMeta {
  stationId?: string;
  stationName?: string;
  county?: string;
  latitude?: number;
  longitude?: number;
  elevation?: number;
  operator?: string;
  riverBasin?: string;
  hydroArea?: string;
  nearbyCity?: string;
  [key: string]: unknown;
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Get real-time sensor data for a station.
 * @param stationId - Station ID (e.g. "SHA" for Shasta, "ORO" for Oroville)
 * @param sensorNum - Sensor number (e.g. 15=storage, 6=elevation, 20=flow, 3=snow water content)
 * @param durCode - Duration code: "E" (event/real-time), "H" (hourly), "D" (daily), "M" (monthly)
 * @param start - Start date (YYYY-MM-DD)
 * @param end - End date (YYYY-MM-DD)
 */
export async function getSensorData(opts: {
  stationId: string;
  sensorNum: number;
  durCode?: string;
  start?: string;
  end?: string;
}): Promise<CdecSensorRecord[]> {
  const params = qp({
    Stations: opts.stationId.toUpperCase(),
    SensorNums: String(opts.sensorNum),
    dur_code: opts.durCode || "E",
    Start: opts.start,
    End: opts.end,
  });
  return api.get<CdecSensorRecord[]>("/dynamicapp/wsSensorData", params);
}

/**
 * Get station metadata.
 * @param stationId - Station ID to look up
 */
export async function getStationMeta(stationId: string): Promise<CdecStationMeta[]> {
  const params = qp({ station_id: stationId.toUpperCase() });
  return api.get<CdecStationMeta[]>("/dynamicapp/staMeta", params);
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
