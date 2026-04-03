import { z } from "zod";
import type { Tool } from "fastmcp";
import { getIncidents, getCameras, getSigns, getWeather, getRoadConditions } from "./sdk.js";
import { listTrafficStates } from "./registry.js";
import { listResponse, tableResponse, emptyResponse } from "../../shared/response.js";

const stateList = () => listTrafficStates().map(s => s.code).join(", ");

export const tools: Tool<any, any>[] = [
  {
    name: "traffic_511_list",
    description: "List all states with 511 traffic data available in the registry.",
    annotations: { title: "511 Traffic: Available States", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const states = listTrafficStates();
      return listResponse(`511 traffic states: ${states.length} available`, { items: states });
    },
  },
  {
    name: "traffic_511_incidents",
    description:
      "Get active traffic incidents (accidents, closures, construction) for a state.\n" +
      "Covers 14+ states. Use traffic_511_list to see available states.",
    annotations: { title: "511 Traffic: Incidents", readOnlyHint: true },
    parameters: z.object({
      state: z.string().describe(`Two-letter state code: ${stateList()}`),
    }),
    execute: async ({ state }) => {
      const data = await getIncidents(state);
      if (!data?.length) return emptyResponse(`No active incidents in ${state}.`);
      return listResponse(`${state} traffic incidents: ${data.length} active`, { items: data });
    },
  },
  {
    name: "traffic_511_cameras",
    description: "Get traffic camera locations for a state.",
    annotations: { title: "511 Traffic: Cameras", readOnlyHint: true },
    parameters: z.object({
      state: z.string().describe(`Two-letter state code: ${stateList()}`),
    }),
    execute: async ({ state }) => {
      const data = await getCameras(state);
      if (!data?.length) return emptyResponse(`No camera data for ${state}.`);
      return tableResponse(`${state} traffic cameras: ${data.length}`, { rows: data });
    },
  },
  {
    name: "traffic_511_signs",
    description: "Get dynamic message sign content for a state.",
    annotations: { title: "511 Traffic: Message Signs", readOnlyHint: true },
    parameters: z.object({
      state: z.string().describe(`Two-letter state code: ${stateList()}`),
    }),
    execute: async ({ state }) => {
      const data = await getSigns(state);
      if (!data?.length) return emptyResponse(`No sign data for ${state}.`);
      return listResponse(`${state} highway signs: ${data.length}`, { items: data });
    },
  },
  {
    name: "traffic_511_weather",
    description: "Get road weather station (RWIS) data for a state.\nIncludes surface temperature, precipitation, visibility, wind.",
    annotations: { title: "511 Traffic: Road Weather", readOnlyHint: true },
    parameters: z.object({
      state: z.string().describe(`Two-letter state code: ${stateList()}`),
    }),
    execute: async ({ state }) => {
      const data = await getWeather(state);
      if (!data?.length) return emptyResponse(`No weather station data for ${state}.`);
      return tableResponse(`${state} road weather: ${data.length} stations`, { rows: data });
    },
  },
  {
    name: "traffic_511_conditions",
    description: "Get road conditions (construction, speed data, traffic flow) for a state.",
    annotations: { title: "511 Traffic: Road Conditions", readOnlyHint: true },
    parameters: z.object({
      state: z.string().describe(`Two-letter state code: ${stateList()}`),
    }),
    execute: async ({ state }) => {
      const data = await getRoadConditions(state);
      if (!data?.length) return emptyResponse(`No road condition data for ${state}.`);
      return tableResponse(`${state} road conditions: ${data.length} records`, { rows: data });
    },
  },
];
