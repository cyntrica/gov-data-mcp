/**
 * smithsonian module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "smithsonian",
  displayName: "Smithsonian Institution",
  category: "Culture",
  description: "Search 11M+ records across Smithsonian museums and collections, including images, artifacts, and specimens",
  auth: { envVar: "SMITHSONIAN_API_KEY", signup: "https://api.data.gov/signup/" },
  workflow: "smithsonian_search to find records → smithsonian_detail for full record with images",
  tips: "Search supports filtering by museum unit_code (e.g. NASM, NMAH, NMNH). Use freetext queries for broad searches, or filter by date range. Detail view includes high-res image URLs when available.",
  domains: ["education"],
} satisfies ModuleMeta;
