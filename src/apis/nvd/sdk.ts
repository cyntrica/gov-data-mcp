/**
 * NVD SDK — typed API client for the National Vulnerability Database.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { searchCves, getCveDetail } from "us-gov-open-data-mcp/sdk/nvd";
 *
 *   const results = await searchCves({ keyword: "buffer overflow", severity: "CRITICAL" });
 *   console.log(results.totalResults, results.vulnerabilities);
 *
 *   const cve = await getCveDetail("CVE-2024-1234");
 *   console.log(cve.vulnerabilities[0].cve.descriptions);
 *
 * Optional NVD_API_KEY env var for higher rate limits.
 * Get one at https://nvd.nist.gov/developers/request-an-api-key
 * Docs: https://nvd.nist.gov/developers/vulnerabilities
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://services.nvd.nist.gov/rest/json",
  name: "nvd",
  auth: { type: "header", envParams: { apiKey: "NVD_API_KEY" } },
  rateLimit: { perSecond: 1, burst: 5 }, // Conservative — unauthenticated limit is ~5/30s
  cacheTtlMs: 30 * 60 * 1000, // 30 minutes — CVEs don't change frequently
  timeoutMs: 45_000, // NVD can be slow
});

// ─── Types ───────────────────────────────────────────────────────────

/** CVSS V3 metric data. */
export interface CvssV3Metric {
  source: string;
  type: string;
  cvssData: {
    version: string;
    vectorString: string;
    baseScore: number;
    baseSeverity: string;
    attackVector?: string;
    attackComplexity?: string;
    privilegesRequired?: string;
    userInteraction?: string;
    scope?: string;
    confidentialityImpact?: string;
    integrityImpact?: string;
    availabilityImpact?: string;
    [key: string]: unknown;
  };
  exploitabilityScore?: number;
  impactScore?: number;
  [key: string]: unknown;
}

/** CVE description. */
export interface CveDescription {
  lang: string;
  value: string;
}

/** CVE reference. */
export interface CveReference {
  url: string;
  source: string;
  tags?: string[];
  [key: string]: unknown;
}

/** CVE weakness (CWE). */
export interface CveWeakness {
  source: string;
  type: string;
  description: CveDescription[];
  [key: string]: unknown;
}

/** CVE configuration (affected products). */
export interface CveConfiguration {
  nodes: Array<{
    operator: string;
    negate: boolean;
    cpeMatch: Array<{
      vulnerable: boolean;
      criteria: string;
      matchCriteriaId: string;
      versionStartIncluding?: string;
      versionEndExcluding?: string;
      [key: string]: unknown;
    }>;
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
}

/** Individual CVE record. */
export interface CveRecord {
  id: string;
  sourceIdentifier: string;
  published: string;
  lastModified: string;
  vulnStatus: string;
  descriptions: CveDescription[];
  metrics: {
    cvssMetricV31?: CvssV3Metric[];
    cvssMetricV30?: CvssV3Metric[];
    cvssMetricV2?: unknown[];
    [key: string]: unknown;
  };
  weaknesses?: CveWeakness[];
  configurations?: CveConfiguration[];
  references?: CveReference[];
  [key: string]: unknown;
}

/** CVE search result envelope. */
export interface CveSearchResult {
  resultsPerPage: number;
  startIndex: number;
  totalResults: number;
  format: string;
  version: string;
  timestamp: string;
  vulnerabilities: Array<{ cve: CveRecord }>;
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Search CVE vulnerabilities by keyword, severity, and date range.
 *
 * Example:
 *   const result = await searchCves({ keyword: "log4j", severity: "CRITICAL", limit: 10 });
 */
export async function searchCves(opts: {
  keyword?: string;
  severity?: string;
  pubStartDate?: string;
  pubEndDate?: string;
  limit?: number;
} = {}): Promise<CveSearchResult> {
  const params = qp({
    keywordSearch: opts.keyword,
    cvssV3Severity: opts.severity,
    pubStartDate: opts.pubStartDate,
    pubEndDate: opts.pubEndDate,
    resultsPerPage: opts.limit ?? 20,
  });
  return api.get<CveSearchResult>("/cves/2.0", params);
}

/**
 * Get full CVE details by CVE ID.
 *
 * Example:
 *   const result = await getCveDetail("CVE-2021-44228");
 */
export async function getCveDetail(cveId: string): Promise<CveSearchResult> {
  return api.get<CveSearchResult>("/cves/2.0", qp({ cveId }));
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
