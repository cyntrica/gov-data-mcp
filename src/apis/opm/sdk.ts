/**
 * OPM SDK -- typed API client for the Office of Personnel Management Operating Status API.
 *
 * Standalone -- no MCP server required. Usage:
 *
 *   import { getCurrentStatus, getStatusHistory, getStatusTypes } from "us-gov-open-data-mcp/sdk/opm";
 *
 *   const status = await getCurrentStatus();
 *   const history = await getStatusHistory({ count: 50 });
 *   const types = await getStatusTypes();
 *
 * No API key required. No documented rate limit.
 * Docs: https://www.opm.gov/policy-data-oversight/snow-dismissal-procedures/current-status/
 */

import { createClient } from "../../shared/client.js";

// --- Client ----------------------------------------------------------------

const api = createClient({
  baseUrl: "https://www.opm.gov",
  name: "opm",
  rateLimit: { perSecond: 2, burst: 4 },
  cacheTtlMs: 5 * 60 * 1000, // 5 minutes -- status can change rapidly during events
});

// --- Types ------------------------------------------------------------------

/** OPM operating status record. */
export interface OpmStatus {
  Id?: number;
  StatusTitle?: string;
  Location?: string;
  StatusSummary?: string;
  ShortStatusMessage?: string;
  LongStatusMessage?: string;
  DateStatusPosted?: string;
  Icon?: string;
  StatusType?: string;
  [key: string]: unknown;
}

/** OPM status type. */
export interface OpmStatusType {
  Id?: number;
  Name?: string;
  [key: string]: unknown;
}

// --- Public API -------------------------------------------------------------

/**
 * Get the current federal government operating status for the DC area.
 *
 * Example:
 *   const status = await getCurrentStatus();
 */
export async function getCurrentStatus(opts?: {
  markup?: boolean;
  useutc?: boolean;
  date?: string;
}): Promise<OpmStatus> {
  const params: Record<string, string | number | undefined> = {};
  if (opts?.markup !== undefined) params.markup = opts.markup ? "true" : "false";
  if (opts?.useutc !== undefined) params.useutc = opts.useutc ? "true" : "false";
  if (opts?.date) params.date = opts.date;

  return api.get<OpmStatus>("/json/operatingstatus.json", params);
}

/**
 * Get historical operating status records.
 *
 * Example:
 *   const history = await getStatusHistory({ count: 100 });
 */
export async function getStatusHistory(opts?: {
  startrow?: number;
  count?: number;
}): Promise<OpmStatus[]> {
  const params: Record<string, string | number | undefined> = {};
  if (opts?.startrow !== undefined) params.startrow = opts.startrow;
  if (opts?.count !== undefined) params.count = opts.count;

  return api.get<OpmStatus[]>("/json/operatingstatushistory.json", params);
}

/**
 * Get all possible operating status types.
 *
 * Example:
 *   const types = await getStatusTypes();
 */
export async function getStatusTypes(): Promise<OpmStatusType[]> {
  return api.get<OpmStatusType[]>("/json/statustypes.json");
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
