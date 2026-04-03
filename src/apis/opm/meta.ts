/**
 * opm module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "opm",
  displayName: "OPM Operating Status",
  category: "Government Operations",
  description:
    "Office of Personnel Management federal government operating status for the Washington, DC area. Current status, historical status records, and all possible status types (Open, Closed, Delayed, etc.). Covers weather closures, emergencies, and other events affecting federal office operations.",
  workflow:
    "opm_current_status for today's federal operating status -> opm_status_history for historical records -> opm_status_types for reference list of all status categories.",
  tips:
    "Current status returns the latest DC-area federal operating status. History supports pagination with startrow and count (max 5000). Date format for current status query is MM/DD/YYYY. Status types include Open, Closed, various Delayed/Early Departure options.",
  domains: ["economy"],
  crossRef: [],
  reference: {
    docs: {
      "OPM Status Page": "https://www.opm.gov/policy-data-oversight/snow-dismissal-procedures/current-status/",
      "API Base": "https://www.opm.gov/json/operatingstatus.json",
    },
  },
} satisfies ModuleMeta;
