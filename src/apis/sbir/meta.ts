/**
 * sbir module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "sbir",
  displayName: "SBIR/STTR",
  category: "Science",
  description:
    "Small Business Innovation Research (SBIR) and Small Business Technology Transfer (STTR) — " +
    "search awarded grants and contracts for small business innovation research across federal agencies. " +
    "No API key required.",
  workflow: "sbir_awards_search to find awards by keyword, agency, company, or year",
  tips:
    "Search by keyword for technology areas, agency abbreviation (e.g. 'DOD', 'NASA', 'NIH', 'NSF', 'DOE'), " +
    "company name, or award year. Combine filters to narrow results. " +
    "Use offset for pagination through large result sets.",
  domains: ["economy"],
  crossRef: [
    { question: "patents", route: "sbir_awards_search (SBIR/STTR small business innovation research awards)" },
  ],
  reference: {
    docs: {
      "SBIR/STTR Website": "https://www.sbir.gov/",
      "Awards API": "https://www.sbir.gov/api/awards.json",
    },
  },
} satisfies ModuleMeta;
