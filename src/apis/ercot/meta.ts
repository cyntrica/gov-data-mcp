/**
 * ercot module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "ercot",
  displayName: "ERCOT (Electric Reliability Council of Texas)",
  category: "Energy",
  description: "Texas electric grid conditions — load forecasts, capacity, wind/solar generation, and settlement point prices",
  auth: { envVar: "ERCOT_API_KEY", signup: "https://apiexplorer.ercot.com/" },
  workflow: "Choose data type → ercot_grid_conditions (load/capacity) or ercot_prices (settlement prices)",
  tips: "ERCOT manages the Texas grid independently from the rest of the US. Wind and solar are major generation sources. Settlement point prices reflect real-time wholesale electricity costs.",
  domains: ["energy"],
  crossRef: [
    { question: "energy/climate", route: "ercot_grid_conditions, ercot_prices (Texas grid load, renewables, wholesale prices)" },
    { question: "state-level", route: "ercot_grid_conditions, ercot_prices (Texas-specific energy data)" },
  ],
} satisfies ModuleMeta;
