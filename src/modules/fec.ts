/**
 * FEC MCP module — tools + metadata. Delegates all API calls to sdk/fec.
 *
 * Tools return raw JSON data — no markdown formatting. The client decides how to present it.
 */

import { z } from "zod";
import type { Tool, InputPrompt } from "fastmcp";
import {
  searchCandidates,
  searchCommittees,
  getCandidateFinancials,
  getCommitteeFinancials,
  getTopCandidates,
  getCommitteeDisbursements,
  type FecCandidate,
  type FecCommittee,
  type FecFinancialTotals,
} from "../sdk/fec.js";

// ─── Metadata (server.ts reads these) ────────────────────────────────

export const name = "fec";
export const displayName = "OpenFEC (Federal Election Commission)";
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

export const tools: Tool<any, any>[] = [
  {
    name: "fec_search_candidates",
    description:
      "Search for federal election candidates by name, state, party, office, or election year. " +
      "Data from the Federal Election Commission (FEC).",
    annotations: { title: "FEC: Search Candidates", readOnlyHint: true },
    parameters: z.object({
      name: z.string().optional().describe("Candidate name to search for"),
      state: z.string().optional().describe("Two-letter state code, e.g. 'CA', 'TX', 'NY'"),
      party: z.string().optional().describe("Three-letter party code: 'DEM', 'REP', 'LIB', 'GRE', etc."),
      office: z.enum(["H", "S", "P"]).optional().describe("Office: H=House, S=Senate, P=President"),
      election_year: z.number().optional().describe("Election year, e.g. 2024"),
      page: z.number().int().positive().optional().describe("Page number (default: 1)"),
      per_page: z.number().int().positive().max(100).optional().describe("Results per page (default: 20, max: 100)"),
    }),
    execute: async ({ name: candidateName, state, party, office, election_year, page, per_page }) => {
      const data = await searchCandidates({
        name: candidateName, state, party, office, election_year, page, per_page,
      });
      const results = data.results ?? [];
      const pag = data.pagination ?? { page: 1, pages: 0, count: 0, per_page: 20 };
      if (!results.length) return JSON.stringify({ summary: "No candidates found.", pagination: pag, candidates: [] });
      return JSON.stringify({
        summary: `Candidate search: page ${pag.page} of ${pag.pages} (${pag.count} total)`,
        pagination: pag,
        candidates: results.map(summarizeCandidate),
      });
    },
  },

  {
    name: "fec_search_committees",
    description:
      "Search for political committees (PACs, campaign committees, party committees) by name, state, or type.\n" +
      "CRITICAL for investigations: Use committee_type='Q' (Qualified PAC) + name='Company Name' to find corporate PAC IDs.\n" +
      "Example: name='Wells Fargo', committee_type='Q' returns C00034595 (Wells Fargo Employee PAC).\n" +
      "Then use fec_committee_disbursements with the committee_id to trace money to specific politicians.",
    annotations: { title: "FEC: Search Committees", readOnlyHint: true },
    parameters: z.object({
      name: z.string().optional().describe("Committee name to search for"),
      state: z.string().optional().describe("Two-letter state code"),
      committee_type: z.string().optional().describe(
        "Committee type: 'P' (Presidential), 'H' (House), 'S' (Senate), " +
        "'N' (PAC - Nonqualified), 'Q' (PAC - Qualified), 'X' (Party - Nonqualified), " +
        "'Y' (Party - Qualified), 'I' (Independent Expenditor), 'O' (Super PAC)"
      ),
      cycle: z.number().optional().describe("Two-year election cycle, e.g. 2024"),
      page: z.number().int().positive().optional().describe("Page number (default: 1)"),
      per_page: z.number().int().positive().max(100).optional().describe("Results per page (default: 20)"),
    }),
    execute: async ({ name: committeeName, state, committee_type, cycle, page, per_page }) => {
      const data = await searchCommittees({
        name: committeeName, state, committee_type, cycle, page, per_page,
      });
      const results = data.results ?? [];
      const pag = data.pagination ?? { page: 1, pages: 0, count: 0, per_page: 20 };
      if (!results.length) return JSON.stringify({ summary: "No committees found.", pagination: pag, committees: [] });
      return JSON.stringify({
        summary: `Committee search: page ${pag.page} of ${pag.pages} (${pag.count} total)`,
        pagination: pag,
        committees: results.map(summarizeCommittee),
      });
    },
  },

  {
    name: "fec_candidate_financials",
    description:
      "Get financial summary for a candidate — total raised, spent, cash on hand, debt. " +
      "Requires a candidate_id (use fec_search_candidates to find one).",
    annotations: { title: "FEC: Candidate Financials", readOnlyHint: true },
    parameters: z.object({
      candidate_id: z.string().describe("FEC candidate ID, e.g. 'P80001571' (Trump), 'P80000722' (Harris)"),
      cycle: z.number().optional().describe("Two-year election cycle, e.g. 2024"),
    }),
    execute: async ({ candidate_id, cycle }) => {
      const results = await getCandidateFinancials(candidate_id, cycle);
      if (!results.length) return JSON.stringify({ summary: `No financial data for candidate ${candidate_id}.`, candidateId: candidate_id, cycles: [] });
      const latest = results[0];
      return JSON.stringify({
        summary: `${candidate_id}: ${results.length} cycle(s), latest receipts ${fmtUsd(latest.receipts ?? 0)}`,
        candidateId: candidate_id,
        cycles: results.map(summarizeFinancials),
      });
    },
  },

  {
    name: "fec_committee_financials",
    description:
      "Get financial totals for a committee (PAC, campaign, party). " +
      "Requires a committee_id (use fec_search_committees to find one).",
    annotations: { title: "FEC: Committee Financials", readOnlyHint: true },
    parameters: z.object({
      committee_id: z.string().describe("FEC committee ID, e.g. 'C00703975'"),
      cycle: z.number().optional().describe("Two-year election cycle, e.g. 2024"),
    }),
    execute: async ({ committee_id, cycle }) => {
      const results = await getCommitteeFinancials(committee_id, cycle);
      if (!results.length) return JSON.stringify({ summary: `No financial data for committee ${committee_id}.`, committeeId: committee_id, cycles: [] });
      const latest = results[0];
      return JSON.stringify({
        summary: `${committee_id}: ${results.length} cycle(s), latest receipts ${fmtUsd(latest.receipts ?? 0)}`,
        committeeId: committee_id,
        cycles: results.map(summarizeFinancials),
      });
    },
  },

  {
    name: "fec_top_candidates",
    description:
      "Get top candidates ranked by total money raised for a given office and election cycle.",
    annotations: { title: "FEC: Top Candidates by Fundraising", readOnlyHint: true },
    parameters: z.object({
      office: z.enum(["H", "S", "P"]).describe("Office: H=House, S=Senate, P=President"),
      election_year: z.number().describe("Election year, e.g. 2024"),
      state: z.string().optional().describe("Two-letter state code to filter by"),
      per_page: z.number().int().positive().max(50).optional().describe("Number of results (default: 20)"),
    }),
    execute: async ({ office, election_year, state, per_page }) => {
      const officeNames: Record<string, string> = { H: "House", S: "Senate", P: "President" };
      const data = await getTopCandidates({ office, election_year, state, per_page });
      const results = data.results ?? [];
      if (!results.length) return JSON.stringify({ summary: "No results found.", office: officeNames[office] ?? office, electionYear: election_year, candidates: [] });
      return JSON.stringify({
        summary: `Top ${officeNames[office] ?? office} candidates by fundraising (${election_year}): ${results.length} results${state ? `, state: ${state}` : ""}`,
        office: officeNames[office] ?? office,
        electionYear: election_year,
        state: state ?? null,
        candidates: results.map(c => ({
          name: c.name ?? null,
          candidateId: c.candidate_id ?? null,
          party: c.party_full ?? c.party ?? null,
          state: c.state ?? null,
          receipts: c.receipts ?? 0,
          disbursements: c.disbursements ?? 0,
          cashOnHand: c.cash_on_hand_end_period ?? 0,
        })),
      });
    },
  },

  {
    name: "fec_committee_disbursements",
    description:
      "Get itemized disbursements from a PAC or committee — shows exactly which candidates and committees received money, how much, and when.\n" +
      "This is the KEY tool for conflict-of-interest investigations: trace direct money from named industry PACs to named politicians.\n" +
      "Example: fec_committee_disbursements(committee_id='C00004275', cycle=2018, recipient_name='Crapo') shows ABA BankPAC donations to Sen. Crapo.\n" +
      "WORKFLOW: (1) fec_search_committees(name='Company', committee_type='Q') to find PAC ID, (2) this tool with recipient_name filter.\n" +
      "Try multiple cycles (election year ± 1 cycle) since PACs often give early.\n" +
      "Common PAC IDs: ABA BankPAC=C00004275, Wells Fargo=C00034595, Citigroup=C00008474, Goldman Sachs=C00350744, Pfizer=C00016683, Merck=C00097485.",
    annotations: { title: "FEC: Committee Disbursements", readOnlyHint: true },
    parameters: z.object({
      committee_id: z.string().describe("FEC committee ID (e.g. 'C00016683' for Pfizer PAC). Get from fec_search_committees."),
      cycle: z.number().int().optional().describe("Election cycle year (e.g. 2024, 2026). Must be even year."),
      recipient_name: z.string().optional().describe("Filter to specific recipient: 'Pelosi', 'McConnell', 'NRCC', 'DSCC'"),
      per_page: z.number().int().max(100).optional().describe("Results per page (default 20)"),
    }),
    execute: async ({ committee_id, cycle, recipient_name, per_page }) => {
      const data = await getCommitteeDisbursements({ committee_id, cycle, recipient_name, per_page });
      const results = data.results ?? [];
      if (!results.length) return `No disbursements found for committee ${committee_id}.`;

      return JSON.stringify({
        summary: `Disbursements from ${results[0]?.committee?.name ?? committee_id}: ${data.pagination.count} total, showing ${results.length}`,
        totalDisbursements: data.pagination.count,
        committeeId: committee_id,
        committeeName: results[0]?.committee?.name ?? null,
        disbursements: results.map(d => ({
          recipient: d.recipient_name,
          recipientCommittee: d.recipient_committee?.name ?? null,
          recipientParty: d.recipient_committee?.party ?? null,
          amount: d.disbursement_amount,
          date: d.disbursement_date,
          description: d.disbursement_description,
          recipientState: d.recipient_state,
          memo: d.memo_text,
        })),
      });
    },
  },
];

