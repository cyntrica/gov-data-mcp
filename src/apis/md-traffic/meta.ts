/**
 * Maryland CHART traffic module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "md-traffic",
  displayName: "Maryland CHART (Traffic & Road Conditions)",
  category: "State & Local",
  description:
    "Real-time Maryland traffic data from CHART (Coordinated Highways Action Response Team) operated by MDOT SHA. " +
    "Live feeds for traffic incidents, road closures, camera locations, speed sensor data, " +
    "weather station readings (RWIS), dynamic message signs, and travel time routes. " +
    "No API key required. Data updates continuously.",
  workflow:
    "md_traffic_incidents for current incidents → md_traffic_closures for road closures → " +
    "md_traffic_speeds for speed sensor data → md_traffic_weather for road weather conditions → " +
    "md_traffic_cameras for camera locations → md_traffic_signs for DMS messages → " +
    "md_traffic_travel_times for route travel times.",
  tips:
    "All feeds are real-time with no authentication required. " +
    "Speed sensor data includes average speed, volume, and occupancy. " +
    "RWIS stations provide road surface temperature, precipitation, and visibility. " +
    "Combine with md_gis_traffic_counts for historical AADT data.",
  domains: ["transportation", "safety"],
  crossRef: [
    { question: "transportation", route: "md_traffic_incidents, md_traffic_closures, md_traffic_speeds, md_traffic_travel_times" },
    { question: "state-level", route: "md_traffic_incidents, md_traffic_closures (Maryland real-time traffic conditions)" },
  ],
  reference: {
    docs: {
      "CHART Home": "https://chart.maryland.gov/",
      "Data Feeds": "https://chart.maryland.gov/DataFeeds/GetDataFeeds",
    },
  },
} satisfies ModuleMeta;
