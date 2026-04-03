/**
 * noaa-swpc MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import {
  getAlerts, getScales, getKpIndex, getDstIndex,
  getSolarFlux, getSunspots, getSolarWind,
  getGoesXray, getGoesParticles, getAuroraForecast,
  getSolarCycle, getForecast,
} from "./sdk.js";
import { timeseriesResponse, recordResponse, listResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "swpc_alerts",
    description: "Get current space weather alerts and warnings from NOAA SWPC.\nIncludes watches, warnings, and alerts for geomagnetic storms, solar radiation, and radio blackouts.",
    annotations: { title: "SWPC: Space Weather Alerts", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const alerts = await getAlerts();
      if (!alerts.length) return emptyResponse("No active space weather alerts.");
      return listResponse(
        `${alerts.length} space weather alerts`,
        { items: alerts },
      );
    },
  },

  {
    name: "swpc_scales",
    description: "Get current NOAA space weather scale levels.\nShows R (radio blackout), S (solar radiation), and G (geomagnetic storm) scale levels from 0-5.",
    annotations: { title: "SWPC: Space Weather Scales", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const scales = await getScales();
      return recordResponse("Current NOAA space weather scale levels", scales);
    },
  },

  {
    name: "swpc_kp_index",
    description: "Get recent planetary Kp index values.\nKp ranges 0-9: 0-3 = quiet, 4 = unsettled, 5+ = geomagnetic storm (G1-G5).",
    annotations: { title: "SWPC: Kp Index", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const data = await getKpIndex();
      if (!data.length) return emptyResponse("No Kp index data available.");
      return timeseriesResponse(
        `${data.length} Kp index observations`,
        { rows: data, dateKey: "time_tag", valueKey: "Kp" },
      );
    },
  },

  {
    name: "swpc_dst_index",
    description: "Get Dst (disturbance storm time) index.\nNegative Dst indicates geomagnetic disturbance. Below -50 nT = moderate storm, below -100 nT = intense storm.",
    annotations: { title: "SWPC: Dst Index", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const data = await getDstIndex();
      if (!data.length) return emptyResponse("No Dst index data available.");
      return timeseriesResponse(
        `${data.length} Dst index observations`,
        { rows: data, dateKey: "time_tag", valueKey: "dst" },
      );
    },
  },

  {
    name: "swpc_solar_flux",
    description: "Get F10.7 cm solar radio flux data.\nF10.7 is a key indicator of solar activity. Values > 100 SFU = elevated activity, > 150 = high activity.",
    annotations: { title: "SWPC: Solar Flux (F10.7)", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const data = await getSolarFlux();
      if (!data.length) return emptyResponse("No solar flux data available.");
      return timeseriesResponse(
        `${data.length} F10.7 solar flux observations`,
        { rows: data, dateKey: "time_tag", valueKey: "flux" },
      );
    },
  },

  {
    name: "swpc_sunspots",
    description: "Get monthly sunspot numbers.\nTracks the ~11-year solar cycle. Higher sunspot counts correlate with more solar activity and space weather events.",
    annotations: { title: "SWPC: Sunspot Numbers", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const data = await getSunspots();
      if (!data.length) return emptyResponse("No sunspot data available.");
      return timeseriesResponse(
        `${data.length} monthly sunspot observations`,
        { rows: data, dateKey: "time_tag", valueKey: "ssn" },
      );
    },
  },

  {
    name: "swpc_solar_wind",
    description: "Get 7-day solar wind data.\nPlasma data includes density, speed, temperature. Magnetic field data includes Bz, Bt components. Southward Bz (negative) drives geomagnetic storms.",
    annotations: { title: "SWPC: Solar Wind", readOnlyHint: true },
    parameters: z.object({
      type: z.enum(["plasma", "mag"]).optional().describe("Data type: 'plasma' (density/speed/temperature) or 'mag' (magnetic field Bz/Bt). Default: plasma"),
    }),
    execute: async ({ type }) => {
      const windType = type ?? "plasma";
      const data = await getSolarWind(windType);
      if (!data.length) return emptyResponse("No solar wind data available.");
      const valueKey = windType === "plasma" ? "speed" : "bz_gsm";
      return timeseriesResponse(
        `${data.length} solar wind ${windType} observations (7-day)`,
        { rows: data, dateKey: "time_tag", valueKey },
      );
    },
  },

  {
    name: "swpc_goes_xray",
    description: "Get GOES satellite X-ray flux data.\nX-ray flares classified as A, B, C, M, X (increasing intensity). M and X class flares can cause radio blackouts.",
    annotations: { title: "SWPC: GOES X-Ray Flux", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const data = await getGoesXray();
      if (!data.length) return emptyResponse("No GOES X-ray flux data available.");
      return timeseriesResponse(
        `${data.length} GOES X-ray flux observations`,
        { rows: data, dateKey: "time_tag", valueKey: "flux" },
      );
    },
  },

  {
    name: "swpc_goes_particles",
    description: "Get GOES satellite energetic particle flux data.\nElevated particle flux indicates solar energetic particle (SEP) events that can affect satellites and polar aviation.",
    annotations: { title: "SWPC: GOES Particle Flux", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const data = await getGoesParticles();
      if (!data.length) return emptyResponse("No GOES particle flux data available.");
      return timeseriesResponse(
        `${data.length} GOES particle flux observations`,
        { rows: data, dateKey: "time_tag", valueKey: "flux" },
      );
    },
  },

  {
    name: "swpc_aurora_forecast",
    description: "Get 24-hour northern hemisphere aurora probability forecast.\nReturns OVATION model predictions. Higher probability at higher latitudes during geomagnetic activity.",
    annotations: { title: "SWPC: Aurora Forecast", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const data = await getAuroraForecast();
      // Aurora data can be very large — return as a record summary
      return recordResponse("24-hour northern hemisphere aurora probability forecast", data);
    },
  },

  {
    name: "swpc_solar_cycle",
    description: "Get predicted solar cycle progression.\nShows observed and predicted sunspot numbers and F10.7 flux for the current solar cycle (~11-year cycle).",
    annotations: { title: "SWPC: Solar Cycle Prediction", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const data = await getSolarCycle();
      if (!data.length) return emptyResponse("No solar cycle prediction data available.");
      return timeseriesResponse(
        `${data.length} solar cycle prediction data points`,
        { rows: data, dateKey: "time_tag", valueKey: "predicted_ssn" },
      );
    },
  },

  {
    name: "swpc_forecast",
    description: "Get 3-day space weather forecast text from NOAA SWPC.\nIncludes solar activity, geomagnetic, and radiation environment forecasts.",
    annotations: { title: "SWPC: 3-Day Forecast", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const data = await getForecast();
      if (!data) return emptyResponse("No forecast data available.");
      // The forecast may be a string or structured data
      if (typeof data === "string") {
        return recordResponse("3-day space weather forecast", { forecast: data });
      }
      return recordResponse("3-day space weather forecast", data as Record<string, unknown>);
    },
  },
];
