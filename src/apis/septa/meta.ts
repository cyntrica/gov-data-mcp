/**
 * septa module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "septa",
  displayName: "SEPTA (Southeastern Pennsylvania Transportation Authority)",
  category: "State & Local",
  description:
    "Real-time transit data for Philadelphia's SEPTA system: regional rail train positions, next-to-arrive predictions between stations, bus/trolley positions by route, and service alerts. No API key required.",
  workflow:
    "Use septa_train_view for all regional rail positions → septa_next_to_arrive for trip planning between stations → septa_bus_view for bus/trolley tracking → septa_alerts for service disruptions.",
  tips:
    "Station names use official SEPTA names (e.g. '30th Street Station', 'Suburban Station', 'Temple University'). TrainView returns all active regional rail trains. NextToArrive count defaults to 4 results.",
  domains: ["transportation"],
  crossRef: [
    { question: "transportation", route: "septa_train_view (regional rail positions), septa_next_to_arrive (trip planning), septa_bus_view (bus tracking), septa_alerts (service alerts)" },
    { question: "state-level", route: "septa_train_view, septa_alerts (Pennsylvania/Philadelphia transit)" },
  ],
  reference: {
    docs: {
      "SEPTA Hackathon API": "https://www3.septa.org/hackathon/",
      "SEPTA Alerts API": "https://www3.septa.org/api/Alerts/",
    },
  },
} satisfies ModuleMeta;
