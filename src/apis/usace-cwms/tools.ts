/**
 * usace-cwms MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getLocations, getTimeseries, getLevels } from "./sdk.js";
import { listResponse, tableResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "usace_locations",
    description:
      "Search CWMS monitoring locations by name, office, or type.\n" +
      "Corps district offices: SWL (Little Rock), LRL (Louisville), MVS (St. Louis), NWK (Kansas City), MVP (St. Paul).\n" +
      "Returns location name, coordinates, type, state, and county.",
    annotations: { title: "USACE: Search Locations", readOnlyHint: true },
    parameters: z.object({
      office: z.string().optional().describe("Corps district office code: 'SWL', 'LRL', 'MVS', 'NWK', 'MVP'"),
      names: z.string().optional().describe("Location name pattern (supports wildcards): 'Mississippi*', 'Lock and Dam*'"),
      location_type: z.string().optional().describe("Location type filter"),
    }),
    execute: async (args) => {
      const data = await getLocations({
        office: args.office,
        names: args.names,
        locationType: args.location_type,
      }) as any;

      // Handle various response shapes
      const locations = data?.locations?.locations ?? data?.locations ?? data ?? [];
      const items = Array.isArray(locations) ? locations : [];
      if (!items.length) return emptyResponse("No CWMS locations found matching the criteria.");

      const rows = items.map((loc: any) => ({
        name: loc.name ?? null,
        office: loc.office ?? loc["office-id"] ?? null,
        latitude: loc.latitude ?? null,
        longitude: loc.longitude ?? null,
        locationType: loc["location-type"] ?? null,
        state: loc.state ?? null,
        county: loc.county ?? null,
        timeZone: loc["time-zone"] ?? null,
      }));

      return listResponse(
        `${rows.length} CWMS location(s) found`,
        { items: rows, total: rows.length },
      );
    },
  },

  {
    name: "usace_timeseries",
    description:
      "Get USACE time-series data: water level, flow, storage, precipitation.\n" +
      "Time-series names follow the format 'Location.Parameter.Type.Interval.Duration.Version'.\n" +
      "Use usace_locations first to find location names.",
    annotations: { title: "USACE: Time Series Data", readOnlyHint: true },
    parameters: z.object({
      name: z.string().describe("Time-series ID (e.g. 'Keys.Flow.Inst.1Hour.0.Ccp-Rev')"),
      office: z.string().optional().describe("Corps district office code: 'SWL', 'LRL', 'MVS'"),
      begin: z.string().optional().describe("Start date/time ISO 8601: '2024-01-01T00:00:00Z'"),
      end: z.string().optional().describe("End date/time ISO 8601: '2024-01-31T00:00:00Z'"),
    }),
    execute: async (args) => {
      const data = await getTimeseries(args) as any;

      // Handle various value formats
      let values: any[] = [];
      if (Array.isArray(data?.values)) {
        values = data.values;
      } else if (data?.["regular-interval-values"]?.values) {
        const segments = data["regular-interval-values"].values;
        for (const seg of segments) {
          if (Array.isArray(seg)) values.push(...seg);
        }
      }

      if (!values.length) return emptyResponse("No time-series data found.");

      const rows = values.map((v: any) => {
        if (Array.isArray(v)) {
          return {
            dateTime: v[0] ? new Date(v[0]).toISOString() : null,
            value: v[1] ?? null,
            qualityCode: v[2] ?? null,
          };
        }
        return {
          dateTime: v["date-time"] ? new Date(v["date-time"]).toISOString() : null,
          value: v.value ?? null,
          qualityCode: v["quality-code"] ?? null,
        };
      });

      return tableResponse(
        `${rows.length} time-series value(s) for '${args.name}'`,
        {
          rows,
          total: rows.length,
          meta: {
            name: data.name ?? args.name,
            office: data.office ?? args.office,
            unit: data.unit ?? null,
          },
        },
      );
    },
  },

  {
    name: "usace_levels",
    description:
      "Get water level data for USACE locations.\n" +
      "Returns level IDs, dates, constant values, and units.\n" +
      "Use a level-id-mask pattern to filter (supports wildcards).",
    annotations: { title: "USACE: Water Levels", readOnlyHint: true },
    parameters: z.object({
      office: z.string().optional().describe("Corps district office code: 'SWL', 'LRL', 'MVS'"),
      level_id_mask: z.string().optional().describe("Level ID pattern (supports wildcards): 'Mississippi*', 'Lock*'"),
    }),
    execute: async (args) => {
      const data = await getLevels({
        office: args.office,
        levelIdMask: args.level_id_mask,
      }) as any;

      const levels = data?.levels?.levels ?? data?.levels ?? data ?? [];
      const items = Array.isArray(levels) ? levels : [];
      if (!items.length) return emptyResponse("No water levels found matching the criteria.");

      const rows = items.map((lvl: any) => ({
        levelId: lvl["level-id"] ?? null,
        officeId: lvl["office-id"] ?? null,
        levelDate: lvl["level-date"] ?? null,
        constantValue: lvl["constant-value"] ?? null,
        levelUnits: lvl["level-units"] ?? null,
      }));

      return tableResponse(
        `${rows.length} water level(s) found`,
        { rows, total: rows.length },
      );
    },
  },
];
