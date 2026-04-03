/**
 * CFPB HMDA SDK — typed API client for Home Mortgage Disclosure Act data
 * via the FFIEC/CFPB Data Browser API.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { getNationwideAggregations, getFilers } from "us-gov-open-data-mcp/sdk/cfpb-hmda";
 *
 *   const data = await getNationwideAggregations({ year: 2022, races: "White,Asian" });
 *   console.log(data);
 *
 * No API key required.
 * Docs: https://ffiec.cfpb.gov/documentation/api/data-browser/
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const client = createClient({
  baseUrl: "https://ffiec.cfpb.gov",
  name: "cfpb-hmda",
  rateLimit: { perSecond: 5, burst: 10 },
  cacheTtlMs: 60 * 60 * 1000, // 1 hour
});

// ─── Types ──────────────────────────────────────────────────────────

/** Common filter options for HMDA aggregation queries. */
export interface HmdaFilters {
  actions_taken?: string;
  loan_types?: string;
  loan_purposes?: string;
  lien_statuses?: string;
  construction_methods?: string;
  dwelling_categories?: string;
  loan_products?: string;
  ethnicities?: string;
  races?: string;
  sexes?: string;
  total_units?: string;
}

/** Geographic/institution filter options (extends common filters). */
export interface HmdaGeoFilters extends HmdaFilters {
  states?: string;
  msamds?: string;
  counties?: string;
  leis?: string;
}

/** Rate spread calculation input. */
export interface RateSpreadInput {
  actionTakenType: number;
  loanTerm: string;
  amortizationType: string;
  apr: string;
  lockInDate: string;
  reverseMortgage: number;
}

// ─── Public API ─────────────────────────────────────────────────────

/**
 * Get nationwide mortgage aggregation data.
 *
 * Example:
 *   const data = await getNationwideAggregations({ year: 2022, races: "White" });
 */
export async function getNationwideAggregations(opts: {
  year: number;
} & HmdaFilters): Promise<unknown> {
  const { year, ...filters } = opts;
  const params = qp({ years: year, ...filters });
  return client.get<unknown>("/v2/data-browser-api/view/nationwide/aggregations", params);
}

/**
 * Get filtered mortgage aggregation data by geography or institution.
 *
 * Example:
 *   const data = await getFilteredAggregations({ year: 2022, states: "06", races: "White" });
 */
export async function getFilteredAggregations(opts: {
  year: number;
} & HmdaGeoFilters): Promise<unknown> {
  const { year, ...filters } = opts;
  const params = qp({ years: year, ...filters });
  return client.get<unknown>("/v2/data-browser-api/view/aggregations", params);
}

/**
 * List financial institutions that filed HMDA data for a given year.
 *
 * Example:
 *   const filers = await getFilers(2022);
 */
export async function getFilers(year: number): Promise<unknown> {
  return client.get<unknown>("/v2/data-browser-api/view/filers", { years: String(year) });
}

/**
 * Calculate rate spread for a loan using the CFPB rate spread calculator.
 *
 * Example:
 *   const result = await calculateRateSpread({
 *     actionTakenType: 1, loanTerm: "360", amortizationType: "FixedRate",
 *     apr: "6.0", lockInDate: "01/15/2023", reverseMortgage: 2,
 *   });
 */
export async function calculateRateSpread(input: RateSpreadInput): Promise<unknown> {
  return client.post<unknown>("/public/rateSpread", input as unknown as Record<string, unknown>);
}

/**
 * Generate a ULI check digit from a loan ID.
 *
 * Example:
 *   const result = await generateCheckDigit("10Bx939c5543TqA1144M999143X");
 */
export async function generateCheckDigit(loanId: string): Promise<unknown> {
  return client.post<unknown>("/v2/public/uli/checkDigit", { loanId });
}

/**
 * Validate a Universal Loan Identifier (ULI).
 *
 * Example:
 *   const result = await validateUli("10Bx939c5543TqA1144M999143X38");
 */
export async function validateUli(uli: string): Promise<unknown> {
  return client.post<unknown>("/v2/public/uli/validate", { uli });
}

/** Clear cached responses. */
export function clearCache(): void {
  client.clearCache();
}
