/**
 * LOC MCP tools — Library of Congress digital collections search and browsing.
 *
 * Tools return raw JSON data — no markdown formatting.
 * The client decides how to present it.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import {
  search,
  getCollections,
  browseCollection,
  browseFormat,
  getItem,
  searchNewspaperPages,
  searchNewspaperTitles,
} from "./sdk.js";
import { listResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "loc_search",
    description:
      "Search the Library of Congress across 40M+ items: books, maps, photos, manuscripts, audio, film, legislation.\nExamples: 'civil war', 'baseball cards', 'declaration of independence'",
    annotations: { title: "LOC: Search", readOnlyHint: true },
    parameters: z.object({
      q: z.string().describe("Search query"),
      facet: z.string().optional().describe("Facet filter (e.g. 'subject:geography', 'location:virginia')"),
      page_size: z.number().int().min(1).max(100).optional().describe("Results per page (default 25)"),
      page: z.number().int().min(1).optional().describe("Page number"),
      sort: z.enum(["date", "date_desc", "title_s", "title_s_desc"]).optional().describe("Sort order"),
    }),
    execute: async ({ q, facet, page_size, page, sort }) => {
      const data = await search(q, { facet, pageSize: page_size, page, sort });
      const items = data?.results ?? [];
      const total = data?.pagination?.total ?? items.length;
      if (!items.length) return emptyResponse(`No results found for "${q}".`);
      return listResponse(
        `LOC search "${q}": ${total} total, showing ${items.length}`,
        { items, total },
      );
    },
  },

  {
    name: "loc_collections",
    description:
      "List all Library of Congress digital collections.\nReturns collection names, descriptions, and item counts.",
    annotations: { title: "LOC: Collections", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const data = await getCollections();
      const items = data?.results ?? [];
      if (!items.length) return emptyResponse("No collections found.");
      return listResponse(
        `LOC collections: ${items.length} available`,
        { items, total: items.length },
      );
    },
  },

  {
    name: "loc_collection_browse",
    description:
      "Browse a specific Library of Congress collection.\nUse loc_collections first to find collection slugs.",
    annotations: { title: "LOC: Browse Collection", readOnlyHint: true },
    parameters: z.object({
      slug: z.string().describe("Collection slug (e.g. 'civil-war-maps', 'baseball-cards')"),
      q: z.string().optional().describe("Search within the collection"),
      page: z.number().int().min(1).optional().describe("Page number"),
    }),
    execute: async ({ slug, q, page }) => {
      const data = await browseCollection(slug, { q, page });
      const items = data?.results ?? [];
      const total = data?.pagination?.total ?? items.length;
      if (!items.length) return emptyResponse(`No items found in collection "${slug}".`);
      return listResponse(
        `LOC collection "${slug}": ${total} total, showing ${items.length}`,
        { items, total },
      );
    },
  },

  {
    name: "loc_browse_format",
    description:
      "Browse Library of Congress items by format/media type.\nFormats: audio, books, film-and-videos, legislation, manuscripts, maps, newspapers, photos, notated-music, web-archives.",
    annotations: { title: "LOC: Browse by Format", readOnlyHint: true },
    parameters: z.object({
      format: z.enum([
        "audio",
        "books",
        "film-and-videos",
        "legislation",
        "manuscripts",
        "maps",
        "newspapers",
        "photos",
        "notated-music",
        "web-archives",
      ]).describe("Format to browse"),
      q: z.string().optional().describe("Search within the format"),
      page: z.number().int().min(1).optional().describe("Page number"),
    }),
    execute: async ({ format, q, page }) => {
      const data = await browseFormat(format, { q, page });
      const items = data?.results ?? [];
      const total = data?.pagination?.total ?? items.length;
      if (!items.length) return emptyResponse(`No ${format} items found.`);
      return listResponse(
        `LOC ${format}: ${total} total, showing ${items.length}`,
        { items, total },
      );
    },
  },

  {
    name: "loc_item_detail",
    description:
      "Get full metadata for a Library of Congress item.\nReturns title, subjects, dates, contributors, digital file links, and more.",
    annotations: { title: "LOC: Item Detail", readOnlyHint: true },
    parameters: z.object({
      id: z.string().describe("Item identifier (from search results)"),
    }),
    execute: async ({ id }) => {
      const data = await getItem(id);
      const item = data?.item ?? data;
      if (!item) return emptyResponse(`Item "${id}" not found.`);
      const title = item?.title ?? item?.name ?? id;
      return recordResponse(`LOC item: ${title}`, item);
    },
  },

  {
    name: "loc_newspaper_search",
    description:
      "Full-text search of historical U.S. newspaper pages (Chronicling America, 1777–1963).\nSearches OCR text from digitized newspaper pages.",
    annotations: { title: "LOC: Newspaper Page Search", readOnlyHint: true },
    parameters: z.object({
      text: z.string().describe("Full-text search query"),
      date_from: z.string().optional().describe("Start date (YYYY or YYYY-MM-DD)"),
      date_to: z.string().optional().describe("End date (YYYY or YYYY-MM-DD)"),
      state: z.string().optional().describe("U.S. state name (e.g. 'Virginia', 'New York')"),
      rows: z.number().int().min(1).max(100).optional().describe("Results per page (default 20)"),
      page: z.number().int().min(1).optional().describe("Page number"),
    }),
    execute: async ({ text, date_from, date_to, state, rows, page }) => {
      const data = await searchNewspaperPages({
        text, dateFrom: date_from, dateTo: date_to, state, rows, page,
      });
      const items = data?.items ?? [];
      const total = data?.totalItems ?? items.length;
      if (!items.length) return emptyResponse(`No newspaper pages found for "${text}".`);
      return listResponse(
        `Chronicling America search "${text}": ${total} total, showing ${items.length}`,
        { items, total },
      );
    },
  },

  {
    name: "loc_newspaper_titles",
    description:
      "Search newspaper titles in Chronicling America.\nFind newspapers by name, state, or city.",
    annotations: { title: "LOC: Newspaper Titles", readOnlyHint: true },
    parameters: z.object({
      terms: z.string().optional().describe("Search terms for newspaper name"),
      state: z.string().optional().describe("U.S. state name"),
      city: z.string().optional().describe("City name"),
    }),
    execute: async ({ terms, state, city }) => {
      const data = await searchNewspaperTitles({ terms, state, city });
      const items = data?.titles ?? data?.results ?? [];
      const total = data?.totalItems ?? items.length;
      if (!items.length) return emptyResponse("No newspaper titles found.");
      const desc = terms ? `"${terms}"` : [state, city].filter(Boolean).join(", ") || "all";
      return listResponse(
        `Newspaper titles (${desc}): ${total} total, showing ${items.length}`,
        { items, total },
      );
    },
  },
];
