/**
 * National Park Service SDK — parks, alerts, campgrounds, events.
 *
 * API docs: https://www.nps.gov/subjects/developer/api-documentation.htm
 * Requires NPS_API_KEY from https://www.nps.gov/subjects/developer/get-started.htm
 *
 * Usage:
 *   import { searchParks, getAlerts, searchCampgrounds, getEvents } from "us-gov-open-data-mcp/sdk/nps";
 *   const parks = await searchParks({ stateCode: "CA" });
 *   const alerts = await getAlerts({ parkCode: "yose" });
 */

import { createClient, qp } from "../../shared/client.js";

const api = createClient({
  baseUrl: "https://developer.nps.gov/api/v1",
  name: "nps",
  auth: {
    type: "header",
    envParams: { "X-Api-Key": "NPS_API_KEY" },
  },
  cacheTtlMs: 30 * 60 * 1000, // 30 min — park data changes moderately
  rateLimit: { perSecond: 5, burst: 10 },
});

// ─── Types ───────────────────────────────────────────────────────────

export interface Park {
  parkCode: string;
  fullName: string;
  description: string;
  states: string;
  designation: string;
  url: string;
  latitude: string;
  longitude: string;
  directionsInfo: string;
  weatherInfo: string;
}

export interface ParkAlert {
  id: string;
  parkCode: string;
  title: string;
  description: string;
  category: string;
  url: string;
  lastIndexedDate: string;
}

export interface Campground {
  id: string;
  parkCode: string;
  name: string;
  description: string;
  reservationInfo: string;
  regulationsOverview: string;
  numberOfSitesReservable: string;
  numberOfSitesFirstComeFirstServe: string;
  latitude: string;
  longitude: string;
}

export interface ParkEvent {
  id: string;
  parkCode: string;
  title: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  location: string;
  category: string;
  isRegResRequired: string;
  contactName: string;
  contactEmailAddress: string;
}

interface NpsResponse<T> {
  total: string;
  data: T[];
  limit: string;
  start: string;
}

// ─── Public API ──────────────────────────────────────────────────────

/** Search national parks by state, name, or keyword. */
export async function searchParks(opts?: {
  stateCode?: string;
  q?: string;
  parkCode?: string;
  limit?: number;
  start?: number;
}): Promise<{ total: number; parks: Park[] }> {
  const params = qp({
    stateCode: opts?.stateCode,
    q: opts?.q,
    parkCode: opts?.parkCode,
    limit: opts?.limit ?? 25,
    start: opts?.start,
  });
  const data = await api.get<NpsResponse<any>>("/parks", params);
  return {
    total: parseInt(data.total, 10) || 0,
    parks: (data.data ?? []).map((p: any) => ({
      parkCode: p.parkCode ?? "",
      fullName: p.fullName ?? "",
      description: p.description ?? "",
      states: p.states ?? "",
      designation: p.designation ?? "",
      url: p.url ?? "",
      latitude: p.latitude ?? "",
      longitude: p.longitude ?? "",
      directionsInfo: p.directionsInfo ?? "",
      weatherInfo: p.weatherInfo ?? "",
    })),
  };
}

/** Get current park alerts (closures, dangers, cautions, info). */
export async function getAlerts(opts?: {
  parkCode?: string;
  limit?: number;
  start?: number;
}): Promise<{ total: number; alerts: ParkAlert[] }> {
  const params = qp({
    parkCode: opts?.parkCode,
    limit: opts?.limit ?? 25,
    start: opts?.start,
  });
  const data = await api.get<NpsResponse<any>>("/alerts", params);
  return {
    total: parseInt(data.total, 10) || 0,
    alerts: (data.data ?? []).map((a: any) => ({
      id: a.id ?? "",
      parkCode: a.parkCode ?? "",
      title: a.title ?? "",
      description: a.description ?? "",
      category: a.category ?? "",
      url: a.url ?? "",
      lastIndexedDate: a.lastIndexedDate ?? "",
    })),
  };
}

/** Search campgrounds in national parks. */
export async function searchCampgrounds(opts?: {
  parkCode?: string;
  stateCode?: string;
  q?: string;
  limit?: number;
  start?: number;
}): Promise<{ total: number; campgrounds: Campground[] }> {
  const params = qp({
    parkCode: opts?.parkCode,
    stateCode: opts?.stateCode,
    q: opts?.q,
    limit: opts?.limit ?? 25,
    start: opts?.start,
  });
  const data = await api.get<NpsResponse<any>>("/campgrounds", params);
  return {
    total: parseInt(data.total, 10) || 0,
    campgrounds: (data.data ?? []).map((c: any) => ({
      id: c.id ?? "",
      parkCode: c.parkCode ?? "",
      name: c.name ?? "",
      description: c.description ?? "",
      reservationInfo: c.reservationInfo ?? "",
      regulationsOverview: c.regulationsOverview ?? "",
      numberOfSitesReservable: c.numberOfSitesReservable ?? "",
      numberOfSitesFirstComeFirstServe: c.numberOfSitesFirstComeFirstServe ?? "",
      latitude: c.latitude ?? "",
      longitude: c.longitude ?? "",
    })),
  };
}

/** Get upcoming events at national parks. */
export async function getEvents(opts?: {
  parkCode?: string;
  limit?: number;
  start?: number;
}): Promise<{ total: number; events: ParkEvent[] }> {
  const params = qp({
    parkCode: opts?.parkCode,
    limit: opts?.limit ?? 25,
    start: opts?.start,
  });
  const data = await api.get<NpsResponse<any>>("/events", params);
  return {
    total: parseInt(data.total, 10) || 0,
    events: (data.data ?? []).map((e: any) => ({
      id: e.id ?? "",
      parkCode: e.parkCode ?? "",
      title: e.title ?? "",
      description: e.description ?? "",
      dateStart: e.dateStart ?? e.datestart ?? "",
      dateEnd: e.dateEnd ?? e.dateend ?? "",
      location: e.location ?? "",
      category: e.category ?? "",
      isRegResRequired: e.isRegResRequired ?? "",
      contactName: e.contactName ?? "",
      contactEmailAddress: e.contactEmailAddress ?? "",
    })),
  };
}

/** Clear cache. */
export function clearCache(): void { api.clearCache(); }
