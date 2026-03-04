/**
 * NOAA Climate MCP module — weather, temperature, precipitation tools.
 */

import { z } from "zod";
import type { Tool, InputPrompt } from "fastmcp";
import { listDatasets, searchStations, getClimateData, searchLocations } from "../sdk/noaa.js";

// ─── Metadata ────────────────────────────────────────────────────────

export const name = "noaa";
export const displayName = "NOAA Climate Data Online";
export const description = "Weather observations, temperature, precipitation, climate normals from NOAA stations across the U.S.";
export const auth = { envVar: "NOAA_API_KEY", signup: "https://www.ncei.noaa.gov/cdo-web/token" };
export const workflow = "noaa_stations to find a station → noaa_climate_data to get observations";
export const tips = "Datasets: GHCND (daily), GSOM (monthly summary), GSOY (annual summary). Location IDs: FIPS:36 (NY), FIPS:06 (CA)";

export const reference = {
  datasets: {
    GHCND: "Global Historical Climatology Network - Daily (temp, precipitation, snow)",
    GSOM: "Global Summary of the Month",
    GSOY: "Global Summary of the Year",
    NORMAL_DLY: "Climate Normals Daily (1991–2020 averages)",
    NORMAL_MLY: "Climate Normals Monthly",
    NORMAL_ANN: "Climate Normals Annual",
  },
  commonDataTypes: {
    TMAX: "Maximum temperature (°F × 10)",
    TMIN: "Minimum temperature (°F × 10)",
    TAVG: "Average temperature (°F × 10)",
    PRCP: "Precipitation (inches × 100)",
    SNOW: "Snowfall (inches × 10)",
    SNWD: "Snow depth (inches)",
    AWND: "Average wind speed (mph × 10)",
  },
  docs: {
    "API Docs": "https://www.ncei.noaa.gov/cdo-web/webservices/v2",
    "Get Key": "https://www.ncei.noaa.gov/cdo-web/token",
    "Dataset List": "https://www.ncei.noaa.gov/cdo-web/datasets",
  },
};

// ─── Tools ───────────────────────────────────────────────────────────

export const tools: Tool<any, any>[] = [
  {
    name: "noaa_datasets",
    description: "List available NOAA climate datasets (GHCND daily, GSOM monthly, GSOY annual, normals, etc.)",
    annotations: { title: "NOAA: List Datasets", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const datasets = await listDatasets();
      return JSON.stringify({
        summary: `${datasets.length} NOAA climate datasets available`,
        datasets,
      });
    },
  },

  {
    name: "noaa_stations",
    description: "Search for NOAA weather stations by location or dataset.\nUse location IDs like FIPS:36 (New York), FIPS:06 (California), CITY:US360019 (NYC).",
    annotations: { title: "NOAA: Search Stations", readOnlyHint: true },
    parameters: z.object({
      dataset_id: z.string().optional().describe("e.g. 'GHCND', 'GSOM'"),
      location_id: z.string().optional().describe("e.g. 'FIPS:36' (NY), 'FIPS:06' (CA)"),
      limit: z.number().int().max(1000).optional().describe("Max results (default 25)"),
    }),
    execute: async ({ dataset_id, location_id, limit }) => {
      const stations = await searchStations({
        datasetId: dataset_id, locationId: location_id, limit,
      });
      return JSON.stringify({
        summary: `${stations.length} stations found`,
        stations: stations.slice(0, 50),
      });
    },
  },

  {
    name: "noaa_climate_data",
    description: "Get climate observations (temperature, precipitation, snow, wind) from NOAA.\nRequires dataset ID + date range. Optionally filter by station or location.",
    annotations: { title: "NOAA: Climate Data", readOnlyHint: true },
    parameters: z.object({
      dataset_id: z.enum(["GHCND", "GSOM", "GSOY"]).describe("Dataset: GHCND=daily, GSOM=monthly, GSOY=annual"),
      start_date: z.string().describe("Start date YYYY-MM-DD"),
      end_date: z.string().describe("End date YYYY-MM-DD"),
      station_id: z.string().optional().describe("Station ID, e.g. 'GHCND:USW00094728' (Central Park, NYC)"),
      location_id: z.string().optional().describe("Location ID, e.g. 'FIPS:36' (NY state)"),
      datatype_id: z.string().optional().describe("Data type: TMAX, TMIN, TAVG, PRCP, SNOW, SNWD, AWND"),
      limit: z.number().int().max(1000).optional().describe("Max observations (default 1000)"),
    }),
    execute: async ({ dataset_id, start_date, end_date, station_id, location_id, datatype_id, limit }) => {
      const result = await getClimateData({
        datasetId: dataset_id, startDate: start_date, endDate: end_date,
        stationId: station_id, locationId: location_id, datatypeId: datatype_id, limit,
      });
      return JSON.stringify({
        summary: `${result.data.length} of ${result.count} observations, ${start_date} to ${end_date}`,
        total: result.count,
        data: result.data.slice(0, 200),
      });
    },
  },

  {
    name: "noaa_locations",
    description: "Search NOAA location IDs (states, cities, countries) for use with other NOAA tools.",
    annotations: { title: "NOAA: Search Locations", readOnlyHint: true },
    parameters: z.object({
      category: z.enum(["ST", "CITY", "CNTRY", "CLIM_REG"]).optional().describe("Location category: ST=states, CITY, CNTRY=countries, CLIM_REG=climate regions"),
      dataset_id: z.string().optional().describe("Filter by dataset, e.g. 'GHCND'"),
      limit: z.number().int().max(1000).optional().describe("Max results (default 50)"),
    }),
    execute: async ({ category, dataset_id, limit }) => {
      const locations = await searchLocations({ categoryId: category, datasetId: dataset_id, limit });
      return JSON.stringify({
        summary: `${locations.length} locations found`,
        locations,
      });
    },
  },
];

export const prompts: InputPrompt<any, any>[] = [
  {
    name: "climate_trends",
    description: "Temperature and precipitation trends for a U.S. location over time.",
    arguments: [
      { name: "location", description: "State or city name", required: false },
    ],
    load: async (args: any) => { const location = args?.location; return (
      `Analyze climate trends${location ? ` for ${location}` : " nationally"}:\n\n` +
      "1. Use noaa_locations to find the location ID (category 'ST' for states)\n" +
      "2. Use noaa_stations to find stations in that location with dataset GSOM (monthly summary)\n" +
      "3. Use noaa_climate_data with GSOM dataset for TAVG (temperature) and PRCP (precipitation) for the last 10 years\n" +
      "4. Compare recent years to historical averages\n\n" +
      "Present temperature and precipitation trends. Note: NOAA values are scaled (temps ×10, precip ×100).\n" +
      "If energy data would add context, use eia_state_energy for the same state."
    ); },
  },
];

// ─── Re-export cache control ─────────────────────────────────────────

export { clearCache } from "../sdk/noaa.js";
