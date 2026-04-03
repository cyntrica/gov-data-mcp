/**
 * courtlistener module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "courtlistener",
  displayName: "CourtListener (Case Law)",
  category: "Justice",
  description:
    "Search and retrieve federal and state court opinions from CourtListener's database of millions of case law documents. Includes full opinion text, court, date filed, and citation information.",
  auth: {
    envVar: "COURTLISTENER_API_KEY",
    signup: "https://www.courtlistener.com/help/api/rest/",
  },
  workflow:
    "courtlistener_search to find opinions by keyword, court, or date range → courtlistener_opinion to get the full opinion text by ID.",
  tips:
    "Court codes: 'scotus' (Supreme Court), 'ca1'-'ca11' (Circuit Courts), 'cadc' (DC Circuit), 'cafc' (Federal Circuit). Dates use YYYY-MM-DD format. Search returns opinion metadata; use courtlistener_opinion for full text. Page size max 20.",
  domains: ["justice"],
  crossRef: [
    { question: "legislation", route: "courtlistener_search (case law and court opinions)" },
  ],
  reference: {
    docs: {
      "API Documentation": "https://www.courtlistener.com/help/api/rest/",
      "CourtListener": "https://www.courtlistener.com/",
    },
  },
} satisfies ModuleMeta;
