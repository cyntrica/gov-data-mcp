/**
 * Urban Institute Education Data Explorer MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { querySchools, queryDistricts, queryColleges } from "./sdk.js";
import { tableResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "urban_ed_schools",
    description:
      "Query school-level enrollment data from the CCD (Common Core of Data).\nCovers all public schools in the US.",
    annotations: { title: "Urban Ed: Schools", readOnlyHint: true },
    parameters: z.object({
      year: z.number().int().describe("School year (e.g. 2022)"),
      stateFips: z.number().int().optional().describe("2-digit state FIPS code (e.g. 6 for CA, 36 for NY)"),
      grade: z.number().int().optional().describe("Grade level (-1=PK, 0=K, 1-12)"),
      limit: z.number().int().max(500).optional().describe("Max results (default 50)"),
      offset: z.number().int().optional().describe("Pagination offset (default 0)"),
    }),
    execute: async (opts) => {
      const data = await querySchools(opts);
      if (!data.results?.length) return emptyResponse(`No school enrollment data found for year ${opts.year}.`);
      return tableResponse(
        `Urban Ed Schools: ${data.count} total, showing ${data.results.length}`,
        { rows: data.results, total: data.count },
      );
    },
  },

  {
    name: "urban_ed_districts",
    description:
      "Query district-level enrollment data from the CCD.\nCovers all public school districts in the US.",
    annotations: { title: "Urban Ed: Districts", readOnlyHint: true },
    parameters: z.object({
      year: z.number().int().describe("School year (e.g. 2022)"),
      stateFips: z.number().int().optional().describe("2-digit state FIPS code (e.g. 6 for CA, 36 for NY)"),
      limit: z.number().int().max(500).optional().describe("Max results (default 50)"),
      offset: z.number().int().optional().describe("Pagination offset (default 0)"),
    }),
    execute: async (opts) => {
      const data = await queryDistricts(opts);
      if (!data.results?.length) return emptyResponse(`No district enrollment data found for year ${opts.year}.`);
      return tableResponse(
        `Urban Ed Districts: ${data.count} total, showing ${data.results.length}`,
        { rows: data.results, total: data.count },
      );
    },
  },

  {
    name: "urban_ed_colleges",
    description:
      "Query college/university enrollment data (FTE) from IPEDS.\nCovers all Title IV postsecondary institutions.",
    annotations: { title: "Urban Ed: Colleges", readOnlyHint: true },
    parameters: z.object({
      year: z.number().int().describe("Academic year (e.g. 2022)"),
      stateFips: z.number().int().optional().describe("2-digit state FIPS code (e.g. 6 for CA, 36 for NY)"),
      limit: z.number().int().max(500).optional().describe("Max results (default 50)"),
      offset: z.number().int().optional().describe("Pagination offset (default 0)"),
    }),
    execute: async (opts) => {
      const data = await queryColleges(opts);
      if (!data.results?.length) return emptyResponse(`No college enrollment data found for year ${opts.year}.`);
      return tableResponse(
        `Urban Ed Colleges: ${data.count} total, showing ${data.results.length}`,
        { rows: data.results, total: data.count },
      );
    },
  },
];
