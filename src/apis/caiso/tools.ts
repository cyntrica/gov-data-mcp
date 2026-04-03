/**
 * caiso MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getSignal, type MidasSignalValue } from "./sdk.js";
import { timeseriesResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "caiso_signal",
    description:
      "Get California ISO real-time grid signals — time-varying electricity rates, " +
      "greenhouse gas (GHG) emission intensity, or Flex Alert demand response signals.\n\n" +
      "Signal types:\n" +
      "- rates: Time-varying electricity rates\n" +
      "- GHG: Greenhouse gas emission signal (carbon intensity)\n" +
      "- FlexAlert: Active Flex Alert signals (grid stress / demand response events)",
    annotations: { title: "CAISO: Grid Signal Data", readOnlyHint: true },
    parameters: z.object({
      signal_type: z.enum(["rates", "GHG", "FlexAlert"]).describe(
        "Signal type: 'rates' (electricity rates), 'GHG' (greenhouse gas intensity), 'FlexAlert' (demand response alerts)",
      ),
    }),
    execute: async ({ signal_type }) => {
      const res = await getSignal(signal_type);
      const data = (res.data || []) as MidasSignalValue[];

      if (!data.length) return emptyResponse(`No CAISO ${signal_type} signal data found.`);

      const rows = data.map(d => ({
        timestamp: d.timestamp || d.dateTime || "",
        value: d.value != null ? Number(d.value) : null,
        signalType: d.signalType || signal_type,
      }));

      return timeseriesResponse(
        `CAISO ${signal_type} signal: ${rows.length} observations`,
        {
          rows,
          dateKey: "timestamp",
          valueKey: "value",
          extraFields: ["signalType"],
          meta: { signalType: signal_type },
        },
      );
    },
  },
];
