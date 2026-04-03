import { z } from "zod";
import type { Tool } from "fastmcp";
import { TRANSIT_SYSTEMS, getArrivals, getAlerts } from "./sdk.js";
import { listResponse, recordResponse, emptyResponse } from "../../shared/response.js";

const systemIds = TRANSIT_SYSTEMS.map(s => s.id).join(", ");

export const tools: Tool<any, any>[] = [
  {
    name: "transit_systems",
    description:
      "List all 12 available US transit systems with their regions and capabilities.",
    annotations: { title: "Transit: List Systems", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      return listResponse(`${TRANSIT_SYSTEMS.length} transit systems available`, {
        items: TRANSIT_SYSTEMS as unknown as Record<string, unknown>[],
      });
    },
  },
  {
    name: "transit_arrivals",
    description:
      "Get real-time arrivals/predictions for any of 12 US transit systems.\n" +
      `Systems: ${systemIds}.\n` +
      "Station/stop IDs are system-specific (BART: EMBR, WMATA: A01, CTA: 40380, etc.).",
    annotations: { title: "Transit: Arrivals", readOnlyHint: true },
    parameters: z.object({
      system: z.string().describe(`Transit system ID: ${systemIds}`),
      station: z.string().optional().describe("Station/stop ID (system-specific). Omit for all stations where supported."),
    }),
    execute: async ({ system, station }) => {
      const data = await getArrivals(system, station);
      if (!data || Object.keys(data).length === 0) return emptyResponse(`No arrival data for ${system}.`);
      return recordResponse(`${system} arrivals${station ? ` (${station})` : ""}`, data);
    },
  },
  {
    name: "transit_status",
    description:
      "Get service alerts and incidents for a transit system.\n" +
      "Supported: bart, mbta, septa, wmata. Others return arrivals data instead.",
    annotations: { title: "Transit: Service Status", readOnlyHint: true },
    parameters: z.object({
      system: z.string().describe(`Transit system ID: ${systemIds}`),
    }),
    execute: async ({ system }) => {
      const data = await getAlerts(system);
      if (!data || Object.keys(data).length === 0) return emptyResponse(`No alerts for ${system}.`);
      return recordResponse(`${system} service status`, data);
    },
  },
];
