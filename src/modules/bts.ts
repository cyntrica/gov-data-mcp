/**
 * BTS module — Bureau of Transportation Statistics: monthly transport stats, border crossings.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { keysEnum, describeEnum } from "../enum-utils.js";
import {
  getTransportStats,
  getBorderCrossings,
  TRANSPORT_FIELDS,
  BORDER_MEASURES,
  DATASETS,
  clearCache as sdkClearCache,
  type TransportStatsRecord,
} from "../sdk/bts.js";

// ─── Metadata ────────────────────────────────────────────────────────

export const name = "bts";
export const displayName = "BTS (Bureau of Transportation Statistics)";
export const description =
  "Monthly Transportation Statistics (50+ indicators): airline traffic & on-time %, transit ridership, rail freight, truck tonnage, fuel prices, vehicle sales, safety fatalities, Transportation Services Index, and border crossing data at U.S. ports of entry. No API key required.";
export const workflow =
  "Use bts_transport_stats for national monthly transportation indicators (airlines, transit, rail, fuel, safety) → bts_border_crossings for port-of-entry volumes (trucks, vehicles, pedestrians).";
export const tips =
  "Transport stats are monthly time series — use limit=24 for 2 years of trend data. Border crossing states use full names ('Texas', 'California'). Measures: 'Trucks', 'Personal Vehicles', 'Pedestrians'. Borders: 'US-Mexico Border', 'US-Canada Border'.";

export const reference = {
  transportFields: TRANSPORT_FIELDS,
  borderMeasures: BORDER_MEASURES,
  datasets: DATASETS,
  docs: {
    "BTS Open Data": "https://data.bts.gov/",
    "Monthly Transportation Statistics": "https://data.bts.gov/d/crem-w557",
    "Border Crossing Data": "https://data.bts.gov/d/keg4-3bc2",
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────

function formatNum(val: string | undefined): string {
  if (!val) return "N/A";
  const n = Number(val);
  return isNaN(n) ? val : n.toLocaleString();
}

function summarizeTransportStats(records: TransportStatsRecord[]): string {
  if (!records.length) return "No transportation statistics found for the given criteria.";

  const lines = records.map((r) => {
    const date = r.date ? r.date.split("T")[0] : "?";
    const parts = [`${date}:`];

    // Key indicators (show what's available)
    const fields: [string, string | undefined][] = [
      ["Airline Traffic", r.u_s_airline_traffic_total_non_seasonally_adjusted],
      ["On-Time %", r.u_s_marketing_air_carriers_on_time_performance_percent],
      ["Transit Ridership", r.system_use_transit_ridership],
      ["TSI-Freight", r.transportation_services_index_freight],
      ["TSI-Passenger", r.transportation_services_index_passenger],
      ["Truck Tonnage", r.truck_tonnage_index],
      ["Gas Price", r.highway_fuel_prices_regular],
      ["Auto Sales (SAAR M)", r.auto_sales_saar_millions],
      ["Amtrak On-Time", r.amtrak_on_time_performance],
      ["Rail Fatalities", r.rail_fatalities],
      ["MX Trucks", r.u_s_mexico_incoming_truck_crossings],
      ["CA Trucks", r.u_s_canada_incoming_truck_crossings],
    ];

    const available = fields.filter(([, v]) => v && v !== "");
    available.forEach(([label, val]) => parts.push(`  ${label}: ${formatNum(val)}`));

    return parts.join("\n");
  });

  return `${records.length} month(s) of transportation data:\n\n${lines.join("\n\n")}`;
}

// ─── Tools ───────────────────────────────────────────────────────────

export const tools: Tool<any, any>[] = [
  {
    name: "bts_transport_stats",
    description:
      "Get Monthly Transportation Statistics — 50+ national indicators including:\n" +
      "• Airline passenger traffic and on-time performance %\n" +
      "• Transit ridership, highway vehicle miles\n" +
      "• Rail freight, Amtrak ridership and on-time %\n" +
      "• Truck tonnage, fuel prices, vehicle sales\n" +
      "• Transportation Services Index (freight, passenger, combined)\n" +
      "• Border crossing summaries (trucks, persons)\n" +
      "• Safety fatalities (air, rail)\n" +
      "Monthly data going back to 1947 for some series.",
    annotations: { title: "BTS: Transport Statistics", readOnlyHint: true },
    parameters: z.object({
      start_date: z.string().optional().describe("Start date: '2020-01-01'"),
      end_date: z.string().optional().describe("End date: '2024-12-31'"),
      limit: z.number().int().max(120).optional().describe("Months of data (default 24 = 2 years)"),
    }),
    execute: async (args) => {
      const data = await getTransportStats({
        startDate: args.start_date,
        endDate: args.end_date,
        limit: args.limit,
      });
      return { content: [{ type: "text" as const, text: summarizeTransportStats(data) }] };
    },
  },

  {
    name: "bts_border_crossings",
    description:
      "Get border crossing data at U.S. ports of entry: trucks, personal vehicles, pedestrians, train passengers, containers.\n" +
      "Covers U.S.-Mexico and U.S.-Canada borders. Monthly data by port, state, and measure type.",
    annotations: { title: "BTS: Border Crossings", readOnlyHint: true },
    parameters: z.object({
      state: z.string().optional().describe("State full name: 'Texas', 'California', 'New York'"),
      border: z.enum(["US-Mexico Border", "US-Canada Border"]).optional().describe("Border"),
      port_name: z.string().optional().describe("Port of entry name: 'El Paso', 'San Ysidro', 'Detroit'"),
      measure: z.enum(keysEnum(BORDER_MEASURES)).optional().describe(`Measure type: ${describeEnum(BORDER_MEASURES)}`),
      limit: z.number().int().max(100).optional().describe("Max results (default 20)"),
    }),
    execute: async (args) => {
      const data = await getBorderCrossings({
        state: args.state,
        border: args.border,
        portName: args.port_name,
        measure: args.measure,
        limit: args.limit,
      });
      if (!data.length) return { content: [{ type: "text" as const, text: "No border crossing data found." }] };
      const lines = data.map((r) =>
        `${r.port_name ?? "?"} (${r.state ?? "?"}) — ${r.border ?? "?"}\n  ${r.measure ?? "?"}: ${formatNum(r.value)} (${r.date?.split("T")[0] ?? "?"})`,
      );
      return { content: [{ type: "text" as const, text: `${data.length} record(s):\n\n${lines.join("\n\n")}` }] };
    },
  },
];

export { sdkClearCache as clearCache };
