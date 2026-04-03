/**
 * CAL FIRE SDK — typed API client for California wildfire incident data.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { getIncidents } from "us-gov-open-data-mcp/sdk/calfire";
 *
 * No API key required — public data.
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://www.fire.ca.gov/umbraco/api/IncidentApi",
  name: "calfire",
  rateLimit: { perSecond: 3, burst: 6 },
  cacheTtlMs: 10 * 60 * 1000, // 10 minutes — incidents update periodically
});

// ─── Types ───────────────────────────────────────────────────────────

/** GeoJSON Feature Collection from CAL FIRE. */
export interface CalfireGeoJson {
  type?: string;
  features?: CalfireFeature[];
  [key: string]: unknown;
}

/** Individual fire incident feature. */
export interface CalfireFeature {
  type?: string;
  geometry?: {
    type?: string;
    coordinates?: unknown;
  };
  properties?: CalfireProperties;
  [key: string]: unknown;
}

/** Fire incident properties. */
export interface CalfireProperties {
  Name?: string;
  Location?: string;
  County?: string;
  AcresBurned?: number | null;
  PercentContained?: number | null;
  StartDate?: string;
  ExtinguishedDate?: string | null;
  StructuresDamaged?: number | null;
  StructuresDestroyed?: number | null;
  Injuries?: number | null;
  Fatalities?: number | null;
  PersonnelInvolved?: number | null;
  Status?: string;
  [key: string]: unknown;
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Get wildfire incidents as GeoJSON.
 * @param inactive - false for active fires (default), true for historical
 * @param year - year for historical data (required when inactive=true)
 */
export async function getIncidents(opts: {
  inactive?: boolean;
  year?: number;
} = {}): Promise<CalfireGeoJson> {
  const params = qp({
    inactive: opts.inactive ?? false,
    year: opts.year,
  });
  return api.get<CalfireGeoJson>("/GeoJsonList", params);
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
