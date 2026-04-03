/**
 * openstates MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchBills, getBillDetail, searchLegislators } from "./sdk.js";
import { listResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "openstates_bills",
    description:
      "Search bills across all 50 state legislatures.\n" +
      "Filter by state (jurisdiction), keyword query, and legislative session.\n" +
      "Returns bill identifiers, titles, sessions, and sponsors.",
    annotations: { title: "OpenStates: Search Bills", readOnlyHint: true },
    parameters: z.object({
      jurisdiction: z.string().optional().describe("State abbreviation lowercase: 'ca', 'tx', 'ny', 'fl'"),
      query: z.string().optional().describe("Search term: 'climate', 'housing', 'education'"),
      session: z.string().optional().describe("Legislative session: '2023-2024', '2023'"),
      page: z.number().int().optional().describe("Page number (default 1)"),
      limit: z.number().int().max(50).optional().describe("Results per page (default 20, max 50)"),
    }),
    execute: async (args) => {
      const data = await searchBills(args);
      const results = data.results ?? [];
      if (!results.length) return emptyResponse("No bills found matching the search criteria.");
      return listResponse(
        `OpenStates bills: ${data.pagination.total_items} total, page ${data.pagination.page} of ${data.pagination.max_page}`,
        { items: results, total: data.pagination.total_items },
      );
    },
  },

  {
    name: "openstates_bill_detail",
    description:
      "Get full details for a specific state bill by its OpenStates ID.\n" +
      "Returns complete bill information including sponsors, actions, votes, and documents.",
    annotations: { title: "OpenStates: Bill Detail", readOnlyHint: true },
    parameters: z.object({
      openstates_id: z.string().describe("OpenStates bill ID (e.g. 'ocd-bill/abc123-def456') from search results"),
    }),
    execute: async ({ openstates_id }) => {
      const data = await getBillDetail(openstates_id);
      if (!data) return emptyResponse(`No bill found with ID: ${openstates_id}`);
      return recordResponse(
        `Bill: ${(data as any).title ?? openstates_id}`,
        data,
      );
    },
  },

  {
    name: "openstates_legislators",
    description:
      "Search state legislators across all 50 states.\n" +
      "Filter by state (jurisdiction) and name.\n" +
      "Returns legislator names, parties, chambers, districts, and contact info.",
    annotations: { title: "OpenStates: Search Legislators", readOnlyHint: true },
    parameters: z.object({
      jurisdiction: z.string().optional().describe("State abbreviation lowercase: 'ca', 'tx', 'ny'"),
      name: z.string().optional().describe("Legislator name to search: 'Smith', 'Garcia'"),
      page: z.number().int().optional().describe("Page number (default 1)"),
      limit: z.number().int().max(50).optional().describe("Results per page (default 20, max 50)"),
    }),
    execute: async (args) => {
      const data = await searchLegislators(args);
      const results = data.results ?? [];
      if (!results.length) return emptyResponse("No legislators found matching the search criteria.");
      return listResponse(
        `OpenStates legislators: ${data.pagination.total_items} total, page ${data.pagination.page} of ${data.pagination.max_page}`,
        { items: results, total: data.pagination.total_items },
      );
    },
  },
];
