/**
 * NREL MCP module — alt fuel stations, utility rates, solar resource data.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { keysEnum, describeEnum } from "../enum-utils.js";
import { searchAltFuelStations, getUtilityRates, getSolarResource, FUEL_TYPES, STATUS_CODES } from "../sdk/nrel.js";

export const name = "nrel";
export const displayName = "NREL (Clean Energy)";
export const description = "EV charging stations, alt fuel stations, electricity rates, solar resource data from the National Renewable Energy Laboratory";
export const auth = { envVar: "DATA_GOV_API_KEY", signup: "https://api.data.gov/signup/" };
export const workflow = "nrel_fuel_stations to find EV chargers/alt fuel → nrel_utility_rates for electricity costs → nrel_solar for solar potential";
export const tips = "Fuel types: ELEC (EV), E85 (ethanol), CNG (natural gas), LPG (propane), BD (biodiesel), HY (hydrogen). Status: E=open, P=planned, T=temporarily unavailable.";

export const reference = {
  fuelTypes: FUEL_TYPES,
  docs: {
    "NREL Developer": "https://developer.nrel.gov/",
    "Alt Fuel Stations API": "https://developer.nrel.gov/docs/transportation/alt-fuel-stations-v1/",
    "Utility Rates API": "https://developer.nrel.gov/docs/electricity/utility-rates-v3/",
    "Solar Resource API": "https://developer.nrel.gov/docs/solar/solar-resource-v1/",
  },
};

export const tools: Tool<any, any>[] = [
  {
    name: "nrel_fuel_stations",
    description:
      "Search for EV charging stations, hydrogen stations, biodiesel, CNG, and other alternative fuel stations.\n" +
      "Covers all U.S. alt fuel infrastructure. Filter by state, zip, fuel type, radius.\n\n" +
      "Fuel types: 'ELEC' (EV), 'HY' (hydrogen), 'CNG' (natural gas), 'LPG' (propane), 'BD' (biodiesel), 'E85' (ethanol)",
    annotations: { title: "NREL: Alt Fuel Stations", readOnlyHint: true },
    parameters: z.object({
      state: z.string().optional().describe("Two-letter state code: 'CA', 'TX', 'NY'"),
      zip: z.string().optional().describe("ZIP code to search near"),
      fuel_type: z.enum(keysEnum(FUEL_TYPES)).optional().describe(`Fuel type: ${describeEnum(FUEL_TYPES)}`),
      radius: z.number().optional().describe("Search radius in miles from zip (default 25)"),
      limit: z.number().int().max(200).optional().describe("Max results (default 20)"),
      status: z.enum(keysEnum(STATUS_CODES)).optional().describe(`Station status: ${describeEnum(STATUS_CODES)}`),
    }),
    execute: async ({ state, zip, fuel_type, radius, limit, status }) => {
      const data = await searchAltFuelStations({ state, zip, fuel_type, limit, radius, status });
      if (!data.fuel_stations?.length) return `No ${fuel_type || "alt fuel"} stations found${state ? ` in ${state}` : ""}.`;
      return JSON.stringify({
        summary: `Alt fuel stations: ${data.total_results} total${state ? ` in ${state}` : ""}${fuel_type ? ` (${fuel_type})` : ""}, showing ${data.fuel_stations.length}`,
        total: data.total_results,
        stations: data.fuel_stations.slice(0, 50).map((s: any) => ({
          name: s.station_name, address: s.street_address, city: s.city, state: s.state, zip: s.zip,
          fuelType: s.fuel_type_code, network: s.ev_network, status: s.status_code,
          evLevel2: s.ev_level2_evse_num, evDCFast: s.ev_dc_fast_num, accessCode: s.access_code,
        })),
      });
    },
  },

  {
    name: "nrel_utility_rates",
    description: "Get residential, commercial, and industrial electricity rates for any U.S. location.\nProvide latitude/longitude to get the local utility and their rates ($/kWh).",
    annotations: { title: "NREL: Electricity Rates", readOnlyHint: true },
    parameters: z.object({
      lat: z.number().describe("Latitude (e.g. 40.7128 for NYC, 34.0522 for LA)"),
      lon: z.number().describe("Longitude (e.g. -74.0060 for NYC, -118.2437 for LA)"),
    }),
    execute: async ({ lat, lon }) => {
      const data = await getUtilityRates(lat, lon);
      return JSON.stringify({
        summary: `Utility rates for ${data.outputs.utility_name}: residential $${data.outputs.residential}/kWh, commercial $${data.outputs.commercial}/kWh, industrial $${data.outputs.industrial}/kWh`,
        ...data.outputs,
      });
    },
  },

  {
    name: "nrel_solar",
    description: "Get solar energy resource data for any U.S. location — monthly and annual solar irradiance.\nShows potential for solar panels at a given location.",
    annotations: { title: "NREL: Solar Resource", readOnlyHint: true },
    parameters: z.object({
      lat: z.number().describe("Latitude"),
      lon: z.number().describe("Longitude"),
    }),
    execute: async ({ lat, lon }) => {
      const data = await getSolarResource(lat, lon);
      return JSON.stringify({
        summary: `Solar resource at ${lat}, ${lon}: avg GHI ${data.outputs.avg_ghi?.annual} kWh/m²/day, avg DNI ${data.outputs.avg_dni?.annual} kWh/m²/day`,
        globalHorizontalIrradiance: data.outputs.avg_ghi,
        directNormalIrradiance: data.outputs.avg_dni,
        tiltedAtLatitude: data.outputs.avg_lat_tilt,
      });
    },
  },
];

export { clearCache } from "../sdk/nrel.js";
