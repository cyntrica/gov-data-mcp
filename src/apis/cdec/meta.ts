/**
 * cdec module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "cdec",
  displayName: "California Data Exchange Center (CDEC)",
  category: "State & Local",
  description: "Real-time California water data — reservoir levels, river flows, snow surveys, and environmental sensors",
  workflow: "cdec_stations (find stations) → cdec_sensor_data (get readings for a station + sensor)",
  tips: "CDEC monitors California's water supply infrastructure. Key sensor numbers: 15=storage (reservoirs), 6=reservoir elevation, 20=flow, 3=snow water content, 30=temperature. Use station IDs like SHA (Shasta), ORO (Oroville), FOL (Folsom).",
  domains: ["environment"],
  crossRef: [
    { question: "earthquakes/water", route: "cdec_sensor_data, cdec_stations (California reservoir and river data)" },
    { question: "state-level", route: "cdec_sensor_data, cdec_stations (California water monitoring)" },
  ],
} satisfies ModuleMeta;
