/**
 * nc-linc MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchDatasets, queryDataset } from "./sdk.js";
import { listResponse, tableResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "nc_linc_search",
    description:
      "Search across all NC LINC datasets by keyword.\n" +
      "Returns matching datasets with IDs, titles, descriptions, and record counts.\n" +
      "Use the dataset ID from results with nc_linc_query to fetch actual data.",
    annotations: { title: "NC LINC: Search Datasets", readOnlyHint: true },
    parameters: z.object({
      query: z.string().describe("Search keyword: 'employment', 'population', 'income', 'education', 'transportation'"),
      limit: z.number().int().max(100).optional().describe("Max datasets to return (default 10, max 100)"),
    }),
    execute: async (args) => {
      const data = await searchDatasets(args);
      const datasets = data.datasets ?? [];
      if (!datasets.length) return emptyResponse("No LINC datasets found matching the query.");

      const items = datasets.map((ds) => ({
        datasetId: ds.datasetid ?? null,
        title: ds.metas?.title ?? null,
        description: ds.metas?.description ?? null,
        keywords: ds.metas?.keyword ?? null,
        recordCount: ds.metas?.records_count ?? null,
      }));

      return listResponse(
        `${data.nhits ?? datasets.length} LINC dataset(s) found`,
        { items, total: data.nhits ?? datasets.length },
      );
    },
  },

  {
    name: "nc_linc_query",
    description:
      "Query a specific NC LINC dataset with optional filters.\n" +
      "Use nc_linc_search first to find dataset IDs.\n" +
      "Common datasets: 'employment-and-income-linc', 'census-population-and-housing-linc', 'vehicle-registration', 'government', 'nc-transportation-linc'.",
    annotations: { title: "NC LINC: Query Dataset", readOnlyHint: true },
    parameters: z.object({
      dataset_id: z.string().describe("Dataset identifier from nc_linc_search results (e.g. 'employment-and-income-linc')"),
      where: z.string().optional().describe("SQL-style filter expression (e.g. \"county='Wake'\", \"year>2020\")"),
      limit: z.number().int().max(100).optional().describe("Max records to return (default 20, max 100)"),
      offset: z.number().int().optional().describe("Offset for pagination (default 0)"),
    }),
    execute: async (args) => {
      const data = await queryDataset({
        datasetId: args.dataset_id,
        where: args.where,
        limit: args.limit,
        offset: args.offset,
      });
      const records = data.records ?? [];
      if (!records.length) return emptyResponse("No records found for the specified dataset and filters.");

      const rows = records.map((r) => r.fields ?? {});
      return tableResponse(
        `${data.nhits ?? records.length} record(s) in dataset '${args.dataset_id}'`,
        { rows, total: data.nhits ?? records.length },
      );
    },
  },
];
