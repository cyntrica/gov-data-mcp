/**
 * usgs module metadata.
 */

import { WATER_PARAMS, ALERT_LEVELS, type EarthquakeFeature } from "./sdk.js";
// ─── Metadata ────────────────────────────────────────────────────────

export const name = "usgs";
export const displayName = "USGS (U.S. Geological Survey)";
export const category = "Environment";
export const description =
  "Earthquake events (magnitude, location, depth, tsunami risk) and water resources monitoring (streamflow, water levels, temperature) from 13,000+ stations nationwide. No API key required.";
export const workflow =
  "Use usgs_earthquakes to search for earthquakes by magnitude/location/date → usgs_significant for recent notable events → usgs_water_data for streamflow and water levels at monitoring sites → usgs_water_sites to find stations.";
export const tips =
  "Earthquake magnitudes: 2.5+ felt by people, 4.0+ moderate, 5.0+ significant, 7.0+ major. Water parameter codes: 00060=discharge, 00065=gage height, 00010=water temp. Use state codes (CA, TX) for water site searches.";

export const reference = {
  waterParams: WATER_PARAMS,
  alertLevels: ALERT_LEVELS,
  docs: {
    "Earthquake API": "https://earthquake.usgs.gov/fdsnws/event/1/",
    "Water Services": "https://waterservices.usgs.gov/",
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────

function earthquakeToRecord(f: EarthquakeFeature): Record<string, unknown> {
  const p = f.properties;
  const [lon, lat, depth] = f.geometry.coordinates;
  const record: Record<string, unknown> = {
    magnitude: p.mag ?? null,
    place: p.place ?? null,
    time: p.time ? new Date(p.time).toISOString() : null,
    depth: depth ?? null,
    latitude: lat ?? null,
    longitude: lon ?? null,
  };
  if (p.alert) record.alert = p.alert;
  if (p.tsunami === 1) record.tsunami = true;
  if (p.felt) record.felt = p.felt;
  if (p.url) record.url = p.url;
  return record;
}

// ─── Tools ───────────────────────────────────────────────────────────

