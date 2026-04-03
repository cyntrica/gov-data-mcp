/**
 * nps MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchParks, getAlerts, searchCampgrounds, getEvents } from "./sdk.js";
import { listResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "nps_parks",
    description:
      "Search national parks by state, name, or keyword.\n" +
      "Returns park names, descriptions, states, designations, coordinates, and weather info.\n" +
      "Use this to discover park codes needed by other NPS tools.",
    annotations: { title: "NPS: Search Parks", readOnlyHint: true },
    parameters: z.object({
      state: z.string().optional().describe("2-letter state code (e.g. 'CA', 'WY', 'CO')"),
      query: z.string().optional().describe("Search keyword (e.g. 'canyon', 'glacier', 'volcano')"),
      park_code: z.string().optional().describe("Specific park code (e.g. 'yose', 'grca', 'yell')"),
      limit: z.number().int().max(500).optional().describe("Max results (default 25)"),
    }),
    execute: async ({ state, query, park_code, limit }) => {
      const result = await searchParks({ stateCode: state, q: query, parkCode: park_code, limit });
      if (!result.parks.length) return emptyResponse("No parks found matching the criteria.");
      return listResponse(
        `${result.parks.length} of ${result.total} park(s)${state ? ` in ${state}` : ""}${query ? ` matching "${query}"` : ""}`,
        { items: result.parks, total: result.total },
      );
    },
  },

  {
    name: "nps_alerts",
    description:
      "Get current park alerts including closures, dangers, cautions, and general information.\n" +
      "Optionally filter by park code. Useful for checking conditions before visiting.",
    annotations: { title: "NPS: Park Alerts", readOnlyHint: true },
    parameters: z.object({
      park_code: z.string().optional().describe("Park code (e.g. 'yose', 'grca'). Omit for all parks."),
      limit: z.number().int().max(500).optional().describe("Max results (default 25)"),
    }),
    execute: async ({ park_code, limit }) => {
      const result = await getAlerts({ parkCode: park_code, limit });
      if (!result.alerts.length) return emptyResponse(`No active alerts${park_code ? ` for ${park_code}` : ""}.`);
      return listResponse(
        `${result.alerts.length} of ${result.total} alert(s)${park_code ? ` for ${park_code}` : ""}`,
        { items: result.alerts, total: result.total },
      );
    },
  },

  {
    name: "nps_campgrounds",
    description:
      "Search campgrounds in national parks.\n" +
      "Returns campground names, descriptions, reservation info, site counts, and coordinates.\n" +
      "Filter by park code, state, or keyword.",
    annotations: { title: "NPS: Search Campgrounds", readOnlyHint: true },
    parameters: z.object({
      park_code: z.string().optional().describe("Park code (e.g. 'yose', 'grca')"),
      state: z.string().optional().describe("2-letter state code (e.g. 'CA', 'WY')"),
      query: z.string().optional().describe("Search keyword"),
      limit: z.number().int().max(500).optional().describe("Max results (default 25)"),
    }),
    execute: async ({ park_code, state, query, limit }) => {
      const result = await searchCampgrounds({ parkCode: park_code, stateCode: state, q: query, limit });
      if (!result.campgrounds.length) return emptyResponse("No campgrounds found matching the criteria.");
      return listResponse(
        `${result.campgrounds.length} of ${result.total} campground(s)${park_code ? ` in ${park_code}` : ""}`,
        { items: result.campgrounds, total: result.total },
      );
    },
  },

  {
    name: "nps_events",
    description:
      "Get upcoming events at national parks.\n" +
      "Returns event titles, dates, locations, categories, and registration info.\n" +
      "Optionally filter by park code.",
    annotations: { title: "NPS: Park Events", readOnlyHint: true },
    parameters: z.object({
      park_code: z.string().optional().describe("Park code (e.g. 'yose', 'grca'). Omit for all parks."),
      limit: z.number().int().max(500).optional().describe("Max results (default 25)"),
    }),
    execute: async ({ park_code, limit }) => {
      const result = await getEvents({ parkCode: park_code, limit });
      if (!result.events.length) return emptyResponse(`No upcoming events${park_code ? ` for ${park_code}` : ""}.`);
      return listResponse(
        `${result.events.length} of ${result.total} event(s)${park_code ? ` for ${park_code}` : ""}`,
        { items: result.events, total: result.total },
      );
    },
  },
];
