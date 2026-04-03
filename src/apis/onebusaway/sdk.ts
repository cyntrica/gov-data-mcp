/**
 * OneBusAway SDK — typed API client for Puget Sound transit data.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { getArrivals, getRoutes } from "us-gov-open-data-mcp/sdk/onebusaway";
 *
 *   const arrivals = await getArrivals({ stopId: "1_75403" });
 *   const routes = await getRoutes({ agencyId: "1" });
 *
 * Requires OBA_API_KEY env var.
 * Signup: email oba_api_key@soundtransit.org
 */

import { createClient } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://pugetsound.onebusaway.org/api/where",
  name: "onebusaway",
  auth: {
    type: "query",
    envParams: { key: "OBA_API_KEY" },
  },
  rateLimit: { perSecond: 5, burst: 10 },
  cacheTtlMs: 30 * 1000, // 30 seconds — real-time data
});

// ─── Types ───────────────────────────────────────────────────────────

/** Single arrival/departure record from OneBusAway. */
export interface ObaArrivalDeparture {
  routeId?: string;
  routeShortName?: string;
  routeLongName?: string;
  tripId?: string;
  tripHeadsign?: string;
  stopId?: string;
  stopSequence?: number;
  scheduledArrivalTime?: number;
  predictedArrivalTime?: number;
  scheduledDepartureTime?: number;
  predictedDepartureTime?: number;
  status?: string;
  predicted?: boolean;
  lastUpdateTime?: number;
  vehicleId?: string;
  distanceFromStop?: number;
  numberOfStopsAway?: number;
  [key: string]: unknown;
}

/** Route record from OneBusAway. */
export interface ObaRoute {
  id?: string;
  shortName?: string;
  longName?: string;
  description?: string;
  type?: number;
  url?: string;
  agencyId?: string;
  [key: string]: unknown;
}

/** OneBusAway arrivals API response. */
export interface ObaArrivalsResponse {
  data: {
    entry: {
      arrivalsAndDepartures?: ObaArrivalDeparture[];
      [key: string]: unknown;
    };
    references?: Record<string, unknown>;
  };
}

/** OneBusAway routes API response. */
export interface ObaRoutesResponse {
  data: {
    list?: ObaRoute[];
    references?: Record<string, unknown>;
  };
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Get real-time arrivals and departures for a stop.
 *
 * Example:
 *   const data = await getArrivals({ stopId: "1_75403" });
 */
export async function getArrivals(opts: {
  stopId: string;
}): Promise<ObaArrivalDeparture[]> {
  const data = await api.get<ObaArrivalsResponse>(
    `/arrivals-and-departures-for-stop/${opts.stopId}.json`,
  );
  return data.data?.entry?.arrivalsAndDepartures ?? [];
}

/**
 * Get routes for an agency.
 *
 * Example:
 *   const routes = await getRoutes({ agencyId: "1" }); // King County Metro
 */
export async function getRoutes(opts?: {
  agencyId?: string;
}): Promise<ObaRoute[]> {
  const agencyId = opts?.agencyId ?? "1";
  const data = await api.get<ObaRoutesResponse>(
    `/routes-for-agency/${agencyId}.json`,
  );
  return data.data?.list ?? [];
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
