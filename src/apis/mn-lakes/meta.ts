/**
 * mn-lakes module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "mn-lakes",
  displayName: "MN DNR LakeFinder",
  category: "State & Local",
  description:
    "Minnesota DNR LakeFinder — data for 4,500+ lakes including surveys, depth maps, water quality, fish species, and consumption guidance. No API key required.",
  workflow:
    "Use mn_lake_search to find lakes by name → mn_lake_detail to get full details including fish species and surveys. Use mn_lake_nearby to find lakes near a coordinate.",
  tips:
    "Search by partial name (e.g. 'Mille Lacs', 'Superior'). Lake IDs are numeric. The by-point endpoint uses radius in miles (default 5). Detail results include fish species lists, survey data, and water quality info.",
  domains: ["environment"],
} satisfies ModuleMeta;
