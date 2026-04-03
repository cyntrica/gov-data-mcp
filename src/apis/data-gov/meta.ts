/**
 * data-gov module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "data-gov",
  displayName: "Data.gov (CKAN Catalog)",
  category: "Meta",
  description:
    "Search and explore the Data.gov federal open data catalog — 400K+ datasets from hundreds of " +
    "federal agencies. Find datasets by topic, agency, format, or keyword. Get full metadata " +
    "including download URLs, update frequency, and data dictionaries. " +
    "No API key required.",
  workflow:
    "Use datagov_search_datasets to discover datasets by keyword/topic/agency → " +
    "datagov_dataset_detail for full metadata and resource download URLs → " +
    "datagov_list_organizations to browse federal agencies publishing data.",
  tips:
    "Use fq (filter query) for precise filtering: 'organization:nasa' or 'res_format:CSV'. " +
    "Combine q (free text) with fq for targeted searches. " +
    "facet.field can be 'organization', 'tags', 'res_format', 'groups' for aggregations. " +
    "Sort options: 'relevance asc', 'metadata_modified desc', 'name asc'. " +
    "The id param in dataset_detail accepts either the dataset name (slug) or UUID.",
  domains: ["economy"],
} satisfies ModuleMeta;
