/**
 * foia module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "foia",
  displayName: "FOIA.gov (Freedom of Information Act)",
  category: "Legislative",
  description:
    "Federal FOIA data — agency contact information and annual FOIA report statistics. Lists all federal agencies with FOIA offices, request processing stats, and compliance data.",
  workflow:
    "foia_agencies to list all federal agencies with FOIA contact info → foia_report to get annual FOIA processing statistics for a specific agency.",
  tips:
    "Agency abbreviations are standard federal abbreviations (e.g. 'DOJ', 'DOD', 'DHS', 'EPA'). Annual reports include request volumes, processing times, backlog data, and exemption usage. Use foia_agencies first to discover available agency abbreviations.",
  domains: ["legislation"],
  crossRef: [],
  reference: {
    docs: {
      "FOIA.gov API": "https://www.foia.gov/developer/",
      "FOIA.gov": "https://www.foia.gov/",
    },
  },
} satisfies ModuleMeta;
