/**
 * sbir MCP tools — SBIR/STTR small business innovation research awards.
 *
 * Docs: https://www.sbir.gov/
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchAwards } from "./sdk.js";
import { listResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "sbir_awards_search",
    description:
      "Search SBIR/STTR small business innovation research awards.\n" +
      "Find government-funded R&D awards by keyword, agency, company, or year.\n" +
      "Covers all federal agencies that participate in SBIR/STTR programs.\n\n" +
      "Common agencies: DOD, NASA, NIH, NSF, DOE, USDA, EPA, DOT.\n\n" +
      "Example: keyword='quantum computing', agency='DOD', limit=10",
    annotations: { title: "SBIR: Award Search", readOnlyHint: true },
    parameters: z.object({
      keyword: z.string().optional().describe("Search keyword (e.g. 'artificial intelligence', 'cybersecurity')"),
      agency: z.string().optional().describe("Agency abbreviation (e.g. 'DOD', 'NASA', 'NIH', 'NSF', 'DOE')"),
      company: z.string().optional().describe("Company name to search"),
      year: z.number().int().optional().describe("Award year (e.g. 2024)"),
      limit: z.number().int().min(1).max(100).optional().describe("Number of results (default 20, max 100)"),
      offset: z.number().int().min(0).optional().describe("Offset for pagination (default 0)"),
    }),
    execute: async ({ keyword, agency, company, year, limit, offset }) => {
      const { awards, numFound } = await searchAwards({ keyword, agency, company, year, limit, offset });
      if (!awards.length) return emptyResponse("No SBIR/STTR awards found matching your criteria.");
      return listResponse(
        `SBIR/STTR awards: ${awards.length} of ${numFound} total`,
        {
          total: numFound,
          items: awards.map(a => ({
            company: a.company,
            title: a.award_title,
            agency: a.agency,
            branch: a.branch,
            phase: a.phase,
            program: a.program,
            year: a.award_year,
            amount: a.award_amount,
            abstract: a.abstract?.substring(0, 300),
            city: a.city,
            state: a.state,
          })),
        },
      );
    },
  },
];
