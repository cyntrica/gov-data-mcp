/**
 * fec module metadata.
 */

import { type FecCandidate, type FecCommittee, type FecFinancialTotals } from "./sdk.js";
// ─── Metadata (server.ts reads these) ────────────────────────────────

export const name = "fec";
export const displayName = "OpenFEC (Federal Election Commission)";
export const category = "Financial";
export const description = "Campaign finance: candidates, committees, contributions, expenditures";
export const auth = { envVar: "DATA_GOV_API_KEY", signup: "https://api.data.gov/signup/" };
export const workflow = "fec_search_candidates → fec_candidate_financials for PAC totals → fec_search_committees(committee_type='Q', name='Company Name') to find industry PACs → fec_committee_disbursements(committee_id, recipient_name='Politician Last Name') for direct money trail";
export const tips = "Office codes: 'H' (House), 'S' (Senate), 'P' (President). Party: 'DEM', 'REP', 'LIB', 'GRE'. To trace industry money to politicians: (1) search committees by company name with type Q to find PAC IDs, (2) query disbursements with recipient_name filter. Try multiple cycles. Common banking PACs: C00004275 (ABA), C00034595 (Wells Fargo), C00008474 (Citigroup), C00350744 (Goldman Sachs), C00364778 (Bank of America). Common pharma PACs: C00016683 (Pfizer), C00097485 (Merck).";

export const reference = {
  candidateStatus: {
    C: "Current candidate",
    F: "Future candidate",
    N: "Not yet a candidate",
    P: "Prior candidate",
  } as Record<string, string>,
  committeeTypes: {
    P: "Presidential",
    H: "House",
    S: "Senate",
    N: "PAC - Nonqualified",
    Q: "PAC - Qualified",
    X: "Party - Nonqualified",
    Y: "Party - Qualified",
    I: "Independent Expenditor",
    O: "Super PAC",
  } as Record<string, string>,
  officeNames: { H: "House", S: "Senate", P: "President" } as Record<string, string>,
  docs: {
    "Swagger": "https://api.open.fec.gov/swagger/",
    "Developers": "https://api.open.fec.gov/developers/",
    "Get Key": "https://api.open.fec.gov/developers/",
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────

const STATUS_MAP: Record<string, string> = reference.candidateStatus;

function summarizeCandidate(c: FecCandidate) {
  return {
    candidateId: c.candidate_id,
    name: c.name,
    party: c.party_full ?? c.party ?? null,
    office: c.office_full ?? c.office,
    state: c.state ?? null,
    district: c.district ?? null,
    electionYears: c.election_years ?? [],
    status: STATUS_MAP[c.candidate_status as string] ?? c.candidate_status ?? null,
    incumbency: c.incumbent_challenge_full ?? c.incumbent_challenge ?? null,
    hasRaisedFunds: c.has_raised_funds ?? null,
  };
}

function summarizeCommittee(c: FecCommittee) {
  return {
    committeeId: c.committee_id,
    name: c.name,
    type: c.committee_type_full ?? c.committee_type,
    party: c.party_full ?? c.party ?? null,
    state: c.state ?? null,
    designation: c.designation_full ?? c.designation ?? null,
    filingFrequency: c.filing_frequency ?? null,
  };
}

function summarizeFinancials(t: FecFinancialTotals) {
  return {
    cycle: t.cycle,
    receipts: t.receipts ?? 0,
    disbursements: t.disbursements ?? 0,
    cashOnHand: t.cash_on_hand_end_period ?? t.last_cash_on_hand_end_period ?? 0,
    debtOwed: t.debts_owed_by_committee ?? t.last_debts_owed_by_committee ?? 0,
    individualContributions: t.individual_contributions ?? 0,
    pacContributions: t.other_political_committee_contributions ?? 0,
    partyContributions: t.political_party_committee_contributions ?? 0,
    independentExpenditures: t.independent_expenditures ?? 0,
    coverageStart: t.coverage_start_date ?? null,
    coverageEnd: t.coverage_end_date ?? null,
  };
}

function fmtUsd(n: number): string {
  return `$${n.toLocaleString()}`;
}

// ─── Tools ───────────────────────────────────────────────────────────

