/**
 * National Weather Service SDK — forecasts, alerts, observations, stations.
 *
 * API docs: https://www.weather.gov/documentation/services-web-api
 * No API key required — User-Agent header is mandatory.
 * Rate limit: ~5 req/sec recommended
 *
 * Usage:
 *   import { pointLookup, getForecast, getActiveAlerts } from "us-gov-open-data-mcp/sdk/nws";
 *   const point = await pointLookup(40.7128, -74.006);
 *   const forecast = await getForecast({ office: point.office, gridX: point.gridX, gridY: point.gridY });
 */

import { createClient, qp } from "../../shared/client.js";

const api = createClient({
  baseUrl: "https://api.weather.gov",
  name: "nws",
  cacheTtlMs: 5 * 60 * 1000, // 5 min — weather changes frequently
  rateLimit: { perSecond: 5, burst: 10 },
  defaultHeaders: {
    "User-Agent": "(us-gov-open-data-mcp, mcp@example.com)",
    Accept: "application/geo+json",
  },
});

// ─── Types ───────────────────────────────────────────────────────────

export interface PointInfo {
  office: string;
  gridX: number;
  gridY: number;
  forecastUrl: string;
  forecastHourlyUrl: string;
  forecastZone: string;
  county: string;
  timezone: string;
  radarStation: string;
}

export interface ForecastPeriod {
  number: number;
  name: string;
  startTime: string;
  endTime: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: string;
  windSpeed: string;
  windDirection: string;
  shortForecast: string;
  detailedForecast: string;
}

export interface Alert {
  id: string;
  event: string;
  headline: string;
  description: string;
  severity: string;
  urgency: string;
  certainty: string;
  areaDesc: string;
  effective: string;
  expires: string;
  senderName: string;
  status: string;
  messageType: string;
  category: string;
  instruction: string;
}

export interface Observation {
  station: string;
  timestamp: string;
  temperature_c: number | null;
  dewpoint_c: number | null;
  humidity_pct: number | null;
  wind_speed_kmh: number | null;
  wind_direction_deg: number | null;
  barometric_pressure_pa: number | null;
  visibility_m: number | null;
  text_description: string;
}

export interface Station {
  stationId: string;
  name: string;
  latitude: number;
  longitude: number;
  elevation_m: number | null;
  timezone: string;
}

export interface Zone {
  id: string;
  name: string;
  type: string;
  state: string;
}

export interface ZoneForecastPeriod {
  number: number;
  name: string;
  detailedForecast: string;
}

// ─── GeoJSON helpers ────────────────────────────────────────────────

interface GeoJsonFeatureCollection<T = any> {
  features: Array<{ properties: T; [k: string]: any }>;
  [k: string]: any;
}

interface GeoJsonFeature<T = any> {
  properties: T;
  [k: string]: any;
}

/** Extract value from NWS unit-value objects like { value: 22.2, unitCode: "wmoUnit:degC" } */
function unitVal(obj: any): number | null {
  if (obj == null) return null;
  if (typeof obj === "number") return obj;
  if (typeof obj === "object" && obj.value != null) return obj.value;
  return null;
}

// ─── Public API ──────────────────────────────────────────────────────

/** Resolve lat/lon to a forecast grid point. */
export async function pointLookup(latitude: number, longitude: number): Promise<PointInfo> {
  const data = await api.get<GeoJsonFeature>(`/points/${latitude},${longitude}`);
  const p = data.properties;
  return {
    office: p.gridId ?? p.cwa,
    gridX: p.gridX,
    gridY: p.gridY,
    forecastUrl: p.forecast,
    forecastHourlyUrl: p.forecastHourly,
    forecastZone: p.forecastZone?.split("/").pop() ?? "",
    county: p.county?.split("/").pop() ?? "",
    timezone: p.timeZone,
    radarStation: p.radarStation,
  };
}

/** Get 7-day forecast by grid coordinates. */
export async function getForecast(opts: {
  office: string;
  gridX: number;
  gridY: number;
}): Promise<ForecastPeriod[]> {
  const data = await api.get<GeoJsonFeature<{ periods: any[] }>>(
    `/gridpoints/${opts.office}/${opts.gridX},${opts.gridY}/forecast`,
  );
  return (data.properties.periods ?? []).map((p: any) => ({
    number: p.number,
    name: p.name,
    startTime: p.startTime,
    endTime: p.endTime,
    isDaytime: p.isDaytime,
    temperature: p.temperature,
    temperatureUnit: p.temperatureUnit,
    windSpeed: p.windSpeed,
    windDirection: p.windDirection,
    shortForecast: p.shortForecast,
    detailedForecast: p.detailedForecast,
  }));
}

/** Get 7-day forecast by lat/lon (convenience — does point lookup internally). */
export async function getForecastByLatLon(latitude: number, longitude: number): Promise<{ point: PointInfo; periods: ForecastPeriod[] }> {
  const point = await pointLookup(latitude, longitude);
  const periods = await getForecast({ office: point.office, gridX: point.gridX, gridY: point.gridY });
  return { point, periods };
}

