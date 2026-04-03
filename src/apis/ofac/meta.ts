/**
 * OFAC module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "ofac",
  displayName: "OFAC (Office of Foreign Assets Control)",
  category: "Finance",
  description:
    "U.S. Treasury sanctions lists: SDN (Specially Designated Nationals), consolidated non-SDN lists, fuzzy name search, and filtered datasets by entity type, program, or country. No API key required.",
  workflow:
    "ofac_search to find sanctioned entities by name → ofac_sdn_list or ofac_consolidated_list for full lists → ofac_filter to narrow by entity type/program/country → ofac_exports for available data downloads.",
  tips:
    "Use ofac_search for fuzzy name matching against all sanctions lists. SDN list contains the primary sanctions targets. Consolidated list includes non-SDN programs (sectoral sanctions, foreign sanctions evaders, etc.).",
  domains: ["finance"],
  reference: {
    docs: {
      "OFAC Sanctions Search": "https://sanctionslist.ofac.treas.gov",
      "SDN List": "https://ofac.treasury.gov/specially-designated-nationals-and-blocked-persons-list-sdn-human-readable-lists",
    },
  },
} satisfies ModuleMeta;
