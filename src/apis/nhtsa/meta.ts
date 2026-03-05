/**
 * nhtsa module metadata.
 */

import { type Recall, type Complaint } from "./sdk.js";
// ─── Metadata ────────────────────────────────────────────────────────

export const name = "nhtsa";
export const displayName = "NHTSA";
export const category = "Safety";
export const description =
  "National Highway Traffic Safety Administration — vehicle recalls, consumer complaints, VIN decoding, vehicle specifications. No API key required.";
export const workflow =
  "Use nhtsa_recalls to search for recalls by make/model/year → nhtsa_complaints for consumer complaints → nhtsa_decode_vin to decode a specific VIN → nhtsa_models to browse available models for a make.";
export const tips =
  "Use common make names like 'honda', 'toyota', 'ford', 'chevrolet', 'tesla'. Model names should match official names: 'civic', 'camry', 'f-150', 'model 3'. VINs are 17 characters.";

// ─── Helpers ─────────────────────────────────────────────────────────

function recallToRecord(r: Recall): Record<string, unknown> {
  const record: Record<string, unknown> = {
    campaignNumber: r.NHTSACampaignNumber ?? null,
    modelYear: r.ModelYear ?? null,
    make: r.Make ?? null,
    model: r.Model ?? null,
    component: r.Component ?? null,
    summary: r.Summary ?? null,
    consequence: r.Consequence ?? null,
    remedy: r.Remedy ?? null,
  };
  if (r.parkIt) record.parkIt = true;
  return record;
}

function complaintToRecord(c: Complaint): Record<string, unknown> {
  const product = c.products?.[0];
  return {
    odiNumber: c.odiNumber ?? null,
    dateOfIncident: c.dateOfIncident ?? c.dateComplaintFiled ?? null,
    vehicle: product ? `${product.productYear ?? ""} ${product.productMake ?? ""} ${product.productModel ?? ""}`.trim() : null,
    components: c.components ?? null,
    summary: c.summary ?? null,
    crash: c.crash ?? false,
    fire: c.fire ?? false,
    numberOfInjuries: c.numberOfInjuries ?? 0,
    numberOfDeaths: c.numberOfDeaths ?? 0,
  };
}

// ─── Tools ───────────────────────────────────────────────────────────

