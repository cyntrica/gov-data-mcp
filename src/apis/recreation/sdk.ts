/**
 * Recreation SDK — typed API client for the RIDB (Recreation Information Database) API.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { searchFacilities, searchCampsites } from "us-gov-open-data-mcp/sdk/recreation";
 *
 *   const facilities = await searchFacilities({ query: "Yellowstone", state: "WY" });
 *   console.log(facilities.RECDATA);
 *
 * Requires RECREATION_API_KEY env var. Get one at https://ridb.recreation.gov/docs
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://ridb.recreation.gov/api/v1",
  name: "recreation",
  auth: { type: "header", envParams: { apikey: "RECREATION_API_KEY" } },
  rateLimit: { perSecond: 5, burst: 10 },
  cacheTtlMs: 30 * 60 * 1000, // 30 minutes
});

// ─── Types ───────────────────────────────────────────────────────────

export interface RIDBResponse<T> {
  RECDATA: T[];
  METADATA: {
    RESULTS: {
      CURRENT_COUNT: number;
      TOTAL_COUNT: number;
    };
  };
}

export interface Facility {
  FacilityID: string;
  FacilityName: string;
  FacilityTypeDescription?: string;
  FacilityDescription?: string;
  FacilityPhone?: string;
  FacilityEmail?: string;
  FacilityLatitude?: number;
  FacilityLongitude?: number;
  FacilityAdaAccess?: string;
  [key: string]: unknown;
}

export interface Campsite {
  CampsiteID: string;
  CampsiteName: string;
  CampsiteType?: string;
  Loop?: string;
  TypeOfUse?: string;
  CampsiteAccessible?: boolean;
  [key: string]: unknown;
}

export interface RecArea {
  RecAreaID: string;
  RecAreaName: string;
  RecAreaDescription?: string;
  RecAreaPhone?: string;
  RecAreaEmail?: string;
  RecAreaLatitude?: number;
  RecAreaLongitude?: number;
  [key: string]: unknown;
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Search recreation facilities (campgrounds, parks, trails).
 */
export async function searchFacilities(opts: {
  query?: string;
  state?: string;
  activity?: string;
  limit?: number;
  offset?: number;
}): Promise<RIDBResponse<Facility>> {
  const params = qp({
    query: opts.query,
    state: opts.state,
    activity: opts.activity,
    limit: opts.limit ?? 20,
    offset: opts.offset ?? 0,
  });
  return api.get<RIDBResponse<Facility>>("/facilities", params);
}

/**
 * Search campsites at a specific facility.
 */
export async function searchCampsites(opts: {
  facilityId: string;
  limit?: number;
}): Promise<RIDBResponse<Campsite>> {
  const params = qp({
    limit: opts.limit ?? 50,
  });
  return api.get<RIDBResponse<Campsite>>(`/facilities/${opts.facilityId}/campsites`, params);
}

/**
 * Search recreation areas by query, state, or activity.
 */
export async function searchRecAreas(opts: {
  query?: string;
  state?: string;
  limit?: number;
  offset?: number;
}): Promise<RIDBResponse<RecArea>> {
  const params = qp({
    query: opts.query,
    state: opts.state,
    limit: opts.limit ?? 20,
    offset: opts.offset ?? 0,
  });
  return api.get<RIDBResponse<RecArea>>("/recareas", params);
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
