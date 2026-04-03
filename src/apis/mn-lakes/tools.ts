/**
 * mn-lakes MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchLakes, nearbyLakes, lakeDetail } from "./sdk.js";
import { listResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "mn_lake_search",
    description:
      "Search Minnesota lakes by name.\n" +
      "Returns matching lakes with IDs, names, counties, acreage, and max depth.\n" +
      "Use the lake ID from results with mn_lake_detail for full information.",
    annotations: { title: "MN DNR: Search Lakes", readOnlyHint: true },
    parameters: z.object({
      name: z.string().describe("Lake name or partial name: 'Mille Lacs', 'Superior', 'Minnetonka'"),
    }),
    execute: async (args) => {
      const data = await searchLakes(args) as any;

      const lakes = data?.result ?? data?.lakes ?? data ?? [];
      const items = Array.isArray(lakes) ? lakes : [];
      if (!items.length) return emptyResponse("No Minnesota lakes found matching that name.");

      const rows = items.map((lake: any) => ({
        id: lake.id ?? lake.DOWNumber ?? null,
        name: lake.name ?? null,
        county: lake.county ?? null,
        nearestTown: lake["nearest-town"] ?? lake.nearestTown ?? null,
        acres: lake.acres ?? lake.areaAcres ?? null,
        maxDepth: lake["max-depth"] ?? lake.maxDepth ?? null,
      }));

      return listResponse(
        `${rows.length} Minnesota lake(s) found`,
        { items: rows, total: rows.length },
      );
    },
  },

  {
    name: "mn_lake_nearby",
    description:
      "Find Minnesota lakes near a latitude/longitude point.\n" +
      "Returns lakes within the specified radius (in miles, default 5).",
    annotations: { title: "MN DNR: Nearby Lakes", readOnlyHint: true },
    parameters: z.object({
      lat: z.number().describe("Latitude (e.g. 46.2)"),
      lon: z.number().describe("Longitude (e.g. -94.3)"),
      radius: z.number().optional().describe("Search radius in miles (default 5)"),
    }),
    execute: async (args) => {
      const data = await nearbyLakes(args) as any;

      const lakes = data?.result ?? data?.lakes ?? data ?? [];
      const items = Array.isArray(lakes) ? lakes : [];
      if (!items.length) return emptyResponse("No Minnesota lakes found near the specified location.");

      const rows = items.map((lake: any) => ({
        id: lake.id ?? lake.DOWNumber ?? null,
        name: lake.name ?? null,
        county: lake.county ?? null,
        nearestTown: lake["nearest-town"] ?? lake.nearestTown ?? null,
        acres: lake.acres ?? lake.areaAcres ?? null,
        maxDepth: lake["max-depth"] ?? lake.maxDepth ?? null,
        distance: lake.distance ?? null,
      }));

      return listResponse(
        `${rows.length} Minnesota lake(s) found within ${args.radius ?? 5} miles`,
        { items: rows, total: rows.length },
      );
    },
  },

  {
    name: "mn_lake_detail",
    description:
      "Get full details for a Minnesota lake by ID.\n" +
      "Includes fish species, surveys, water quality, depth, and consumption guidance.\n" +
      "Use mn_lake_search or mn_lake_nearby to find lake IDs.",
    annotations: { title: "MN DNR: Lake Detail", readOnlyHint: true },
    parameters: z.object({
      id: z.string().describe("Lake ID (DOW number) from search results (e.g. '21005700')"),
    }),
    execute: async (args) => {
      const data = await lakeDetail(args) as any;

      if (!data || (typeof data === "object" && Object.keys(data).length === 0)) {
        return emptyResponse(`No lake found with ID '${args.id}'.`);
      }

      // Extract lake info — handle various response shapes
      const lake = data?.result ?? data;

      const record: Record<string, unknown> = {
        id: lake.id ?? lake.DOWNumber ?? args.id,
        name: lake.name ?? null,
        county: lake.county ?? null,
        nearestTown: lake["nearest-town"] ?? lake.nearestTown ?? null,
        acres: lake.acres ?? lake.areaAcres ?? null,
        maxDepth: lake["max-depth"] ?? lake.maxDepth ?? null,
        shoreline: lake.shoreline ?? lake.shorelineMiles ?? null,
      };

      // Fish species
      const fish = lake.fish ?? lake.fishSpecies ?? [];
      if (Array.isArray(fish) && fish.length > 0) {
        record.fishSpecies = fish.map((f: any) => f.species ?? f.name ?? f);
      }

      // Surveys
      const surveys = lake.surveys ?? [];
      if (Array.isArray(surveys) && surveys.length > 0) {
        record.surveys = surveys.map((s: any) => ({
          type: s.type ?? s.surveyType ?? null,
          date: s.date ?? s.surveyDate ?? null,
        }));
      }

      return recordResponse(
        `Lake details: ${record.name ?? args.id}`,
        record,
      );
    },
  },
];
