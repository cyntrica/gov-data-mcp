/**
 * nrel module metadata.
 */

import { FUEL_TYPES } from "./sdk.js";
export const name = "nrel";
export const displayName = "NREL (Clean Energy)";
export const category = "Environment";
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

