/**
 * state-travel module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "state-travel",
  displayName: "State Department Travel Advisories",
  category: "International",
  description:
    "U.S. State Department travel advisories for all countries. Includes advisory levels (1-4), description, date published, and country information.",
  workflow:
    "travel_advisories to get all travel advisories or filter by country.",
  tips:
    "Advisory levels: 1 = Exercise Normal Precautions, 2 = Exercise Increased Caution, 3 = Reconsider Travel, 4 = Do Not Travel. Returns all advisories by default; filter by country_code (ISO 2-letter, e.g. 'AF', 'CN', 'RU').",
  domains: ["international", "safety"],
  crossRef: [],
  reference: {
    docs: {
      "Travel Advisories": "https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories.html/",
      "API": "https://cadataapi.state.gov/",
    },
  },
} satisfies ModuleMeta;
