/**
 * ecfr MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchCFR, getTitleStructure, getSectionContent } from "./sdk.js";
import { listResponse, recordResponse, emptyResponse, cleanHtml } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "ecfr_search",
    description:
      "Search the Code of Federal Regulations (CFR) by keyword. " +
      "Returns matching regulation sections with titles, parts, and context snippets.\n\n" +
      "The CFR contains all federal regulations organized into 50 titles by subject area " +
      "(e.g. Title 21 = Food and Drugs, Title 26 = Internal Revenue, Title 40 = Environment).",
    annotations: { title: "eCFR: Search Regulations", readOnlyHint: true },
    parameters: z.object({
      query: z.string().describe("Search keywords (e.g. 'clean water discharge', 'food labeling requirements')"),
      limit: z.number().int().positive().max(50).optional().describe("Max results per page (default: 20, max: 50)"),
      page: z.number().int().positive().optional().describe("Page number for pagination (default: 1)"),
    }),
    execute: async ({ query, limit, page }) => {
      const result = await searchCFR({ query, limit, page });

      if (!result.results || result.results.length === 0) {
        return emptyResponse(`No CFR regulations found for "${query}".`);
      }

      return listResponse(
        `CFR search "${query}": ${result.results.length} results${result.total_count ? ` of ${result.total_count} total` : ""}`,
        {
          items: result.results,
          total: result.total_count,
          meta: { query, limit: limit ?? 20, page: page ?? 1 },
        },
      );
    },
  },

  {
    name: "ecfr_title_structure",
    description:
      "Get the organizational structure of a CFR title — shows all parts, subparts, and sections. " +
      "Useful for browsing what regulations exist within a title before reading specific sections.\n\n" +
      "Common titles: 7 (Agriculture), 12 (Banks), 14 (Aviation), 21 (Food & Drugs), " +
      "26 (Internal Revenue), 29 (Labor), 40 (Environment), 42 (Public Health), 47 (Telecommunications).",
    annotations: { title: "eCFR: Title Structure", readOnlyHint: true },
    parameters: z.object({
      title: z.number().int().min(1).max(50).describe("CFR title number (1-50)"),
      date: z.string().optional().describe("Date for version (YYYY-MM-DD format, default: today). Use past dates for historical versions."),
    }),
    execute: async ({ title, date }) => {
      const effectiveDate = date || new Date().toISOString().split("T")[0];
      const structure = await getTitleStructure({ date: effectiveDate, title });

      return recordResponse(
        `CFR Title ${title} structure (as of ${effectiveDate})`,
        structure,
        { title, date: effectiveDate },
      );
    },
  },

  {
    name: "ecfr_section",
    description:
      "Get the full text of a specific CFR section or part. Returns the rendered regulation content.\n\n" +
      "Use ecfr_search or ecfr_title_structure first to find the title, part, and section numbers.",
    annotations: { title: "eCFR: Read Section", readOnlyHint: true },
    parameters: z.object({
      title: z.number().int().min(1).max(50).describe("CFR title number (1-50)"),
      part: z.string().describe("Part number within the title (e.g. '314', '58', '131')"),
      section: z.string().optional().describe("Section number within the part (e.g. '50', '1', '3'). Omit to get the entire part."),
      date: z.string().optional().describe("Date for version (YYYY-MM-DD format, default: today)"),
    }),
    execute: async ({ title, part, section, date }) => {
      const effectiveDate = date || new Date().toISOString().split("T")[0];
      const content = await getSectionContent({ date: effectiveDate, title, part, section });

      const label = section
        ? `${title} CFR \u00A7${part}.${section}`
        : `${title} CFR Part ${part}`;

      return recordResponse(
        `${label} (as of ${effectiveDate})`,
        { content: cleanHtml(content) },
        { title, part, section, date: effectiveDate },
      );
    },
  },
];
