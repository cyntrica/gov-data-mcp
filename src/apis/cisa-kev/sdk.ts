/**
 * CISA KEV SDK — typed API client for the Known Exploited Vulnerabilities catalog.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { getKevCatalog } from "us-gov-open-data-mcp/sdk/cisa-kev";
 *
 *   const catalog = await getKevCatalog();
 *   console.log(catalog.count, catalog.vulnerabilities.length);
 *
 * No API key required.
 * Catalog: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
 */

import { createClient } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const client = createClient({
  baseUrl: "https://www.cisa.gov/sites/default/files/feeds",
  name: "cisa-kev",
  rateLimit: { perSecond: 1, burst: 2 },
  cacheTtlMs: 60 * 60 * 1000, // 1 hour — catalog updates ~daily
});

// ─── Types ───────────────────────────────────────────────────────────

export interface KevVulnerability {
  cveID: string;
  vendorProject: string;
  product: string;
  vulnerabilityName: string;
  dateAdded: string;
  shortDescription: string;
  requiredAction: string;
  dueDate: string;
  knownRansomwareCampaignUse: string;
  [key: string]: unknown;
}

export interface KevCatalog {
  title: string;
  catalogVersion: string;
  dateReleased: string;
  count: number;
  vulnerabilities: KevVulnerability[];
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Get the full CISA Known Exploited Vulnerabilities catalog.
 *
 * Example:
 *   const catalog = await getKevCatalog();
 *   const recent = catalog.vulnerabilities.filter(v => v.dateAdded >= "2024-01-01");
 */
export async function getKevCatalog(): Promise<KevCatalog> {
  return client.get<KevCatalog>("/known_exploited_vulnerabilities.json");
}

/** Clear cached responses. */
export function clearCache(): void {
  client.clearCache();
}