/** Get hourly forecast by grid coordinates. */
export async function getForecastHourly(opts: {
  office: string;
  gridX: number;
  gridY: number;
}): Promise<ForecastPeriod[]> {
  const data = await api.get<GeoJsonFeature<{ periods: any[] }>>(
    `/gridpoints/${opts.office}/${opts.gridX},${opts.gridY}/forecast/hourly`,
  );
  return (data.properties.periods ?? []).map((p: any) => ({
    number: p.number,
    name: p.name,
    startTime: p.startTime,
    endTime: p.endTime,
    isDaytime: p.isDaytime,
    temperature: p.temperature,
    temperatureUnit: p.temperatureUnit,
    windSpeed: p.windSpeed,
    windDirection: p.windDirection,
    shortForecast: p.shortForecast,
    detailedForecast: p.detailedForecast ?? "",
  }));
}

/** Get hourly forecast by lat/lon (convenience). */
export async function getForecastHourlyByLatLon(latitude: number, longitude: number): Promise<{ point: PointInfo; periods: ForecastPeriod[] }> {
  const point = await pointLookup(latitude, longitude);
  const periods = await getForecastHourly({ office: point.office, gridX: point.gridX, gridY: point.gridY });
  return { point, periods };
}

/** Parse alert features into clean objects. */
function parseAlerts(data: GeoJsonFeatureCollection): Alert[] {
  return (data.features ?? []).map((f: any) => {
    const p = f.properties;
    return {
      id: p.id ?? f.id ?? "",
      event: p.event ?? "",
      headline: p.headline ?? "",
      description: p.description ?? "",
      severity: p.severity ?? "",
      urgency: p.urgency ?? "",
      certainty: p.certainty ?? "",
      areaDesc: p.areaDesc ?? "",
      effective: p.effective ?? "",
      expires: p.expires ?? "",
      senderName: p.senderName ?? "",
      status: p.status ?? "",
      messageType: p.messageType ?? "",
      category: p.category ?? "",
      instruction: p.instruction ?? "",
    };
  });
}

/** Get active weather alerts with optional filters. */
export async function getActiveAlerts(opts?: {
  area?: string;
  event?: string;
  severity?: string;
  urgency?: string;
  certainty?: string;
  limit?: number;
}): Promise<Alert[]> {
  const params = qp({
    area: opts?.area,
    event: opts?.event,
    severity: opts?.severity,
    urgency: opts?.urgency,
    certainty: opts?.certainty,
  });
  const data = await api.get<GeoJsonFeatureCollection>("/alerts/active", params);
  return parseAlerts(data);
}

/** Get active alerts for a specific state. */
export async function getAlertsByState(state: string): Promise<Alert[]> {
  const data = await api.get<GeoJsonFeatureCollection>(`/alerts/active/area/${state.toUpperCase()}`);
  return parseAlerts(data);
}

/** Get full details for a specific alert. */
export async function getAlertDetail(alertId: string): Promise<Alert> {
  const data = await api.get<GeoJsonFeature>(`/alerts/${encodeURIComponent(alertId)}`);
  const p = data.properties;
  return {
    id: p.id ?? alertId,
    event: p.event ?? "",
    headline: p.headline ?? "",
    description: p.description ?? "",
    severity: p.severity ?? "",
    urgency: p.urgency ?? "",
    certainty: p.certainty ?? "",
    areaDesc: p.areaDesc ?? "",
    effective: p.effective ?? "",
    expires: p.expires ?? "",
    senderName: p.senderName ?? "",
    status: p.status ?? "",
    messageType: p.messageType ?? "",
    category: p.category ?? "",
    instruction: p.instruction ?? "",
  };
}

/** Parse observation data, flattening unit-value pairs. */
function parseObservation(p: any): Observation {
  return {
    station: p.station?.split("/").pop() ?? "",
    timestamp: p.timestamp ?? "",
    temperature_c: unitVal(p.temperature),
    dewpoint_c: unitVal(p.dewpoint),
    humidity_pct: unitVal(p.relativeHumidity),
    wind_speed_kmh: unitVal(p.windSpeed),
    wind_direction_deg: unitVal(p.windDirection),
    barometric_pressure_pa: unitVal(p.barometricPressure),
    visibility_m: unitVal(p.visibility),
    text_description: p.textDescription ?? "",
  };
}

/** Get latest observation from a station. */
export async function getLatestObservation(stationId: string): Promise<Observation> {
  const data = await api.get<GeoJsonFeature>(`/stations/${stationId.toUpperCase()}/observations/latest`);
  return parseObservation(data.properties);
}

/** Get observation history from a station. */
export async function getObservationHistory(opts: {
  stationId: string;
  start?: string;
  end?: string;
  limit?: number;
}): Promise<Observation[]> {
  const params = qp({
    start: opts.start,
    end: opts.end,
    limit: opts.limit ?? 24,
  });
  const data = await api.get<GeoJsonFeatureCollection>(`/stations/${opts.stationId.toUpperCase()}/observations`, params);
  return (data.features ?? []).map((f: any) => parseObservation(f.properties));
}

