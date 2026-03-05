/**
 * fbi module metadata.
 */

import { SUMMARIZED_OFFENSES, ARREST_OFFENSES, NIBRS_OFFENSES, SUPPLEMENTAL_OFFENSES, HATE_CRIME_BIAS_CODES, LESDC_CHART_TYPES } from "./sdk.js";

export const name = "fbi";
export const displayName = "FBI Crime Data Explorer";
export const category = "Justice";
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

