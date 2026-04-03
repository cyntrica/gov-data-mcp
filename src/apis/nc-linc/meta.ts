/**
 * nc-linc module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "nc-linc",
  displayName: "NC LINC (Log Into North Carolina)",
  category: "State & Local",
  description:
    "NC OSBM LINC — 900+ data items covering demographics, employment, income, education, transportation, agriculture, vital statistics, and government data at state, county, and municipal level. No API key required.",
  workflow:
    "Use nc_linc_search to find datasets by keyword → nc_linc_query to query a specific dataset with filters.",
  tips:
    "Search broadly first (e.g. 'employment', 'population') to discover dataset IDs. Common datasets: 'employment-and-income-linc', 'census-population-and-housing-linc', 'vehicle-registration', 'government', 'nc-transportation-linc'. Use the where parameter for SQL-style filters in nc_linc_query.",
  domains: ["economy", "education"],
  crossRef: [
    {
      question: "state-level",
      route: "nc_linc_search, nc_linc_query (NC demographics, employment, income, education — 900+ data items)",
    },
  ],
} satisfies ModuleMeta;
