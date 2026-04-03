/**
 * Maryland MTA Transit SDK — GTFS feed info and service alerts.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { getGTFSFeeds, getServiceAlerts } from "us-gov-open-data-mcp/sdk/md-transit";
 *
 *   const feeds = getGTFSFeeds();
 *   const alerts = await getServiceAlerts();
 *
 * Service alerts are public. Real-time bus/rail requires Swiftly API key (free).
 * Docs: https://www.mta.maryland.gov/developer-resources
 */

import { createClient } from "../../shared/client.js";

// ─── Client ─────────────────────────────────────────────────────────

const feedsApi = createClient({
  baseUrl: "https://feeds.mta.maryland.gov",
  name: "md-transit-feeds",
  rateLimit: { perSecond: 3, burst: 8 },
  cacheTtlMs: 5 * 60 * 1000, // 5 minutes
});

const swiftlyApi = createClient({
  baseUrl: "https://api.goswift.ly",
  name: "md-transit-swiftly",
  auth: {
    type: "header",
    envParams: { Authorization: "SWIFTLY_API_KEY" },
  },
  rateLimit: { perSecond: 2, burst: 5 },
  cacheTtlMs: 30 * 1000, // 30 seconds — real-time data
});

// ─── Types ──────────────────────────────────────────────────────────

export interface GTFSFeedInfo {
  mode: string;
  feedUrl: string;
  description: string;
}

export interface TransitAlert {
  id?: string;
  header?: string;
  description?: string;
  url?: string;
  cause?: string;
  effect?: string;
  activePeriod?: Array<{ start?: string; end?: string }>;
  routes?: string[];
  [key: string]: unknown;
}

/** GTFS static feed URLs (ZIP archives). */
export const GTFS_FEEDS: GTFSFeedInfo[] = [
  { mode: "Local Bus", feedUrl: "https://feeds.mta.maryland.gov/gtfs/local-bus", description: "Baltimore-area local bus routes" },
  { mode: "Light Rail", feedUrl: "https://feeds.mta.maryland.gov/gtfs/light-rail", description: "Baltimore Light Rail" },
  { mode: "Metro Subway", feedUrl: "https://feeds.mta.maryland.gov/gtfs/metro", description: "Baltimore Metro Subway" },
  { mode: "MARC Train", feedUrl: "https://feeds.mta.maryland.gov/gtfs/marc", description: "MARC commuter rail (Penn, Camden, Brunswick lines)" },
  { mode: "Commuter Bus", feedUrl: "https://feeds.mta.maryland.gov/gtfs/commuter-bus", description: "Long-distance commuter bus routes" },
];

/** Real-time feed URLs (protobuf format). */
export const REALTIME_FEEDS = {
  marcTripUpdates: { url: "https://mdotmta-gtfs-rt.s3.amazonaws.com/MARC+RT/marc-tu.pb", description: "MARC train trip updates (delays, cancellations)" },
  marcVehiclePositions: { url: "https://mdotmta-gtfs-rt.s3.amazonaws.com/MARC+RT/marc-vp.pb", description: "MARC train vehicle positions (lat/lon)" },
  serviceAlerts: { url: "https://feeds.mta.maryland.gov/alerts.pb", description: "All-mode service alerts (protobuf)" },
} as const;

/** Swiftly agency keys for real-time bus/rail. */
export const SWIFTLY_AGENCIES = {
  "mta-maryland": "Local Bus",
  "mta-maryland-light-rail": "Light Rail",
  "mta-maryland-metro": "Metro Subway",
  "mta-maryland-commuter-bus": "Commuter Bus",
} as const;

// ─── Public API ─────────────────────────────────────────────────────

/**
 * Get list of all GTFS feed URLs with descriptions.
 */
export function getGTFSFeeds(): GTFSFeedInfo[] {
  return GTFS_FEEDS;
}

/**
 * Get real-time feed URLs with descriptions.
 */
export function getRealtimeFeeds(): Record<string, { url: string; description: string }> {
  return { ...REALTIME_FEEDS };
}

/**
 * Get Swiftly real-time vehicle positions for an agency.
 * Requires SWIFTLY_API_KEY env var.
 */
export async function getSwiftlyVehicles(agencyKey: string): Promise<Record<string, unknown>> {
  return swiftlyApi.get<Record<string, unknown>>(`/real-time/${agencyKey}/gtfs-rt-vehicle-positions`);
}

/**
 * Get Swiftly real-time trip updates for an agency.
 * Requires SWIFTLY_API_KEY env var.
 */
export async function getSwiftlyTripUpdates(agencyKey: string): Promise<Record<string, unknown>> {
  return swiftlyApi.get<Record<string, unknown>>(`/real-time/${agencyKey}/gtfs-rt-trip-updates`);
}

/** Clear cached responses. */
export function clearCache(): void {
  feedsApi.clearCache();
  swiftlyApi.clearCache();
}
