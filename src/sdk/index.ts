/**
 * SDK barrel export — import any SDK function without running the MCP server.
 *
 * Usage:
 *   import { searchBills, getBillDetails } from "us-gov-open-data-mcp/sdk/congress";
 *   import { searchFilings } from "us-gov-open-data-mcp/sdk/senate-lobbying";
 *
 * Or import everything:
 *   import * as sdk from "us-gov-open-data-mcp/sdk";
 *   const bills = await sdk.congress.searchBills({ congress: 118 });
 *
 * Each sub-module is a standalone typed client with caching, retry, and rate limiting.
 * No MCP or Zod dependency required — just set the relevant API key env var.
 */

export * as bea from "./bea.js";
export * as bls from "./bls.js";
export * as cdc from "./cdc.js";
export * as census from "./census.js";
export * as cfpb from "./cfpb.js";
export * as cms from "./cms.js";
export * as collegeScorecard from "./college-scorecard.js";
export * as congress from "./congress.js";
export * as dol from "./dol.js";
export * as eia from "./eia.js";
export * as epa from "./epa.js";
export * as fbi from "./fbi.js";
export * as fda from "./fda.js";
export * as fdic from "./fdic.js";
export * as fec from "./fec.js";
export * as federalRegister from "./federal-register.js";
export * as fema from "./fema.js";
export * as fred from "./fred.js";
export * as govinfo from "./govinfo.js";
export * as hud from "./hud.js";
export * as naep from "./naep.js";
export * as nhtsa from "./nhtsa.js";
export * as noaa from "./noaa.js";
export * as nrel from "./nrel.js";
export * as regulations from "./regulations.js";
export * as sec from "./sec.js";
export * as senateLobbying from "./senate-lobbying.js";
export * as treasury from "./treasury.js";
export * as usaspending from "./usaspending.js";
export * as usdaFooddata from "./usda-fooddata.js";
export * as usdaNass from "./usda-nass.js";
export * as uspto from "./uspto.js";
export * as worldBank from "./world-bank.js";
export * as usgs from "./usgs.js";
export * as clinicalTrials from "./clinical-trials.js";
export * as bts from "./bts.js";
export * as openPayments from "./open-payments.js";
export * as nih from "./nih.js";
