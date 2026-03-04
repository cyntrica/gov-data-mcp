/**
 * College Scorecard MCP module — college costs, graduation rates, earnings, debt.
 */

import { z } from "zod";
import type { Tool, InputPrompt } from "fastmcp";
import {
  searchSchools,
  getSchoolById,
  querySchools,
  getMostExpensive,
  getHighestEarners,
  getHighestGraduationRates,
  POPULAR_FIELDS,
  OWNERSHIP,
  DEGREE_TYPES,
} from "../sdk/college-scorecard.js";

// ─── Metadata ────────────────────────────────────────────────────────

export const name = "college-scorecard";
export const displayName = "College Scorecard";
export const description = "College costs, graduation rates, post-graduation earnings, student debt, admission rates for every U.S. college and university";
export const auth = { envVar: "DATA_GOV_API_KEY", signup: "https://api.data.gov/signup/" };
export const workflow = "scorecard_search to find schools → scorecard_compare for side-by-side → scorecard_top for rankings";
export const tips =
  "Ownership: 1=Public, 2=Private nonprofit, 3=Private for-profit. " +
  "Degree types: 1=Certificate, 2=Associate, 3=Bachelor's, 4=Graduate. " +
  "Use state abbreviations for filtering: 'CA', 'NY', 'TX'. " +
  "Sort by cost, earnings, or graduation rate to find best/worst schools.";

