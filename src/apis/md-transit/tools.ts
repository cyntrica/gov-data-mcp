/**
 * Maryland MTA Transit MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import {
  getGTFSFeeds, getRealtimeFeeds, getSwiftlyVehicles, getSwiftlyTripUpdates,
  SWIFTLY_AGENCIES,
} from "./sdk.js";
import { listResponse, recordResponse, emptyResponse } from "../../shared/response.js";
import { keysEnum, describeEnum } from "../../shared/enum-utils.js";

export const tools: Tool<any, any>[] = [
  {
    name: "md_transit_feeds",
    description:
      "Get Maryland MTA GTFS feed URLs for all transit modes.\n" +
      "Returns download URLs for static schedule data (ZIP archives containing GTFS CSVs).\n" +
      "Modes: Local Bus, Light Rail, Metro Subway, MARC Train, Commuter Bus.\n" +
      "Also includes real-time feed URLs (protobuf format) for MARC train and service alerts.",
    annotations: { title: "Maryland Transit: Feed URLs", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const static_ = getGTFSFeeds();
      const realtime = getRealtimeFeeds();
      return recordResponse("Maryland MTA GTFS feeds", {
        staticFeeds: static_,
        realtimeFeeds: realtime,
        note: "Static feeds are ZIP archives with GTFS CSVs. Real-time feeds are protobuf format.",
      });
    },
  },

  {
    name: "md_transit_vehicles",
    description:
      "Get real-time vehicle positions for Maryland MTA transit.\n" +
      "Requires SWIFTLY_API_KEY environment variable (free, request from MTA).\n" +
      `Agencies: ${describeEnum(SWIFTLY_AGENCIES as Record<string, string>)}.`,
    annotations: { title: "Maryland Transit: Vehicle Positions", readOnlyHint: true },
    parameters: z.object({
      agency: z.enum(keysEnum(SWIFTLY_AGENCIES)).describe("Swiftly agency key"),
    }),
    execute: async ({ agency }) => {
      try {
        const data = await getSwiftlyVehicles(agency);
        return recordResponse(
          `MTA ${SWIFTLY_AGENCIES[agency as keyof typeof SWIFTLY_AGENCIES]} vehicles`,
          data,
        );
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        if (msg.includes("401") || msg.includes("403")) {
          return emptyResponse("SWIFTLY_API_KEY required. Request a free key from MTA developer resources.");
        }
        throw e;
      }
    },
  },

  {
    name: "md_transit_trip_updates",
    description:
      "Get real-time trip updates (delays, cancellations) for Maryland MTA transit.\n" +
      "Requires SWIFTLY_API_KEY environment variable (free, request from MTA).\n" +
      `Agencies: ${describeEnum(SWIFTLY_AGENCIES as Record<string, string>)}.`,
    annotations: { title: "Maryland Transit: Trip Updates", readOnlyHint: true },
    parameters: z.object({
      agency: z.enum(keysEnum(SWIFTLY_AGENCIES)).describe("Swiftly agency key"),
    }),
    execute: async ({ agency }) => {
      try {
        const data = await getSwiftlyTripUpdates(agency);
        return recordResponse(
          `MTA ${SWIFTLY_AGENCIES[agency as keyof typeof SWIFTLY_AGENCIES]} trip updates`,
          data,
        );
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        if (msg.includes("401") || msg.includes("403")) {
          return emptyResponse("SWIFTLY_API_KEY required. Request a free key from MTA developer resources.");
        }
        throw e;
      }
    },
  },
];
