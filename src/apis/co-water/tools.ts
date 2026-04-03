/**
 * co-water MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import {
  getStations,
  getReadings,
  getWaterRights,
  type CoWaterStation,
  type CoWaterReading,
  type CoWaterRight,
} from "./sdk.js";
import { tableResponse, timeseriesResponse, listResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "co_water_stations",
    description:
      "Search Colorado telemetry stations — find monitoring stations by county, water district, or division.\n\n" +
      "Returns station abbreviations needed for co_water_readings, plus location, " +
      "parameter type, and station metadata.",
    annotations: { title: "CO Water: Telemetry Stations", readOnlyHint: true },
    parameters: z.object({
      county: z.string().optional().describe("County name (e.g., 'Boulder', 'Denver', 'El Paso')"),
      water_district: z.number().int().optional().describe("Water district number"),
      division: z.number().int().optional().describe("Water division number (1-7)"),
      limit: z.number().int().max(500).optional().describe("Max results (default: 100)"),
    }),
    execute: async ({ county, water_district, division, limit }) => {
      const res = await getStations({ county, waterDistrict: water_district, division, limit });
      const data = (res.ResultList || []) as CoWaterStation[];

      if (!data.length) return emptyResponse("No Colorado telemetry stations found.");

      const rows = data.map(d => ({
        abbrev: d.abbrev || "",
        stationName: d.stationName || "",
        county: d.county || "",
        waterDistrict: d.waterDistrict ?? null,
        division: d.division ?? null,
        latitude: d.latitude ?? null,
        longitude: d.longitude ?? null,
        parameter: d.parameter || "",
        stationType: d.stationType || "",
      }));

      return tableResponse(
        `Colorado telemetry stations: ${rows.length} found`,
        { rows, total: res.ResultCount },
      );
    },
  },

  {
    name: "co_water_readings",
    description:
      "Get real-time Colorado streamflow, reservoir, and weather telemetry readings.\n\n" +
      "Parameters (measurement types):\n" +
      "- DISCHRG: Discharge/streamflow (CFS)\n" +
      "- GAGE_HT: Gage height (feet)\n" +
      "- AIRTEMP: Air temperature (degrees F)\n" +
      "- STORAGE: Reservoir storage (acre-feet)\n" +
      "- PRECIP: Precipitation (inches)\n" +
      "- WIND_SPEED: Wind speed (mph)\n\n" +
      "Use co_water_stations first to find station abbreviations.",
    annotations: { title: "CO Water: Telemetry Readings", readOnlyHint: true },
    parameters: z.object({
      abbrev: z.string().describe("Station abbreviation (from co_water_stations)"),
      parameter: z.string().optional().describe(
        "Measurement parameter: 'DISCHRG' (default), 'GAGE_HT', 'AIRTEMP', 'STORAGE', 'PRECIP', 'WIND_SPEED'",
      ),
      start: z.string().optional().describe("Start date (MM/DD/YYYY or YYYY-MM-DD)"),
      end: z.string().optional().describe("End date (MM/DD/YYYY or YYYY-MM-DD)"),
      limit: z.number().int().max(5000).optional().describe("Max rows to return (default: 500)"),
    }),
    execute: async ({ abbrev, parameter, start, end, limit }) => {
      const res = await getReadings({ abbrev, parameter, start, end, limit });
      const data = (res.ResultList || []) as CoWaterReading[];

      if (!data.length) {
        return emptyResponse(`No readings found for station ${abbrev} (${parameter || "DISCHRG"}).`);
      }

      const rows = data.map(d => ({
        measDate: d.measDate || "",
        measValue: d.measValue ?? null,
        measUnit: d.measUnit || "",
        abbrev: d.abbrev || abbrev,
        parameter: d.parameter || parameter || "DISCHRG",
        flagA: d.flagA || "",
      }));

      return timeseriesResponse(
        `Colorado water readings (${abbrev}, ${parameter || "DISCHRG"}): ${rows.length} observations`,
        {
          rows,
          dateKey: "measDate",
          valueKey: "measValue",
          extraFields: ["measUnit", "abbrev", "parameter", "flagA"],
          total: res.ResultCount,
          meta: { station: abbrev, parameter: parameter || "DISCHRG" },
        },
      );
    },
  },

  {
    name: "co_water_rights",
    description:
      "Search Colorado water rights and structures — adjudicated water rights, diversions, " +
      "wells, and reservoirs with appropriation dates and decreed amounts.\n\n" +
      "Filter by county and/or water source name.",
    annotations: { title: "CO Water: Water Rights", readOnlyHint: true },
    parameters: z.object({
      county: z.string().optional().describe("County name (e.g., 'Boulder', 'Weld')"),
      water_source: z.string().optional().describe("Water source name (e.g., 'South Platte River', 'Clear Creek')"),
      water_district: z.number().int().optional().describe("Water district number"),
      limit: z.number().int().max(500).optional().describe("Max results (default: 100)"),
    }),
    execute: async ({ county, water_source, water_district, limit }) => {
      const res = await getWaterRights({ county, waterSource: water_source, waterDistrict: water_district, limit });
      const data = (res.ResultList || []) as CoWaterRight[];

      if (!data.length) return emptyResponse("No Colorado water rights found.");

      const items = data.map(d => ({
        structureName: d.structureName || "",
        wdid: d.wdid || "",
        county: d.county || "",
        waterSource: d.waterSource || "",
        appropriationDate: d.appropriationDate || "",
        adjudicationDate: d.adjudicationDate || "",
        decreedAmount: d.decreedAmount ?? null,
        decreedUnits: d.decreedUnits || "",
        structureType: d.structureType || "",
      }));

      return listResponse(
        `Colorado water rights: ${items.length} structures`,
        { items, total: res.ResultCount },
      );
    },
  },
];
