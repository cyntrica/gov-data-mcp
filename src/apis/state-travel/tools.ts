/**
 * state-travel MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getTravelAdvisories } from "./sdk.js";
import { listResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "travel_advisories",
    description:
      "Get U.S. State Department travel advisories for all countries or a specific country.\n" +
      "Advisory levels: 1 = Exercise Normal Precautions, 2 = Exercise Increased Caution, 3 = Reconsider Travel, 4 = Do Not Travel.\n" +
      "Includes advisory text, date published, and country information.",
    annotations: { title: "State Dept: Travel Advisories", readOnlyHint: true },
    parameters: z.object({
      country_code: z.string().optional().describe("ISO 2-letter country code to filter: 'AF', 'CN', 'RU', 'MX', 'UA'"),
      level: z.number().int().min(1).max(4).optional().describe("Filter by advisory level: 1, 2, 3, or 4"),
    }),
    execute: async (args) => {
      const advisories = await getTravelAdvisories();
      if (!Array.isArray(advisories) || !advisories.length) {
        return emptyResponse("No travel advisories available.");
      }

      let filtered = advisories;

      if (args.country_code) {
        const code = args.country_code.toUpperCase();
        filtered = filtered.filter(
          (a: any) =>
            (a.country_code ?? a.countryCode ?? a.iso_code ?? "").toUpperCase() === code ||
            (a.country_iso ?? "").toUpperCase() === code,
        );
      }

      if (args.level !== undefined) {
        filtered = filtered.filter(
          (a: any) =>
            Number(a.advisory_level ?? a.level ?? a.advisoryLevel ?? 0) === args.level,
        );
      }

      if (!filtered.length) {
        return emptyResponse(
          args.country_code
            ? `No travel advisory found for country code '${args.country_code}'.`
            : "No travel advisories match the filter criteria.",
        );
      }

      if (args.country_code && filtered.length === 1) {
        return recordResponse(
          `Travel advisory: ${(filtered[0] as any).country ?? (filtered[0] as any).country_name ?? args.country_code}`,
          filtered[0],
        );
      }

      return listResponse(
        `Travel advisories: ${filtered.length} countries`,
        { items: filtered, total: filtered.length },
      );
    },
  },
];
