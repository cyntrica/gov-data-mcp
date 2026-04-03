/**
 * USAJobs SDK — typed API client for federal job listings.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { searchJobs, getJobDetail } from "us-gov-open-data-mcp/sdk/usajobs";
 *
 *   const results = await searchJobs({ keyword: "software engineer", location: "Washington, DC" });
 *   console.log(results.SearchResult.SearchResultCount);
 *
 * Requires USAJOBS_API_KEY env var. Get one at https://developer.usajobs.gov/APIRequest/Index
 * Docs: https://developer.usajobs.gov/API-Reference
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://data.usajobs.gov/api",
  name: "usajobs",
  auth: { type: "header", envParams: { "Authorization-Key": "USAJOBS_API_KEY" } },
  defaultHeaders: { "User-Agent": "gov-data-mcp@1.0 (federal-data-research)" },
  rateLimit: { perSecond: 5, burst: 10 },
  cacheTtlMs: 15 * 60 * 1000, // 15 minutes — job listings update frequently
});

// ─── Types ───────────────────────────────────────────────────────────

/** Individual job listing from search results. */
export interface JobListing {
  MatchedObjectId: string;
  MatchedObjectDescriptor: {
    PositionID: string;
    PositionTitle: string;
    PositionURI: string;
    PositionLocation: Array<{
      LocationName: string;
      CountryCode: string;
      CountrySubDivisionCode: string;
      CityName: string;
      Longitude: number;
      Latitude: number;
    }>;
    OrganizationName: string;
    DepartmentName: string;
    JobCategory: Array<{ Name: string; Code: string }>;
    PositionSchedule: Array<{ Name: string; Code: string }>;
    PositionOfferingType: Array<{ Name: string; Code: string }>;
    QualificationSummary: string;
    PositionRemuneration: Array<{
      MinimumRange: string;
      MaximumRange: string;
      RateIntervalCode: string;
      Description: string;
    }>;
    PositionStartDate: string;
    PositionEndDate: string;
    PublicationStartDate: string;
    ApplicationCloseDate: string;
    UserArea: {
      Details: {
        MajorDuties: string[];
        AgencyMarketingStatement: string;
        [key: string]: unknown;
      };
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
  RelevanceRank: number;
  [key: string]: unknown;
}

/** Search result envelope. */
export interface SearchResult {
  SearchResult: {
    SearchResultCount: number;
    SearchResultCountAll: number;
    SearchResultItems: JobListing[];
    UserArea: {
      NumberOfPages: string;
      IsRadialSearch: boolean;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Search federal job listings by keyword, location, agency, and salary.
 *
 * Example:
 *   const result = await searchJobs({ keyword: "data scientist", location: "Remote" });
 */
export async function searchJobs(opts: {
  keyword?: string;
  location?: string;
  agency?: string;
  minimumPay?: number;
  maximumPay?: number;
  limit?: number;
} = {}): Promise<SearchResult> {
  const params = qp({
    Keyword: opts.keyword,
    LocationName: opts.location,
    Agency: opts.agency,
    MinimumPay: opts.minimumPay,
    MaximumPay: opts.maximumPay,
    ResultsPerPage: opts.limit ?? 25,
  });
  return api.get<SearchResult>("/Search", params);
}

/**
 * Get job listing details by control number.
 *
 * Example:
 *   const result = await getJobDetail("123456789");
 */
export async function getJobDetail(controlNumber: string): Promise<SearchResult> {
  return api.get<SearchResult>("/Search", qp({ ControlNumber: controlNumber }));
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
