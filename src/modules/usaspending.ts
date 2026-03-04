/**
 * USAspending MCP module — tools + metadata. Delegates all API calls to sdk/usaspending.
 *
 * Tools return raw JSON data — no markdown formatting. The client decides how to present it.
 */

import { z } from "zod";
import type { Tool, InputPrompt } from "fastmcp";
import {
  searchAwards,
  spendingByAgency,
  spendingByState,
  topRecipients,
  spendingOverTime,
  agencyOverview,
  currentFiscalYear,
  awardTypes,
  agencyCodes,
} from "../sdk/usaspending.js";

// ─── Metadata (server.ts reads these) ────────────────────────────────

export const name = "usaspending";
export const displayName = "USAspending";
export const description = "Federal contracts, grants, loans, direct payments — who got the money and where";
export const workflow = "search awards by keyword/agency/state → drill into recipients or trends";
export const tips = "No API key required. Data updates nightly. Earliest data: FY2008 (2007-10-01).";

export const reference = {
  awardTypes,
  agencyCodes,
};

// ─── Tools ───────────────────────────────────────────────────────────

export const tools: Tool<any, any>[] = [
  {
    name: "usa_spending_by_award",
    description:
      "Search federal spending awards (contracts, grants, loans, direct payments). " +
      "Filter by keyword, agency, recipient, date range, award type, and amount.\n\n" +
      "Award type groups: 'contracts', 'grants', 'loans', 'direct_payments'. " +
      "Or use codes: 'A,B,C,D' (contracts), '02,03,04,05' (grants), '07,08' (loans), '06,10' (direct payments)",
    annotations: { title: "USAspending: Search Awards", readOnlyHint: true },
    parameters: z.object({
      keyword: z.string().optional().describe("Keyword to search across award descriptions and recipient names"),
      award_type: z.enum(["contracts", "grants", "loans", "direct_payments"]).optional().describe("Award type filter"),
      agency: z.string().optional().describe("Awarding agency name, e.g. 'Department of Defense'"),
      recipient: z.string().optional().describe("Recipient/company name to search for"),
      state: z.string().optional().describe("Two-letter state code, e.g. 'CA', 'TX'"),
      start_date: z.string().optional().describe("Start date YYYY-MM-DD (default: current FY). Earliest: 2007-10-01"),
      end_date: z.string().optional().describe("End date YYYY-MM-DD (default: today)"),
      min_amount: z.number().optional().describe("Minimum award amount in dollars"),
      max_amount: z.number().optional().describe("Maximum award amount in dollars"),
      limit: z.number().int().positive().max(100).optional().describe("Results per page (default: 25)"),
      page: z.number().int().positive().optional().describe("Page number (default: 1)"),
      sort_field: z.string().optional().describe("Sort by: 'Award Amount' (default), 'Recipient Name', 'Start Date', 'End Date'"),
    }),
    execute: async ({ keyword, award_type, agency, recipient, state, start_date, end_date, min_amount, max_amount, limit, page, sort_field }) => {
      const data = await searchAwards({
        keyword, awardType: award_type, agency, recipient, state,
        startDate: start_date, endDate: end_date,
        minAmount: min_amount, maxAmount: max_amount,
        limit, page, sortField: sort_field,
      });
      if (!data.awards.length) return JSON.stringify({ summary: "No awards found matching the criteria.", total: 0, awards: [] });
      return JSON.stringify({
        summary: `USAspending award search: ${data.total} total results, showing ${data.awards.length}`,
        totalResults: data.total,
        showing: data.awards.length,
        awards: data.awards,
      });
    },
  },

  {
    name: "usa_spending_by_agency",
    description:
      "Get total federal spending broken down by awarding agency. " +
      "Shows which agencies are spending the most.",
    annotations: { title: "USAspending: Spending by Agency", readOnlyHint: true },
    parameters: z.object({
      fiscal_year: z.number().int().optional().describe("Fiscal year (default: current)"),
      state: z.string().optional().describe("Two-letter state code, e.g. 'CA', 'TX'"),
      keyword: z.string().optional().describe("Keyword to filter spending"),
      award_type: z.enum(["contracts", "grants", "loans", "direct_payments"]).optional().describe("Award type filter"),
      limit: z.number().int().positive().max(100).optional().describe("Number of agencies (default: 20)"),
    }),
    execute: async ({ fiscal_year, state, keyword, award_type, limit }) => {
      const fy = fiscal_year || currentFiscalYear();
      const agencies = await spendingByAgency({ fiscalYear: fy, state, keyword, awardType: award_type, limit });
      if (!agencies.length) return JSON.stringify({ summary: `No spending data found for FY ${fy}.`, fiscalYear: fy, agencies: [] });
      return JSON.stringify({
        summary: `Federal spending by agency FY ${fy}: ${agencies.length} agencies`,
        fiscalYear: fy,
        agencies,
      });
    },
  },

  {
    name: "usa_spending_by_state",
    description:
      "Get federal spending by state or territory. Shows total awards and per-capita spending.",
    annotations: { title: "USAspending: Spending by State", readOnlyHint: true },
    parameters: z.object({
      state: z.string().optional().describe("Two-letter state code (e.g. 'CA'). Omit for all states."),
      fiscal_year: z.number().int().optional().describe("Fiscal year (default: most recent)"),
    }),
    execute: async ({ state, fiscal_year }) => {
      const result = await spendingByState({ state, fiscalYear: fiscal_year });

      if ("detail" in result) {
        const d = result.detail;
        return JSON.stringify({
          summary: `Federal spending: ${d.name || state} — $${d.totalAwards.toLocaleString()} total, $${d.perCapita.toLocaleString()} per capita`,
          ...d,
        });
      }

      const fy = fiscal_year || currentFiscalYear();
      return JSON.stringify({
        summary: `Federal spending by state FY ${fy}: ${result.states.length} states`,
        fiscalYear: fy,
        states: result.states,
      });
    },
  },

  {
    name: "usa_spending_by_recipient",
    description:
      "Get the top recipients (companies, organizations) of federal spending. " +
      "Use state and agency filters to narrow results.",
    annotations: { title: "USAspending: Top Recipients", readOnlyHint: true },
    parameters: z.object({
      fiscal_year: z.number().int().optional().describe("Fiscal year (default: current)"),
      award_type: z.enum(["contracts", "grants", "loans", "direct_payments"]).optional().describe("Award type filter"),
      state: z.string().optional().describe("Two-letter state code, e.g. 'CA', 'TX'"),
      agency: z.string().optional().describe("Awarding agency name, e.g. 'Department of Energy'"),
      limit: z.number().int().positive().max(100).optional().describe("Number of recipients (default: 25)"),
    }),
    execute: async ({ fiscal_year, award_type, state, agency, limit }) => {
      const fy = fiscal_year || currentFiscalYear();
      const recipients = await topRecipients({ fiscalYear: fy, awardType: award_type, state, agency, limit });
      const typeLabel = award_type ? ` (${award_type})` : "";
      if (!recipients.length) return JSON.stringify({ summary: `No recipient data for FY ${fy}${typeLabel}.`, fiscalYear: fy, recipients: [] });
      return JSON.stringify({
        summary: `Top federal spending recipients${typeLabel} FY ${fy}: ${recipients.length} recipients`,
        fiscalYear: fy,
        awardType: award_type || null,
        recipients,
      });
    },
  },

  {
    name: "usa_spending_over_time",
    description:
      "Get federal spending aggregated by time period (monthly, quarterly, or fiscal year). " +
      "Useful for identifying trends.",
    annotations: { title: "USAspending: Spending Over Time", readOnlyHint: true },
    parameters: z.object({
      group: z.enum(["month", "quarter", "fiscal_year"]).optional().describe("Time grouping (default: month)"),
      start_date: z.string().optional().describe("Start date YYYY-MM-DD (default: 3 years ago)"),
      end_date: z.string().optional().describe("End date YYYY-MM-DD (default: today)"),
      agency: z.string().optional().describe("Filter to specific agency name"),
      award_type: z.enum(["contracts", "grants", "loans", "direct_payments"]).optional().describe("Award type filter"),
      state: z.string().optional().describe("Two-letter state code, e.g. 'CA', 'TX'"),
      keyword: z.string().optional().describe("Keyword to filter spending"),
    }),
    execute: async ({ group, start_date, end_date, agency, award_type, state, keyword }) => {
      const periods = await spendingOverTime({
        group, startDate: start_date, endDate: end_date,
        agency, awardType: award_type, state, keyword,
      });
      if (!periods.length) return JSON.stringify({ summary: "No spending data found for the given period.", periods: [] });
      return JSON.stringify({
        summary: `Federal spending over time: ${periods.length} periods, grouped by ${group || "month"}`,
        group: group || "month",
        periods,
      });
    },
  },

  {
    name: "usa_agency_overview",
    description:
      "Get an overview of a federal agency's spending, including budgetary resources and obligations.\n\n" +
      "Common codes: '097' (DOD), '075' (HHS), '069' (Treasury), '089' (DOE), " +
      "'012' (USDA), '015' (Justice), '036' (VA), '070' (DHS), '080' (NASA)",
    annotations: { title: "USAspending: Agency Overview", readOnlyHint: true },
    parameters: z.object({
      agency_code: z.string().describe(
        "Toptier agency code. Common: '097' (DOD), '075' (HHS), '069' (Treasury), " +
        "'089' (DOE), '036' (VA), '070' (DHS), '080' (NASA), '091' (Education), '016' (Labor)",
      ),
      fiscal_year: z.number().int().optional().describe("Fiscal year (default: current)"),
    }),
    execute: async ({ agency_code, fiscal_year }) => {
      const data = await agencyOverview(agency_code, fiscal_year);
      return JSON.stringify({
        summary: `Agency: ${data.name || agency_code} — FY ${data.fiscalYear}`,
        ...data,
      });
    },
  },
];

