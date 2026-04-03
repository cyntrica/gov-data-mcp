/**
 * cta module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "cta",
  displayName: "CTA (Chicago Transit Authority)",
  category: "State & Local",
  description:
    "Real-time transit data for Chicago's CTA system: L train arrival predictions by station and bus arrival predictions by stop. Requires free API key.",
  auth: {
    envVar: "CTA_API_KEY",
    signup: "https://www.transitchicago.com/developers/",
  },
  workflow:
    "Use cta_train_arrivals for L train predictions at a station → cta_bus_arrivals for bus predictions at a stop.",
  tips:
    "Train stations use numeric mapid (e.g. 40380 for Clark/Lake). Bus stops use numeric stpid. Train response is in ctatt.eta array. The bus tracker uses a different base URL than the train tracker.",
  domains: ["transportation"],
  crossRef: [
    { question: "transportation", route: "cta_train_arrivals (L train predictions), cta_bus_arrivals (bus predictions)" },
    { question: "state-level", route: "cta_train_arrivals, cta_bus_arrivals (Illinois/Chicago transit)" },
  ],
  reference: {
    docs: {
      "CTA Train Tracker API": "https://www.transitchicago.com/developers/traintracker/",
      "CTA Bus Tracker API": "https://www.transitchicago.com/developers/bustracker/",
    },
  },
} satisfies ModuleMeta;
