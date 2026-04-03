/**
 * ftc module metadata.
 */

import type { ModuleMeta, Domain } from "../../shared/types.js";

export default {
  name: "ftc",
  displayName: "FTC (Federal Trade Commission)",
  category: "Consumer Protection",
  description:
    "Federal Trade Commission — Do Not Call complaint data and HSR merger early termination notices. " +
    "Requires DATA_GOV_API_KEY.",
  auth: {
    envVar: "DATA_GOV_API_KEY",
    signup: "https://api.data.gov/signup/",
  },
  workflow:
    "ftc_dnc_complaints to search Do Not Call complaints by state/city/subject → " +
    "ftc_hsr_notices to search Hart-Scott-Rodino merger early termination notices",
  tips:
    "DNC complaints can be filtered by state (2-letter code), city, subject, and robocall flag. " +
    "HSR notices can be searched by company title or transaction number. " +
    "Both endpoints use pagination — use page and page_size to navigate results.",
  domains: ["safety"] as Domain[],
  crossRef: [
    { question: "consumer complaints", route: "ftc_dnc_complaints (Do Not Call telemarketing complaints)" },
  ],
  reference: {
    docs: {
      "FTC API": "https://api.ftc.gov",
      "DNC Complaints": "https://api.ftc.gov/v0/dnc-complaints",
      "HSR Early Termination": "https://api.ftc.gov/v0/hsr-early-termination-notices",
    },
  },
} satisfies ModuleMeta;
