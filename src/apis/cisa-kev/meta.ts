/**
 * cisa-kev module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "cisa-kev",
  displayName: "CISA KEV (Known Exploited Vulnerabilities)",
  category: "Security",
  description:
    "CISA Known Exploited Vulnerabilities catalog — mandatory remediation deadlines for actively exploited CVEs. Includes vendor, product, description, required action, due date, and ransomware campaign usage.",
  workflow:
    "cisa_kev_list to get all known exploited vulnerabilities with filtering options.",
  tips:
    "Returns the full catalog. Filter client-side by vendor, product, or date. Each vulnerability includes cveID, vendorProject, product, vulnerabilityName, dateAdded, shortDescription, requiredAction, dueDate, and knownRansomwareCampaignUse (Known/Unknown).",
  domains: ["safety"],
  crossRef: [],
  reference: {
    docs: {
      "CISA KEV Catalog": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
      "KEV JSON Feed": "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json",
    },
  },
} satisfies ModuleMeta;
