/**
 * recreation MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchFacilities, searchCampsites, searchRecAreas } from "./sdk.js";
import { listResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "rec_facilities",
    description:
      "Search federal recreation facilities — campgrounds, parks, trails, lakes, and more. " +
      "Filter by keyword, state, or activity type.\n\n" +
      "Returns facility names, types, locations, and IDs (use IDs with rec_campsites).",
    annotations: { title: "Recreation: Search Facilities", readOnlyHint: true },
    parameters: z.object({
      query: z.string().optional().describe("Search keyword (e.g. 'Yellowstone', 'beach camping')"),
      state: z.string().optional().describe("Two-letter state code (e.g. 'CO', 'CA', 'WY')"),
      activity: z.string().optional().describe("Activity filter (e.g. 'camping', 'hiking', 'fishing', 'boating')"),
      limit: z.number().int().positive().max(50).optional().describe("Max results (default: 20, max: 50)"),
      offset: z.number().int().min(0).optional().describe("Starting offset for pagination (default: 0)"),
    }),
    execute: async ({ query, state, activity, limit, offset }) => {
      const result = await searchFacilities({ query, state, activity, limit, offset });
      const total = result.METADATA.RESULTS.TOTAL_COUNT;

      if (!result.RECDATA.length) {
        return emptyResponse(`No recreation facilities found${query ? ` for "${query}"` : ""}${state ? ` in ${state}` : ""}.`);
      }

      return listResponse(
        `Recreation facilities: ${result.RECDATA.length} of ${total} total${query ? ` matching "${query}"` : ""}${state ? ` in ${state}` : ""}`,
        {
          items: result.RECDATA,
          total,
          meta: { query, state, activity, limit: limit ?? 20, offset: offset ?? 0 },
        },
      );
    },
  },

  {
    name: "rec_campsites",
    description:
      "Search available campsites at a specific recreation facility. " +
      "Use rec_facilities first to find facility IDs.\n\n" +
      "Returns campsite names, types, loops, and accessibility info.",
    annotations: { title: "Recreation: Search Campsites", readOnlyHint: true },
    parameters: z.object({
      facility_id: z.string().describe("Facility ID from rec_facilities search results"),
      limit: z.number().int().positive().max(100).optional().describe("Max campsites to return (default: 50, max: 100)"),
    }),
    execute: async ({ facility_id, limit }) => {
      const result = await searchCampsites({ facilityId: facility_id, limit });
      const total = result.METADATA.RESULTS.TOTAL_COUNT;

      if (!result.RECDATA.length) {
        return emptyResponse(`No campsites found at facility ${facility_id}.`);
      }

      return listResponse(
        `Campsites at facility ${facility_id}: ${result.RECDATA.length} of ${total} total`,
        {
          items: result.RECDATA,
          total,
          meta: { facilityId: facility_id, limit: limit ?? 50 },
        },
      );
    },
  },

  {
    name: "rec_areas",
    description:
      "Search federal recreation areas by keyword or state. Recreation areas are larger regions " +
      "that may contain multiple facilities.\n\n" +
      "Returns area names, descriptions, and locations.",
    annotations: { title: "Recreation: Search Areas", readOnlyHint: true },
    parameters: z.object({
      query: z.string().optional().describe("Search keyword (e.g. 'national forest', 'wilderness')"),
      state: z.string().optional().describe("Two-letter state code (e.g. 'CO', 'CA', 'WY')"),
      limit: z.number().int().positive().max(50).optional().describe("Max results (default: 20, max: 50)"),
      offset: z.number().int().min(0).optional().describe("Starting offset for pagination (default: 0)"),
    }),
    execute: async ({ query, state, limit, offset }) => {
      const result = await searchRecAreas({ query, state, limit, offset });
      const total = result.METADATA.RESULTS.TOTAL_COUNT;

      if (!result.RECDATA.length) {
        return emptyResponse(`No recreation areas found${query ? ` for "${query}"` : ""}${state ? ` in ${state}` : ""}.`);
      }

      return listResponse(
        `Recreation areas: ${result.RECDATA.length} of ${total} total${query ? ` matching "${query}"` : ""}${state ? ` in ${state}` : ""}`,
        {
          items: result.RECDATA,
          total,
          meta: { query, state, limit: limit ?? 20, offset: offset ?? 0 },
        },
      );
    },
  },
];
