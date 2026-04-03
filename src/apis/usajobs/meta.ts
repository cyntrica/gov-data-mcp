/**
 * usajobs module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "usajobs",
  displayName: "USAJobs (Federal Employment)",
  category: "Employment",
  description:
    "Federal job listings from USAJobs.gov — search openings by keyword, location, agency, " +
    "and salary range. Get full job details including duties, qualifications, and application info.",
  auth: { envVar: "USAJOBS_API_KEY", signup: "https://developer.usajobs.gov/APIRequest/Index" },
  workflow:
    "usajobs_search to find federal job listings → usajobs_detail for full job posting details",
  tips:
    "Use agency subelement codes for precise filtering (e.g. 'HE00' for HHS). " +
    "Salary values are annual. LocationName accepts city/state names. " +
    "ResultsPerPage max is 500.",
  domains: ["economy"],
  crossRef: [
    { question: "economy", route: "usajobs_search (federal job openings by keyword/location/agency)" },
  ],
  reference: {
    docs: {
      "USAJobs API": "https://developer.usajobs.gov/API-Reference",
      "Search API": "https://developer.usajobs.gov/API-Reference/GET-api-Search",
    },
  },
} satisfies ModuleMeta;
