/**
 * clinical-trials module metadata.
 */

import {
  TRIAL_STATUSES,
  TRIAL_PHASES,
  STUDY_TYPES,
  INTERVENTION_TYPES,
  AGENCY_CLASSES,
} from "./types.js";
import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "clinical-trials",
  displayName: "ClinicalTrials.gov",
  category: "Health",
  description:
    "Search 400K+ clinical trials: conditions, drugs, sponsors, phases, recruitment status, " +
    "locations, results. Explore data model fields, enum values, and field statistics. " +
    "Geo-search for trials near a location. Cross-reference with FDA, CDC, NIH, and lobbying data. " +
    "No API key required.",
  workflow:
    "Use clinical_trials_search to find trials by condition/drug/sponsor → " +
    "clinical_trials_detail for full protocol → clinical_trials_results for " +
    "outcomes/adverse events on completed trials → clinical_trials_stats for " +
    "enrollment breakdown → clinical_trials_field_values for analytics " +
    "(top conditions, sponsors, phases).",
  tips:
    "Statuses: RECRUITING, COMPLETED, ACTIVE_NOT_RECRUITING, TERMINATED, SUSPENDED, " +
    "WITHDRAWN, NOT_YET_RECRUITING, ENROLLING_BY_INVITATION. " +
    "Phases: EARLY_PHASE1, PHASE1, PHASE2, PHASE3, PHASE4, NA. " +
    "Study types: INTERVENTIONAL, OBSERVATIONAL, EXPANDED_ACCESS. " +
    "Intervention types: DRUG, BIOLOGICAL, DEVICE, PROCEDURE, BEHAVIORAL, DIETARY_SUPPLEMENT, etc. " +
    "Use geo filter with clinical_trials_by_location for 'find trials near me' queries. " +
    "Use agg_filters for shorthand: 'results:with' (only trials with results), 'sex:f' (female only), 'healthy:y'. " +
    "Use filter_advanced for Essie expression queries like 'AREA[StartDate]RANGE[2024-01-01,MAX]'. " +
    "Search by sponsor name (e.g. 'Pfizer', 'NIH') to track industry vs. government research. " +
    "Phase/studyType filtering uses aggFilters internally (not filter.* params — v2 API design).",
  reference: {
    statuses: TRIAL_STATUSES,
    phases: TRIAL_PHASES,
    studyTypes: STUDY_TYPES,
    interventionTypes: INTERVENTION_TYPES,
    agencyClasses: AGENCY_CLASSES,
    docs: {
      "API v2 Documentation": "https://clinicaltrials.gov/data-api/api",
      "API Migration Guide": "https://clinicaltrials.gov/data-api/about-api/api-migration",
      "Study Data Structure": "https://clinicaltrials.gov/data-api/about-api/study-data-structure",
      "Search Areas": "https://clinicaltrials.gov/data-api/about-api/search-areas",
      "ClinicalTrials.gov": "https://clinicaltrials.gov/",
    },
  },
} satisfies ModuleMeta;
