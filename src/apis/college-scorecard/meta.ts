/**
 * college-scorecard module metadata.
 */

import { OWNERSHIP, DEGREE_TYPES } from "./sdk.js";
// ─── Metadata ────────────────────────────────────────────────────────

export const name = "college-scorecard";
export const displayName = "College Scorecard";
export const category = "Education";
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
    ownership: (OWNERSHIP as Record<number, string>)[r["school.ownership"] as number] ?? r["school.ownership"],
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

