/**
 * cpsc MCP tools — consumer product recalls and penalties.
 *
 * Docs: https://www.saferproducts.gov/RestWebServices
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import {
  searchRecalls, getRecallById,
  searchPenalties, getPenaltyCompanies,
} from "./sdk.js";
import { tableResponse, listResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  // ── Recalls ──────────────────────────────────────────────────────
  {
    name: "cpsc_recall_search",
    description:
      "Search CPSC consumer product recalls by product name, manufacturer, hazard, date range, or recall number.\n" +
      "All parameters are optional — use at least one to filter results.\n" +
      "Date parameters use MM/DD/YYYY format.\n\n" +
      "Example: product_name='stroller', manufacturer='Fisher-Price', hazard='choking'",
    annotations: { title: "CPSC: Product Recall Search", readOnlyHint: true },
    parameters: z.object({
      recall_number: z.string().optional().describe("Recall number (e.g. '23-123')"),
      recall_date_start: z.string().optional().describe("Start date for recall date range (MM/DD/YYYY)"),
      recall_date_end: z.string().optional().describe("End date for recall date range (MM/DD/YYYY)"),
      last_publish_date_start: z.string().optional().describe("Start date for last publish date range (MM/DD/YYYY)"),
      last_publish_date_end: z.string().optional().describe("End date for last publish date range (MM/DD/YYYY)"),
      recall_title: z.string().optional().describe("Search within recall titles"),
      product_name: z.string().optional().describe("Product name keyword: 'stroller', 'battery', 'toy'"),
      product_type: z.string().optional().describe("Product type/category"),
      manufacturer: z.string().optional().describe("Manufacturer name: 'Fisher-Price', 'IKEA'"),
      hazard: z.string().optional().describe("Hazard keyword: 'choking', 'fire', 'burn', 'laceration'"),
    }),
    execute: async (args) => {
      const data = await searchRecalls({
        RecallNumber: args.recall_number,
        RecallDateStart: args.recall_date_start,
        RecallDateEnd: args.recall_date_end,
        LastPublishDateStart: args.last_publish_date_start,
        LastPublishDateEnd: args.last_publish_date_end,
        RecallTitle: args.recall_title,
        ProductName: args.product_name,
        ProductType: args.product_type,
        Manufacturer: args.manufacturer,
        Hazard: args.hazard,
      });
      if (!data.length) return emptyResponse("No CPSC recalls found matching the given criteria.");
      return listResponse(
        `CPSC recalls: ${data.length} found`,
        {
          total: data.length,
          items: data.slice(0, 50).map(r => ({
            recallNumber: r.RecallNumber,
            recallDate: r.RecallDate,
            title: r.Title,
            products: r.Products?.map(p => p.Name).filter(Boolean).join(", "),
            manufacturers: r.Manufacturers?.map(m => m.Name).filter(Boolean).join(", "),
            hazards: r.Hazards?.map(h => h.Name).filter(Boolean).join(", "),
          })),
        },
      );
    },
  },

  {
    name: "cpsc_recall_detail",
    description:
      "Get full CPSC recall details by RecallID.\n" +
      "Returns complete information including description, products, manufacturers,\n" +
      "hazards, remedies, injuries, retailers, images, and consumer contact info.\n" +
      "Use cpsc_recall_search first to find RecallIDs.",
    annotations: { title: "CPSC: Recall Detail", readOnlyHint: true },
    parameters: z.object({
      recall_id: z.number().int().describe("Recall ID from search results"),
    }),
    execute: async ({ recall_id }) => {
      const data = await getRecallById(recall_id);
      if (!data) return emptyResponse(`No CPSC recall found for ID ${recall_id}.`);
      return recordResponse(
        `CPSC recall ${data.RecallNumber ?? recall_id}: ${data.Title ?? ""}`,
        {
          recallId: data.RecallID,
          recallNumber: data.RecallNumber,
          recallDate: data.RecallDate,
          lastPublishDate: data.LastPublishDate,
          title: data.Title,
          description: data.Description,
          url: data.URL,
          consumerContact: data.ConsumerContact,
          products: data.Products,
          manufacturers: data.Manufacturers,
          retailers: data.Retailers,
          hazards: data.Hazards,
          remedies: data.Remedies,
          injuries: data.Injuries,
          images: data.Images,
        },
      );
    },
  },

  // ── Penalties ────────────────────────────────────────────────────
  {
    name: "cpsc_penalty_search",
    description:
      "Search CPSC penalty records by type, company, product, fiscal year, or ID.\n" +
      "Penalty type (civil or criminal) is required.\n" +
      "Use cpsc_penalty_companies to discover valid company names.\n\n" +
      "Example: penalty_type='civil', company='IKEA'",
    annotations: { title: "CPSC: Penalty Search", readOnlyHint: true },
    parameters: z.object({
      penalty_type: z.enum(["civil", "criminal"]).describe("Penalty type: 'civil' or 'criminal'"),
      company: z.string().optional().describe("Company name"),
      product: z.string().optional().describe("Product type"),
      fiscal_year: z.string().optional().describe("Fiscal year (e.g. '2023')"),
      id: z.number().int().optional().describe("Specific penalty record ID"),
    }),
    execute: async ({ penalty_type, company, product, fiscal_year, id }) => {
      const data = await searchPenalties({
        penaltyType: penalty_type,
        company,
        product,
        fiscalYear: fiscal_year,
        id,
      });
      if (!data.length) return emptyResponse(`No ${penalty_type} penalties found matching the given criteria.`);
      return tableResponse(
        `CPSC ${penalty_type} penalties: ${data.length} found`,
        { rows: data as Record<string, unknown>[] },
      );
    },
  },

  {
    name: "cpsc_penalty_companies",
    description:
      "List companies that have CPSC penalties (civil or criminal).\n" +
      "Use the company names from results with cpsc_penalty_search.",
    annotations: { title: "CPSC: Penalized Companies", readOnlyHint: true },
    parameters: z.object({
      penalty_type: z.enum(["civil", "criminal"]).describe("Penalty type: 'civil' or 'criminal'"),
    }),
    execute: async ({ penalty_type }) => {
      const data = await getPenaltyCompanies(penalty_type);
      if (!data.length) return emptyResponse(`No companies found with ${penalty_type} penalties.`);
      return listResponse(
        `CPSC companies with ${penalty_type} penalties: ${data.length}`,
        {
          total: data.length,
          items: data as Record<string, unknown>[],
        },
      );
    },
  },
];
