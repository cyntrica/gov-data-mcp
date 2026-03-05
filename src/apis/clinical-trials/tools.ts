/**
 * clinical-trials MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import {
  searchTrials,
  getTrialDetail,
  getTrialEnrollmentStats,
  TRIAL_STATUSES,
  TRIAL_PHASES,
  STUDY_TYPES,
  clearCache as sdkClearCache,
  type TrialStudy,
} from "./sdk.js";
import { listResponse, recordResponse, emptyResponse } from "../../shared/response.js";
import { keysEnum, describeEnum } from "../../shared/enum-utils.js";

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
    interventions,
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
      if (!data.studies?.length) return emptyResponse("No clinical trials found matching the criteria.");

      const items = data.studies.map(trialToRecord);
      return listResponse(
        `${data.totalCount} total trials found (showing ${data.studies.length})`,
        { items, total: data.totalCount },
      );
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
      const record = trialToRecord(study);

      // Add eligibility if available
      const elig = study.protocolSection?.eligibilityModule;
      if (elig) {
        record.eligibilitySex = elig.sex ?? "All";
        record.eligibilityMinAge = elig.minimumAge ?? null;
        record.eligibilityMaxAge = elig.maximumAge ?? null;
        record.healthyVolunteers = elig.healthyVolunteers ?? false;
        if (elig.eligibilityCriteria) {
          record.eligibilityCriteria = elig.eligibilityCriteria.slice(0, 2000);
        }
      }

      // Add brief summary
      const desc = study.protocolSection?.descriptionModule?.briefSummary;
      if (desc) record.briefSummary = desc;

      return recordResponse(`${record.nctId ?? args.nct_id} — ${record.title ?? "Clinical Trial"}`, record);
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
      const total = Object.values(data.statuses).reduce((a, b) => a + b, 0);
      // If zero results for condition search, auto-retry as intervention
      if (total === 0 && !args.search_as_drug) {
        const retryData = await getTrialEnrollmentStats(args.condition, { intervention: args.condition });
        const retryTotal = Object.values(retryData.statuses).reduce((a, b) => a + b, 0);
        if (retryTotal > 0) {
          return recordResponse(
            `Clinical trials for "${args.condition}" as intervention (${retryTotal.toLocaleString()} total)`,
            { condition: args.condition, searchType: "intervention", total: retryTotal, statuses: retryData.statuses },
          );
        }
      }
      if (total === 0) return emptyResponse(`No clinical trials found for "${args.condition}".`);
      return recordResponse(
        `Clinical trials for "${data.condition}" (${total.toLocaleString()} total)`,
        { condition: data.condition, total, statuses: data.statuses },
      );
    },
  },
];
