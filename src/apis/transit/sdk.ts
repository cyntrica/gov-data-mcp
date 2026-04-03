/**
 * Unified Transit SDK — dispatches to individual transit system SDKs.
 *
 * This module consolidates 12 transit systems into a single interface.
 * Each system's SDK is lazily imported to avoid loading all 12 at startup.
 */

export interface TransitSystem {
  id: string;
  name: string;
  region: string;
  capabilities: string[];
  authRequired: boolean;
  authEnvVar?: string;
}

export const TRANSIT_SYSTEMS: TransitSystem[] = [
  { id: "bart", name: "BART", region: "San Francisco Bay Area, CA", capabilities: ["arrivals", "stations", "alerts"], authRequired: true, authEnvVar: "BART_API_KEY" },
  { id: "mbta", name: "MBTA", region: "Boston, MA", capabilities: ["arrivals", "vehicles", "alerts", "routes"], authRequired: true, authEnvVar: "MBTA_API_KEY" },
  { id: "septa", name: "SEPTA", region: "Philadelphia, PA", capabilities: ["arrivals", "vehicles", "alerts"], authRequired: false },
  { id: "cta", name: "CTA", region: "Chicago, IL", capabilities: ["arrivals"], authRequired: true, authEnvVar: "CTA_API_KEY" },
  { id: "la-metro", name: "LA Metro", region: "Los Angeles, CA", capabilities: ["vehicles", "routes"], authRequired: false },
  { id: "trimet", name: "TriMet", region: "Portland, OR", capabilities: ["arrivals"], authRequired: true, authEnvVar: "TRIMET_APP_ID" },
  { id: "onebusaway", name: "OneBusAway", region: "Seattle/Puget Sound, WA", capabilities: ["arrivals", "routes"], authRequired: true, authEnvVar: "OBA_API_KEY" },
  { id: "wsdot-ferries", name: "WSDOT Ferries", region: "Washington State", capabilities: ["schedule", "vessels", "terminals"], authRequired: true, authEnvVar: "WSDOT_ACCESS_CODE" },
  { id: "marta", name: "MARTA", region: "Atlanta, GA", capabilities: ["arrivals"], authRequired: true, authEnvVar: "MARTA_API_KEY" },
  { id: "path-train", name: "PATH", region: "NYC/NJ", capabilities: ["arrivals"], authRequired: false },
  { id: "wmata", name: "WMATA", region: "Washington DC/MD/VA", capabilities: ["arrivals", "vehicles", "alerts"], authRequired: true, authEnvVar: "WMATA_API_KEY" },
  { id: "md-transit", name: "Maryland MTA", region: "Baltimore, MD", capabilities: ["feeds", "vehicles"], authRequired: true, authEnvVar: "SWIFTLY_API_KEY" },
];

/** Get arrivals/predictions for a transit system. Returns raw API response. */
export async function getArrivals(systemId: string, stationOrStop?: string): Promise<unknown> {
  switch (systemId) {
    case "bart": {
      const { getDepartures } = await import("../bart/sdk.js");
      return getDepartures({ station: stationOrStop ?? "ALL" });
    }
    case "mbta": {
      const { getPredictions } = await import("../mbta/sdk.js");
      return getPredictions({ stop: stationOrStop });
    }
    case "septa": {
      const { getTrainView } = await import("../septa/sdk.js");
      return { trains: await getTrainView() };
    }
    case "cta": {
      const { getTrainArrivals } = await import("../cta/sdk.js");
      return getTrainArrivals({ stationId: stationOrStop ?? "" });
    }
    case "trimet": {
      const { getArrivals: triArrivals } = await import("../trimet/sdk.js");
      return { arrivals: await triArrivals({ stopId: stationOrStop ?? "" }) };
    }
    case "onebusaway": {
      const { getArrivals: obaArrivals } = await import("../onebusaway/sdk.js");
      return { arrivals: await obaArrivals({ stopId: stationOrStop ?? "" }) };
    }
    case "marta": {
      const { getTrainArrivals } = await import("../marta/sdk.js");
      return { trains: await getTrainArrivals() };
    }
    case "path-train": {
      const { getArrivals: pathArrivals } = await import("../path-train/sdk.js");
      return { stations: await pathArrivals() };
    }
    case "wmata": {
      const { getTrainPredictions } = await import("../wmata/sdk.js");
      return getTrainPredictions(stationOrStop);
    }
    case "wsdot-ferries": {
      const { getVesselLocations } = await import("../wsdot-ferries/sdk.js");
      return { vessels: await getVesselLocations() };
    }
    case "la-metro": {
      const { getVehicles } = await import("../la-metro/sdk.js");
      return { vehicles: await getVehicles() };
    }
    case "md-transit": {
      const { getGTFSFeeds } = await import("../md-transit/sdk.js");
      return { feeds: getGTFSFeeds() };
    }
    default:
      throw new Error(`Unknown transit system: ${systemId}. Use transit_systems to list available systems.`);
  }
}

/** Get service alerts/incidents for a transit system. */
export async function getAlerts(systemId: string): Promise<unknown> {
  switch (systemId) {
    case "bart": {
      const { getAdvisories } = await import("../bart/sdk.js");
      return getAdvisories();
    }
    case "mbta": {
      const { getAlerts: mbAlerts } = await import("../mbta/sdk.js");
      return mbAlerts({});
    }
    case "septa": {
      const { getAlerts: sepAlerts } = await import("../septa/sdk.js");
      return { alerts: await sepAlerts() };
    }
    case "wmata": {
      const { getRailIncidents, getBusIncidents } = await import("../wmata/sdk.js");
      const [rail, bus] = await Promise.all([getRailIncidents(), getBusIncidents()]);
      return { rail, bus };
    }
    default:
      return { message: `${systemId} does not have an alerts endpoint. Use transit_arrivals instead.` };
  }
}

export function clearCache(): void {
  // Individual module caches are cleared by their own clearCache functions
}
