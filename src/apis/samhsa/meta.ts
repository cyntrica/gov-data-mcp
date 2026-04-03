/**
 * SAMHSA module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "samhsa",
  displayName: "SAMHSA (Substance Abuse & Mental Health Services)",
  category: "Health",
  description: "Find substance abuse and mental health treatment facilities nationwide via the FindTreatment.gov locator",
  workflow: "samhsa_treatment_search → find treatment facilities by location and service type",
  tips: "Service types: SA (substance abuse), MH (mental health), BOTH. Provide an address or city/state for location search.",
  domains: ["health"],
  crossRef: [
    { question: "health", route: "samhsa_treatment_search (substance abuse and mental health treatment facilities)" },
  ],
} satisfies ModuleMeta;
