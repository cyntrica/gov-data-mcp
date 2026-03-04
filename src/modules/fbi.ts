/**
 * FBI Crime Data Explorer MCP module — tools + metadata.
 * Delegates all API calls to sdk/fbi.
 *
 * Base URL: https://api.usa.gov/crime/fbi/cde
 * Endpoint categories: Agency, Summarized, Arrest, Expanded Homicide,
 * Expanded Property, Hate Crime, Law Enforcement Employees, LESDC, Use of Force
 */

import { z } from "zod";
import type { Tool, InputPrompt } from "fastmcp";
import { keysEnum, describeEnum } from "../enum-utils.js";
import {
  getAgenciesByState,
  getSummarizedCrime,
  getArrestData,
  getExpandedHomicide,
  getExpandedProperty,
  getHateCrime,
  getLawEnforcementEmployees,
  getLesdcData,
  getNibrsData,
  getUseOfForceFederal,
  getUseOfForceNational,
  getUseOfForceState,
  SUMMARIZED_OFFENSES,
  ARREST_OFFENSES,
  NIBRS_OFFENSES,
  SUPPLEMENTAL_OFFENSES,
  HATE_CRIME_BIAS_CODES,
  LESDC_CHART_TYPES,
} from "../sdk/fbi.js";

// ─── Zod enums derived from SDK constants ────────────────────────────

const summarizedEnum = keysEnum(SUMMARIZED_OFFENSES);
const arrestEnum = keysEnum(ARREST_OFFENSES);
const nibrsEnum = keysEnum(NIBRS_OFFENSES);
const biasEnum = keysEnum(HATE_CRIME_BIAS_CODES);
const lesdcEnum = [...LESDC_CHART_TYPES] as [string, ...string[]];

// ─── Metadata (server.ts reads these) ────────────────────────────────

export const name = "fbi";
export const displayName = "FBI Crime Data Explorer";
export const description =
  "National/state/agency crime statistics, arrests, hate crimes, " +
  "law enforcement employees, expanded homicide data, and use of force from the FBI CDE API";
export const auth = { envVar: "DATA_GOV_API_KEY", signup: "https://api.data.gov/signup/" };
export const workflow = "fbi_agencies → fbi_crime_summarized or fbi_arrest_data → fbi_hate_crime for detail";
export const tips =
  "State codes: two-letter abbreviations (CA, TX, NY). " +
  "Data typically available up to 1-2 years ago. " +
  "Summarized offense codes: V (violent), P (property), HOM, RPE, ROB, ASS, BUR, LAR, MVT, ARS. " +
  "Arrest offense codes are numeric: 'all', '11' (murder), '20' (rape), '30' (robbery), '50' (assault), '150' (drug abuse).";

export const reference = {
  summarizedOffenses: SUMMARIZED_OFFENSES,
  arrestOffenses: ARREST_OFFENSES,
  nibrsOffenses: NIBRS_OFFENSES,
  supplementalOffenses: SUPPLEMENTAL_OFFENSES,
  hateCrimeBiasCodes: HATE_CRIME_BIAS_CODES,
  lesdcChartTypes: LESDC_CHART_TYPES,
  docs: {
    "API Docs": "https://cde.ucr.cjis.gov/LATEST/webapp/#/pages/docApi",
    "Explorer": "https://cde.ucr.cjis.gov/LATEST/webapp/#/pages/explorer/crime/crime-trend",
    "Get Key": "https://api.data.gov/signup/",
  },
};

// ─── Tools ───────────────────────────────────────────────────────────

