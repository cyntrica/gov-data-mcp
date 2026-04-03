/**
 * trimet module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "trimet",
  displayName: "TriMet (Portland Transit)",
  category: "State & Local",
  description:
    "Real-time transit arrivals for TriMet (Portland, OR). Get upcoming bus and rail arrival predictions by stop location ID.",
  auth: {
    envVar: "TRIMET_APP_ID",
    signup: "https://developer.trimet.org/",
  },
  workflow:
    "Use trimet_arrivals with a stop location ID to get real-time arrival predictions for buses and MAX light rail at that stop.",
  tips:
    "Stop location IDs can be found on TriMet's website or trip planner. Example stop IDs: 8989 (Pioneer Square), 7787 (Gateway TC). Results include estimated and scheduled arrival times.",
  domains: ["transportation"],
  crossRef: [
    { question: "transportation", route: "trimet_arrivals (real-time Portland transit arrivals by stop)" },
    { question: "state-level", route: "trimet_arrivals (Portland, OR transit data)" },
  ],
} satisfies ModuleMeta;