export const reference = {
  ownership: OWNERSHIP,
  degreeTypes: DEGREE_TYPES,
  popularFields: {
    "latest.cost.tuition.in_state": "In-state tuition ($)",
    "latest.cost.tuition.out_of_state": "Out-of-state tuition ($)",
    "latest.cost.avg_net_price.overall": "Average net price after aid ($)",
    "latest.admissions.admission_rate.overall": "Admission rate (0-1)",
    "latest.completion.rate_suppressed.overall": "Graduation rate (0-1)",
    "latest.earnings.10_yrs_after_entry.median": "Median earnings 10 years after entry ($)",
    "latest.earnings.6_yrs_after_entry.median": "Median earnings 6 years after entry ($)",
    "latest.aid.median_debt.completers.overall": "Median debt at graduation ($)",
    "latest.aid.pell_grant_rate": "Pell grant rate (proxy for low-income students)",
    "latest.student.size": "Undergraduate enrollment",
  },
  docs: {
    "College Scorecard": "https://collegescorecard.ed.gov/",
    "API Documentation": "https://collegescorecard.ed.gov/data/documentation/",
    "Data Dictionary": "https://collegescorecard.ed.gov/assets/CollegeScorecardDataDictionary.xlsx",
    "Get API Key": "https://api.data.gov/signup/",
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────

function formatSchool(r: Record<string, unknown>) {
  return {
    id: r.id ?? r["id"],
    name: r["school.name"],
    state: r["school.state"],
    city: r["school.city"],
    ownership: OWNERSHIP[r["school.ownership"] as number] ?? r["school.ownership"],
    admissionRate: r["latest.admissions.admission_rate.overall"] != null
      ? `${(Number(r["latest.admissions.admission_rate.overall"]) * 100).toFixed(1)}%` : null,
    tuitionInState: r["latest.cost.tuition.in_state"],
    tuitionOutOfState: r["latest.cost.tuition.out_of_state"],
    avgNetPrice: r["latest.cost.avg_net_price.overall"],
    graduationRate: r["latest.completion.rate_suppressed.overall"] != null
      ? `${(Number(r["latest.completion.rate_suppressed.overall"]) * 100).toFixed(1)}%` : null,
    medianEarnings10yr: r["latest.earnings.10_yrs_after_entry.median"],
    medianEarnings6yr: r["latest.earnings.6_yrs_after_entry.median"],
    medianDebt: r["latest.aid.median_debt.completers.overall"],
    pellGrantRate: r["latest.aid.pell_grant_rate"] != null
      ? `${(Number(r["latest.aid.pell_grant_rate"]) * 100).toFixed(1)}%` : null,
    studentSize: r["latest.student.size"],
  };
}

// ─── Tools ───────────────────────────────────────────────────────────

export const tools: Tool<any, any>[] = [
  {
    name: "scorecard_search",
    description:
      "Search U.S. colleges and universities from the College Scorecard.\n" +
      "Returns tuition, admission rate, graduation rate, median earnings after graduation, student debt.\n\n" +
      "Search by name, state, or school type. Sort by cost, earnings, or graduation rate.",
    annotations: { title: "College Scorecard: Search Schools", readOnlyHint: true },
    parameters: z.object({
      name: z.string().optional().describe("School name (partial match): 'Harvard', 'community college', 'MIT'"),
      state: z.string().optional().describe("Two-letter state code: 'CA', 'NY', 'TX'"),
      ownership: z.number().int().optional().describe("1=Public, 2=Private nonprofit, 3=Private for-profit"),
      sort: z.string().optional().describe("Sort field: 'latest.cost.tuition.out_of_state:desc', 'latest.earnings.10_yrs_after_entry.median:desc', 'latest.completion.rate_suppressed.overall:desc'"),
      per_page: z.number().int().max(100).optional().describe("Results per page (default 20, max 100)"),
    }),
    execute: async ({ name, state, ownership, sort, per_page }) => {
      const data = await searchSchools({ name, state, ownership, sort, perPage: per_page });
      if (!data.results?.length) return `No schools found${name ? ` matching "${name}"` : ""}.`;
      return JSON.stringify({
        summary: `College Scorecard: ${data.metadata.total} schools found, showing ${data.results.length}`,
        total: data.metadata.total,
        schools: data.results.map(formatSchool),
      });
    },
  },

  {
    name: "scorecard_compare",
    description:
      "Compare specific colleges side-by-side on cost, graduation rate, earnings, and debt.\n" +
      "Provide school names to search and compare.",
    annotations: { title: "College Scorecard: Compare Schools", readOnlyHint: true },
    parameters: z.object({
      schools: z.string().describe("Comma-separated school names to compare: 'Harvard,MIT,Stanford' or 'Ohio State,Michigan'"),
    }),
    execute: async ({ schools }) => {
      const names = schools.split(",").map((s: string) => s.trim()).filter(Boolean);
      const results = await Promise.all(
        names.map(async (n: string) => {
          const data = await searchSchools({ name: n, perPage: 1 });
          return data.results?.[0] ? formatSchool(data.results[0]) : { name: n, error: "Not found" };
        })
      );
      return JSON.stringify({
        summary: `Comparing ${results.length} schools`,
        schools: results,
      });
    },
  },

  {
    name: "scorecard_top",
    description:
      "Get top-ranked colleges by earnings, graduation rate, or lowest cost.\n" +
      "Rankings: 'earnings' (highest median pay 10yr after entry), 'graduation' (highest completion rate), 'expensive' (highest tuition)",
    annotations: { title: "College Scorecard: Rankings", readOnlyHint: true },
    parameters: z.object({
      ranking: z.enum(["earnings", "graduation", "expensive"]).describe("Ranking metric"),
      state: z.string().optional().describe("Filter to state: 'CA', 'NY', 'TX'"),
      ownership: z.number().int().optional().describe("1=Public, 2=Private nonprofit, 3=Private for-profit"),
      per_page: z.number().int().max(100).optional().describe("Number of schools (default 20)"),
    }),
    execute: async ({ ranking, state, ownership, per_page }) => {
      let data;
      if (ranking === "earnings") {
        data = await getHighestEarners({ ownership, perPage: per_page });
      } else if (ranking === "graduation") {
        data = await getHighestGraduationRates({ state, perPage: per_page });
      } else if (ranking === "expensive") {
        data = await getMostExpensive({ ownership, perPage: per_page });
      } else {
        data = await getHighestEarners({ ownership, perPage: per_page });
      }
      if (!data.results?.length) return `No schools found for "${ranking}" ranking.`;
      return JSON.stringify({
        summary: `Top schools by ${ranking}: ${data.results.length} schools`,
        ranking,
        schools: data.results.map(formatSchool),
      });
    },
  },

  {
    name: "scorecard_query",
    description:
      "Advanced College Scorecard query with custom field filters and ranges.\n\n" +
      "Filter examples:\n" +
      "- 'latest.admissions.admission_rate.overall__range=0..0.10' (schools with <10% admission rate)\n" +
      "- 'latest.cost.tuition.in_state__range=..5000' (tuition under $5K)\n" +
      "- 'school.degrees_awarded.predominant=3' (bachelor's-granting)\n" +
      "- 'latest.earnings.10_yrs_after_entry.median__range=80000..' (high-earning graduates)",
    annotations: { title: "College Scorecard: Advanced Query", readOnlyHint: true },
    parameters: z.object({
      filters: z.string().describe("Semicolon-separated filter params: 'school.state=CA;latest.admissions.admission_rate.overall__range=0..0.20;school.degrees_awarded.predominant=3'"),
      sort: z.string().optional().describe("Sort: 'latest.earnings.10_yrs_after_entry.median:desc'"),
      per_page: z.number().int().max(100).optional().describe("Results per page (default 20)"),
    }),
    execute: async ({ filters, sort, per_page }) => {
      const params: Record<string, string | number | undefined> = {};
      for (const f of filters.split(";")) {
        const [key, ...rest] = f.split("=");
        if (key && rest.length) params[key.trim()] = rest.join("=").trim();
      }
      if (sort) params.sort = sort;
      if (per_page) params.per_page = per_page;
      const data = await querySchools(params);
      if (!data.results?.length) return "No schools found matching the filters.";
      return JSON.stringify({
        summary: `College Scorecard query: ${data.metadata.total} schools found, showing ${data.results.length}`,
        total: data.metadata.total,
        schools: data.results.map(formatSchool),
      });
    },
  },
];

// ─── Prompts ─────────────────────────────────────────────────────────

export const prompts: InputPrompt<any, any>[] = [
  {
    name: "college_roi",
    description: "Analyze the return on investment of college — compare costs, debt, and earnings across school types.",
    load: async () =>
      "Analyze college ROI using the College Scorecard:\n\n" +
      "1. Use scorecard_top ranking='earnings' per_page=10 — schools with highest post-grad earnings\n" +
      "2. Use scorecard_top ranking='expensive' per_page=10 — most expensive schools\n" +
      "3. Use scorecard_search ownership=1 sort='latest.earnings.10_yrs_after_entry.median:desc' per_page=10 — top public schools by earnings\n" +
      "4. Use scorecard_search ownership=2 sort='latest.earnings.10_yrs_after_entry.median:desc' per_page=10 — top private nonprofit by earnings\n\n" +
      "Compare: tuition vs earnings, debt vs earnings ratio, public vs private ROI. " +
      "Cross-reference with FRED (SLOAS — student loan debt outstanding) and BLS (employment by education level).",
  },
];

export { clearCache } from "../sdk/college-scorecard.js";
