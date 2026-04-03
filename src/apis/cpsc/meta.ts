/**
 * cpsc module metadata.
 */

import type { ModuleMeta, Domain } from "../../shared/types.js";

export default {
  name: "cpsc",
  displayName: "CPSC (Consumer Product Safety Commission)",
  category: "Safety",
  description:
    "Consumer Product Safety Commission — product recalls, civil/criminal penalties, " +
    "and company/product penalty lookups via the SaferProducts.gov API. " +
    "No API key required.",
  workflow:
    "cpsc_recall_search to find recalls by product/manufacturer/date → " +
    "cpsc_recall_detail for full recall info → " +
    "cpsc_penalty_companies to list penalized companies → " +
    "cpsc_penalty_search for penalty details",
  tips:
    "Use broad search terms for product names (e.g. 'stroller', 'battery', 'toy'). " +
    "Date parameters use MM/DD/YYYY format. " +
    "Penalty searches accept penaltytype 'civil' or 'criminal'. " +
    "The API returns JSON arrays directly without an envelope wrapper.",
  domains: ["safety"] as Domain[],
  crossRef: [
    { question: "consumer complaints", route: "cpsc_recall_search, cpsc_recall_detail (consumer product recalls and hazards)" },
  ],
  reference: {
    docs: {
      "SaferProducts.gov API": "https://www.saferproducts.gov/RestWebServices",
      "Recall Search": "https://www.saferproducts.gov/RestWebServices/Recall?format=json",
      "Penalty API": "https://www.saferproducts.gov/RestWebServices/Penalty",
    },
  },
} satisfies ModuleMeta;
