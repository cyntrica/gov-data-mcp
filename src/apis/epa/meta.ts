/**
 * epa module metadata.
 */

import { AIR_TABLES, UV_INDEX_SCALE } from "./sdk.js";
export const name = "epa";
export const displayName = "EPA (Environmental Protection Agency)";
export const category = "Environment";
export const description = "Air quality data, facility environmental compliance/violations, UV index forecasts";
export const workflow = "epa_air_quality for pollution data → epa_facilities for compliance violations → epa_uv for UV forecasts";
export const tips = "Air quality tables: AIR_QUALITY_MEASURES (county-level AQI), MONITORING_SITE (station locations). UV index: 0-2 Low, 3-5 Moderate, 6-7 High, 8-10 Very High, 11+ Extreme.";

export const reference = {
  airTables: AIR_TABLES,
  uvScale: UV_INDEX_SCALE,
  docs: {
    "Envirofacts": "https://enviro.epa.gov/",
    "ECHO": "https://echo.epa.gov/",
    "Air Quality System": "https://www.epa.gov/aqs",
  },
};

