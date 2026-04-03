/**
 * ita-trade module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "ita-trade",
  displayName: "ITA (International Trade Administration)",
  category: "Finance",
  description:
    "Search FTA (Free Trade Agreement) tariff rates by HTS code and partner country, and find international trade events from the International Trade Administration.",
  auth: {
    envVar: "ITA_API_KEY",
    signup: "https://developer.trade.gov/",
  },
  workflow:
    "Use ita_tariff_rates to look up FTA tariff rates for specific products and countries → ita_trade_events to find upcoming trade shows, missions, and events.",
  tips:
    "Tariff searches work with HTS subheading codes (6-digit). Partner countries use full names. Trade events can be filtered by country or keyword.",
  domains: ["economy", "international"],
  crossRef: [
    { question: "international", route: "ita_tariff_rates, ita_trade_events (FTA tariff rates and trade events)" },
  ],
} satisfies ModuleMeta;
