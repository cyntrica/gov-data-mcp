import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchSpecies, getSpeciesDetail } from "./sdk.js";
import { listResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "fws_species",
    description: "Search threatened and endangered species from the US Fish & Wildlife Service.\nFilter by name, status, state, or taxonomic group.\nStatus codes: E=Endangered, T=Threatened, C=Candidate, PE=Proposed Endangered, PT=Proposed Threatened.\nGroups: Mammals, Birds, Reptiles, Amphibians, Fishes, Clams, Snails, Insects, Arachnids, Crustaceans, Flowering Plants, Ferns, etc.",
    annotations: { title: "FWS: Endangered Species Search", readOnlyHint: true },
    parameters: z.object({
      query: z.string().optional().describe("Species name (common or scientific)"),
      status: z.string().optional().describe("Listing status: E, T, C, PE, PT"),
      state: z.string().optional().describe("Two-letter state code"),
      group: z.string().optional().describe("Taxonomic group: Mammals, Birds, Fishes, etc."),
      limit: z.number().int().max(100).optional().describe("Max results (default 25)"),
    }),
    execute: async ({ query, status, state, group, limit }) => {
      const data = await searchSpecies({ query, status, state, group, limit });
      const items = Array.isArray(data) ? data : (data as any)?.data ?? (data as any)?.results;
      if (!Array.isArray(items) || !items.length) return emptyResponse("No species found.");
      return listResponse(`FWS species: ${items.length} results`, { items });
    },
  },
  {
    name: "fws_species_detail",
    description: "Get detailed information about a listed species by TSN (Taxonomic Serial Number).\nIncludes listing history, critical habitat, recovery plans, and range.",
    annotations: { title: "FWS: Species Detail", readOnlyHint: true },
    parameters: z.object({
      tsn: z.string().describe("Taxonomic Serial Number from fws_species results"),
    }),
    execute: async ({ tsn }) => {
      const data = await getSpeciesDetail(tsn);
      return recordResponse(`FWS species ${tsn}`, data);
    },
  },
];
