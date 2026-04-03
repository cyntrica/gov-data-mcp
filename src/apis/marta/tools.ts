/**
 * marta MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getTrainArrivals } from "./sdk.js";
import { tableResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "marta_train_arrivals",
    description:
      "Get real-time MARTA rail arrival predictions for all stations in Atlanta, GA.\n" +
      "Returns train destination, direction (N/S/E/W), line (RED, GOLD, BLUE, GREEN),\n" +
      "station name, next arrival time, wait seconds, and GPS coordinates.\n" +
      "Data covers all active trains across the entire MARTA rail network.",
    annotations: { title: "MARTA: Train Arrivals", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const data = await getTrainArrivals();
      if (!data.length) return emptyResponse("No MARTA train arrival data available.");
      return tableResponse(`${data.length} train arrival(s) system-wide`, {
        rows: data as Record<string, unknown>[],
        total: data.length,
      });
    },
  },
];
