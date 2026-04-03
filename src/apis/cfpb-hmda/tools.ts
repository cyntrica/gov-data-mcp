/**
 * cfpb-hmda MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import {
  getNationwideAggregations,
  getFilteredAggregations,
  getFilers,
  calculateRateSpread,
  generateCheckDigit,
  validateUli,
} from "./sdk.js";
import { tableResponse, listResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "hmda_nationwide_aggregations",
    description:
      "Get nationwide mortgage lending aggregation data from HMDA.\n" +
      "Shows aggregate mortgage statistics across the entire U.S. for a given year.\n" +
      "Filter by demographics (race, ethnicity, sex), loan characteristics, and actions taken.\n" +
      "Useful for analyzing national mortgage lending trends and fair lending patterns.",
    annotations: { title: "HMDA: Nationwide Aggregations", readOnlyHint: true },
    parameters: z.object({
      year: z.number().int().describe("Filing year (e.g. 2022). Required."),
      actions_taken: z.string().optional().describe("Action taken codes (comma-separated): 1=originated, 2=approved not accepted, 3=denied, etc."),
      loan_types: z.string().optional().describe("Loan type codes (comma-separated): 1=conventional, 2=FHA, 3=VA, 4=USDA"),
      races: z.string().optional().describe("Race filter (comma-separated): 'White', 'Asian', 'Black or African American', etc."),
      sexes: z.string().optional().describe("Sex filter (comma-separated): 'Male', 'Female', 'Joint'"),
    }),
    execute: async (args) => {
      const data = await getNationwideAggregations(args);
      if (!data) return emptyResponse("No nationwide HMDA aggregation data found.");
      const agg = data as Record<string, unknown>;
      const rows = (agg.aggregations ?? agg.results ?? (Array.isArray(data) ? data : null)) as Record<string, unknown>[] | null;
      if (Array.isArray(rows) && rows.length) {
        return tableResponse(
          `HMDA nationwide aggregations for ${args.year}: ${rows.length} rows`,
          { rows },
        );
      }
      return tableResponse(`HMDA nationwide aggregations for ${args.year}`, { rows: [agg] });
    },
  },

  {
    name: "hmda_filtered_aggregations",
    description:
      "Get mortgage lending aggregation data filtered by geography or institution.\n" +
      "Filter by state (FIPS code), MSA/MD, county, or institution (LEI).\n" +
      "Same demographic filters as nationwide. At least one geographic or institution filter recommended.",
    annotations: { title: "HMDA: Filtered Aggregations", readOnlyHint: true },
    parameters: z.object({
      year: z.number().int().describe("Filing year (e.g. 2022). Required."),
      states: z.string().optional().describe("State FIPS codes (comma-separated): '06' (CA), '36' (NY), '48' (TX)"),
      msamds: z.string().optional().describe("MSA/MD codes (comma-separated)"),
      leis: z.string().optional().describe("Legal Entity Identifiers (comma-separated) to filter by institution"),
      actions_taken: z.string().optional().describe("Action taken codes (comma-separated)"),
      loan_types: z.string().optional().describe("Loan type codes (comma-separated)"),
      races: z.string().optional().describe("Race filter (comma-separated)"),
      sexes: z.string().optional().describe("Sex filter (comma-separated)"),
    }),
    execute: async (args) => {
      const data = await getFilteredAggregations(args);
      if (!data) return emptyResponse("No filtered HMDA aggregation data found.");
      const agg = data as Record<string, unknown>;
      const rows = (agg.aggregations ?? agg.results ?? (Array.isArray(data) ? data : null)) as Record<string, unknown>[] | null;
      if (Array.isArray(rows) && rows.length) {
        return tableResponse(
          `HMDA filtered aggregations for ${args.year}: ${rows.length} rows`,
          { rows },
        );
      }
      return tableResponse(`HMDA filtered aggregations for ${args.year}`, { rows: [agg] });
    },
  },

  {
    name: "hmda_filers",
    description:
      "List financial institutions that filed HMDA data for a given year.\n" +
      "Returns institution names, LEIs, and filing details.\n" +
      "Use to find LEIs for filtering aggregation queries by institution.",
    annotations: { title: "HMDA: List Filers", readOnlyHint: true },
    parameters: z.object({
      year: z.number().int().describe("Filing year (e.g. 2022). Required."),
    }),
    execute: async ({ year }) => {
      const data = await getFilers(year);
      if (!data) return emptyResponse(`No HMDA filers found for ${year}.`);
      const result = data as Record<string, unknown>;
      const filers = (result.institutions ?? result.filers ?? (Array.isArray(data) ? data : null)) as Record<string, unknown>[] | null;
      if (Array.isArray(filers) && filers.length) {
        return listResponse(
          `HMDA filers for ${year}: ${filers.length} institutions`,
          { items: filers, total: filers.length },
        );
      }
      return listResponse(`HMDA filers for ${year}`, { items: [result] });
    },
  },

  {
    name: "hmda_rate_spread",
    description:
      "Calculate the rate spread for a mortgage loan using the CFPB rate spread calculator.\n" +
      "Rate spread = difference between the loan APR and the average prime offer rate (APOR).\n" +
      "Used for HMDA reporting and fair lending analysis.",
    annotations: { title: "HMDA: Rate Spread Calculator", readOnlyHint: true },
    parameters: z.object({
      action_taken_type: z.number().int().min(1).max(8).describe("Action taken type (1=originated, 2=approved not accepted, etc.)"),
      loan_term: z.string().describe("Loan term in months (e.g. '360' for 30-year)"),
      amortization_type: z.enum(["FixedRate", "VariableRate"]).describe("Amortization type"),
      apr: z.string().describe("Annual percentage rate (e.g. '6.0')"),
      lock_in_date: z.string().describe("Rate lock-in date in MM/DD/YYYY format (e.g. '01/15/2023')"),
      reverse_mortgage: z.number().int().min(1).max(2).describe("Reverse mortgage flag (1=yes, 2=no)"),
    }),
    execute: async (args) => {
      const data = await calculateRateSpread({
        actionTakenType: args.action_taken_type,
        loanTerm: args.loan_term,
        amortizationType: args.amortization_type,
        apr: args.apr,
        lockInDate: args.lock_in_date,
        reverseMortgage: args.reverse_mortgage,
      });
      if (!data) return emptyResponse("Rate spread calculation returned no result.");
      return recordResponse("HMDA rate spread calculation", data as Record<string, unknown>);
    },
  },

  {
    name: "hmda_check_digit",
    description:
      "Generate a ULI (Universal Loan Identifier) check digit from a loan ID.\n" +
      "Appends the two-digit check digit to create a valid ULI.\n" +
      "Used for HMDA reporting compliance.",
    annotations: { title: "HMDA: Generate ULI Check Digit", readOnlyHint: true },
    parameters: z.object({
      loan_id: z.string().describe("Loan ID (LEI + institution-assigned loan identifier, without check digit)"),
    }),
    execute: async ({ loan_id }) => {
      const data = await generateCheckDigit(loan_id);
      if (!data) return emptyResponse("Check digit generation returned no result.");
      return recordResponse("HMDA ULI check digit", data as Record<string, unknown>);
    },
  },

  {
    name: "hmda_validate_uli",
    description:
      "Validate a Universal Loan Identifier (ULI) by verifying its check digit.\n" +
      "Returns whether the ULI is valid or invalid.\n" +
      "Used for HMDA reporting compliance verification.",
    annotations: { title: "HMDA: Validate ULI", readOnlyHint: true },
    parameters: z.object({
      uli: z.string().describe("Full ULI to validate (loan ID + 2-digit check digit)"),
    }),
    execute: async ({ uli }) => {
      const data = await validateUli(uli);
      if (!data) return emptyResponse("ULI validation returned no result.");
      return recordResponse("HMDA ULI validation", data as Record<string, unknown>);
    },
  },
];
