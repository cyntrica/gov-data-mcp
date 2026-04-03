/**
 * fmcsa MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchCarriersByName, searchCarriersByState, getCarrierDetail } from "./sdk.js";
import { tableResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "fmcsa_carrier_search",
    description:
      "Search motor carriers registered with FMCSA by company name, DOT number, or state.\n" +
      "Returns carrier profiles including legal name, DBA, state, driver count, power units, and safety rating.\n" +
      "Use to find trucking companies, bus companies, and other motor carriers.",
    annotations: { title: "FMCSA: Carrier Search", readOnlyHint: true },
    parameters: z.object({
      name: z.string().optional().describe("Carrier legal name or partial name (e.g. 'Swift', 'Werner')"),
      state: z.string().optional().describe("2-letter state code (e.g. 'TX', 'CA')"),
      dot_number: z.number().int().optional().describe("DOT number for a specific carrier"),
    }),
    execute: async (args) => {
      if (args.dot_number) {
        const carrier = await getCarrierDetail(args.dot_number);
        if (!carrier) return emptyResponse(`No carrier found with DOT number ${args.dot_number}.`);
        return recordResponse(`Carrier DOT #${args.dot_number}`, carrier as Record<string, unknown>);
      }
      if (args.name) {
        const results = await searchCarriersByName(args.name);
        if (!results.length) return emptyResponse(`No carriers found matching '${args.name}'.`);
        return tableResponse(`${results.length} carrier(s) matching '${args.name}'`, { rows: results as Record<string, unknown>[] });
      }
      if (args.state) {
        const results = await searchCarriersByState(args.state);
        if (!results.length) return emptyResponse(`No carriers found in state '${args.state}'.`);
        return tableResponse(`${results.length} carrier(s) in ${args.state}`, { rows: results as Record<string, unknown>[] });
      }
      return emptyResponse("Provide at least one of: name, state, or dot_number.");
    },
  },

  {
    name: "fmcsa_carrier_detail",
    description:
      "Get the full safety profile for a motor carrier by DOT number.\n" +
      "Returns detailed information including safety rating, inspection results, crash data, driver counts, and operational details.",
    annotations: { title: "FMCSA: Carrier Detail", readOnlyHint: true },
    parameters: z.object({
      dot_number: z.number().int().describe("DOT number of the carrier"),
    }),
    execute: async (args) => {
      const carrier = await getCarrierDetail(args.dot_number);
      if (!carrier) return emptyResponse(`No carrier found with DOT number ${args.dot_number}.`);
      return recordResponse(
        `${carrier.legalName ?? "Carrier"} (DOT #${args.dot_number})`,
        carrier as Record<string, unknown>,
      );
    },
  },
];
