/**
 * faa-weather MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getMetar, getTaf, getSigmet, getPirep } from "./sdk.js";
import { listResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "faa_metar",
    description:
      "Get METAR weather observations for airports.\n" +
      "Returns current conditions: temperature, dewpoint, wind, visibility, ceiling, flight category.\n" +
      "Station IDs are ICAO codes (e.g. KJFK, KLAX, KORD). Multiple stations can be comma-separated.",
    annotations: { title: "FAA: METAR Observations", readOnlyHint: true },
    parameters: z.object({
      ids: z.string().describe("ICAO station ID(s), comma-separated (e.g. 'KJFK', 'KJFK,KLAX,KORD')"),
      hours: z.number().int().min(1).max(72).optional().describe("Hours of observations to retrieve (default: most recent)"),
    }),
    execute: async ({ ids, hours }) => {
      const metars = await getMetar({ ids, hours });
      if (!metars.length) return emptyResponse(`No METAR data found for ${ids}.`);
      if (metars.length === 1) {
        const m = metars[0];
        return recordResponse(
          `METAR for ${m.station}: ${m.fltcat || "N/A"}, ${m.temp != null ? `${m.temp}°C` : "temp N/A"}, wind ${m.wdir ?? "---"}° at ${m.wspd ?? "---"} kt`,
          m,
        );
      }
      return listResponse(
        `${metars.length} METAR observation(s) for ${ids}`,
        { items: metars },
      );
    },
  },

  {
    name: "faa_taf",
    description:
      "Get TAF (Terminal Aerodrome Forecast) for airports.\n" +
      "Returns forecast periods with expected conditions, wind, visibility, and clouds.\n" +
      "Station IDs are ICAO codes. Multiple stations can be comma-separated.",
    annotations: { title: "FAA: TAF Forecasts", readOnlyHint: true },
    parameters: z.object({
      ids: z.string().describe("ICAO station ID(s), comma-separated (e.g. 'KJFK', 'KJFK,KLAX')"),
    }),
    execute: async ({ ids }) => {
      const tafs = await getTaf({ ids });
      if (!tafs.length) return emptyResponse(`No TAF data found for ${ids}.`);
      if (tafs.length === 1) {
        const t = tafs[0];
        return recordResponse(
          `TAF for ${t.station}: valid ${t.validTimeFrom} to ${t.validTimeTo}`,
          t,
        );
      }
      return listResponse(
        `${tafs.length} TAF forecast(s) for ${ids}`,
        { items: tafs },
      );
    },
  },

  {
    name: "faa_sigmet",
    description:
      "Get active SIGMETs (Significant Meteorological Information).\n" +
      "Returns hazardous weather advisories including turbulence, icing, convection, and volcanic ash.\n" +
      "Covers all active SIGMETs across the national airspace.",
    annotations: { title: "FAA: Active SIGMETs", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const sigmets = await getSigmet();
      if (!sigmets.length) return emptyResponse("No active SIGMETs.");
      return listResponse(
        `${sigmets.length} active SIGMET(s)`,
        { items: sigmets },
      );
    },
  },

  {
    name: "faa_pirep",
    description:
      "Get pilot reports (PIREPs).\n" +
      "Returns pilot-reported weather conditions including turbulence, icing, and weather phenomena.\n" +
      "Optionally filter by recency (hours).",
    annotations: { title: "FAA: Pilot Reports (PIREPs)", readOnlyHint: true },
    parameters: z.object({
      hours: z.number().int().min(1).max(72).optional().describe("Hours of PIREPs to retrieve (default: recent)"),
    }),
    execute: async ({ hours }) => {
      const pireps = await getPirep({ hours });
      if (!pireps.length) return emptyResponse("No PIREPs found.");
      return listResponse(
        `${pireps.length} PIREP(s)${hours ? ` from the last ${hours} hour(s)` : ""}`,
        { items: pireps },
      );
    },
  },
];
