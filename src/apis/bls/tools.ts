/**
 * bls MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import {
  getSeriesData,
  searchPopularSeries,
  getStateEmploymentSeries,
  getAvailableTopics,
  cpiSeries,
  industrySeries,
  type BlsSeries,
} from "./sdk.js";
import { tableResponse, listResponse, emptyResponse } from "../../shared/response.js";

function summarizeSeriesData(s: BlsSeries) {
  const obs = s.data.map(d => ({
    period: `${d.year}-${d.period}`,
    periodName: d.periodName,
    year: Number(d.year),
    value: Number(d.value) || null,
    pctChange12Mo: d.calculations?.pct_changes?.["12"] ? Number(d.calculations.pct_changes["12"]) : null,
  }));
  return {
    seriesId: s.seriesID,
    observations: s.data.length,
    data: obs,
  };
}

function computeYoy(s: BlsSeries, labels: Record<string, string>) {
  const label = labels[s.seriesID] ?? s.seriesID;
  const latest = s.data[0];
  if (!latest) return { seriesId: s.seriesID, label, value: null, period: null, year: null, yoyPercent: null };

  const yearAgo = s.data.find(
    d => d.period === latest.period && d.year === String(Number(latest.year) - 1),
  );
  let yoy: number | null = null;
  if (yearAgo) {
    yoy = Number(((Number(latest.value) - Number(yearAgo.value)) / Number(yearAgo.value) * 100).toFixed(1));
  } else if (latest.calculations?.pct_changes?.["12"]) {
    yoy = Number(latest.calculations.pct_changes["12"]);
  }

  return {
    seriesId: s.seriesID,
    label,
    value: Number(latest.value) || null,
    period: `${latest.year}-${latest.period}`,
    periodName: latest.periodName ?? null,
    year: Number(latest.year),
    yoyPercent: yoy,
  };
}

function computeEmploymentYoy(s: BlsSeries, labels: Record<string, string>) {
  const label = labels[s.seriesID] ?? s.seriesID;
  const latest = s.data[0];
  if (!latest) return { seriesId: s.seriesID, label, valueThousands: null, period: null, year: null, yoyChangeThousands: null };

  const yearAgo = s.data.find(
    d => d.period === latest.period && d.year === String(Number(latest.year) - 1),
  );
  let yoyDiff: number | null = null;
  if (latest && yearAgo) {
    yoyDiff = Number((Number(latest.value) - Number(yearAgo.value)).toFixed(0));
  }

  return {
    seriesId: s.seriesID,
    label,
    valueThousands: Number(latest.value) || null,
    period: `${latest.year}-${latest.period}`,
    periodName: latest.periodName ?? null,
    year: Number(latest.year),
    yoyChangeThousands: yoyDiff,
  };
}

export const tools: Tool<any, any>[] = [
  {
    name: "bls_series_data",
    description:
      "Fetch time series data from the Bureau of Labor Statistics. " +
      "Returns monthly/quarterly/annual observations for employment, wages, prices, and more.\n\n" +
      "Popular series IDs:\n" +
      "- CES0000000001: Total nonfarm employment (thousands)\n" +
      "- LNS14000000: Unemployment rate\n" +
      "- CUUR0000SA0: CPI-U All Items\n" +
      "- CES0500000003: Average hourly earnings, total private\n" +
      "- JTS000000000000000JOR: Job openings rate (JOLTS)\n" +
      "- PRS85006092: Nonfarm business labor productivity\n\n" +
      "Series ID prefixes: CES (jobs by industry), LNS (unemployment), CU (CPI), WP (PPI), OE (wages), JT (JOLTS)",
    annotations: { title: "BLS: Get Series Data", readOnlyHint: true },
    parameters: z.object({
      series_ids: z.string().describe(
        "Comma-separated BLS series IDs (max 50). Example: 'CES0000000001,LNS14000000,CUUR0000SA0'",
      ),
      start_year: z.number().int().optional().describe("Start year (default: 3 years ago). Max 20 year range with API key, 10 without."),
      end_year: z.number().int().optional().describe("End year (default: current year)"),
    }),
    execute: async ({ series_ids, start_year, end_year }) => {
      const ids = series_ids.split(",").map((s: string) => s.trim()).filter(Boolean);
      if (!ids.length) return emptyResponse("No series IDs provided.");

      const defaultStart = new Date().getFullYear() - 3;
      const data = await getSeriesData(ids, {
        startYear: start_year ?? defaultStart,
        endYear: end_year ?? new Date().getFullYear(),
      });

      const series = data.Results?.series ?? [];
      if (!series.length) return emptyResponse("No data returned from BLS.");

      const messages = data.message?.length ? data.message.join("; ") : null;
      // Each series becomes a separate table with period+value columns
      const allObs = series.flatMap(s =>
        s.data.map(d => ({
          seriesId: s.seriesID,
          period: `${d.year}-${d.period}`,
          periodName: d.periodName,
          year: Number(d.year),
          value: Number(d.value) || null,
          pctChange12Mo: d.calculations?.pct_changes?.["12"] ? Number(d.calculations.pct_changes["12"]) : null,
        }))
      );
      return tableResponse(
        `BLS data: ${series.length} series returned${messages ? ` (${messages})` : ""}`,
        {
          rows: allObs,
          columns: ["seriesId", "period", "periodName", "year", "value", "pctChange12Mo"],
          meta: messages ? { notes: messages } : undefined,
        },
      );
    },
  },

  {
    name: "bls_search_series",
    description:
      "Look up popular BLS series IDs by topic. BLS doesn't have a search API, " +
      "so this provides curated series IDs for common topics.\n\n" +
      "Topics: employment, unemployment, wages, cpi, cpi_components, ppi, productivity, jolts, state_employment",
    annotations: { title: "BLS: Popular Series Lookup", readOnlyHint: true },
    parameters: z.object({
      topic: z.string().describe(
        "Topic to look up: 'employment', 'unemployment', 'wages', 'cpi', " +
        "'cpi_components', 'ppi', 'productivity', 'jolts', 'state_employment'",
      ),
      state: z.string().optional().describe("Two-letter state code for state-level data (e.g., 'CA', 'TX')"),
    }),
    execute: async ({ topic, state }) => {
      // State employment uses LAUS codes
      if (topic === "state_employment" && state) {
        const series = getStateEmploymentSeries(state);
        if (!series) return emptyResponse(`Unknown state code: ${state}`);
        return listResponse(
          `BLS state employment series for ${state.toUpperCase()}: ${series.length} series. Use these IDs with bls_series_data.`,
          { items: series },
        );
      }

      const series = searchPopularSeries(topic);
      if (!series.length) {
        const available = getAvailableTopics();
        return emptyResponse(`Unknown topic: "${topic}". Available: ${available.join(", ")}`);
      }

      return listResponse(
        `BLS series for "${topic}": ${series.length} series. Use these IDs with bls_series_data.`,
        { items: series },
      );
    },
  },

  {
    name: "bls_cpi_breakdown",
    description:
      "Get a breakdown of Consumer Price Index by component — food, shelter, energy, " +
      "medical care, transportation, etc. Shows which categories are driving inflation.",
    annotations: { title: "BLS: CPI Inflation Breakdown", readOnlyHint: true },
    parameters: z.object({
      start_year: z.number().int().optional().describe("Start year (default: 2 years ago)"),
      end_year: z.number().int().optional().describe("End year (default: current year)"),
    }),
    execute: async ({ start_year, end_year }) => {
      const defaultStart = new Date().getFullYear() - 2;
      const data = await getSeriesData(Object.keys(cpiSeries), {
        startYear: start_year ?? defaultStart,
        endYear: end_year ?? new Date().getFullYear(),
      });

      const series = data.Results?.series;
      if (!series?.length) return emptyResponse("No CPI data returned.");

      const components = series.map(s => computeYoy(s, cpiSeries as Record<string, string>));
      return tableResponse(
        `CPI inflation breakdown: ${components.length} components with latest values and YoY change`,
        {
          rows: components,
          columns: ["seriesId", "label", "value", "period", "periodName", "year", "yoyPercent"],
        },
      );
    },
  },

  {
    name: "bls_employment_by_industry",
    description:
      "Get employment numbers broken down by major industry sector. " +
      "Shows which sectors are growing or shrinking.",
    annotations: { title: "BLS: Employment by Industry", readOnlyHint: true },
    parameters: z.object({
      start_year: z.number().int().optional().describe("Start year (default: 3 years ago)"),
      end_year: z.number().int().optional().describe("End year (default: current year)"),
    }),
    execute: async ({ start_year, end_year }) => {
      const defaultStart = new Date().getFullYear() - 3;
      const data = await getSeriesData(Object.keys(industrySeries), {
        startYear: start_year ?? defaultStart,
        endYear: end_year ?? new Date().getFullYear(),
      });

      const series = data.Results?.series;
      if (!series?.length) return emptyResponse("No employment data returned.");

      const industries = series.map(s => computeEmploymentYoy(s, industrySeries as Record<string, string>));
      return tableResponse(
        `Employment by industry: ${industries.length} sectors with latest values (thousands) and YoY change`,
        {
          rows: industries,
          columns: ["seriesId", "label", "valueThousands", "period", "periodName", "year", "yoyChangeThousands"],
        },
      );
    },
  },
];
