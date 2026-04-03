/**
 * co-water module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "co-water",
  displayName: "Colorado Division of Water Resources",
  category: "State & Local",
  description: "Colorado water data — telemetry stations, real-time streamflow/reservoir readings, and water rights/structures",
  auth: { envVar: "CO_WATER_API_KEY", signup: "https://dwr.state.co.us/Rest/GET/Help" },
  workflow: "co_water_stations (find stations) → co_water_readings (get data) | co_water_rights (search water rights)",
  tips: "API key is optional (1000 calls/day without). Parameters: DISCHRG (discharge/flow), GAGE_HT (gage height), AIRTEMP (air temp), STORAGE (reservoir storage). Water rights data includes adjudication dates, appropriation amounts, and water sources.",
  domains: ["environment"],
  crossRef: [
    { question: "earthquakes/water", route: "co_water_readings, co_water_stations (Colorado water rights and streamflow)" },
    { question: "state-level", route: "co_water_stations, co_water_readings, co_water_rights (Colorado water data)" },
  ],
} satisfies ModuleMeta;
