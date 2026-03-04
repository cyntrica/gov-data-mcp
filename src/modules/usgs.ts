/**
 * USGS module — earthquake data and water resources monitoring.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { keysEnum, describeEnum } from "../enum-utils.js";
import {
  searchEarthquakes,
  countEarthquakes,
  getSignificantEarthquakes,
  getWaterData,
  getDailyWaterData,
  searchWaterSites,
  WATER_PARAMS,
  ALERT_LEVELS,
  clearCache as sdkClearCache,
  type EarthquakeFeature,
} from "../sdk/usgs.js";

// ─── Metadata ────────────────────────────────────────────────────────

export const name = "usgs";
export const displayName = "USGS (U.S. Geological Survey)";
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

function summarizeEarthquakes(features: EarthquakeFeature[]): string {
  if (!features.length) return "No earthquakes found matching the criteria.";
  const lines = features.map((f) => {
    const p = f.properties;
    const [lon, lat, depth] = f.geometry.coordinates;
    const time = p.time ? new Date(p.time).toISOString() : "?";
    const parts = [
      `M${p.mag ?? "?"} — ${p.place ?? "Unknown location"}`,
      `  Time: ${time}`,
      `  Depth: ${depth?.toFixed(1) ?? "?"}km | Lat: ${lat?.toFixed(3)}, Lon: ${lon?.toFixed(3)}`,
    ];
    if (p.alert) parts.push(`  Alert: ${p.alert.toUpperCase()} — ${ALERT_LEVELS[p.alert] ?? ""}`);
    if (p.tsunami === 1) parts.push("  ⚠ TSUNAMI WARNING");
    if (p.felt) parts.push(`  Felt by: ${p.felt} people`);
    if (p.url) parts.push(`  Details: ${p.url}`);
    return parts.join("\n");
  });
  return `${features.length} earthquake(s) found:\n\n${lines.join("\n\n")}`;
}

// ─── Tools ───────────────────────────────────────────────────────────

export const tools: Tool<any, any>[] = [
  {
    name: "usgs_earthquakes",
    description:
      "Search for earthquakes by magnitude, location, date range, and more.\n" +
      "Returns magnitude, location, depth, time, alert level, tsunami risk, and felt reports.\n" +
      "Magnitude scale: 2.5+ felt by people, 4.0+ moderate, 5.0+ significant, 7.0+ major.",
    annotations: { title: "USGS: Earthquake Search", readOnlyHint: true },
    parameters: z.object({
      starttime: z.string().optional().describe("Start date ISO format: '2024-01-01'"),
      endtime: z.string().optional().describe("End date ISO format: '2024-12-31'"),
      minmagnitude: z.number().optional().describe("Minimum magnitude (e.g. 4.0, 5.0, 6.0)"),
      maxmagnitude: z.number().optional().describe("Maximum magnitude"),
      latitude: z.number().optional().describe("Center latitude for radius search"),
      longitude: z.number().optional().describe("Center longitude for radius search"),
      maxradiuskm: z.number().optional().describe("Search radius in km (requires lat/lon)"),
      alertlevel: z.enum(keysEnum(ALERT_LEVELS)).optional().describe(`PAGER alert level: ${describeEnum(ALERT_LEVELS)}`),
      limit: z.number().int().max(200).optional().describe("Max results (default 20, max 200)"),
      orderby: z.enum(["time", "time-asc", "magnitude", "magnitude-asc"]).optional().describe("Sort order (default: time)"),
    }),
    execute: async (args) => {
      const data = await searchEarthquakes(args);
      const header = `${data.metadata?.count ?? data.features.length} total matches`;
      return { content: [{ type: "text" as const, text: `${header}\n\n${summarizeEarthquakes(data.features)}` }] };
    },
  },

  {
    name: "usgs_significant",
    description:
      "Get significant earthquakes from the past 30 days (typically M4.5+ or felt/damaging events).\n" +
      "Quick way to see the latest notable seismic activity worldwide.",
    annotations: { title: "USGS: Significant Earthquakes", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const data = await getSignificantEarthquakes();
      return { content: [{ type: "text" as const, text: summarizeEarthquakes(data.features) }] };
    },
  },

  {
    name: "usgs_earthquake_count",
    description:
      "Count earthquakes matching criteria without fetching full details.\n" +
      "Useful for statistics: 'How many M5+ earthquakes occurred in 2024?'",
    annotations: { title: "USGS: Earthquake Count", readOnlyHint: true },
    parameters: z.object({
      starttime: z.string().optional().describe("Start date: '2024-01-01'"),
      endtime: z.string().optional().describe("End date: '2024-12-31'"),
      minmagnitude: z.number().optional().describe("Minimum magnitude"),
      maxmagnitude: z.number().optional().describe("Maximum magnitude"),
      latitude: z.number().optional().describe("Center latitude for radius search"),
      longitude: z.number().optional().describe("Center longitude for radius search"),
      maxradiuskm: z.number().optional().describe("Search radius in km"),
    }),
    execute: async (args) => {
      const data = await countEarthquakes(args);
      return { content: [{ type: "text" as const, text: `Earthquake count: ${data.count}` }] };
    },
  },

  {
    name: "usgs_water_data",
    description:
      "Get real-time water data (streamflow, gage height, temperature) from USGS monitoring sites.\n" +
      "13,000+ stations nationwide. Parameter codes: 00060=discharge (cfs), 00065=gage height (ft), 00010=water temp (°C).\n" +
      "Query by site ID, state, county, or hydrologic unit code (HUC).",
    annotations: { title: "USGS: Water Data", readOnlyHint: true },
    parameters: z.object({
      sites: z.string().optional().describe("USGS site number(s), comma-separated: '01646500' or '01646500,01647000'"),
      state_cd: z.string().optional().describe("Two-letter state code: 'CA', 'TX', 'NY'"),
      parameter_cd: z.string().optional().describe("Parameter code: '00060' (discharge), '00065' (gage height), '00010' (temp). Default: 00060"),
      period: z.string().optional().describe("ISO 8601 duration: 'P1D' (1 day, default), 'P7D' (7 days), 'P30D' (30 days)"),
      start_dt: z.string().optional().describe("Start date: '2024-01-01' (overrides period)"),
      end_dt: z.string().optional().describe("End date: '2024-01-31'"),
    }),
    execute: async (args) => {
      const data = await getWaterData({
        sites: args.sites,
        stateCd: args.state_cd,
        parameterCd: args.parameter_cd,
        period: args.period,
        startDT: args.start_dt,
        endDT: args.end_dt,
      });
      const series = data?.value?.timeSeries ?? [];
      if (!series.length) return { content: [{ type: "text" as const, text: "No water data found for the specified criteria." }] };

      const summaries = series.slice(0, 20).map((ts) => {
        const siteName = ts.sourceInfo?.siteName ?? "Unknown";
        const siteCode = ts.sourceInfo?.siteCode?.[0]?.value ?? "?";
        const varName = ts.variable?.variableName ?? "?";
        const unit = ts.variable?.unit?.unitCode ?? "";
        const values = ts.values?.[0]?.value ?? [];
        const latest = values[values.length - 1];
        return `${siteName} (${siteCode})\n  ${varName}: ${latest?.value ?? "N/A"} ${unit} (${latest?.dateTime ?? "?"})  |  ${values.length} readings`;
      });
      return { content: [{ type: "text" as const, text: `${series.length} time series found:\n\n${summaries.join("\n\n")}` }] };
    },
  },

  {
    name: "usgs_water_sites",
    description:
      "Search for USGS water monitoring sites by state, county, or hydrologic unit.\n" +
      "Site types: ST=stream, GW=groundwater, LK=lake, SP=spring.",
    annotations: { title: "USGS: Water Sites", readOnlyHint: true },
    parameters: z.object({
      state_cd: z.string().optional().describe("Two-letter state code: 'CA', 'TX'"),
      county_cd: z.string().optional().describe("County FIPS code"),
      site_type: z.enum(["ST", "GW", "LK", "SP"]).optional().describe("Site type: ST (stream), GW (groundwater), LK (lake), SP (spring)"),
    }),
    execute: async (args) => {
      const data = await searchWaterSites({
        stateCd: args.state_cd,
        countyCd: args.county_cd,
        siteType: args.site_type,
      });
      // RDB format comes back as a string
      const text = typeof data === "string" ? data : JSON.stringify(data, null, 2);
      const lines = text.split("\n").filter((l: string) => !l.startsWith("#"));
      const preview = lines.slice(0, 50).join("\n");
      return { content: [{ type: "text" as const, text: `Water monitoring sites:\n\n${preview}${lines.length > 50 ? `\n\n... ${lines.length - 50} more rows` : ""}` }] };
    },
  },

  {
    name: "usgs_daily_water_data",
    description:
      "Get USGS daily value water data (historical daily averages).\n" +
      "Unlike real-time instantaneous values, these are aggregated daily means — better for trend analysis.\n" +
      "Parameter codes: 00060=discharge (cfs), 00065=gage height (ft), 00010=water temp (°C).",
    annotations: { title: "USGS: Daily Water Data", readOnlyHint: true },
    parameters: z.object({
      sites: z.string().optional().describe("USGS site number(s): '01646500'"),
      state_cd: z.string().optional().describe("Two-letter state code: 'CA', 'TX'"),
      parameter_cd: z.string().optional().describe("Parameter code: '00060' (discharge), '00065' (gage height). Default: 00060"),
      period: z.string().optional().describe("ISO 8601 duration: 'P30D' (default), 'P90D', 'P365D'"),
      start_dt: z.string().optional().describe("Start date: '2024-01-01' (overrides period)"),
      end_dt: z.string().optional().describe("End date: '2024-12-31'"),
    }),
    execute: async (args) => {
      const data = await getDailyWaterData({
        sites: args.sites,
        stateCd: args.state_cd,
        parameterCd: args.parameter_cd,
        period: args.period,
        startDT: args.start_dt,
        endDT: args.end_dt,
      });
      const series = data?.value?.timeSeries ?? [];
      if (!series.length) return { content: [{ type: "text" as const, text: "No daily water data found." }] };

      const summaries = series.slice(0, 10).map((ts) => {
        const siteName = ts.sourceInfo?.siteName ?? "Unknown";
        const siteCode = ts.sourceInfo?.siteCode?.[0]?.value ?? "?";
        const varName = ts.variable?.variableName ?? "?";
        const unit = ts.variable?.unit?.unitCode ?? "";
        const values = ts.values?.[0]?.value ?? [];
        const latest = values[values.length - 1];
        const earliest = values[0];
        return `${siteName} (${siteCode})\n  ${varName}: ${values.length} daily values\n  Latest: ${latest?.value ?? "N/A"} ${unit} (${latest?.dateTime?.split("T")[0] ?? "?"})\n  Earliest: ${earliest?.value ?? "N/A"} ${unit} (${earliest?.dateTime?.split("T")[0] ?? "?"})` ;
      });
      return { content: [{ type: "text" as const, text: `${series.length} time series found:\n\n${summaries.join("\n\n")}` }] };
    },
  },
];

export { sdkClearCache as clearCache };
