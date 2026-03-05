/**
 * BEA SDK — typed API client for the Bureau of Economic Analysis API.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { getNationalGdp, getGdpByState } from "us-gov-open-data/sdk/bea";
 *
 * Requires BEA_API_KEY env var. Register at https://apps.bea.gov/API/signup/
 */

import { createClient } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://apps.bea.gov/api/data",
  name: "bea",
  auth: {
    type: "query",
    key: "UserID",
    envVar: "BEA_API_KEY",
    extraParams: { ResultFormat: "JSON" },
  },
  rateLimit: { perSecond: 5, burst: 10 },
  cacheTtlMs: 60 * 60 * 1000, // 1 hour — BEA data updates monthly/quarterly
  checkError: (data) => {
    const beaapi = (data as any)?.BEAAPI;
    if (!beaapi) return null;
    if (beaapi.Error) {
      return String(beaapi.Error.APIErrorDescription ?? beaapi.Error.ErrorDetail ?? "Unknown BEA error");
    }
    if (beaapi.Results?.Error) {
      return String(beaapi.Results.Error.APIErrorDescription ?? beaapi.Results.Error.ErrorDetail ?? "Unknown BEA error");
    }
    return null;
  },
});

// ─── Types ───────────────────────────────────────────────────────────

/** Bea Data Row. */
export interface BeaDataRow {
  LineDescription?: string;
  SeriesCode?: string;
  TimePeriod?: string;
  DataValue?: string;
  GeoName?: string;
  GeoFips?: string;
  InduDesc?: string;
  Industry?: string;
  Year?: string;
  Quarter?: string;
  [key: string]: unknown;
}

