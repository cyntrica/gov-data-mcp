/**
 * WQP module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "wqp",
  displayName: "WQP (Water Quality Portal)",
  category: "Environment",
  description: "Unified access to water quality data from USGS, EPA, and 400+ state agencies — monitoring stations and sample results",
  workflow: "wqp_stations → find monitoring stations, then wqp_results → get water quality sample data",
  tips: "Search by state FIPS code (e.g. US:06 for California). Common parameters: Temperature, pH, Dissolved oxygen, Nitrogen, Phosphorus",
  domains: ["environment"],
  crossRef: [
    { question: "earthquakes/water", route: "wqp_stations, wqp_results (water quality data from USGS + EPA + 400 state agencies)" },
  ],
} satisfies ModuleMeta;
