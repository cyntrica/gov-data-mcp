/**
 * usitc MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getTradeData } from "./sdk.js";
import { tableResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "usitc_trade_data",
    description:
      "Query U.S. import/export trade statistics from the USITC DataWeb.\n" +
      "Search by HTS (Harmonized Tariff Schedule) code, partner country, year, and trade type.\n" +
      "Returns trade values, quantities, and product descriptions.",
    annotations: { title: "USITC: Trade Data", readOnlyHint: true },
    parameters: z.object({
      hts_code: z.string().optional().describe("HTS code (e.g. '8471' for computers, '0901' for coffee)"),
      country_code: z.string().optional().describe("ISO 3-letter partner country code (e.g. 'CHN', 'MEX', 'CAN')"),
      year: z.string().optional().describe("Year (e.g. '2023')"),
      trade_type: z.enum(["import", "export", "balance"]).optional().describe("Trade type (default: 'import')"),
    }),
    execute: async (args) => {
      const data = await getTradeData({
        htsCode: args.hts_code,
        countryCode: args.country_code,
        year: args.year,
        tradeType: args.trade_type,
      });
      if (!Array.isArray(data) || !data.length) {
        return emptyResponse("No trade data found for the given criteria.");
      }
      const tradeType = args.trade_type ?? "import";
      return tableResponse(
        `${data.length} ${tradeType} trade record(s)`,
        { rows: data as Record<string, unknown>[] },
      );
    },
  },
];
