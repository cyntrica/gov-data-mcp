/**
 * noaa-coops MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import {
  getWaterLevel,
  getTidePredictions,
  getHighLow,
  getCurrents,
  getCurrentPredictions,
  getMeteorologicalData,
  getWaterQuality,
  getAirGap,
  getStationMetadata,
  listStations,
} from "./sdk.js";
import { timeseriesResponse, recordResponse, listResponse, emptyResponse } from "../../shared/response.js";

// ─── Shared Schemas ──────────────────────────────────────────────────

const datumEnum = z.enum(["STND", "MHHW", "MHW", "MTL", "MSL", "MLW", "MLLW", "NAVD"]).optional()
  .describe("Vertical datum (default STND)");

const unitsEnum = z.enum(["english", "metric"]).optional()
  .describe("Units: english or metric (default metric)");

const timeZoneEnum = z.enum(["gmt", "lst", "lst_ldt"]).optional()
  .describe("Time zone: gmt, lst (local standard), lst_ldt (local daylight) (default gmt)");

const stationParam = z.string().describe("Station ID, e.g. '8454000' (Providence), '9414290' (San Francisco)");

const beginDate = z.string().optional().describe("Start date YYYYMMDD");
const endDate = z.string().optional().describe("End date YYYYMMDD");
const dateShortcut = z.enum(["today", "latest", "recent"]).optional()
  .describe("Date shortcut (alternative to begin_date/end_date)");

export const tools: Tool<any, any>[] = [
  {
    name: "coops_water_level",
    description: "Get observed water levels from a NOAA CO-OPS station.\nProvide station ID + date range (YYYYMMDD) or date shortcut (today/latest/recent).",
    annotations: { title: "CO-OPS: Water Levels", readOnlyHint: true },
    parameters: z.object({
      station: stationParam,
      begin_date: beginDate,
      end_date: endDate,
      date: dateShortcut,
      datum: datumEnum,
      units: unitsEnum,
      time_zone: timeZoneEnum,
    }),
    execute: async ({ station, begin_date, end_date, date, datum, units, time_zone }) => {
      const result = await getWaterLevel({ station, begin_date, end_date, date, datum, units, time_zone });
      if (!result.data.length) return emptyResponse(`No water level data for station ${station}.`);
      return timeseriesResponse(
        `Water level: ${result.data.length} observations for station ${station}`,
        { rows: result.data, dateKey: "t", valueKey: "v" },
      );
    },
  },

  {
    name: "coops_tide_predictions",
    description: "Get tide predictions for a NOAA CO-OPS station.\nProvide station ID + date range (YYYYMMDD) or date shortcut. Use interval='hilo' for high/low only.",
    annotations: { title: "CO-OPS: Tide Predictions", readOnlyHint: true },
    parameters: z.object({
      station: stationParam,
      begin_date: beginDate,
      end_date: endDate,
      date: dateShortcut,
      datum: datumEnum,
      units: unitsEnum,
      time_zone: timeZoneEnum,
      interval: z.enum(["h", "hilo", "1", "6"]).optional()
        .describe("Interval: h=hourly, hilo=high/low only, 1=1-min, 6=6-min"),
    }),
    execute: async ({ station, begin_date, end_date, date, datum, units, time_zone, interval }) => {
      const result = await getTidePredictions({ station, begin_date, end_date, date, datum, units, time_zone, interval });
      if (!result.data.length) return emptyResponse(`No tide predictions for station ${station}.`);
      return timeseriesResponse(
        `Tide predictions: ${result.data.length} values for station ${station}`,
        { rows: result.data, dateKey: "t", valueKey: "v" },
      );
    },
  },

  {
    name: "coops_high_low",
    description: "Get observed high/low tide data from a NOAA CO-OPS station.\nReturns verified high and low water level observations.",
    annotations: { title: "CO-OPS: High/Low Tides", readOnlyHint: true },
    parameters: z.object({
      station: stationParam,
      begin_date: beginDate,
      end_date: endDate,
      date: dateShortcut,
      datum: datumEnum,
      units: unitsEnum,
    }),
    execute: async ({ station, begin_date, end_date, date, datum, units }) => {
      const result = await getHighLow({ station, begin_date, end_date, date, datum, units });
      if (!result.data.length) return emptyResponse(`No high/low data for station ${station}.`);
      return timeseriesResponse(
        `High/low tides: ${result.data.length} observations for station ${station}`,
        { rows: result.data, dateKey: "t", valueKey: "v" },
      );
    },
  },

  {
    name: "coops_currents",
    description: "Get current speed/direction observations from a NOAA CO-OPS station.\nRequires a currents-capable station.",
    annotations: { title: "CO-OPS: Currents", readOnlyHint: true },
    parameters: z.object({
      station: stationParam,
      begin_date: beginDate,
      end_date: endDate,
      date: dateShortcut,
      units: unitsEnum,
      time_zone: timeZoneEnum,
      bin: z.number().int().optional().describe("Bin number for multi-bin current stations"),
    }),
    execute: async ({ station, begin_date, end_date, date, units, time_zone, bin }) => {
      const result = await getCurrents({ station, begin_date, end_date, date, units, time_zone, bin });
      if (!result.data.length) return emptyResponse(`No current data for station ${station}.`);
      return timeseriesResponse(
        `Currents: ${result.data.length} observations for station ${station}`,
        { rows: result.data, dateKey: "t", valueKey: "v" },
      );
    },
  },

  {
    name: "coops_current_predictions",
    description: "Get current predictions for a NOAA CO-OPS station.\nReturns predicted current speed/direction.",
    annotations: { title: "CO-OPS: Current Predictions", readOnlyHint: true },
    parameters: z.object({
      station: stationParam,
      begin_date: beginDate,
      end_date: endDate,
      date: dateShortcut,
      units: unitsEnum,
      time_zone: timeZoneEnum,
      interval: z.enum(["h", "1", "6", "MAX_SLACK"]).optional()
        .describe("Interval: h=hourly, 1=1-min, 6=6-min, MAX_SLACK=max flood/ebb and slack"),
      bin: z.number().int().optional().describe("Bin number for multi-bin current stations"),
    }),
    execute: async ({ station, begin_date, end_date, date, units, time_zone, interval, bin }) => {
      const result = await getCurrentPredictions({ station, begin_date, end_date, date, units, time_zone, interval, bin });
      if (!result.data.length) return emptyResponse(`No current predictions for station ${station}.`);
      return timeseriesResponse(
        `Current predictions: ${result.data.length} values for station ${station}`,
        { rows: result.data, dateKey: "t", valueKey: "v" },
      );
    },
  },

  {
    name: "coops_meteorological",
    description: "Get meteorological data from a NOAA CO-OPS station.\nProducts: air_temperature, water_temperature, wind, air_pressure, humidity, visibility.",
    annotations: { title: "CO-OPS: Meteorological Data", readOnlyHint: true },
    parameters: z.object({
      station: stationParam,
      begin_date: beginDate,
      end_date: endDate,
      date: dateShortcut,
      product: z.enum(["air_temperature", "water_temperature", "wind", "air_pressure", "humidity", "visibility"])
        .describe("Meteorological product to retrieve"),
      units: unitsEnum,
      time_zone: timeZoneEnum,
    }),
    execute: async ({ station, begin_date, end_date, date, product, units, time_zone }) => {
      const result = await getMeteorologicalData({ station, begin_date, end_date, date, product, units, time_zone });
      if (!result.data.length) return emptyResponse(`No ${product} data for station ${station}.`);
      return timeseriesResponse(
        `${product}: ${result.data.length} observations for station ${station}`,
        { rows: result.data, dateKey: "t", valueKey: "v" },
      );
    },
  },

  {
    name: "coops_water_quality",
    description: "Get conductivity/salinity (water quality) data from a NOAA CO-OPS station.",
    annotations: { title: "CO-OPS: Water Quality", readOnlyHint: true },
    parameters: z.object({
      station: stationParam,
      begin_date: beginDate,
      end_date: endDate,
      date: dateShortcut,
      units: unitsEnum,
    }),
    execute: async ({ station, begin_date, end_date, date, units }) => {
      const result = await getWaterQuality({ station, begin_date, end_date, date, units });
      if (!result.data.length) return emptyResponse(`No water quality data for station ${station}.`);
      return timeseriesResponse(
        `Water quality: ${result.data.length} observations for station ${station}`,
        { rows: result.data, dateKey: "t", valueKey: "v" },
      );
    },
  },

  {
    name: "coops_air_gap",
    description: "Get air gap (bridge clearance) data from a NOAA CO-OPS station.\nMeasures the distance between a bridge and the water surface.",
    annotations: { title: "CO-OPS: Air Gap", readOnlyHint: true },
    parameters: z.object({
      station: stationParam,
      begin_date: beginDate,
      end_date: endDate,
      date: dateShortcut,
      datum: datumEnum,
      units: unitsEnum,
    }),
    execute: async ({ station, begin_date, end_date, date, datum, units }) => {
      const result = await getAirGap({ station, begin_date, end_date, date, datum, units });
      if (!result.data.length) return emptyResponse(`No air gap data for station ${station}.`);
      return timeseriesResponse(
        `Air gap: ${result.data.length} observations for station ${station}`,
        { rows: result.data, dateKey: "t", valueKey: "v" },
      );
    },
  },

  {
    name: "coops_station_metadata",
    description: "Get detailed metadata for a specific NOAA CO-OPS station.\nReturns location, sensors, datums, products available, etc.",
    annotations: { title: "CO-OPS: Station Metadata", readOnlyHint: true },
    parameters: z.object({
      station_id: z.string().describe("Station ID, e.g. '8454000'"),
    }),
    execute: async ({ station_id }) => {
      const data = await getStationMetadata(station_id);
      return recordResponse(`Station ${station_id} metadata`, data);
    },
  },

  {
    name: "coops_stations",
    description: "List/search NOAA CO-OPS stations.\nOptionally filter by station type (waterlevels, currentpredictions, etc.) and/or 2-letter state code.",
    annotations: { title: "CO-OPS: List Stations", readOnlyHint: true },
    parameters: z.object({
      type: z.string().optional().describe("Station type filter: waterlevels, currentpredictions, etc."),
      state: z.string().optional().describe("2-letter state code, e.g. 'CA', 'NY'"),
    }),
    execute: async ({ type, state }) => {
      const result = await listStations({ type, state });
      if (!result.stations.length) return emptyResponse("No CO-OPS stations found matching criteria.");
      return listResponse(
        `${result.count} CO-OPS stations found`,
        { items: result.stations },
      );
    },
  },
];
