/**
 * CPSC SDK — typed API client for consumer product recalls and penalties
 * via the SaferProducts.gov REST API.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { searchRecalls, searchPenalties } from "us-gov-open-data-mcp/sdk/cpsc";
 *
 * No API key required.
 * Docs: https://www.saferproducts.gov/RestWebServices
 */

import { createClient } from "../../shared/client.js";

// ─── Client ─────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://www.saferproducts.gov/RestWebServices",
  name: "cpsc",
  rateLimit: { perSecond: 4, burst: 8 },
  cacheTtlMs: 60 * 60 * 1000,
});

// ─── Types ──────────────────────────────────────────────────────────

/** Product within a recall. */
export interface RecallProduct {
  Name?: string;
  Description?: string;
  Type?: string;
  CategoryID?: string;
  NumberOfUnits?: string;
  [key: string]: unknown;
}

/** Manufacturer within a recall. */
export interface RecallManufacturer {
  Name?: string;
  CompanyID?: string;
  [key: string]: unknown;
}

/** Hazard within a recall. */
export interface RecallHazard {
  Name?: string;
  HazardType?: string;
  HazardTypeID?: string;
  [key: string]: unknown;
}

/** Remedy within a recall. */
export interface RecallRemedy {
  Name?: string;
  [key: string]: unknown;
}

/** Image within a recall. */
export interface RecallImage {
  URL?: string;
  Caption?: string;
  [key: string]: unknown;
}

/** Injury within a recall. */
export interface RecallInjury {
  Name?: string;
  [key: string]: unknown;
}

/** Retailer within a recall. */
export interface RecallRetailer {
  Name?: string;
  CompanyID?: string;
  [key: string]: unknown;
}

/** Full recall record from the CPSC API. */
export interface Recall {
  RecallID?: number;
  RecallNumber?: string;
  RecallDate?: string;
  Description?: string;
  URL?: string;
  Title?: string;
  ConsumerContact?: string;
  LastPublishDate?: string;
  Products?: RecallProduct[];
  Images?: RecallImage[];
  Injuries?: RecallInjury[];
  Manufacturers?: RecallManufacturer[];
  Retailers?: RecallRetailer[];
  Hazards?: RecallHazard[];
  Remedies?: RecallRemedy[];
  [key: string]: unknown;
}

/** Penalty record from the CPSC API. */
export interface Penalty {
  Id?: number;
  FiscalYear?: string;
  Company?: string;
  Product?: string;
  Amount?: number | string;
  PenaltyType?: string;
  Citation?: string;
  [key: string]: unknown;
}

/** Company with penalties. */
export interface PenaltyCompany {
  Company?: string;
  [key: string]: unknown;
}

/** Product type with penalties. */
export interface PenaltyProduct {
  Product?: string;
  [key: string]: unknown;
}

// ═══════════════════════════════════════════════════════════════════════
// RECALLS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Search CPSC product recalls by various filters.
 * All parameters are optional. The API returns a JSON array directly.
 *
 * Example:
 *   await searchRecalls({ ProductName: "stroller" });
 *   await searchRecalls({ Manufacturer: "Fisher-Price" });
 */
export async function searchRecalls(opts: {
  RecallID?: number;
  RecallNumber?: string;
  RecallDateStart?: string;
  RecallDateEnd?: string;
  LastPublishDateStart?: string;
  LastPublishDateEnd?: string;
  RecallTitle?: string;
  ProductName?: string;
  ProductType?: string;
  Manufacturer?: string;
  Hazard?: string;
} = {}): Promise<Recall[]> {
  const params: Record<string, string> = { format: "json" };
  if (opts.RecallID != null) params.RecallID = String(opts.RecallID);
  if (opts.RecallNumber) params.RecallNumber = opts.RecallNumber;
  if (opts.RecallDateStart) params.RecallDateStart = opts.RecallDateStart;
  if (opts.RecallDateEnd) params.RecallDateEnd = opts.RecallDateEnd;
  if (opts.LastPublishDateStart) params.LastPublishDateStart = opts.LastPublishDateStart;
  if (opts.LastPublishDateEnd) params.LastPublishDateEnd = opts.LastPublishDateEnd;
  if (opts.RecallTitle) params.RecallTitle = opts.RecallTitle;
  if (opts.ProductName) params.ProductName = opts.ProductName;
  if (opts.ProductType) params.ProductType = opts.ProductType;
  if (opts.Manufacturer) params.Manufacturer = opts.Manufacturer;
  if (opts.Hazard) params.Hazard = opts.Hazard;

  return api.get<Recall[]>("/Recall", params);
}

/**
 * Get a single recall by its RecallID.
 *
 * Example:
 *   await getRecallById(12345);
 */
export async function getRecallById(recallId: number): Promise<Recall | null> {
  const results = await api.get<Recall[]>("/Recall", {
    format: "json",
    RecallID: String(recallId),
  });
  return results?.[0] ?? null;
}

// ═══════════════════════════════════════════════════════════════════════
// PENALTIES
// ═══════════════════════════════════════════════════════════════════════

/**
 * List companies that have penalties.
 *
 * Example:
 *   await getPenaltyCompanies("civil");
 */
export async function getPenaltyCompanies(penaltyType: "civil" | "criminal"): Promise<PenaltyCompany[]> {
  return api.get<PenaltyCompany[]>("/Penalty/Company", {
    penaltytype: penaltyType,
    format: "json",
  });
}

/**
 * List product types that have penalties.
 *
 * Example:
 *   await getPenaltyProducts("civil");
 */
export async function getPenaltyProducts(penaltyType: "civil" | "criminal"): Promise<PenaltyProduct[]> {
  return api.get<PenaltyProduct[]>("/Penalty/Product", {
    penaltytype: penaltyType,
    format: "json",
  });
}

/**
 * Search penalty records by type, company, product, fiscal year, or ID.
 *
 * Example:
 *   await searchPenalties({ penaltyType: "civil", company: "IKEA" });
 */
export async function searchPenalties(opts: {
  penaltyType: "civil" | "criminal";
  company?: string;
  product?: string;
  fiscalYear?: string;
  id?: number;
} ): Promise<Penalty[]> {
  const params: Record<string, string> = {
    penaltytype: opts.penaltyType,
    format: "json",
  };
  if (opts.company) params.company = opts.company;
  if (opts.product) params.product = opts.product;
  if (opts.fiscalYear) params.fiscalyear = opts.fiscalYear;
  if (opts.id != null) params.id = String(opts.id);

  return api.get<Penalty[]>("/Penalty/Penalty", params);
}

/** Clear the CPSC API cache. */
export function clearCache(): void {
  api.clearCache();
}
