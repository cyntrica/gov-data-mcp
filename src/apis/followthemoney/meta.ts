/**
 * FollowTheMoney module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "followthemoney",
  displayName: "FollowTheMoney (State Campaign Finance)",
  category: "Finance",
  description: "State-level campaign finance contributions — search by candidate, donor, state, and year",
  auth: { envVar: "FTM_API_KEY", signup: "https://www.followthemoney.org/our-data/apis" },
  workflow: "ftm_contributions → search state campaign finance contributions",
  tips: "Search by state abbreviation (e.g. 'CA', 'NY'), year, candidate ID, or donor ID. Data covers all 50 states.",
  domains: ["finance"],
  crossRef: [
    { question: "elections/campaign finance", route: "ftm_contributions (state-level campaign finance contributions)" },
  ],
} satisfies ModuleMeta;
