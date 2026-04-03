/**
 * onebusaway MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getArrivals, getRoutes } from "./sdk.js";
import { tableResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "oba_arrivals",
    description:
      "Get real-time arrival and departure predictions for a Puget Sound (Seattle area) transit stop.\n" +
      "Returns predicted and scheduled times, route info, vehicle tracking, and distance from stop.\n" +
      "Covers King County Metro, Sound Transit, Pierce Transit, Community Transit, and more.",
    annotations: { title: "OneBusAway: Real-Time Arrivals", readOnlyHint: true },
    parameters: z.object({
      stop_id: z.string().describe("OneBusAway stop ID (e.g. '1_75403')"),
    }),
    execute: async (args) => {
      const data = await getArrivals({ stopId: args.stop_id });
      if (!data.length) return emptyResponse("No arrivals found for this stop.");
      return tableResponse(`${data.length} arrival(s) for stop ${args.stop_id}`, {
        rows: data as Record<string, unknown>[],
        total: data.length,
      });
    },
  },

  {
    name: "oba_routes",
    description:
      "List transit routes for a Puget Sound agency.\n" +
      "Default agency '1' is King County Metro (Seattle). Returns route names, types, and descriptions.",
    annotations: { title: "OneBusAway: Agency Routes", readOnlyHint: true },
    parameters: z.object({
      agency_id: z.string().optional().describe("Agency ID (default '1' for King County Metro)"),
    }),
    execute: async (args) => {
      const data = await getRoutes({ agencyId: args.agency_id });
      if (!data.length) return emptyResponse("No routes found for this agency.");
      return tableResponse(`${data.length} route(s)`, {
        rows: data as Record<string, unknown>[],
        total: data.length,
      });
    },
  },
];
