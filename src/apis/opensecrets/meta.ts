/**
 * OpenSecrets module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "opensecrets",
  displayName: "OpenSecrets (Federal Campaign Finance)",
  category: "Finance",
  description: "Federal campaign finance analysis — candidate fundraising summaries, top contributors, and industry contributions",
  auth: { envVar: "OPENSECRETS_API_KEY", signup: "https://www.opensecrets.org/api/admin/index.php?function=signup" },
  workflow: "os_candidate_summary → overview, os_top_contributors → top donors, os_industry_totals → industry breakdown",
  tips: "CID is the OpenSecrets candidate ID (e.g. N00007360 for Nancy Pelosi). Cycle is an even election year (e.g. 2024).",
  domains: ["finance"],
  crossRef: [
    { question: "elections/campaign finance", route: "os_candidate_summary, os_top_contributors (federal campaign finance analysis)" },
  ],
} satisfies ModuleMeta;
