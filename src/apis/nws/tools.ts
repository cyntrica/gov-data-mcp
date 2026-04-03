/**
 * nws MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import {
  pointLookup,
  getForecast,
  getForecastByLatLon,
  getForecastHourly,
  getForecastHourlyByLatLon,
  getActiveAlerts,
  getAlertsByState,
  getAlertDetail,
  getLatestObservation,
  getObservationHistory,
  getStations,
  getNearbyStations,
  getZoneForecast,
  getZones,
  getRadarStations,
  getTextProducts,
  getAviationSigmets,
  getGlossary,
} from "./sdk.js";
import { listResponse, recordResponse, emptyResponse, cleanHtml } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "nws_point_lookup",
    description: "Resolve latitude/longitude to an NWS forecast grid point.\nReturns grid office, gridX, gridY needed for forecast calls, plus timezone and county info.\nThis is the essential first step before getting forecasts.",
    annotations: { title: "NWS: Point Lookup", readOnlyHint: true },
    parameters: z.object({
      latitude: z.number().min(-90).max(90).describe("Latitude (e.g. 40.7128)"),
      longitude: z.number().min(-180).max(180).describe("Longitude (e.g. -74.006)"),
    }),
    execute: async ({ latitude, longitude }) => {
      const point = await pointLookup(latitude, longitude);
      return recordResponse(
        `Grid point: ${point.office} (${point.gridX},${point.gridY}) — ${point.timezone}`,
        point,
      );
    },
  },

  {
    name: "nws_forecast",
    description: "Get 7-day weather forecast.\nProvide EITHER (office + grid_x + grid_y) from a point lookup, OR (latitude + longitude) to auto-resolve.\nReturns forecast periods with temperature, wind, and conditions.",
    annotations: { title: "NWS: 7-Day Forecast", readOnlyHint: true },
    parameters: z.object({
      office: z.string().optional().describe("NWS office code (e.g. 'OKX', 'LAX'). Required if not using lat/lon."),
      grid_x: z.number().int().optional().describe("Grid X coordinate from point lookup"),
      grid_y: z.number().int().optional().describe("Grid Y coordinate from point lookup"),
      latitude: z.number().min(-90).max(90).optional().describe("Latitude — auto-resolves grid if office not provided"),
      longitude: z.number().min(-180).max(180).optional().describe("Longitude — auto-resolves grid if office not provided"),
    }),
    execute: async ({ office, grid_x, grid_y, latitude, longitude }) => {
      if (office && grid_x != null && grid_y != null) {
        const periods = await getForecast({ office, gridX: grid_x, gridY: grid_y });
        if (!periods.length) return emptyResponse("No forecast periods returned.");
        return listResponse(
          `7-day forecast from ${office} (${grid_x},${grid_y}): ${periods.length} periods`,
          { items: periods },
        );
      }
      if (latitude != null && longitude != null) {
        const result = await getForecastByLatLon(latitude, longitude);
        if (!result.periods.length) return emptyResponse("No forecast periods returned.");
        return listResponse(
          `7-day forecast for (${latitude},${longitude}) via ${result.point.office}: ${result.periods.length} periods`,
          { items: result.periods, meta: { grid: result.point } },
        );
      }
      return emptyResponse("Provide either (office + grid_x + grid_y) or (latitude + longitude).");
    },
  },

  {
    name: "nws_forecast_hourly",
    description: "Get hourly weather forecast.\nProvide EITHER (office + grid_x + grid_y) from a point lookup, OR (latitude + longitude) to auto-resolve.\nReturns hourly periods with temperature, wind, and conditions.",
    annotations: { title: "NWS: Hourly Forecast", readOnlyHint: true },
    parameters: z.object({
      office: z.string().optional().describe("NWS office code (e.g. 'OKX', 'LAX')"),
      grid_x: z.number().int().optional().describe("Grid X coordinate from point lookup"),
      grid_y: z.number().int().optional().describe("Grid Y coordinate from point lookup"),
      latitude: z.number().min(-90).max(90).optional().describe("Latitude — auto-resolves grid if office not provided"),
      longitude: z.number().min(-180).max(180).optional().describe("Longitude — auto-resolves grid if office not provided"),
    }),
    execute: async ({ office, grid_x, grid_y, latitude, longitude }) => {
      if (office && grid_x != null && grid_y != null) {
        const periods = await getForecastHourly({ office, gridX: grid_x, gridY: grid_y });
        if (!periods.length) return emptyResponse("No hourly forecast periods returned.");
        return listResponse(
          `Hourly forecast from ${office} (${grid_x},${grid_y}): ${periods.length} periods`,
          { items: periods },
        );
      }
      if (latitude != null && longitude != null) {
        const result = await getForecastHourlyByLatLon(latitude, longitude);
        if (!result.periods.length) return emptyResponse("No hourly forecast periods returned.");
        return listResponse(
          `Hourly forecast for (${latitude},${longitude}) via ${result.point.office}: ${result.periods.length} periods`,
          { items: result.periods, meta: { grid: result.point } },
        );
      }
      return emptyResponse("Provide either (office + grid_x + grid_y) or (latitude + longitude).");
    },
  },

  {
    name: "nws_alerts_active",
    description: "Get active weather alerts (warnings, watches, advisories).\nFilter by state, event type, severity, urgency, or certainty.",
    annotations: { title: "NWS: Active Alerts", readOnlyHint: true },
    parameters: z.object({
      area: z.string().optional().describe("State code(s), comma-separated (e.g. 'CA', 'NY,NJ')"),
      event: z.string().optional().describe("Event type (e.g. 'Tornado Warning', 'Flash Flood Watch')"),
      severity: z.enum(["Extreme", "Severe", "Moderate", "Minor", "Unknown"]).optional().describe("Severity level"),
      urgency: z.string().optional().describe("Urgency: Immediate, Expected, Future, Past, Unknown"),
      certainty: z.string().optional().describe("Certainty: Observed, Likely, Possible, Unlikely, Unknown"),
      limit: z.number().int().max(500).optional().describe("Max alerts (default 50)"),
    }),
    execute: async ({ area, event, severity, urgency, certainty, limit }) => {
      const alerts = await getActiveAlerts({ area, event, severity, urgency, certainty, limit });
      if (!alerts.length) return emptyResponse("No active alerts matching criteria.");
      const cleaned = alerts.map(a => ({
        ...a,
        description: cleanHtml(a.description),
        instruction: a.instruction ? cleanHtml(a.instruction) : "",
      }));
      return listResponse(
        `${cleaned.length} active alert(s)${area ? ` for ${area}` : ""}`,
        { items: cleaned },
      );
    },
  },

  {
    name: "nws_alerts_by_state",
    description: "Get all active weather alerts for a specific state.\nReturns warnings, watches, and advisories currently in effect.",
    annotations: { title: "NWS: Alerts by State", readOnlyHint: true },
    parameters: z.object({
      state: z.string().length(2).describe("2-letter state code (e.g. 'CA', 'NY', 'TX')"),
    }),
    execute: async ({ state }) => {
      const alerts = await getAlertsByState(state);
      if (!alerts.length) return emptyResponse(`No active alerts for ${state.toUpperCase()}.`);
      const cleaned = alerts.map(a => ({
        ...a,
        description: cleanHtml(a.description),
        instruction: a.instruction ? cleanHtml(a.instruction) : "",
      }));
      return listResponse(
        `${cleaned.length} active alert(s) for ${state.toUpperCase()}`,
        { items: cleaned },
      );
    },
  },

  {
    name: "nws_alert_detail",
    description: "Get full details for a specific weather alert by ID.\nIncludes complete description, instruction text, affected areas, and timing.",
    annotations: { title: "NWS: Alert Detail", readOnlyHint: true },
    parameters: z.object({
      alert_id: z.string().describe("Alert ID (e.g. 'urn:oid:2.49.0.1.840.0...')"),
    }),
    execute: async ({ alert_id }) => {
      const alert = await getAlertDetail(alert_id);
      const cleaned = {
        ...alert,
        description: cleanHtml(alert.description),
        instruction: alert.instruction ? cleanHtml(alert.instruction) : "",
      };
      return recordResponse(
        `Alert: ${cleaned.event} — ${cleaned.headline || cleaned.areaDesc}`,
        cleaned,
      );
    },
  },

  {
    name: "nws_observation_latest",
    description: "Get the latest weather observation from a station.\nReturns temperature, wind, humidity, pressure, visibility, and conditions.\nStation IDs are ICAO codes (e.g. KJFK, KLAX, KORD).",
    annotations: { title: "NWS: Latest Observation", readOnlyHint: true },
    parameters: z.object({
      station_id: z.string().describe("Station ICAO code (e.g. 'KJFK', 'KLAX', 'KORD')"),
    }),
    execute: async ({ station_id }) => {
      const obs = await getLatestObservation(station_id);
      return recordResponse(
        `Latest observation at ${station_id.toUpperCase()}: ${obs.text_description || "N/A"}, ${obs.temperature_c != null ? `${obs.temperature_c}°C` : "temp N/A"}`,
        obs,
      );
    },
  },

  {
    name: "nws_observation_history",
    description: "Get recent observation history from a weather station.\nReturns multiple observations with temperature, wind, humidity, etc.\nOptionally filter by date range.",
    annotations: { title: "NWS: Observation History", readOnlyHint: true },
    parameters: z.object({
      station_id: z.string().describe("Station ICAO code (e.g. 'KJFK', 'KLAX')"),
      start: z.string().optional().describe("Start date/time ISO 8601 (e.g. '2025-01-01T00:00:00Z')"),
      end: z.string().optional().describe("End date/time ISO 8601"),
      limit: z.number().int().max(500).optional().describe("Max observations (default 24)"),
    }),
    execute: async ({ station_id, start, end, limit }) => {
      const observations = await getObservationHistory({ stationId: station_id, start, end, limit });
      if (!observations.length) return emptyResponse(`No observations found for ${station_id.toUpperCase()}.`);
      return listResponse(
        `${observations.length} observation(s) from ${station_id.toUpperCase()}`,
        { items: observations },
      );
    },
  },

  {
    name: "nws_stations",
    description: "Find weather observation stations.\nSearch by state code, or provide latitude + longitude to find nearby stations.\nStation IDs can be used with observation tools.",
    annotations: { title: "NWS: Find Stations", readOnlyHint: true },
    parameters: z.object({
      state: z.string().optional().describe("2-letter state code (e.g. 'NY', 'CA')"),
      latitude: z.number().min(-90).max(90).optional().describe("Latitude — find nearest stations to this point"),
      longitude: z.number().min(-180).max(180).optional().describe("Longitude — find nearest stations to this point"),
      limit: z.number().int().max(500).optional().describe("Max stations (default 50, ignored for lat/lon lookup)"),
    }),
    execute: async ({ state, latitude, longitude, limit }) => {
      if (latitude != null && longitude != null) {
        const stations = await getNearbyStations(latitude, longitude);
        if (!stations.length) return emptyResponse("No nearby stations found.");
        return listResponse(
          `${stations.length} station(s) near (${latitude},${longitude})`,
          { items: stations },
        );
      }
      const stations = await getStations({ state, limit });
      if (!stations.length) return emptyResponse(`No stations found${state ? ` for ${state.toUpperCase()}` : ""}.`);
      return listResponse(
        `${stations.length} station(s)${state ? ` in ${state.toUpperCase()}` : ""}`,
        { items: stations },
      );
    },
  },

  {
    name: "nws_zone_forecast",
    description: "Get text forecast for a specific NWS forecast zone.\nZone IDs look like 'NYZ072', 'CAZ006', etc.",
    annotations: { title: "NWS: Zone Forecast", readOnlyHint: true },
    parameters: z.object({
      zone_id: z.string().describe("Zone ID (e.g. 'NYZ072', 'CAZ006')"),
    }),
    execute: async ({ zone_id }) => {
      const forecast = await getZoneForecast(zone_id);
      if (!forecast.periods.length) return emptyResponse(`No forecast available for zone ${zone_id}.`);
      return recordResponse(
        `Zone forecast for ${zone_id}: ${forecast.periods.length} period(s), updated ${forecast.updated}`,
        forecast,
      );
    },
  },

  {
    name: "nws_zones",
    description: "List NWS forecast zones.\nFilter by zone type (forecast, fire, county, coastal) and/or state.",
    annotations: { title: "NWS: List Zones", readOnlyHint: true },
    parameters: z.object({
      type: z.enum(["forecast", "fire", "county", "coastal"]).optional().describe("Zone type (default: forecast)"),
      area: z.string().optional().describe("State code (e.g. 'NY', 'CA')"),
      limit: z.number().int().max(500).optional().describe("Max zones (default 50)"),
    }),
    execute: async ({ type, area, limit }) => {
      const zones = await getZones({ type, area, limit });
      if (!zones.length) return emptyResponse("No zones found matching criteria.");
      return listResponse(
        `${zones.length} ${type ?? "forecast"} zone(s)${area ? ` in ${area.toUpperCase()}` : ""}`,
        { items: zones },
      );
    },
  },

  {
    name: "nws_radar_stations",
    description: "List NWS radar stations across the U.S.\nReturns station IDs, names, types, and coordinates.",
    annotations: { title: "NWS: Radar Stations", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const stations = await getRadarStations();
      if (!stations.length) return emptyResponse("No radar stations returned.");
      return listResponse(
        `${stations.length} radar station(s)`,
        { items: stations },
      );
    },
  },

  {
    name: "nws_text_products",
    description: "Get NWS text products like Area Forecast Discussions (AFD), Hazardous Weather Outlooks (HWO), etc.\nRequires a product type code. Optionally filter by WFO location.",
    annotations: { title: "NWS: Text Products", readOnlyHint: true },
    parameters: z.object({
      type: z.string().describe("Product type code (e.g. 'AFD' for Area Forecast Discussion, 'HWO' for Hazardous Weather Outlook)"),
      location: z.string().optional().describe("WFO office code (e.g. 'OKX', 'LAX')"),
    }),
    execute: async ({ type, location }) => {
      const products = await getTextProducts({ type, location });
      if (!products.length) return emptyResponse(`No ${type} products found${location ? ` for ${location}` : ""}.`);
      return listResponse(
        `${products.length} ${type} product(s)${location ? ` from ${location}` : ""}`,
        { items: products },
      );
    },
  },

  {
    name: "nws_aviation_sigmets",
    description: "Get current aviation SIGMETs (Significant Meteorological Information).\nReturns active SIGMETs with phenomenon type, timing, and affected areas.",
    annotations: { title: "NWS: Aviation SIGMETs", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const sigmets = await getAviationSigmets();
      if (!sigmets.length) return emptyResponse("No active SIGMETs.");
      return listResponse(
        `${sigmets.length} active SIGMET(s)`,
        { items: sigmets },
      );
    },
  },

  {
    name: "nws_glossary",
    description: "Get NWS weather glossary — definitions of weather terms and abbreviations.",
    annotations: { title: "NWS: Weather Glossary", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const terms = await getGlossary();
      if (!terms.length) return emptyResponse("No glossary terms returned.");
      return listResponse(
        `${terms.length} weather glossary term(s)`,
        { items: terms },
      );
    },
  },
];
