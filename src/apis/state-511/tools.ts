import { z } from "zod";
import type { Tool } from "fastmcp";
import { getIncidents, getCameras, getSigns, getWeather, getRoadConditions } from "./sdk.js";
import { listTrafficStates } from "./registry.js";
import { listResponse, tableResponse, emptyResponse, recordResponse } from "../../shared/response.js";

const stateList = () => listTrafficStates().map(s => s.code).join(", ");

const ACTIONS = {
  incidents: "Active traffic incidents (accidents, closures, construction)",
  cameras: "Traffic camera locations and image URLs",
  signs: "Dynamic message sign content",
  weather: "Road weather station (RWIS) data — temperature, precipitation, visibility",
  conditions: "Road conditions — construction, speed data, traffic flow",
} as const;

const actionList = Object.entries(ACTIONS).map(([k, v]) => `${k}: ${v}`).join("; ");

export const tools: Tool<any, any>[] = [
  {
    name: "traffic_511_list",
    description: "List all states with 511 traffic data and their platform type.",
    annotations: { title: "511 Traffic: Available States", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const states = listTrafficStates();
      return listResponse(`511 traffic: ${states.length} states available`, { items: states });
    },
  },
  {
    name: "traffic_511_query",
    description:
      "Query real-time traffic data for a state. 15 states supported.\n" +
      `Actions: ${actionList}.`,
    annotations: { title: "511 Traffic: Query State", readOnlyHint: true },
    parameters: z.object({
      state: z.string().describe(`Two-letter state code: ${stateList()}`),
      action: z.enum(["incidents", "cameras", "signs", "weather", "conditions"]).describe("Data type to retrieve"),
    }),
    execute: async ({ state, action }) => {
      switch (action) {
        case "incidents": {
          const data = await getIncidents(state);
          if (!data?.length) return emptyResponse(`No active incidents in ${state}.`);
          return listResponse(`${state} incidents: ${data.length} active`, { items: data });
        }
        case "cameras": {
          const data = await getCameras(state);
          if (!data?.length) return emptyResponse(`No camera data for ${state}.`);
          return tableResponse(`${state} cameras: ${data.length}`, { rows: data });
        }
        case "signs": {
          const data = await getSigns(state);
          if (!data?.length) return emptyResponse(`No sign data for ${state}.`);
          return listResponse(`${state} signs: ${data.length}`, { items: data });
        }
        case "weather": {
          const data = await getWeather(state);
          if (!data?.length) return emptyResponse(`No weather data for ${state}.`);
          return tableResponse(`${state} road weather: ${data.length} stations`, { rows: data });
        }
        case "conditions": {
          const data = await getRoadConditions(state);
          if (!data?.length) return emptyResponse(`No condition data for ${state}.`);
          return tableResponse(`${state} conditions: ${data.length} records`, { rows: data });
        }
      }
    },
  },
];
