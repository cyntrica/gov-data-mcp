/**
 * Urban Institute Education Data Explorer module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "urban-ed",
  displayName: "Urban Institute Education Data Explorer",
  category: "Education",
  description: "K-12, higher ed, and school finance data across all 50 states — schools, districts, and colleges from the Urban Institute",
  workflow: "urban_ed_schools / urban_ed_districts / urban_ed_colleges → query enrollment data by year and state",
  tips: "Use 2-digit state FIPS codes (e.g. 06=CA, 36=NY, 48=TX). Year is required. Data covers CCD (K-12) and IPEDS (higher ed).",
  domains: ["education"],
  crossRef: [
    { question: "education", route: "urban_ed_schools, urban_ed_districts, urban_ed_colleges (K-12 and higher ed data for all 50 states)" },
  ],
} satisfies ModuleMeta;
