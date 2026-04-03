import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchPublications } from "./sdk.js";
import { listResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "doe_publications",
    description: "Search DOE-funded scientific publications and technical reports.\nCovers research from national labs and universities funded by the Department of Energy.\nFilter by keyword, author, title, subject, and date range.",
    annotations: { title: "DOE OSTI: Publications Search", readOnlyHint: true },
    parameters: z.object({
      query: z.string().optional().describe("Full-text search query"),
      author: z.string().optional().describe("Author name"),
      title: z.string().optional().describe("Title search"),
      subject: z.string().optional().describe("Subject area filter"),
      date_start: z.string().optional().describe("Publication date start (YYYY or YYYY-MM-DD)"),
      date_end: z.string().optional().describe("Publication date end (YYYY or YYYY-MM-DD)"),
      limit: z.number().int().max(100).optional().describe("Max results (default 25)"),
    }),
    execute: async ({ query, author, title, subject, date_start, date_end, limit }) => {
      const data = await searchPublications({ query, author, title, subject, dateStart: date_start, dateEnd: date_end, limit });
      if (!Array.isArray(data) || !data.length) return emptyResponse("No DOE publications found.");
      return listResponse(`DOE OSTI publications: ${data.length} results`, { items: data });
    },
  },
];
