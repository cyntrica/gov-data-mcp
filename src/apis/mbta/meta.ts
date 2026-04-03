/**
 * mbta module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "mbta",
  displayName: "MBTA (Massachusetts Bay Transportation Authority)",
  category: "State & Local",
  description:
    "Real-time transit data for Boston's MBTA system: arrival predictions, live vehicle positions, service alerts, and route information for subway, bus, commuter rail, and ferry. Requires free API key.",
  auth: {
    envVar: "MBTA_API_KEY",
    signup: "https://api-v3.mbta.com",
  },
  workflow:
    "Use mbta_routes to find route IDs → mbta_predictions for real-time arrivals at a stop → mbta_vehicles for live vehicle positions → mbta_alerts for service disruptions.",
  tips:
    "Route types: 0=Light Rail (Green Line), 1=Heavy Rail (Red/Orange/Blue), 2=Commuter Rail, 3=Bus, 4=Ferry. Stop IDs are like 'place-north' (North Station). Response is JSON:API format with data[] and included[] arrays.",
  domains: ["transportation"],
  crossRef: [
    { question: "transportation", route: "mbta_predictions (real-time arrivals), mbta_vehicles (live positions), mbta_alerts (service alerts), mbta_routes (route info)" },
    { question: "state-level", route: "mbta_predictions, mbta_alerts (Massachusetts/Boston transit)" },
  ],
  reference: {
    routeTypes: {
      0: "Light Rail (Green Line)",
      1: "Heavy Rail (Red, Orange, Blue Lines)",
      2: "Commuter Rail",
      3: "Bus",
      4: "Ferry",
    },
    docs: {
      "MBTA V3 API": "https://api-v3.mbta.com",
      "MBTA API Docs": "https://api-v3.mbta.com/docs/swagger/index.html",
    },
  },
} satisfies ModuleMeta;
