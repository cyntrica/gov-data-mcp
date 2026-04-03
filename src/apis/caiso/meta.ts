/**
 * caiso module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "caiso",
  displayName: "California ISO (MIDAS API)",
  category: "Energy",
  description: "Real-time California electricity rates, GHG signals, and Flex Alert notifications via the MIDAS API",
  auth: { envVar: "CAISO_TOKEN", signup: "https://midasapi.energy.ca.gov" },
  workflow: "Pick signal type (rates/GHG/FlexAlert) → caiso_signal",
  tips: "Rates and GHG signals are time-varying — useful for tracking California grid conditions and carbon intensity. Flex Alerts indicate grid stress events during peak demand.",
  domains: ["energy"],
  crossRef: [
    { question: "energy/climate", route: "caiso_signal (California electricity rates, GHG intensity, Flex Alerts)" },
    { question: "state-level", route: "caiso_signal (California-specific grid signals)" },
  ],
} satisfies ModuleMeta;
