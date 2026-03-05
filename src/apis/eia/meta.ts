/**
 * eia module metadata.
 */

import { sedsMsnCodes, routes, type EiaObservation } from "./sdk.js";
// ─── Metadata (server.ts reads these) ────────────────────────────────

export const name = "eia";
export const displayName = "Energy Information Administration";
export const category = "Economic";
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

