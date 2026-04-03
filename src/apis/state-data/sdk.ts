/**
 * State Data SDK — generic Socrata SODA + ArcGIS REST clients for any US state.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { queryStateDataset, queryStateCategory, queryStateGISLayer } from "us-gov-open-data-mcp/sdk/state-data";
 *
 *   // Query any Socrata dataset by state + dataset ID
 *   const data = await queryStateDataset("MD", "jwfa-fdxs", { where: "year = '2023'" });
 *
 *   // Query by category (looks up dataset ID from registry)
 *   const crime = await queryStateCategory("MD", "crime", { where: "year = '2023'" });
 *
 *   // Query ArcGIS layer
 *   const parcels = await queryStateGISLayer("MD", "parcels", { where: "COUNTY = 'MONTGOMERY'" });
 *
 * Auth: SOCRATA_APP_TOKEN (optional, works cross-domain for all Socrata portals).
 */

import { createClient, qp, type ApiClient } from "../../shared/client.js";
import {
  getStateConfig, getDatasetId, getGISServicePath,
  type DatasetCategory, type GISServiceName,
} from "./registry.js";

// ─── Lazy Client Cache ──────────────────────────────────────────────
// One Socrata client per domain, one GIS client per base URL.
// Created on first use, reused for subsequent requests.

const socrataClients = new Map<string, ApiClient>();
const gisClients = new Map<string, ApiClient>();

function getSocrataClient(domain: string): ApiClient {
  if (!socrataClients.has(domain)) {
    socrataClients.set(domain, createClient({
      baseUrl: `https://${domain}`,
      name: `socrata-${domain}`,
      auth: {
        type: "query",
        envParams: { "$$app_token": "SOCRATA_APP_TOKEN" },
      },
      rateLimit: { perSecond: 5, burst: 15 },
      cacheTtlMs: 60 * 60 * 1000, // 1 hour
    }));
  }
  return socrataClients.get(domain)!;
}

function getGISClient(baseUrl: string): ApiClient {
  if (!gisClients.has(baseUrl)) {
    gisClients.set(baseUrl, createClient({
      baseUrl,
      name: `gis-${new URL(baseUrl).hostname}`,
      rateLimit: { perSecond: 3, burst: 8 },
      cacheTtlMs: 24 * 60 * 60 * 1000, // 24 hours
    }));
  }
  return gisClients.get(baseUrl)!;
}

// ─── Types ──────────────────────────────────────────────────────────

export type SocrataRecord = Record<string, unknown>;

export interface SodaQueryOpts {
  select?: string;
  where?: string;
  order?: string;
  group?: string;
  having?: string;
  q?: string;
  limit?: number;
  offset?: number;
}

export interface ArcGISQueryResult {
  features?: Array<{
    attributes: Record<string, unknown>;
    geometry?: Record<string, unknown>;
  }>;
  fields?: Array<{ name: string; type: string; alias?: string }>;
  exceededTransferLimit?: boolean;
  [key: string]: unknown;
}

export interface GISQueryOpts {
  layerId?: number;
  where?: string;
  outFields?: string;
  returnGeometry?: boolean;
  limit?: number;
  offset?: number;
  orderByFields?: string;
}

// ─── Socrata Public API ─────────────────────────────────────────────

/**
 * Query any Socrata dataset by state code and dataset ID.
 * Works for any state in the registry, even those with no category mappings.
 */
export async function queryStateDataset(
  stateCode: string,
  datasetId: string,
  opts?: SodaQueryOpts,
): Promise<SocrataRecord[]> {
  const config = getStateConfig(stateCode);
  if (!config.socrata) {
    throw new Error(`${config.name} (${config.code}) does not have a Socrata portal in the registry.`);
  }
  const client = getSocrataClient(config.socrata.domain);
  return client.get<SocrataRecord[]>(`/resource/${datasetId}.json`, qp({
    "$select": opts?.select,
    "$where": opts?.where,
    "$order": opts?.order,
    "$group": opts?.group,
    "$having": opts?.having,
    "$q": opts?.q,
    "$limit": opts?.limit ?? 100,
    "$offset": opts?.offset,
  }));
}

/**
 * Query a state's Socrata dataset by category (crime, health, education, etc.).
 * Looks up the dataset ID from the registry. Returns null if category not mapped.
 */
export async function queryStateCategory(
  stateCode: string,
  category: DatasetCategory,
  opts?: SodaQueryOpts,
): Promise<SocrataRecord[] | null> {
  const datasetId = getDatasetId(stateCode, category);
  if (!datasetId) return null;
  return queryStateDataset(stateCode, datasetId, opts);
}

// ─── ArcGIS Public API ──────────────────────────────────────────────

/**
 * Query any ArcGIS REST service layer by state and service path.
 */
export async function queryStateGISLayerRaw(
  stateCode: string,
  servicePath: string,
  opts?: GISQueryOpts,
): Promise<ArcGISQueryResult> {
  const config = getStateConfig(stateCode);
  if (!config.gis) {
    throw new Error(`${config.name} (${config.code}) does not have GIS services in the registry.`);
  }
  const client = getGISClient(config.gis.baseUrl);
  const layerId = opts?.layerId ?? 0;
  return client.get<ArcGISQueryResult>(`/${servicePath}/${layerId}/query`, qp({
    f: "json",
    where: opts?.where ?? "1=1",
    outFields: opts?.outFields ?? "*",
    returnGeometry: opts?.returnGeometry ?? false,
    resultRecordCount: opts?.limit ?? 50,
    resultOffset: opts?.offset,
    orderByFields: opts?.orderByFields,
    outSR: 4326,
  }));
}

/**
 * Query a state's GIS service by name (parcels, boundaries, schools, etc.).
 * Looks up the service path from the registry. Returns null if service not mapped.
 */
export async function queryStateGISLayer(
  stateCode: string,
  serviceName: GISServiceName,
  opts?: GISQueryOpts,
): Promise<ArcGISQueryResult | null> {
  const servicePath = getGISServicePath(stateCode, serviceName);
  if (!servicePath) return null;
  return queryStateGISLayerRaw(stateCode, servicePath, opts);
}

/**
 * List available GIS services for a state.
 */
export async function listStateGISServicesRemote(
  stateCode: string,
  folder?: string,
): Promise<Record<string, unknown>> {
  const config = getStateConfig(stateCode);
  if (!config.gis) {
    throw new Error(`${config.name} (${config.code}) does not have GIS services in the registry.`);
  }
  const client = getGISClient(config.gis.baseUrl);
  const path = folder ? `/${folder}` : "";
  return client.get<Record<string, unknown>>(`${path}`, qp({ f: "json" }));
}

// ─── Cache Control ──────────────────────────────────────────────────

/** Clear all cached responses from all state clients. */
export function clearCache(): void {
  for (const client of socrataClients.values()) client.clearCache();
  for (const client of gisClients.values()) client.clearCache();
}
