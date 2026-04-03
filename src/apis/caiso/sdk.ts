/**
 * CAISO SDK — typed API client for the California ISO MIDAS API.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { getSignal } from "us-gov-open-data-mcp/sdk/caiso";
 *
 * Requires CAISO_TOKEN env var — register at https://midasapi.energy.ca.gov
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://midasapi.energy.ca.gov/api",
  name: "caiso",
  auth: {
    type: "header",
    envParams: { Authorization: "CAISO_TOKEN" },
    prefix: "Bearer ",
  },
  rateLimit: { perSecond: 5, burst: 10 },
  cacheTtlMs: 5 * 60 * 1000, // 5 minutes — signals update frequently
});

// ─── Types ───────────────────────────────────────────────────────────

/** MIDAS signal data response. */
export interface MidasResponse {
  data?: MidasSignalValue[];
  [key: string]: unknown;
}

/** Individual signal value. */
export interface MidasSignalValue {
  timestamp?: string;
  dateTime?: string;
  value?: number | string | null;
  signalType?: string;
  [key: string]: unknown;
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Get signal data from MIDAS.
 * @param signalType - "rates", "GHG", or "FlexAlert"
 */
export async function getSignal(signalType: string): Promise<MidasResponse> {
  const params = qp({ SignalType: signalType });
  return api.get<MidasResponse>("/ValueData", params);
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
