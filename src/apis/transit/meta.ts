import type { ModuleMeta } from "../../shared/types.js";
export default {
  name: "transit",
  displayName: "Transit (12 US Transit Systems)",
  category: "Transportation",
  description:
    "Unified real-time transit data across 12 US transit systems: BART (SF Bay Area), MBTA (Boston), " +
    "SEPTA (Philadelphia), CTA (Chicago), LA Metro, TriMet (Portland), OneBusAway (Seattle), " +
    "WSDOT Ferries (WA), MARTA (Atlanta), PATH (NYC/NJ), WMATA (DC), MTA Maryland. " +
    "Get arrivals, vehicle positions, service alerts, and routes through a single interface.",
  workflow:
    "transit_systems to list available systems → transit_arrivals for next arrivals → transit_status for alerts/incidents.",
  tips:
    "Use transit_systems to see all 12 systems and their capabilities. " +
    "Each system supports different actions — transit_arrivals covers the most common (next train/bus). " +
    "Station/stop IDs are system-specific (e.g., BART uses 4-letter codes like EMBR, WMATA uses 3-letter codes like A01).",
  domains: ["transportation"],
  crossRef: [
    { question: "transportation", route: "transit_arrivals, transit_status (real-time transit across 12 US systems)" },
    { question: "state-level", route: "transit_systems, transit_arrivals (transit data by city/region)" },
  ],
  reference: {
    docs: {
      "BART": "https://api.bart.gov/docs/overview/index.aspx",
      "MBTA": "https://www.mbta.com/developers/v3-api",
      "SEPTA": "https://www3.septa.org/",
      "CTA": "https://www.transitchicago.com/developers/",
      "WMATA": "https://developer.wmata.com/apis",
    },
  },
} satisfies ModuleMeta;
