/**
 * cisa-kev MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getKevCatalog } from "./sdk.js";
import { tableResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "cisa_kev_list",
    description:
      "Get CISA Known Exploited Vulnerabilities with mandatory federal remediation deadlines.\n" +
      "Returns all actively exploited CVEs in the catalog.\n" +
      "Each entry includes CVE ID, vendor, product, description, required action, due date, and ransomware usage.\n" +
      "Optional filters narrow results by vendor, product, or date range.",
    annotations: { title: "CISA: Known Exploited Vulnerabilities", readOnlyHint: true },
    parameters: z.object({
      vendor: z.string().optional().describe("Filter by vendor/project name (case-insensitive partial match): 'Microsoft', 'Apache', 'Cisco'"),
      product: z.string().optional().describe("Filter by product name (case-insensitive partial match): 'Windows', 'Chrome', 'Exchange'"),
      date_added_after: z.string().optional().describe("Only vulnerabilities added after this date (YYYY-MM-DD)"),
      date_added_before: z.string().optional().describe("Only vulnerabilities added before this date (YYYY-MM-DD)"),
      ransomware_only: z.boolean().optional().describe("Only show vulnerabilities with known ransomware campaign use"),
    }),
    execute: async (args) => {
      const catalog = await getKevCatalog();
      let vulns = catalog.vulnerabilities ?? [];

      // Apply filters
      if (args.vendor) {
        const v = args.vendor.toLowerCase();
        vulns = vulns.filter(vuln => vuln.vendorProject?.toLowerCase().includes(v));
      }
      if (args.product) {
        const p = args.product.toLowerCase();
        vulns = vulns.filter(vuln => vuln.product?.toLowerCase().includes(p));
      }
      if (args.date_added_after) {
        vulns = vulns.filter(vuln => vuln.dateAdded >= args.date_added_after!);
      }
      if (args.date_added_before) {
        vulns = vulns.filter(vuln => vuln.dateAdded <= args.date_added_before!);
      }
      if (args.ransomware_only) {
        vulns = vulns.filter(vuln => vuln.knownRansomwareCampaignUse === "Known");
      }

      if (!vulns.length) return emptyResponse("No vulnerabilities found matching the filters.");
      return tableResponse(
        `CISA KEV: ${vulns.length} vulnerabilities (catalog v${catalog.catalogVersion}, released ${catalog.dateReleased})`,
        { rows: vulns, total: vulns.length },
      );
    },
  },
];
