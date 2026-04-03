/**
 * State Data MCP tools — generic tools for querying any US state's open data.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import {
  queryStateDataset, queryStateCategory, queryStateGISLayerRaw,
  queryStateGISLayer, listStateGISServicesRemote,
} from "./sdk.js";
import {
  listStates, listStateCategories, listStateGISServices,
  getStateConfig, STATE_REGISTRY,
  type DatasetCategory, type GISServiceName,
} from "./registry.js";
import { tableResponse, listResponse, recordResponse, emptyResponse } from "../../shared/response.js";

/** All valid state codes for z.enum. */
const stateCodes = Object.keys(STATE_REGISTRY) as [string, ...string[]];

/** Helper: extract attribute rows from ArcGIS result. */
function extractRows(result: { features?: Array<{ attributes: Record<string, unknown> }> }): Record<string, unknown>[] {
  return result?.features?.map(f => f.attributes) ?? [];
}

/** Helper: build a category-based tool that looks up dataset ID from registry. */
function categoryTool(
  name: string,
  title: string,
  description: string,
  category: DatasetCategory,
  extraParams?: z.ZodRawShape,
  buildWhere?: (params: Record<string, unknown>) => string | undefined,
): Tool<any, any> {
  return {
    name,
    description,
    annotations: { title, readOnlyHint: true },
    parameters: z.object({
      state: z.enum(stateCodes).describe("Two-letter state code, e.g. 'MD', 'NY', 'CA'"),
      q: z.string().optional().describe("Full-text search across all fields"),
      where: z.string().optional().describe("SoQL $where filter, e.g. \"year = '2023'\""),
      limit: z.number().int().max(5000).optional().describe("Max results (default 100)"),
      ...extraParams,
    }),
    execute: async (params: Record<string, unknown>) => {
      const { state, q, limit } = params as { state: string; q?: string; where?: string; limit?: number };
      const config = getStateConfig(state);

      // Build where clause from extra params if provided
      const autoWhere = buildWhere ? buildWhere(params) : undefined;
      const where = (params.where as string | undefined) ?? autoWhere;

      const data = await queryStateCategory(state, category, { q, where, limit, order: "year DESC" });
      if (data === null) {
        const available = listStateCategories(state);
        return emptyResponse(
          `${config.name} does not have '${category}' data mapped in the registry. ` +
          (available.length
            ? `Available categories: ${available.join(", ")}. Use state_query with a dataset ID for unmapped data.`
            : `No categories mapped yet. Use state_query with a dataset ID.`),
        );
      }
      if (!data.length) return emptyResponse(`No ${category} data found for ${config.name}.`);
      return tableResponse(`${config.name} ${category}: ${data.length} records`, { rows: data });
    },
  };
}

