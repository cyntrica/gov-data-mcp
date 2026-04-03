/**
 * la-metro MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getVehicles, getRoutes, getStops } from "./sdk.js";
import { tableResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "la_metro_vehicles",
    description:
      "Get real-time bus and rail vehicle positions for LA Metro (Los Angeles).\n" +
      "Returns GPS coordinates, route, trip, stop, and status for all active vehicles.",
    annotations: { title: "LA Metro: Vehicles", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const data = await getVehicles();
      const items = Array.isArray(data) ? data : [];
      if (!items.length) return emptyResponse("No active LA Metro vehicles found.");
      return tableResponse(`${items.length} active LA Metro vehicle(s)`, { rows: items as Record<string, unknown>[], total: items.length });
    },
  },

  {
    name: "la_metro_routes",
    description:
      "List all LA Metro (Los Angeles) transit routes.\n" +
      "Returns route IDs, names, types, and colors for bus and rail lines.",
    annotations: { title: "LA Metro: Routes", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const data = await getRoutes();
      const items = Array.isArray(data) ? data : [];
      if (!items.length) return emptyResponse("No LA Metro routes found.");
      return tableResponse(`${items.length} LA Metro route(s)`, { rows: items as Record<string, unknown>[], total: items.length });
    },
  },

  {
    name: "la_metro_stops",
    description:
      "List stops for an LA Metro (Los Angeles) route.\n" +
      "Returns stop IDs, names, and coordinates. Optionally filter by route code.",
    annotations: { title: "LA Metro: Stops", readOnlyHint: true },
    parameters: z.object({
      route: z.string().optional().describe("Route code to filter stops (e.g. '720' for Wilshire Rapid)"),
    }),
    execute: async (args) => {
      const data = await getStops({ route: args.route });
      const items = Array.isArray(data) ? data : [];
      if (!items.length) return emptyResponse(args.route ? `No stops found for route ${args.route}.` : "No LA Metro stops found.");
      return tableResponse(`${items.length} LA Metro stop(s)${args.route ? ` on route ${args.route}` : ""}`, { rows: items as Record<string, unknown>[], total: items.length });
    },
  },
];
