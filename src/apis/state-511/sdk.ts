import { createClient, qp, type ApiClient } from "../../shared/client.js";
import { getTrafficConfig, type Traffic511Config } from "./registry.js";

// ─── Lazy Client Cache ──────────────────────────────────────────────

const clients = new Map<string, ApiClient>();

function getClient(config: Traffic511Config): ApiClient {
  if (!clients.has(config.code)) {
    const authConfig = config.authEnvVar && config.authType === "query"
      ? { type: "query" as const, envParams: { [config.authParamName!]: config.authEnvVar } }
      : config.authEnvVar && config.authType === "header"
        ? { type: "header" as const, envParams: { [config.authParamName!]: config.authEnvVar } }
        : undefined;

    clients.set(config.code, createClient({
      baseUrl: config.baseUrl,
      name: `511-${config.code.toLowerCase()}`,
      auth: authConfig,
      rateLimit: { perSecond: 1, burst: 3 }, // 10 calls/60s for most 511 APIs
      cacheTtlMs: 2 * 60 * 1000, // 2 minutes — real-time data
    }));
  }
  return clients.get(config.code)!;
}

export type TrafficRecord = Record<string, unknown>;

// ─── ibi511 Platform ────────────────────────────────────────────────

async function ibi511Get(state: string, endpoint: string): Promise<TrafficRecord[]> {
  const config = getTrafficConfig(state);
  const client = getClient(config);
  return client.get<TrafficRecord[]>(`/${endpoint}`);
}

// ─── OHGO Platform ──────────────────────────────────────────────────

async function ohgoGet(endpoint: string): Promise<TrafficRecord[]> {
  const config = getTrafficConfig("OH");
  const client = getClient(config);
  const data = await client.get<TrafficRecord>(`/${endpoint}`);
  return Array.isArray(data) ? data : (data as any)?.results ?? [data];
}

// ─── NCDOT Platform ─────────────────────────────────────────────────

async function ncdotGet(endpoint: string): Promise<TrafficRecord[]> {
  const config = getTrafficConfig("NC");
  const client = getClient(config);
  const data = await client.get<TrafficRecord[]>(`/${endpoint}`);
  return Array.isArray(data) ? data : [data];
}

// ─── WSDOT Platform ─────────────────────────────────────────────────

async function wsdotGet(service: string, method: string): Promise<TrafficRecord[]> {
  const config = getTrafficConfig("WA");
  const client = getClient(config);
  const data = await client.get<TrafficRecord[]>(
    `/${service}/${service}REST.svc/${method}`,
  );
  return Array.isArray(data) ? data : [data];
}

// ─── Public API ─────────────────────────────────────────────────────

/** Get traffic incidents for a state. */
export async function getIncidents(state: string): Promise<TrafficRecord[]> {
  const config = getTrafficConfig(state);
  switch (config.platform) {
    case "ibi511": return ibi511Get(state, "event");
    case "ohgo": return ohgoGet("incidents");
    case "ncdot": return ncdotGet("incidents");
    case "wsdot": return wsdotGet("HighwayAlerts", "GetAlertsAsJson");
    default: throw new Error(`Unsupported platform: ${config.platform}`);
  }
}

/** Get traffic cameras for a state. */
export async function getCameras(state: string): Promise<TrafficRecord[]> {
  const config = getTrafficConfig(state);
  switch (config.platform) {
    case "ibi511": return ibi511Get(state, "cameras");
    case "ohgo": return ohgoGet("cameras");
    default: return [];
  }
}

/** Get dynamic message signs for a state. */
export async function getSigns(state: string): Promise<TrafficRecord[]> {
  const config = getTrafficConfig(state);
  switch (config.platform) {
    case "ibi511": return ibi511Get(state, "messagesigns");
    case "ohgo": return ohgoGet("digital-signs");
    default: return [];
  }
}

/** Get road weather station data for a state. */
export async function getWeather(state: string): Promise<TrafficRecord[]> {
  const config = getTrafficConfig(state);
  switch (config.platform) {
    case "ibi511": return ibi511Get(state, "weatherstations");
    case "ohgo": return ohgoGet("weather-sensor-sites");
    default: return [];
  }
}

/** Get road conditions for a state. */
export async function getRoadConditions(state: string): Promise<TrafficRecord[]> {
  const config = getTrafficConfig(state);
  switch (config.platform) {
    case "ibi511": return ibi511Get(state, "roadconditions");
    case "ohgo": return ohgoGet("construction");
    case "wsdot": return wsdotGet("TrafficFlow", "GetTrafficFlowsAsJson");
    default: return [];
  }
}

/** Clear all cached responses. */
export function clearCache(): void {
  for (const client of clients.values()) client.clearCache();
}
