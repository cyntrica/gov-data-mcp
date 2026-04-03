/**
 * bart module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "bart",
  displayName: "BART (Bay Area Rapid Transit)",
  category: "State & Local",
  description:
    "Real-time transit data for San Francisco Bay Area's BART system: departure estimates by station, station listings, and service advisories. Free demo key available (MW9S-E7SL-26DU-VV8V).",
  auth: {
    envVar: "BART_API_KEY",
    signup: "https://api.bart.gov/api/register.aspx",
  },
  workflow:
    "Use bart_stations to list all stations and get abbreviations → bart_departures for real-time departure estimates at a station → bart_advisories for service alerts.",
  tips:
    "Station abbreviations are 4 letters (e.g. 'EMBR' for Embarcadero, '12TH' for 12th St Oakland). Use 'ALL' for all stations. Demo key MW9S-E7SL-26DU-VV8V works for testing. Response is in root.station array.",
  domains: ["transportation"],
  crossRef: [
    { question: "transportation", route: "bart_departures (real-time departures), bart_stations (station list), bart_advisories (service alerts)" },
    { question: "state-level", route: "bart_departures, bart_advisories (California/Bay Area transit)" },
  ],
  reference: {
    demoKey: "MW9S-E7SL-26DU-VV8V",
    docs: {
      "BART API": "https://api.bart.gov/docs/overview/index.aspx",
      "BART Station Abbreviations": "https://api.bart.gov/docs/overview/abbrev.aspx",
    },
  },
} satisfies ModuleMeta;
