/**
 * DOL MCP module — OSHA inspections, violations, accidents; WHD enforcement; UI claims.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import {
  getOshaInspections,
  getOshaViolations,
  getOshaAccidents,
  getOshaAccidentInjuries,
  getWhdEnforcement,
  getUiClaimsNational,
  getUiClaimsState,
  INSPECTION_TYPES,
  VIOLATION_TYPES,
  DATASETS,
} from "../sdk/dol.js";

export const name = "dol";
export const displayName = "DOL (Department of Labor)";
export const description =
  "OSHA workplace safety inspections, violations, and accident investigations. " +
  "WHD wage theft enforcement (back wages, penalties, FLSA/FMLA violations). " +
  "Unemployment Insurance weekly claims (national and state).";
export const auth = {
  envVar: "DOL_API_KEY",
  signup: "https://data.dol.gov/registration",
};
export const workflow =
  "dol_osha_inspections to find inspections → dol_osha_violations for violations found → " +
  "dol_osha_accidents for accident investigations → dol_whd_enforcement for wage theft cases → " +
  "dol_ui_claims_national for unemployment trends";
export const tips =
  "OSHA inspection types: A=Accident, B=Complaint, C=Referral, H=Planned, L=Programmed high-hazard. " +
  "Violation types: S=Serious, W=Willful, R=Repeat, O=Other. " +
  "States use two-letter codes (CA, TX, NY). " +
  "WHD covers FLSA (minimum wage/overtime), FMLA (family leave), Davis-Bacon (prevailing wage), SCA (service contracts). " +
  "Sort uses sort_by (field name) + sort_order ('asc' or 'desc').";

export const reference = {
  inspectionTypes: INSPECTION_TYPES,
  violationTypes: VIOLATION_TYPES,
  datasets: DATASETS,
  docs: {
    "DOL Open Data Portal": "https://data.dol.gov/",
    "DOL API User Guide": "https://data.dol.gov/user-guide",
    "OSHA Data": "https://www.osha.gov/data",
    "WHD Data": "https://www.dol.gov/agencies/whd/data",
  },
};

export const tools: Tool<any, any>[] = [
  {
    name: "dol_osha_inspections",
    description:
      "Search OSHA workplace inspections.\n" +
      "Find inspections by state, establishment name, industry (SIC/NAICS), or type.\n" +
      "Inspection types: A=Accident, B=Complaint, C=Referral, H=Planned, L=Programmed high-hazard.\n" +
      "Returns site details, inspection type/scope, open/close dates.",
    annotations: { title: "DOL: OSHA Inspections", readOnlyHint: true },
    parameters: z.object({
      state: z.string().optional().describe("Two-letter state code: 'CA', 'TX', 'NY'"),
      estab_name: z.string().optional().describe("Establishment name: 'Amazon', 'Walmart', 'Tesla'"),
      naics_code: z.string().optional().describe("NAICS industry code: '236220' (commercial construction)"),
      sic_code: z.string().optional().describe("SIC industry code"),
      insp_type: z.enum(["A", "B", "C", "H", "L"]).optional().describe("Inspection type: A=Accident, B=Complaint, C=Referral, H=Planned, L=High-hazard"),
      sort_by: z.string().optional().describe("Field to sort by: 'open_date' (default), 'close_case_date'"),
      sort_order: z.enum(["desc", "asc"]).optional().describe("Sort direction (default: desc)"),
      limit: z.number().int().max(100).optional().describe("Max results (default 25)"),
      offset: z.number().int().optional().describe("Pagination offset"),
    }),
    execute: async (args) => {
      const data = await getOshaInspections(args);
      if (!Array.isArray(data) || !data.length) return "No OSHA inspections found matching the criteria.";
      return JSON.stringify({
        summary: `OSHA inspections: ${data.length} records`,
        inspections: data.slice(0, 50),
      });
    },
  },

  {
    name: "dol_osha_violations",
    description:
      "Search OSHA violations found during workplace inspections.\n" +
      "Violation types: S=Serious, W=Willful, R=Repeat, O=Other, U=Unclassified, F=Failure to abate.\n" +
      "Returns standard cited, penalty amounts (initial and current), abatement status.\n" +
      "Link to inspections via activity_nr.",
    annotations: { title: "DOL: OSHA Violations", readOnlyHint: true },
    parameters: z.object({
      activity_nr: z.number().int().optional().describe("Inspection activity number (links to specific inspection)"),
      viol_type: z.enum(["S", "W", "R", "O"]).optional().describe("Violation type: S=Serious, W=Willful, R=Repeat, O=Other"),
      standard: z.string().optional().describe("OSHA standard cited: '19100147' (control of hazardous energy)"),
      sort_by: z.string().optional().describe("Field to sort by: 'issuance_date' (default), 'current_penalty'"),
      sort_order: z.enum(["desc", "asc"]).optional().describe("Sort direction (default: desc)"),
      limit: z.number().int().max(100).optional().describe("Max results (default 25)"),
      offset: z.number().int().optional().describe("Pagination offset"),
    }),
    execute: async (args) => {
      const data = await getOshaViolations(args);
      if (!Array.isArray(data) || !data.length) return "No OSHA violations found matching the criteria.";
      return JSON.stringify({
        summary: `OSHA violations: ${data.length} records`,
        violations: data.slice(0, 50),
      });
    },
  },

  {
    name: "dol_osha_accidents",
    description:
      "Search OSHA accident and fatality investigations.\n" +
      "Returns event descriptions, dates, locations, and industry codes.\n" +
      "Use dol_osha_accident_injuries to get injury details for a specific accident.",
    annotations: { title: "DOL: OSHA Accidents", readOnlyHint: true },
    parameters: z.object({
      state: z.string().optional().describe("Two-letter state code: 'CA', 'TX', 'NY'"),
      sic_code: z.string().optional().describe("SIC industry code"),
      event_keyword: z.string().optional().describe("Event keyword: 'fall', 'electrocution', 'struck', 'caught'"),
      sort_by: z.string().optional().describe("Field to sort by: 'event_date' (default)"),
      sort_order: z.enum(["desc", "asc"]).optional().describe("Sort direction (default: desc)"),
      limit: z.number().int().max(100).optional().describe("Max results (default 25)"),
      offset: z.number().int().optional().describe("Pagination offset"),
    }),
    execute: async (args) => {
      const data = await getOshaAccidents(args);
      if (!Array.isArray(data) || !data.length) return "No OSHA accidents found matching the criteria.";
      return JSON.stringify({
        summary: `OSHA accident investigations: ${data.length} records`,
        accidents: data.slice(0, 50),
      });
    },
  },

  {
    name: "dol_osha_accident_injuries",
    description:
      "Get injury details from OSHA accident investigations.\n" +
      "Returns demographics (age, sex), nature of injury, body part, source, degree of injury.\n" +
      "Degree of injury: 1=Fatality, 2=Hospitalized, 3=Non-hospitalized.\n" +
      "Link to accidents via summary_nr.",
    annotations: { title: "DOL: OSHA Accident Injuries", readOnlyHint: true },
    parameters: z.object({
      summary_nr: z.number().int().optional().describe("Accident summary number (links to specific accident)"),
      degree_of_inj: z.number().int().optional().describe("Degree of injury: 1=Fatality, 2=Hospitalized, 3=Non-hospitalized"),
      limit: z.number().int().max(100).optional().describe("Max results (default 25)"),
      offset: z.number().int().optional().describe("Pagination offset"),
    }),
    execute: async (args) => {
      const data = await getOshaAccidentInjuries(args);
      if (!Array.isArray(data) || !data.length) return "No injury records found.";
      return JSON.stringify({
        summary: `OSHA accident injuries: ${data.length} records`,
        injuries: data.slice(0, 50),
      });
    },
  },

  {
    name: "dol_whd_enforcement",
    description:
      "Search WHD (Wage and Hour Division) enforcement cases.\n" +
      "Covers wage theft investigations: back wages owed, penalties assessed, violation counts.\n" +
      "Laws enforced: FLSA (minimum wage/overtime), FMLA (family leave), Davis-Bacon (prevailing wage), SCA (service contracts).\n" +
      "Data available since FY2005.",
    annotations: { title: "DOL: WHD Enforcement", readOnlyHint: true },
    parameters: z.object({
      state: z.string().optional().describe("Two-letter state code: 'CA', 'TX', 'NY'"),
      trade_nm: z.string().optional().describe("Business/trade name: 'McDonald\\'s', 'Subway', 'Walmart'"),
      naics_code: z.string().optional().describe("NAICS industry code: '722511' (full-service restaurants)"),
      sort_by: z.string().optional().describe("Field to sort by: 'findings_end_date' (default), 'bw_atp_amt' (back wages)"),
      sort_order: z.enum(["desc", "asc"]).optional().describe("Sort direction (default: desc)"),
      limit: z.number().int().max(100).optional().describe("Max results (default 25)"),
      offset: z.number().int().optional().describe("Pagination offset"),
    }),
    execute: async (args) => {
      const data = await getWhdEnforcement(args);
      if (!Array.isArray(data) || !data.length) return "No WHD enforcement cases found matching the criteria.";
      return JSON.stringify({
        summary: `WHD enforcement cases: ${data.length} records`,
        cases: data.slice(0, 50),
      });
    },
  },

  {
    name: "dol_ui_claims_national",
    description:
      "Get national weekly Unemployment Insurance (UI) initial and continued claims.\n" +
      "Includes insured unemployment rate and covered employment.\n" +
      "Key economic indicator — spikes indicate labor market stress.",
    annotations: { title: "DOL: UI Claims National", readOnlyHint: true },
    parameters: z.object({
      limit: z.number().int().max(200).optional().describe("Number of weekly records (default 25, use 52 for 1 year)"),
      offset: z.number().int().optional().describe("Pagination offset"),
      sort_by: z.string().optional().describe("Field to sort by: 'rptdate' (default)"),
      sort_order: z.enum(["desc", "asc"]).optional().describe("Sort direction (default: desc)"),
    }),
    execute: async (args) => {
      const data = await getUiClaimsNational(args);
      if (!Array.isArray(data) || !data.length) return "No UI claims data found.";
      return JSON.stringify({
        summary: `National UI claims: ${data.length} weekly records`,
        claims: data.slice(0, 100),
      });
    },
  },

  {
    name: "dol_ui_claims_state",
    description:
      "Get state-level weekly Unemployment Insurance (UI) claims.\n" +
      "Compare initial claims, continued claims, and insured unemployment rate across states.",
    annotations: { title: "DOL: UI Claims by State", readOnlyHint: true },
    parameters: z.object({
      state: z.string().optional().describe("Two-letter state code: 'CA', 'TX', 'NY'. Omit for all states."),
      limit: z.number().int().max(200).optional().describe("Number of records (default 25)"),
      offset: z.number().int().optional().describe("Pagination offset"),
      sort_by: z.string().optional().describe("Field to sort by: 'rptdate' (default)"),
      sort_order: z.enum(["desc", "asc"]).optional().describe("Sort direction (default: desc)"),
    }),
    execute: async (args) => {
      const data = await getUiClaimsState(args);
      if (!Array.isArray(data) || !data.length) return "No state UI claims data found.";
      return JSON.stringify({
        summary: `State UI claims: ${data.length} records${args.state ? ` for ${args.state}` : ""}`,
        claims: data.slice(0, 100),
      });
    },
  },
];

export { clearCache } from "../sdk/dol.js";
