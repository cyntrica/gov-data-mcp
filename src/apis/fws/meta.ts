import type { ModuleMeta } from "../../shared/types.js";
export default {
  name: "fws",
  displayName: "FWS ECOS (Endangered Species)",
  category: "Environment",
  description: "US Fish & Wildlife Service Environmental Conservation Online System (ECOS). Search threatened and endangered species listings, critical habitat designations, and recovery plans. No API key required.",
  workflow: "fws_species for searching listed species by name, status, or state → fws_critical_habitat for habitat data.",
  tips: "Status codes: E=Endangered, T=Threatened, C=Candidate, PE=Proposed Endangered, PT=Proposed Threatened. Search by common or scientific name. Filter by state for regional listings.",
  domains: ["environment"],
  crossRef: [
    { question: "energy/climate", route: "fws_species (endangered species affected by climate/energy projects)" },
  ],
  reference: { docs: { "ECOS": "https://ecos.fws.gov/ecp/" } },
} satisfies ModuleMeta;
