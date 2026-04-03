/**
 * nasa-images MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchMedia, getAsset, getMetadata, getCaptions } from "./sdk.js";
import { listResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "nasa_image_search",
    description: "Search NASA's image, video, and audio library.\nFilter by keyword, center (JSC, KSC, JPL, GSFC, etc.), media type, year range, and more.",
    annotations: { title: "NASA Images: Search Media", readOnlyHint: true },
    parameters: z.object({
      q: z.string().optional().describe("Free-text search query"),
      center: z.string().optional().describe("NASA center code, e.g. 'JSC', 'KSC', 'JPL'"),
      description: z.string().optional().describe("Search within description field"),
      keywords: z.string().optional().describe("Comma-separated keywords to match"),
      location: z.string().optional().describe("Location filter, e.g. 'Kennedy Space Center'"),
      media_type: z.enum(["image", "video", "audio"]).optional().describe("Filter by media type"),
      nasa_id: z.string().optional().describe("Exact NASA ID to search for"),
      photographer: z.string().optional().describe("Photographer name"),
      title: z.string().optional().describe("Search within title field"),
      year_start: z.string().optional().describe("Start year, e.g. '1969'"),
      year_end: z.string().optional().describe("End year, e.g. '1972'"),
      page: z.number().int().optional().describe("Page number (default 1)"),
      page_size: z.number().int().max(100).optional().describe("Results per page (default 100, max 100)"),
    }),
    execute: async (params) => {
      const result = await searchMedia(params);
      if (!result.items.length) return emptyResponse("No NASA media found matching the search criteria.");
      return listResponse(
        `${result.totalHits} total results, showing ${result.items.length}`,
        { items: result.items, total: result.totalHits },
      );
    },
  },

  {
    name: "nasa_image_asset",
    description: "Get all rendition URLs (original, large, medium, small, thumbnail) for a NASA media asset.\nUse a nasa_id from search results.",
    annotations: { title: "NASA Images: Asset Renditions", readOnlyHint: true },
    parameters: z.object({
      nasa_id: z.string().describe("NASA media ID, e.g. 'as11-40-5874' (Apollo 11 moonwalk)"),
    }),
    execute: async ({ nasa_id }) => {
      const result = await getAsset(nasa_id);
      if (!result.items.length) return emptyResponse(`No renditions found for nasa_id '${nasa_id}'.`);
      return recordResponse(`${result.items.length} renditions for ${nasa_id}`, {
        nasa_id,
        renditions: result.items,
      });
    },
  },

  {
    name: "nasa_image_metadata",
    description: "Get the URL to the full EXIF/XMP/IPTC metadata JSON file for a NASA media asset.",
    annotations: { title: "NASA Images: Asset Metadata", readOnlyHint: true },
    parameters: z.object({
      nasa_id: z.string().describe("NASA media ID"),
    }),
    execute: async ({ nasa_id }) => {
      const result = await getMetadata(nasa_id);
      return recordResponse(`Metadata location for ${nasa_id}`, {
        nasa_id,
        metadata_url: result.location,
      });
    },
  },

  {
    name: "nasa_image_captions",
    description: "Get the URL to the SRT subtitle/captions file for a NASA video asset.",
    annotations: { title: "NASA Images: Video Captions", readOnlyHint: true },
    parameters: z.object({
      nasa_id: z.string().describe("NASA video ID"),
    }),
    execute: async ({ nasa_id }) => {
      const result = await getCaptions(nasa_id);
      return recordResponse(`Captions location for ${nasa_id}`, {
        nasa_id,
        captions_url: result.location,
      });
    },
  },
];
