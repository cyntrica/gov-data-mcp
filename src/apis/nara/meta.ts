/**
 * nara module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "nara",
  displayName: "NARA (National Archives)",
  category: "Education",
  description:
    "Search the National Archives catalog — millions of historical records, documents, photographs, and government publications. Includes metadata, descriptions, and links to digitized content.",
  workflow:
    "nara_search to search the National Archives catalog by keyword → nara_record to get full record details by NARA ID.",
  tips:
    "Rate limited to 10,000 queries/month. Search returns brief metadata; use nara_record for full details. Results include descriptions, dates, creators, and links to digitized content when available. Limit max 100, offset for pagination.",
  domains: ["education"],
  crossRef: [],
  reference: {
    docs: {
      "NARA API Documentation": "https://catalog.archives.gov/api/v2/",
      "National Archives Catalog": "https://catalog.archives.gov/",
    },
  },
} satisfies ModuleMeta;
