/**
 * iso-ne MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getLoad, getFuelMix, type IsoneLoadEntry, type IsoneFuelMixEntry } from "./sdk.js";
import { tableResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "isone_load",
    description:
      "Get current ISO New England system load (demand) — real-time 5-minute system load data.\n\n" +
      "ISO-NE serves Connecticut, Maine, Massachusetts, New Hampshire, Rhode Island, and Vermont.",
    annotations: { title: "ISO-NE: System Load", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const res = await getLoad();
      const data = (
        res.FiveMinSystemLoads?.FiveMinSystemLoad ||
        res.SystemLoads?.SystemLoad ||
        []
      ) as IsoneLoadEntry[];

      if (!data.length) return emptyResponse("No ISO-NE load data found.");

      const rows = data.map(d => ({
        beginDate: d.BeginDate || "",
        loadMw: d.LoadMw ?? d.NativeLoad ?? null,
      }));

      return tableResponse(
        `ISO-NE system load: ${rows.length} records`,
        { rows },
      );
    },
  },

  {
    name: "isone_fuel_mix",
    description:
      "Get current ISO New England generation fuel mix — breakdown of electricity generation " +
      "by fuel type (natural gas, nuclear, hydro, wind, solar, oil, coal, etc.).\n\n" +
      "Shows real-time megawatt output by fuel category for the New England region.",
    annotations: { title: "ISO-NE: Generation Fuel Mix", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const res = await getFuelMix();
      const data = (res.GenFuelMixes?.GenFuelMix || []) as IsoneFuelMixEntry[];

      if (!data.length) return emptyResponse("No ISO-NE fuel mix data found.");

      const rows = data.map(d => ({
        beginDate: d.BeginDate || "",
        fuelCategory: d.FuelCategory || d.FuelCategoryRollup || "",
        genMw: d.GenMw ?? null,
        marginalFlag: d.MarginalFlag || "",
      }));

      return tableResponse(
        `ISO-NE generation fuel mix: ${rows.length} entries`,
        { rows },
      );
    },
  },
];
