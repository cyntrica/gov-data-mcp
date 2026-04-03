/**
 * wsdot-ferries module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "wsdot-ferries",
  displayName: "WSDOT Ferries (Washington State Ferries)",
  category: "State & Local",
  description:
    "Washington State Ferries real-time data: sailing schedules, vessel positions, and terminal wait times. Covers the largest ferry system in the U.S.",
  auth: {
    envVar: "WSDOT_ACCESS_CODE",
    signup: "https://wsdot.wa.gov/traffic/api/",
  },
  workflow:
    "Use wsdot_ferry_schedule for sailing times by date → wsdot_ferry_vessels for real-time vessel locations → wsdot_ferry_terminals for terminal wait times and space availability.",
  tips:
    "Schedule dates use YYYY-MM-DD format. Vessel positions update frequently. Terminal sailing space shows current vehicle capacity at each terminal.",
  domains: ["transportation"],
  crossRef: [
    { question: "transportation", route: "wsdot_ferry_schedule (sailing times), wsdot_ferry_vessels (vessel positions), wsdot_ferry_terminals (wait times)" },
    { question: "state-level", route: "wsdot_ferry_schedule, wsdot_ferry_vessels, wsdot_ferry_terminals (Washington State ferry data)" },
  ],
} satisfies ModuleMeta;
