/**
 * Chesapeake Bay (CBIBS) module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "md-bay",
  displayName: "Chesapeake Bay (CBIBS Buoy System)",
  category: "State & Local",
  description:
    "Chesapeake Bay Interpretive Buoy System (CBIBS) operated by NOAA. " +
    "Real-time and historical water quality data from 10+ buoy stations across the Chesapeake Bay. " +
    "Parameters: water temperature, salinity, dissolved oxygen, pH, turbidity, chlorophyll, " +
    "wind speed/direction, wave height/period, and water currents (19+ variables). " +
    "API key required (free).",
  auth: {
    envVar: "CBIBS_API_KEY",
    signup: "https://buoybay.noaa.gov/data/api",
  },
  workflow:
    "md_bay_stations for station list → md_bay_latest for current readings → " +
    "md_bay_historical for time-series data by date range and variable.",
  tips:
    "Station codes: UP (Upper Potomac), GR (Gooses Reef), J (Jamestown), FL (First Landing), " +
    "SR (Stingray Point), PL (Point Lookout), AN (Annapolis), YS (York Spit), N (Norfolk), " +
    "SN (Susquehanna), S (South). " +
    "Common variables: water_temp, salinity, dissolved_oxygen, ph, turbidity, chlorophyll, " +
    "wind_speed, wind_direction, wave_height, sea_netcurrent_speed. " +
    "Historical data available from 2007-present depending on station.",
  domains: ["environment", "health"],
  crossRef: [
    { question: "energy/climate", route: "md_bay_latest, md_bay_historical (water temperature trends, climate indicators)" },
    { question: "earthquakes/water", route: "md_bay_latest, md_bay_historical (Chesapeake Bay water quality monitoring)" },
  ],
  reference: {
    docs: {
      "CBIBS API": "https://buoybay.noaa.gov/data/api",
      "Buoy Bay Portal": "https://buoybay.noaa.gov/",
    },
    stations: {
      UP: "Upper Potomac",
      GR: "Gooses Reef",
      J: "Jamestown",
      FL: "First Landing",
      SR: "Stingray Point",
      PL: "Point Lookout",
      AN: "Annapolis",
      YS: "York Spit",
      N: "Norfolk",
      SN: "Susquehanna",
      S: "South",
    },
  },
} satisfies ModuleMeta;
