/**
 * MBTA SDK — typed API client for Massachusetts Bay Transportation Authority.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { getPredictions, getVehicles, getAlerts, getRoutes } from "us-gov-open-data-mcp/sdk/mbta";
 *
 *   const predictions = await getPredictions({ stop: "place-north", route: "CR-Fitchburg" });
 *   const vehicles = await getVehicles({ route: "Red" });
 *
 * Requires MBTA_API_KEY env var. Get one free at https://api-v3.mbta.com
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://api-v3.mbta.com",
  name: "mbta",
  auth: { type: "header", envParams: { "x-api-key": "MBTA_API_KEY" } },
  rateLimit: { perSecond: 10, burst: 20 },
  cacheTtlMs: 60 * 1000, // 1 minute — real-time data
});

// ─── Types ───────────────────────────────────────────────────────────

/** JSON:API response wrapper. */
export interface JsonApiResponse<T = Record<string, unknown>> {
  data: T[];
  included?: Record<string, unknown>[];
  links?: Record<string, string>;
}

/** Prediction record. */
export interface MbtaPrediction {
  id: string;
  type: string;
  attributes: {
    arrival_time?: string | null;
    departure_time?: string | null;
    direction_id?: number;
    status?: string | null;
    [key: string]: unknown;
  };
  relationships?: Record<string, unknown>;
}

/** Vehicle record. */
export interface MbtaVehicle {
  id: string;
  type: string;
  attributes: {
    latitude?: number;
    longitude?: number;
    bearing?: number;
    speed?: number | null;
    current_status?: string;
    current_stop_sequence?: number;
    updated_at?: string;
    [key: string]: unknown;
  };
  relationships?: Record<string, unknown>;
}

/** Alert record. */
export interface MbtaAlert {
  id: string;
  type: string;
  attributes: {
    header?: string;
    description?: string;
    severity?: number;
    effect?: string;
    lifecycle?: string;
    active_period?: Array<{ start?: string; end?: string }>;
    [key: string]: unknown;
  };
}

/** Route record. */
export interface MbtaRoute {
  id: string;
  type: string;
  attributes: {
    long_name?: string;
    short_name?: string;
    description?: string;
    type?: number;
    color?: string;
    text_color?: string;
    sort_order?: number;
    [key: string]: unknown;
  };
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Get real-time arrival/departure predictions for a stop and/or route.
 */
export async function getPredictions(opts: {
  stop?: string;
  route?: string;
  limit?: number;
}): Promise<JsonApiResponse<MbtaPrediction>> {
  const params = qp({
    "filter[stop]": opts.stop,
    "filter[route]": opts.route,
    "page[limit]": opts.limit ?? 10,
  });
  return api.get<JsonApiResponse<MbtaPrediction>>("/predictions", params);
}

/**
 * Get live vehicle positions, optionally filtered by route.
 */
export async function getVehicles(opts?: {
  route?: string;
  limit?: number;
}): Promise<JsonApiResponse<MbtaVehicle>> {
  const params = qp({
    "filter[route]": opts?.route,
    "page[limit]": opts?.limit ?? 20,
  });
  return api.get<JsonApiResponse<MbtaVehicle>>("/vehicles", params);
}

/**
 * Get service alerts, optionally filtered by route.
 */
export async function getAlerts(opts?: {
  route?: string;
  limit?: number;
}): Promise<JsonApiResponse<MbtaAlert>> {
  const params = qp({
    "filter[route]": opts?.route,
    "page[limit]": opts?.limit ?? 20,
  });
  return api.get<JsonApiResponse<MbtaAlert>>("/alerts", params);
}

/**
 * List routes, optionally filtered by type.
 */
export async function getRoutes(opts?: {
  type?: number;
  limit?: number;
}): Promise<JsonApiResponse<MbtaRoute>> {
  const params = qp({
    "filter[type]": opts?.type,
    "page[limit]": opts?.limit ?? 50,
  });
  return api.get<JsonApiResponse<MbtaRoute>>("/routes", params);
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
