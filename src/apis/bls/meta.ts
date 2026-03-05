/**
 * bls module metadata.
 */

import { type BlsSeries } from "./sdk.js";
// ─── Metadata (server.ts reads these) ────────────────────────────────

export const name = "bls";
export const displayName = "Bureau of Labor Statistics";
export const category = "Economic";
export const description = "Employment, wages, CPI components, PPI, JOLTS, labor productivity";
export const auth = { envVar: "BLS_API_KEY", required: false, signup: "https://www.bls.gov/developers/home.htm" };
export const workflow = "bls_search_series to find series IDs → bls_series_data to fetch values";
export const tips = "Key advantage over FRED: granular breakdowns (CPI by food/shelter/gas/medical, employment by industry, wages by sector). API key optional but recommended (25 req/day without, 500 with).";

export const reference = {
  seriesPrefixes: {
    CES: "Current Employment Statistics (jobs by industry)",
    LNS: "Labor Force Statistics, seasonally adjusted",
    CU: "Consumer Price Index (CPI-U, urban consumers)",
    WP: "Producer Price Index (PPI)",
    OE: "Occupational Employment and Wages",
    JT: "Job Openings and Labor Turnover (JOLTS)",
    LA: "Local Area Unemployment Statistics",
    SM: "State and Metro Employment",
    PR: "Productivity and Costs",
  } as Record<string, string>,
  popularSeries: {
    CES0000000001: "Total nonfarm employment (thousands)",
    LNS14000000: "Unemployment rate",
    "CUUR0000SA0": "CPI-U All Items",
    CES0500000003: "Average hourly earnings",
    JTS000000000000000JOR: "Job openings rate (JOLTS)",
    PRS85006092: "Nonfarm business labor productivity",
  } as Record<string, string>,
  docs: {
    "API v2": "https://www.bls.gov/developers/api_signature_v2.htm",
    "Series Formats": "https://www.bls.gov/help/hlpforma.htm",
    "Registration": "https://www.bls.gov/developers/home.htm",
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────

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
    valueThousands: Number(latest.value) || null,
    period: `${latest.year}-${latest.period}`,
    periodName: latest.periodName ?? null,
    year: Number(latest.year),
    yoyChangeThousands: yoyDiff,
  };
}

// ─── Tools ───────────────────────────────────────────────────────────

