/**
 * ita-trade MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchTariffRates, searchTradeEvents } from "./sdk.js";
import { tableResponse, listResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "ita_tariff_rates",
    description:
      "Search Free Trade Agreement (FTA) tariff rates by HTS code, partner country, or keyword.\n" +
      "Returns tariff lines, rates, base rates, final year, and rule text for products covered by U.S. FTAs.",
    annotations: { title: "ITA: Tariff Rates", readOnlyHint: true },
    parameters: z.object({
      query: z.string().optional().describe("Keyword search (e.g. 'steel', 'automotive')"),
      hts_subheading: z.string().optional().describe("HTS subheading code (6-digit, e.g. '7206.10')"),
      partner_country: z.string().optional().describe("Partner country name (e.g. 'Korea', 'Colombia')"),
      limit: z.number().int().max(100).optional().describe("Max results (default 25)"),
    }),
    execute: async (args) => {
      const data = await searchTariffRates({
        query: args.query,
        htsSubheading: args.hts_subheading,
        partnerCountry: args.partner_country,
        limit: args.limit,
      });
      if (!data.results?.length) return emptyResponse("No tariff rates found for the given criteria.");
      return tableResponse(
        `${data.results.length} of ${data.total} tariff rate(s)`,
        { rows: data.results as Record<string, unknown>[], total: data.total },
      );
    },
  },

  {
    name: "ita_trade_events",
    description:
      "Search international trade events including trade shows, trade missions, and seminars.\n" +
      "Find upcoming events by keyword or country to help U.S. businesses expand internationally.",
    annotations: { title: "ITA: Trade Events", readOnlyHint: true },
    parameters: z.object({
      query: z.string().optional().describe("Keyword search (e.g. 'technology', 'agriculture')"),
      country: z.string().optional().describe("Country name (e.g. 'Japan', 'Germany')"),
      limit: z.number().int().max(100).optional().describe("Max results (default 25)"),
    }),
    execute: async (args) => {
      const data = await searchTradeEvents({
        query: args.query,
        country: args.country,
        limit: args.limit,
      });
      if (!data.results?.length) return emptyResponse("No trade events found for the given criteria.");
      return listResponse(
        `${data.results.length} of ${data.total} trade event(s)`,
        { items: data.results as Record<string, unknown>[], total: data.total },
      );
    },
  },
];
