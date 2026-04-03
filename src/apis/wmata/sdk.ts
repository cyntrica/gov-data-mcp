import { createClient } from "../../shared/client.js";

const api = createClient({
  baseUrl: "https://api.wmata.com",
  name: "wmata",
  auth: {
    type: "header",
    envParams: { api_key: "WMATA_API_KEY" },
  },
  rateLimit: { perSecond: 5, burst: 10 },
  cacheTtlMs: 30 * 1000, // 30 seconds — real-time data
});

export type WmataRecord = Record<string, unknown>;

/** Get next train arrival predictions for a station (or "All" for all stations). */
export async function getTrainPredictions(stationCode?: string): Promise<WmataRecord> {
  const code = stationCode ?? "All";
  return api.get<WmataRecord>(`/StationPrediction.svc/json/GetPrediction/${code}`);
}

/** Get real-time train positions on all lines. */
export async function getTrainPositions(): Promise<WmataRecord> {
  return api.get<WmataRecord>("/TrainPositions/TrainPositions", { contentType: "json" });
}

/** Get rail service incidents (delays, disruptions). */
export async function getRailIncidents(): Promise<WmataRecord> {
  return api.get<WmataRecord>("/Incidents.svc/json/Incidents");
}

/** Get bus incidents. */
export async function getBusIncidents(): Promise<WmataRecord> {
  return api.get<WmataRecord>("/Incidents.svc/json/BusIncidents");
}

/** Get elevator/escalator outages. */
export async function getElevatorIncidents(): Promise<WmataRecord> {
  return api.get<WmataRecord>("/Incidents.svc/json/ElevatorIncidents");
}

/** Get next bus arrival predictions for a stop. */
export async function getBusPredictions(stopId: string): Promise<WmataRecord> {
  return api.get<WmataRecord>("/NextBusService.svc/json/jPredictions", { StopID: stopId });
}

export function clearCache() { api.clearCache(); }
