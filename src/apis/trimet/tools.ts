/**
 * trimet MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getArrivals } from "./sdk.js";
import { tableResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "trimet_arrivals",
    description:
      "Get real-time arrival predictions for TriMet (Portland, OR) buses and MAX light rail at a specific stop.\n" +
      "Returns estimated and scheduled arrival times, route info, and vehicle status.",
    annotations: { title: "TriMet: Real-Time Arrivals", readOnlyHint: true },
    parameters: z.object({
      stop_id: z.string().describe("TriMet stop location ID (e.g. '8989' for Pioneer Square)"),
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
];
