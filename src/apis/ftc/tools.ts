/**
 * ftc MCP tools — Do Not Call complaints and HSR early termination notices.
 *
 * Docs: https://api.ftc.gov
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchDncComplaints, searchHsrNotices } from "./sdk.js";
import { listResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  // ── DNC Complaints ─────────────────────────────────────────────────
  {
    name: "ftc_dnc_complaints",
    description:
      "Search FTC Do Not Call (DNC) telemarketing complaints.\n" +
      "Filter by consumer state, city, subject, or robocall flag.\n" +
      "Returns complaint records with phone numbers, dates, and violation details.\n\n" +
      "Example: consumer_state='CA', is_robocall=true",
    annotations: { title: "FTC: Do Not Call Complaints", readOnlyHint: true },
    parameters: z.object({
      consumer_state: z.string().optional().describe("2-letter state code (e.g. 'CA', 'NY', 'TX')"),
      consumer_city: z.string().optional().describe("Consumer city name"),
      subject: z.string().optional().describe("Complaint subject keyword"),
      is_robocall: z.boolean().optional().describe("Filter to robocall/recorded message complaints only"),
      page_size: z.number().int().min(1).max(100).optional().describe("Results per page (default 25, max 100)"),
      page: z.number().int().min(1).optional().describe("Page number (default 1)"),
    }),
    execute: async (args) => {
      const result = await searchDncComplaints({
        consumer_state: args.consumer_state,
        consumer_city: args.consumer_city,
        subject: args.subject,
        is_robocall: args.is_robocall,
        page_size: args.page_size,
        page: args.page,
      });
      if (!result.items.length) return emptyResponse("No DNC complaints found matching the given criteria.");
      const totalInfo = result.total != null ? ` (${result.total} total)` : "";
      return listResponse(
        `FTC DNC complaints: ${result.items.length} returned${totalInfo}`,
        {
          items: result.items,
          total: result.total,
        },
      );
    },
  },

  // ── HSR Early Termination Notices ──────────────────────────────────
  {
    name: "ftc_hsr_notices",
    description:
      "Search FTC Hart-Scott-Rodino (HSR) merger early termination notices.\n" +
      "Filter by company title or transaction number.\n" +
      "Returns notices with transaction details and dates.\n\n" +
      "Example: title='Google'",
    annotations: { title: "FTC: HSR Early Termination Notices", readOnlyHint: true },
    parameters: z.object({
      title: z.string().optional().describe("Company or transaction title to search"),
      transaction_number: z.string().optional().describe("Specific HSR transaction number"),
      page_size: z.number().int().min(1).max(100).optional().describe("Results per page (default 25, max 100)"),
      page: z.number().int().min(0).optional().describe("Page number (default 0, zero-indexed)"),
    }),
    execute: async (args) => {
      const result = await searchHsrNotices({
        title: args.title,
        transaction_number: args.transaction_number,
        page_size: args.page_size,
        page: args.page,
      });
      if (!result.items.length) return emptyResponse("No HSR early termination notices found matching the given criteria.");
      const totalInfo = result.total != null ? ` (${result.total} total)` : "";
      return listResponse(
        `FTC HSR early termination notices: ${result.items.length} returned${totalInfo}`,
        {
          items: result.items,
          total: result.total,
        },
      );
    },
  },
];
