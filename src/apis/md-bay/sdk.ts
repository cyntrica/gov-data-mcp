/**
 * Chesapeake Bay CBIBS SDK — typed API client for buoy data.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { getStations, getLatestReadings, getHistoricalData } from "us-gov-open-data-mcp/sdk/md-bay";
 *
 *   const stations = await getStations();
 *   const latest = await getLatestReadings("AN");
 *   const history = await getHistoricalData({ station: "AN", variable: "water_temp", startDate: "2024-01-01", endDate: "2024-01-31" });
 *
 * API key required (free). Sign up at: https://buoybay.noaa.gov/data/api
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ─────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://mw.buoybay.noaa.gov/api/v1",
  name: "md-bay",
  auth: {
    type: "query",
    envParams: { key: "CBIBS_API_KEY" },
  },
  rateLimit: { perSecond: 3, burst: 8 },
  cacheTtlMs: 5 * 60 * 1000, // 5 minutes — buoy data updates frequently
});

// ─── Types ──────────────────────────────────────────────────────────

export type CBIBSRecord = Record<string, unknown>;

export interface StationInfo {
  station?: string;
  name?: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  [key: string]: unknown;
}

/** Station codes. */
export const STATIONS = {
  UP: "Upper Potomac",
  GR: "Gooses Reef",
  J: "Jamestown",
  FL: "First Landing",
  SR: "Stingray Point",
  PL: "Point Lookout",
  AN: "Annapolis",
  YS: "York Spit",
  N: "Norfolk",
  SN: "Susquehanna",
  S: "South",
} as const;

/** Common measurement variables. */
export const VARIABLES = {
  water_temp: "Water Temperature (°C)",
  salinity: "Salinity (PSU)",
  dissolved_oxygen: "Dissolved Oxygen (mg/L)",
  ph: "pH",
  turbidity: "Turbidity (NTU)",
  chlorophyll: "Chlorophyll (µg/L)",
  wind_speed: "Wind Speed (m/s)",
  wind_direction: "Wind Direction (degrees)",
  wave_height: "Wave Height (m)",
  wave_period: "Wave Period (s)",
  sea_netcurrent_speed: "Current Speed (cm/s)",
  air_temperature: "Air Temperature (°C)",
  air_pressure: "Air Pressure (mb)",
} as const;

// ─── Public API ─────────────────────────────────────────────────────

/**
 * Get all CBIBS station info with latest readings.
 */
export async function getStations(): Promise<CBIBSRecord[]> {
  const data = await api.get<CBIBSRecord | CBIBSRecord[]>("/json/station");
  return Array.isArray(data) ? data : [data];
}

/**
 * Get latest readings from a specific station.
 */
export async function getLatestReadings(station: string): Promise<CBIBSRecord> {
  return api.get<CBIBSRecord>(`/json/station/${station}`);
}

/**
 * Get historical data for a station and variable.
 *
 * Example:
 *   const data = await getHistoricalData({
 *     station: "AN",
 *     variable: "water_temp",
 *     startDate: "2024-06-01",
 *     endDate: "2024-06-30",
 *   });
 */
export async function getHistoricalData(opts: {
  station: string;
  variable: string;
  startDate: string;
  endDate: string;
}): Promise<CBIBSRecord[]> {
  const data = await api.get<CBIBSRecord | CBIBSRecord[]>("/json/query", qp({
    sd: opts.startDate,
    ed: opts.endDate,
    var: opts.variable,
    station: opts.station,
  }));
  return Array.isArray(data) ? data : [data];
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
