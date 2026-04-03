/**
 * OFAC MCP tools — sanctions list search and browsing.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getSdnList, getConsolidatedList, searchSanctions, filterSanctions, getExports } from "./sdk.js";
import { listResponse, tableResponse, emptyResponse, recordResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "ofac_sdn_list",
    description:
      "Get the OFAC SDN (Specially Designated Nationals) list — primary U.S. sanctions targets.\nReturns top entries. Large list; use limit to control size.",
    annotations: { title: "OFAC: SDN List", readOnlyHint: true },
    parameters: z.object({
      limit: z.number().optional().describe("Max entries to return (default: 100)"),
    }),
    execute: async ({ limit }) => {
      const items = await getSdnList({ limit: limit ?? 100 });
      if (!items.length) return emptyResponse("No SDN entries found.");
      return listResponse(
        `OFAC SDN list: ${items.length} entries`,
        { items, total: items.length },
      );
    },
  },

  {
    name: "ofac_consolidated_list",
    description:
      "Get the consolidated non-SDN sanctions list (sectoral sanctions, foreign sanctions evaders, etc.).",
    annotations: { title: "OFAC: Consolidated List", readOnlyHint: true },
    parameters: z.object({
      limit: z.number().optional().describe("Max entries to return (default: 100)"),
    }),
    execute: async ({ limit }) => {
      const items = await getConsolidatedList({ limit: limit ?? 100 });
      if (!items.length) return emptyResponse("No consolidated list entries found.");
      return listResponse(
        `OFAC consolidated list: ${items.length} entries`,
        { items, total: items.length },
      );
    },
  },

  {
    name: "ofac_search",
    description:
      "Search OFAC SDN sanctions list by name or entity (case-insensitive substring match).",
    annotations: { title: "OFAC: Search Sanctions", readOnlyHint: true },
    parameters: z.object({
      name: z.string().describe("Name or entity to search for"),
      limit: z.number().optional().describe("Max results (default: 50)"),
    }),
    execute: async ({ name, limit }) => {
      const items = await searchSanctions({ name, limit: limit ?? 50 });
      if (!items.length) return emptyResponse(`No sanctions matches for "${name}".`);
      return listResponse(
        `OFAC search "${name}": ${items.length} matches`,
        { items, total: items.length },
      );
    },
  },

  {
    name: "ofac_filter",
    description:
      "Filter OFAC SDN list by program, entity type, or country (substring match).\nAt least one filter parameter should be provided.",
    annotations: { title: "OFAC: Filter Sanctions", readOnlyHint: true },
    parameters: z.object({
      entity_type: z.string().optional().describe("Entity type filter (e.g. 'Individual', 'Entity', 'Vessel')"),
      program: z.string().optional().describe("Sanctions program filter (e.g. 'SDGT', 'IRAN', 'CYBER2')"),
      country: z.string().optional().describe("Country filter (e.g. 'Iran', 'Russia', 'Cuba')"),
      limit: z.number().optional().describe("Max results (default: 100)"),
    }),
    execute: async ({ entity_type, program, country, limit }) => {
      const items = await filterSanctions({ entityType: entity_type, program, country, limit: limit ?? 100 });
      if (!items.length) return emptyResponse("No sanctions entries match the specified filters.");
      return tableResponse(
        `OFAC filtered results: ${items.length} entries`,
        { rows: items, total: items.length },
      );
    },
  },

  {
    name: "ofac_exports",
    description:
      "List available OFAC sanctions data export files and formats.",
    annotations: { title: "OFAC: Available Exports", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const data = await getExports();
      const items = Array.isArray(data) ? data : [];
      if (!items.length) return recordResponse("OFAC exports", data as Record<string, unknown>);
      return listResponse(
        `OFAC exports: ${items.length} available`,
        { items, total: items.length },
      );
    },
  },
];
