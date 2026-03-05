/**
 * sec MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import {
  getCompanyByCik,
  getCompanyFacts,
  searchEdgar,
  extractConceptData,
  summarizeFinancials,
  xbrlConcepts,
  type SecFiling,
} from "./sdk.js";
import { tableResponse, listResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "sec_company_search",
    description:
      "Look up a company on SEC EDGAR by CIK number. Returns company name, " +
      "tickers, SIC code, state, and recent filings list.\n\n" +
      "Common CIK numbers:\n" +
      "- Apple: 0000320193\n" +
      "- Microsoft: 0000789019\n" +
      "- Amazon: 0001018724\n" +
      "- Lockheed Martin: 0000936468\n" +
      "- Raytheon (RTX): 0000101829\n" +
      "- Boeing: 0000012927\n\n" +
      "To find CIK: search by company name using sec_filing_search.",
    annotations: { title: "SEC: Company Lookup", readOnlyHint: true },
    parameters: z.object({
      cik: z.string().describe("10-digit CIK number (e.g., '0000320193' for Apple). Leading zeros optional."),
    }),
    execute: async ({ cik }) => {
      const res = await getCompanyByCik(cik);

      const filings = res.filings?.recent;
      const forms = filings?.form || [];
      const dates = filings?.filingDate || [];
      const descriptions = filings?.primaryDocDescription || [];
      const accessions = filings?.accessionNumber || [];

      // Last 15 non-insider filings (skip Form 3, 4, 5, 144)
      const majorFilings: SecFiling[] = [];
      for (let i = 0; i < forms.length && majorFilings.length < 15; i++) {
        if (["3", "4", "5", "144"].includes(forms[i])) continue;
        majorFilings.push({
          form: forms[i],
          date: dates[i],
          description: descriptions[i] || "No description",
          accessionNumber: accessions[i],
        });
      }

      return recordResponse(
        `SEC EDGAR: ${res.name || "Unknown"} (CIK ${res.cik}) — ${res.tickers?.join(", ") || "no tickers"}`,
        {
          company: {
            cik: res.cik,
            name: res.name,
            tickers: res.tickers || [],
            exchanges: res.exchanges || [],
            sic: res.sic,
            sicDescription: res.sicDescription,
            stateOfIncorporation: res.stateOfIncorporation,
            entityType: res.entityType,
            category: res.category,
            fiscalYearEnd: res.fiscalYearEnd,
            formerNames: res.formerNames || [],
          },
          recentFilings: majorFilings,
        },
      );
    },
  },

  {
    name: "sec_company_financials",
    description:
      "Get financial data (revenue, net income, assets, etc.) from SEC XBRL filings for a company. " +
      "Returns standardized financial data extracted from 10-K and 10-Q filings.\n\n" +
      "Requires CIK number. Use sec_company_search to look up filings first.\n\n" +
      "Common XBRL concepts: Revenues, NetIncomeLoss, Assets, Liabilities, " +
      "StockholdersEquity, EarningsPerShareBasic, CashAndCashEquivalentsAtCarryingValue",
    annotations: { title: "SEC: Company Financial Facts", readOnlyHint: true },
    parameters: z.object({
      cik: z.string().describe("10-digit CIK number (e.g., '0000320193' for Apple)"),
      metric: z.string().optional().describe(
        "Specific XBRL concept to retrieve (e.g., 'Revenues', 'NetIncomeLoss', 'Assets'). " +
        "Omit to get a summary of available key metrics.",
      ),
    }),
    execute: async ({ cik, metric }) => {
      const facts = await getCompanyFacts(cik);
      const usgaap = facts.facts["us-gaap"];

      if (!usgaap) {
        return emptyResponse(`No US-GAAP financial data found for CIK ${cik}.`);
      }

      // Specific metric requested
      if (metric) {
        const data = extractConceptData(facts, metric);
        if (!data) {
          const available = Object.keys(usgaap).slice(0, 30);
          return listResponse(
            `Metric "${metric}" not found for ${facts.entityName}. Showing first 30 available metrics.`,
            { items: available.map(m => ({ metric: m })) },
          );
        }
        return recordResponse(
          `${facts.entityName} — ${data.concept} (${data.label}): ${data.annual.length} annual + ${data.quarterly.length} quarterly observations`,
          {
            entityName: facts.entityName,
            concept: data.concept,
            label: data.label,
            description: data.description,
            unit: data.unit,
            annual: data.annual.map(d => ({ period: d.end, value: d.val, filed: d.filed })),
            quarterly: data.quarterly.map(d => ({ period: d.end, value: d.val, filed: d.filed })),
          },
        );
      }

      // Summary of key metrics
      const summary = summarizeFinancials(facts);
      return recordResponse(
        `SEC Financial Facts: ${summary.entityName} — ${summary.keyMetrics.length} key metrics found (${summary.totalMetrics} total available)`,
        summary,
      );
    },
  },

  {
    name: "sec_filing_search",
    description:
      "Full-text search across all SEC EDGAR filings. " +
      "Search by company name, keyword, or topic.\n\n" +
      "Form types: 10-K (annual), 10-Q (quarterly), 8-K (current events), " +
      "DEF 14A (proxy), S-1 (IPO registration)",
    annotations: { title: "SEC: Search Filings", readOnlyHint: true },
    parameters: z.object({
      query: z.string().describe("Search query — company name, keyword, or topic"),
      forms: z.string().optional().describe("Comma-separated form types to filter: '10-K', '10-Q', '8-K', 'DEF 14A', 'S-1'"),
      start_date: z.string().optional().describe("Start date YYYY-MM-DD"),
      end_date: z.string().optional().describe("End date YYYY-MM-DD"),
    }),
    execute: async ({ query, forms, start_date, end_date }) => {
      const result = await searchEdgar(query, {
        forms,
        startDate: start_date,
        endDate: end_date,
      });

      if (result.hits.length === 0) {
        return emptyResponse(`No filings found for "${query}".`);
      }

      const filings = result.hits.map(hit => ({
        company: hit.names[0] || "?",
        form: hit.form,
        date: hit.date,
        description: hit.description,
      }));

      return listResponse(
        `SEC filing search "${query}": ${result.total} results, showing ${filings.length}`,
        { items: filings, total: result.total },
      );
    },
  },
];
