/**
 * WSDOT Ferries SDK — typed API client for Washington State Ferries data.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { getFerrySchedule, getVesselLocations, getTerminalSailingSpace } from "us-gov-open-data-mcp/sdk/wsdot-ferries";
 *
 *   const schedule = await getFerrySchedule({ date: "2026-04-02" });
 *   const vessels = await getVesselLocations();
 *   const terminals = await getTerminalSailingSpace();
 *
 * Requires WSDOT_ACCESS_CODE env var.
 * Signup: https://wsdot.wa.gov/traffic/api/
 */

import { createClient } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://www.wsdot.wa.gov/Ferries/API",
  name: "wsdot-ferries",
  auth: {
    type: "query",
    envParams: { apiaccesscode: "WSDOT_ACCESS_CODE" },
  },
  rateLimit: { perSecond: 5, burst: 10 },
  cacheTtlMs: 60 * 1000, // 1 minute — semi-real-time data
});

// ─── Types ───────────────────────────────────────────────────────────

/** Ferry schedule record. */
export interface FerrySchedule {
  RouteID?: number;
  Description?: string;
  CrossingTime?: string;
  Date?: string;
  Sailings?: unknown[];
  [key: string]: unknown;
}

/** Vessel location record. */
export interface VesselLocation {
  VesselID?: number;
  VesselName?: string;
  DepartingTerminalID?: number;
  DepartingTerminalName?: string;
  ArrivingTerminalID?: number;
  ArrivingTerminalName?: string;
  Latitude?: number;
  Longitude?: number;
  Speed?: number;
  Heading?: number;
  InService?: boolean;
  AtDock?: boolean;
  ScheduledDeparture?: string;
  ETA?: string;
  [key: string]: unknown;
}

/** Terminal sailing space record. */
export interface TerminalSailingSpace {
  TerminalID?: number;
  TerminalName?: string;
  DepartingSpaces?: unknown[];
  [key: string]: unknown;
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Get ferry sailing schedules for a given date.
 *
 * Example:
 *   const schedule = await getFerrySchedule({ date: "2026-04-02" });
 */
export async function getFerrySchedule(opts: {
  date: string;
}): Promise<FerrySchedule[]> {
  const data = await api.get<FerrySchedule[]>(
    `/Schedule/rest/schedule/${opts.date}`,
  );
  return Array.isArray(data) ? data : [];
}

/**
 * Get real-time vessel positions for all active ferries.
 *
 * Example:
 *   const vessels = await getVesselLocations();
 */
export async function getVesselLocations(): Promise<VesselLocation[]> {
  const data = await api.get<VesselLocation[]>(
    "/Vessels/rest/vessellocations",
  );
  return Array.isArray(data) ? data : [];
}

/**
 * Get terminal sailing space (wait times and capacity).
 *
 * Example:
 *   const terminals = await getTerminalSailingSpace();
 */
export async function getTerminalSailingSpace(): Promise<TerminalSailingSpace[]> {
  const data = await api.get<TerminalSailingSpace[]>(
    "/Terminals/rest/terminalsailingspace",
  );
  return Array.isArray(data) ? data : [];
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
