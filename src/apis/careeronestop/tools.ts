/**
 * careeronestop MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchOccupations, getLicensing } from "./sdk.js";
import { listResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "cos_occupation_search",
    description:
      "Search occupations by keyword using the CareerOneStop API.\n" +
      "Returns matching occupations with O*NET codes, titles, and descriptions.\n" +
      "Use O*NET codes from results for more specific lookups.",
    annotations: { title: "CareerOneStop: Occupation Search", readOnlyHint: true },
    parameters: z.object({
      keyword: z.string().describe("Occupation keyword (e.g. 'software developer', 'nurse', 'electrician')"),
      location: z.string().optional().describe("Location code (default 'US'; use state code like 'TX' for state-specific)"),
    }),
    execute: async (args) => {
      const results = await searchOccupations(args.keyword, args.location);
      if (!results.length) return emptyResponse(`No occupations found matching '${args.keyword}'.`);
      return listResponse(
        `${results.length} occupation(s) matching '${args.keyword}'`,
        { items: results as Record<string, unknown>[] },
      );
    },
  },

  {
    name: "cos_licensing",
    description:
      "Look up licensing and certification requirements for an occupation by state.\n" +
      "Returns license names, types, issuing agencies, and application URLs.\n" +
      "Useful for understanding state-specific professional requirements.",
    annotations: { title: "CareerOneStop: Licensing", readOnlyHint: true },
    parameters: z.object({
      keyword: z.string().describe("Occupation keyword (e.g. 'nurse', 'electrician', 'real estate')"),
      state: z.string().describe("2-letter state code (e.g. 'TX', 'CA', 'NY')"),
    }),
    execute: async (args) => {
      const results = await getLicensing(args.keyword, args.state);
      if (!results.length) return emptyResponse(`No licensing requirements found for '${args.keyword}' in ${args.state}.`);
      return listResponse(
        `${results.length} license/certification requirement(s) for '${args.keyword}' in ${args.state}`,
        { items: results as Record<string, unknown>[] },
      );
    },
  },
];
