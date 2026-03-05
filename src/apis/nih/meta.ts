/**
 * nih module metadata.
 */

import { NIH_AGENCIES, SPENDING_CATEGORIES, ACTIVITY_CODES, FUNDING_MECHANISMS, type NihProject } from "./sdk.js";
// ─── Metadata ────────────────────────────────────────────────────────

export const name = "nih";
export const displayName = "NIH RePORTER";
export const category = "Health";
export const description =
  "Search NIH-funded research projects by disease, investigator, institution, state, and funding amount. " +
  "Track research spending by disease category (RCDC), institute, and grant type. " +
  "Cross-reference with CDC (health outcomes), FDA (drug approvals), ClinicalTrials.gov (trials), " +
  "and Open Payments (pharma influence). No API key required.";
export const workflow =
  "Use nih_search_projects to find grants by topic/PI/org → nih_spending_by_category for disease funding trends → " +
  "nih_projects_by_agency for institute breakdown → nih_search_publications for linked publications.";
export const tips =
  "Agencies: NCI (cancer), NHLBI (heart/lung), NIDDK (diabetes/kidney), NIA (aging/Alzheimer's), " +
  "NIAID (infectious diseases), NIMH (mental health), NIDA (drug abuse). " +
  "Spending categories: 27=Cancer, 7=Alzheimer's, 41=Diabetes, 60=HIV/AIDS, 93=Opioids, 30=Cardiovascular, " +
  "85=Mental Health, 38=COVID-19. Use fiscal_years to track funding trends over time.";

export const reference = {
  agencies: NIH_AGENCIES,
  spendingCategories: SPENDING_CATEGORIES,
  activityCodes: ACTIVITY_CODES,
  fundingMechanisms: FUNDING_MECHANISMS,
  docs: {
    "NIH RePORTER API": "https://api.reporter.nih.gov/",
    "NIH RePORTER": "https://reporter.nih.gov/",
    "RCDC Spending Categories": "https://report.nih.gov/funding/categorical-spending",
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────

function projectToRecord(p: NihProject): Record<string, unknown> {
  const record: Record<string, unknown> = {
    project_num: p.project_num ?? p.core_project_num ?? null,
    project_title: p.project_title ?? "Untitled",
    fiscal_year: p.fiscal_year ?? null,
    award_amount: p.award_amount ?? 0,
    direct_cost: p.direct_cost_amt ?? null,
    indirect_cost: p.indirect_cost_amt ?? null,
    activity_code: p.activity_code ?? null,
    funding_mechanism: p.funding_mechanism ?? null,
    agency: p.agency_ic_admin?.abbreviation ?? null,
    agency_name: p.agency_ic_admin?.name ?? null,
    is_active: p.is_active ?? null,
    project_start_date: p.project_start_date?.slice(0, 10) ?? null,
    project_end_date: p.project_end_date?.slice(0, 10) ?? null,
  };

  if (p.agency_ic_fundings?.length) {
    record.funding_ics = p.agency_ic_fundings.map(f => ({
      abbreviation: f.abbreviation ?? null,
      total_cost: f.total_cost ?? 0,
    }));
  }

  const pis = p.principal_investigators?.map(pi => pi.full_name).filter(Boolean);
  if (pis?.length) record.principal_investigators = pis;

  if (p.organization) {
    const org = p.organization;
    record.organization = org.org_name ?? null;
    record.org_city = org.city ?? org.org_city ?? null;
    record.org_state = org.state ?? org.org_state ?? null;
    if (org.dept_type) record.department = org.dept_type;
  }

  if (p.spending_categories_desc) record.spending_categories = p.spending_categories_desc;
  if (p.covid_response?.length) record.covid_response = p.covid_response;
  if (p.project_detail_url) record.detail_url = p.project_detail_url;

  return record;
}

// ─── Tools ───────────────────────────────────────────────────────────

