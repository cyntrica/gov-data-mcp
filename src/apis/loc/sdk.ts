/**
 * @module LOC — Library of Congress
 *
 * Typed API client for the Library of Congress digital collections API.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { search, getItem, getCollections } from "us-gov-open-data-mcp/sdk/loc";
 *
 *   const results = await search("civil war photographs");
 *   const item = await getItem("2014717546");
 *
 * No API key required. All requests include fo=json for JSON responses.
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://www.loc.gov",
  name: "loc",
  rateLimit: { perSecond: 5, burst: 10 },
  cacheTtlMs: 60 * 60 * 1000, // 1 hour
  defaultHeaders: {
    "User-Agent": "gov-data-mcp/1.0 (MCP server; +https://github.com/cyntrica/gov-data-mcp)",
  },
});

// ─── Helpers ─────────────────────────────────────────────────────────

/** Append fo=json to every param object. */
function withJson(params: Record<string, any> = {}): Record<string, any> {
  return { ...params, fo: "json" };
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Global search across 40M+ Library of Congress items.
 *
 * @param q - Search query
 * @param opts - Pagination and filtering options
 * @returns Search results with pagination info
 */
export async function search(q: string, opts: {
  facet?: string;
  pageSize?: number;
  page?: number;
  sort?: string;
} = {}): Promise<any> {
  return api.get("/search/", withJson(qp({
    q,
    fa: opts.facet,
    c: opts.pageSize ?? 25,
    sp: opts.page,
    sb: opts.sort,
  })));
}

/**
 * List all digital collections.
 *
 * @returns Array of collections with metadata
 */
export async function getCollections(): Promise<any> {
  return api.get("/collections/", withJson());
}

/**
 * Browse a specific collection by slug.
 *
 * @param slug - Collection slug (e.g. "civil-war-maps")
 * @param opts - Search/pagination within the collection
 * @returns Collection items and metadata
 */
export async function browseCollection(slug: string, opts: {
  q?: string;
  page?: number;
} = {}): Promise<any> {
  return api.get(`/collections/${slug}/`, withJson(qp({
    q: opts.q,
    sp: opts.page,
  })));
}

/**
 * Browse items by format (audio, books, maps, photos, etc.).
 *
 * @param format - Format slug
 * @param opts - Search/pagination options
 * @returns Items in the specified format
 */
export async function browseFormat(format: string, opts: {
  q?: string;
  page?: number;
} = {}): Promise<any> {
  return api.get(`/${format}/`, withJson(qp({
    q: opts.q,
    sp: opts.page,
  })));
}

/**
 * Get full metadata for a specific item.
 *
 * @param id - Item identifier
 * @returns Complete item metadata
 */
export async function getItem(id: string): Promise<any> {
  return api.get(`/item/${id}/`, withJson());
}

/**
 * Full-text search of historical newspaper pages (Chronicling America).
 *
 * @param opts - Search parameters
 * @returns Matching newspaper pages with OCR text snippets
 */
export async function searchNewspaperPages(opts: {
  text?: string;
  dateFrom?: string;
  dateTo?: string;
  state?: string;
  lccn?: string;
  sort?: string;
  rows?: number;
  page?: number;
} = {}): Promise<any> {
  return api.get("/search/pages/results/", {
    ...qp({
      andtext: opts.text,
      date1: opts.dateFrom,
      date2: opts.dateTo,
      state: opts.state,
      lccn: opts.lccn,
      sort: opts.sort,
      rows: opts.rows ?? 20,
      page: opts.page,
    }),
    format: "json",
  });
}

/**
 * Search newspaper titles in Chronicling America.
 *
 * @param opts - Search parameters
 * @returns Matching newspaper titles with publication info
 */
export async function searchNewspaperTitles(opts: {
  terms?: string;
  state?: string;
  city?: string;
} = {}): Promise<any> {
  return api.get("/search/titles/results/", {
    ...qp({
      terms: opts.terms,
      state: opts.state,
      city: opts.city,
    }),
    format: "json",
  });
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
