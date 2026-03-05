/**
 * usda-nass module metadata.
 */


// ─── Metadata ────────────────────────────────────────────────────────

export const name = "usda-nass";
export const displayName = "USDA NASS QuickStats";
export const category = "Agriculture";
export const description = "Agricultural production, crop prices, farm income, livestock, Census of Agriculture data";
export const auth = { envVar: "USDA_NASS_API_KEY", signup: "https://quickstats.nass.usda.gov/api" };
export const workflow = "usda_crop_data or usda_livestock for specific commodities, usda_prices for price trends, usda_ag_query for custom queries";
export const tips = "Commodities: CORN, SOYBEANS, WHEAT, COTTON, CATTLE, HOGS, MILK. States: IA, IL, TX, CA, NE";

export const reference = {
  topCommodities: {
    CORN: "Corn (grain, silage)", SOYBEANS: "Soybeans", WHEAT: "Wheat (winter, spring, durum)",
    COTTON: "Cotton (upland, pima)", RICE: "Rice", SORGHUM: "Sorghum",
    CATTLE: "Cattle (incl. calves)", HOGS: "Hogs", MILK: "Milk (dairy)",
    CHICKENS: "Chickens (broilers, layers)", EGGS: "Eggs",
  },
  categories: {
    "AREA PLANTED": "Acres planted", "AREA HARVESTED": "Acres harvested",
    PRODUCTION: "Total production (bushels, tons, etc.)", YIELD: "Yield per acre",
    "PRICE RECEIVED": "Price received by farmers ($/unit)", INVENTORY: "Livestock inventory (head)",
    "SALES": "Cash receipts from sales",
  },
  docs: {
    "API Docs": "https://quickstats.nass.usda.gov/api",
    "Get Key": "https://quickstats.nass.usda.gov/api#param_define",
    "QuickStats UI": "https://quickstats.nass.usda.gov/",
  },
};

// ─── Tools ───────────────────────────────────────────────────────────

