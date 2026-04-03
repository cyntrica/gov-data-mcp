/**
 * OpenSecrets MCP tools — federal campaign finance analysis.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getCandidateSummary, getTopContributors, getIndustryTotals } from "./sdk.js";
import { recordResponse, tableResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "os_candidate_summary",
    description:
      "Get a candidate's fundraising summary — total raised, spent, cash on hand, debt.\nRequires OpenSecrets CID (e.g. N00007360).",
    annotations: { title: "OpenSecrets: Candidate Summary", readOnlyHint: true },
    parameters: z.object({
      cid: z.string().describe("OpenSecrets candidate ID (e.g. 'N00007360')"),
      cycle: z.number().int().optional().describe("Election cycle year (even year, e.g. 2024)"),
    }),
    execute: async ({ cid, cycle }) => {
      const summary = await getCandidateSummary(cid, cycle);
      if (!summary) return emptyResponse(`No candidate summary found for CID "${cid}".`);
      return recordResponse(
        `${summary.cand_name} (${summary.party}-${summary.state}): $${summary.total} raised, cycle ${summary.cycle}`,
        summary,
      );
    },
  },

  {
    name: "os_top_contributors",
    description:
      "Get top contributors (organizations) to a candidate.\nShows PAC and individual contributions by organization.",
    annotations: { title: "OpenSecrets: Top Contributors", readOnlyHint: true },
    parameters: z.object({
      cid: z.string().describe("OpenSecrets candidate ID (e.g. 'N00007360')"),
      cycle: z.number().int().optional().describe("Election cycle year (even year, e.g. 2024)"),
    }),
    execute: async ({ cid, cycle }) => {
      const contributors = await getTopContributors(cid, cycle);
      if (!contributors.length) return emptyResponse(`No contributors found for CID "${cid}".`);
      return tableResponse(
        `OpenSecrets: ${contributors.length} top contributors for ${cid}`,
        {
          rows: contributors,
          columns: ["org_name", "total", "pacs", "indivs"],
        },
      );
    },
  },

  {
    name: "os_industry_totals",
    description:
      "Get industry contribution totals for a candidate.\nShows how much each industry sector contributed via PACs and individuals.",
    annotations: { title: "OpenSecrets: Industry Totals", readOnlyHint: true },
    parameters: z.object({
      cid: z.string().describe("OpenSecrets candidate ID (e.g. 'N00007360')"),
      cycle: z.number().int().optional().describe("Election cycle year (even year, e.g. 2024)"),
    }),
    execute: async ({ cid, cycle }) => {
      const industries = await getIndustryTotals(cid, cycle);
      if (!industries.length) return emptyResponse(`No industry data found for CID "${cid}".`);
      return tableResponse(
        `OpenSecrets: ${industries.length} industry contributions for ${cid}`,
        {
          rows: industries,
          columns: ["industry_name", "industry_code", "total", "indivs", "pacs"],
        },
      );
    },
  },
];
