/**
 * epa MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getAirQuality, searchFacilities, getFacilityDetail, getUVIndex, AIR_TABLES, UV_INDEX_SCALE } from "./sdk.js";
import { tableResponse, listResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "epa_air_quality",
    description:
      "Get air quality data by state from EPA Envirofacts.\n" +
      "Returns county-level air quality measures including ozone and particulate matter (PM2.5).",
    annotations: { title: "EPA: Air Quality", readOnlyHint: true },
    parameters: z.object({
      state: z.string().describe("Two-letter state code: 'CA', 'TX', 'NY'"),
      table: z.enum(["AIR_QUALITY_MEASURES", "MONITORING_SITE"]).optional().describe("Data table (default: AIR_QUALITY_MEASURES)"),
      rows: z.string().optional().describe("Row range: '0:99' (default). Use '0:499' for more data."),
    }),
    execute: async ({ state, table, rows }) => {
      const data = await getAirQuality({ state, table, rows });
      if (!Array.isArray(data) || !data.length) return emptyResponse(`No air quality data found for ${state}.`);
      return tableResponse(
        `EPA air quality: ${data.length} records for ${state}`,
        { rows: data },
      );
    },
  },

  {
    name: "epa_facilities",
    description:
      "Search EPA-regulated facilities for environmental compliance and violations.\n" +
      "Find facilities with air or water permit violations, inspections, and enforcement actions.\n" +
      "Media types: 'air' (Clean Air Act), 'water' (Clean Water Act).",
    annotations: { title: "EPA: Facility Compliance", readOnlyHint: true },
    parameters: z.object({
      state: z.string().describe("Two-letter state code: 'CA', 'TX', 'NY'"),
      media_type: z.enum(["air", "water"]).optional().describe("Media type: air (Clean Air Act), water (Clean Water Act). Default: air"),
      major_only: z.boolean().optional().describe("Only show major facilities (true/false, default true)"),
      active_only: z.boolean().optional().describe("Only show active facilities (true/false, default true)"),
      limit: z.number().int().max(1000).optional().describe("Max results (default 20)"),
    }),
    execute: async ({ state, media_type, major_only, active_only, limit }) => {
      const data = await searchFacilities({
        state, mediaType: media_type,
        majorOnly: major_only !== false,
        activeOnly: active_only !== false,
        responseset: limit,
      });
      const results = data?.Results?.Facilities || data?.Results || [];
      if (!Array.isArray(results) || !results.length) return emptyResponse(`No facilities found in ${state}.`);
      return tableResponse(
        `EPA facilities in ${state}: ${results.length} records (${media_type || "air"})`,
        { rows: results },
      );
    },
  },

  {
    name: "epa_uv_index",
    description:
      "Get UV index forecast for a U.S. ZIP code.\n" +
      "UV Scale: 0-2 Low, 3-5 Moderate, 6-7 High, 8-10 Very High, 11+ Extreme.\n" +
      "Useful for health recommendations — high UV correlates with skin cancer risk.",
    annotations: { title: "EPA: UV Index Forecast", readOnlyHint: true },
    parameters: z.object({
      zip: z.string().describe("5-digit ZIP code: '10001', '90210', '60601'"),
    }),
    execute: async ({ zip }) => {
      const data = await getUVIndex(zip);
      if (!Array.isArray(data) || !data.length) return emptyResponse(`No UV forecast data found for ZIP ${zip}.`);
      return listResponse(
        `UV index forecast for ZIP ${zip}: ${data.length} forecasts`,
        { items: data, maxItems: 10 },
      );
    },
  },
];
