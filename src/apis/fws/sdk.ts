import { createClient, qp } from "../../shared/client.js";

const api = createClient({
  baseUrl: "https://ecos.fws.gov/ecp/services",
  name: "fws",
  rateLimit: { perSecond: 2, burst: 5 },
  cacheTtlMs: 24 * 60 * 60 * 1000, // 24 hours — species data rarely changes
  defaultHeaders: { Accept: "application/json" },
});

export type FWSRecord = Record<string, unknown>;

export async function searchSpecies(opts?: {
  query?: string; status?: string; state?: string;
  group?: string; limit?: number;
}): Promise<FWSRecord> {
  return api.get<FWSRecord>("/species/search", qp({
    query: opts?.query, status: opts?.status, state: opts?.state,
    group: opts?.group, limit: opts?.limit ?? 25,
  }));
}

export async function getSpeciesDetail(tsn: string): Promise<FWSRecord> {
  return api.get<FWSRecord>(`/species/${tsn}`);
}

export function clearCache() { api.clearCache(); }
