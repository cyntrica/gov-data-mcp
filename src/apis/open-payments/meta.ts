/**
 * open-payments module metadata.
 */

import { PAYMENT_TYPES } from "./sdk.js";
// ─── Metadata ────────────────────────────────────────────────────────

export const name = "open-payments";
export const displayName = "Open Payments (Sunshine Act)";
export const category = "Spending";
export const description =
  "CMS Open Payments — tracks payments from pharmaceutical and medical device companies to doctors and teaching hospitals. " +
  "15M+ payment records per year. Search by company, doctor, state, or specialty. No API key required.";
export const workflow =
  "Use open_payments_search to find payments by company/doctor/state → cross-reference with fda_drug_events for the same company's drugs → lobbying_search for the company's lobbying spend → clinical_trials_search for their clinical trials.";
export const tips =
  "Company names: 'Pfizer', 'Novo Nordisk', 'Johnson & Johnson'. States: 'CA', 'TX', 'NY'. " +
  "Specialties: 'Cardiology', 'Orthopedic', 'Psychiatry'. Years: 2018-2024 available.";

export const reference = {
  paymentTypes: PAYMENT_TYPES,
  docs: {
    "Open Payments": "https://openpaymentsdata.cms.gov/",
    "API Documentation": "https://openpaymentsdata.cms.gov/about/api",
  },
};

// ─── Tools ───────────────────────────────────────────────────────────

