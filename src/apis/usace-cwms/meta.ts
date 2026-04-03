/**
 * usace-cwms module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "usace-cwms",
  displayName: "USACE CWMS (Corps Water Management System)",
  category: "Environment",
  description:
    "US Army Corps of Engineers Consolidated Water Management System — real-time water levels, dam/reservoir data, streamflow for Corps-managed waterways (Mississippi, Ohio, Tennessee rivers, etc.). No API key required.",
  workflow:
    "Use usace_locations to find monitoring locations by name/office/type → usace_timeseries to get time-series data (water level, flow, storage, precipitation) → usace_levels for water level data.",
  tips:
    "Corps district offices: SWL (Little Rock), LRL (Louisville), MVS (St. Louis), NWK (Kansas City), MVP (St. Paul), etc. Use wildcard patterns in name searches (e.g. 'Mississippi*'). Time-series names follow the format 'Location.Parameter.Type.Interval.Duration.Version'.",
  domains: ["environment"],
  crossRef: [
    {
      question: "earthquakes/water",
      route: "usace_timeseries, usace_locations (USACE dam/reservoir/river water levels)",
    },
  ],
} satisfies ModuleMeta;
