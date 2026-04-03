/**
 * nws module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "nws",
  displayName: "National Weather Service",
  category: "Environment",
  description: "Weather forecasts, alerts, observations, and station data from the National Weather Service API. Covers all U.S. locations with point-based forecast resolution.",
  workflow: "nws_point_lookup (lat,lon → grid) → nws_forecast or nws_forecast_hourly for predictions. nws_alerts_active for current warnings.",
  tips: "Two-step workflow: first resolve lat/lon to a grid point, then get forecasts for that grid. Alerts can be searched by state, zone, or area. User-Agent header is required by NWS.",
  domains: ["environment"],
  crossRef: [
    { question: "energy/climate", route: "nws_forecast, nws_observation_latest (current/forecast weather)" },
    { question: "disasters", route: "nws_alerts_active, nws_alerts_by_state (severe weather warnings)" },
    { question: "agriculture", route: "nws_forecast (weather forecast for agricultural planning)" },
    { question: "state-level", route: "nws_alerts_by_state (weather alerts by state)" },
  ],
} satisfies ModuleMeta;
