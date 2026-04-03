/**
 * calfire module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "calfire",
  displayName: "CAL FIRE Incidents",
  category: "State & Local",
  description: "Active and historical California wildfire incidents with location, acreage, containment, and GeoJSON boundaries",
  workflow: "calfire_incidents → filter by active/historical, optionally by year",
  tips: "Returns GeoJSON feature collections. Active fires update frequently during fire season. Historical data available by year. Includes acreage burned, containment percentage, structures damaged/destroyed, injuries, and fatalities.",
  domains: ["environment", "safety"],
  crossRef: [
    { question: "energy/climate", route: "calfire_incidents (wildfire activity linked to climate conditions)" },
    { question: "state-level", route: "calfire_incidents (California wildfire data)" },
  ],
} satisfies ModuleMeta;
