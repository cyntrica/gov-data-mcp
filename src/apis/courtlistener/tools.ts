/**
 * courtlistener MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchOpinions, getOpinion } from "./sdk.js";
import { listResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "courtlistener_search",
    description:
      "Search case law opinions across federal and state courts.\n" +
      "Find opinions by keyword, court, or date range.\n" +
      "Court codes: 'scotus' (Supreme Court), 'ca1'-'ca11' (Circuit Courts), 'cadc' (DC Circuit), 'cafc' (Federal Circuit).\n" +
      "Returns opinion metadata including case name, court, date filed, and citation.",
    annotations: { title: "CourtListener: Search Opinions", readOnlyHint: true },
    parameters: z.object({
      query: z.string().optional().describe("Search keywords: 'first amendment', 'qualified immunity', 'antitrust'"),
      court: z.string().optional().describe("Court code: 'scotus', 'ca1', 'ca9', 'cadc', 'cafc'"),
      filed_after: z.string().optional().describe("Filed after date (YYYY-MM-DD)"),
      filed_before: z.string().optional().describe("Filed before date (YYYY-MM-DD)"),
      limit: z.number().int().max(20).optional().describe("Results per page (default 20, max 20)"),
    }),
    execute: async (args) => {
      const data = await searchOpinions(args);
      const results = data.results ?? [];
      if (!results.length) return emptyResponse("No opinions found matching the search criteria.");
      return listResponse(
        `CourtListener opinions: ${data.count} total matches, showing ${results.length}`,
        { items: results, total: data.count },
      );
    },
  },

  {
    name: "courtlistener_opinion",
    description:
      "Get the full text of a court opinion by its CourtListener ID.\n" +
      "Returns the complete opinion text, case name, court, date filed, and citations.",
    annotations: { title: "CourtListener: Opinion Detail", readOnlyHint: true },
    parameters: z.object({
      id: z.number().int().describe("CourtListener opinion ID (from search results)"),
    }),
    execute: async ({ id }) => {
      const data = await getOpinion(id);
      if (!data) return emptyResponse(`No opinion found with ID: ${id}`);
      return recordResponse(
        `Opinion #${id}: ${(data as any).case_name ?? "Unknown case"}`,
        data,
      );
    },
  },
];
