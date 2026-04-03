/**
 * SEPTA SDK — typed API client for Southeastern Pennsylvania Transportation Authority.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { getTrainView, getNextToArrive, getBusView, getAlerts } from "us-gov-open-data-mcp/sdk/septa";
 *
 *   const trains = await getTrainView();
 *   const next = await getNextToArrive({ start: "Suburban Station", end: "Bryn Mawr", count: 5 });
 *
 * No API key required.
 * Docs: https://www3.septa.org/hackathon/
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://www3.septa.org",
  name: "septa",
  rateLimit: { perSecond: 5, burst: 10 },
  cacheTtlMs: 60 * 1000, // 1 minute — real-time data
});

// ─── Types ───────────────────────────────────────────────────────────

/** Regional rail train position. */
export interface SeptaTrain {
  lat: string;
  lon: string;
  trainno: string;
  service: string;
  dest: string;
  currentstop: string;
  nextstop: string;
  line: string;
  consist: string;
  heading: number | string;
  late: number;
  SOURCE: string;
  TRACK: string;
  TRACK_CHANGE: string;
  [key: string]: unknown;
}

/** Next-to-arrive result. */
export interface SeptaNextToArrive {
  orig_train: string;
  orig_line: string;
  orig_departure_time: string;
  orig_arrival_time: string;
  orig_delay: string;
  term_train: string;
  term_line: string;
  term_depart_time: string;
  term_arrival_time: string;
  connection?: string;
  isdirect: string;
  [key: string]: unknown;
}

/** Bus/trolley position. */
export interface SeptaBusPosition {
  lat: string;
  lng: string;
  label: string;
  route_id: string;
  trip: string;
  VehicleID: string;
  BlockID: string;
  Direction: string;
  destination: string;
  Offset: number;
  [key: string]: unknown;
}

/** Service alert. */
export interface SeptaAlert {
  route_id: string;
  route_name: string;
  current_message: string;
  advisory_message?: string;
  detour_message?: string;
  detour_start_location?: string;
  detour_reason?: string;
  last_updated: string;
  isSnow: string;
  [key: string]: unknown;
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Get all regional rail train positions.
 */
export async function getTrainView(): Promise<SeptaTrain[]> {
  return api.get<SeptaTrain[]>("/hackathon/TrainView/");
}

/**
 * Get next trains arriving between two stations.
 */
export async function getNextToArrive(opts: {
  start: string;
  end: string;
  count?: number;
}): Promise<SeptaNextToArrive[]> {
  const count = opts.count ?? 4;
  const startEncoded = encodeURIComponent(opts.start);
  const endEncoded = encodeURIComponent(opts.end);
  return api.get<SeptaNextToArrive[]>(
    `/hackathon/NextToArrive/${startEncoded}/${endEncoded}/${count}`,
  );
}

/**
 * Get bus/trolley positions by route number.
 */
export async function getBusView(opts: {
  route: string;
}): Promise<Record<string, unknown>> {
  return api.get<Record<string, unknown>>(
    `/hackathon/TransitView/${encodeURIComponent(opts.route)}`,
  );
}

/**
 * Get service alerts for all routes.
 */
export async function getAlerts(): Promise<SeptaAlert[]> {
  return api.get<SeptaAlert[]>("/api/Alerts/");
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
