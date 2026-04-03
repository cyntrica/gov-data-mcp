/**
 * DAP SDK — typed API client for GSA Digital Analytics Program
 * (government-wide web analytics).
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { getGovWideReport, getAgencyReport, getDomainReport } from "us-gov-open-data-mcp/sdk/dap";
 *
 * Requires DATA_GOV_API_KEY.
 * Docs: https://open.gsa.gov/api/dap/
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ─────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://api.gsa.gov/analytics/dap",
  name: "dap",
  auth: {
    type: "header",
    envParams: { "x-api-key": "DATA_GOV_API_KEY" },
  },
  rateLimit: { perSecond: 5, burst: 10 },
  cacheTtlMs: 15 * 60 * 1000,
});

// ─── Types ──────────────────────────────────────────────────────────

/** Valid DAP report types. */
export type DapReportType =
  | "site" | "domain" | "second-level-domain" | "download" | "traffic-source"
  | "device" | "device-model" | "os" | "browser" | "os-browser"
  | "windows" | "windows-browser" | "language";

/** A single analytics data record. Fields vary by report type. */
export interface DapRecord {
  id?: number;
  date?: string;
  report_name?: string;
  report_agency?: string;
  domain?: string;
  visits?: number;
  browser?: string;
  os?: string;
  device?: string;
  [key: string]: unknown;
}

/** Common query parameters for DAP endpoints. */
export interface DapQueryOpts {
  report: DapReportType;
  limit?: number;
  page?: number;
  after?: string;
  before?: string;
}

// ─── Helpers ────────────────────────────────────────────────────────

function buildParams(opts: DapQueryOpts) {
  return qp({
    limit: opts.limit ?? 100,
    page: opts.page,
    after: opts.after,
    before: opts.before,
  });
}

// ═══════════════════════════════════════════════════════════════════════
// GOVERNMENT-WIDE REPORTS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Get a government-wide analytics report.
 *
 * Example:
 *   await getGovWideReport({ report: "site", limit: 50 });
 */
export async function getGovWideReport(opts: DapQueryOpts): Promise<DapRecord[]> {
  return api.get<DapRecord[]>(`/v2/reports/${opts.report}/data`, buildParams(opts));
}

// ═══════════════════════════════════════════════════════════════════════
// AGENCY-SPECIFIC REPORTS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Get an agency-specific analytics report.
 *
 * Example:
 *   await getAgencyReport("interior", { report: "traffic-source", limit: 50 });
 */
export async function getAgencyReport(
  agency: string,
  opts: DapQueryOpts,
): Promise<DapRecord[]> {
  return api.get<DapRecord[]>(`/v2/agencies/${agency}/reports/${opts.report}/data`, buildParams(opts));
}

// ═══════════════════════════════════════════════════════════════════════
// DOMAIN-SPECIFIC REPORTS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Get a domain-specific analytics report.
 *
 * Example:
 *   await getDomainReport("nasa.gov", { report: "browser", limit: 50 });
 */
export async function getDomainReport(
  domain: string,
  opts: DapQueryOpts,
): Promise<DapRecord[]> {
  return api.get<DapRecord[]>(`/v2/domain/${domain}/reports/${opts.report}/data`, buildParams(opts));
}

/** Clear the DAP API cache. */
export function clearCache(): void {
  api.clearCache();
}
