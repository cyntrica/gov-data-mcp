/**
 * Senate Lobbying Disclosure Act (LDA) SDK — lobbying filings, contributions, registrants, and clients.
 *
 * API docs: https://lda.gov/api/v1/ (Django REST framework, self-documenting)
 * No API key required. Returns paginated JSON.
 *
 * Usage:
 *   import { searchFilings, searchContributions } from "us-gov-open-data-mcp/sdk/senate-lobbying";
 *   const filings = await searchFilings({ registrant_name: "Pfizer", filing_year: 2025 });
 */

import { createClient, qp } from "../../shared/client.js";

const api = createClient({
  baseUrl: "https://lda.gov/api/v1",
  name: "senate-lobbying",
  rateLimit: { perSecond: 3, burst: 8 },
  cacheTtlMs: 60 * 60 * 1000, // 1 hour
  timeoutMs: 30_000,
});

// ─── Types ───────────────────────────────────────────────────────────

/** Lda Paginated. */
export interface LdaPaginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/** Lda Filing. */
export interface LdaFiling {
  filing_uuid: string;
  filing_type: string;
  filing_type_display: string;
  filing_year: number;
  filing_period_display: string;
  filing_document_url: string;
  income: string | null;
  expenses: string | null;
  registrant: { id: number; name: string; description: string | null } | null;
  client: { id: number; name: string; general_description: string | null } | null;
  lobbying_activities: LdaActivity[];
  posted_by_name: string;
  dt_posted: string;
  [key: string]: unknown;
}

/** Lda Activity. */
export interface LdaActivity {
  general_issue_code: string;
  general_issue_code_display: string;
  description: string;
  lobbyists: { lobbyist_full_display_name: string | null }[];
}

/** Lda Contribution Item. */
export interface LdaContributionItem {
  contribution_type: string;
  contribution_type_display: string;
  contributor_name: string;
  payee_name: string;
  honoree_name: string;
  amount: string;
  date: string;
}

/** Lda Contribution. */
export interface LdaContribution {
  filing_uuid: string;
  filing_type_display: string;
  filing_year: number;
  filing_period_display: string;
  filer_type_display: string;
  registrant: { name: string } | null;
  lobbyist: { first_name: string; last_name: string; prefix_display: string } | null;
  no_contributions: boolean;
  contribution_items: LdaContributionItem[];
  [key: string]: unknown;
}

/** Lda Registrant. */
export interface LdaRegistrant {
  id: number;
  name: string;
  description: string | null;
  address_1: string;
  city: string;
  state: string;
  contact_name: string;
  contact_telephone: string;
  [key: string]: unknown;
}

/** Lda Client. */
export interface LdaClient {
  id: number;
  client_id: number;
  name: string;
  general_description: string | null;
  state: string;
  country_display: string;
  [key: string]: unknown;
}

// ─── Reference Data ──────────────────────────────────────────────────

/** Filing type codes */
export const FILING_TYPES = {
  Q1: "1st Quarter Report",
  Q2: "2nd Quarter Report",
  Q3: "3rd Quarter Report",
  Q4: "4th Quarter Report",
  MM: "Mid-Year Report",
  MY: "Year-End Report",
  RN: "Registration (New)",
  RA: "Registration Amendment",
  RR: "Registration Renewal",
  TE: "Termination",
} as const;

/** General issue area codes (most common) */
export const ISSUE_CODES = {
  HCR: "Health Issues",
  MMM: "Medicare/Medicaid",
  TAX: "Taxation/Internal Revenue Code",
  BUD: "Budget/Appropriations",
  DEF: "Defense",
  ENV: "Environment/Superfund",
  ENG: "Energy/Nuclear",
  TRD: "Trade (Domestic/Foreign)",
  FIN: "Financial Institutions/Investments/Securities",
  TEC: "Science/Technology",
  EDU: "Education",
  IMM: "Immigration",
  LBR: "Labor Issues/Antitrust/Workplace",
  TRA: "Transportation",
  AGR: "Agriculture",
  HOM: "Housing",
  CPT: "Consumer Issues/Safety/Products",
  DIS: "Disaster Planning/Emergencies",
  GOV: "Government Issues",
  LAW: "Law Enforcement/Crime/Criminal Justice",
} as const;

// ─── Public API ──────────────────────────────────────────────────────

/** Search lobbying filings — the core data showing who lobbied, for whom, on what, and how much. */
export async function searchFilings(opts: {
  filing_year?: number;
  filing_type?: string;
  registrant_name?: string;
  client_name?: string;
  issue_code?: string;
  page_size?: number;
  page?: number;
}): Promise<LdaPaginated<LdaFiling>> {
  const params = qp({
    page_size: opts.page_size || 20,
    filing_year: opts.filing_year,
    filing_type: opts.filing_type,
    registrant_name: opts.registrant_name,
    client_name: opts.client_name,
    filing_lobbying_activities__general_issue_code: opts.issue_code,
    page: opts.page,
  });

  return api.get<LdaPaginated<LdaFiling>>("/filings/", params);
}

/** Get a specific filing by UUID — includes full lobbying activity detail. */
export async function getFilingDetail(uuid: string): Promise<LdaFiling> {
  return api.get<LdaFiling>(`/filings/${uuid}/`);
}

/** Search lobbying contributions (campaign donations by lobbyists). */
export async function searchContributions(opts: {
  filing_year?: number;
  registrant_name?: string;
  lobbyist_name?: string;
  page_size?: number;
}): Promise<LdaPaginated<LdaContribution>> {
  const params = qp({
    page_size: opts.page_size || 20,
    filing_year: opts.filing_year,
    registrant_name: opts.registrant_name,
    lobbyist_name: opts.lobbyist_name,
  });

  return api.get<LdaPaginated<LdaContribution>>("/contributions/", params);
}

/** Search lobbying registrants (lobbying firms and organizations). */
export async function searchRegistrants(opts: {
  registrant_name?: string;
  page_size?: number;
}): Promise<LdaPaginated<LdaRegistrant>> {
  const params = qp({
    page_size: opts.page_size || 20,
    registrant_name: opts.registrant_name,
  });

  return api.get<LdaPaginated<LdaRegistrant>>("/registrants/", params);
}

/** Search lobbying clients (who hired lobbyists). */
export async function searchClients(opts: {
  client_name?: string;
  page_size?: number;
}): Promise<LdaPaginated<LdaClient>> {
  const params = qp({
    page_size: opts.page_size || 20,
    client_name: opts.client_name,
  });

  return api.get<LdaPaginated<LdaClient>>("/clients/", params);
}

/** Search individual lobbyists by name. */
export async function searchLobbyists(opts: {
  lobbyist_name?: string;
  registrant_name?: string;
  page_size?: number;
  page?: number;
}): Promise<LdaPaginated<{ id: number; prefix?: string; first_name?: string; last_name?: string; suffix?: string; registrant?: { name: string }; [key: string]: unknown }>> {
  const params = qp({
    page_size: opts.page_size || 20,
    lobbyist_name: opts.lobbyist_name,
    registrant_name: opts.registrant_name,
    page: opts.page,
  });

  return api.get("/lobbyists/", params);
}

/**
 * Clear Cache.
 */
export function clearCache(): void { api.clearCache(); }
