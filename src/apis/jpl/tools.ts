/**
 * jpl MCP tools — asteroid close approaches, small body lookups, fireball events.
 *
 * Docs: https://ssd-api.jpl.nasa.gov/
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getCloseApproaches, getSmallBody, getFireballs } from "./sdk.js";
import { tableResponse, recordResponse, emptyResponse } from "../../shared/response.js";

/** Convert CAD-style parallel arrays (fields + data) into row objects. */
function cadToRows(fields: string[], data: string[][]): Record<string, unknown>[] {
  return data.map(row => {
    const obj: Record<string, unknown> = {};
    fields.forEach((f, i) => { obj[f] = row[i]; });
    return obj;
  });
}

export const tools: Tool<any, any>[] = [
  {
    name: "jpl_close_approaches",
    description:
      "Get asteroid/comet close approaches to Earth.\n" +
      "Filter by date range, maximum distance (in AU), and result limit.\n" +
      "1 AU ≈ 150 million km (Earth-Sun distance). 0.05 AU ≈ 7.5 million km.\n\n" +
      "Example: date_min='2024-01-01', date_max='2024-12-31', dist_max='0.05'",
    annotations: { title: "JPL: Close Approaches", readOnlyHint: true },
    parameters: z.object({
      date_min: z.string().optional().describe("Start date (YYYY-MM-DD). Default: now"),
      date_max: z.string().optional().describe("End date (YYYY-MM-DD). Default: +60 days"),
      dist_max: z.string().optional().describe("Max distance in AU (e.g. '0.05' for ~7.5M km). Default: '0.05'"),
      limit: z.number().int().min(1).max(300).optional().describe("Max results (default 20)"),
    }),
    execute: async ({ date_min, date_max, dist_max, limit }) => {
      const { count, fields, data } = await getCloseApproaches({
        dateMin: date_min, dateMax: date_max, distMax: dist_max, limit,
      });
      if (!data.length) return emptyResponse("No close approaches found for the given criteria.");
      const rows = cadToRows(fields, data);
      return tableResponse(
        `JPL close approaches: ${data.length} of ${count} total`,
        { rows },
      );
    },
  },

  {
    name: "jpl_small_body",
    description:
      "Look up asteroid/comet orbital data by name, designation, or SPK-ID.\n" +
      "Returns object identity, orbital elements, physical parameters, and close approach data.\n\n" +
      "Example: name='Apophis', name='2023 DW', name='Bennu'",
    annotations: { title: "JPL: Small Body Lookup", readOnlyHint: true },
    parameters: z.object({
      name: z.string().describe("Object name, designation, or SPK-ID (e.g. 'Apophis', '2023 DW', '2099942')"),
    }),
    execute: async ({ name }) => {
      const res = await getSmallBody(name);
      if (!res.object) return emptyResponse(`No small body found matching '${name}'.`);
      const obj = res.object;
      const result: Record<string, unknown> = {
        fullname: obj.fullname,
        kind: obj.kind,
        designation: obj.des,
        spkId: obj.spkid,
        orbitClass: obj.orbit_class?.name,
        isPHA: obj.pha,
        isNEO: obj.neo,
      };
      if (res.phys_par?.length) {
        result.physicalParameters = res.phys_par;
      }
      if (res.ca_data?.length && res.ca_fields?.length) {
        result.closeApproaches = cadToRows(res.ca_fields, res.ca_data.slice(0, 20));
      }
      return recordResponse(`Small body: ${obj.fullname ?? name}`, result);
    },
  },

  {
    name: "jpl_fireball",
    description:
      "Get reported fireball/bolide events from US Government sensors.\n" +
      "Fireballs are very bright meteors — detected by DoD/DoE satellite sensors.\n" +
      "Data includes date, location, velocity, energy, and altitude.\n\n" +
      "Example: date_min='2024-01-01', date_max='2024-12-31'",
    annotations: { title: "JPL: Fireball Events", readOnlyHint: true },
    parameters: z.object({
      date_min: z.string().optional().describe("Start date (YYYY-MM-DD)"),
      date_max: z.string().optional().describe("End date (YYYY-MM-DD)"),
      limit: z.number().int().min(1).max(300).optional().describe("Max results (default 20)"),
    }),
    execute: async ({ date_min, date_max, limit }) => {
      const { count, fields, data } = await getFireballs({ dateMin: date_min, dateMax: date_max, limit });
      if (!data.length) return emptyResponse("No fireball events found for the given criteria.");
      const rows = cadToRows(fields, data);
      return tableResponse(
        `JPL fireball events: ${data.length} of ${count} total`,
        { rows },
      );
    },
  },
];
