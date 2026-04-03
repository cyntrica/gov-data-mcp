/**
 * smithsonian MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchCollections, getRecord } from "./sdk.js";
import { listResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "smithsonian_search",
    description:
      "Search Smithsonian Institution collections (11M+ records across all museums). " +
      "Filter by keyword, museum, date. Returns matching records with basic metadata.\n\n" +
      "Covers: National Air and Space Museum, American History, Natural History, American Art, and more.",
    annotations: { title: "Smithsonian: Search Collections", readOnlyHint: true },
    parameters: z.object({
      query: z.string().describe("Search query — keywords, object name, artist, topic. Supports museum unit codes in query (e.g. 'unit_code:NASM airplane')"),
      limit: z.number().int().positive().max(100).optional().describe("Max results to return (default: 10, max: 100)"),
      offset: z.number().int().min(0).optional().describe("Starting offset for pagination (default: 0)"),
    }),
    execute: async ({ query, limit, offset }) => {
      const result = await searchCollections({ query, limit, offset });

      if (!result.rows || result.rows.length === 0) {
        return emptyResponse(`No Smithsonian records found for "${query}".`);
      }

      return listResponse(
        `Smithsonian search "${query}": ${result.rows.length} of ${result.rowCount} total records`,
        {
          items: result.rows,
          total: result.rowCount,
          meta: { query, limit: limit ?? 10, offset: offset ?? 0 },
        },
      );
    },
  },

  {
    name: "smithsonian_detail",
    description:
      "Get full details of a Smithsonian collection record by ID, including images, " +
      "provenance, dimensions, and extended metadata. Use smithsonian_search first to find record IDs.",
    annotations: { title: "Smithsonian: Record Detail", readOnlyHint: true },
    parameters: z.object({
      id: z.string().describe("Smithsonian record ID (from search results)"),
    }),
    execute: async ({ id }) => {
      const record = await getRecord(id);
      return recordResponse(
        `Smithsonian record: ${record.title || id}`,
        record,
      );
    },
  },
];
