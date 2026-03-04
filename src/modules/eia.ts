/**
 * EIA MCP module — tools + metadata. Delegates all API calls to sdk/eia.
 *
 * Tools return raw JSON data — no markdown formatting. The client decides how to present it.
 */

import { z } from "zod";
import type { Tool, InputPrompt } from "fastmcp";
import {
  getPetroleum,
  getElectricity,
  getNaturalGas,
  getStateEnergy,
  getTotalEnergy,
  sedsMsnCodes,
  routes,
  type EiaObservation,
} from "../sdk/eia.js";
import { timeseriesResponse, emptyResponse } from "../response.js";

// ─── Metadata (server.ts reads these) ────────────────────────────────

export const name = "eia";
export const displayName = "Energy Information Administration";
export const description = "Petroleum, electricity, natural gas prices; state energy profiles; total energy overview";
export const auth = { envVar: "EIA_API_KEY", required: true, signup: "https://www.eia.gov/opendata/register.php" };
export const workflow = "Pick energy type (petroleum/electricity/gas/state/total) → query with optional state/sector filters";
export const tips = "Energy prices drive inflation (BLS CPI energy component), affect policy (Federal Register EOs), and vary hugely by state. Key advantage: granular energy data by fuel, sector, and state.";

export const reference = {
  sedsMsnCodes: sedsMsnCodes as Record<string, string>,
  routes: routes.map(r => ({ path: r.path, description: r.description, frequency: r.frequency })),
  docs: {
    "API Docs": "https://www.eia.gov/opendata/commands.php",
    "API Browser": "https://www.eia.gov/opendata/browser/",
    "Registration": "https://www.eia.gov/opendata/register.php",
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────

function formatObservations(data: EiaObservation[], limit?: number) {
  const rows = limit ? data.slice(0, limit) : data;
  return rows.map(row => ({
    period: row.period || null,
    value: row.value != null ? Number(row.value) : null,
    units: String(row.units || row.unit || ""),
    series: String(row["series-description"] || row.seriesDescription || row.series || ""),
    state: String(row.stateDescription || row.stateid || row.stateId || ""),
    sector: String(row.sectorName || row.sectorid || ""),
  }));
}

// ─── Tools ───────────────────────────────────────────────────────────

export const tools: Tool<any, any>[] = [
  {
    name: "eia_petroleum",
    description:
      "Get petroleum/oil prices — crude oil spot prices (WTI, Brent), " +
      "retail gasoline prices, diesel, heating oil.\n\n" +
      "Product codes:\n" +
      "- EPCBRENT: Brent crude oil spot price\n" +
      "- EPCWTI: WTI crude oil spot price\n" +
      "- EMM_EPMRU_PTE_NUS_DPG: US regular gasoline retail\n" +
      "- EMM_EPMPU_PTE_NUS_DPG: US premium gasoline retail\n" +
      "- EMD_EPD2D_PTE_NUS_DPG: US diesel retail\n" +
      "- EER_EPJK_PF4_RGC_DPG: US jet fuel spot price",
    annotations: { title: "EIA: Petroleum Prices", readOnlyHint: true },
    parameters: z.object({
      product: z.string().optional().describe(
        "Product type: 'crude' (default — WTI), 'gasoline', 'diesel', 'all'. " +
        "Or a specific series ID like 'EPCWTI'",
      ),
      frequency: z.enum(["daily", "weekly", "monthly", "annual"]).optional().describe("Frequency (default: monthly)"),
      start: z.string().optional().describe("Start date (YYYY-MM or YYYY-MM-DD). Default: 2 years ago"),
      end: z.string().optional().describe("End date (YYYY-MM or YYYY-MM-DD). Default: latest available"),
      length: z.number().int().max(5000).optional().describe("Max rows to return (API max: 5000). Omit to let date range control volume."),
      offset: z.number().int().optional().describe("Row offset for pagination (use with length)"),
    }),
    execute: async ({ product, frequency, start, end, length, offset }) => {
      const res = await getPetroleum({ product, frequency, start, end, length, offset });
      const data = res.response?.data || [];
      const total = res.response?.total || data.length;

      if (!data.length) return emptyResponse("No petroleum data found.");

      const observations = formatObservations(data);
      return timeseriesResponse(
        `EIA petroleum prices (${product || "crude"}): ${total} total, showing ${observations.length}`,
        {
          rows: observations,
          dateKey: "period",
          valueKey: "value",
          extraFields: ["units", "series", "state", "sector"],
          total,
          meta: { product: product || "crude", frequency: frequency || "monthly" },
        },
      );
    },
  },

  {
    name: "eia_electricity",
    description:
      "Get electricity retail prices, generation, or consumption by state and sector.\n\n" +
      "Sectors: residential (RES), commercial (COM), industrial (IND), transportation (TRA), all (ALL).\n" +
      "Data types: 'price' (cents/kWh), 'revenue' (M$), 'sales' (MWh), 'customers'",
    annotations: { title: "EIA: Electricity Prices & Generation", readOnlyHint: true },
    parameters: z.object({
      state: z.string().optional().describe("Two-letter state code (e.g., 'CA', 'TX'). Omit for national."),
      sector: z.enum(["RES", "COM", "IND", "ALL"]).optional().describe("Sector: RES=residential, COM=commercial, IND=industrial, ALL=default"),
      data_type: z.enum(["price", "revenue", "sales", "customers"]).optional().describe("Data type (default: price in cents/kWh)"),
      frequency: z.enum(["monthly", "annual"]).optional().describe("Frequency (default: monthly)"),
      start: z.string().optional().describe("Start date (YYYY-MM or YYYY). Default: 2 years ago"),
      end: z.string().optional().describe("End date (YYYY-MM or YYYY). Default: latest available"),
      length: z.number().int().max(5000).optional().describe("Max rows (API max: 5000). Omit to let date range control volume."),
      offset: z.number().int().optional().describe("Row offset for pagination"),
    }),
    execute: async ({ state, sector, data_type, frequency, start, end, length, offset }) => {
      const res = await getElectricity({ state, sector, dataType: data_type, frequency, start, end, length, offset });
      const data = res.response?.data || [];

      if (!data.length) return emptyResponse("No electricity data found.");

      const observations = data.map(row => ({
        period: row.period || null,
        state: String(row.stateDescription || row.stateid || "US"),
        sector: String(row.sectorName || row.sectorid || "All"),
        value: row[data_type || "price"] != null ? Number(row[data_type || "price"]) : (row.value != null ? Number(row.value) : null),
        units: String(row[`${data_type || "price"}-units`] || row.units || ""),
      }));

      return timeseriesResponse(
        `EIA electricity ${data_type || "price"}${state ? ` (${state.toUpperCase()})` : ""}: ${observations.length} observations`,
        {
          rows: observations,
          dateKey: "period",
          valueKey: "value",
          extraFields: ["state", "sector", "units"],
          meta: { dataType: data_type || "price", state: state?.toUpperCase() || null },
        },
      );
    },
  },

  {
    name: "eia_natural_gas",
    description:
      "Get natural gas prices — Henry Hub spot price, citygate, residential, commercial, industrial, electric power.\n\n" +
      "Process codes: PRS (citygate), PRP (electric power), PRC (commercial), " +
      "PRI (industrial), PRR (residential), PNG (Henry Hub spot)",
    annotations: { title: "EIA: Natural Gas Prices", readOnlyHint: true },
    parameters: z.object({
      process: z.string().optional().describe(
        "Price type: 'PRS' (citygate), 'PRP' (electric power), 'PRC' (commercial), " +
        "'PRI' (industrial), 'PRR' (residential). Default shows all.",
      ),
      frequency: z.enum(["monthly", "annual"]).optional().describe("Frequency (default: monthly)"),
      start: z.string().optional().describe("Start date (YYYY-MM). Default: 2 years ago"),
      end: z.string().optional().describe("End date (YYYY-MM). Default: latest available"),
      length: z.number().int().max(5000).optional().describe("Max rows (API max: 5000). Omit to let date range control volume."),
      offset: z.number().int().optional().describe("Row offset for pagination"),
    }),
    execute: async ({ process, frequency, start, end, length, offset }) => {
      const res = await getNaturalGas({ process, frequency, start, end, length, offset });
      const data = res.response?.data || [];

      if (!data.length) return emptyResponse("No natural gas data found.");

      const observations = formatObservations(data);
      return timeseriesResponse(
        `EIA natural gas prices: ${observations.length} observations`,
        {
          rows: observations,
          dateKey: "period",
          valueKey: "value",
          extraFields: ["units", "series", "state", "sector"],
        },
      );
    },
  },

  {
    name: "eia_state_energy",
    description:
      "Get state-level energy data from the State Energy Data System (SEDS). " +
      "Covers production, consumption, expenditures, and prices by energy source for all 50 states.\n\n" +
      "MSN codes (energy data codes):\n" +
      "- TETCB: Total energy consumption (trillion BTU)\n" +
      "- TETCD: Total energy consumption per capita\n" +
      "- TEPRB: Total energy production (trillion BTU)\n" +
      "- ESTCB: Electricity total consumption\n" +
      "- CLTCB: Coal consumption\n" +
      "- NNTCB: Natural gas consumption\n" +
      "- PATCB: Petroleum consumption\n" +
      "- RETCB: Renewable energy consumption\n" +
      "- NUETB: Nuclear energy consumption",
    annotations: { title: "EIA: State Energy Profile", readOnlyHint: true },
    parameters: z.object({
      state: z.string().optional().describe("Two-letter state code (e.g., 'CA'). Omit for all states."),
      msn: z.string().optional().describe(
        "MSN energy data code. 'TETCB' (total consumption, default), 'TETCD' (per capita), " +
        "'TEPRB' (production), 'RETCB' (renewables), 'PATCB' (petroleum)",
      ),
      start: z.string().optional().describe("Start year (YYYY). Default: 5 years ago"),
      end: z.string().optional().describe("End year (YYYY). Default: latest available"),
      length: z.number().int().max(5000).optional().describe("Max rows (API max: 5000). Omit to let date range control volume."),
      offset: z.number().int().optional().describe("Row offset for pagination"),
    }),
    execute: async ({ state, msn, start, end, length, offset }) => {
      const res = await getStateEnergy({ state, msn, start, end, length, offset });
      const data = res.response?.data || [];

      if (!data.length) return emptyResponse("No state energy data found.");

      const observations = data.map(row => ({
        period: row.period || null,
        state: String(row.stateDescription || row.stateId || row.stateid || ""),
        value: row.value != null ? Number(row.value) : null,
        units: String(row.unit || row.units || ""),
        series: String(row.seriesDescription || row.msn || ""),
      }));

      return timeseriesResponse(
        `EIA state energy (${msn || "TETCB"})${state ? ` for ${state.toUpperCase()}` : ""}: ${observations.length} observations`,
        {
          rows: observations,
          dateKey: "period",
          valueKey: "value",
          extraFields: ["state", "units", "series"],
          meta: { msn: msn || "TETCB", state: state?.toUpperCase() || null },
        },
      );
    },
  },

  {
    name: "eia_total_energy",
    description:
      "Get the monthly/annual U.S. energy overview — total production, consumption, imports, exports, " +
      "and prices across all energy sources.\n\n" +
      "MSN codes:\n" +
      "- ELETPUS: Electricity net generation\n" +
      "- ELNIPUS: Electricity net imports\n" +
      "- CLTCPUS: Coal consumption\n" +
      "- NNTCPUS: Natural gas consumption\n" +
      "- PATCPUS: All petroleum consumption\n" +
      "- RETCPUS: Renewable energy consumption\n" +
      "- NUETPUS: Nuclear electric power",
    annotations: { title: "EIA: Total Energy Overview", readOnlyHint: true },
    parameters: z.object({
      msn: z.string().optional().describe("MSN code to filter by. Omit for overview of major categories."),
      frequency: z.enum(["monthly", "annual"]).optional().describe("Frequency (default: monthly)"),
      start: z.string().optional().describe("Start date (YYYY-MM or YYYY). Default: 2 years ago"),
      end: z.string().optional().describe("End date (YYYY-MM or YYYY). Default: latest available"),
      length: z.number().int().max(5000).optional().describe("Max rows (API max: 5000). Omit to let date range control volume."),
      offset: z.number().int().optional().describe("Row offset for pagination"),
    }),
    execute: async ({ msn, frequency, start, end, length, offset }) => {
      const res = await getTotalEnergy({ msn, frequency, start, end, length, offset });
      const data = res.response?.data || [];

      if (!data.length) return emptyResponse("No total energy data found.");

      const observations = data.map(row => ({
        period: row.period || null,
        value: row.value != null ? Number(row.value) : null,
        units: String(row.unit || row.units || ""),
        series: String(row.seriesDescription || row.msn || ""),
      }));

      return timeseriesResponse(
        `EIA total energy overview (${frequency || "monthly"}): ${observations.length} observations`,
        {
          rows: observations,
          dateKey: "period",
          valueKey: "value",
          extraFields: ["units", "series"],
          meta: { frequency: frequency || "monthly" },
        },
      );
    },
  },
];

export const prompts: InputPrompt<any, any>[] = [
  {
    name: "energy_snapshot",
    description: "Current U.S. energy prices, production trends, and state comparisons.",
    load: async () =>
      "Use EIA tools to build a current energy overview:\n\n" +
      "1. eia_petroleum — current WTI and Brent crude prices, retail gasoline prices\n" +
      "2. eia_natural_gas — current natural gas prices\n" +
      "3. eia_electricity — electricity prices by state (show top 5 most/least expensive)\n" +
      "4. eia_total_energy — total U.S. energy overview\n\n" +
      "Also use bls_cpi_breakdown to show the energy component's impact on overall inflation.\n" +
      "Note any recent executive orders from fr_executive_orders related to energy policy.",
  },
];

// ─── Re-export cache control from SDK ────────────────────────────────

export { clearCache } from "../sdk/eia.js";
