/**
 * fcc MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchProviders, checkCoverage } from "./sdk.js";
import { listResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "fcc_broadband_providers",
    description:
      "Search broadband providers by location or state.\n" +
      "Returns ISP names, technology types (fiber, cable, DSL), and advertised speeds.\n" +
      "Provide a state code, lat/lon, or both to filter results.",
    annotations: { title: "FCC: Broadband Providers", readOnlyHint: true },
    parameters: z.object({
      state: z.string().optional().describe("State FIPS code or 2-letter abbreviation (e.g. 'CA', 'NY')"),
      latitude: z.number().min(-90).max(90).optional().describe("Latitude for location-based search"),
      longitude: z.number().min(-180).max(180).optional().describe("Longitude for location-based search"),
      technology: z.string().optional().describe("Technology code filter (e.g. '50' for fiber, '40' for cable)"),
      limit: z.number().int().max(500).optional().describe("Max results (default 50)"),
    }),
    execute: async ({ state, latitude, longitude, technology, limit }) => {
      const providers = await searchProviders({ state, latitude, longitude, technology, limit });
      if (!providers.length) return emptyResponse("No broadband providers found for the specified criteria.");
      return listResponse(
        `${providers.length} broadband provider(s)${state ? ` in ${state}` : ""}`,
        { items: providers },
      );
    },
  },

  {
    name: "fcc_broadband_coverage",
    description:
      "Check broadband coverage at a specific location.\n" +
      "Returns available providers, technology types, and advertised speeds.\n" +
      "Provide latitude/longitude or an address.",
    annotations: { title: "FCC: Broadband Coverage", readOnlyHint: true },
    parameters: z.object({
      latitude: z.number().min(-90).max(90).optional().describe("Latitude (e.g. 40.7128)"),
      longitude: z.number().min(-180).max(180).optional().describe("Longitude (e.g. -74.006)"),
      address: z.string().optional().describe("Street address to check coverage for"),
      technology: z.string().optional().describe("Technology code filter"),
      speed_download: z.number().optional().describe("Minimum download speed filter (Mbps)"),
      speed_upload: z.number().optional().describe("Minimum upload speed filter (Mbps)"),
    }),
    execute: async ({ latitude, longitude, address, technology, speed_download, speed_upload }) => {
      if (!latitude && !longitude && !address) {
        return emptyResponse("Provide either (latitude + longitude) or an address.");
      }
      const coverage = await checkCoverage({ latitude, longitude, address, technology, speed_download, speed_upload });
      if (!coverage.length) return emptyResponse("No broadband coverage found at this location.");
      return listResponse(
        `${coverage.length} broadband service(s) available at this location`,
        { items: coverage },
      );
    },
  },
];
