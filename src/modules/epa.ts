/**
 * EPA MCP module — air quality, facility compliance, UV index.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getAirQuality, searchFacilities, getFacilityDetail, getUVIndex, AIR_TABLES, UV_INDEX_SCALE } from "../sdk/epa.js";

export const name = "epa";
export const displayName = "EPA (Environmental Protection Agency)";
export const description = "Air quality data, facility environmental compliance/violations, UV index forecasts";
export const workflow = "epa_air_quality for pollution data → epa_facilities for compliance violations → epa_uv for UV forecasts";
export const tips = "Air quality tables: AIR_QUALITY_MEASURES (county-level AQI), MONITORING_SITE (station locations). UV index: 0-2 Low, 3-5 Moderate, 6-7 High, 8-10 Very High, 11+ Extreme.";

export const reference = {
  airTables: AIR_TABLES,
  uvScale: UV_INDEX_SCALE,
  docs: {
    "Envirofacts": "https://enviro.epa.gov/",
    "ECHO": "https://echo.epa.gov/",
    "Air Quality System": "https://www.epa.gov/aqs",
  },
};

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
      if (!Array.isArray(data) || !data.length) return `No air quality data found for ${state}.`;
      return JSON.stringify({
        summary: `EPA air quality: ${data.length} records for ${state}`,
        records: data.slice(0, 100),
      });
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
      if (!Array.isArray(results) || !results.length) return `No facilities found in ${state}.`;
      return JSON.stringify({
        summary: `EPA facilities in ${state}: ${results.length} records (${media_type || "air"})`,
        results: results.slice(0, 50),
      });
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
      if (!Array.isArray(data) || !data.length) return `No UV forecast data found for ZIP ${zip}.`;
      return JSON.stringify({
        summary: `UV index forecast for ZIP ${zip}: ${data.length} forecasts`,
        forecasts: data.slice(0, 10),
      });
    },
  },
];

export { clearCache } from "../sdk/epa.js";
