/**
 * fmcsa module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "fmcsa",
  displayName: "FMCSA (Federal Motor Carrier Safety Administration)",
  category: "Transportation",
  description:
    "Search and retrieve motor carrier safety data including carrier profiles, safety ratings, inspections, and crash data for trucking and bus companies registered with the DOT.",
  auth: {
    envVar: "FMCSA_API_KEY",
    signup: "https://mobile.fmcsa.dot.gov/QCDevsite/docs/qcApi",
  },
  workflow:
    "Use fmcsa_carrier_search to find carriers by name, DOT number, or state → fmcsa_carrier_detail to get the full safety profile for a specific carrier.",
  tips:
    "Search by company name for partial matches. Use 2-letter state codes (e.g. 'TX', 'CA'). DOT numbers are numeric identifiers assigned to each carrier.",
  domains: ["transportation", "safety"],
  crossRef: [
    { question: "vehicle safety", route: "fmcsa_carrier_search, fmcsa_carrier_detail (trucking/bus company safety ratings)" },
  ],
} satisfies ModuleMeta;
