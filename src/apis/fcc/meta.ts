/**
 * fcc module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "fcc",
  displayName: "FCC Broadband Map",
  category: "Infrastructure",
  description:
    "Federal Communications Commission Broadband Map — search broadband providers by location or state, " +
    "and check broadband coverage for specific coordinates or addresses. Useful for digital divide analysis " +
    "and infrastructure planning.",
  workflow:
    "fcc_broadband_providers to find ISPs serving an area → fcc_broadband_coverage to check coverage at a specific location.",
  tips:
    "Use state FIPS codes or 2-letter abbreviations for state-level queries. Latitude/longitude give the most " +
    "precise coverage results. Provider searches can be filtered by technology type (fiber, cable, DSL, etc.).",
  domains: ["economy"],
  crossRef: [
    { question: "state-level", route: "fcc_broadband_providers, fcc_broadband_coverage (broadband coverage by state)" },
  ],
} satisfies ModuleMeta;