// ─── Re-export cache control from SDK ────────────────────────────────

export { clearCache } from "../sdk/usaspending.js";

// ─── Prompts (FastMCP InputPrompt type) ──────────────────────────────

export const prompts: InputPrompt<any, any>[] = [
  {
    name: "federal_spending_overview",
    description: "Comprehensive overview of federal spending with connections to authorizing legislation and votes.",
    load: async () =>
      "Give me a comprehensive overview of federal spending using USAspending data.\n\n" +
      "== SPENDING DATA ==\n" +
      "1. **Top spending agencies** — use usa_spending_by_agency with limit=15\n" +
      "2. **Top recipients** — use usa_spending_by_recipient for contracts, limit=15\n" +
      "3. **Top states by spending** — use usa_spending_by_state\n" +
      "4. **Spending trend** — use usa_spending_over_time with group=quarter for the last 2 years\n\n" +
      "== LEGISLATIVE AUTHORIZATION ==\n" +
      "5. Use congress_search_bills for 'appropriations' in the current congress to find the authorizing legislation\n" +
      "6. Use congress_house_votes and congress_senate_votes to show how each party voted on the appropriations\n\n" +
      "== CONTEXT ==\n" +
      "7. Use census_population to calculate per-capita spending by state\n" +
      "8. Use lobbying_search for top-spending agencies to find who lobbied for these programs\n\n" +
      "Summarize the key findings: which agencies spend the most, which companies receive the most, " +
      "which states get the most per capita, how each party voted on the budget, and whether spending is trending up or down.",
  },
];
