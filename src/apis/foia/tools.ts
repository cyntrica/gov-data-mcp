/**
 * foia MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getAgencies, getAnnualReport } from "./sdk.js";
import { listResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "foia_agencies",
    description:
      "List all federal agencies with FOIA offices and contact information.\n" +
      "Returns agency names, abbreviations, FOIA request submission details, and websites.\n" +
      "Use this to discover agency abbreviations for the foia_report tool.",
    annotations: { title: "FOIA: Agency List", readOnlyHint: true },
    parameters: z.object({
      search: z.string().optional().describe("Filter agencies by name (case-insensitive partial match): 'defense', 'justice', 'energy'"),
    }),
    execute: async (args) => {
      const response = await getAgencies();
      let agencies = response.data ?? [];

      if (args.search) {
        const s = args.search.toLowerCase();
        agencies = agencies.filter((a: any) =>
          (a.title ?? a.name ?? a.agency_name ?? "").toLowerCase().includes(s) ||
          (a.abbreviation ?? a.agency_abbreviation ?? "").toLowerCase().includes(s),
        );
      }

      if (!agencies.length) return emptyResponse("No FOIA agencies found matching the search criteria.");
      return listResponse(
        `FOIA agencies: ${agencies.length} components`,
        { items: agencies, total: agencies.length },
      );
    },
  },

  {
    name: "foia_report",
    description:
      "Get annual FOIA report statistics for a specific federal agency.\n" +
      "Includes request volumes, processing times, backlog data, exemption usage, and compliance metrics.\n" +
      "Use foia_agencies first to find the correct agency abbreviation.",
    annotations: { title: "FOIA: Annual Report", readOnlyHint: true },
    parameters: z.object({
      agency_abbreviation: z.string().describe("Federal agency abbreviation: 'DOJ', 'DOD', 'DHS', 'EPA', 'DOE'"),
    }),
    execute: async ({ agency_abbreviation }) => {
      const data = await getAnnualReport(agency_abbreviation);
      if (!data || (typeof data === "object" && Object.keys(data).length === 0)) {
        return emptyResponse(`No FOIA report found for agency '${agency_abbreviation}'.`);
      }
      return recordResponse(
        `FOIA annual report: ${agency_abbreviation}`,
        data,
      );
    },
  },
];
