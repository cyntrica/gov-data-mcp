/**
 * cdec MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getSensorData, getStationMeta, type CdecSensorRecord, type CdecStationMeta } from "./sdk.js";
import { timeseriesResponse, listResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "cdec_sensor_data",
    description:
      "Get real-time sensor data from California Data Exchange Center (CDEC) monitoring stations.\n\n" +
      "Common sensor numbers:\n" +
      "- 15: Storage (acre-feet, for reservoirs)\n" +
      "- 6: Reservoir elevation (feet)\n" +
      "- 20: Flow (CFS — cubic feet per second)\n" +
      "- 3: Snow water content (inches)\n" +
      "- 30: Temperature (degrees F)\n" +
      "- 2: Precipitation (accumulated inches)\n\n" +
      "Common station IDs: SHA (Shasta), ORO (Oroville), FOL (Folsom), DNP (Don Pedro), " +
      "NML (New Melones), BUL (Lake Bullards Bar)",
    annotations: { title: "CDEC: Sensor Data", readOnlyHint: true },
    parameters: z.object({
      station_id: z.string().describe("Station ID (e.g., 'SHA' for Shasta Dam, 'ORO' for Oroville)"),
      sensor_num: z.number().int().describe("Sensor number (e.g., 15=storage, 6=elevation, 20=flow, 3=snow)"),
      dur_code: z.enum(["E", "H", "D", "M"]).optional().describe(
        "Duration code: 'E' (event/real-time, default), 'H' (hourly), 'D' (daily), 'M' (monthly)",
      ),
      start: z.string().optional().describe("Start date (YYYY-MM-DD). Default: 7 days ago"),
      end: z.string().optional().describe("End date (YYYY-MM-DD). Default: today"),
    }),
    execute: async ({ station_id, sensor_num, dur_code, start, end }) => {
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const defaultStart = weekAgo.toISOString().split("T")[0];
      const defaultEnd = now.toISOString().split("T")[0];

      const data = await getSensorData({
        stationId: station_id,
        sensorNum: sensor_num,
        durCode: dur_code,
        start: start || defaultStart,
        end: end || defaultEnd,
      });

      if (!Array.isArray(data) || !data.length) {
        return emptyResponse(`No CDEC sensor data found for station ${station_id}, sensor ${sensor_num}.`);
      }

      const rows = data.map((d: CdecSensorRecord) => ({
        date: d.date || d.obsDate || "",
        value: d.value ?? null,
        units: d.units || "",
        stationId: d.stationId || station_id,
        dataFlag: d.dataFlag || "",
      }));

      return timeseriesResponse(
        `CDEC ${station_id} sensor ${sensor_num}: ${rows.length} observations`,
        {
          rows,
          dateKey: "date",
          valueKey: "value",
          extraFields: ["units", "stationId", "dataFlag"],
          meta: { stationId: station_id, sensorNum: sensor_num, durCode: dur_code || "E" },
        },
      );
    },
  },

  {
    name: "cdec_stations",
    description:
      "Get metadata for CDEC monitoring stations — location, operator, river basin, " +
      "and available sensors. Use this to find station IDs before querying sensor data.",
    annotations: { title: "CDEC: Station Info", readOnlyHint: true },
    parameters: z.object({
      station_id: z.string().describe("Station ID to look up (e.g., 'SHA', 'ORO', 'FOL')"),
    }),
    execute: async ({ station_id }) => {
      const data = await getStationMeta(station_id);

      if (!Array.isArray(data) || !data.length) {
        return emptyResponse(`No CDEC station found for ID '${station_id}'.`);
      }

      const items = data.map((d: CdecStationMeta) => ({
        stationId: d.stationId || station_id,
        stationName: d.stationName || "",
        county: d.county || "",
        latitude: d.latitude ?? null,
        longitude: d.longitude ?? null,
        elevation: d.elevation ?? null,
        operator: d.operator || "",
        riverBasin: d.riverBasin || "",
        hydroArea: d.hydroArea || "",
        nearbyCity: d.nearbyCity || "",
      }));

      return listResponse(
        `CDEC station ${station_id}: ${items.length} results`,
        { items },
      );
    },
  },
];
