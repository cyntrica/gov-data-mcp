/**
 * path-train MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getArrivals } from "./sdk.js";
import { listResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "path_arrivals",
    description:
      "Get real-time PATH train arrival times for all stations in the NY/NJ metro area.\n" +
      "Returns station names, line info, projected arrival times, and train status.\n" +
      "PATH connects Manhattan to Jersey City, Hoboken, Harrison, and Newark. No API key required.",
    annotations: { title: "PATH: Train Arrivals", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const data = await getArrivals();
      if (!data.length) return emptyResponse("No PATH train arrival data available.");
      return listResponse(`${data.length} station(s) reporting`, {
        items: data as Record<string, unknown>[],
        total: data.length,
      });
    },
  },
];
