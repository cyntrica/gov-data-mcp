/**
 * Data.gov CKAN Catalog SDK — typed API client for the CKAN Action API.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { searchDatasets, getDataset, listOrganizations } from "us-gov-open-data-mcp/sdk/data-gov";
 *
 *   const results = await searchDatasets({ q: "climate change", rows: 10 });
 *   const dataset = await getDataset("annual-enterprise-survey");
 *   const orgs = await listOrganizations({ allFields: true, limit: 50 });
 *
 * No API key required.
 * Base URL: https://catalog.data.gov/api/3/action
 * Docs: https://docs.ckan.org/en/latest/api/
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Types ──────────────────────────────────────────────────────────

export interface CkanResource {
  id: string;
  name: string;
  url: string;
  format: string;
  description?: string;
  created?: string;
  last_modified?: string;
  size?: number;
  [key: string]: unknown;
}

export interface CkanTag {
  id: string;
  name: string;
  display_name: string;
  [key: string]: unknown;
}

export interface CkanOrganization {
  id: string;
  name: string;
  title: string;
  description?: string;
  image_url?: string;
  created?: string;
  package_count?: number;
  [key: string]: unknown;
}

export interface CkanDataset {
  id: string;
  name: string;
  title: string;
  notes?: string;
  organization?: CkanOrganization;
  resources?: CkanResource[];
  tags?: CkanTag[];
  metadata_modified?: string;
  metadata_created?: string;
  num_resources?: number;
  num_tags?: number;
  license_title?: string;
  license_url?: string;
  author?: string;
  maintainer?: string;
  [key: string]: unknown;
}

export interface CkanSearchResult {
  count: number;
  results: CkanDataset[];
  facets?: Record<string, Record<string, number>>;
  search_facets?: Record<string, unknown>;
}

interface CkanResponse<T> {
  success: boolean;
  result: T;
  error?: { message: string; __type: string };
}

// ─── Client ─────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://catalog.data.gov/api/3/action",
  name: "data-gov",
  rateLimit: { perSecond: 5, burst: 10 },
  cacheTtlMs: 30 * 60 * 1000, // 30 minutes
  checkError: (data) => {
    const resp = data as CkanResponse<unknown>;
    if (resp.success === false) {
      return resp.error?.message ?? "CKAN API returned an error";
    }
    return null;
  },
});

// ─── SDK Functions ──────────────────────────────────────────────────

/** Search options for package_search. */
export interface SearchDatasetsOptions {
  q?: string;
  fq?: string;
  sort?: string;
  rows?: number;
  start?: number;
  facetField?: string | string[];
}

/**
 * Search Data.gov datasets.
 *
 * @example
 *   const data = await searchDatasets({ q: "climate", rows: 20 });
 *   const data = await searchDatasets({ q: "transportation", fq: "organization:dot-gov" });
 */
export async function searchDatasets(opts: SearchDatasetsOptions = {}): Promise<CkanSearchResult> {
  const params = qp({
    q: opts.q ?? "*:*",
    fq: opts.fq,
    sort: opts.sort,
    rows: opts.rows ?? 20,
    start: opts.start ?? 0,
  });

  // Handle facet.field — can be string or string[]
  if (opts.facetField) {
    const fields = Array.isArray(opts.facetField) ? opts.facetField : [opts.facetField];
    for (const f of fields) {
      (params as Record<string, unknown>)["facet.field"] = f;
    }
  }

  const resp = await api.get<CkanResponse<CkanSearchResult>>("/package_search", params);
  return resp.result;
}

/**
 * Get full metadata for a single dataset.
 *
 * @example
 *   const dataset = await getDataset("annual-enterprise-survey");
 *   const dataset = await getDataset("some-uuid-here");
 */
export async function getDataset(id: string): Promise<CkanDataset> {
  const resp = await api.get<CkanResponse<CkanDataset>>("/package_show", qp({ id }));
  return resp.result;
}

/** Options for listing organizations. */
export interface ListOrganizationsOptions {
  allFields?: boolean;
  sort?: string;
  limit?: number;
  offset?: number;
}

/**
 * List federal agencies (organizations) publishing data on Data.gov.
 *
 * @example
 *   const orgs = await listOrganizations({ allFields: true, limit: 50 });
 *   const orgNames = await listOrganizations(); // returns string[] of names
 */
export async function listOrganizations(opts: ListOrganizationsOptions = {}): Promise<CkanOrganization[] | string[]> {
  const resp = await api.get<CkanResponse<CkanOrganization[] | string[]>>("/organization_list", qp({
    all_fields: opts.allFields ?? true,
    sort: opts.sort ?? "package_count desc",
    limit: opts.limit ?? 50,
    offset: opts.offset ?? 0,
  }));
  return resp.result;
}

/**
 * Get details for a specific organization (federal agency).
 *
 * @example
 *   const org = await getOrganization("nasa-gov");
 *   const org = await getOrganization("epa-gov", { includeDatasets: true });
 */
export async function getOrganization(
  id: string,
  opts?: { includeDatasets?: boolean },
): Promise<CkanOrganization> {
  const resp = await api.get<CkanResponse<CkanOrganization>>("/organization_show", qp({
    id,
    include_datasets: opts?.includeDatasets ?? false,
  }));
  return resp.result;
}

/** Clear the cache. */
export function clearCache(): void {
  api.clearCache();
}
