/**
 * careeronestop module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "careeronestop",
  displayName: "CareerOneStop (DOL Career Resources)",
  category: "Economy",
  description:
    "Search occupations by keyword and look up state licensing requirements from the Department of Labor's CareerOneStop API.",
  auth: {
    envVar: "CAREERONESTOP_TOKEN",
    signup: "https://www.careeronestop.org/Developers/WebAPI/registration.aspx",
  },
  workflow:
    "Use cos_occupation_search to find occupations by keyword → cos_licensing to look up state licensing/certification requirements for a specific occupation.",
  tips:
    "Occupation searches return O*NET codes — use these codes for licensing lookups. Use 2-letter state codes for licensing (e.g. 'TX', 'NY'). The userId parameter is typically your registered user ID or API token.",
  domains: ["economy", "education"],
  crossRef: [
    { question: "unemployment", route: "cos_occupation_search, cos_licensing (occupation info and state licensing requirements)" },
  ],
} satisfies ModuleMeta;
