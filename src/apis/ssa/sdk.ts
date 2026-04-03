/**
 * SSA SDK — Social Security Administration open data.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { getBeneficiaryInfo } from "us-gov-open-data-mcp/sdk/ssa";
 *
 *   const info = await getBeneficiaryInfo();
 *
 * No API key required.
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://www.ssa.gov",
  name: "ssa",
  rateLimit: { perSecond: 2, burst: 5 },
  cacheTtlMs: 24 * 60 * 60 * 1000, // 24 hours — SSA data updates infrequently
});

// ─── Functions ──────────────────────────────────────────────────────

/**
 * Get SSA OASDI beneficiary data info and available resources.
 */
export async function getBeneficiaryInfo(): Promise<Record<string, unknown>> {
  // SSA doesn't have a clean REST API; return curated data links
  return {
    source: "Social Security Administration — Office of the Actuary",
    datasets: [
      {
        name: "OASDI Beneficiaries by State and County",
        url: "https://www.ssa.gov/open/data/oasdi-beneficiaries-by-state-and-county.csv",
        format: "CSV",
        description: "Number of OASDI beneficiaries by state and county, with benefit amounts",
      },
      {
        name: "OASDI Beneficiaries by ZIP Code",
        url: "https://www.ssa.gov/open/data/oasdi-beneficiaries-by-zip-code.csv",
        format: "CSV",
        description: "Number of OASDI beneficiaries by ZIP code",
      },
      {
        name: "SSI Recipients by State and County",
        url: "https://www.ssa.gov/open/data/ssi-recipients-by-state-and-county.csv",
        format: "CSV",
        description: "Number of SSI recipients by state and county, with payment amounts",
      },
      {
        name: "SSI Recipients by ZIP Code",
        url: "https://www.ssa.gov/open/data/ssi-recipients-by-zip-code.csv",
        format: "CSV",
        description: "Number of SSI recipients by ZIP code",
      },
    ],
    api_portal: "https://www.ssa.gov/open/",
    notes: "SSA publishes data primarily as downloadable CSV files. These datasets are updated annually.",
  };
}

export const clearCache = () => api.clearCache();
