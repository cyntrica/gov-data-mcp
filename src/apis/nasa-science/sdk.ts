import { createClient, qp } from "../../shared/client.js";

const api = createClient({
  baseUrl: "https://api.nasa.gov",
  name: "nasa-science",
  auth: { type: "query", envParams: { api_key: "NASA_API_KEY" }, extraParams: { api_key: "DEMO_KEY" } },
  rateLimit: { perSecond: 2, burst: 5 },
  cacheTtlMs: 60 * 60 * 1000,
});

const eonet = createClient({
  baseUrl: "https://eonet.gsfc.nasa.gov/api/v3",
  name: "nasa-eonet",
  rateLimit: { perSecond: 2, burst: 5 },
  cacheTtlMs: 60 * 60 * 1000,
});

export type NasaRecord = Record<string, unknown>;

/** Search Near-Earth Objects by date range. */
export async function searchNEO(opts?: { startDate?: string; endDate?: string }): Promise<NasaRecord> {
  return api.get<NasaRecord>("/neo/rest/v1/feed", qp({
    start_date: opts?.startDate, end_date: opts?.endDate,
  }));
}

/** Get NEO details by asteroid ID. */
export async function getNEODetail(asteroidId: string): Promise<NasaRecord> {
  return api.get<NasaRecord>(`/neo/rest/v1/neo/${asteroidId}`);
}

/** Get space weather events from DONKI. */
export async function getDONKI(opts?: { type?: string; startDate?: string; endDate?: string }): Promise<NasaRecord[]> {
  const endpoint = opts?.type ?? "notifications";
  return api.get<NasaRecord[]>(`/DONKI/${endpoint}`, qp({
    startDate: opts?.startDate, endDate: opts?.endDate,
  }));
}

/** Get Mars Rover photos. */
export async function getMarsPhotos(opts?: {
  rover?: string; sol?: number; earthDate?: string; camera?: string; page?: number;
}): Promise<NasaRecord> {
  const rover = opts?.rover ?? "curiosity";
  return api.get<NasaRecord>(`/mars-photos/api/v1/rovers/${rover}/photos`, qp({
    sol: opts?.sol, earth_date: opts?.earthDate, camera: opts?.camera, page: opts?.page ?? 1,
  }));
}

/** Get Earth natural events from EONET. */
export async function getEONETEvents(opts?: {
  category?: string; status?: string; limit?: number;
}): Promise<NasaRecord> {
  return eonet.get<NasaRecord>("/events", qp({
    category: opts?.category, status: opts?.status ?? "open", limit: opts?.limit ?? 20,
  }));
}

export function clearCache() { api.clearCache(); eonet.clearCache(); }
