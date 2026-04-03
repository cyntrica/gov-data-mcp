/**
 * va MCP tools — VA facility search.
 *
 * Docs: https://developer.va.gov/explore/api/va-facilities
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchFacilities } from "./sdk.js";
import { listResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "va_facilities",
    description:
      "Search VA facilities (hospitals, clinics, cemeteries, benefits offices, vet centers) by state and type.\n" +
      "Returns facility names, addresses, phone numbers, and services.\n\n" +
      "Facility types: 'health' (hospitals/clinics), 'benefits' (regional offices), " +
      "'cemetery' (national cemeteries), 'vet_center' (readjustment counseling).\n\n" +
      "Example: state='CA', type='health', limit=10",
    annotations: { title: "VA: Facility Search", readOnlyHint: true },
    parameters: z.object({
      state: z.string().max(2).optional().describe("Two-letter state code (e.g. 'CA', 'TX', 'NY')"),
      type: z.enum(["health", "benefits", "cemetery", "vet_center"]).optional().describe("Facility type filter"),
      limit: z.number().int().min(1).max(100).optional().describe("Results per page (default 20, max 100)"),
      page: z.number().int().min(1).optional().describe("Page number (default 1)"),
    }),
    execute: async ({ state, type, limit, page }) => {
      const { facilities, totalEntries } = await searchFacilities({ state, type, limit, page });
      if (!facilities.length) return emptyResponse("No VA facilities found matching your criteria.");
      return listResponse(
        `VA facilities: ${facilities.length} of ${totalEntries} total${state ? ` in ${state}` : ""}${type ? ` (${type})` : ""}`,
        {
          total: totalEntries,
          items: facilities.map(f => {
            const a = f.attributes;
            const addr = a?.address?.physical;
            return {
              id: f.id,
              name: a?.name,
              facilityType: a?.facilityType,
              classification: a?.classification,
              address: addr ? `${addr.address1}, ${addr.city}, ${addr.state} ${addr.zip}` : undefined,
              phone: a?.phone?.main,
              website: a?.website,
            };
          }),
        },
      );
    },
  },
];
