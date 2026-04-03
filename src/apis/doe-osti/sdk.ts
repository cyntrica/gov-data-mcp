import { createClient, qp } from "../../shared/client.js";

const api = createClient({
  baseUrl: "https://www.osti.gov/api/v1",
  name: "doe-osti",
  rateLimit: { perSecond: 3, burst: 8 },
  cacheTtlMs: 60 * 60 * 1000,
  defaultHeaders: { Accept: "application/json" },
});

export type OSTIRecord = Record<string, unknown>;

export async function searchPublications(opts?: {
  query?: string; author?: string; title?: string;
  dateStart?: string; dateEnd?: string; subject?: string;
  limit?: number; page?: number;
}): Promise<OSTIRecord[]> {
  return api.get<OSTIRecord[]>("/records", qp({
    search_field: opts?.query, author: opts?.author, title: opts?.title,
    publication_date_start: opts?.dateStart, publication_date_end: opts?.dateEnd,
    subjects: opts?.subject, rows: opts?.limit ?? 25, page: opts?.page ?? 0,
  }));
}

export function clearCache() { api.clearCache(); }
