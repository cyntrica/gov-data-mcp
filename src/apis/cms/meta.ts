/**
 * cms module metadata.
 */

import { DATASETS } from "./sdk.js";
// ─── Metadata ────────────────────────────────────────────────────────

export const name = "cms";
export const displayName = "CMS";
export const category = "Health";
export const description =
  "Centers for Medicare & Medicaid Services — hospital compare, nursing home ratings, home health agencies, hospice, dialysis, Medicare spending, HCAHPS patient surveys, quality measures. No API key required.";
export const workflow =
  "Use cms_search to find datasets by keyword → cms_hospitals for hospital quality data → cms_nursing_homes for nursing home ratings → cms_query for any CMS provider dataset.";
export const tips =
  "CMS has 100+ provider datasets. Use cms_search to discover them. Common dataset keys: hospital_info, nursing_home_info, hospital_mortality, hospital_readmissions, hospital_infections, hospital_timely_care, hospital_spending, hospital_patient_survey, nursing_home_health_citations. Filter by state using conditions like property='state' value='CA'.";
export const reference = { datasets: DATASETS };

// ─── Tools ───────────────────────────────────────────────────────────

