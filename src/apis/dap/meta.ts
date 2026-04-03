/**
 * dap module metadata.
 */

import type { ModuleMeta, Domain } from "../../shared/types.js";

export default {
  name: "dap",
  displayName: "DAP (Digital Analytics Program)",
  category: "Government Operations",
  description:
    "GSA Digital Analytics Program — government-wide web analytics data including " +
    "site visits, traffic sources, devices, browsers, operating systems, and downloads. " +
    "Supports government-wide, agency-specific, and domain-specific reports. " +
    "Requires DATA_GOV_API_KEY.",
  auth: {
    envVar: "DATA_GOV_API_KEY",
    signup: "https://api.data.gov/signup/",
  },
  workflow:
    "dap_gov_wide_report for government-wide analytics → " +
    "dap_agency_report for agency-specific data → " +
    "dap_domain_report for domain-specific data",
  tips:
    "Report types include: site, domain, second-level-domain, download, traffic-source, " +
    "device, device-model, os, browser, os-browser, windows, windows-browser, language. " +
    "Use after/before params (YYYY-MM-DD) to filter by date range. " +
    "Maximum 10000 results per request. Use page for pagination.",
  domains: ["economy"] as Domain[],
  reference: {
    docs: {
      "DAP API": "https://open.gsa.gov/api/dap/",
      "Analytics.usa.gov": "https://analytics.usa.gov",
    },
    reportTypes: [
      "site", "domain", "second-level-domain", "download", "traffic-source",
      "device", "device-model", "os", "browser", "os-browser",
      "windows", "windows-browser", "language",
    ],
  },
} satisfies ModuleMeta;
