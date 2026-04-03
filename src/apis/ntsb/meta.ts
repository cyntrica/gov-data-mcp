/**
 * ntsb module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "ntsb",
  displayName: "NTSB (National Transportation Safety Board)",
  category: "Transportation",
  description:
    "National Transportation Safety Board — search accident and incident investigation data " +
    "across aviation, highway, marine, rail, and pipeline modes. " +
    "Uses the public CAROL query system. No API key required.",
  workflow:
    "ntsb_aviation_accidents for aviation-specific searches → " +
    "ntsb_query for any transportation mode (highway, marine, rail, pipeline)",
  tips:
    "Aviation queries work best with location, aircraft type, or date keywords. " +
    "Modes: Aviation, Highway, Marine, Rail, Pipeline. " +
    "Use offset and limit for pagination through large result sets.",
  domains: ["transportation", "safety"],
  crossRef: [
    { question: "transportation", route: "ntsb_aviation_accidents (aviation/transportation accident investigations)" },
  ],
  reference: {
    docs: {
      "NTSB CAROL Search": "https://data.ntsb.gov/carol-main-public/basic-search",
      "NTSB Data & Stats": "https://www.ntsb.gov/safety/data/Pages/default.aspx",
    },
  },
} satisfies ModuleMeta;
