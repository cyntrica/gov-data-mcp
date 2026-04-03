/**
 * mbta MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getPredictions, getVehicles, getAlerts, getRoutes } from "./sdk.js";
import { tableResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "mbta_predictions",
    description:
      "Get real-time arrival/departure predictions for MBTA (Boston) transit.\n" +
      "Filter by stop ID and/or route ID. Returns predicted arrival and departure times.\n" +
      "Covers subway (Red, Orange, Blue, Green Lines), commuter rail, bus, and ferry.",
    annotations: { title: "MBTA: Predictions", readOnlyHint: true },
    parameters: z.object({
      stop: z.string().optional().describe("Stop ID (e.g. 'place-north' for North Station, 'place-sstat' for South Station)"),
      route: z.string().optional().describe("Route ID (e.g. 'Red', 'Orange', 'Green-B', 'CR-Fitchburg', '1' for bus)"),
      limit: z.number().int().max(50).optional().describe("Max predictions to return (default 10)"),
    }),
    execute: async (args) => {
      const resp = await getPredictions({
        stop: args.stop,
        route: args.route,
        limit: args.limit,
      });
      const data = resp.data ?? [];
      if (!data.length) return emptyResponse("No predictions found for the given stop/route.");
      const rows = data.map((p) => ({
        id: p.id,
        arrival_time: p.attributes.arrival_time,
        departure_time: p.attributes.departure_time,
        direction_id: p.attributes.direction_id,
        status: p.attributes.status,
      }));
      return tableResponse(`${rows.length} MBTA prediction(s)`, { rows: rows as Record<string, unknown>[], total: rows.length });
    },
  },

  {
    name: "mbta_vehicles",
    description:
      "Get live vehicle positions for MBTA (Boston) transit.\n" +
      "Returns GPS coordinates, speed, bearing, and current status for active vehicles.\n" +
      "Optionally filter by route.",
    annotations: { title: "MBTA: Vehicles", readOnlyHint: true },
    parameters: z.object({
      route: z.string().optional().describe("Route ID to filter (e.g. 'Red', 'Green-B', 'CR-Worcester')"),
      limit: z.number().int().max(100).optional().describe("Max vehicles to return (default 20)"),
    }),
    execute: async (args) => {
      const resp = await getVehicles({
        route: args.route,
        limit: args.limit,
      });
      const data = resp.data ?? [];
      if (!data.length) return emptyResponse("No active vehicles found for the given route.");
      const rows = data.map((v) => ({
        id: v.id,
        latitude: v.attributes.latitude,
        longitude: v.attributes.longitude,
        bearing: v.attributes.bearing,
        speed: v.attributes.speed,
        current_status: v.attributes.current_status,
        updated_at: v.attributes.updated_at,
      }));
      return tableResponse(`${rows.length} active MBTA vehicle(s)`, { rows: rows as Record<string, unknown>[], total: rows.length });
    },
  },

  {
    name: "mbta_alerts",
    description:
      "Get service alerts for MBTA (Boston) transit.\n" +
      "Returns active alerts including delays, suspensions, detours, and planned service changes.\n" +
      "Optionally filter by route.",
    annotations: { title: "MBTA: Alerts", readOnlyHint: true },
    parameters: z.object({
      route: z.string().optional().describe("Route ID to filter (e.g. 'Red', 'Orange', 'CR-Fitchburg')"),
      limit: z.number().int().max(50).optional().describe("Max alerts to return (default 20)"),
    }),
    execute: async (args) => {
      const resp = await getAlerts({
        route: args.route,
        limit: args.limit,
      });
      const data = resp.data ?? [];
      if (!data.length) return emptyResponse("No active alerts found.");
      const rows = data.map((a) => ({
        id: a.id,
        header: a.attributes.header,
        effect: a.attributes.effect,
        severity: a.attributes.severity,
        lifecycle: a.attributes.lifecycle,
        description: a.attributes.description,
      }));
      return tableResponse(`${rows.length} MBTA alert(s)`, { rows: rows as Record<string, unknown>[], total: rows.length });
    },
  },

  {
    name: "mbta_routes",
    description:
      "List MBTA (Boston) transit routes.\n" +
      "Optionally filter by type: 0=Light Rail (Green Line), 1=Heavy Rail (Red/Orange/Blue), 2=Commuter Rail, 3=Bus, 4=Ferry.",
    annotations: { title: "MBTA: Routes", readOnlyHint: true },
    parameters: z.object({
      type: z.number().int().min(0).max(4).optional().describe("Route type: 0=Light Rail, 1=Heavy Rail, 2=Commuter Rail, 3=Bus, 4=Ferry"),
      limit: z.number().int().max(200).optional().describe("Max routes to return (default 50)"),
    }),
    execute: async (args) => {
      const resp = await getRoutes({
        type: args.type,
        limit: args.limit,
      });
      const data = resp.data ?? [];
      if (!data.length) return emptyResponse("No routes found for the given type.");
      const rows = data.map((r) => ({
        id: r.id,
        long_name: r.attributes.long_name,
        short_name: r.attributes.short_name,
        description: r.attributes.description,
        type: r.attributes.type,
        color: r.attributes.color,
      }));
      return tableResponse(`${rows.length} MBTA route(s)`, { rows: rows as Record<string, unknown>[], total: rows.length });
    },
  },
];
