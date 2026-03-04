/**
 * NIH RePORTER module — search NIH-funded research projects and publications.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { keysEnum, describeEnum } from "../enum-utils.js";
import {
  searchProjects,
  searchPublications,
  getSpendingByCategory,
  getProjectsByAgency,
  NIH_AGENCIES,
  SPENDING_CATEGORIES,
  ACTIVITY_CODES,
  FUNDING_MECHANISMS,
  clearCache as sdkClearCache,
  type NihProject,
} from "../sdk/nih.js";

// ─── Metadata ────────────────────────────────────────────────────────

export const name = "nih";
export const displayName = "NIH RePORTER";
export const description =
  "Search NIH-funded research projects by disease, investigator, institution, state, and funding amount. " +
  "Track research spending by disease category (RCDC), institute, and grant type. " +
  "Cross-reference with CDC (health outcomes), FDA (drug approvals), ClinicalTrials.gov (trials), " +
  "and Open Payments (pharma influence). No API key required.";
export const workflow =
  "Use nih_search_projects to find grants by topic/PI/org → nih_spending_by_category for disease funding trends → " +
  "nih_projects_by_agency for institute breakdown → nih_search_publications for linked publications.";
export const tips =
  "Agencies: NCI (cancer), NHLBI (heart/lung), NIDDK (diabetes/kidney), NIA (aging/Alzheimer's), " +
  "NIAID (infectious diseases), NIMH (mental health), NIDA (drug abuse). " +
  "Spending categories: 27=Cancer, 7=Alzheimer's, 41=Diabetes, 60=HIV/AIDS, 93=Opioids, 30=Cardiovascular, " +
  "85=Mental Health, 38=COVID-19. Use fiscal_years to track funding trends over time.";

export const reference = {
  agencies: NIH_AGENCIES,
  spendingCategories: SPENDING_CATEGORIES,
  activityCodes: ACTIVITY_CODES,
  fundingMechanisms: FUNDING_MECHANISMS,
  docs: {
    "NIH RePORTER API": "https://api.reporter.nih.gov/",
    "NIH RePORTER": "https://reporter.nih.gov/",
    "RCDC Spending Categories": "https://report.nih.gov/funding/categorical-spending",
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────

function summarizeProject(p: NihProject): string {
  const parts: string[] = [];

  parts.push(`${p.project_num ?? p.core_project_num ?? "?"} — ${p.project_title ?? "Untitled"}`);
  parts.push(`FY${p.fiscal_year ?? "?"} | Award: $${(p.award_amount ?? 0).toLocaleString()}`);

  if (p.direct_cost_amt || p.indirect_cost_amt) {
    parts.push(`  Direct: $${(p.direct_cost_amt ?? 0).toLocaleString()} | Indirect: $${(p.indirect_cost_amt ?? 0).toLocaleString()}`);
  }

  parts.push(`Activity: ${p.activity_code ?? "?"} | Mechanism: ${p.funding_mechanism ?? "?"}`);

  if (p.agency_ic_admin) {
    parts.push(`Agency: ${p.agency_ic_admin.abbreviation ?? "?"} (${p.agency_ic_admin.name ?? ""})`);
  }

  if (p.agency_ic_fundings?.length) {
    const funders = p.agency_ic_fundings.map(f =>
      `${f.abbreviation ?? "?"}: $${(f.total_cost ?? 0).toLocaleString()}`
    ).join(", ");
    parts.push(`Funding ICs: ${funders}`);
  }

  const pis = p.principal_investigators?.map(pi => pi.full_name).filter(Boolean);
  if (pis?.length) parts.push(`PI(s): ${pis.join(", ")}`);

  if (p.organization) {
    const org = p.organization;
    parts.push(`Org: ${org.org_name ?? "?"}, ${org.city ?? org.org_city ?? ""} ${org.state ?? org.org_state ?? ""}`);
    if (org.dept_type) parts.push(`Dept: ${org.dept_type}`);
  }

  parts.push(`Active: ${p.is_active ? "Yes" : "No"}`);
  if (p.project_start_date) parts.push(`Start: ${p.project_start_date.slice(0, 10)}`);
  if (p.project_end_date) parts.push(`End: ${p.project_end_date.slice(0, 10)}`);

  if (p.spending_categories_desc) {
    parts.push(`Categories: ${p.spending_categories_desc}`);
  }

  if (p.covid_response?.length) {
    parts.push(`COVID Response: ${p.covid_response.join(", ")}`);
  }

  if (p.project_detail_url) {
    parts.push(`Details: ${p.project_detail_url}`);
  }

  return parts.join("\n");
}

// ─── Tools ───────────────────────────────────────────────────────────

export const tools: Tool<any, any>[] = [
  {
    name: "nih_search_projects",
    description:
      "Search NIH-funded research projects by text, disease area, investigator, institution, state, " +
      "agency, spending category, grant type, and funding amount.\n" +
      "Returns project number, title, PI, organization, award amount, agency, activity code, and dates.\n" +
      "Use to find research grants for any disease, track institutional funding, or identify PIs.",
    annotations: { title: "NIH RePORTER: Search Projects", readOnlyHint: true },
    parameters: z.object({
      text: z.string().optional().describe("Free-text search in titles, abstracts, and terms: 'breast cancer', 'CRISPR', 'opioid'"),
      fiscal_years: z.array(z.number().int()).optional().describe("Fiscal years: [2024] or [2020,2021,2022,2023,2024]"),
      agencies: z.array(z.enum(keysEnum(NIH_AGENCIES))).optional().describe(`NIH institute codes: ${describeEnum(NIH_AGENCIES)}`),
      pi_name: z.string().optional().describe("Principal investigator name (partial match): 'Fauci', 'Collins'"),
      org_names: z.array(z.string()).optional().describe("Organization names (wildcard): ['JOHNS HOPKINS'], ['STANFORD']"),
      org_states: z.array(z.string()).optional().describe("State abbreviations: ['CA','NY'], ['TX']"),
      spending_categories: z.array(z.number().int()).optional().describe("RCDC category IDs: [27]=Cancer, [7]=Alzheimer's, [41]=Diabetes, [93]=Opioids, [60]=HIV/AIDS"),
      activity_codes: z.array(z.enum(keysEnum(ACTIVITY_CODES))).optional().describe(`Grant types: ${describeEnum(ACTIVITY_CODES)}`),
      funding_mechanism: z.array(z.enum(keysEnum(FUNDING_MECHANISMS))).optional().describe(`Mechanism codes: ${describeEnum(FUNDING_MECHANISMS)}`),
      award_amount_min: z.number().optional().describe("Minimum award amount in dollars"),
      award_amount_max: z.number().optional().describe("Maximum award amount in dollars"),
      covid_response: z.array(z.string()).optional().describe("COVID funding: ['All'], ['C3'] (CARES Act), ['C6'] (American Rescue Plan)"),
      exclude_subprojects: z.boolean().optional().describe("Exclude subprojects for cleaner counts (default: true)"),
      limit: z.number().int().max(50).optional().describe("Results per page (default 10, max 50)"),
      offset: z.number().int().optional().describe("Starting offset for pagination"),
      sort_field: z.string().optional().describe("Sort by: 'award_amount', 'project_start_date', 'fiscal_year'"),
      sort_order: z.enum(["asc", "desc"]).optional().describe("Sort order"),
    }),
    execute: async (args) => {
      const piNames = args.pi_name ? [{ any_name: args.pi_name }] : undefined;
      const data = await searchProjects({
        text: args.text,
        fiscal_years: args.fiscal_years,
        agencies: args.agencies,
        pi_names: piNames,
        org_names: args.org_names,
        org_states: args.org_states,
        spending_categories: args.spending_categories,
        activity_codes: args.activity_codes,
        funding_mechanism: args.funding_mechanism,
        award_amount_min: args.award_amount_min,
        award_amount_max: args.award_amount_max,
        covid_response: args.covid_response,
        exclude_subprojects: args.exclude_subprojects ?? true,
        limit: args.limit ?? 10,
        offset: args.offset,
        sort_field: args.sort_field,
        sort_order: args.sort_order,
      });

      if (!data.results?.length) {
        return { content: [{ type: "text" as const, text: "No NIH projects found matching the criteria." }] };
      }

      const header = `${(data.meta.total ?? 0).toLocaleString()} total projects found (showing ${data.results.length})`;
      const summaries = data.results.map(summarizeProject);
      return { content: [{ type: "text" as const, text: `${header}\n\n${summaries.join("\n\n---\n\n")}` }] };
    },
  },

  {
    name: "nih_search_publications",
    description:
      "Search for publications linked to NIH-funded projects.\n" +
      "Search by PubMed IDs (PMIDs), application IDs, or core project numbers.\n" +
      "Returns PMID and linked project number.",
    annotations: { title: "NIH RePORTER: Search Publications", readOnlyHint: true },
    parameters: z.object({
      pmids: z.array(z.number().int()).optional().describe("PubMed IDs: [33298401, 33105091]"),
      core_project_nums: z.array(z.string()).optional().describe("Core project numbers: ['R01AG060942']"),
      appl_ids: z.array(z.number().int()).optional().describe("Application IDs"),
      limit: z.number().int().max(50).optional().describe("Results per page (default 10)"),
      offset: z.number().int().optional().describe("Starting offset for pagination"),
    }),
    execute: async (args) => {
      const data = await searchPublications({
        pmids: args.pmids,
        core_project_nums: args.core_project_nums,
        appl_ids: args.appl_ids,
        limit: args.limit ?? 10,
        offset: args.offset,
      });

      if (!data.results?.length) {
        return { content: [{ type: "text" as const, text: "No publications found." }] };
      }

      const header = `${(data.meta.total ?? 0).toLocaleString()} total publications (showing ${data.results.length})`;
      const lines = data.results.map(p =>
        `PMID: ${p.pmid ?? "?"} | Project: ${p.coreproject ?? "?"} | AppID: ${p.applid ?? "?"}`
      );
      return { content: [{ type: "text" as const, text: `${header}\n\n${lines.join("\n")}` }] };
    },
  },

  {
    name: "nih_spending_by_category",
    description:
      "Get NIH project counts and estimated funding for a disease/research area across fiscal years.\n" +
      "Uses RCDC spending categories with an agency-based fallback for more accurate counts.\n" +
      "Common category IDs: 27=Cancer, 7=Alzheimer's, 41=Diabetes, 60=HIV/AIDS, 93=Opioids, " +
      "30=Cardiovascular, 85=Mental Health, 38=COVID-19, 118=Stroke, 92=Obesity.\n" +
      "Note: For the most reliable counts by disease area, also try nih_projects_by_agency with the relevant institute.",
    annotations: { title: "NIH RePORTER: Spending by Category", readOnlyHint: true },
    parameters: z.object({
      category_id: z.number().int().describe("RCDC spending category ID: 27=Cancer, 7=Alzheimer's, 41=Diabetes, 60=HIV/AIDS, 93=Opioids"),
      fiscal_years: z.array(z.number().int()).describe("Fiscal years to compare: [2020,2021,2022,2023,2024]"),
    }),
    execute: async (args) => {
      const data = await getSpendingByCategory(args.category_id, args.fiscal_years);

      const lines = Object.entries(data.years)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([year, info]) => {
          const funding = info.totalFunding > 0 ? ` | Top-50 funding: $${info.totalFunding.toLocaleString()}` : "";
          return `  FY${year}: ${info.projects.toLocaleString()} projects${funding} (via ${info.method})`;
        });

      return {
        content: [{
          type: "text" as const,
          text: `NIH funding for "${data.category}" (RCDC #${args.category_id}):\n${lines.join("\n")}\n\nNote: Funding shown is sum of top-50 awards; actual totals are higher. Project counts via agency are more complete than RCDC tags.`,
        }],
      };
    },
  },

  {
    name: "nih_projects_by_agency",
    description:
      "Get project counts by NIH institute/center for a fiscal year.\n" +
      "Shows which institutes fund the most research: NCI (cancer), NIAID (infectious diseases), etc.\n" +
      "Useful for understanding NIH budget allocation across disease areas.",
    annotations: { title: "NIH RePORTER: Projects by Agency", readOnlyHint: true },
    parameters: z.object({
      fiscal_year: z.number().int().describe("Fiscal year: 2024"),
      agencies: z.array(z.enum(keysEnum(NIH_AGENCIES))).optional().describe("Specific agency codes to check (default: top 25)"),
    }),
    execute: async (args) => {
      const data = await getProjectsByAgency(args.fiscal_year, args.agencies);

      if (!data.length) {
        return { content: [{ type: "text" as const, text: "No data found." }] };
      }

      const lines = data.map(d =>
        `  ${d.agency.padEnd(8)} ${d.name.padEnd(60)} ${d.projectCount.toLocaleString()} projects`
      );
      const total = data.reduce((sum, d) => sum + d.projectCount, 0);
      return {
        content: [{
          type: "text" as const,
          text: `NIH projects by institute (FY${args.fiscal_year}):\n${lines.join("\n")}\n\nTotal: ${total.toLocaleString()} projects`,
        }],
      };
    },
  },
];

export { sdkClearCache as clearCache };
