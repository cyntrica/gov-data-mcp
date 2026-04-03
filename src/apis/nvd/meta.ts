/**
 * nvd module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "nvd",
  displayName: "NVD (National Vulnerability Database)",
  category: "Security",
  description:
    "CVE vulnerability data from NIST's National Vulnerability Database — search and retrieve " +
    "vulnerability details including CVSS scores, descriptions, affected products, and references. " +
    "API key optional but recommended for higher rate limits.",
  auth: { envVar: "NVD_API_KEY", signup: "https://nvd.nist.gov/developers/request-an-api-key" },
  workflow:
    "nvd_cve_search to find vulnerabilities by keyword/severity/date → nvd_cve_detail for full CVE details",
  tips:
    "CVSS severity values: LOW, MEDIUM, HIGH, CRITICAL. " +
    "Date parameters use ISO 8601 format (e.g. '2024-01-01T00:00:00.000'). " +
    "Without an API key, rate limit is ~5 requests per 30 seconds. With a key, ~50 per 30 seconds.",
  domains: ["safety"],
  crossRef: [
    { question: "consumer complaints", route: "nvd_cve_search (cybersecurity vulnerabilities by keyword/severity)" },
  ],
  reference: {
    docs: {
      "NVD API": "https://nvd.nist.gov/developers",
      "CVE API": "https://nvd.nist.gov/developers/vulnerabilities",
      "CVSS Scores": "https://nvd.nist.gov/vuln-metrics/cvss",
    },
  },
} satisfies ModuleMeta;
