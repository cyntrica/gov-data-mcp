/**
 * USDA FoodData Central MCP module — search foods, get nutrition facts, compare nutrients.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchFoods, getFood, listFoods, DATA_TYPES } from "../sdk/usda-fooddata.js";

// ─── Metadata (server.ts reads these) ────────────────────────────────

export const name = "usda-fooddata";
export const displayName = "USDA FoodData Central";
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

export const tools: Tool<any, any>[] = [
  {
    name: "fooddata_search",
    description:
      "Search the USDA FoodData Central database for foods by keyword.\n" +
      "Returns matching foods with basic nutrient info. Covers 300K+ foods including branded products.\n\n" +
      "Data types: 'Foundation' (generic whole foods), 'SR Legacy' (historical USDA reference), " +
      "'Branded' (commercial products with UPC), 'Survey' (FNDDS dietary studies).",
    annotations: { title: "USDA FoodData: Search Foods", readOnlyHint: true },
    parameters: z.object({
      query: z.string().describe("Food search term (e.g. 'chicken breast', 'cheddar cheese', 'apple')"),
      dataType: z.array(z.enum(["Foundation", "Branded", "SR Legacy", "Survey (FNDDS)"])).optional().describe("Filter by data type"),
      brandOwner: z.string().optional().describe("Filter by brand owner for branded foods (e.g. 'Kraft', 'General Mills')"),
      pageSize: z.number().int().max(200).optional().describe("Results per page (default 25, max 200)"),
      pageNumber: z.number().int().optional().describe("Page number (1-based)"),
      sortBy: z.enum(["dataType.keyword", "lowercaseDescription.keyword", "fdcId", "publishedDate"]).optional().describe("Sort field"),
      sortOrder: z.enum(["asc", "desc"]).optional().describe("Sort direction"),
    }),
    execute: async (args) => {
      const data = await searchFoods(args);
      if (!data.foods?.length) return `No foods found for '${args.query}'.`;
      return JSON.stringify({
        summary: `Found ${data.totalHits} foods matching '${args.query}', showing ${data.foods.length} (page ${data.currentPage} of ${data.totalPages})`,
        total: data.totalHits,
        foods: data.foods.map(f => ({
          fdcId: f.fdcId,
          description: f.description,
          dataType: f.dataType,
          brandOwner: f.brandOwner,
          brandName: f.brandName,
          ingredients: f.ingredients,
          servingSize: f.servingSize ? `${f.servingSize} ${f.servingSizeUnit || "g"}` : undefined,
          nutrients: f.foodNutrients?.slice(0, 15).map(formatNutrient).filter(Boolean),
        })),
      });
    },
  },

  {
    name: "fooddata_detail",
    description:
      "Get complete nutritional details for a specific food by its FDC ID.\n" +
      "Returns full nutrient breakdown: calories, protein, fat, carbs, vitamins, minerals, amino acids.\n" +
      "Use fooddata_search first to find FDC IDs.",
    annotations: { title: "USDA FoodData: Food Details", readOnlyHint: true },
    parameters: z.object({
      fdcId: z.number().int().describe("FoodData Central ID (get from fooddata_search results)"),
    }),
    execute: async ({ fdcId }) => {
      const food = await getFood(fdcId);
      return JSON.stringify({
        fdcId: food.fdcId,
        description: food.description,
        dataType: food.dataType,
        brandOwner: food.brandOwner,
        brandName: food.brandName,
        ingredients: food.ingredients,
        servingSize: food.servingSize ? `${food.servingSize} ${food.servingSizeUnit || "g"}` : undefined,
        category: food.foodCategory?.description,
        published: food.publishedDate,
        nutrients: food.foodNutrients?.map(formatNutrient).filter(Boolean),
      });
    },
  },

  {
    name: "fooddata_list",
    description:
      "Browse a paged list of foods from the USDA database.\n" +
      "Useful for exploring available foods by data type without a specific search term.",
    annotations: { title: "USDA FoodData: List Foods", readOnlyHint: true },
    parameters: z.object({
      dataType: z.array(z.enum(["Foundation", "Branded", "SR Legacy", "Survey (FNDDS)"])).optional().describe("Filter by data type"),
      pageSize: z.number().int().max(200).optional().describe("Results per page (default 25, max 200)"),
      pageNumber: z.number().int().optional().describe("Page number (1-based)"),
      sortBy: z.enum(["dataType.keyword", "lowercaseDescription.keyword", "fdcId", "publishedDate"]).optional().describe("Sort field"),
      sortOrder: z.enum(["asc", "desc"]).optional().describe("Sort direction"),
    }),
    execute: async (args) => {
      const data = await listFoods(args);
      if (!data?.length) return "No foods found.";
      return JSON.stringify({
        summary: `Returned ${data.length} foods${args.dataType ? ` (${args.dataType.join(", ")})` : ""}`,
        foods: data.map(f => ({
          fdcId: f.fdcId,
          description: f.description,
          dataType: f.dataType,
          published: f.publishedDate,
        })),
      });
    },
  },
];

export { clearCache } from "../sdk/usda-fooddata.js";
