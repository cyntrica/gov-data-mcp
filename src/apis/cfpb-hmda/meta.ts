/**
 * cfpb-hmda module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "cfpb-hmda",
  displayName: "CFPB HMDA (Home Mortgage Disclosure Act)",
  category: "Finance",
  description:
    "Home Mortgage Disclosure Act data from the CFPB/FFIEC. Nationwide and filtered mortgage lending aggregations by race, ethnicity, sex, loan type, and geography. Institution filers list, rate spread calculator, and ULI (Universal Loan Identifier) tools.",
  workflow:
    "hmda_filers to find institutions (LEIs) → hmda_nationwide_aggregations for national mortgage stats by year → hmda_filtered_aggregations for state/MSA/institution breakdowns → hmda_rate_spread to calculate rate spreads → hmda_check_digit / hmda_validate_uli for ULI operations",
  tips:
    "Year is required for aggregation queries (available years vary, typically 2018+). Filter params accept comma-separated values for multiple selections (e.g. races='White,Asian'). Geographic filters: states (FIPS codes like '06' for CA), msamds (MSA/MD codes), counties (FIPS). Institution filter: leis (Legal Entity Identifiers). Rate spread calculator requires specific action_taken_type (1-8), amortization_type ('FixedRate' or 'VariableRate'), and lock_in_date in MM/DD/YYYY format.",
  domains: ["finance", "housing"],
  crossRef: [
    { question: "housing", route: "hmda_nationwide_aggregations, hmda_filtered_aggregations (mortgage lending data by demographics, geography)" },
    { question: "banking", route: "hmda_filers (mortgage lending institutions), hmda_filtered_aggregations (lending by institution LEI)" },
    { question: "state-level", route: "hmda_filtered_aggregations (mortgage data filtered by state FIPS codes)" },
  ],
  reference: {
    docs: {
      "HMDA Data Browser": "https://ffiec.cfpb.gov/data-browser/",
      "HMDA API Documentation": "https://ffiec.cfpb.gov/documentation/api/data-browser/",
      "Rate Spread Calculator": "https://ffiec.cfpb.gov/tools/rate-spread",
      "ULI Tools": "https://ffiec.cfpb.gov/tools/uli",
    },
  },
} satisfies ModuleMeta;
