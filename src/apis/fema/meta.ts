/**
 * fema module metadata.
 */

import { DATASETS } from "./sdk.js";
// ─── Metadata ────────────────────────────────────────────────────────

export const name = "fema";
export const displayName = "FEMA";
export const category = "Demographics";
export const description =
  "Federal Emergency Management Agency — disaster declarations, emergency/major disaster assistance, NFIP flood insurance claims, housing assistance, public assistance grants. Data since 1953.";
export const workflow =
  "Use fema_disaster_declarations to find disasters by state/year/type → fema_housing_assistance for individual assistance details → fema_public_assistance for PA grants → fema_query for NFIP claims or any other dataset.";
export const tips =
  "State codes are two-letter uppercase (TX, FL, CA). Incident types include Hurricane, Flood, Fire, Severe Storm(s), Tornado, Earthquake, Snow, Biological. Declaration types: DR (Major Disaster), EM (Emergency), FM (Fire Management). Use fema_query with dataset 'nfip_claims' to analyze flood insurance data.";
export const reference = { datasets: DATASETS };

// ─── Tools ───────────────────────────────────────────────────────────

