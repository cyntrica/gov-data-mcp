/**
 * congress module metadata.
 */

import { BILL_TYPES, CHAMBERS, AMENDMENT_TYPES, LAW_TYPES, REPORT_TYPES, type CongressBill, type CongressMember, type CongressVoteSummary, type CongressLaw, type CongressSponsoredBill } from "./sdk.js";
// ─── Metadata (server.ts reads these) ────────────────────────────────

export const name = "congress";
export const displayName = "Congress.gov";
export const category = "Legislative";
export const description = "Bills, votes, members, laws, amendments, and committee data from Congress.gov. House votes use Congress.gov API (118th+) with clerk.house.gov fallback (1990+). Senate votes from senate.gov (101st/1989+).";
export const auth = { envVar: "DATA_GOV_API_KEY", signup: "https://api.data.gov/signup/" };
export const workflow = "congress_search_bills → congress_bill_details for sponsors/cosponsors/status → congress_house_votes or congress_senate_votes for party-line breakdown → cross-reference with FEC (donors), lobbying_search (who lobbied), and FRED (economic impact)";
export const tips = "Congress numbers: 119th (2025-2026), 118th (2023-2024), 117th (2021-2022). Bill types: hr, s, hjres, sjres, hconres, sconres, hres, sres. House votes: use year param for historical (1990+). Senate votes: 101st Congress (1989) to present. Always compare House and Senate votes on the same bill to reveal bicameral differences. For accountability investigations: use congress_member_details to get committee assignments (e.g. Banking Committee chair), then congress_senate_votes/congress_house_votes for party-line breakdown, then cross-reference with FEC disbursements and lobbying spend.";

export const reference = {
  billTypes: BILL_TYPES,
  chambers: CHAMBERS,
  amendmentTypes: AMENDMENT_TYPES,
  lawTypes: LAW_TYPES,
  reportTypes: REPORT_TYPES,
  congressNumbers: {
    119: "2025-2026", 118: "2023-2024", 117: "2021-2022",
    116: "2019-2020", 115: "2017-2018", 114: "2015-2016",
  } as Record<number, string>,
  docs: {
    "API Docs": "https://api.congress.gov/",
    "Interactive Docs": "https://api.congress.gov/#/",
    "Sign Up": "https://api.congress.gov/sign-up/",
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────

function summarizeBill(b: CongressBill) {
  return {
    type: b.type ?? null,
    number: b.number ?? null,
    title: b.title ?? null,
    congress: b.congress ?? null,
    introducedDate: b.introducedDate ?? null,
    sponsor: b.sponsor ? { name: b.sponsor.name, party: b.sponsor.party, state: b.sponsor.state } : null,
    latestAction: b.latestAction ? { text: b.latestAction.text, date: b.latestAction.actionDate } : null,
    url: b.url ?? null,
  };
}

function summarizeMember(m: CongressMember) {
  return {
    name: m.name ?? (m.firstName && m.lastName ? `${m.firstName} ${m.lastName}` : null),
    party: m.partyName ?? m.party ?? null,
    state: m.state ?? null,
    chamber: m.chamber ?? null,
    district: m.district ?? null,
    bioguideId: m.bioguideId ?? null,
    startYear: m.startYear ?? null,
    endYear: m.endYear ?? null,
  };
}

function summarizeVote(v: CongressVoteSummary) {
  return {
    voteNumber: v.rollCallNumber ?? v.voteNumber ?? null,
    date: v.startDate ?? v.date ?? null,
    question: v.voteQuestion ?? v.question ?? null,
    result: v.result ?? null,
    voteType: v.voteType ?? null,
    legislation: v.legislationType && v.legislationNumber
      ? { type: v.legislationType, number: v.legislationNumber, url: v.legislationUrl }
      : v.bill ? { type: v.bill.type, number: v.bill.number, title: v.bill.title } : null,
  };
}

function summarizeLaw(l: CongressLaw) {
  return {
    type: l.type ?? null,
    number: l.number ?? null,
    title: l.title ?? null,
    signedDate: l.latestAction?.actionDate ?? null,
    url: l.url ?? null,
  };
}

function summarizeSponsoredBill(b: CongressSponsoredBill) {
  return {
    type: b.type ?? null,
    number: b.number ?? null,
    title: b.title ?? null,
    congress: b.congress ?? null,
    introducedDate: b.introducedDate ?? null,
    latestAction: b.latestAction ? { text: b.latestAction.text, date: b.latestAction.actionDate } : null,
  };
}

// ─── Tools ───────────────────────────────────────────────────────────

