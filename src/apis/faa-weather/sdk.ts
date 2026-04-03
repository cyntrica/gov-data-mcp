/**
 * FAA Aviation Weather SDK — METARs, TAFs, SIGMETs, PIREPs.
 *
 * API docs: https://aviationweather.gov/data/api/
 * No API key required.
 *
 * Usage:
 *   import { getMetar, getTaf, getSigmet, getPirep } from "us-gov-open-data-mcp/sdk/faa-weather";
 *   const metar = await getMetar({ ids: "KJFK" });
 *   const taf = await getTaf({ ids: "KJFK,KLAX" });
 */

import { createClient, qp } from "../../shared/client.js";

const api = createClient({
  baseUrl: "https://aviationweather.gov/api/data",
  name: "faa-weather",
  cacheTtlMs: 5 * 60 * 1000, // 5 min — weather changes frequently
  rateLimit: { perSecond: 5, burst: 10 },
});

// ─── Types ───────────────────────────────────────────────────────────

export interface Metar {
  rawOb: string;
  station: string;
  obsTime: string;
  temp: number | null;
  dewp: number | null;
  wdir: number | null;
  wspd: number | null;
  wgst: number | null;
  visib: number | null;
  altim: number | null;
  fltcat: string;
  wxString: string;
  clouds: any[];
}

export interface Taf {
  rawTAF: string;
  station: string;
  issueTime: string;
  validTimeFrom: string;
  validTimeTo: string;
  fcsts: any[];
}

export interface Sigmet {
  airSigmetId: string;
  icaoId: string;
  hazard: string;
  severity: string;
  validTimeFrom: string;
  validTimeTo: string;
  rawAirSigmet: string;
  altitudeLow: number | null;
  altitudeHigh: number | null;
}

export interface Pirep {
  rawOb: string;
  station: string;
  obsTime: string;
  fltlvl: number | null;
  acType: string;
  wxString: string;
  turb: string;
  ice: string;
}

// ─── Public API ──────────────────────────────────────────────────────

/** Get METAR weather observations for airports. */
export async function getMetar(opts: {
  ids: string;
  hours?: number;
}): Promise<Metar[]> {
  const params = qp({
    ids: opts.ids,
    format: "json",
    hours: opts.hours,
  });
  const data = await api.get<any>("/metar", params);
  const items = Array.isArray(data) ? data : data?.data ?? [];
  return items.map((m: any) => ({
    rawOb: m.rawOb ?? m.rawMETAR ?? "",
    station: m.icaoId ?? m.station ?? "",
    obsTime: m.obsTime ?? m.reportTime ?? "",
    temp: m.temp ?? null,
    dewp: m.dewp ?? null,
    wdir: m.wdir ?? null,
    wspd: m.wspd ?? null,
    wgst: m.wgst ?? null,
    visib: m.visib ?? null,
    altim: m.altim ?? null,
    fltcat: m.fltcat ?? "",
    wxString: m.wxString ?? "",
    clouds: m.clouds ?? [],
  }));
}

/** Get TAF forecasts for airports. */
export async function getTaf(opts: {
  ids: string;
}): Promise<Taf[]> {
  const params = qp({
    ids: opts.ids,
    format: "json",
  });
  const data = await api.get<any>("/taf", params);
  const items = Array.isArray(data) ? data : data?.data ?? [];
  return items.map((t: any) => ({
    rawTAF: t.rawTAF ?? t.rawOb ?? "",
    station: t.icaoId ?? t.station ?? "",
    issueTime: t.issueTime ?? "",
    validTimeFrom: t.validTimeFrom ?? "",
    validTimeTo: t.validTimeTo ?? "",
    fcsts: t.fcsts ?? t.forecast ?? [],
  }));
}

/** Get active SIGMETs (significant weather advisories). */
export async function getSigmet(): Promise<Sigmet[]> {
  const params = qp({ format: "json" });
  const data = await api.get<any>("/sigmet", params);
  const items = Array.isArray(data) ? data : data?.data ?? [];
  return items.map((s: any) => ({
    airSigmetId: s.airSigmetId ?? s.id ?? "",
    icaoId: s.icaoId ?? "",
    hazard: s.hazard ?? s.phenomenon ?? "",
    severity: s.severity ?? "",
    validTimeFrom: s.validTimeFrom ?? "",
    validTimeTo: s.validTimeTo ?? "",
    rawAirSigmet: s.rawAirSigmet ?? s.rawOb ?? "",
    altitudeLow: s.altitudeLow ?? s.altLow ?? null,
    altitudeHigh: s.altitudeHi ?? s.altHigh ?? null,
  }));
}

/** Get pilot reports (PIREPs). */
export async function getPirep(opts?: {
  hours?: number;
}): Promise<Pirep[]> {
  const params = qp({
    format: "json",
    hours: opts?.hours,
  });
  const data = await api.get<any>("/pirep", params);
  const items = Array.isArray(data) ? data : data?.data ?? [];
  return items.map((p: any) => ({
    rawOb: p.rawOb ?? "",
    station: p.icaoId ?? p.station ?? "",
    obsTime: p.obsTime ?? p.reportTime ?? "",
    fltlvl: p.fltlvl ?? p.altitude ?? null,
    acType: p.acType ?? p.aircraftType ?? "",
    wxString: p.wxString ?? "",
    turb: p.turb ?? p.turbulence ?? "",
    ice: p.ice ?? p.icing ?? "",
  }));
}

/** Clear cache. */
export function clearCache(): void { api.clearCache(); }
