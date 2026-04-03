/**
 * septa MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getTrainView, getNextToArrive, getBusView, getAlerts } from "./sdk.js";
import { tableResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "septa_train_view",
    description:
      "Get all active SEPTA (Philadelphia) regional rail train positions.\n" +
      "Returns real-time GPS coordinates, line, destination, current/next stop, and delay minutes for every active train.",
    annotations: { title: "SEPTA: Train View", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const data = await getTrainView();
      if (!Array.isArray(data) || !data.length) return emptyResponse("No active regional rail trains found.");
      return tableResponse(`${data.length} active SEPTA regional rail train(s)`, { rows: data as Record<string, unknown>[], total: data.length });
    },
  },

  {
    name: "septa_next_to_arrive",
    description:
      "Get next trains arriving between two SEPTA (Philadelphia) regional rail stations.\n" +
      "Returns departure/arrival times, delays, line info, and connection details.",
    annotations: { title: "SEPTA: Next To Arrive", readOnlyHint: true },
    parameters: z.object({
      start: z.string().describe("Origin station name (e.g. 'Suburban Station', '30th Street Station', 'Temple University')"),
      end: z.string().describe("Destination station name (e.g. 'Bryn Mawr', 'Trenton', 'Airport Terminal E-F')"),
      count: z.number().int().min(1).max(10).optional().describe("Number of results (default 4)"),
    }),
    execute: async (args) => {
      const data = await getNextToArrive({
        start: args.start,
        end: args.end,
        count: args.count,
      });
      if (!Array.isArray(data) || !data.length) return emptyResponse(`No upcoming trains from ${args.start} to ${args.end}.`);
      return tableResponse(`${data.length} upcoming train(s) from ${args.start} to ${args.end}`, { rows: data as Record<string, unknown>[], total: data.length });
    },
  },

  {
    name: "septa_bus_view",
    description:
      "Get real-time bus/trolley positions for a SEPTA (Philadelphia) route.\n" +
      "Returns GPS coordinates, vehicle ID, direction, destination, and delay for all active vehicles on the route.",
    annotations: { title: "SEPTA: Bus/Trolley View", readOnlyHint: true },
    parameters: z.object({
      route: z.string().describe("Route number (e.g. '17', '34', '101', 'LUCYGO')"),
    }),
    execute: async (args) => {
      const data = await getBusView({ route: args.route });
      // TransitView returns an object with route data nested
      const buses = Array.isArray(data) ? data : (data as Record<string, unknown>)?.bus;
      const items = Array.isArray(buses) ? buses : [];
      if (!items.length) return emptyResponse(`No active vehicles found on route ${args.route}.`);
      return tableResponse(`${items.length} active vehicle(s) on SEPTA route ${args.route}`, { rows: items as Record<string, unknown>[], total: items.length });
    },
  },

  {
    name: "septa_alerts",
    description:
      "Get service alerts for all SEPTA (Philadelphia) transit routes.\n" +
      "Returns current messages, advisories, detour information, and snow alerts.",
    annotations: { title: "SEPTA: Alerts", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const data = await getAlerts();
      if (!Array.isArray(data) || !data.length) return emptyResponse("No active SEPTA alerts found.");
      return tableResponse(`${data.length} SEPTA alert(s)`, { rows: data as Record<string, unknown>[], total: data.length });
    },
  },
];
