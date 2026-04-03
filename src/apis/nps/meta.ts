/**
 * nps module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "nps",
  displayName: "National Park Service",
  category: "Recreation",
  description:
    "National Park Service API — search parks, get alerts (closures, dangers), find campgrounds, " +
    "and discover upcoming events across the U.S. national park system.",
  auth: { envVar: "NPS_API_KEY", signup: "https://www.nps.gov/subjects/developer/get-started.htm" },
  workflow:
    "nps_parks to find parks by state or keyword → nps_alerts for current conditions → " +
    "nps_campgrounds for camping options → nps_events for scheduled activities.",
  tips:
    "Park codes are short abbreviations (e.g. 'yose' for Yosemite, 'grca' for Grand Canyon, 'yell' for Yellowstone). " +
    "Use nps_parks to discover park codes. State codes are 2-letter abbreviations (e.g. 'CA', 'WY'). " +
    "Alerts include closures, dangers, cautions, and general info.",
  domains: ["environment"],
  crossRef: [
    { question: "state-level", route: "nps_parks (national parks by state)" },
  ],
  reference: {
    docs: {
      "API Docs": "https://www.nps.gov/subjects/developer/api-documentation.htm",
      "Get API Key": "https://www.nps.gov/subjects/developer/get-started.htm",
    },
  },
} satisfies ModuleMeta;
