/**
 * NOAA CO-OPS (Tides & Currents) SDK — water levels, tide predictions, currents, meteorological data.
 *
 * API docs: https://api.tidesandcurrents.noaa.gov/api/prod/
 * No API key required.
 *
 * Usage:
 *   import { getWaterLevel, getTidePredictions, listStations } from "us-gov-open-data-mcp/sdk/noaa-coops";
 *   const data = await getWaterLevel({ station: "8454000", date: "latest" });
 */

import { createClient, qp, type Params } from "../../shared/client.js";

const api = createClient({
  baseUrl: "https://api.tidesandcurrents.noaa.gov",
  name: "noaa-coops",
  cacheTtlMs: 15 * 60 * 1000, // 15 min cache
});

// ─── Types ───────────────────────────────────────────────────────────

/** Common options for data getter endpoints. */
export interface CoopsDataOpts {
  station: string;
  begin_date?: string;
  end_date?: string;
  date?: "today" | "latest" | "recent";
  datum?: "STND" | "MHHW" | "MHW" | "MTL" | "MSL" | "MLW" | "MLLW" | "NAVD";
  units?: "english" | "metric";
  time_zone?: "gmt" | "lst" | "lst_ldt";
}

/** Options for tide predictions. */
export interface CoopsPredictionOpts extends CoopsDataOpts {
  interval?: "h" | "hilo" | "1" | "6";
}

/** Options for currents. */
export interface CoopsCurrentOpts extends CoopsDataOpts {
  bin?: number;
}

/** Options for current predictions. */
export interface CoopsCurrentPredictionOpts extends CoopsCurrentOpts {
  interval?: "h" | "1" | "6" | "MAX_SLACK";
}

/** Options for meteorological data. */
export interface CoopsMeteorologicalOpts extends CoopsDataOpts {
  product: "air_temperature" | "water_temperature" | "wind" | "air_pressure" | "humidity" | "visibility";
}

/** Data point from the CO-OPS data getter API. */
export interface CoopsDataPoint {
  t: string;
  v: string;
  s?: string;
  f?: string;
  q?: string;
  [key: string]: unknown;
}

/** Response from the data getter API. */
export interface CoopsDataResponse {
  metadata?: Record<string, unknown>;
  data?: CoopsDataPoint[];
  predictions?: CoopsDataPoint[];
  error?: { message: string };
}

/** CO-OPS station metadata. */
export interface CoopsStation {
  id: string;
  name: string;
  state: string;
  lat: number;
  lng: number;
  [key: string]: unknown;
}

/** Station list response from metadata API. */
export interface CoopsStationsResponse {
  count?: number;
  stations?: CoopsStation[];
  stationList?: CoopsStation[];
  [key: string]: unknown;
}

// ─── Helpers ─────────────────────────────────────────────────────────

/** Build common data getter params. */
function dataParams(product: string, opts: CoopsDataOpts, extra?: Params): Params {
  return qp({
    station: opts.station,
    product,
    begin_date: opts.begin_date,
    end_date: opts.end_date,
    date: opts.date,
    datum: opts.datum ?? "STND",
    units: opts.units ?? "metric",
    time_zone: opts.time_zone ?? "gmt",
    format: "json",
    application: "us-gov-open-data-mcp",
    ...extra,
  });
}

/** Fetch from the data getter endpoint and normalize the response. */
async function fetchData(product: string, opts: CoopsDataOpts, extra?: Params): Promise<CoopsDataResponse> {
  const params = dataParams(product, opts, extra);
  const data = await api.get<CoopsDataResponse>("/api/prod/datagetter", params);
  if (data.error) {
    throw new Error(`noaa-coops: ${data.error.message}`);
  }
  return data;
}

// ─── Public API ──────────────────────────────────────────────────────

/** Get observed water levels for a station. */
export async function getWaterLevel(opts: CoopsDataOpts): Promise<{ data: CoopsDataPoint[]; metadata?: Record<string, unknown> }> {
  const res = await fetchData("water_level", opts);
  return { data: res.data ?? [], metadata: res.metadata };
}

/** Get tide predictions for a station. */
export async function getTidePredictions(opts: CoopsPredictionOpts): Promise<{ data: CoopsDataPoint[]; metadata?: Record<string, unknown> }> {
  const res = await fetchData("predictions", opts, qp({ interval: opts.interval }));
  return { data: res.predictions ?? res.data ?? [], metadata: res.metadata };
}

/** Get high/low tide observations. */
export async function getHighLow(opts: CoopsDataOpts): Promise<{ data: CoopsDataPoint[]; metadata?: Record<string, unknown> }> {
  const res = await fetchData("high_low", opts);
  return { data: res.data ?? [], metadata: res.metadata };
}

/** Get current speed/direction observations. */
export async function getCurrents(opts: CoopsCurrentOpts): Promise<{ data: CoopsDataPoint[]; metadata?: Record<string, unknown> }> {
  const res = await fetchData("currents", opts, qp({ bin: opts.bin }));
  return { data: res.data ?? [], metadata: res.metadata };
}

/** Get current predictions. */
export async function getCurrentPredictions(opts: CoopsCurrentPredictionOpts): Promise<{ data: CoopsDataPoint[]; metadata?: Record<string, unknown> }> {
  const res = await fetchData("currents_predictions", opts, qp({ bin: opts.bin, interval: opts.interval }));
  return { data: res.predictions ?? res.data ?? [], metadata: res.metadata };
}

/** Get meteorological data (air temp, water temp, wind, pressure, humidity, visibility). */
export async function getMeteorologicalData(opts: CoopsMeteorologicalOpts): Promise<{ data: CoopsDataPoint[]; metadata?: Record<string, unknown> }> {
  const res = await fetchData(opts.product, opts);
  return { data: res.data ?? [], metadata: res.metadata };
}

/** Get conductivity/salinity (water quality) data. */
export async function getWaterQuality(opts: CoopsDataOpts): Promise<{ data: CoopsDataPoint[]; metadata?: Record<string, unknown> }> {
  const res = await fetchData("conductivity", opts);
  return { data: res.data ?? [], metadata: res.metadata };
}

/** Get air gap (bridge clearance) data. */
export async function getAirGap(opts: CoopsDataOpts): Promise<{ data: CoopsDataPoint[]; metadata?: Record<string, unknown> }> {
  const res = await fetchData("air_gap", opts);
  return { data: res.data ?? [], metadata: res.metadata };
}

/** Get detailed metadata for a specific station. */
export async function getStationMetadata(stationId: string): Promise<Record<string, unknown>> {
  const data = await api.get<Record<string, unknown>>(`/mdapi/prod/webapi/stations/${stationId}.json`);
  return data;
}

/** List/search CO-OPS stations. Optionally filter by type and state. */
export async function listStations(opts?: {
  type?: string;
  state?: string;
}): Promise<{ count: number; stations: CoopsStation[] }> {
  const params = qp({ type: opts?.type });
  const data = await api.get<CoopsStationsResponse>("/mdapi/prod/webapi/stations.json", params);
  let stations = data.stations ?? data.stationList ?? [];

  // Client-side state filter
  if (opts?.state) {
    const stateUpper = opts.state.toUpperCase();
    stations = stations.filter(s => s.state?.toUpperCase() === stateUpper);
  }

  return { count: stations.length, stations };
}

/**
 * Clear Cache.
 */
export function clearCache(): void { api.clearCache(); }
