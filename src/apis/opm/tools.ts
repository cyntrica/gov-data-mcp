/**
 * opm MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import {
  getCurrentStatus,
  getStatusHistory,
  getStatusTypes,
} from "./sdk.js";
import { listResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "opm_current_status",
    description:
      "Get the current federal government operating status for the Washington, DC area.\n" +
      "Returns status title, summary, messages, and posting date.\n" +
      "Covers weather closures, emergencies, and other events affecting federal offices.\n" +
      "Optionally query a specific date's status using MM/DD/YYYY format.",
    annotations: { title: "OPM: Current Operating Status", readOnlyHint: true },
    parameters: z.object({
      date: z.string().optional().describe("Specific date to query (MM/DD/YYYY format). Omit for current status."),
      useutc: z.boolean().optional().describe("Return times in UTC (default: false, returns Eastern time)"),
    }),
    execute: async (args) => {
      const data = await getCurrentStatus({
        date: args.date,
        useutc: args.useutc,
      });

      if (!data || (!data.StatusTitle && !data.ShortStatusMessage)) {
        return emptyResponse("No operating status information available.");
      }

      return recordResponse(
        data.StatusTitle ?? "Federal Operating Status",
        {
          statusTitle: data.StatusTitle,
          statusType: data.StatusType,
          location: data.Location,
          shortMessage: data.ShortStatusMessage,
          longMessage: data.LongStatusMessage,
          summary: data.StatusSummary,
          datePosted: data.DateStatusPosted,
          icon: data.Icon,
        },
      );
    },
  },

  {
    name: "opm_status_history",
    description:
      "Get historical federal government operating status records.\n" +
      "Returns past status changes including closures, delays, and early departures.\n" +
      "Supports pagination with startrow and count parameters (max 5000 per request).",
    annotations: { title: "OPM: Operating Status History", readOnlyHint: true },
    parameters: z.object({
      startrow: z.number().int().optional().describe("Starting row for pagination (zero-indexed)"),
      count: z.number().int().max(5000).optional().describe("Number of records to return (default varies, max 5000)"),
    }),
    execute: async (args) => {
      const data = await getStatusHistory({
        startrow: args.startrow,
        count: args.count,
      });

      const results = Array.isArray(data) ? data : [];
      if (!results.length) return emptyResponse("No historical status records found.");

      return listResponse(
        `OPM Operating Status History: ${results.length} records`,
        {
          items: results.map(record => ({
            statusTitle: record.StatusTitle,
            statusType: record.StatusType,
            location: record.Location,
            shortMessage: record.ShortStatusMessage,
            datePosted: record.DateStatusPosted,
          })),
        },
      );
    },
  },

  {
    name: "opm_status_types",
    description:
      "List all possible federal government operating status types.\n" +
      "Returns reference data for status categories: Open, Closed, Delayed Arrival, Early Departure, etc.",
    annotations: { title: "OPM: Status Types", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const data = await getStatusTypes();

      const results = Array.isArray(data) ? data : [];
      if (!results.length) return emptyResponse("No status types found.");

      return listResponse(
        `OPM Status Types: ${results.length} types`,
        {
          items: results,
        },
      );
    },
  },
];
