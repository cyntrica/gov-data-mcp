/**
 * onebusaway module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "onebusaway",
  displayName: "OneBusAway (Puget Sound Transit)",
  category: "State & Local",
  description:
    "Real-time transit data for Puget Sound (Seattle area). Get arrival predictions by stop and list routes by agency using the OneBusAway API.",
  auth: {
    envVar: "OBA_API_KEY",
    signup: "https://pugetsound.onebusaway.org/ — email oba_api_key@soundtransit.org",
  },
  workflow:
    "Use oba_routes to discover routes for an agency → oba_arrivals to get real-time arrival predictions at a stop.",
  tips:
    "Default agency ID '1' is King County Metro (Seattle). Stop IDs are agency-specific. The API returns both real-time predictions and scheduled times.",
  domains: ["transportation"],
  crossRef: [
    { question: "transportation", route: "oba_arrivals (Puget Sound real-time transit), oba_routes (agency routes)" },
    { question: "state-level", route: "oba_arrivals, oba_routes (Seattle/Puget Sound, WA transit data)" },
  ],
} satisfies ModuleMeta;
