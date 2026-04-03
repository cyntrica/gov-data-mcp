/**
 * nvd MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchCves, getCveDetail } from "./sdk.js";
import { tableResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "nvd_cve_search",
    description:
      "Search CVE vulnerabilities in the National Vulnerability Database by keyword, CVSS severity, and date range.\n" +
      "Returns CVE IDs, descriptions, CVSS scores, severity levels, and publication dates.\n\n" +
      "Severity values: LOW, MEDIUM, HIGH, CRITICAL",
    annotations: { title: "NVD: Search CVEs", readOnlyHint: true },
    parameters: z.object({
      keyword: z.string().optional().describe("Search keyword (e.g. 'buffer overflow', 'log4j', 'remote code execution')"),
      severity: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).optional().describe("CVSS V3 severity level"),
      pubStartDate: z.string().optional().describe("Publication start date in ISO 8601 (e.g. '2024-01-01T00:00:00.000')"),
      pubEndDate: z.string().optional().describe("Publication end date in ISO 8601 (e.g. '2024-12-31T23:59:59.999')"),
      limit: z.number().int().min(1).max(2000).optional().describe("Max results (default 20)"),
    }),
    execute: async ({ keyword, severity, pubStartDate, pubEndDate, limit }) => {
      const data = await searchCves({ keyword, severity, pubStartDate, pubEndDate, limit });
      const vulns = data.vulnerabilities ?? [];
      if (!vulns.length) return emptyResponse(`No CVEs found${keyword ? ` for '${keyword}'` : ""}${severity ? ` with severity ${severity}` : ""}.`);

      return tableResponse(
        `CVE results: ${data.totalResults} total${keyword ? ` for '${keyword}'` : ""}${severity ? ` (${severity})` : ""}, showing ${vulns.length}`,
        {
          rows: vulns.map(({ cve }) => {
            const cvss = cve.metrics?.cvssMetricV31?.[0] ?? cve.metrics?.cvssMetricV30?.[0];
            const desc = cve.descriptions?.find((d) => d.lang === "en")?.value ?? cve.descriptions?.[0]?.value;
            return {
              id: cve.id,
              description: desc ? (desc.length > 200 ? desc.slice(0, 200) + "..." : desc) : null,
              baseScore: cvss?.cvssData?.baseScore ?? null,
              severity: cvss?.cvssData?.baseSeverity ?? null,
              published: cve.published,
              status: cve.vulnStatus,
            };
          }),
          total: data.totalResults,
        },
      );
    },
  },

  {
    name: "nvd_cve_detail",
    description:
      "Get full details of a CVE vulnerability by its CVE ID.\n" +
      "Returns CVSS scores, attack vectors, affected products (CPE), weaknesses (CWE), and references.",
    annotations: { title: "NVD: CVE Detail", readOnlyHint: true },
    parameters: z.object({
      cveId: z.string().describe("CVE identifier (e.g. 'CVE-2021-44228', 'CVE-2024-1234')"),
    }),
    execute: async ({ cveId }) => {
      const data = await getCveDetail(cveId);
      const vulns = data.vulnerabilities ?? [];
      if (!vulns.length) return emptyResponse(`CVE '${cveId}' not found.`);

      const cve = vulns[0].cve;
      const cvss = cve.metrics?.cvssMetricV31?.[0] ?? cve.metrics?.cvssMetricV30?.[0];
      const desc = cve.descriptions?.find((d) => d.lang === "en")?.value ?? cve.descriptions?.[0]?.value;
      const weaknesses = cve.weaknesses?.flatMap((w) =>
        w.description.filter((d) => d.lang === "en").map((d) => d.value),
      );
      const affectedProducts = cve.configurations?.flatMap((c) =>
        c.nodes.flatMap((n) => n.cpeMatch.filter((m) => m.vulnerable).map((m) => m.criteria)),
      );

      return recordResponse(
        `${cve.id}: ${cvss?.cvssData?.baseSeverity ?? "N/A"} (${cvss?.cvssData?.baseScore ?? "N/A"})`,
        {
          id: cve.id,
          description: desc,
          published: cve.published,
          lastModified: cve.lastModified,
          status: cve.vulnStatus,
          cvss: cvss ? {
            score: cvss.cvssData.baseScore,
            severity: cvss.cvssData.baseSeverity,
            vector: cvss.cvssData.vectorString,
            attackVector: cvss.cvssData.attackVector,
            attackComplexity: cvss.cvssData.attackComplexity,
            privilegesRequired: cvss.cvssData.privilegesRequired,
            userInteraction: cvss.cvssData.userInteraction,
            scope: cvss.cvssData.scope,
            exploitabilityScore: cvss.exploitabilityScore,
            impactScore: cvss.impactScore,
          } : null,
          weaknesses,
          affectedProducts: affectedProducts?.slice(0, 50),
          references: cve.references?.map((r) => ({
            url: r.url,
            source: r.source,
            tags: r.tags,
          })),
        },
      );
    },
  },
];
