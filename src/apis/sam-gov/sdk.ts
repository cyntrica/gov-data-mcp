import { createClient, qp } from "../../shared/client.js";

const api = createClient({
  baseUrl: "https://api.sam.gov/prod",
  name: "sam-gov",
  auth: { type: "query", envParams: { api_key: "SAM_API_KEY" } },
  rateLimit: { perSecond: 3, burst: 8 },
  cacheTtlMs: 60 * 60 * 1000,
});

export type SamRecord = Record<string, unknown>;

export async function searchOpportunities(opts?: {
  keyword?: string; naics?: string; postedFrom?: string; postedTo?: string;
  setAside?: string; limit?: number; offset?: number;
}): Promise<SamRecord> {
  return api.get<SamRecord>("/opportunities/v2/search", qp({
    api_key: undefined, // handled by client auth
    keyword: opts?.keyword, naicsCode: opts?.naics,
    postedFrom: opts?.postedFrom, postedTo: opts?.postedTo,
    typeOfSetAside: opts?.setAside, limit: opts?.limit ?? 25, offset: opts?.offset,
  }));
}

export async function searchEntities(opts?: {
  ueiSAM?: string; cageCode?: string; legalBusinessName?: string;
  stateCode?: string; limit?: number;
}): Promise<SamRecord> {
  return api.get<SamRecord>("/entity-information/v3/entities", qp({
    ueiSAM: opts?.ueiSAM, cageCode: opts?.cageCode,
    legalBusinessName: opts?.legalBusinessName, physicalAddressStateCode: opts?.stateCode,
    registrationStatus: "A", includeSections: "entityRegistration",
    page: 0, size: opts?.limit ?? 25,
  }));
}

export async function searchExclusions(opts?: {
  name?: string; ueiSAM?: string; classificationType?: string; limit?: number;
}): Promise<SamRecord> {
  return api.get<SamRecord>("/entity-information/v3/exclusions", qp({
    name: opts?.name, ueiSAM: opts?.ueiSAM, classificationType: opts?.classificationType,
    page: 0, size: opts?.limit ?? 25,
  }));
}

export function clearCache() { api.clearCache(); }
