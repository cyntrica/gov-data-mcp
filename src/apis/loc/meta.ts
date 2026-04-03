/**
 * LOC module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "loc",
  displayName: "LOC (Library of Congress)",
  category: "Culture",
  description:
    "Library of Congress digital collections: 40M+ items including books, maps, photos, newspapers, manuscripts, audio, film, legislation, and web archives. Includes Chronicling America historical newspaper search. No API key required.",
  workflow:
    "loc_search for global keyword search → loc_item_detail for full metadata on a specific item → loc_collections to browse collections → loc_browse_format to explore by media type → loc_newspaper_search for historical newspaper full-text search.",
  tips:
    "Use facets to narrow searches (e.g. by date, subject, location). Collection slugs can be found via loc_collections. Chronicling America covers newspapers from 1777–1963. Format options: audio, books, film-and-videos, maps, photos, newspapers, manuscripts, notated-music, web-archives.",
  domains: ["education"],
  reference: {
    docs: {
      "LOC API": "https://www.loc.gov/apis/",
      "Chronicling America": "https://chroniclingamerica.loc.gov/about/api/",
      "Collections": "https://www.loc.gov/collections/",
    },
    formats: [
      "audio",
      "books",
      "film-and-videos",
      "legislation",
      "manuscripts",
      "maps",
      "newspapers",
      "photos",
      "notated-music",
      "web-archives",
    ],
  },
} satisfies ModuleMeta;
