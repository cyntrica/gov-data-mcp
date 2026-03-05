/**
 * usda-fooddata module metadata.
 */

import { DATA_TYPES } from "./sdk.js";
// ─── Metadata (server.ts reads these) ────────────────────────────────

export const name = "usda-fooddata";
export const displayName = "USDA FoodData Central";
export const category = "Agriculture";
export const description = "Nutritional data for 300K+ foods: calories, macros, vitamins, minerals. Covers branded products, standard reference foods, and survey foods.";
export const auth = { envVar: "DATA_GOV_API_KEY", signup: "https://api.data.gov/signup/" };
export const workflow = "fooddata_search to find foods → fooddata_detail for full nutrient breakdown";
export const tips = "Data types: 'Foundation' (minimally processed), 'SR Legacy' (historical reference), 'Branded' (commercial products), 'Survey' (FNDDS dietary studies). Use Foundation or SR Legacy for generic foods, Branded for specific products.";

export const reference = {
  dataTypes: DATA_TYPES,
  docs: {
    "API Guide": "https://fdc.nal.usda.gov/api-guide",
    "FoodData Central": "https://fdc.nal.usda.gov/",
    "Data Documentation": "https://fdc.nal.usda.gov/data-documentation",
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────

function formatNutrient(n: { nutrientName?: string; value?: number; amount?: number; unitName?: string }) {
  const val = n.value ?? n.amount;
  return val !== undefined ? `${n.nutrientName}: ${val} ${n.unitName || ""}`.trim() : null;
}

// ─── Tools ───────────────────────────────────────────────────────────

