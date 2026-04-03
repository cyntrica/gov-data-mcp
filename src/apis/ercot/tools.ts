/**
 * ercot MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getGridConditions, getPrices, type ErcotRecord } from "./sdk.js";
import { tableResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "ercot_grid_conditions",
    description:
      "Get current Texas (ERCOT) grid conditions — load forecasts by weather zone, " +
      "including total system load, capacity, and wind/solar generation.\n\n" +
      "ERCOT manages the Texas Interconnection, an independent grid covering ~90% of Texas.",
    annotations: { title: "ERCOT: Grid Conditions", readOnlyHint: true },
    parameters: z.object({
      delivery_date_from: z.string().optional().describe("Start date (YYYY-MM-DD). Default: today"),
      delivery_date_to: z.string().optional().describe("End date (YYYY-MM-DD). Default: today"),
      limit: z.number().int().max(1000).optional().describe("Max rows to return (default: 100)"),
      offset: z.number().int().optional().describe("Row offset for pagination"),
    }),
    execute: async ({ delivery_date_from, delivery_date_to, limit, offset }) => {
      const today = new Date().toISOString().split("T")[0];
      const res = await getGridConditions({
        deliveryDateFrom: delivery_date_from || today,
        deliveryDateTo: delivery_date_to || today,
        limit,
        offset,
      });
      const data = (res.data || []) as ErcotRecord[];

      if (!data.length) return emptyResponse("No ERCOT grid conditions data found.");

      return tableResponse(
        `ERCOT grid conditions: ${data.length} records`,
        { rows: data, total: res.total },
      );
    },
  },

  {
    name: "ercot_prices",
    description:
      "Get Texas (ERCOT) settlement point prices — real-time wholesale electricity prices " +
      "at specific nodes, zones, or hubs.\n\n" +
      "Common settlement points: HB_HOUSTON, HB_NORTH, HB_SOUTH, HB_WEST, HB_BUSAVG (hub average).",
    annotations: { title: "ERCOT: Settlement Point Prices", readOnlyHint: true },
    parameters: z.object({
      delivery_date_from: z.string().optional().describe("Start date (YYYY-MM-DD). Default: today"),
      delivery_date_to: z.string().optional().describe("End date (YYYY-MM-DD). Default: today"),
      settlement_point: z.string().optional().describe(
        "Settlement point name (e.g., 'HB_HOUSTON', 'HB_NORTH', 'HB_BUSAVG'). Omit for all.",
      ),
      limit: z.number().int().max(1000).optional().describe("Max rows to return (default: 100)"),
      offset: z.number().int().optional().describe("Row offset for pagination"),
    }),
    execute: async ({ delivery_date_from, delivery_date_to, settlement_point, limit, offset }) => {
      const today = new Date().toISOString().split("T")[0];
      const res = await getPrices({
        deliveryDateFrom: delivery_date_from || today,
        deliveryDateTo: delivery_date_to || today,
        settlementPoint: settlement_point,
        limit,
        offset,
      });
      const data = (res.data || []) as ErcotRecord[];

      if (!data.length) return emptyResponse("No ERCOT price data found.");

      return tableResponse(
        `ERCOT settlement point prices: ${data.length} records`,
        { rows: data, total: res.total },
      );
    },
  },
];
