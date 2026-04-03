/**
 * cftc module metadata.
 */

import { DATASET_IDS } from "./sdk.js";
import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "cftc",
  displayName: "CFTC (Commodity Futures Trading Commission)",
  category: "Financial",
  description:
    "Commitments of Traders (COT) reports from the CFTC. Weekly position data for futures and options markets: commercial vs speculative positions, producer/merchant/processor/user breakdowns, asset manager and leveraged fund positions. Covers all U.S. futures exchanges.",
  workflow:
    "cftc_products to find available markets/commodities → cftc_cot_legacy for traditional commercial/non-commercial breakdown → cftc_cot_disaggregated for producer/merchant/swap dealer/managed money breakdown → cftc_cot_tff for financial futures (asset manager/leveraged/dealer) → cftc_cot_cit for supplemental commodity index trader data",
  tips:
    "Data updates weekly (Tuesday snapshot, Friday release). Use market_name to filter by commodity/market (e.g. 'WHEAT', 'CRUDE OIL', 'S&P 500'). futures_only=true for futures-only reports, false for combined futures+options. Legacy report is simplest (commercial vs non-commercial). Disaggregated breaks out producer/merchant, swap dealer, managed money, other reportables. TFF is for financial futures only. CIT supplements legacy with commodity index trader positions. Limit defaults to 100, max 50000.",
  domains: ["finance"],
  crossRef: [
    { question: "banking", route: "cftc_cot_tff (financial futures positioning by asset managers, leveraged funds, dealers)" },
    { question: "agriculture", route: "cftc_cot_legacy, cftc_cot_disaggregated (agricultural commodity futures positions)" },
    { question: "energy/climate", route: "cftc_cot_legacy, cftc_cot_disaggregated (energy commodity futures: crude oil, natural gas)" },
  ],
  reference: {
    datasetIds: DATASET_IDS,
    docs: {
      "COT Reports": "https://www.cftc.gov/MarketReports/CommitmentsofTraders/index.htm",
      "SODA API": "https://dev.socrata.com/docs/queries/",
    },
  },
} satisfies ModuleMeta;
