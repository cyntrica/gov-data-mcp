/**
 * Maryland CHART SDK — typed API client for real-time traffic data.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { getIncidents, getClosures, getSpeedData } from "us-gov-open-data-mcp/sdk/md-traffic";
 *
 *   const incidents = await getIncidents();
 *   const closures = await getClosures();
 *   const speeds = await getSpeedData();
 *
 * No API key required. All feeds are public.
 * Docs: https://chart.maryland.gov/DataFeeds/GetDataFeeds
 */

import { createClient } from "../../shared/client.js";

// ─── Client ─────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://chart.maryland.gov",
  name: "md-traffic",
  rateLimit: { perSecond: 3, burst: 8 },
  cacheTtlMs: 60 * 1000, // 1 minute — real-time data
});

// ─── Types ──────────────────────────────────────────────────────────

export interface TrafficIncident {
  id?: string;
  description?: string;
  location?: string;
  road?: string;
  direction?: string;
  latitude?: number;
  longitude?: number;
  type?: string;
  severity?: string;
  startTime?: string;
  lastUpdated?: string;
  lanes?: string;
  [key: string]: unknown;
}

export interface RoadClosure {
  id?: string;
  description?: string;
  road?: string;
  direction?: string;
  location?: string;
  startTime?: string;
  endTime?: string;
  latitude?: number;
  longitude?: number;
  [key: string]: unknown;
}

export interface TrafficCamera {
  id?: string;
  name?: string;
  description?: string;
  road?: string;
  direction?: string;
  latitude?: number;
  longitude?: number;
  imageUrl?: string;
  [key: string]: unknown;
}

export interface SpeedSensor {
  id?: string;
  description?: string;
  road?: string;
  direction?: string;
  latitude?: number;
  longitude?: number;
  speed?: number;
  averageSpeed?: number;
  volume?: number;
  occupancy?: number;
  lastUpdated?: string;
  [key: string]: unknown;
}

export interface WeatherStation {
  id?: string;
  description?: string;
  road?: string;
  latitude?: number;
  longitude?: number;
  airTemperature?: number;
  surfaceTemperature?: number;
  humidity?: number;
  windSpeed?: number;
  windDirection?: string;
  precipitation?: string;
  visibility?: number;
  lastUpdated?: string;
  [key: string]: unknown;
}

export interface DynamicSign {
  id?: string;
  description?: string;
  road?: string;
  direction?: string;
  latitude?: number;
  longitude?: number;
  message?: string;
  lastUpdated?: string;
  [key: string]: unknown;
}

export interface TravelTimeRoute {
  id?: string;
  name?: string;
  description?: string;
  travelTime?: number;
  speed?: number;
  freeFlowTime?: number;
  distance?: number;
  lastUpdated?: string;
  [key: string]: unknown;
}

// ─── Public API ─────────────────────────────────────────────────────

/** Get active traffic incidents. */
export async function getIncidents(): Promise<TrafficIncident[]> {
  return api.get<TrafficIncident[]>("/DataFeeds/GetIncidents.Json");
}

/** Get active road closures. */
export async function getClosures(): Promise<RoadClosure[]> {
  return api.get<RoadClosure[]>("/DataFeeds/GetClosures.Json");
}

/** Get traffic camera locations. */
export async function getCameras(): Promise<TrafficCamera[]> {
  return api.get<TrafficCamera[]>("/DataFeeds/GetCameras.Json");
}

/** Get speed sensor data. */
export async function getSpeedData(): Promise<SpeedSensor[]> {
  return api.get<SpeedSensor[]>("/DataFeeds/GetTss.Json");
}

/** Get road weather information system (RWIS) data. */
export async function getWeatherStations(): Promise<WeatherStation[]> {
  return api.get<WeatherStation[]>("/DataFeeds/GetRwis.Json");
}

/** Get dynamic message sign (DMS) content. */
export async function getDMSSigns(): Promise<DynamicSign[]> {
  return api.get<DynamicSign[]>("/DataFeeds/GetDms.Json");
}

/** Get travel time route data. */
export async function getTravelTimes(): Promise<TravelTimeRoute[]> {
  return api.get<TravelTimeRoute[]>("/DataFeeds/GetTravelTimeRoutes.Json");
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
