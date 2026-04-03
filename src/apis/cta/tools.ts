/**
 * cta MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getTrainArrivals, getBusArrivals } from "./sdk.js";
import { tableResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "cta_train_arrivals",
    description:
      "Get L train arrival predictions for a CTA (Chicago) station.\n" +
      "Returns predicted arrival times, destination, run number, direction, and delay status.\n" +
      "Station IDs are numeric (e.g. 40380 for Clark/Lake, 40530 for Washington/Wabash).",
    annotations: { title: "CTA: Train Arrivals", readOnlyHint: true },
    parameters: z.object({
      station_id: z.string().describe("Station map ID (numeric, e.g. '40380' for Clark/Lake, '40530' for Washington/Wabash)"),
    }),
    execute: async (args) => {
      const resp = await getTrainArrivals({ stationId: args.station_id });
      const etas = resp?.ctatt?.eta ?? [];
      if (!etas.length) {
        const err = resp?.ctatt?.errNm;
        return emptyResponse(err ? `CTA error: ${err}` : "No train arrivals found for this station.");
      }
      const rows = etas.map((e) => ({
        station: e.staNm,
        stop: e.stpDe,
        route: e.rt,
        destination: e.destNm,
        run: e.rn,
        predicted: e.prdt,
        arrival: e.arrT,
        approaching: e.isApp === "1" ? "Yes" : "No",
        delayed: e.isDly === "1" ? "Yes" : "No",
        scheduled: e.isSch === "1" ? "Yes" : "No",
        lat: e.lat,
        lon: e.lon,
      }));
      return tableResponse(`${rows.length} CTA L train arrival(s) at ${etas[0]?.staNm ?? args.station_id}`, { rows: rows as Record<string, unknown>[], total: rows.length });
    },
  },

  {
    name: "cta_bus_arrivals",
    description:
      "Get bus arrival predictions for a CTA (Chicago) bus stop.\n" +
      "Returns predicted arrival times, route, direction, destination, and delay status.\n" +
      "Stop IDs are numeric (find them on CTA bus stop signs or the CTA website).",
    annotations: { title: "CTA: Bus Arrivals", readOnlyHint: true },
    parameters: z.object({
      stop_id: z.string().describe("Bus stop ID (numeric, e.g. '1836')"),
    }),
    execute: async (args) => {
      const resp = await getBusArrivals({ stopId: args.stop_id });
      const busResp = resp?.["bustime-response"];
      if (busResp?.error?.length) {
        return emptyResponse(`CTA Bus Tracker error: ${busResp.error[0].msg}`);
      }
      const preds = busResp?.prd ?? [];
      if (!preds.length) return emptyResponse("No bus arrivals found for this stop.");
      const rows = preds.map((p) => ({
        stop: p.stpnm,
        route: p.rt,
        direction: p.rtdir,
        destination: p.des,
        predicted_time: p.prdtm,
        countdown: p.prdctdn,
        delayed: p.dly ? "Yes" : "No",
        vehicle: p.vid,
      }));
      return tableResponse(`${rows.length} CTA bus arrival(s) at ${preds[0]?.stpnm ?? args.stop_id}`, { rows: rows as Record<string, unknown>[], total: rows.length });
    },
  },
];
