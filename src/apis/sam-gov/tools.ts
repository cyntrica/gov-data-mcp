import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchOpportunities, searchEntities, searchExclusions } from "./sdk.js";
import { listResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "sam_opportunities",
    description: "Search federal contract opportunities on SAM.gov.\nFilter by keyword, NAICS code, set-aside type, and posted date range.",
    annotations: { title: "SAM.gov: Contract Opportunities", readOnlyHint: true },
    parameters: z.object({
      keyword: z.string().optional().describe("Search keyword"),
      naics: z.string().optional().describe("NAICS code filter, e.g. '541511'"),
      posted_from: z.string().optional().describe("Posted after (MM/DD/YYYY)"),
      posted_to: z.string().optional().describe("Posted before (MM/DD/YYYY)"),
      set_aside: z.string().optional().describe("Set-aside type: SBA, 8A, HUBZone, SDVOSBC, WOSB, etc."),
      limit: z.number().int().max(100).optional().describe("Max results (default 25)"),
    }),
    execute: async ({ keyword, naics, posted_from, posted_to, set_aside, limit }) => {
      const data = await searchOpportunities({ keyword, naics, postedFrom: posted_from, postedTo: posted_to, setAside: set_aside, limit });
      const items = (data as any)?.opportunitiesData;
      if (!Array.isArray(items) || !items.length) return emptyResponse("No contract opportunities found.");
      return listResponse(`SAM.gov opportunities: ${items.length} results`, { items, total: (data as any)?.totalRecords });
    },
  },
  {
    name: "sam_entities",
    description: "Search registered entities (businesses/orgs) on SAM.gov.\nLookup by UEI, CAGE code, business name, or state.",
    annotations: { title: "SAM.gov: Entity Search", readOnlyHint: true },
    parameters: z.object({
      uei: z.string().optional().describe("Unique Entity ID (UEI)"),
      cage_code: z.string().optional().describe("CAGE code"),
      name: z.string().optional().describe("Legal business name"),
      state: z.string().optional().describe("Two-letter state code"),
      limit: z.number().int().max(100).optional().describe("Max results (default 25)"),
    }),
    execute: async ({ uei, cage_code, name, state, limit }) => {
      const data = await searchEntities({ ueiSAM: uei, cageCode: cage_code, legalBusinessName: name, stateCode: state, limit });
      const items = (data as any)?.entityData;
      if (!Array.isArray(items) || !items.length) return emptyResponse("No entities found.");
      return listResponse(`SAM.gov entities: ${items.length} results`, { items, total: (data as any)?.totalRecords });
    },
  },
  {
    name: "sam_exclusions",
    description: "Search SAM.gov exclusions (debarments/suspensions).\nCheck if an entity is excluded from federal contracting.",
    annotations: { title: "SAM.gov: Exclusions", readOnlyHint: true },
    parameters: z.object({
      name: z.string().optional().describe("Entity or individual name"),
      uei: z.string().optional().describe("UEI of excluded entity"),
      classification: z.string().optional().describe("Type: Individual, Firm, Special Entity, Vessel"),
      limit: z.number().int().max(100).optional().describe("Max results (default 25)"),
    }),
    execute: async ({ name, uei, classification, limit }) => {
      const data = await searchExclusions({ name, ueiSAM: uei, classificationType: classification, limit });
      const items = (data as any)?.exclusionData;
      if (!Array.isArray(items) || !items.length) return emptyResponse("No exclusions found.");
      return listResponse(`SAM.gov exclusions: ${items.length} results`, { items, total: (data as any)?.totalRecords });
    },
  },
];
