/**
 * faa-weather module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "faa-weather",
  displayName: "FAA Aviation Weather",
  category: "Transportation",
  description:
    "Aviation weather data from the FAA Aviation Weather Center — METARs (current observations), " +
    "TAFs (terminal forecasts), SIGMETs (significant weather advisories), and PIREPs (pilot reports). " +
    "Essential for aviation safety and flight planning.",
  workflow:
    "faa_metar for current airport weather → faa_taf for forecasts → faa_sigmet for hazardous weather areas → faa_pirep for pilot observations.",
  tips:
    "Station IDs are 4-letter ICAO codes (e.g. KJFK, KLAX, EGLL). Multiple stations can be comma-separated. " +
    "METAR and TAF are station-specific; SIGMETs and PIREPs cover broader areas. All data is returned in JSON format.",
  domains: ["transportation"],
  crossRef: [
    { question: "transportation", route: "faa_metar, faa_taf, faa_sigmet, faa_pirep (aviation weather and safety)" },
  ],
  reference: {
    docs: {
      "API Docs": "https://aviationweather.gov/data/api/",
      "Aviation Weather Center": "https://aviationweather.gov",
    },
  },
} satisfies ModuleMeta;
