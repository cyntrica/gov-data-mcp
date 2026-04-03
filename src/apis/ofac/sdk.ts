/**
 * @module OFAC — Office of Foreign Assets Control Sanctions
 *
 * Uses the OFAC Sanctions List Service API at sanctionslistservice.ofac.treas.gov.
 * Export endpoints return 302 redirects to S3 presigned URLs with file downloads.
 * We follow redirects and parse the responses.
 *
 * No API key required.
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://sanctionslistservice.ofac.treas.gov",
  name: "ofac",
  rateLimit: { perSecond: 2, burst: 5 },
  cacheTtlMs: 24 * 60 * 60 * 1000, // 24 hours — sanctions lists update infrequently
});

// ─── Helpers ─────────────────────────────────────────────────────────

/**
 * Fetch an OFAC export file (follows 302 → S3 presigned URL).
 * Returns parsed CSV rows as objects.
 */
async function fetchCsvExport(exportName: string): Promise<Record<string, string>[]> {
  const resp = await fetch(
    `https://sanctionslistservice.ofac.treas.gov/api/PublicationPreview/exports/${exportName}`,
    { redirect: "follow" },
  );
  if (!resp.ok) throw new Error(`ofac: HTTP ${resp.status} fetching ${exportName}`);
  const text = await resp.text();
  return parseCsv(text);
}

/** Simple CSV parser — handles quoted fields with commas. */
function parseCsv(text: string): Record<string, string>[] {
  const lines = text.split("\n").filter(l => l.trim());
  if (lines.length < 2) return [];
  const headers = splitCsvLine(lines[0]);
  return lines.slice(1).map(line => {
    const vals = splitCsvLine(line);
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => { obj[h.trim().replace(/^"|"$/g, "")] = (vals[i] ?? "").replace(/^"|"$/g, ""); });
    return obj;
  });
}

function splitCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (const ch of line) {
    if (ch === '"') { inQuotes = !inQuotes; current += ch; }
    else if (ch === "," && !inQuotes) { result.push(current); current = ""; }
    else { current += ch; }
  }
  result.push(current);
  return result;
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Get the SDN (Specially Designated Nationals) list.
 * Downloads the CSV export and returns parsed entries.
 */
export async function getSdnList(opts?: { limit?: number }): Promise<Record<string, string>[]> {
  const rows = await fetchCsvExport("SDN.CSV");
  return opts?.limit ? rows.slice(0, opts.limit) : rows;
}

/**
 * Get the consolidated non-SDN sanctions list.
 */
export async function getConsolidatedList(opts?: { limit?: number }): Promise<Record<string, string>[]> {
  const rows = await fetchCsvExport("CONS_PRIM.CSV");
  return opts?.limit ? rows.slice(0, opts.limit) : rows;
}

/**
 * Search SDN list by name (case-insensitive substring match).
 */
export async function searchSanctions(opts: { name: string; limit?: number }): Promise<Record<string, string>[]> {
  const rows = await fetchCsvExport("SDN.CSV");
  const needle = opts.name.toLowerCase();
  const matches = rows.filter(r => {
    const vals = Object.values(r).join(" ").toLowerCase();
    return vals.includes(needle);
  });
  return opts?.limit ? matches.slice(0, opts.limit) : matches;
}

/**
 * Filter SDN list by program, entity type, or country.
 */
export async function filterSanctions(opts: {
  program?: string;
  entityType?: string;
  country?: string;
  limit?: number;
} = {}): Promise<Record<string, string>[]> {
  const rows = await fetchCsvExport("SDN.CSV");
  let filtered = rows;
  if (opts.program) {
    const p = opts.program.toLowerCase();
    filtered = filtered.filter(r => Object.values(r).some(v => v.toLowerCase().includes(p)));
  }
  if (opts.entityType) {
    const et = opts.entityType.toLowerCase();
    filtered = filtered.filter(r => Object.values(r).some(v => v.toLowerCase().includes(et)));
  }
  if (opts.country) {
    const c = opts.country.toLowerCase();
    filtered = filtered.filter(r => Object.values(r).some(v => v.toLowerCase().includes(c)));
  }
  return opts?.limit ? filtered.slice(0, opts.limit) : filtered;
}

/**
 * List available OFAC export files.
 */
export async function getExports(): Promise<unknown> {
  return api.get("/api/PublicationPreview/exports");
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
