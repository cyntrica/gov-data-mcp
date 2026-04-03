/**
 * nsf module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "nsf",
  displayName: "NSF (National Science Foundation)",
  category: "Science",
  description:
    "NSF research award data — search grants by keyword, PI name, institution, and program. " +
    "Get award details including funding amounts, abstracts, and investigator info. " +
    "No API key required.",
  workflow:
    "nsf_awards_search to find research grants → nsf_award_detail for full award info",
  tips:
    "Use piName for PI searches (last name or 'last, first'). " +
    "Institution name supports partial matches. " +
    "fundProgramName filters by NSF program (e.g. 'Computer and Information Science and Engineering').",
  domains: ["education"],
  crossRef: [
    { question: "education", route: "nsf_awards_search (NSF research funding by institution/topic)" },
  ],
  reference: {
    docs: {
      "NSF Award Search API": "https://www.research.gov/common/webapi/awardapisearch-v1.htm",
      "NSF Award Search": "https://www.nsf.gov/awardsearch/",
    },
  },
} satisfies ModuleMeta;
