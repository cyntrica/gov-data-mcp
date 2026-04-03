/**
 * BART SDK — typed API client for Bay Area Rapid Transit.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { getDepartures, getStations, getAdvisories } from "us-gov-open-data-mcp/sdk/bart";
 *
 *   const deps = await getDepartures({ station: "EMBR" });
 *   const stations = await getStations();
 *
 * Requires BART_API_KEY env var (demo key: MW9S-E7SL-26DU-VV8V).
 * Register at https://api.bart.gov/api/register.aspx
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://api.bart.gov/api",
  name: "bart",
  auth: {
    type: "query",
    envParams: { key: "BART_API_KEY" },
    extraParams: { key: "MW9S-E7SL-26DU-VV8V" },
  },
  rateLimit: { perSecond: 5, burst: 10 },
  cacheTtlMs: 60 * 1000, // 1 minute — real-time data
});

// ─── Types ───────────────────────────────────────────────────────────

/** Departure estimate. */
export interface BartEstimate {
  minutes: string;
  platform: string;
  direction: string;
  length: string;
  color: string;
  hexcolor: string;
  bikeflag: string;
  delay: string;
  [key: string]: unknown;
}

/** Station departure info. */
export interface BartDeparture {
  name: string;
  abbr: string;
  etd: Array<{
    destination: string;
    abbreviation: string;
    limited: string;
    estimate: BartEstimate[];
  }>;
  [key: string]: unknown;
}

/** Station info. */
export interface BartStation {
  name: string;
  abbr: string;
  gtfs_latitude: string;
  gtfs_longitude: string;
  address: string;
  city: string;
  county: string;
  state: string;
  zipcode: string;
  [key: string]: unknown;
}

/** Advisory. */
export interface BartAdvisory {
  station: string;
  description: { "#cdata-section": string } | string;
  sms_text?: { "#cdata-section": string } | string;
  posted: string;
  expires: string;
  type: string;
  [key: string]: unknown;
}

/** BART API response wrapper. */
export interface BartResponse<T> {
  root: {
    station?: T[];
    stations?: { station: T[] };
    bsa?: T[];
    uri?: { "#cdata-section": string };
    date?: string;
    time?: string;
    message?: string | Record<string, unknown>;
    [key: string]: unknown;
  };
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Get real-time departure estimates for a station.
 */
export async function getDepartures(opts: {
  station: string;
}): Promise<BartResponse<BartDeparture>> {
  const params = qp({
    cmd: "etd",
    orig: opts.station,
    json: "y",
  });
  return api.get<BartResponse<BartDeparture>>("/etd.aspx", params);
}

/**
 * List all BART stations.
 */
export async function getStations(): Promise<BartResponse<BartStation>> {
  const params = qp({
    cmd: "stns",
    json: "y",
  });
  return api.get<BartResponse<BartStation>>("/stn.aspx", params);
}

/**
 * Get service advisories.
 */
export async function getAdvisories(): Promise<BartResponse<BartAdvisory>> {
  const params = qp({
    cmd: "bsa",
    json: "y",
  });
  return api.get<BartResponse<BartAdvisory>>("/bsa.aspx", params);
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
