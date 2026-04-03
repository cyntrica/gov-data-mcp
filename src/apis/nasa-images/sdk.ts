/**
 * NASA Image & Video Library SDK — search and retrieve NASA media assets.
 *
 * API docs: https://images.nasa.gov/docs/images.nasa.gov%20API.pdf
 * No API key required.
 *
 * Usage:
 *   import { searchMedia, getAsset, getMetadata, getCaptions } from "us-gov-open-data-mcp/sdk/nasa-images";
 *   const results = await searchMedia({ q: "apollo 11" });
 */

import { createClient } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://images-api.nasa.gov",
  name: "nasa-images",
  rateLimit: { perSecond: 5, burst: 10 },
  cacheTtlMs: 60 * 60 * 1000, // 1 hour
});

// ─── Types ───────────────────────────────────────────────────────────

/** A single metadata field from the Collection+JSON data array. */
export interface NasaMediaItem {
  nasa_id: string;
  title: string;
  center?: string;
  date_created?: string;
  media_type: string;
  description?: string;
  description_508?: string;
  keywords?: string[];
  photographer?: string;
  secondary_creator?: string;
  location?: string;
}

/** Parsed search result item (metadata + preview link). */
export interface NasaSearchResult {
  nasa_id: string;
  title: string;
  center?: string;
  date_created?: string;
  media_type: string;
  description?: string;
  keywords?: string[];
  preview?: string;
}

/** Asset rendition (URL to a specific file size/format). */
export interface NasaAssetItem {
  href: string;
}

/** Collection+JSON envelope. */
interface CollectionResponse {
  collection: {
    version: string;
    href: string;
    metadata?: { total_hits: number };
    items?: Array<{
      href: string;
      data: Array<Record<string, any>>;
      links?: Array<{ href: string; rel: string; render?: string }>;
    }>;
  };
}

// ─── Public API ──────────────────────────────────────────────────────

/** Search NASA media (images, videos, audio). */
export async function searchMedia(opts: {
  q?: string;
  center?: string;
  description?: string;
  description_508?: string;
  keywords?: string;
  location?: string;
  media_type?: string;
  nasa_id?: string;
  photographer?: string;
  secondary_creator?: string;
  title?: string;
  year_start?: string;
  year_end?: string;
  page?: number;
  page_size?: number;
}): Promise<{ totalHits: number; items: NasaSearchResult[] }> {
  const data = await api.get<CollectionResponse>("/search", {
    q: opts.q,
    center: opts.center,
    description: opts.description,
    description_508: opts.description_508,
    keywords: opts.keywords,
    location: opts.location,
    media_type: opts.media_type,
    nasa_id: opts.nasa_id,
    photographer: opts.photographer,
    secondary_creator: opts.secondary_creator,
    title: opts.title,
    year_start: opts.year_start,
    year_end: opts.year_end,
    page: opts.page,
    page_size: opts.page_size,
  });

  const totalHits = data.collection.metadata?.total_hits ?? 0;
  const items: NasaSearchResult[] = (data.collection.items ?? []).map((item) => {
    const meta = item.data[0] ?? {};
    const preview = item.links?.find((l) => l.rel === "preview")?.href;
    const desc = (meta.description as string) ?? "";
    return {
      nasa_id: meta.nasa_id as string,
      title: meta.title as string,
      center: meta.center as string | undefined,
      date_created: meta.date_created as string | undefined,
      media_type: meta.media_type as string,
      description: desc.length > 300 ? desc.slice(0, 297) + "..." : desc,
      keywords: meta.keywords as string[] | undefined,
      preview,
    };
  });

  return { totalHits, items };
}

/** Get all renditions (file URLs) for a NASA media asset. */
export async function getAsset(nasaId: string): Promise<{ items: NasaAssetItem[] }> {
  const data = await api.get<CollectionResponse>(`/asset/${encodeURIComponent(nasaId)}`);
  const items: NasaAssetItem[] = (data.collection.items ?? []).map((item) => ({
    href: item.href,
  }));
  return { items };
}

/** Get metadata location URL for a NASA media asset. */
export async function getMetadata(nasaId: string): Promise<{ location: string }> {
  const data = await api.get<{ location: string }>(`/metadata/${encodeURIComponent(nasaId)}`);
  return { location: data.location };
}

/** Get captions location URL for a NASA video asset. */
export async function getCaptions(nasaId: string): Promise<{ location: string }> {
  const data = await api.get<{ location: string }>(`/captions/${encodeURIComponent(nasaId)}`);
  return { location: data.location };
}

/**
 * Clear Cache.
 */
export function clearCache(): void { api.clearCache(); }
