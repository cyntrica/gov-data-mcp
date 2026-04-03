/**
 * dap MCP tools — GSA Digital Analytics Program (government web analytics).
 *
 * Docs: https://open.gsa.gov/api/dap/
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getGovWideReport, getAgencyReport, getDomainReport } from "./sdk.js";
import type { DapReportType } from "./sdk.js";
import { tableResponse, emptyResponse } from "../../shared/response.js";

const reportEnum = z.enum([
  "site", "domain", "second-level-domain", "download", "traffic-source",
  "device", "device-model", "os", "browser", "os-browser",
  "windows", "windows-browser", "language",
]).describe(
  "Report type: site, domain, second-level-domain, download, traffic-source, " +
  "device, device-model, os, browser, os-browser, windows, windows-browser, language",
);

const paginationParams = {
  limit: z.number().int().min(1).max(10000).optional().describe("Max results to return (default 100, max 10000)"),
  page: z.number().int().min(1).optional().describe("Page number for pagination"),
  after: z.string().optional().describe("Start date filter (YYYY-MM-DD)"),
  before: z.string().optional().describe("End date filter (YYYY-MM-DD)"),
};

export const tools: Tool<any, any>[] = [
  // ── Government-Wide Report ─────────────────────────────────────────
  {
    name: "dap_gov_wide_report",
    description:
      "Get a government-wide web analytics report from the Digital Analytics Program.\n" +
      "Returns aggregate data across all federal government websites.\n" +
      "Report types include site visits, traffic sources, devices, browsers, OS, downloads, and more.\n\n" +
      "Example: report='site', limit=50, after='2025-01-01'",
    annotations: { title: "DAP: Government-Wide Report", readOnlyHint: true },
    parameters: z.object({
      report: reportEnum,
      ...paginationParams,
    }),
    execute: async (args) => {
      const data = await getGovWideReport({
        report: args.report as DapReportType,
        limit: args.limit,
        page: args.page,
        after: args.after,
        before: args.before,
      });
      if (!data.length) return emptyResponse(`No government-wide ${args.report} data found.`);
      return tableResponse(
        `DAP government-wide ${args.report} report: ${data.length} records`,
        { rows: data },
      );
    },
  },

  // ── Agency-Specific Report ─────────────────────────────────────────
  {
    name: "dap_agency_report",
    description:
      "Get an agency-specific web analytics report from the Digital Analytics Program.\n" +
      "Returns analytics data for a specific federal agency's websites.\n\n" +
      "Example: agency='interior', report='traffic-source', limit=50",
    annotations: { title: "DAP: Agency Report", readOnlyHint: true },
    parameters: z.object({
      agency: z.string().describe("Agency identifier (e.g. 'interior', 'nasa', 'usda', 'commerce')"),
      report: reportEnum,
      ...paginationParams,
    }),
    execute: async (args) => {
      const data = await getAgencyReport(args.agency, {
        report: args.report as DapReportType,
        limit: args.limit,
        page: args.page,
        after: args.after,
        before: args.before,
      });
      if (!data.length) return emptyResponse(`No ${args.report} data found for agency '${args.agency}'.`);
      return tableResponse(
        `DAP ${args.agency} ${args.report} report: ${data.length} records`,
        { rows: data },
      );
    },
  },

  // ── Domain-Specific Report ─────────────────────────────────────────
  {
    name: "dap_domain_report",
    description:
      "Get a domain-specific web analytics report from the Digital Analytics Program.\n" +
      "Returns analytics data for a specific government website domain.\n\n" +
      "Example: domain='nasa.gov', report='browser', limit=50",
    annotations: { title: "DAP: Domain Report", readOnlyHint: true },
    parameters: z.object({
      domain: z.string().describe("Website domain (e.g. 'nasa.gov', 'irs.gov', 'cdc.gov')"),
      report: reportEnum,
      ...paginationParams,
    }),
    execute: async (args) => {
      const data = await getDomainReport(args.domain, {
        report: args.report as DapReportType,
        limit: args.limit,
        page: args.page,
        after: args.after,
        before: args.before,
      });
      if (!data.length) return emptyResponse(`No ${args.report} data found for domain '${args.domain}'.`);
      return tableResponse(
        `DAP ${args.domain} ${args.report} report: ${data.length} records`,
        { rows: data },
      );
    },
  },
];
