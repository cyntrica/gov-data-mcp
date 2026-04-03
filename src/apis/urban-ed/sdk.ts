/**
 * Urban Institute Education Data Explorer SDK.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { querySchools, queryDistricts, queryColleges } from "us-gov-open-data-mcp/sdk/urban-ed";
 *
 *   const schools = await querySchools({ year: 2022, stateFips: 6 });
 *
 * No API key required.
 * Docs: https://educationdata.urban.org/documentation/
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://educationdata.urban.org/api/v1",
  name: "urban-ed",
  rateLimit: { perSecond: 3, burst: 6 },
  cacheTtlMs: 60 * 60 * 1000, // 1 hour — education data updates annually
});

// ─── Types ──────────────────────────────────────────────────────────

export interface UrbanEdResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface SchoolRecord {
  ncessch: string;
  school_name: string;
  state_fips: number;
  enrollment: number;
  grade: number;
  year: number;
  [key: string]: unknown;
}

export interface DistrictRecord {
  leaid: string;
  lea_name: string;
  state_fips: number;
  enrollment: number;
  year: number;
  [key: string]: unknown;
}

export interface CollegeRecord {
  unitid: number;
  inst_name: string;
  state_fips: number;
  enrollment_fte: number;
  year: number;
  [key: string]: unknown;
}

// ─── Functions ──────────────────────────────────────────────────────

/**
 * Query school-level enrollment data.
 */
export async function querySchools(opts: {
  year: number;
  stateFips?: number;
  grade?: number;
  limit?: number;
  offset?: number;
}): Promise<UrbanEdResponse<SchoolRecord>> {
  const params = qp({
    state_fips: opts.stateFips,
    grade: opts.grade,
    limit: opts.limit ?? 50,
    offset: opts.offset ?? 0,
  });
  return api.get<UrbanEdResponse<SchoolRecord>>(
    `/schools/ccd/enrollment/${opts.year}/`,
    params,
  );
}

/**
 * Query district-level enrollment data.
 */
export async function queryDistricts(opts: {
  year: number;
  stateFips?: number;
  limit?: number;
  offset?: number;
}): Promise<UrbanEdResponse<DistrictRecord>> {
  const params = qp({
    state_fips: opts.stateFips,
    limit: opts.limit ?? 50,
    offset: opts.offset ?? 0,
  });
  return api.get<UrbanEdResponse<DistrictRecord>>(
    `/school-districts/ccd/enrollment/${opts.year}/`,
    params,
  );
}

/**
 * Query college/university enrollment data (FTE).
 */
export async function queryColleges(opts: {
  year: number;
  stateFips?: number;
  limit?: number;
  offset?: number;
}): Promise<UrbanEdResponse<CollegeRecord>> {
  const params = qp({
    state_fips: opts.stateFips,
    limit: opts.limit ?? 50,
    offset: opts.offset ?? 0,
  });
  return api.get<UrbanEdResponse<CollegeRecord>>(
    `/college-university/ipeds/enrollment-full-time-equivalent/${opts.year}/`,
    params,
  );
}

export const clearCache = () => api.clearCache();
