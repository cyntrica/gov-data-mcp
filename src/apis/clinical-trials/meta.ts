/**
 * clinical-trials module metadata.
 */

import { TRIAL_STATUSES, TRIAL_PHASES, STUDY_TYPES, type TrialStudy } from "./sdk.js";
// ─── Metadata ────────────────────────────────────────────────────────

export const name = "clinical-trials";
export const displayName = "ClinicalTrials.gov";
export const category = "Health";
export const description =
  "Search 400K+ clinical trials: conditions, drugs, sponsors, phases, recruitment status, locations. Cross-reference with FDA (drug approvals), CDC (health outcomes), and lobbying data. No API key required.";
export const workflow =
  "Use clinical_trials_search to find trials by condition/drug/sponsor → clinical_trials_detail for full protocol → clinical_trials_stats for enrollment by status.";
export const tips =
  "Statuses: RECRUITING, COMPLETED, ACTIVE_NOT_RECRUITING, TERMINATED. Phases: PHASE1, PHASE2, PHASE3, PHASE4. Search by sponsor name (e.g. 'Pfizer', 'NIH') to track industry vs. government research.";

export const reference = {
  statuses: TRIAL_STATUSES,
  phases: TRIAL_PHASES,
  studyTypes: STUDY_TYPES,
  docs: {
    "API v2 Documentation": "https://clinicaltrials.gov/data-api/api",
    "ClinicalTrials.gov": "https://clinicaltrials.gov/",
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────

function trialToRecord(study: TrialStudy): Record<string, unknown> {
  const p = study.protocolSection;
  if (!p) return { error: "No protocol data available" };
  const id = p.identificationModule;
  const status = p.statusModule;
  const design = p.designModule;
  const sponsor = p.sponsorCollaboratorsModule;
  const conds = p.conditionsModule?.conditions?.join(", ") ?? null;
  const interventions = p.armsInterventionsModule?.interventions
    ?.map((i) => `${i.type ?? "?"}: ${i.name ?? "?"}`)
    .join("; ") ?? null;

  const record: Record<string, unknown> = {
    nctId: id?.nctId ?? null,
    title: id?.briefTitle ?? "Untitled",
    status: status?.overallStatus ?? null,
    phase: design?.phases?.join(", ") ?? null,
    studyType: design?.studyType ?? null,
    sponsor: sponsor?.leadSponsor?.name ?? null,
    sponsorClass: sponsor?.leadSponsor?.class ?? null,
    conditions: conds,
    enrollmentCount: design?.enrollmentInfo?.count ?? null,
    enrollmentType: design?.enrollmentInfo?.type ?? null,
    startDate: status?.startDateStruct?.date ?? null,
    primaryCompletionDate: status?.primaryCompletionDateStruct?.date ?? null,
  };

  const collabs = sponsor?.collaborators?.map((c) => c.name).join(", ");
  if (collabs) record.collaborators = collabs;

  const locations = p.contactsLocationsModule?.locations?.slice(0, 5);
  if (locations?.length) {
    record.locationCount = p.contactsLocationsModule?.locations?.length ?? 0;
    record.locations = locations.map((l) => ({
      facility: l.facility ?? null,
      city: l.city ?? null,
      state: l.state ?? null,
      country: l.country ?? null,
    }));
  }

  return record;
}

// ─── Tools ───────────────────────────────────────────────────────────

