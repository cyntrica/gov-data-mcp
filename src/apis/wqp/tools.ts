/**
 * WQP MCP tools — water quality monitoring stations and sample results.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchStations, getResults } from "./sdk.js";
import { tableResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "wqp_stations",
    description:
      "Search water quality monitoring stations by state, county, or HUC code.\nData from USGS, EPA, and 400+ state agencies.",
    annotations: { title: "WQP: Monitoring Stations", readOnlyHint: true },
    parameters: z.object({
      stateCode: z.string().optional().describe("2-digit state FIPS code (e.g. '06' for CA, '36' for NY)"),
      countyCode: z.string().optional().describe("3-digit county FIPS code (requires stateCode)"),
      huc: z.string().optional().describe("Hydrologic Unit Code (2-12 digits)"),
      siteType: z.string().optional().describe("e.g. 'Stream', 'Lake', 'Well', 'Spring'"),
      limit: z.number().int().max(500).optional().describe("Max results (default 50)"),
    }),
    execute: async (opts) => {
      const stations = await searchStations(opts);
      if (!stations.length) return emptyResponse("No monitoring stations found for the given criteria.");
      return tableResponse(
        `WQP: ${stations.length} monitoring stations found`,
        {
          rows: stations,
          columns: [
            "MonitoringLocationIdentifier", "MonitoringLocationName",
            "MonitoringLocationTypeName", "OrganizationFormalName",
            "StateCode", "CountyCode", "LatitudeMeasure", "LongitudeMeasure",
          ],
        },
      );
    },
  },

  {
    name: "wqp_results",
    description:
      "Get water quality sample results by station ID and/or parameter name.\nCommon parameters: 'Temperature, water', 'pH', 'Dissolved oxygen', 'Nitrogen', 'Phosphorus'.",
    annotations: { title: "WQP: Sample Results", readOnlyHint: true },
    parameters: z.object({
      siteId: z.string().optional().describe("Monitoring location ID (e.g. 'USGS-01646500')"),
      characteristicName: z.string().optional().describe("Parameter name (e.g. 'Temperature, water', 'pH')"),
      stateCode: z.string().optional().describe("2-digit state FIPS code"),
      startDate: z.string().optional().describe("Start date (MM-DD-YYYY)"),
      endDate: z.string().optional().describe("End date (MM-DD-YYYY)"),
      limit: z.number().int().max(500).optional().describe("Max results (default 50)"),
    }),
    execute: async (opts) => {
      const results = await getResults(opts);
      if (!results.length) return emptyResponse("No water quality results found for the given criteria.");
      return tableResponse(
        `WQP: ${results.length} sample results`,
        {
          rows: results,
          columns: [
            "MonitoringLocationIdentifier", "ActivityStartDate",
            "CharacteristicName", "ResultMeasureValue",
            "ResultMeasure_MeasureUnitCode", "ActivityMediaName",
          ],
        },
      );
    },
  },
];
