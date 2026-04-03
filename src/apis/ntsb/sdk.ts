/**
 * NTSB SDK — typed API client for National Transportation Safety Board
 * accident investigation data via the CAROL query system.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { searchAviation, queryInvestigations } from "us-gov-open-data-mcp/sdk/ntsb";
 *
 * No API key required.
 * Docs: https://data.ntsb.gov/carol-main-public/basic-search
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://data.ntsb.gov/carol-repgen/api",
  name: "ntsb",
  rateLimit: { perSecond: 2, burst: 4 },
  cacheTtlMs: 60 * 60 * 1000, // 1 hour
});

// ─── Types ───────────────────────────────────────────────────────────

/** NTSB investigation record. */
export interface NtsbInvestigation {
  EventId?: string;
  NtsbNumber?: string;
  EventDate?: string;
  City?: string;
  State?: string;
  Country?: string;
  EventType?: string;
  HighestInjury?: string;
  FatalInjuries?: number;
  SeriousInjuries?: number;
  AircraftCategory?: string;
  Make?: string;
  Model?: string;
  AmateurBuilt?: string;
  NumberOfEngines?: number;
  EngineType?: string;
  ProbableCause?: string;
  WeatherCondition?: string;
  BroadPhaseOfFlight?: string;
  ReportStatus?: string;
  PublicationDate?: string;
  [key: string]: unknown;
}

/** NTSB CAROL search response. */
interface CarolResponse {
  ResultSet?: NtsbInvestigation[];
  TotalRecordCount?: number;
  totalRecordCount?: number;
  resultSet?: NtsbInvestigation[];
  [key: string]: unknown;
}

/** Extract results handling different response shapes. */
function extractResults(res: CarolResponse): { records: NtsbInvestigation[]; total: number } {
  return {
    records: res?.ResultSet ?? res?.resultSet ?? [],
    total: res?.TotalRecordCount ?? res?.totalRecordCount ?? 0,
  };
}

// ═══════════════════════════════════════════════════════════════════════
// AVIATION ACCIDENTS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Search aviation accident investigation data.
 *
 * Example:
 *   await searchAviation({ query: "Boeing 737", limit: 10 });
 */
export async function searchAviation(opts: {
  query: string;
  offset?: number;
  limit?: number;
}): Promise<{ records: NtsbInvestigation[]; total: number }> {
  const params = qp({
    queryId: "",
    mode: "Aviation",
    query: opts.query,
    offset: opts.offset ?? 0,
    limit: opts.limit ?? 20,
  });
  const res = await api.get<CarolResponse>("/main/basicSearch", params);
  return extractResults(res);
}

// ═══════════════════════════════════════════════════════════════════════
// GENERAL QUERY (any mode)
// ═══════════════════════════════════════════════════════════════════════

/**
 * Query any NTSB investigation dataset by mode.
 *
 * Example:
 *   await queryInvestigations({ mode: "Highway", query: "truck rollover", limit: 10 });
 */
export async function queryInvestigations(opts: {
  mode: "Aviation" | "Highway" | "Marine" | "Rail" | "Pipeline";
  query: string;
  offset?: number;
  limit?: number;
}): Promise<{ records: NtsbInvestigation[]; total: number }> {
  const params = qp({
    queryId: "",
    mode: opts.mode,
    query: opts.query,
    offset: opts.offset ?? 0,
    limit: opts.limit ?? 20,
  });
  const res = await api.get<CarolResponse>("/main/basicSearch", params);
  return extractResults(res);
}

/** Clear NTSB API cache. */
export function clearCache(): void {
  api.clearCache();
}
