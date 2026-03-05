/**
 * cdc module metadata.
 */

import { DATASETS } from "./sdk.js";
// ─── Metadata ────────────────────────────────────────────────────────

export const name = "cdc";
export const displayName = "CDC Health Data";
export const category = "Health";
export const description = "U.S. health statistics: leading causes of death, life expectancy, mortality rates, county/city health indicators, weekly death surveillance, disability, COVID-19";
export const workflow = "cdc_causes_of_death for mortality, cdc_life_expectancy for longevity, cdc_places_health for county health indicators, cdc_mortality_rates for recent death rates";
export const tips = "States use full names ('New York') for causes of death; abbreviations ('NY') for PLACES/COVID. Life expectancy data through 2018; use cdc_mortality_rates for 2020+.";

export const reference = {
  datasets: Object.fromEntries(
    Object.entries(DATASETS).map(([k, v]) => [v.id, `${v.name}: ${v.description}`])
  ),
  docs: {
    "CDC Open Data": "https://data.cdc.gov/",
    "SODA API Docs": "https://dev.socrata.com/",
    "Leading Causes of Death": "https://data.cdc.gov/d/bi63-dtpu",
    "Life Expectancy": "https://data.cdc.gov/d/w9j2-ggv5",
    "PLACES County Data": "https://data.cdc.gov/d/swc5-untb",
    "PLACES City Data": "https://data.cdc.gov/d/dxpw-cm5u",
  },
};

// ─── Tools ───────────────────────────────────────────────────────────

