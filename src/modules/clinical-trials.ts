/**
 * ClinicalTrials.gov module — clinical trial search and detail.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { keysEnum, describeEnum } from "../enum-utils.js";
import {
  searchTrials,
  getTrialDetail,
  getTrialEnrollmentStats,
  TRIAL_STATUSES,
  TRIAL_PHASES,
  STUDY_TYPES,
  clearCache as sdkClearCache,
  type TrialStudy,
} from "../sdk/clinical-trials.js";

// ─── Metadata ────────────────────────────────────────────────────────

export const name = "clinical-trials";
export const displayName = "ClinicalTrials.gov";
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

function summarizeTrial(study: TrialStudy): string {
  const p = study.protocolSection;
  if (!p) return "No protocol data available.";
  const id = p.identificationModule;
  const status = p.statusModule;
  const design = p.designModule;
  const sponsor = p.sponsorCollaboratorsModule;
  const conds = p.conditionsModule?.conditions?.join(", ") ?? "N/A";
  const interventions = p.armsInterventionsModule?.interventions
    ?.map((i) => `${i.type ?? "?"}: ${i.name ?? "?"}`)
    .join("; ") ?? "N/A";

  const parts = [
    `${id?.nctId ?? "?"} — ${id?.briefTitle ?? "Untitled"}`,
    `Status: ${status?.overallStatus ?? "?"}`,
    `Phase: ${design?.phases?.join(", ") ?? "N/A"}`,
    `Type: ${design?.studyType ?? "?"}`,
    `Sponsor: ${sponsor?.leadSponsor?.name ?? "?"} (${sponsor?.leadSponsor?.class ?? "?"})`,
    `Conditions: ${conds}`,
    `Interventions: ${interventions}`,
    `Enrollment: ${design?.enrollmentInfo?.count ?? "?"} (${design?.enrollmentInfo?.type ?? "?"})`,
  ];

  if (status?.startDateStruct?.date) parts.push(`Start: ${status.startDateStruct.date}`);
  if (status?.primaryCompletionDateStruct?.date) parts.push(`Primary Completion: ${status.primaryCompletionDateStruct.date}`);

  const collabs = sponsor?.collaborators?.map((c) => c.name).join(", ");
  if (collabs) parts.push(`Collaborators: ${collabs}`);

  const locations = p.contactsLocationsModule?.locations?.slice(0, 5);
  if (locations?.length) {
    parts.push(`Locations (${p.contactsLocationsModule?.locations?.length ?? 0} total):`);
    locations.forEach((l) => {
      parts.push(`  ${l.facility ?? "?"}, ${l.city ?? ""} ${l.state ?? ""} ${l.country ?? ""}`);
    });
  }

  return parts.join("\n");
}

// ─── Tools ───────────────────────────────────────────────────────────

export const tools: Tool<any, any>[] = [
  {
    name: "clinical_trials_search",
    description:
      "Search ClinicalTrials.gov for clinical trials by condition, drug/intervention, sponsor, status, and phase.\n" +
      "Returns trial ID, title, status, phase, sponsor, conditions, and enrollment.\n" +
      "Use sponsor filter to track pharma company research (e.g. 'Pfizer', 'Moderna', 'NIH').",
    annotations: { title: "ClinicalTrials.gov: Search", readOnlyHint: true },
    parameters: z.object({
      query: z.string().optional().describe("Free-text search across all fields"),
      condition: z.string().optional().describe("Disease or condition: 'lung cancer', 'diabetes', 'Alzheimer'"),
      intervention: z.string().optional().describe("Drug, device, or procedure name: 'pembrolizumab', 'insulin'"),
      sponsor: z.string().optional().describe("Sponsor/funder: 'Pfizer', 'NIH', 'Moderna'"),
      status: z.enum(keysEnum(TRIAL_STATUSES)).optional().describe(`Trial status: ${describeEnum(TRIAL_STATUSES, 5)}`),
      phase: z.enum(keysEnum(TRIAL_PHASES)).optional().describe(`Trial phase: ${describeEnum(TRIAL_PHASES)}`),
      study_type: z.enum(keysEnum(STUDY_TYPES)).optional().describe(`Study type: ${describeEnum(STUDY_TYPES)}`),
      location: z.string().optional().describe("State or country: 'California', 'United States', 'Germany'"),
      page_size: z.number().int().max(50).optional().describe("Results per page (default 10, max 50)"),
    }),
    execute: async (args) => {
      const data = await searchTrials({
        query: args.query,
        condition: args.condition,
        intervention: args.intervention,
        sponsor: args.sponsor,
        status: args.status,
        phase: args.phase,
        studyType: args.study_type,
        state: args.location,
        pageSize: args.page_size,
      });
      if (!data.studies?.length) return { content: [{ type: "text" as const, text: "No clinical trials found matching the criteria." }] };

      const header = `${data.totalCount} total trials found (showing ${data.studies.length})`;
      const summaries = data.studies.map(summarizeTrial);
      return { content: [{ type: "text" as const, text: `${header}\n\n${summaries.join("\n\n---\n\n")}` }] };
    },
  },

  {
    name: "clinical_trials_detail",
    description:
      "Get full details for a specific clinical trial by NCT ID.\n" +
      "Returns protocol, eligibility criteria, arms/interventions, locations, and contacts.",
    annotations: { title: "ClinicalTrials.gov: Detail", readOnlyHint: true },
    parameters: z.object({
      nct_id: z.string().describe("ClinicalTrials.gov ID: 'NCT06000000'"),
    }),
    execute: async (args) => {
      const study = await getTrialDetail(args.nct_id);
      const summary = summarizeTrial(study);

      // Add eligibility if available
      const elig = study.protocolSection?.eligibilityModule;
      let extra = "";
      if (elig) {
        const pieces = [
          `\n\n--- ELIGIBILITY ---`,
          `Sex: ${elig.sex ?? "All"}`,
          `Ages: ${elig.minimumAge ?? "N/A"} to ${elig.maximumAge ?? "N/A"}`,
          `Healthy Volunteers: ${elig.healthyVolunteers ? "Yes" : "No"}`,
        ];
        if (elig.eligibilityCriteria) {
          pieces.push(`\nCriteria:\n${elig.eligibilityCriteria.slice(0, 2000)}`);
        }
        extra = pieces.join("\n");
      }

      // Add brief summary
      const desc = study.protocolSection?.descriptionModule?.briefSummary;
      if (desc) extra += `\n\n--- SUMMARY ---\n${desc}`;

      return { content: [{ type: "text" as const, text: summary + extra }] };
    },
  },

  {
    name: "clinical_trials_stats",
    description:
      "Get trial count breakdown by status for a condition or drug/intervention.\n" +
      "Shows how many trials are recruiting, active, completed, or terminated.\n" +
      "Works for diseases ('breast cancer') AND drug names ('semaglutide', 'pembrolizumab').",
    annotations: { title: "ClinicalTrials.gov: Stats", readOnlyHint: true },
    parameters: z.object({
      condition: z.string().describe("Disease, condition, or drug name: 'breast cancer', 'semaglutide', 'Alzheimer Disease'"),
      search_as_drug: z.boolean().optional().describe("Set true to search as drug/intervention instead of condition (use for drug names like 'semaglutide', 'pembrolizumab')"),
    }),
    execute: async (args) => {
      const data = args.search_as_drug
        ? await getTrialEnrollmentStats(args.condition, { intervention: args.condition })
        : await getTrialEnrollmentStats(args.condition);
      const lines = Object.entries(data.statuses).map(
        ([status, count]) => `  ${status}: ${count.toLocaleString()}`,
      );
      const total = Object.values(data.statuses).reduce((a, b) => a + b, 0);
      // If zero results for condition search, auto-retry as intervention
      if (total === 0 && !args.search_as_drug) {
        const retryData = await getTrialEnrollmentStats(args.condition, { intervention: args.condition });
        const retryTotal = Object.values(retryData.statuses).reduce((a, b) => a + b, 0);
        if (retryTotal > 0) {
          const retryLines = Object.entries(retryData.statuses).map(
            ([status, count]) => `  ${status}: ${count.toLocaleString()}`,
          );
          return {
            content: [{
              type: "text" as const,
              text: `Clinical trials for "${args.condition}" as intervention (${retryTotal.toLocaleString()} total):\n${retryLines.join("\n")}`,
            }],
          };
        }
      }
      return {
        content: [{
          type: "text" as const,
          text: `Clinical trials for "${data.condition}" (${total.toLocaleString()} total):\n${lines.join("\n")}`,
        }],
      };
    },
  },
];

export { sdkClearCache as clearCache };
