/**
 * State Department Travel Advisories SDK — typed API client.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { getTravelAdvisories } from "us-gov-open-data-mcp/sdk/state-travel";
 *
 *   const advisories = await getTravelAdvisories();
 *
 * No API key required.
 * Docs: https://cadataapi.state.gov/
 */

import { createClient } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const client = createClient({
  baseUrl: "https://cadataapi.state.gov/api",
  name: "state-travel",
  rateLimit: { perSecond: 2, burst: 5 },
  cacheTtlMs: 60 * 60 * 1000, // 1 hour — advisories update infrequently
});

// ─── Types ───────────────────────────────────────────────────────────

export interface TravelAdvisory {
  [key: string]: unknown;
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Get travel advisories for all countries.
 *
 * Example:
 *   const advisories = await getTravelAdvisories();
 */
export async function getTravelAdvisories(): Promise<TravelAdvisory[]> {
  return client.get<TravelAdvisory[]>("/TravelAdvisories");
}

/** Clear cached responses. */
export function clearCache(): void {
  client.clearCache();
}