/** Find weather stations by state or list all. */
export async function getStations(opts?: {
  state?: string;
  limit?: number;
}): Promise<Station[]> {
  const params = qp({
    state: opts?.state?.toUpperCase(),
    limit: opts?.limit ?? 50,
  });
  const data = await api.get<GeoJsonFeatureCollection>("/stations", params);
  return (data.features ?? []).map((f: any) => {
    const p = f.properties;
    const coords = f.geometry?.coordinates;
    return {
      stationId: p.stationIdentifier ?? "",
      name: p.name ?? "",
      latitude: coords?.[1] ?? 0,
      longitude: coords?.[0] ?? 0,
      elevation_m: unitVal(p.elevation),
      timezone: p.timeZone ?? "",
    };
  });
}

/** Find nearest stations to a lat/lon point. */
export async function getNearbyStations(latitude: number, longitude: number): Promise<Station[]> {
  const data = await api.get<GeoJsonFeatureCollection>(`/points/${latitude},${longitude}/stations`);
  return (data.features ?? []).map((f: any) => {
    const p = f.properties;
    const coords = f.geometry?.coordinates;
    return {
      stationId: p.stationIdentifier ?? "",
      name: p.name ?? "",
      latitude: coords?.[1] ?? 0,
      longitude: coords?.[0] ?? 0,
      elevation_m: unitVal(p.elevation),
      timezone: p.timeZone ?? "",
    };
  });
}

/** Get forecast for a zone. */
export async function getZoneForecast(zoneId: string): Promise<{ zone: string; updated: string; periods: ZoneForecastPeriod[] }> {
  const data = await api.get<GeoJsonFeature>(`/zones/forecast/${zoneId}/forecast`);
  const p = data.properties;
  return {
    zone: zoneId,
    updated: p.updated ?? "",
    periods: (p.periods ?? []).map((pd: any) => ({
      number: pd.number,
      name: pd.name,
      detailedForecast: pd.detailedForecast,
    })),
  };
}

/** List forecast zones. */
export async function getZones(opts?: {
  type?: string;
  area?: string;
  limit?: number;
}): Promise<Zone[]> {
  const zoneType = opts?.type ?? "forecast";
  const params = qp({
    area: opts?.area?.toUpperCase(),
    limit: opts?.limit ?? 50,
    include_geometry: "false",
  });
  const data = await api.get<GeoJsonFeatureCollection>(`/zones/${zoneType}`, params);
  return (data.features ?? []).map((f: any) => {
    const p = f.properties;
    return {
      id: p.id ?? "",
      name: p.name ?? "",
      type: p.type ?? zoneType,
      state: p.state ?? "",
    };
  });
}

/** List radar stations. */
export async function getRadarStations(): Promise<any[]> {
  const data = await api.get<GeoJsonFeatureCollection>("/radar/stations");
  return (data.features ?? []).map((f: any) => {
    const p = f.properties;
    const coords = f.geometry?.coordinates;
    return {
      stationId: p.id ?? p.stationIdentifier ?? "",
      name: p.name ?? "",
      stationType: p.stationType ?? "",
      latitude: coords?.[1] ?? 0,
      longitude: coords?.[0] ?? 0,
    };
  });
}

/** Get NWS text products (AFD, HWO, etc.). */
export async function getTextProducts(opts: {
  type: string;
  location?: string;
}): Promise<any[]> {
  const path = opts.location
    ? `/products/types/${opts.type}/locations/${opts.location}`
    : `/products/types/${opts.type}`;
  const data = await api.get<{ "@graph"?: any[] }>(path);
  return (data["@graph"] ?? []).map((p: any) => ({
    id: p.id ?? "",
    wmoCollectiveId: p.wmoCollectiveId ?? "",
    issuingOffice: p.issuingOffice ?? "",
    issuanceTime: p.issuanceTime ?? "",
    productName: p.productName ?? "",
    productCode: p.productCode ?? "",
  }));
}

/** Get aviation SIGMETs. */
export async function getAviationSigmets(): Promise<any[]> {
  const data = await api.get<GeoJsonFeatureCollection>("/aviation/sigmets");
  return (data.features ?? []).map((f: any) => {
    const p = f.properties;
    return {
      id: p.id ?? "",
      sequence: p.sequence ?? "",
      phenomenon: p.phenomenon ?? "",
      atsu: p.atsu ?? "",
      start: p.start ?? "",
      end: p.end ?? "",
    };
  });
}

/** Get weather glossary. */
export async function getGlossary(): Promise<{ term: string; definition: string }[]> {
  const data = await api.get<{ glossary?: any[] }>("/glossary");
  return (data.glossary ?? []).map((g: any) => ({
    term: g.term ?? "",
    definition: g.definition ?? "",
  }));
}

/** Clear cache. */
export function clearCache(): void { api.clearCache(); }
