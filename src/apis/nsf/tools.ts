/**
 * nsf MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchAwards, getAwardDetail } from "./sdk.js";
import { tableResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "nsf_awards_search",
    description:
      "Search NSF research awards by keyword, principal investigator, institution, or program.\n" +
      "Returns award titles, PI names, institutions, funding amounts, and dates.",
    annotations: { title: "NSF: Search Awards", readOnlyHint: true },
    parameters: z.object({
      keyword: z.string().optional().describe("Search keyword (e.g. 'machine learning', 'climate change', 'quantum computing')"),
      piName: z.string().optional().describe("Principal investigator name (last name or 'last, first')"),
      institution: z.string().optional().describe("Awardee institution name (e.g. 'MIT', 'Stanford University')"),
      program: z.string().optional().describe("NSF fund program name (e.g. 'Computer and Information Science and Engineering')"),
      offset: z.number().int().min(0).optional().describe("Result offset for pagination (default 0)"),
      limit: z.number().int().min(1).max(100).optional().describe("Max results (default 25)"),
    }),
    execute: async ({ keyword, piName, institution, program, offset, limit }) => {
      const data = await searchAwards({ keyword, piName, institution, program, offset, limit });
      const awards = data.response?.award ?? [];
      if (!awards.length) return emptyResponse(`No NSF awards found${keyword ? ` for '${keyword}'` : ""}${institution ? ` at ${institution}` : ""}.`);

      return tableResponse(
        `NSF awards${keyword ? ` for '${keyword}'` : ""}${institution ? ` at ${institution}` : ""}: ${awards.length} results`,
        {
          rows: awards.map((a) => ({
            id: a.id,
            title: a.title,
            pi: a.piName,
            institution: a.awardeeName,
            funding: a.fundsObligatedAmt,
            startDate: a.startDate,
            endDate: a.expDate,
            abstract: a.abstractText ? (a.abstractText.length > 200 ? a.abstractText.slice(0, 200) + "..." : a.abstractText) : null,
          })),
          total: awards.length,
        },
      );
    },
  },

  {
    name: "nsf_award_detail",
    description:
      "Get full details of an NSF research award by award ID.\n" +
      "Returns title, PI info, institution, funding, abstract, program, and co-PIs.",
    annotations: { title: "NSF: Award Detail", readOnlyHint: true },
    parameters: z.object({
      awardId: z.string().describe("NSF award ID number (e.g. '2401234')"),
    }),
    execute: async ({ awardId }) => {
      const data = await getAwardDetail(awardId);
      const awards = data.response?.award ?? [];
      if (!awards.length) return emptyResponse(`NSF award '${awardId}' not found.`);

      const a = awards[0];
      return recordResponse(
        `NSF Award ${a.id}: ${a.title}`,
        {
          id: a.id,
          title: a.title,
          pi: a.piName,
          piEmail: a.piEmail,
          piPhone: a.piPhone,
          coPIs: a.coPDPI,
          institution: a.awardeeName,
          funding: a.fundsObligatedAmt,
          startDate: a.startDate,
          endDate: a.expDate,
          program: a.fundProgramName,
          abstract: a.abstractText,
        },
      );
    },
  },
];
