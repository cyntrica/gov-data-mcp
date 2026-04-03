/**
 * pubmed module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "pubmed",
  displayName: "PubMed (NCBI E-utilities)",
  category: "Health",
  description:
    "Search and retrieve biomedical literature from PubMed/MEDLINE — 36M+ citations, abstracts, MeSH terms, and citation links via NCBI E-utilities.",
  auth: { envVar: "NCBI_API_KEY", signup: "https://www.ncbi.nlm.nih.gov/account/" },
  workflow:
    "pubmed_search to find articles → pubmed_summary for metadata → pubmed_fetch for full records",
  tips:
    "API key optional but increases rate limit from 3/sec to 10/sec. Use MeSH terms for precise searches. Combine with NIH Reporter for grant→publication links.",
  domains: ["health"] as const,
  crossRef: [
    { question: "health", route: "pubmed_search, pubmed_summary (biomedical literature)" },
    { question: "drug investigation", route: "pubmed_search (drug efficacy/safety research)" },
    { question: "food safety", route: "pubmed_search (food safety research literature)" },
  ],
} satisfies ModuleMeta;
