/**
 * FCC Broadband Map SDK — provider search and coverage lookup.
 *
 * API docs: https://broadbandmap.fcc.gov/developer
 * No API key required.
 *
 * Usage:
 *   import { searchProviders, checkCoverage } from "us-gov-open-data-mcp/sdk/fcc";
 *   const providers = await searchProviders({ state: "CA" });
 *   const coverage = await checkCoverage({ latitude: 40.7128, longitude: -74.006 });
 */

import { createClient, qp } from "../../shared/client.js";

const api = createClient({
  baseUrl: "https://broadbandmap.fcc.gov/api",
  name: "fcc",
  cacheTtlMs: 60 * 60 * 1000, // 1 hour — broadband data updates infrequently
  rateLimit: { perSecond: 5, burst: 10 },
});

// ─── Types ───────────────────────────────────────────────────────────

export interface BroadbandProvider {
  provider_id: string;
  provider_name: string;
  technology: string;
  max_download_speed: number | null;
  max_upload_speed: number | null;
  state: string;
}

export interface BroadbandCoverage {
  provider_name: string;
  technology: string;
  max_download_speed: number | null;
  max_upload_speed: number | null;
  low_latency: boolean | null;
  business_residential: string;
}

// ─── Public API ──────────────────────────────────────────────────────

/** Search broadband providers by location or state. */
export async function searchProviders(opts: {
  state?: string;
  latitude?: number;
  longitude?: number;
  technology?: string;
  limit?: number;
}): Promise<BroadbandProvider[]> {
  const params = qp({
    state_fips: opts.state,
    latitude: opts.latitude,
    longitude: opts.longitude,
    technology_code: opts.technology,
    limit: opts.limit ?? 50,
    format: "json",
  });
  const data = await api.get<any>("/public/map/listAvailableProviders", params);
  const items = Array.isArray(data) ? data : data?.data ?? data?.results ?? [];
  return items.map((p: any) => ({
    provider_id: p.provider_id ?? p.frn ?? "",
    provider_name: p.provider_name ?? p.brand_name ?? "",
    technology: p.technology ?? p.technology_code ?? "",
    max_download_speed: p.max_advertised_download_speed ?? p.max_download_speed ?? null,
    max_upload_speed: p.max_advertised_upload_speed ?? p.max_upload_speed ?? null,
    state: p.state_abbr ?? p.state ?? opts.state ?? "",
  }));
}

/** Check broadband coverage for a specific location. */
export async function checkCoverage(opts: {
  latitude?: number;
  longitude?: number;
  address?: string;
  technology?: string;
  speed_download?: number;
  speed_upload?: number;
}): Promise<BroadbandCoverage[]> {
  const params = qp({
    latitude: opts.latitude,
    longitude: opts.longitude,
    address: opts.address,
    technology_code: opts.technology,
    speed_download: opts.speed_download,
    speed_upload: opts.speed_upload,
    format: "json",
  });
  const data = await api.get<any>("/public/map/listBroadbandAvailability", params);
  const items = Array.isArray(data) ? data : data?.data ?? data?.results ?? [];
  return items.map((c: any) => ({
    provider_name: c.provider_name ?? c.brand_name ?? "",
    technology: c.technology ?? c.technology_code ?? "",
    max_download_speed: c.max_advertised_download_speed ?? c.max_download_speed ?? null,
    max_upload_speed: c.max_advertised_upload_speed ?? c.max_upload_speed ?? null,
    low_latency: c.low_latency ?? null,
    business_residential: c.business_residential_code ?? c.type ?? "",
  }));
}

/** Clear cache. */
export function clearCache(): void { api.clearCache(); }
