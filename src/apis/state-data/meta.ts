/**
 * State Data module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "state-data",
  displayName: "US State Open Data (50-State Socrata + GIS)",
  category: "State & Local",
  description:
    "Generic tools for querying US state open data portals. Supports Socrata SODA API " +
    "(used by 30+ states) and ArcGIS REST services for GIS/mapping data. " +
    "A single state registry maps state codes to portal URLs and dataset IDs. " +
    "Maryland is fully populated with 22 Socrata datasets and 8 GIS services. " +
    "Other states have portal URLs ready — use state_query with any dataset ID, " +
    "or state_list to see what categories are pre-mapped. " +
    "One SOCRATA_APP_TOKEN works across all state portals (optional, increases rate limits).",
  auth: {
    envVar: "SOCRATA_APP_TOKEN",
    signup: "https://opendata.maryland.gov/profile/edit/developer_settings",
  },
  workflow:
    "state_list for coverage overview → state_query for any dataset by ID → " +
    "state_crime / state_health / state_education / state_economy for category queries → " +
    "state_property / state_housing / state_environment / state_transportation for more categories → " +
    "state_gis_services to discover GIS layers → state_gis_query / state_gis_parcels / state_gis_boundaries for spatial data.",
  tips:
    "App token optional but recommended (higher rate limits). One token works across ALL Socrata state portals. " +
    "Use state_list to see which states have data and how many categories are mapped. " +
    "state_query works for ANY state with a Socrata portal even without category mappings — just pass a dataset ID. " +
    "For state-specific systems (Maryland CHART traffic, CBIBS bay data, MTA transit), use the md-traffic, md-bay, md-transit modules. " +
    "Combine with federal tools (BEA, BLS, Census, EPA, FBI) for state-vs-national comparisons. " +
    "SoQL syntax: $where, $select, $order, $group, $q (full-text), $limit, $offset.",
  domains: ["economy", "health", "education", "housing", "environment", "safety", "justice", "transportation"],
  crossRef: [
    { question: "state-level", route: "state_list, state_query, state_crime, state_economy, state_property (comprehensive state data for 30+ states)" },
    { question: "health", route: "state_health (state health indicators: overdose, mortality, disease rates)" },
    { question: "education", route: "state_education (K-12 enrollment, assessments, graduation rates)" },
    { question: "housing", route: "state_property (assessments), state_housing (permits), state_gis_parcels (parcel boundaries)" },
    { question: "energy/climate", route: "state_environment (air/water violations by state)" },
    { question: "transportation", route: "state_transportation (vehicle registrations, EV adoption)" },
  ],
  reference: {
    docs: {
      "Socrata SODA API": "https://dev.socrata.com/consumers/getting-started.html",
      "SoQL Reference": "https://dev.socrata.com/docs/queries/",
      "ArcGIS REST API": "https://developers.arcgis.com/rest/services-reference/enterprise/query-feature-service-layer/",
    },
  },
} satisfies ModuleMeta;
