/**
 * CTA SDK — typed API client for Chicago Transit Authority.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { getTrainArrivals, getBusArrivals } from "us-gov-open-data-mcp/sdk/cta";
 *
 *   const trains = await getTrainArrivals({ stationId: "40380" });
 *   const buses = await getBusArrivals({ stopId: "1836" });
 *
 * Requires CTA_API_KEY env var. Get one free at https://www.transitchicago.com/developers/
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Clients ─────────────────────────────────────────────────────────

const trainApi = createClient({
  baseUrl: "http://lapi.transitchicago.com/api/1.0",
  name: "cta-train",
  auth: { type: "query", envParams: { key: "CTA_API_KEY" } },
  rateLimit: { perSecond: 5, burst: 10 },
  cacheTtlMs: 60 * 1000, // 1 minute — real-time data
});

const busApi = createClient({
  baseUrl: "http://www.ctabustracker.com/bustime/api/v2",
  name: "cta-bus",
  auth: { type: "query", envParams: { key: "CTA_API_KEY" } },
  rateLimit: { perSecond: 5, burst: 10 },
  cacheTtlMs: 60 * 1000,
});

// ─── Types ───────────────────────────────────────────────────────────

/** Train arrival prediction. */
export interface CtaTrainEta {
  staId: string;
  stpId: string;
  staNm: string;
  stpDe: string;
  rn: string;
  rt: string;
  destSt: string;
  destNm: string;
  trDr: string;
  prdt: string;
  arrT: string;
  isApp: string;
  isSch: string;
  isDly: string;
  isFlt: string;
  flags?: string;
  lat: string;
  lon: string;
  heading: string;
  [key: string]: unknown;
}

/** Train tracker response. */
export interface CtaTrainResponse {
  ctatt: {
    tmst: string;
    errCd: string;
    errNm?: string;
    eta: CtaTrainEta[];
  };
}

/** Bus arrival prediction. */
export interface CtaBusPrediction {
  tmstmp: string;
  typ: string;
  stpnm: string;
  stpid: string;
  vid: string;
  dstp: number;
  rt: string;
  rtdd: string;
  rtdir: string;
  des: string;
  prdtm: string;
  tablockid: string;
  tatripid: string;
  dly: boolean;
  prdctdn: string;
  zone?: string;
  [key: string]: unknown;
}

/** Bus tracker response. */
export interface CtaBusResponse {
  "bustime-response": {
    prd?: CtaBusPrediction[];
    error?: Array<{ msg: string }>;
  };
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Get L train arrival predictions by station ID.
 */
export async function getTrainArrivals(opts: {
  stationId: string;
  limit?: number;
}): Promise<CtaTrainResponse> {
  const params = qp({
    mapid: opts.stationId,
    outputType: "JSON",
  });
  return trainApi.get<CtaTrainResponse>("/ttarrivals.aspx", params);
}

/**
 * Get bus arrival predictions by stop ID.
 */
export async function getBusArrivals(opts: {
  stopId: string;
  limit?: number;
}): Promise<CtaBusResponse> {
  const params = qp({
    stpid: opts.stopId,
    format: "json",
  });
  return busApi.get<CtaBusResponse>("/getpredictions", params);
}

/** Clear cached responses. */
export function clearCache(): void {
  trainApi.clearCache();
  busApi.clearCache();
}
