/**
 * SAMHSA MCP tools — substance abuse and mental health treatment facility locator.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchTreatment } from "./sdk.js";
import { tableResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "samhsa_treatment_search",
    description:
      "Find substance abuse and mental health treatment facilities by location.\nService types: SA (substance abuse), MH (mental health), BOTH.",
    annotations: { title: "SAMHSA: Treatment Facility Search", readOnlyHint: true },
    parameters: z.object({
      address: z.string().describe("Address, city/state, or ZIP code (e.g. 'Washington, DC' or '20001')"),
      serviceType: z.enum(["SA", "MH", "BOTH"]).optional().describe("SA=substance abuse, MH=mental health, BOTH (default)"),
      limit: z.number().int().max(100).optional().describe("Max results (default 25)"),
    }),
    execute: async (opts) => {
      const facilities = await searchTreatment(opts);
      if (!facilities.length) return emptyResponse(`No treatment facilities found near "${opts.address}".`);
      return tableResponse(
        `SAMHSA: ${facilities.length} treatment facilities near "${opts.address}"`,
        {
          rows: facilities,
          columns: ["name1", "street1", "city", "state", "zip", "phone", "website", "typeFacility"],
        },
      );
    },
  },
];
