/**
 * Chesapeake Bay CBIBS MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import {
  getStations, getLatestReadings, getHistoricalData,
  STATIONS, VARIABLES,
} from "./sdk.js";
import { listResponse, recordResponse, timeseriesResponse, emptyResponse } from "../../shared/response.js";
import { keysEnum, describeEnum } from "../../shared/enum-utils.js";

export const tools: Tool<any, any>[] = [
  {
    name: "md_bay_stations",
    description:
      "List all Chesapeake Bay CBIBS buoy stations with their locations and current status.\n" +
      `Stations: ${describeEnum(STATIONS as Record<string, string>)}.`,
    annotations: { title: "Chesapeake Bay: Station List", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const data = await getStations();
      if (!data?.length) return emptyResponse("No station data available.");
      return listResponse(`CBIBS stations: ${data.length} buoys`, { items: data });
    },
  },

  {
    name: "md_bay_latest",
    description:
      "Get latest readings from a CBIBS buoy station.\n" +
      "Returns current water temperature, salinity, dissolved oxygen, pH, wind, waves, and more.\n" +
      `Stations: ${describeEnum(STATIONS as Record<string, string>)}.`,
    annotations: { title: "Chesapeake Bay: Latest Readings", readOnlyHint: true },
    parameters: z.object({
      station: z.enum(keysEnum(STATIONS)).describe("Station code"),
    }),
    execute: async ({ station }) => {
      const data = await getLatestReadings(station);
      if (!data || Object.keys(data).length === 0) return emptyResponse(`No data for station ${station}.`);
      return recordResponse(
        `CBIBS ${station} (${STATIONS[station as keyof typeof STATIONS]}): latest readings`,
        data,
      );
    },
  },

  {
    name: "md_bay_historical",
    description:
      "Get historical time-series data from a CBIBS buoy station.\n" +
      "Query specific variable over a date range for trend analysis.\n" +
      `Variables: ${describeEnum(VARIABLES as Record<string, string>)}.\n` +
      `Stations: ${describeEnum(STATIONS as Record<string, string>)}.`,
    annotations: { title: "Chesapeake Bay: Historical Data", readOnlyHint: true },
    parameters: z.object({
      station: z.enum(keysEnum(STATIONS)).describe("Station code"),
      variable: z.string().describe(`Measurement variable: ${describeEnum(VARIABLES as Record<string, string>)}`),
      start_date: z.string().describe("Start date (YYYY-MM-DD), e.g. '2024-06-01'"),
      end_date: z.string().describe("End date (YYYY-MM-DD), e.g. '2024-06-30'"),
    }),
    execute: async ({ station, variable, start_date, end_date }) => {
      const data = await getHistoricalData({
        station,
        variable,
        startDate: start_date,
        endDate: end_date,
      });
      if (!data?.length) return emptyResponse(`No ${variable} data for station ${station} in date range.`);

      // Try to detect date and value keys from first record
      const keys = Object.keys(data[0]);
      const dateKey = keys.find(k => k.toLowerCase().includes("date") || k.toLowerCase().includes("time")) ?? keys[0];
      const valueKey = keys.find(k => k.toLowerCase().includes("value") || k === variable) ?? keys[1];

      return timeseriesResponse(
        `CBIBS ${station} ${variable}: ${data.length} observations (${start_date} to ${end_date})`,
        { rows: data, dateKey, valueKey },
      );
    },
  },
];
