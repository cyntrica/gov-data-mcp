/**
 * cftc MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import {
  getLegacyCot,
  getDisaggregatedCot,
  getTffCot,
  getCitCot,
  getProducts,
} from "./sdk.js";
import { tableResponse, listResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "cftc_cot_legacy",
    description:
      "Get Legacy Commitments of Traders (COT) report data from CFTC.\n" +
      "Shows commercial vs non-commercial (speculative) positions in futures markets.\n" +
      "Covers all U.S. futures exchanges: commodities, financials, currencies.\n" +
      "Use futures_only=true for futures-only, false for combined futures+options.",
    annotations: { title: "CFTC: Legacy COT Report", readOnlyHint: true },
    parameters: z.object({
      futures_only: z.boolean().optional().default(true).describe("true = futures only (default), false = combined futures+options"),
      market_name: z.string().optional().describe("Filter by market/commodity name: 'WHEAT', 'CRUDE OIL', 'S&P 500', 'GOLD'"),
      limit: z.number().int().max(50000).optional().describe("Max rows to return (default 100, max 50000)"),
      offset: z.number().int().optional().describe("Offset for pagination"),
    }),
    execute: async (args) => {
      const data = await getLegacyCot({
        futuresOnly: args.futures_only,
        marketName: args.market_name,
        limit: args.limit,
        offset: args.offset,
      });
      if (!data.length) return emptyResponse("No Legacy COT data found matching the criteria.");
      return tableResponse(
        `CFTC Legacy COT: ${data.length} rows${args.market_name ? ` for '${args.market_name}'` : ""}`,
        { rows: data },
      );
    },
  },

  {
    name: "cftc_cot_disaggregated",
    description:
      "Get Disaggregated Commitments of Traders (COT) report data from CFTC.\n" +
      "Breaks positions into: Producer/Merchant/Processor/User, Swap Dealers, Managed Money, Other Reportables.\n" +
      "More granular than Legacy report. Covers physical commodities (not financial futures).",
    annotations: { title: "CFTC: Disaggregated COT Report", readOnlyHint: true },
    parameters: z.object({
      futures_only: z.boolean().optional().default(true).describe("true = futures only (default), false = combined futures+options"),
      market_name: z.string().optional().describe("Filter by market/commodity: 'NATURAL GAS', 'CORN', 'SOYBEANS'"),
      limit: z.number().int().max(50000).optional().describe("Max rows (default 100, max 50000)"),
      offset: z.number().int().optional().describe("Offset for pagination"),
    }),
    execute: async (args) => {
      const data = await getDisaggregatedCot({
        futuresOnly: args.futures_only,
        marketName: args.market_name,
        limit: args.limit,
        offset: args.offset,
      });
      if (!data.length) return emptyResponse("No Disaggregated COT data found matching the criteria.");
      return tableResponse(
        `CFTC Disaggregated COT: ${data.length} rows${args.market_name ? ` for '${args.market_name}'` : ""}`,
        { rows: data },
      );
    },
  },

  {
    name: "cftc_cot_tff",
    description:
      "Get Traders in Financial Futures (TFF) report data from CFTC.\n" +
      "Covers financial futures only: Dealer/Intermediary, Asset Manager/Institutional, Leveraged Funds, Other Reportables.\n" +
      "Use for S&P 500, Treasury bonds, Eurodollars, VIX, currency futures.",
    annotations: { title: "CFTC: Traders in Financial Futures", readOnlyHint: true },
    parameters: z.object({
      futures_only: z.boolean().optional().default(true).describe("true = futures only (default), false = combined futures+options"),
      market_name: z.string().optional().describe("Filter by market: 'S&P 500', 'UST 10Y NOTE', 'VIX', 'EURO FX'"),
      limit: z.number().int().max(50000).optional().describe("Max rows (default 100, max 50000)"),
      offset: z.number().int().optional().describe("Offset for pagination"),
    }),
    execute: async (args) => {
      const data = await getTffCot({
        futuresOnly: args.futures_only,
        marketName: args.market_name,
        limit: args.limit,
        offset: args.offset,
      });
      if (!data.length) return emptyResponse("No TFF report data found matching the criteria.");
      return tableResponse(
        `CFTC TFF: ${data.length} rows${args.market_name ? ` for '${args.market_name}'` : ""}`,
        { rows: data },
      );
    },
  },

  {
    name: "cftc_cot_cit",
    description:
      "Get Supplemental Commodity Index Trader (CIT) report data from CFTC.\n" +
      "Supplements the Legacy report with positions of Commodity Index Traders.\n" +
      "Covers 13 selected agricultural commodity markets only.",
    annotations: { title: "CFTC: Supplemental CIT Report", readOnlyHint: true },
    parameters: z.object({
      market_name: z.string().optional().describe("Filter by market: 'WHEAT', 'CORN', 'SOYBEANS', 'COTTON', 'SUGAR'"),
      limit: z.number().int().max(50000).optional().describe("Max rows (default 100, max 50000)"),
      offset: z.number().int().optional().describe("Offset for pagination"),
    }),
    execute: async (args) => {
      const data = await getCitCot({
        marketName: args.market_name,
        limit: args.limit,
        offset: args.offset,
      });
      if (!data.length) return emptyResponse("No Supplemental CIT data found matching the criteria.");
      return tableResponse(
        `CFTC Supplemental CIT: ${data.length} rows${args.market_name ? ` for '${args.market_name}'` : ""}`,
        { rows: data },
      );
    },
  },

  {
    name: "cftc_products",
    description:
      "List available products and markets tracked by CFTC.\n" +
      "Use to discover market names before querying COT reports.\n" +
      "Search by keyword to find specific commodities, currencies, or financial instruments.",
    annotations: { title: "CFTC: List Products/Markets", readOnlyHint: true },
    parameters: z.object({
      search: z.string().optional().describe("Search keyword: 'wheat', 'crude', 'treasury', 'euro'"),
    }),
    execute: async (args) => {
      const data = await getProducts(args.search);
      if (!data.length) return emptyResponse(`No products found${args.search ? ` matching '${args.search}'` : ""}.`);
      return listResponse(
        `CFTC products: ${data.length} results${args.search ? ` for '${args.search}'` : ""}`,
        { items: data },
      );
    },
  },
];
