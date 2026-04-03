/**
 * wsdot-ferries MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getFerrySchedule, getVesselLocations, getTerminalSailingSpace } from "./sdk.js";
import { tableResponse, listResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "wsdot_ferry_schedule",
    description:
      "Get Washington State Ferries sailing schedules for a specific date.\n" +
      "Returns route descriptions, crossing times, and individual sailing times.",
    annotations: { title: "WSDOT: Ferry Schedule", readOnlyHint: true },
    parameters: z.object({
      date: z.string().describe("Schedule date in YYYY-MM-DD format (e.g. '2026-04-02')"),
    }),
    execute: async (args) => {
      const data = await getFerrySchedule({ date: args.date });
      if (!data.length) return emptyResponse(`No ferry schedules found for ${args.date}.`);
      return listResponse(`${data.length} route schedule(s) for ${args.date}`, {
        items: data as Record<string, unknown>[],
        total: data.length,
      });
    },
  },

  {
    name: "wsdot_ferry_vessels",
    description:
      "Get real-time positions of all Washington State Ferry vessels.\n" +
      "Returns vessel names, GPS coordinates, speed, heading, dock status, and departure/arrival terminals.",
    annotations: { title: "WSDOT: Ferry Vessel Positions", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const data = await getVesselLocations();
      if (!data.length) return emptyResponse("No vessel position data available.");
      return tableResponse(`${data.length} vessel(s) reporting`, {
        rows: data as Record<string, unknown>[],
        total: data.length,
      });
    },
  },

  {
    name: "wsdot_ferry_terminals",
    description:
      "Get current terminal wait times and vehicle space availability at Washington State Ferry terminals.\n" +
      "Shows how full each sailing is and estimated wait times for drive-up customers.",
    annotations: { title: "WSDOT: Ferry Terminal Wait Times", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const data = await getTerminalSailingSpace();
      if (!data.length) return emptyResponse("No terminal sailing space data available.");
      return listResponse(`${data.length} terminal(s) reporting`, {
        items: data as Record<string, unknown>[],
        total: data.length,
      });
    },
  },
];
