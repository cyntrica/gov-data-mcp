/**
 * data-gov MCP tools — 3 tools for the Data.gov CKAN Catalog API.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import {
  searchDatasets,
  getDataset,
  listOrganizations,
  type CkanDataset,
  type CkanOrganization,
} from "./sdk.js";
import { listResponse, recordResponse, emptyResponse } from "../../shared/response.js";

// ─── Helpers ────────────────────────────────────────────────────────

function truncate(text: string | undefined | null, maxLen: number): string | null {
  if (!text) return null;
  return text.length > maxLen ? text.slice(0, maxLen) + "..." : text;
}

function datasetToSummary(ds: CkanDataset): Record<string, unknown> {
  return {
    name: ds.name,
    title: ds.title,
    organization: ds.organization?.title ?? null,
    description: truncate(ds.notes, 200),
    num_resources: ds.num_resources ?? ds.resources?.length ?? 0,
    tags: ds.tags?.map((t) => t.name) ?? [],
  };
}

// ─── Tools ──────────────────────────────────────────────────────────

export const tools: Tool<any, any>[] = [
  // ─── 1. Search Datasets ─────────────────────────────────────────
  {
    name: "datagov_search_datasets",
    description:
      "Search the Data.gov federal open data catalog (400K+ datasets).\n" +
      "Find datasets by keyword, topic, agency, or format.\n" +
      "Use fq for precise filtering: 'organization:nasa-gov', 'res_format:CSV', 'tags:climate'.\n" +
      "Returns dataset name, title, organization, description, resource count, and tags.",
    annotations: { title: "Data.gov: Search Datasets", readOnlyHint: true },
    parameters: z.object({
      q: z.string().optional().describe("Free-text search query: 'climate change', 'census', 'air quality'"),
      fq: z.string().optional().describe("Filter query (Solr syntax): 'organization:nasa-gov', 'res_format:CSV', 'tags:health'"),
      sort: z.string().optional().describe("Sort order: 'relevance asc' (default), 'metadata_modified desc', 'name asc'"),
      rows: z.number().int().min(1).max(1000).optional().describe("Number of results (default 20, max 1000)"),
      start: z.number().int().min(0).optional().describe("Offset for pagination (default 0)"),
      facet_field: z.string().optional().describe("Field to facet on: 'organization', 'tags', 'res_format', 'groups'"),
    }),
    execute: async (args) => {
      const data = await searchDatasets({
        q: args.q,
        fq: args.fq,
        sort: args.sort,
        rows: args.rows,
        start: args.start,
        facetField: args.facet_field,
      });

      if (!data.results?.length) {
        return emptyResponse(`No datasets found matching '${args.q ?? "*"}'.`);
      }

      const items = data.results.map(datasetToSummary);
      const meta: Record<string, unknown> = {};
      if (data.facets && Object.keys(data.facets).length > 0) {
        meta.facets = data.facets;
      }

      return listResponse(
        `${data.count.toLocaleString()} datasets found (showing ${data.results.length})`,
        { items, total: data.count, meta },
      );
    },
  },

  // ─── 2. Dataset Detail ──────────────────────────────────────────
  {
    name: "datagov_dataset_detail",
    description:
      "Get full metadata for a Data.gov dataset by name (slug) or UUID.\n" +
      "Returns title, description, organization, resources (with download URLs and formats), " +
      "tags, license, author, maintainer, and modification dates.",
    annotations: { title: "Data.gov: Dataset Detail", readOnlyHint: true },
    parameters: z.object({
      id: z.string().describe("Dataset name (slug) or UUID: 'annual-enterprise-survey' or 'a1b2c3d4-...'"),
    }),
    execute: async (args) => {
      const ds = await getDataset(args.id);

      const record: Record<string, unknown> = {
        id: ds.id,
        name: ds.name,
        title: ds.title,
        description: ds.notes ?? null,
        organization: ds.organization?.title ?? null,
        organizationId: ds.organization?.name ?? null,
        author: ds.author ?? null,
        maintainer: ds.maintainer ?? null,
        license: ds.license_title ?? null,
        licenseUrl: ds.license_url ?? null,
        metadataCreated: ds.metadata_created ?? null,
        metadataModified: ds.metadata_modified ?? null,
        numResources: ds.num_resources ?? ds.resources?.length ?? 0,
        tags: ds.tags?.map((t) => t.name) ?? [],
        resources: ds.resources?.map((r) => ({
          name: r.name,
          format: r.format,
          url: r.url,
          description: truncate(r.description, 200),
          size: r.size ?? null,
          lastModified: r.last_modified ?? null,
        })) ?? [],
      };

      return recordResponse(
        `${ds.title ?? ds.name} — ${ds.organization?.title ?? "Unknown agency"}`,
        record,
      );
    },
  },

  // ─── 3. List Organizations ──────────────────────────────────────
  {
    name: "datagov_list_organizations",
    description:
      "List federal agencies publishing data on Data.gov.\n" +
      "Returns agency name, title, description, and dataset count.\n" +
      "Sorted by dataset count (most prolific first) by default.",
    annotations: { title: "Data.gov: List Organizations", readOnlyHint: true },
    parameters: z.object({
      sort: z.string().optional().describe("Sort order: 'package_count desc' (default), 'name asc', 'title asc'"),
      limit: z.number().int().min(1).max(1000).optional().describe("Number of results (default 50, max 1000)"),
      offset: z.number().int().min(0).optional().describe("Offset for pagination (default 0)"),
    }),
    execute: async (args) => {
      const data = await listOrganizations({
        allFields: true,
        sort: args.sort,
        limit: args.limit,
        offset: args.offset,
      });

      if (!data?.length) {
        return emptyResponse("No organizations found.");
      }

      // allFields=true returns CkanOrganization objects
      const orgs = data as CkanOrganization[];
      const items = orgs.map((org) => ({
        name: org.name,
        title: org.title,
        description: truncate(org.description, 200),
        datasetCount: org.package_count ?? 0,
      }));

      return listResponse(
        `${items.length} federal agencies on Data.gov`,
        { items },
      );
    },
  },
];
