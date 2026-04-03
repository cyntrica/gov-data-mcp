/**
 * bart MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getDepartures, getStations, getAdvisories } from "./sdk.js";
import { tableResponse, listResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "bart_departures",
    description:
      "Get real-time departure estimates for a BART (San Francisco Bay Area) station.\n" +
      "Returns estimated departure times, platform, direction, train length, and color.\n" +
      "Station abbreviations are 4 letters (e.g. 'EMBR' for Embarcadero, '12TH' for 12th St Oakland, 'ALL' for all stations).",
    annotations: { title: "BART: Departures", readOnlyHint: true },
    parameters: z.object({
      station: z.string().describe("Station abbreviation (e.g. 'EMBR', '12TH', 'POWL', 'MONT', or 'ALL' for all stations)"),
    }),
    execute: async (args) => {
      const resp = await getDepartures({ station: args.station });
      const stations = resp?.root?.station ?? [];
      if (!stations.length) return emptyResponse(`No departure data found for station '${args.station}'.`);
      const rows: Record<string, unknown>[] = [];
      for (const stn of stations) {
        for (const etd of stn.etd ?? []) {
          for (const est of etd.estimate ?? []) {
            rows.push({
              station: stn.name,
              station_abbr: stn.abbr,
              destination: etd.destination,
              minutes: est.minutes,
              platform: est.platform,
              direction: est.direction,
              length: est.length,
              color: est.color,
              delay: est.delay,
              bike_flag: est.bikeflag,
            });
          }
        }
      }
      if (!rows.length) return emptyResponse(`No departures currently scheduled from '${args.station}'.`);
      return tableResponse(`${rows.length} BART departure(s) from ${stations[0]?.name ?? args.station}`, { rows, total: rows.length });
    },
  },

  {
    name: "bart_stations",
    description:
      "List all BART (San Francisco Bay Area) stations.\n" +
      "Returns station names, abbreviations, addresses, and coordinates.",
    annotations: { title: "BART: Stations", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const resp = await getStations();
      const stations = resp?.root?.stations?.station ?? resp?.root?.station ?? [];
      if (!stations.length) return emptyResponse("No BART stations found.");
      const rows = stations.map((s) => ({
        name: s.name,
        abbr: s.abbr,
        address: s.address,
        city: s.city,
        county: s.county,
        state: s.state,
        zipcode: s.zipcode,
        latitude: s.gtfs_latitude,
        longitude: s.gtfs_longitude,
      }));
      return tableResponse(`${rows.length} BART station(s)`, { rows: rows as Record<string, unknown>[], total: rows.length });
    },
  },

  {
    name: "bart_advisories",
    description:
      "Get service advisories for BART (San Francisco Bay Area).\n" +
      "Returns current service alerts, delays, and planned disruptions.",
    annotations: { title: "BART: Advisories", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const resp = await getAdvisories();
      const advisories = resp?.root?.bsa ?? [];
      if (!advisories.length) return emptyResponse("No active BART advisories.");
      const rows = advisories.map((a) => ({
        station: a.station,
        description: typeof a.description === "object" && a.description !== null
          ? (a.description as Record<string, string>)["#cdata-section"]
          : a.description,
        type: a.type,
        posted: a.posted,
        expires: a.expires,
      }));
      return tableResponse(`${rows.length} BART advisory(ies)`, { rows: rows as Record<string, unknown>[], total: rows.length });
    },
  },
];