/** Bea Response. */
export interface BeaResponse {
  BEAAPI: {
    Results: {
      Data: BeaDataRow[];
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
}

/** Bea National GDP Result. */
export interface BeaNationalGdpResult {
  table: string;
  frequency: string;
  dataRows: number;
  series: { description: string; observations: { period: string; value: number | null }[] }[];
}

/** Bea State GDP Result. */
export interface BeaStateGdpResult {
  year?: string;
  unit: string;
  states?: { name: string; gdpMillions: number }[];
  geoFips?: string;
  series?: { name: string; observations: { year: string; gdpMillions: number | null }[] }[];
}

/** Bea Personal Income Result. */
export interface BeaPersonalIncomeResult {
  table: string;
  year: string;
  unit: string;
  states: { name: string; value: number }[];
}

/** Bea Industry GDP Result. */
export interface BeaIndustryGdpResult {
  tableId: string;
  industries: { industry: string; observations: { period: string; value: number | null }[] }[];
}

// ─── Reference data ──────────────────────────────────────────────────

/** NIPA table codes and descriptions. Use these as the `tableName` parameter in {@link getNationalGdp}. */
export const nipaTables = {
  T10101: "Real GDP and components (percent change)",
  T10106: "Nominal GDP and components",
  T10111: "GDP percent change contributions",
  T20100: "Personal income and disposition",
  T20600: "Personal income (monthly)",
  T30100: "Government receipts and expenditures",
  T30200: "Federal government receipts and expenditures",
  T30300: "State/local government receipts and expenditures",
} as const;

/** GDP by industry table IDs. Use these as the `tableId` parameter in {@link getGdpByIndustry}. */
export const gdpIndustryTables = {
  1: "Value added by industry",
  5: "Contributions to percent change in real GDP",
  6: "Value added as percentage of GDP",
  25: "Real value added by industry",
} as const;

/** BEA Regional table codes. Use these as the `tableName` parameter in {@link getGdpByState} and {@link getPersonalIncome}. */
export const regionalTables = {
  SAGDP1: "State annual GDP summary",
  SAGDP9: "Real GDP by state",
  SQGDP1: "State quarterly GDP summary",
  SAINC1: "Personal income, population, per capita income",
  SAINC3: "Per capita personal income",
  SAINC4: "Personal income by major component",
  SAINC5N: "Personal income by NAICS industry",
  SAINC30: "Economic profile",
} as const;

// ─── Helpers ─────────────────────────────────────────────────────────

function extractData(raw: unknown): BeaDataRow[] {
  const beaapi = (raw as any)?.BEAAPI;
  return beaapi?.Results?.Data ?? [];
}

// ─── Public API ──────────────────────────────────────────────────────

/** Get national GDP data from NIPA tables. */
export async function getNationalGdp(opts: {
  tableName?: string;
  frequency?: string;
  year?: string;
} = {}): Promise<BeaNationalGdpResult> {
  const tableName = opts.tableName ?? "T10101";
  const frequency = opts.frequency ?? "Q";
  const year = opts.year ?? "LAST5";

  const raw = await api.get("", {
    method: "GetData",
    DataSetName: "NIPA",
    TableName: tableName,
    Frequency: frequency,
    Year: year,
  });

  const data = extractData(raw);
  // Group by line description
  const byLine = new Map<string, { period: string; value: string }[]>();
  for (const row of data.slice(0, 200)) {
    const desc = String(row.LineDescription ?? row.SeriesCode ?? "?");
    const period = String(row.TimePeriod ?? "?");
    const value = String(row.DataValue ?? "?");
    if (!byLine.has(desc)) byLine.set(desc, []);
    byLine.get(desc)!.push({ period, value });
  }

  return {
    table: tableName,
    frequency,
    dataRows: data.length,
    series: Array.from(byLine.entries()).slice(0, 20).map(([desc, values]) => ({
      description: desc,
      observations: values.slice(0, 8).map(v => ({
        period: v.period,
        value: v.value === "(NA)" ? null : parseFloat(v.value.replace(/,/g, "")) || null,
      })),
    })),
  };
}

/** Get GDP by state from BEA Regional dataset. */
export async function getGdpByState(opts: {
  tableName?: string;
  geoFips?: string;
  lineCode?: string;
  year?: string;
} = {}): Promise<BeaStateGdpResult> {
  const tableName = opts.tableName ?? "SAGDP1";
  const geoFips = opts.geoFips ?? "STATE";
  const lineCode = opts.lineCode ?? "1";
  const year = opts.year ?? "LAST5";

  const raw = await api.get("", {
    method: "GetData",
    DataSetName: "Regional",
    TableName: tableName,
    GeoFips: geoFips,
    LineCode: lineCode,
    Year: year,
  });

  const data = extractData(raw);
  if (!data.length) return { unit: "millions of current dollars", states: [] };

  // Group by geography
  const byGeo = new Map<string, { year: string; value: string }[]>();
  for (const row of data) {
    const name = String(row.GeoName ?? "?");
    const yr = String(row.TimePeriod ?? "?");
    const value = String(row.DataValue ?? "?");
    if (!byGeo.has(name)) byGeo.set(name, []);
    byGeo.get(name)!.push({ year: yr, value });
  }

  // All states — show latest period sorted by GDP
  if (!geoFips || geoFips === "STATE") {
    const latestYear = data.reduce((max, r) => {
      const yr = String(r.TimePeriod ?? "");
      return yr > max ? yr : max;
    }, "");

    const stateRows = Array.from(byGeo.entries())
      .map(([name, values]) => {
        const latest = values.find(v => v.year === latestYear);
        return { name, gdpMillions: Number(latest?.value?.replace(/,/g, "") ?? 0) };
      })
      .filter(r => r.gdpMillions > 0)
      .sort((a, b) => b.gdpMillions - a.gdpMillions);

    return { year: latestYear, unit: "millions of current dollars", states: stateRows.slice(0, 55) };
  }

  // Single state/geo — show time series
  return {
    geoFips,
    unit: "millions of current dollars",
    series: Array.from(byGeo.entries()).map(([name, values]) => ({
      name,
      observations: values.map(v => ({
        year: v.year,
        gdpMillions: parseFloat(v.value.replace(/,/g, "")) || null,
      })),
    })),
  };
}

/** Get personal income data by state from BEA Regional dataset. */
export async function getPersonalIncome(opts: {
  tableName?: string;
  geoFips?: string;
  lineCode?: string;
  year?: string;
} = {}): Promise<BeaPersonalIncomeResult> {
  const tableName = opts.tableName ?? "SAINC1";
  const lineCode = opts.lineCode ?? "3";
  const geoFips = opts.geoFips ?? "STATE";
  const year = opts.year ?? "LAST5";

  const raw = await api.get("", {
    method: "GetData",
    DataSetName: "Regional",
    TableName: tableName,
    GeoFips: geoFips,
    LineCode: lineCode,
    Year: year,
  });

  const data = extractData(raw);
  const unitLabel = tableName === "SAINC3" ? "per capita" : "(thousands)";

  if (!data.length) return { table: tableName, year: "", unit: unitLabel, states: [] };

  const latestYear = data.reduce((max, r) => {
    const yr = String(r.TimePeriod ?? "");
    return yr > max ? yr : max;
  }, "");

  // Group by geo
  const byGeo = new Map<string, { year: string; value: string }[]>();
  for (const row of data) {
    const name = String(row.GeoName ?? "?");
    const yr = String(row.TimePeriod ?? "?");
    const value = String(row.DataValue ?? "?");
    if (!byGeo.has(name)) byGeo.set(name, []);
    byGeo.get(name)!.push({ year: yr, value });
  }

  const rows = Array.from(byGeo.entries())
    .map(([name, values]) => {
      const latest = values.find(v => v.year === latestYear);
      return { name, value: Number(latest?.value?.replace(/,/g, "") ?? 0) };
    })
    .filter(r => r.value > 0)
    .sort((a, b) => b.value - a.value);

  return { table: tableName, year: latestYear, unit: unitLabel, states: rows.slice(0, 55) };
}

/** Get GDP contribution by industry from BEA GDPbyIndustry dataset. */
export async function getGdpByIndustry(opts: {
  tableId?: string;
  frequency?: string;
  year?: string;
  industry?: string;
} = {}): Promise<BeaIndustryGdpResult> {
  const tableId = opts.tableId ?? "1";
  const frequency = opts.frequency ?? "Q";
  const defaultYears = `${new Date().getFullYear() - 2},${new Date().getFullYear() - 1},${new Date().getFullYear()}`;
  const year = opts.year ?? defaultYears;
  const industry = opts.industry ?? "ALL";

  const raw = await api.get("", {
    method: "GetData",
    DataSetName: "GDPbyIndustry",
    TableID: tableId,
    Frequency: frequency,
    Year: year,
    Industry: industry,
  });

  const data = extractData(raw);

  // Group by industry
  const byIndustry = new Map<string, { period: string; value: string }[]>();
  for (const row of data.slice(0, 300)) {
    const desc = String(row.InduDesc ?? row.Industry ?? "?");
    const period = String(row.Quarter ? `${row.Year}Q${row.Quarter}` : row.Year ?? "?");
    const value = String(row.DataValue ?? "?");
    if (!byIndustry.has(desc)) byIndustry.set(desc, []);
    byIndustry.get(desc)!.push({ period, value });
  }

  return {
    tableId,
    industries: Array.from(byIndustry.entries()).slice(0, 25).map(([desc, values]) => ({
      industry: desc,
      observations: values.slice(0, 5).map(v => ({
        period: v.period,
        value: parseFloat(v.value.replace(/,/g, "")) || null,
      })),
    })),
  };
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
}