export const prompts: InputPrompt<any, any>[] = [
  {
    name: "campaign_finance_summary",
    description: "Overview of fundraising in the current election cycle with connections to voting records and lobbying.",
    load: async () =>
      "Build a campaign finance overview for the current cycle:\n\n" +
      "== FUNDRAISING ==\n" +
      "1. Use fec_top_candidates for office 'P' (Presidential) — top fundraisers\n" +
      "2. Use fec_top_candidates for office 'S' (Senate) — top fundraisers\n" +
      "3. Use fec_top_candidates for office 'H' (House) — top fundraisers\n\n" +
      "== CROSS-SOURCE CONNECTIONS ==\n" +
      "4. For top incumbents, use congress_member_bills to see what they've sponsored\n" +
      "5. Use congress_house_votes or congress_senate_votes to find key votes by these members\n" +
      "6. Use lobbying_contributions to check lobbyist donations to top fundraisers\n" +
      "7. Use lobbying_search to find which industries lobby these candidates\n\n" +
      "Show total raised, spent, cash on hand, and debt. Note party breakdown. " +
      "Highlight any connections between top donors/lobbying activity and the member's voting record or sponsored bills.",
  },
];

// ─── Re-export cache control from SDK ────────────────────────────────

export { clearCache } from "../sdk/fec.js";
