/**
 * noaa-coops module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "noaa-coops",
  displayName: "NOAA Tides & Currents (CO-OPS)",
  category: "Environment",
  description: "Real-time and historical water levels, tide predictions, currents, meteorological data, and water quality from NOAA CO-OPS stations.",
  workflow: "coops_stations to find stations → coops_water_level or coops_tide_predictions for data",
  tips: "Use station IDs (e.g. 8454000 for Providence, 9414290 for San Francisco). Date format: YYYYMMDD. Products: water_level, predictions, air_temperature, wind, etc.",
  domains: ["environment"],
  crossRef: [
    { question: "earthquakes/water", route: "coops_water_level, coops_tide_predictions (water level/tide data)" },
    { question: "disasters", route: "coops_water_level (storm surge monitoring)" },
    { question: "energy/climate", route: "coops_meteorological (coastal weather data)" },
  ],
} satisfies ModuleMeta;
