/**
 * openstates module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "openstates",
  displayName: "OpenStates (State Legislation)",
  category: "Legislative",
  description:
    "Search bills and legislators across all 50 state legislatures. Track state-level legislation, sponsors, and voting records via the OpenStates API.",
  auth: {
    envVar: "OPENSTATES_API_KEY",
    signup: "https://openstates.org/accounts/signup/",
  },
  workflow:
    "openstates_bills to search bills by state and keyword → openstates_bill_detail for full bill info by OpenStates ID → openstates_legislators to find state legislators by name or jurisdiction.",
  tips:
    "Jurisdiction uses state abbreviation lowercase (e.g. 'ca', 'tx', 'ny'). Session is the legislative session identifier (e.g. '2023-2024'). Page starts at 1. Per_page max is 50. Bill IDs are OpenStates UUIDs from search results.",
  domains: ["legislation"],
  crossRef: [
    { question: "legislation", route: "openstates_bills, openstates_legislators (state-level legislation across all 50 states)" },
  ],
  reference: {
    docs: {
      "API Documentation": "https://docs.openstates.org/api-v3/",
      "OpenStates": "https://openstates.org/",
    },
  },
} satisfies ModuleMeta;
