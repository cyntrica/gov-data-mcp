/**
 * usitc module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "usitc",
  displayName: "USITC (U.S. International Trade Commission)",
  category: "Finance",
  description:
    "Query U.S. import/export trade statistics by HTS code, partner country, and year from the USITC DataWeb. No API key required.",
  workflow:
    "Use usitc_trade_data to query trade statistics by HTS code, partner country, year, and trade type (import/export/balance).",
  tips:
    "HTS codes are hierarchical: 2-digit = chapter, 4-digit = heading, 6-digit = subheading. Use ISO 3-letter country codes. Trade types: 'import', 'export', 'balance'.",
  domains: ["economy", "international"],
  crossRef: [
    { question: "international", route: "usitc_trade_data (US import/export trade statistics by product and country)" },
  ],
} satisfies ModuleMeta;
