import type { ModuleMeta } from "../../shared/types.js";
export default {
  name: "state-511",
  displayName: "State 511 Traffic (Multi-State Real-Time Traffic)",
  category: "State & Local",
  description:
    "Real-time traffic data from state 511 systems across 14+ states. Covers incidents, road closures, " +
    "cameras, speed data, weather stations (RWIS), dynamic message signs, travel times, and road conditions. " +
    "Many states use the ibi511 platform with identical API patterns. Also includes OHGO (Ohio), " +
    "NCDOT TIMS, Caltrans CWWP2, WSDOT, and PennDOT RCRS. Free API key required for most states.",
  workflow:
    "traffic_511_incidents for active incidents → traffic_511_cameras for camera locations → " +
    "traffic_511_signs for DMS messages → traffic_511_weather for road weather → " +
    "traffic_511_conditions for road conditions.",
  tips:
    "Most 511 APIs share the same endpoint pattern. Rate limit: 10 calls/60 seconds per state. " +
    "Use traffic_511_list to see available states. States on the ibi511 platform: AZ, NV, UT, AK, ID, " +
    "NY, CT, GA, WI, LA. OHGO (Ohio) has its own REST API. NCDOT TIMS has no auth required. " +
    "Caltrans CWWP2 organizes by district (d1-d12). WSDOT requires an Access Code.",
  domains: ["transportation", "safety"],
  crossRef: [
    { question: "transportation", route: "traffic_511_incidents, traffic_511_conditions (real-time state traffic data)" },
    { question: "state-level", route: "traffic_511_incidents, traffic_511_list (traffic data across 14+ states)" },
  ],
  reference: {
    docs: {
      "511NY": "https://511ny.org/developers/doc",
      "OHGO": "https://publicapi.ohgo.com/",
      "NCDOT TIMS": "https://tims.ncdot.gov/tims/V2/webservices",
      "Caltrans CWWP2": "https://cwwp2.dot.ca.gov/",
      "WSDOT": "https://wsdot.wa.gov/traffic/api/",
    },
  },
} satisfies ModuleMeta;
