/**
 * ecfr module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "ecfr",
  displayName: "eCFR (Code of Federal Regulations)",
  category: "Legislative",
  description: "Search and read the electronic Code of Federal Regulations — full text of all federal regulations organized by title, part, and section",
  workflow: "ecfr_search to find relevant regulations → ecfr_title_structure to browse a title's organization → ecfr_section for full text of a specific section",
  tips: "CFR is organized into 50 titles by subject (e.g. Title 21 = Food and Drugs, Title 26 = Internal Revenue, Title 40 = Environment). Use today's date for current regulations or a past date for historical versions.",
  domains: ["legislation"],
  crossRef: [
    { question: "legislation", route: "ecfr_search, ecfr_section (Code of Federal Regulations full text)" },
  ],
} satisfies ModuleMeta;
