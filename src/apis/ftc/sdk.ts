/**
 * FTC SDK — typed API client for Do Not Call complaints and HSR early
 * termination notices via the FTC API.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { searchDncComplaints, searchHsrNotices } from "us-gov-open-data-mcp/sdk/ftc";
 *
 * Requires DATA_GOV_API_KEY.
 * Docs: https://api.ftc.gov
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ─────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://api.ftc.gov",
  name: "ftc",
  auth: {
    type: "query",
    envParams: { api_key: "DATA_GOV_API_KEY" },
  },
  rateLimit: { perSecond: 2, burst: 5 },
  cacheTtlMs: 30 * 60 * 1000,
});

// ─── Types ──────────────────────────────────────────────────────────

/** Do Not Call complaint record. */
export interface DncComplaint {
  id?: string;
  "company-phone-number"?: string;
  "created-date"?: string;
  "violation-date"?: string;
  "consumer-city"?: string;
  "consumer-state"?: string;
  "consumer-area-code"?: string;
  subject?: string;
  "recorded-message-or-robocall"?: string;
  [key: string]: unknown;
}

/** HSR early termination notice record. */
export interface HsrNotice {
  id?: string;
  title?: string;
  "transaction-number"?: string;
  date?: string;
  [key: string]: unknown;
}

/** Drupal JSON:API response envelope. */
interface JsonApiResponse<T> {
  data?: T[];
  meta?: { count?: number; [key: string]: unknown };
  links?: Record<string, unknown>;
  [key: string]: unknown;
}

// ═══════════════════════════════════════════════════════════════════════
// DNC COMPLAINTS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Search Do Not Call complaints with Drupal filter syntax.
 *
 * Example:
 *   await searchDncComplaints({ consumer_state: "CA", is_robocall: true });
 */
export async function searchDncComplaints(opts: {
  consumer_state?: string;
  consumer_city?: string;
  subject?: string;
  is_robocall?: boolean;
  page_size?: number;
  page?: number;
} = {}): Promise<{ items: DncComplaint[]; total?: number }> {
  const params = qp({
    "filter[consumer-state]": opts.consumer_state,
    "filter[consumer-city]": opts.consumer_city,
    "filter[subject]": opts.subject,
    "filter[recorded-message-or-robocall]": opts.is_robocall != null
      ? (opts.is_robocall ? "Y" : "N")
      : undefined,
    "page[size]": opts.page_size ?? 25,
    "page[number]": opts.page ?? 1,
  });

  const res = await api.get<JsonApiResponse<DncComplaint>>("/v0/dnc-complaints", params);
  return {
    items: res.data ?? [],
    total: res.meta?.count,
  };
}

// ═══════════════════════════════════════════════════════════════════════
// HSR EARLY TERMINATION NOTICES
// ═══════════════════════════════════════════════════════════════════════

/**
 * Search HSR merger early termination notices.
 *
 * Example:
 *   await searchHsrNotices({ title: "Google" });
 */
export async function searchHsrNotices(opts: {
  title?: string;
  transaction_number?: string;
  page_size?: number;
  page?: number;
} = {}): Promise<{ items: HsrNotice[]; total?: number }> {
  const params = qp({
    "filter[title][value]": opts.title,
    "filter[transaction-number][value]": opts.transaction_number,
    items_per_page: opts.page_size ?? 25,
    page: opts.page ?? 0,
  });

  const res = await api.get<JsonApiResponse<HsrNotice>>("/v0/hsr-early-termination-notices", params);
  return {
    items: res.data ?? [],
    total: res.meta?.count,
  };
}

/** Clear the FTC API cache. */
export function clearCache(): void {
  api.clearCache();
}
