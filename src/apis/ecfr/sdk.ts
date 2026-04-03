/**
 * eCFR SDK — typed API client for the electronic Code of Federal Regulations API.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { searchCFR, getTitleStructure, getSectionContent } from "us-gov-open-data-mcp/sdk/ecfr";
 *
 *   const results = await searchCFR({ query: "clean water" });
 *   const structure = await getTitleStructure({ date: "2026-04-02", title: 40 });
 *   const section = await getSectionContent({ date: "2026-04-02", title: 21, part: "314", section: "50" });
 *
 * No API key required — eCFR is fully open access.
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://www.ecfr.gov/api",
  name: "ecfr",
  rateLimit: { perSecond: 3, burst: 8 },
  cacheTtlMs: 60 * 60 * 1000, // 1 hour — regulations update infrequently
});

// ─── Types ───────────────────────────────────────────────────────────

export interface ECFRSearchResult {
  results: Record<string, unknown>[];
  total_count?: number;
  meta?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface ECFRStructure {
  identifier?: string;
  label?: string;
  type?: string;
  children?: ECFRStructure[];
  [key: string]: unknown;
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Search the Code of Federal Regulations by keyword.
 */
export async function searchCFR(opts: {
  query: string;
  limit?: number;
  page?: number;
}): Promise<ECFRSearchResult> {
  const params = qp({
    query: opts.query,
    per_page: opts.limit ?? 20,
    page: opts.page ?? 1,
  });
  return api.get<ECFRSearchResult>("/search/v1/results", params);
}

/**
 * Get the structure (parts/subparts/sections) of a CFR title.
 */
export async function getTitleStructure(opts: {
  date: string;
  title: number;
}): Promise<ECFRStructure> {
  return api.get<ECFRStructure>(`/versioner/v1/structure/${opts.date}/title-${opts.title}.json`);
}

/**
 * Get the rendered content of a specific CFR section.
 * Returns HTML content from the enhanced renderer endpoint.
 */
export async function getSectionContent(opts: {
  date: string;
  title: number;
  part: string;
  section?: string;
}): Promise<string> {
  const params = qp({
    part: opts.part,
    section: opts.section,
  });
  // Use the renderer endpoint for human-readable HTML content
  const data = await api.get<string>(
    `/renderer/v1/content/enhanced/${opts.date}/title-${opts.title}`,
    params,
  );
  return typeof data === "string" ? data : JSON.stringify(data);
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
