/**
 * FollowTheMoney MCP tools — state campaign finance contributions.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchContributions } from "./sdk.js";
import { tableResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "ftm_contributions",
    description:
      "Search state-level campaign finance contributions by candidate, donor, state, and year.\nCovers all 50 states via the National Institute on Money in Politics.",
    annotations: { title: "FTM: State Campaign Contributions", readOnlyHint: true },
    parameters: z.object({
      state: z.string().optional().describe("State abbreviation (e.g. 'CA', 'NY', 'TX')"),
      candidateId: z.string().optional().describe("Candidate entity ID"),
      donorId: z.string().optional().describe("Donor entity ID"),
      year: z.number().int().optional().describe("Election year (e.g. 2024)"),
      limit: z.number().int().max(200).optional().describe("Max results (default 50)"),
    }),
    execute: async (opts) => {
      const records = await searchContributions(opts);
      if (!records.length) return emptyResponse("No campaign contribution records found for the given criteria.");
      return tableResponse(
        `FollowTheMoney: ${records.length} contribution records`,
        { rows: records },
      );
    },
  },
];
