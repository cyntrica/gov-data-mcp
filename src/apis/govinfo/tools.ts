/**
 * govinfo MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import {
  searchPublications,
  searchCboReports,
  getBillText,
  collections,
  billVersions,
} from "./sdk.js";
import { listResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "govinfo_search",
    description:
      "Search across all government publications — bills, laws, CBO reports, " +
      "Congressional Record, Federal Register, committee reports, and more.\n\n" +
      "Collections: BILLS, PLAW (public laws), CRPT (committee reports), " +
      "CREC (Congressional Record), BUDGET, FR (Federal Register), CRECB (bound CR)",
    annotations: { title: "GovInfo: Search Publications", readOnlyHint: true },
    parameters: z.object({
      query: z.string().describe("Search query — bill name, topic, or keyword"),
      collection: z.string().optional().describe(
        "Collection: 'BILLS', 'PLAW' (public laws), 'CRPT' (committee reports), " +
        "'CREC' (Congressional Record), 'BUDGET', 'FR' (Federal Register)",
      ),
      congress: z.number().int().optional().describe("Filter by Congress number (e.g., 119)"),
      page_size: z.number().int().optional().describe("Results per page (default: 10, max: 100)"),
    }),
    execute: async ({ query, collection, congress, page_size }) => {
      const data = await searchPublications({ query, collection, congress, pageSize: page_size });
      if (!data.results.length) return emptyResponse(`No results found for "${query}".`);
      return listResponse(
        `GovInfo search "${query}": ${data.total} total, showing ${data.results.length}`,
        { items: data.results, total: data.total },
      );
    },
  },

  {
    name: "govinfo_bill_text",
    description:
      "Get the full text of a bill or enrolled law from GovInfo. " +
      "Returns the actual legislative text — tax rates, dollar amounts, provisions.\n\n" +
      "Package ID examples:\n" +
      "- BILLS-119hr1enr (119th Congress, HR 1, enrolled)\n" +
      "- BILLS-115hr1enr (Tax Cuts and Jobs Act)\n" +
      "- BILLS-117hr5376enr (Inflation Reduction Act)\n\n" +
      "Version suffixes: enr (enrolled/signed), eh (engrossed House), " +
      "es (engrossed Senate), ih (introduced House), is (introduced Senate)",
    annotations: { title: "GovInfo: Bill/Law Full Text", readOnlyHint: true },
    parameters: z.object({
      congress: z.number().int().describe("Congress number (e.g., 119, 118, 117)"),
      bill_type: z.enum(["hr", "s", "hjres", "sjres"]).describe("Bill type"),
      bill_number: z.number().int().describe("Bill number (e.g., 1, 5376)"),
      version: z.string().optional().describe(
        "Bill version: 'enr' (enrolled/signed, default), 'eh' (engrossed House), " +
        "'es' (engrossed Senate), 'ih' (introduced House), 'is' (introduced Senate)",
      ),
      max_length: z.number().int().optional().describe(
        "Maximum characters to return (default: 15000). Use higher for complete text.",
      ),
    }),
    execute: async ({ congress, bill_type, bill_number, version, max_length }) => {
      try {
        const data = await getBillText({
          congress, billType: bill_type, billNumber: bill_number,
          version, maxLength: max_length,
        });

        if (!data.text) {
          return emptyResponse(`${data.title}: full text not available. Try a different version (ih, eh, es, enr).`);
        }

        return recordResponse(
          `${data.title}: ${data.textLength.toLocaleString()} chars from ${data.textSource}${data.truncated ? ` (truncated to ${(max_length || 15000).toLocaleString()})` : ""}`,
          {
            packageId: data.packageId,
            title: data.title,
            dateIssued: data.dateIssued,
            pages: data.pages,
            textSource: data.textSource,
            textLength: data.textLength,
            truncated: data.truncated,
            text: data.text,
          },
        );
      } catch (err) {
        const ver = version || "enr";
        const packageId = `BILLS-${congress}${bill_type.toLowerCase()}${bill_number}${ver}`;
        return recordResponse(
          `Error fetching bill text for ${packageId}`,
          {
            packageId,
            error: err instanceof Error ? err.message : String(err),
            hints: [
              "Check congress number and bill number",
              "Try a different version: 'ih' (introduced), 'eh' (engrossed), 'enr' (enrolled)",
              "The bill may not have reached that stage yet",
            ],
          },
        );
      }
    },
  },

  {
    name: "govinfo_cbo_reports",
    description:
      "Search for Congressional Budget Office reports published through GovInfo. " +
      "CBO scores tax bills with distributional analysis showing impact by income group.",
    annotations: { title: "GovInfo: CBO Cost Estimates & Reports", readOnlyHint: true },
    parameters: z.object({
      query: z.string().describe("Search query — bill name or topic (e.g., 'Tax Cuts and Jobs Act', 'reconciliation')"),
      page_size: z.number().int().optional().describe("Results per page (default: 10)"),
    }),
    execute: async ({ query, page_size }) => {
      const data = await searchCboReports(query, page_size);
      if (!data.results.length) return emptyResponse(`No CBO reports found for "${query}".`);
      return listResponse(
        `CBO/Committee reports for "${query}": ${data.results.length} results`,
        { items: data.results, total: data.total },
      );
    },
  },
];
