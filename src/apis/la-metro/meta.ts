/**
 * la-metro module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "la-metro",
  displayName: "LA Metro (Los Angeles County Metropolitan Transportation Authority)",
  category: "State & Local",
  description:
    "Real-time transit data for Los Angeles Metro: live bus and rail vehicle positions, route listings, and stop information. No API key required.",
  workflow:
    "Use la_metro_routes to list all routes → la_metro_stops to find stops on a route → la_metro_vehicles for real-time bus/rail positions.",
  tips:
    "Route codes are numeric (e.g. 720 for Wilshire Rapid). Vehicle positions include lat/lon coordinates. All endpoints return JSON arrays or objects directly.",
  domains: ["transportation"],
  crossRef: [
    { question: "transportation", route: "la_metro_vehicles (real-time positions), la_metro_routes (route listings), la_metro_stops (stop info)" },
    { question: "state-level", route: "la_metro_vehicles, la_metro_routes (California/Los Angeles transit)" },
  ],
  reference: {
    docs: {
      "LA Metro API": "https://developer.metro.net/",
    },
  },
} satisfies ModuleMeta;
