/**
 * Maryland CHART traffic MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import {
  getIncidents, getClosures, getCameras, getSpeedData,
  getWeatherStations, getDMSSigns, getTravelTimes,
} from "./sdk.js";
import { tableResponse, listResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "md_traffic_incidents",
    description:
      "Get active traffic incidents on Maryland highways in real-time.\n" +
      "Includes accidents, disabled vehicles, debris, construction, and other events.\n" +
      "Data from CHART (MDOT SHA) — updates continuously.",
    annotations: { title: "Maryland: Traffic Incidents", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const data = await getIncidents();
      const items = Array.isArray(data) ? data : [];
      if (!items.length) return emptyResponse("No active traffic incidents in Maryland.");
      return listResponse(`MD traffic incidents: ${items.length} active`, { items });
    },
  },

  {
    name: "md_traffic_closures",
    description:
      "Get active road closures on Maryland highways.\n" +
      "Includes planned and emergency closures with start/end times.",
    annotations: { title: "Maryland: Road Closures", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const data = await getClosures();
      const items = Array.isArray(data) ? data : [];
      if (!items.length) return emptyResponse("No active road closures in Maryland.");
      return listResponse(`MD road closures: ${items.length} active`, { items });
    },
  },

  {
    name: "md_traffic_cameras",
    description:
      "Get traffic camera locations across Maryland highways.\n" +
      "Returns camera IDs, locations, and image URLs for real-time visual monitoring.",
    annotations: { title: "Maryland: Traffic Cameras", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const data = await getCameras();
      const items = Array.isArray(data) ? data : [];
      if (!items.length) return emptyResponse("No camera data available.");
      return tableResponse(`MD traffic cameras: ${items.length} locations`, { rows: items });
    },
  },

  {
    name: "md_traffic_speeds",
    description:
      "Get speed sensor data from Maryland highways.\n" +
      "Includes average speed, traffic volume, and lane occupancy from detector stations.\n" +
      "Useful for identifying congestion and travel conditions.",
    annotations: { title: "Maryland: Speed Sensors", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const data = await getSpeedData();
      const items = Array.isArray(data) ? data : [];
      if (!items.length) return emptyResponse("No speed sensor data available.");
      return tableResponse(`MD speed sensors: ${items.length} stations`, { rows: items });
    },
  },

  {
    name: "md_traffic_weather",
    description:
      "Get road weather data from RWIS (Road Weather Information System) stations.\n" +
      "Includes air/surface temperature, humidity, wind, precipitation, and visibility.\n" +
      "Critical for winter weather road condition assessment.",
    annotations: { title: "Maryland: Road Weather (RWIS)", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const data = await getWeatherStations();
      const items = Array.isArray(data) ? data : [];
      if (!items.length) return emptyResponse("No weather station data available.");
      return tableResponse(`MD road weather: ${items.length} stations`, { rows: items });
    },
  },

  {
    name: "md_traffic_signs",
    description:
      "Get dynamic message sign (DMS) content on Maryland highways.\n" +
      "Shows current messages displayed on electronic highway signs — alerts, travel times, events.",
    annotations: { title: "Maryland: Highway Signs (DMS)", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const data = await getDMSSigns();
      const items = Array.isArray(data) ? data : [];
      if (!items.length) return emptyResponse("No DMS data available.");
      return listResponse(`MD highway signs: ${items.length} signs`, { items });
    },
  },

  {
    name: "md_traffic_travel_times",
    description:
      "Get travel time data for major Maryland highway routes.\n" +
      "Shows current travel time vs free-flow time, average speed, and route distance.",
    annotations: { title: "Maryland: Travel Times", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const data = await getTravelTimes();
      const items = Array.isArray(data) ? data : [];
      if (!items.length) return emptyResponse("No travel time data available.");
      return tableResponse(`MD travel times: ${items.length} routes`, { rows: items });
    },
  },
];
