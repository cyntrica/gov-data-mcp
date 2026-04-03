/**
 * recreation module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "recreation",
  displayName: "Recreation.gov (RIDB)",
  category: "Recreation",
  description: "Search federal recreation facilities, campgrounds, parks, trails, and available campsites via the Recreation Information Database (RIDB)",
  auth: { envVar: "RECREATION_API_KEY", signup: "https://ridb.recreation.gov/docs" },
  workflow: "rec_areas or rec_facilities to find locations → rec_campsites to check available campsites at a facility",
  tips: "Use two-letter state codes (e.g. 'CO', 'CA') for state filters. Activity names are freetext (e.g. 'camping', 'hiking', 'fishing'). Facility IDs from search results are needed for campsite lookups.",
  domains: ["environment"],
} satisfies ModuleMeta;
