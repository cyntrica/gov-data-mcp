/**
 * BEA MCP module — tools + metadata. Delegates all API calls to sdk/bea.
 *
 * Tools return raw JSON data — no markdown formatting. The client decides how to present it.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import {
  getNationalGdp,
  getGdpByState,
  getPersonalIncome,
  getGdpByIndustry,
} from "../sdk/bea.js";

// ─── Metadata (server.ts reads these) ────────────────────────────────

export const name = "bea";
export const displayName = "Bureau of Economic Analysis";
export const description = "State-level GDP, GDP by industry, personal income by state, national accounts (NIPA)";
export const auth = { envVar: "BEA_API_KEY", signup: "https://apps.bea.gov/API/signup/" };
export const workflow = "Pick the geographic/industry dimension you need → query with state FIPS or industry code";
export const tips = "Key advantage over FRED: state-level GDP and income breakdowns, GDP by NAICS industry.";

export const reference = {
  nipaTables: {
    T10101: "Real GDP and components (percent change)",
    T10106: "Nominal GDP and components",
    T10111: "GDP percent change contributions",
    T20100: "Personal income and disposition",
    T30100: "Government receipts and expenditures",
  } as Record<string, string>,
  gdpIndustryTables: {
    1: "Value added by industry",
    5: "Contributions to percent change in real GDP",
    6: "Value added as percentage of GDP",
    25: "Real value added by industry",
  } as Record<number, string>,
  regionalTables: {
    SAGDP1: "State annual GDP summary",
    SAGDP9: "Real GDP by state",
    SQGDP1: "State quarterly GDP summary",
    SAINC1: "Personal income, population, per capita income",
    SAINC3: "Per capita personal income",
    SAINC4: "Personal income by major component",
  } as Record<string, string>,
  docs: {
    "User Guide": "https://apps.bea.gov/api/_pdf/bea_web_service_api_user_guide.pdf",
    "Developer Page": "https://apps.bea.gov/developers/",
    "Sign Up": "https://apps.bea.gov/API/signup/",
  },
};

// ─── Tools ───────────────────────────────────────────────────────────

export const tools: Tool<any, any>[] = [
  {
    name: "bea_gdp_national",
    description:
      "Get U.S. national GDP data from the NIPA tables. Shows GDP, GDP growth, " +
      "components (consumption, investment, government, net exports), and deflators.\n\n" +
      "Common table names:\n" +
      "- T10101: GDP and major components (real)\n" +
      "- T10106: GDP and major components (nominal)\n" +
      "- T10111: GDP percent change\n" +
      "- T20100: Personal income and its disposition\n" +
      "- T30100: Government receipts and expenditures",
    annotations: { title: "BEA: National GDP", readOnlyHint: true },
    parameters: z.object({
      table_name: z.string().optional().describe(
        "NIPA table name (default: T10101 — Real GDP). Other: T10106 (nominal GDP), T10111 (% change), T20100 (personal income)",
      ),
      frequency: z.enum(["Q", "A", "M"]).optional().describe("Frequency: Q=quarterly (default), A=annual, M=monthly"),
      year: z.string().optional().describe("Year(s) to fetch. Use 'X' for all, 'LAST5' for last 5, or specific year. Default: LAST5"),
    }),
    execute: async ({ table_name, frequency, year }) => {
      const data = await getNationalGdp({ tableName: table_name, frequency, year });
      if (!data.series.length) return JSON.stringify({ summary: "No GDP data returned.", ...data });
      return JSON.stringify({
        summary: `BEA National GDP — Table ${data.table} (${data.frequency}): ${data.dataRows} rows, ${data.series.length} series`,
        ...data,
      });
    },
  },

  {
    name: "bea_gdp_by_state",
    description:
      "Get gross domestic product for U.S. states from BEA Regional dataset.\n\n" +
      "Table options:\n" +
      "- SAGDP1: State annual GDP summary (default)\n" +
      "- SAGDP9: Real GDP by state\n" +
      "- SQGDP1: State quarterly GDP summary\n\n" +
      "GeoFips: 'STATE' for all states, or 5-digit FIPS (e.g. '06000' for CA)",
    annotations: { title: "BEA: GDP by State", readOnlyHint: true },
    parameters: z.object({
      table_name: z.string().optional().describe(
        "Regional table: 'SAGDP1' (annual GDP summary, default), 'SAGDP9' (real GDP), 'SQGDP1' (quarterly GDP summary)",
      ),
      geo_fips: z.string().optional().describe(
        "Geography: 'STATE' (all states, default), or state FIPS + '000' (e.g. '06000' for CA, '48000' for TX)",
      ),
      line_code: z.string().optional().describe(
        "Line code: '1' (all industry, default), '2' (private), '3' (government)",
      ),
      year: z.string().optional().describe("Year(s): 'LAST5' (default), 'LAST10', 'ALL', or comma-separated years"),
    }),
    execute: async ({ table_name, geo_fips, line_code, year }) => {
      const data = await getGdpByState({ tableName: table_name, geoFips: geo_fips, lineCode: line_code, year });
      if (data.states && !data.states.length) return JSON.stringify({ summary: "No state GDP data returned.", ...data });
      if (data.states) {
        return JSON.stringify({
          summary: `GDP by state (${data.year}): ${data.states.length} states, values in ${data.unit}`,
          ...data,
        });
      }
      return JSON.stringify({
        summary: `BEA State GDP for ${data.geoFips}: ${data.series?.length ?? 0} series, values in ${data.unit}`,
        ...data,
      });
    },
  },

  {
    name: "bea_personal_income",
    description:
      "Get personal income data by state from BEA Regional dataset.\n\n" +
      "Table options:\n" +
      "- SAINC1: Personal income summary (income, population, per capita) — default\n" +
      "- SAINC3: Per capita personal income only\n" +
      "- SAINC4: Personal income by major component (wages, dividends, transfers)\n\n" +
      "LineCode for SAINC1: 1=personal income, 2=population, 3=per capita income (default)\n" +
      "LineCode for SAINC4: 1=total, 50=wages, 45=dividends/interest/rent, 47=transfer receipts",
    annotations: { title: "BEA: Personal Income by State", readOnlyHint: true },
    parameters: z.object({
      table_name: z.string().optional().describe(
        "'SAINC1' (personal income summary, default), 'SAINC3' (per capita only), 'SAINC4' (by component)",
      ),
      geo_fips: z.string().optional().describe(
        "'STATE' (all states, default), or state FIPS + '000'. 'COUNTY' for all counties, 'MSA' for all metro areas.",
      ),
      line_code: z.string().optional().describe(
        "SAINC1: '3' (per capita, default), '1' (personal income), '2' (population). SAINC4: '50' (wages), '45' (property income), '47' (transfers)",
      ),
      year: z.string().optional().describe("Year(s): 'LAST5' (default), 'ALL', or comma-separated years"),
    }),
    execute: async ({ table_name, geo_fips, line_code, year }) => {
      const data = await getPersonalIncome({ tableName: table_name, geoFips: geo_fips, lineCode: line_code, year });
      if (!data.states.length) return JSON.stringify({ summary: "No personal income data returned.", ...data });
      return JSON.stringify({
        summary: `BEA Personal Income — ${data.table} (${data.year}): ${data.states.length} areas, values ${data.unit}`,
        ...data,
      });
    },
  },

  {
    name: "bea_gdp_by_industry",
    description:
      "Get GDP contribution by industry sector nationally from BEA GDPbyIndustry dataset.\n\n" +
      "TableID options:\n" +
      "- 1: Value added by industry (default)\n" +
      "- 5: Contributions to percent change in real GDP\n" +
      "- 6: Value added percent shares\n" +
      "- 25: Real value added by industry\n\n" +
      "Industry='ALL' returns all sectors.",
    annotations: { title: "BEA: GDP by Industry", readOnlyHint: true },
    parameters: z.object({
      table_id: z.string().optional().describe(
        "Table ID: '1' (value added, default), '5' (contributions to GDP growth), '6' (% shares), '25' (real value added)",
      ),
      frequency: z.enum(["Q", "A"]).optional().describe("Frequency: Q=quarterly (default), A=annual"),
      year: z.string().optional().describe("Year(s): comma-separated or 'ALL'. Default: last 3 years"),
      industry: z.string().optional().describe(
        "'ALL' (default), or specific NAICS codes: '11' (agriculture), '21' (mining), '23' (construction), " +
        "'31-33' (manufacturing), '42' (wholesale), '44-45' (retail), '51' (information), '52' (finance)",
      ),
    }),
    execute: async ({ table_id, frequency, year, industry }) => {
      const data = await getGdpByIndustry({ tableId: table_id, frequency, year, industry });
      if (!data.industries.length) return JSON.stringify({ summary: "No industry GDP data returned.", ...data });
      return JSON.stringify({
        summary: `BEA GDP by Industry — Table ${data.tableId}: ${data.industries.length} industries`,
        ...data,
      });
    },
  },
];

// ─── Re-export cache control from SDK ────────────────────────────────

export { clearCache } from "../sdk/bea.js";
