/**
 * world-bank module metadata.
 */

import { POPULAR_INDICATORS } from "./sdk.js";
// ─── Metadata ────────────────────────────────────────────────────────

export const name = "world-bank";
export const displayName = "World Bank";
export const category = "International";
export const description = "International economic indicators for 200+ countries: GDP, population, health spending, life expectancy, trade, inequality";
export const workflow = "wb_indicator for a single country, wb_compare to compare countries, wb_search to find indicator IDs";
export const tips = "Countries: US, GB, DE, JP, CN, IN, BR. Indicators: NY.GDP.MKTP.CD (GDP), SP.POP.TOTL (population), SP.DYN.LE00.IN (life expectancy)";

export const reference = {
  popularIndicators: POPULAR_INDICATORS,
  docs: {
    "API Docs": "https://datahelpdesk.worldbank.org/knowledgebase/articles/889392",
    "Indicator List": "https://data.worldbank.org/indicator",
    "Country Codes": "https://datahelpdesk.worldbank.org/knowledgebase/articles/898590",
  },
};

// ─── Tools ───────────────────────────────────────────────────────────