export const tools: Tool<any, any>[] = [
  // ── Discovery ─────────────────────────────────────────────────────
  {
    name: "state_list",
    description:
      "List all US states in the registry with their data coverage.\n" +
      "Shows which states have Socrata portals, how many dataset categories are mapped, " +
      "and whether GIS services are available.\n" +
      "Use this to see what data is available before querying a specific state.",
    annotations: { title: "State Data: Registry Overview", readOnlyHint: true },
    parameters: z.object({
      state: z.string().optional().describe("Optional: show detailed coverage for a specific state code"),
    }),
    execute: async ({ state }) => {
      if (state) {
        const config = getStateConfig(state);
        const categories = listStateCategories(state);
        const gisServices = listStateGISServices(state);
        return recordResponse(`${config.name} (${config.code}) data coverage`, {
          name: config.name,
          code: config.code,
          socrata: config.socrata ? {
            domain: config.socrata.domain,
            mappedCategories: categories,
            datasetCount: categories.length,
          } : null,
          gis: config.gis ? {
            baseUrl: config.gis.baseUrl,
            mappedServices: gisServices,
            serviceCount: gisServices.length,
          } : null,
        });
      }
      const states = listStates();
      return tableResponse(`State registry: ${states.length} states`, { rows: states });
    },
  },

  // ── Generic Socrata Query ─────────────────────────────────────────
  {
    name: "state_query",
    description:
      "Query any state's Socrata open data dataset by its 4-character ID.\n" +
      "Works for ANY state in the registry, even without category mappings.\n" +
      "Find dataset IDs by browsing the state's portal (e.g., data.ny.gov, opendata.maryland.gov).\n" +
      "Supports full SoQL: $select, $where, $order, $group, $q (full-text), $limit, $offset.",
    annotations: { title: "State Data: Query Any Dataset", readOnlyHint: true },
    parameters: z.object({
      state: z.enum(stateCodes).describe("Two-letter state code"),
      dataset_id: z.string().describe("Socrata 4-character dataset ID, e.g. 'jwfa-fdxs'"),
      select: z.string().optional().describe("SoQL $select: columns to return"),
      where: z.string().optional().describe("SoQL $where: filter condition"),
      order: z.string().optional().describe("SoQL $order: sort clause"),
      group: z.string().optional().describe("SoQL $group: group-by clause"),
      q: z.string().optional().describe("Full-text search"),
      limit: z.number().int().max(5000).optional().describe("Max results (default 100)"),
      offset: z.number().int().optional().describe("Offset for pagination"),
    }),
    execute: async ({ state, dataset_id, select, where, order, group, q, limit, offset }) => {
      const config = getStateConfig(state);
      const data = await queryStateDataset(state, dataset_id, { select, where, order, group, q, limit, offset });
      if (!data?.length) return emptyResponse(`No results for ${config.name} dataset ${dataset_id}.`);
      return tableResponse(`${config.name} dataset ${dataset_id}: ${data.length} records`, { rows: data });
    },
  },

  // ── Category-based Socrata tools ──────────────────────────────────
  categoryTool(
    "state_crime",
    "State Data: Crime Statistics",
    "Query crime statistics for a US state.\n" +
    "Data varies by state: may include violent crime, property crime, arrests, by county/jurisdiction.\n" +
    "Filter by year, jurisdiction, or use full-text search.",
    "crime",
    {
      year: z.string().optional().describe("Filter by year, e.g. '2023'"),
      county: z.string().optional().describe("Filter by county/jurisdiction name"),
    },
    (p) => {
      const parts: string[] = [];
      if (p.year) parts.push(`year = '${p.year}'`);
      if (p.county) parts.push(`jurisdiction = '${p.county}'`);
      return parts.length ? parts.join(" AND ") : undefined;
    },
  ),

  categoryTool(
    "state_health",
    "State Data: Health Indicators",
    "Query health indicator data for a US state.\n" +
    "May include: disease rates, overdose deaths, infant mortality, immunization, hospital data.\n" +
    "Data availability varies by state.",
    "health",
  ),

  categoryTool(
    "state_education",
    "State Data: Education",
    "Query education data for a US state.\n" +
    "May include: school enrollment, assessment scores, graduation rates, demographics.\n" +
    "Filter by county, year, or search by keyword.",
    "education",
    {
      county: z.string().optional().describe("Filter by county name"),
      year: z.string().optional().describe("Filter by year"),
    },
    (p) => {
      const parts: string[] = [];
      if (p.county) parts.push(`county = '${p.county}'`);
      if (p.year) parts.push(`year = '${p.year}'`);
      return parts.length ? parts.join(" AND ") : undefined;
    },
  ),

  categoryTool(
    "state_economy",
    "State Data: Economy",
    "Query economic data for a US state.\n" +
    "May include: GDP, employment, workforce metrics, tax comparisons, income data.\n" +
    "Cross-reference with federal BEA/BLS tools for national context.",
    "economyStates",
  ),

  categoryTool(
    "state_businesses",
    "State Data: Businesses",
    "Query business data for a US state.\n" +
    "May include: business counts, registrations, licenses, industry breakdowns.",
    "businesses",
  ),

  categoryTool(
    "state_property",
    "State Data: Property Assessments",
    "Query property assessment/tax data for a US state.\n" +
    "May include: assessed values, owner info, property details, land use codes.\n" +
    "Filter by county, city, ZIP, or search by address/owner.",
    "property",
    {
      county: z.string().optional().describe("Filter by county name"),
      city: z.string().optional().describe("Filter by city name"),
      zip: z.string().optional().describe("Filter by ZIP code"),
    },
    (p) => {
      const parts: string[] = [];
      if (p.county) parts.push(`county = '${p.county}'`);
      if (p.city) parts.push(`city = '${p.city}'`);
      if (p.zip) parts.push(`zip_code = '${p.zip}'`);
      return parts.length ? parts.join(" AND ") : undefined;
    },
  ),

  categoryTool(
    "state_housing",
    "State Data: Housing",
    "Query housing data for a US state.\n" +
    "May include: building permits, housing units authorized, foreclosure filings.\n" +
    "Cross-reference with HUD tools for federal housing data.",
    "housingPermits",
    {
      county: z.string().optional().describe("Filter by county name"),
      year: z.string().optional().describe("Filter by year"),
    },
    (p) => {
      const parts: string[] = [];
      if (p.county) parts.push(`county = '${p.county}'`);
      if (p.year) parts.push(`year = '${p.year}'`);
      return parts.length ? parts.join(" AND ") : undefined;
    },
  ),

  categoryTool(
    "state_environment",
    "State Data: Environment",
    "Query environmental data for a US state.\n" +
    "May include: air quality violations, water quality assessments, sewer overflows, permits.\n" +
    "Cross-reference with federal EPA tools for national context.",
    "airViolations",
    {
      county: z.string().optional().describe("Filter by county name"),
    },
    (p) => p.county ? `county = '${p.county}'` : undefined,
  ),

  categoryTool(
    "state_transportation",
    "State Data: Transportation",
    "Query transportation data for a US state.\n" +
    "May include: vehicle registrations, EV adoption, traffic data.\n" +
    "For real-time traffic, use state-specific traffic modules (e.g., md_traffic_*).",
    "vehicleRegistrations",
    {
      county: z.string().optional().describe("Filter by county name"),
      year: z.string().optional().describe("Filter by year"),
    },
    (p) => {
      const parts: string[] = [];
      if (p.county) parts.push(`county = '${p.county}'`);
      if (p.year) parts.push(`year = '${p.year}'`);
      return parts.length ? parts.join(" AND ") : undefined;
    },
  ),

  // ── GIS Tools ─────────────────────────────────────────────────────
  {
    name: "state_gis_query",
    description:
      "Query any ArcGIS REST service layer for a US state.\n" +
      "Supports attribute and spatial queries with SQL-like where clauses.\n" +
      "Use state_gis_services to discover available services and layer IDs.\n" +
      "Not all states have GIS services in the registry — use state_list to check.",
    annotations: { title: "State GIS: Query Layer", readOnlyHint: true },
    parameters: z.object({
      state: z.enum(stateCodes).describe("Two-letter state code"),
      service: z.string().describe("Service path, e.g. 'PlanningCadastre/MD_ParcelBoundaries/MapServer'"),
      layer_id: z.number().int().optional().describe("Layer index (default 0)"),
      where: z.string().optional().describe("SQL where clause, e.g. \"COUNTY = 'MONTGOMERY'\""),
      out_fields: z.string().optional().describe("Comma-separated field names (default '*')"),
      return_geometry: z.boolean().optional().describe("Include geometry (default false)"),
      limit: z.number().int().max(1000).optional().describe("Max features (default 50)"),
    }),
    execute: async ({ state, service, layer_id, where, out_fields, return_geometry, limit }) => {
      const config = getStateConfig(state);
      const data = await queryStateGISLayerRaw(state, service, {
        layerId: layer_id,
        where,
        outFields: out_fields,
        returnGeometry: return_geometry,
        limit,
      });
      const rows = extractRows(data);
      if (!rows.length) return emptyResponse(`No features found for ${config.name}.`);
      return tableResponse(
        `${config.name} GIS: ${rows.length} features${data.exceededTransferLimit ? " (more available)" : ""}`,
        { rows },
      );
    },
  },

  {
    name: "state_gis_parcels",
    description:
      "Query property parcel boundaries for a US state via ArcGIS.\n" +
      "Returns parcel ID, owner name, address, land area, and use codes.\n" +
      "Filter by county, owner name, address, or ZIP using SQL where clause.",
    annotations: { title: "State GIS: Property Parcels", readOnlyHint: true },
    parameters: z.object({
      state: z.enum(stateCodes).describe("Two-letter state code"),
      where: z.string().optional().describe("SQL where clause, e.g. \"COUNTY = 'MONTGOMERY'\""),
      limit: z.number().int().max(500).optional().describe("Max parcels (default 50)"),
    }),
    execute: async ({ state, where, limit }) => {
      const config = getStateConfig(state);
      const data = await queryStateGISLayer(state, "parcels", { where, limit });
      if (data === null) return emptyResponse(`${config.name} does not have parcel GIS data in the registry.`);
      const rows = extractRows(data);
      if (!rows.length) return emptyResponse(`No parcels found for ${config.name}.`);
      return tableResponse(`${config.name} parcels: ${rows.length} features`, { rows });
    },
  },

  {
    name: "state_gis_boundaries",
    description:
      "Query political boundaries for a US state via ArcGIS.\n" +
      "May include: counties, municipalities, congressional districts, state legislative districts.\n" +
      "Layer IDs vary by state — use state_gis_services to check available layers.",
    annotations: { title: "State GIS: Political Boundaries", readOnlyHint: true },
    parameters: z.object({
      state: z.enum(stateCodes).describe("Two-letter state code"),
      layer_id: z.number().int().optional().describe("Layer index (default 0, varies by state)"),
      where: z.string().optional().describe("SQL where clause"),
      limit: z.number().int().max(200).optional().describe("Max features (default 50)"),
    }),
    execute: async ({ state, layer_id, where, limit }) => {
      const config = getStateConfig(state);
      const data = await queryStateGISLayer(state, "boundaries", { layerId: layer_id, where, limit });
      if (data === null) return emptyResponse(`${config.name} does not have boundary GIS data in the registry.`);
      const rows = extractRows(data);
      if (!rows.length) return emptyResponse(`No boundaries found for ${config.name}.`);
      return tableResponse(`${config.name} boundaries: ${rows.length} features`, { rows });
    },
  },

  {
    name: "state_gis_services",
    description:
      "Discover available GIS services for a US state.\n" +
      "Lists service folders and layers available on the state's ArcGIS REST endpoint.\n" +
      "Use the results to find service paths for state_gis_query.",
    annotations: { title: "State GIS: Service Directory", readOnlyHint: true },
    parameters: z.object({
      state: z.enum(stateCodes).describe("Two-letter state code"),
      folder: z.string().optional().describe("Service folder to explore, e.g. 'Boundaries', 'Transportation'"),
    }),
    execute: async ({ state, folder }) => {
      const config = getStateConfig(state);
      const data = await listStateGISServicesRemote(state, folder);
      return recordResponse(`${config.name} GIS services${folder ? ` (${folder})` : ""}`, data);
    },
  },
];