export const tools: Tool<any, any>[] = [
  // ── 1. Agency Lookup ─────────────────────────────────────────────
  {
    name: "fbi_agencies",
    description:
      "List law enforcement agencies in a U.S. state from the FBI CDE. " +
      "Returns agencies grouped by county with ORI codes, coordinates, and NIBRS participation dates. " +
      "Use ORI codes from this tool to query agency-level data in other FBI tools.",
    annotations: { title: "FBI: Agencies by State", readOnlyHint: true },
    parameters: z.object({
      state: z.string().describe("Two-letter state abbreviation (e.g., 'CA', 'TX', 'WA')"),
    }),
    execute: async ({ state }) => {
      const data = await getAgenciesByState(state);
      return JSON.stringify(data);
    },
  },

  // ── 2. Summarized Crime ──────────────────────────────────────────
  {
    name: "fbi_crime_summarized",
    description:
      "Get summarized UCR crime data from the FBI at national, state, or agency level. " +
      "Covers 10 offense categories: V (violent crime), P (property crime), " +
      "HOM (homicide), RPE (rape), ROB (robbery), ASS (aggravated assault), " +
      "BUR (burglary), LAR (larceny/theft), MVT (motor vehicle theft), ARS (arson). " +
      "Returns year-by-year data with counts and rates.",
    annotations: { title: "FBI: Summarized Crime (UCR)", readOnlyHint: true },
    parameters: z.object({
      offense: z.enum(summarizedEnum).describe(
        `UCR offense code: ${describeEnum(SUMMARIZED_OFFENSES)}`
      ),
      state: z.string().optional().describe("Two-letter state abbreviation for state-level data"),
      ori: z.string().optional().describe("Agency ORI code for agency-level data (e.g., 'WASPD0000')"),
      from_year: z.number().int().optional().describe("Start year (default: 5 years ago)"),
      to_year: z.number().int().optional().describe("End year (default: current year)"),
    }),
    execute: async ({ offense, state, ori, from_year, to_year }) => {
      const level = ori ? "agency" : state ? "state" : "national";
      const data = await getSummarizedCrime({
        level, offense: offense.toUpperCase(), state, ori,
        fromYear: from_year, toYear: to_year,
      });
      return JSON.stringify(data);
    },
  },

  // ── 3. Arrest Data ───────────────────────────────────────────────
  {
    name: "fbi_arrest_data",
    description:
      "Get arrest statistics from the FBI at national, state, or agency level. " +
      "Offense codes are numeric: 'all' (all offenses), '11' (murder), '20' (rape), " +
      "'30' (robbery), '50' (aggravated assault), '150' (drug abuse), and 40+ more. " +
      "Returns counts or totals broken down by year, age, sex, race, ethnicity.",
    annotations: { title: "FBI: Arrest Data", readOnlyHint: true },
    parameters: z.object({
      offense: z.enum(arrestEnum).describe(
        `Arrest offense code: ${describeEnum(ARREST_OFFENSES, 6)}`
      ),
      state: z.string().optional().describe("Two-letter state abbreviation for state-level data"),
      ori: z.string().optional().describe("Agency ORI code for agency-level data"),
      type: z.enum(["counts", "totals"]).optional().describe("Data type: 'counts' (default) or 'totals'"),
      from_year: z.number().int().optional().describe("Start year (default: 5 years ago)"),
      to_year: z.number().int().optional().describe("End year (default: current year)"),
    }),
    execute: async ({ offense, state, ori, type, from_year, to_year }) => {
      const level = ori ? "agency" : state ? "state" : "national";
      const data = await getArrestData({
        level, offense, state, ori, type,
        fromYear: from_year, toYear: to_year,
      });
      return JSON.stringify(data);
    },
  },

  // ── 4. Expanded Homicide ─────────────────────────────────────────
  {
    name: "fbi_expanded_homicide",
    description:
      "Get expanded homicide (Supplementary Homicide Report) data from the FBI. " +
      "Includes victim/offender demographics, weapons used, and circumstances. " +
      "Available at national, state, or agency level.",
    annotations: { title: "FBI: Expanded Homicide (SHR)", readOnlyHint: true },
    parameters: z.object({
      state: z.string().optional().describe("Two-letter state abbreviation for state-level data"),
      ori: z.string().optional().describe("Agency ORI code for agency-level data"),
      type: z.enum(["counts", "totals"]).optional().describe("Data type (default: counts)"),
      from_year: z.number().int().optional().describe("Start year"),
      to_year: z.number().int().optional().describe("End year"),
    }),
    execute: async ({ state, ori, type, from_year, to_year }) => {
      const level = ori ? "agency" : state ? "state" : "national";
      const data = await getExpandedHomicide({
        level, state, ori, type, fromYear: from_year, toYear: to_year,
      });
      return JSON.stringify(data);
    },
  },

  // ── 5. Hate Crime ────────────────────────────────────────────────
  {
    name: "fbi_hate_crime",
    description:
      "Get hate crime data from the FBI at national, state, or agency level. " +
      "Returns incidents broken down by bias category (race, religion, sexual orientation, etc.), " +
      "offense type, victim type, offender demographics, and location type. " +
      "Optionally filter by bias code (e.g., '12'=Anti-Black, '14'=Anti-Jewish, '22'=Anti-Islamic, '41'=Anti-Gay).",
    annotations: { title: "FBI: Hate Crime Data", readOnlyHint: true },
    parameters: z.object({
      state: z.string().optional().describe("Two-letter state abbreviation for state-level data"),
      ori: z.string().optional().describe("Agency ORI code for agency-level data"),
      bias: z.enum(biasEnum).optional().describe(
        `Bias code filter: ${describeEnum(HATE_CRIME_BIAS_CODES, 6)}`
      ),
      type: z.enum(["counts", "totals"]).optional().describe("Data type"),
      from_year: z.number().int().optional().describe("Start year"),
      to_year: z.number().int().optional().describe("End year"),
    }),
    execute: async ({ state, ori, bias, type, from_year, to_year }) => {
      const level = ori ? "agency" : state ? "state" : "national";
      const data = await getHateCrime({
        level, state, ori, bias, type,
        fromYear: from_year, toYear: to_year,
      });
      return JSON.stringify(data);
    },
  },

  // ── 6. Law Enforcement Employees ─────────────────────────────────
  {
    name: "fbi_law_enforcement_employees",
    description:
      "Get law enforcement employee data (sworn officers, civilian employees) " +
      "at national, state, or agency level. Shows staffing levels over time.",
    annotations: { title: "FBI: Law Enforcement Employees", readOnlyHint: true },
    parameters: z.object({
      state: z.string().optional().describe("Two-letter state abbreviation for state-level data"),
      ori: z.string().optional().describe("Agency ORI code (requires state param too)"),
      from_year: z.number().int().optional().describe("Start year (default: 5 years ago)"),
      to_year: z.number().int().optional().describe("End year (default: current year)"),
    }),
    execute: async ({ state, ori, from_year, to_year }) => {
      const data = await getLawEnforcementEmployees({
        state, ori, fromYear: from_year, toYear: to_year,
      });
      return JSON.stringify(data);
    },
  },

  // ── 7. LESDC ─────────────────────────────────────────────────────
  {
    name: "fbi_lesdc",
    description:
      "Get Law Enforcement Suicide Data Collection (LESDC) statistics. " +
      "Chart types: race, demographics, manner, location, employment, occupation, " +
      "military, totals, duty, exp, experience, suffered, prior, investigation, wellness.",
    annotations: { title: "FBI: Law Enforcement Suicide Data", readOnlyHint: true },
    parameters: z.object({
      chart_type: z.enum(lesdcEnum).describe(
        "LESDC chart type"
      ),
      year: z.number().int().describe("Year to query"),
    }),
    execute: async ({ chart_type, year }) => {
      const data = await getLesdcData({ chartType: chart_type, year });
      return JSON.stringify(data);
    },
  },

  // ── 8. Use of Force ──────────────────────────────────────────────
  {
    name: "fbi_use_of_force",
    description:
      "Get Use of Force data from the FBI. Covers incidents where law enforcement use of force " +
      "resulted in death, serious injury, or firearm discharge. " +
      "Available at federal (all federal agencies) or national (all participating agencies) level. " +
      "Use scope='federal' for federal agencies, 'national' for all agencies participation data.",
    annotations: { title: "FBI: Use of Force", readOnlyHint: true },
    parameters: z.object({
      scope: z.enum(["federal", "national"]).describe(
        "'federal' = federal UoF by year, 'national' = national UoF participation by year"
      ),
      year: z.number().int().describe("Year to query (2019-present)"),
      quarter: z.number().int().optional().describe("Quarter (default: 4 = full year cumulative)"),
    }),
    execute: async ({ scope, year, quarter }) => {
      if (scope === "federal") {
        const data = await getUseOfForceFederal({ year, quarter });
        return JSON.stringify(data);
      } else {
        const data = await getUseOfForceNational({ year, quarter });
        return JSON.stringify(data);
      }
    },
  },

  // ── 9. NIBRS (Incident-Based) ────────────────────────────────────
  {
    name: "fbi_nibrs",
    description:
      "Get NIBRS (National Incident-Based Reporting System) data from the FBI. " +
      "More detailed than summarized UCR data — includes victim/offender demographics, " +
      "relationships, weapons, location, and time of day for 71 offense types. " +
      "Offense codes use NIBRS format: '13A' (aggravated assault), '09A' (murder), " +
      "'23H' (all other larceny), '35A' (drug violations), '220' (burglary), etc.",
    annotations: { title: "FBI: NIBRS Incident Data", readOnlyHint: true },
    parameters: z.object({
      offense: z.enum(nibrsEnum).describe(
        `NIBRS offense code: ${describeEnum(NIBRS_OFFENSES, 6)}`
      ),
      state: z.string().optional().describe("Two-letter state abbreviation for state-level data"),
      ori: z.string().optional().describe("Agency ORI code for agency-level data"),
      type: z.enum(["counts", "totals"]).optional().describe("Data type (default: counts)"),
      from_year: z.number().int().optional().describe("Start year"),
      to_year: z.number().int().optional().describe("End year"),
    }),
    execute: async ({ offense, state, ori, type, from_year, to_year }) => {
      const level = ori ? "agency" : state ? "state" : "national";
      const data = await getNibrsData({
        level, offense, state, ori, type,
        fromYear: from_year, toYear: to_year,
      });
      return JSON.stringify(data);
    },
  },

  // ── 10. Expanded Property (Supplemental) ─────────────────────────
  {
    name: "fbi_expanded_property",
    description:
      "Get expanded property crime details from the FBI (Supplemental Return / Return A data). " +
      "Provides additional breakdowns beyond summarized counts: value of stolen/recovered property, " +
      "type of property, premises involved. Available for burglary (NB), larceny (NL), " +
      "motor vehicle theft (NMVT), and robbery (NROB).",
    annotations: { title: "FBI: Expanded Property Data", readOnlyHint: true },
    parameters: z.object({
      offense: z.enum(keysEnum(SUPPLEMENTAL_OFFENSES)).describe(
        `Offense code: ${describeEnum(SUPPLEMENTAL_OFFENSES)}`
      ),
      state: z.string().optional().describe("Two-letter state abbreviation for state-level data"),
      ori: z.string().optional().describe("Agency ORI code for agency-level data"),
      type: z.enum(["counts", "totals"]).optional().describe("Data type (default: counts)"),
      from_year: z.number().int().optional().describe("Start year"),
      to_year: z.number().int().optional().describe("End year"),
    }),
    execute: async ({ offense, state, ori, type, from_year, to_year }) => {
      const level = ori ? "agency" : state ? "state" : "national";
      const data = await getExpandedProperty({
        level, offense, state, ori, type,
        fromYear: from_year, toYear: to_year,
      });
      return JSON.stringify(data);
    },
  },
];

export const prompts: InputPrompt<any, any>[] = [
  {
    name: "crime_overview",
    description: "National and state crime trends overview.",
    load: async () =>
      "Build a crime statistics overview:\n\n" +
      "1. Use fbi_crime_summarized with offense='V' for national violent crime trends\n" +
      "2. Use fbi_crime_summarized with offense='P' for national property crime trends\n" +
      "3. Compare specific states using fbi_crime_summarized with state param\n" +
      "4. Use fbi_arrest_data with offense='all' for arrest trend context\n\n" +
      "Present trends objectively. Note data methodology changes affecting comparisons.",
  },
];

// ─── Re-export cache control from SDK ────────────────────────────────

export { clearCache } from "../sdk/fbi.js";
