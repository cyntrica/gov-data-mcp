/**
 * nara MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchRecords, getRecord } from "./sdk.js";
import { listResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "nara_search",
    description:
      "Search the National Archives catalog for historical records, documents, photographs, and government publications.\n" +
      "Returns record metadata including titles, descriptions, dates, and links to digitized content.\n" +
      "Rate limited to 10,000 queries/month.",
    annotations: { title: "NARA: Search Records", readOnlyHint: true },
    parameters: z.object({
      query: z.string().describe("Search keywords: 'civil war', 'moon landing', 'constitution', 'executive order'"),
      limit: z.number().int().max(100).optional().describe("Results to return (default 20, max 100)"),
      offset: z.number().int().optional().describe("Offset for pagination (default 0)"),
    }),
    execute: async (args) => {
      const data = await searchRecords(args);
      const results = data.opaResponse?.results?.result ?? [];
      const totalResults = data.opaResponse?.results?.totalResults ?? 0;
      if (!results.length) return emptyResponse("No National Archives records found matching the search criteria.");
      return listResponse(
        `NARA records: ${totalResults} total matches, showing ${results.length}`,
        { items: results, total: totalResults },
      );
    },
  },

  {
    name: "nara_record",
    description:
      "Get full details for a specific National Archives record by NARA ID.\n" +
      "Returns complete metadata, descriptions, creators, and links to digitized content when available.",
    annotations: { title: "NARA: Record Detail", readOnlyHint: true },
    parameters: z.object({
      nara_id: z.string().describe("NARA record ID (from search results)"),
    }),
    execute: async ({ nara_id }) => {
      const data = await getRecord(nara_id);
      const record = data.opaResponse?.result;
      if (!record) return emptyResponse(`No National Archives record found with ID: ${nara_id}`);
      return recordResponse(
        `NARA record #${nara_id}: ${(record as any).title ?? (record as any).description?.title ?? "Unknown"}`,
        record,
      );
    },
  },
];
