/**
 * federal-register module metadata.
 */

import { type FRDocument } from "./sdk.js";
// ─── Metadata (server.ts reads these) ────────────────────────────────

export const name = "federal-register";
export const displayName = "Federal Register";
export const category = "Legislative";
export const description = "Executive orders, presidential documents, rules, agency notices";
export const workflow = "fr_executive_orders or fr_search_rules → review results";
export const tips =
  "Use president slugs: 'donald-trump', 'joe-biden', 'barack-obama', 'george-w-bush', 'william-j-clinton'. " +
  "No API key required.";

export const reference = {
  presidentSlugs: {
    trump: "donald-trump",
    biden: "joe-biden",
    obama: "barack-obama",
    bush: "george-w-bush",
    clinton: "william-j-clinton",
  } as Record<string, string>,
  documentTypes: {
    RULE: "Rule — final rule published in CFR",
    PRORULE: "Proposed Rule — notice of proposed rulemaking",
    NOTICE: "Notice — agency announcement",
    PRESDOCU: "Presidential Document — EOs, memoranda, proclamations",
  } as Record<string, string>,
  presidentialDocTypes: {
    executive_order: "Executive Order",
    determination: "Presidential Determination",
    executive_memorandum: "Presidential Memorandum",
    proclamation: "Proclamation",
    notice: "Notice",
  } as Record<string, string>,
  docs: {
    "API Docs": "https://www.federalregister.gov/developers/documentation/api/v1",
    "Developer Hub": "https://www.federalregister.gov/developers",
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────

function summarizeDoc(d: FRDocument) {
  return {
    title: d.title,
    type: d.type,
    subtype: d.subtype ?? d.presidential_document_type_id ?? null,
    documentNumber: d.document_number,
    executiveOrderNumber: d.executive_order_number ?? null,
    publicationDate: d.publication_date,
    signingDate: d.signing_date ?? null,
    president: d.president?.name ?? null,
    abstract: d.abstract ?? null,
    htmlUrl: d.html_url,
    agencies: d.agencies?.map(a => a.name ?? a.raw_name).filter(Boolean) ?? [],
  };
}

// ─── Tools ───────────────────────────────────────────────────────────

