/**
 * CFPB MCP module — Consumer Financial Protection Bureau complaint database.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import {
  searchComplaints,
  getComplaintAggregations,
  getComplaintTrends,
  getComplaintById,
  getStateComplaints,
  suggestCompany,
  suggestSearch,
  PRODUCTS,
  AGG_FIELDS,
} from "../sdk/cfpb.js";

export const name = "cfpb";
export const displayName = "CFPB (Consumer Financial Protection Bureau)";
export const description =
  "Consumer complaint database with 13M+ complaints against financial companies. " +
  "Search by company, product, state, issue, date. Track complaint trends and company response patterns.";
export const workflow =
  "cfpb_suggest_company to find exact name → cfpb_search_complaints for individual complaints → " +
  "cfpb_complaint_aggregations for counts by field → cfpb_complaint_trends (with lens: overview/product/issue/tags) for time series → " +
  "cfpb_state_complaints for geographic breakdown → cfpb_complaint_detail for a specific complaint by ID";
export const tips =
  "Products: 'Mortgage', 'Credit reporting...', 'Debt collection', 'Credit card or prepaid card', 'Checking or savings account', " +
  "'Student loan', 'Vehicle loan or lease'. States: two-letter codes (CA, TX, NY). " +
  "Sort: 'created_date_desc' (newest), 'created_date_asc', 'relevance_desc', 'relevance_asc'. " +
  "Date format: YYYY-MM-DD. Use has_narrative=true for complaints with consumer stories. " +
  "Trends: lens='overview' for totals, 'product'/'issue'/'tags' for breakdowns. sub_lens for drill-down. " +
  "Filters: submitted_via (Web/Phone/Postal mail), timely (Yes/No), zip_code. " +
  "Company names auto-retry with fuzzy search if exact match fails.";

export const reference = {
  products: PRODUCTS,
  aggregationFields: AGG_FIELDS,
  docs: {
    "API Documentation": "https://cfpb.github.io/api/ccdb/",
    "Complaint Database": "https://www.consumerfinance.gov/data-research/consumer-complaints/",
  },
};

export const tools: Tool<any, any>[] = [
  {
    name: "cfpb_search_complaints",
    description:
      "Search the CFPB consumer complaint database (13M+ records).\n" +
      "Find complaints by company, product, state, issue, date, or keyword.\n" +
      "Returns individual complaints with company responses.\n" +
      "Company names auto-retry with fuzzy search if exact match fails (e.g. 'Wells Fargo' will find 'WELLS FARGO & COMPANY').\n" +
      "Products: 'Mortgage', 'Debt collection', 'Credit card or prepaid card', 'Checking or savings account', " +
      "'Student loan', 'Vehicle loan or lease', 'Credit reporting, credit repair services, or other personal consumer reports'.",
    annotations: { title: "CFPB: Search Complaints", readOnlyHint: true },
    parameters: z.object({
      search_term: z.string().optional().describe("Free-text search across complaint narratives"),
      product: z.string().optional().describe("Financial product: 'Mortgage', 'Debt collection', 'Credit card or prepaid card', etc."),
      company: z.string().optional().describe("Company name: 'Wells Fargo', 'Bank of America', 'Equifax', etc."),
      state: z.string().optional().describe("Two-letter state code: 'CA', 'TX', 'NY'"),
      issue: z.string().optional().describe("Issue type: 'Incorrect information on your report', 'Loan modification', etc."),
      date_received_min: z.string().optional().describe("Start date (YYYY-MM-DD): '2020-01-01'"),
      date_received_max: z.string().optional().describe("End date (YYYY-MM-DD): '2024-12-31'"),
      has_narrative: z.boolean().optional().describe("Only complaints with consumer narrative text (true/false)"),
      submitted_via: z.enum(["Web", "Referral", "Phone", "Postal mail", "Fax", "Email"]).optional().describe("Submission channel"),
      timely: z.enum(["Yes", "No"]).optional().describe("Whether company responded timely"),
      zip_code: z.string().optional().describe("Filter by ZIP code"),
      tags: z.enum(["Older American", "Servicemember"]).optional().describe("Tag filter"),
      size: z.number().int().max(100).optional().describe("Results per page (default 10, max 100)"),
      sort: z.enum(["created_date_desc", "created_date_asc", "relevance_desc", "relevance_asc"]).optional().describe("Sort order"),
    }),
    execute: async (args) => {
      const data = await searchComplaints({ ...args, no_aggs: true });
      const total = typeof data.hits?.total === "object" ? data.hits.total.value : data.hits?.total ?? 0;
      const complaints = data.hits?.hits?.map(h => h._source) ?? [];
      if (!complaints.length) return "No complaints found matching the search criteria.";
      return JSON.stringify({
        summary: `CFPB complaints: ${total.toLocaleString()} total matches, showing ${complaints.length}`,
        meta: data._meta,
        total,
        complaints: complaints.slice(0, 50),
      });
    },
  },

  {
    name: "cfpb_complaint_aggregations",
    description:
      "Get complaint counts grouped by a field (product, company, state, issue, etc.).\n" +
      "Useful for ranking companies by complaint volume, identifying top issues, or comparing states.\n" +
      "Aggregation fields: 'product', 'company', 'state', 'issue', 'company_response', 'timely', 'submitted_via', 'tags'.",
    annotations: { title: "CFPB: Complaint Aggregations", readOnlyHint: true },
    parameters: z.object({
      field: z.enum(["product", "company", "state", "issue", "company_response", "timely", "submitted_via", "tags"]).describe("Field to group by"),
      product: z.string().optional().describe("Filter by product: 'Mortgage', 'Debt collection', etc."),
      company: z.string().optional().describe("Filter by company: 'Wells Fargo', 'Bank of America', etc."),
      state: z.string().optional().describe("Filter by state: 'CA', 'TX', 'NY'"),
      issue: z.string().optional().describe("Filter by issue type"),
      date_received_min: z.string().optional().describe("Start date (YYYY-MM-DD)"),
      date_received_max: z.string().optional().describe("End date (YYYY-MM-DD)"),
    }),
    execute: async (args) => {
      const data = await getComplaintAggregations(args);
      const total = typeof data.hits?.total === "object" ? data.hits.total.value : data.hits?.total ?? 0;
      // Extract aggregation buckets — the key varies by field
      const aggs = (data as any).aggregations ?? (data as any).aggs ?? {};
      return JSON.stringify({
        summary: `CFPB aggregation by '${args.field}': ${total.toLocaleString()} total complaints`,
        total,
        aggregations: aggs,
        meta: data._meta,
      });
    },
  },

  {
    name: "cfpb_complaint_trends",
    description:
      "Get complaint trends over time using the CFPB Trends API.\n" +
      "Uses dedicated /trends endpoint with lens-based aggregation.\n" +
      "Lens options: 'overview' (total counts), 'product' (by product), 'issue' (by issue), 'tags' (by tag).\n" +
      "Sub-lens allows drilling into sub-categories within the lens.",
    annotations: { title: "CFPB: Complaint Trends", readOnlyHint: true },
    parameters: z.object({
      lens: z.enum(["overview", "product", "issue", "tags"]).optional().describe("Trend lens (default: overview)"),
      sub_lens: z.enum(["issue", "product", "sub_product", "sub_issue", "tags"]).optional().describe("Sub-lens drill-down"),
      sub_lens_depth: z.number().int().optional().describe("Top N sub-aggregations to return (default 10)"),
      focus: z.string().optional().describe("Focus charts on a specific product or company name"),
      product: z.string().optional().describe("Financial product: 'Mortgage', 'Debt collection', etc."),
      company: z.string().optional().describe("Company name: 'Wells Fargo', 'Equifax', etc."),
      state: z.string().optional().describe("Two-letter state code: 'CA', 'TX', 'NY'"),
      issue: z.string().optional().describe("Issue type filter"),
      date_received_min: z.string().optional().describe("Start date (YYYY-MM-DD)"),
      date_received_max: z.string().optional().describe("End date (YYYY-MM-DD)"),
    }),
    execute: async (args) => {
      const data = await getComplaintTrends(args);
      return JSON.stringify(data);
    },
  },

  {
    name: "cfpb_complaint_detail",
    description:
      "Get full details for a specific complaint by its Complaint ID.\n" +
      "Returns all fields: product, issue, company, narrative (if consented), response, dates, etc.",
    annotations: { title: "CFPB: Complaint Detail", readOnlyHint: true },
    parameters: z.object({
      complaint_id: z.number().int().describe("CFPB Complaint ID number"),
    }),
    execute: async ({ complaint_id }) => {
      const data = await getComplaintById(complaint_id);
      return JSON.stringify(data);
    },
  },

  {
    name: "cfpb_state_complaints",
    description:
      "Get complaint information broken down by state (geographic view).\n" +
      "Returns complaint counts and data for each state. Useful for maps and state comparisons.\n" +
      "Applies the same filters as search (product, company, date, etc.).",
    annotations: { title: "CFPB: Complaints by State", readOnlyHint: true },
    parameters: z.object({
      product: z.string().optional().describe("Filter by product: 'Mortgage', 'Debt collection', etc."),
      company: z.string().optional().describe("Filter by company: 'Wells Fargo', etc."),
      issue: z.string().optional().describe("Filter by issue type"),
      date_received_min: z.string().optional().describe("Start date (YYYY-MM-DD)"),
      date_received_max: z.string().optional().describe("End date (YYYY-MM-DD)"),
      tags: z.enum(["Older American", "Servicemember"]).optional().describe("Tag filter"),
    }),
    execute: async (args) => {
      const data = await getStateComplaints(args);
      return JSON.stringify(data);
    },
  },

  {
    name: "cfpb_suggest_company",
    description:
      "Autocomplete/suggest company names from the CFPB complaint database.\n" +
      "Useful for finding the exact company name before searching complaints.",
    annotations: { title: "CFPB: Suggest Company", readOnlyHint: true },
    parameters: z.object({
      text: z.string().describe("Partial company name to search: 'wells', 'bank of', 'equi'"),
      size: z.number().int().max(20).optional().describe("Max suggestions (default 10)"),
    }),
    execute: async ({ text, size }) => {
      const data = await suggestCompany(text, size);
      const suggestions = data.suggest?.[0]?.options?.map(o => o.text) ?? [];
      if (!suggestions.length) return `No company name suggestions for "${text}".`;
      return JSON.stringify({
        summary: `Company suggestions for "${text}": ${suggestions.length} matches`,
        suggestions,
      });
    },
  },
];

export { clearCache } from "../sdk/cfpb.js";
