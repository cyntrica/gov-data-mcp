/**
 * NOAA Space Weather Prediction Center SDK — space weather data.
 *
 * SWPC serves static JSON files — no auth required.
 * Data updates every few minutes for real-time products.
 *
 * API base: https://services.swpc.noaa.gov
 * Docs: https://www.swpc.noaa.gov/products
 *
 * Usage:
 *   import { getAlerts, getKpIndex, getSolarWind } from "us-gov-open-data-mcp/sdk/noaa-swpc";
 *   const alerts = await getAlerts();
 *   const kp = await getKpIndex();
 *   const wind = await getSolarWind("plasma");
 */

import { createClient } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://services.swpc.noaa.gov",
  name: "noaa-swpc",
  cacheTtlMs: 5 * 60 * 1000, // 5 min — data updates frequently
});

// ─── Helpers ─────────────────────────────────────────────────────────

/**
 * Many SWPC endpoints return arrays where the first element is headers
 * (column names) and subsequent elements are data rows.
 * This converts them to arrays of objects.
 *
 * Example input:  [["time_tag","Kp","a_running"], ["2024-01-01 00:00:00","2","5"]]
 * Example output: [{ time_tag: "2024-01-01 00:00:00", Kp: "2", a_running: "5" }]
 */
function headerArrayToObjects(data: unknown[][]): Record<string, unknown>[] {
  if (!Array.isArray(data) || data.length < 2) return [];
  const headers = data[0] as string[];
  return data.slice(1).map(row => {
    const obj: Record<string, unknown> = {};
    for (let i = 0; i < headers.length; i++) {
      obj[headers[i]] = row[i] ?? null;
    }
    return obj;
  });
}

// ─── Public API ──────────────────────────────────────────────────────

/** Get current space weather alerts and warnings. */
export async function getAlerts(): Promise<Record<string, unknown>[]> {
  const data = await api.get<Record<string, unknown>[]>("/products/alerts.json");
  return Array.isArray(data) ? data : [];
}

/** Get current NOAA space weather scale levels (R/S/G). */
export async function getScales(): Promise<Record<string, unknown>> {
  return api.get<Record<string, unknown>>("/products/noaa-scales.json");
}

/** Get recent planetary Kp index values. */
export async function getKpIndex(): Promise<Record<string, unknown>[]> {
  const data = await api.get<unknown[][]>("/products/noaa-planetary-k-index.json");
  return headerArrayToObjects(data);
}

/** Get Dst (disturbance storm time) index. */
export async function getDstIndex(): Promise<Record<string, unknown>[]> {
  const data = await api.get<unknown[][]>("/products/kyoto-dst.json");
  return headerArrayToObjects(data);
}

/** Get F10.7 cm solar radio flux. */
export async function getSolarFlux(): Promise<Record<string, unknown>[]> {
  const data = await api.get<unknown[][]>("/products/solar-cycle/f107_cm_flux.json");
  return headerArrayToObjects(data);
}

/** Get monthly sunspot numbers. */
export async function getSunspots(): Promise<Record<string, unknown>[]> {
  const data = await api.get<unknown[][]>("/products/solar-cycle/sunspot-number.json");
  return headerArrayToObjects(data);
}

/** Get 7-day solar wind data (plasma or magnetic field). */
export async function getSolarWind(type: "plasma" | "mag" = "plasma"): Promise<Record<string, unknown>[]> {
  const path = type === "mag"
    ? "/products/solar-wind/mag-7-day.json"
    : "/products/solar-wind/plasma-7-day.json";
  const data = await api.get<unknown[][]>(path);
  return headerArrayToObjects(data);
}

/** Get GOES X-ray flux data. */
export async function getGoesXray(): Promise<Record<string, unknown>[]> {
  const data = await api.get<unknown[][]>("/products/goes-x-ray-flux.json");
  return headerArrayToObjects(data);
}

/** Get GOES energetic particle flux data. */
export async function getGoesParticles(): Promise<Record<string, unknown>[]> {
  const data = await api.get<unknown[][]>("/products/goes-particle-flux.json");
  return headerArrayToObjects(data);
}

/** Get northern hemisphere aurora probability forecast (24h). */
export async function getAuroraForecast(): Promise<Record<string, unknown>> {
  return api.get<Record<string, unknown>>("/products/animations/ovation_north_24h.json");
}

/** Get predicted solar cycle progression. */
export async function getSolarCycle(): Promise<Record<string, unknown>[]> {
  const data = await api.get<unknown[][]>("/products/solar-cycle/predicted-solar-cycle.json");
  return headerArrayToObjects(data);
}

/** Get 3-day space weather forecast text. */
export async function getForecast(): Promise<unknown> {
  return api.get<unknown>("/products/3-day-forecast.json");
}

/** Get 3-day geomagnetic forecast (Kp predictions). */
export async function getGeomagForecast(): Promise<unknown> {
  return api.get<unknown>("/products/3-day-geomag-forecast.json");
}

/**
 * Clear Cache.
 */
export function clearCache(): void { api.clearCache(); }
