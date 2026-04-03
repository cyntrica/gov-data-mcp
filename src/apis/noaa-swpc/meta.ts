/**
 * noaa-swpc module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "noaa-swpc",
  displayName: "NOAA Space Weather Prediction Center",
  category: "Environment",
  description: "Space weather alerts, solar activity, geomagnetic indices, solar wind, aurora forecasts, and GOES satellite data from NOAA SWPC.",
  workflow: "swpc_alerts for current warnings → swpc_kp_index or swpc_solar_wind for conditions",
  tips: "Data is near-real-time JSON files updated every few minutes. Kp index ranges 0-9 (5+ = geomagnetic storm). Solar flux F10.7 > 100 = elevated activity.",
  domains: ["environment"],
  crossRef: [
    { question: "energy/climate", route: "swpc_solar_flux, swpc_solar_cycle (solar activity impact)" },
    { question: "disasters", route: "swpc_alerts, swpc_scales (space weather hazard levels)" },
  ],
} satisfies ModuleMeta;
