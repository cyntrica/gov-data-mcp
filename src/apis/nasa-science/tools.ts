import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchNEO, getNEODetail, getDONKI, getMarsPhotos, getEONETEvents } from "./sdk.js";
import { listResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "nasa_neo",
    description: "Search Near-Earth Objects (asteroids/comets) by date range.\nReturns close approach data, estimated diameter, velocity, and hazard assessment.",
    annotations: { title: "NASA: Near-Earth Objects", readOnlyHint: true },
    parameters: z.object({
      start_date: z.string().optional().describe("Start date (YYYY-MM-DD), default today"),
      end_date: z.string().optional().describe("End date (YYYY-MM-DD), max 7 days from start"),
    }),
    execute: async ({ start_date, end_date }) => {
      const data = await searchNEO({ startDate: start_date, endDate: end_date });
      return recordResponse(`NEO feed: ${(data as any)?.element_count ?? 0} objects`, data);
    },
  },
  {
    name: "nasa_neo_detail",
    description: "Get detailed information about a specific Near-Earth Object by asteroid ID.",
    annotations: { title: "NASA: NEO Detail", readOnlyHint: true },
    parameters: z.object({
      asteroid_id: z.string().describe("NEO asteroid ID from nasa_neo results"),
    }),
    execute: async ({ asteroid_id }) => {
      const data = await getNEODetail(asteroid_id);
      return recordResponse(`NEO ${asteroid_id}`, data);
    },
  },
  {
    name: "nasa_donki",
    description: "Get space weather events from NASA DONKI.\nTypes: CME, CMEAnalysis, GST (geomagnetic storm), IPS, FLR (solar flare), SEP, MPC, RBE, HSS, notifications.",
    annotations: { title: "NASA: Space Weather (DONKI)", readOnlyHint: true },
    parameters: z.object({
      type: z.string().optional().describe("Event type: CME, GST, FLR, SEP, notifications (default)"),
      start_date: z.string().optional().describe("Start date (YYYY-MM-DD)"),
      end_date: z.string().optional().describe("End date (YYYY-MM-DD)"),
    }),
    execute: async ({ type, start_date, end_date }) => {
      const data = await getDONKI({ type, startDate: start_date, endDate: end_date });
      if (!Array.isArray(data) || !data.length) return emptyResponse("No DONKI events found.");
      return listResponse(`DONKI ${type ?? "notifications"}: ${data.length} events`, { items: data });
    },
  },
  {
    name: "nasa_mars_photos",
    description: "Get Mars Rover photos by sol (Mars day) or Earth date.\nRovers: curiosity, opportunity, spirit. Cameras: FHAZ, RHAZ, MAST, CHEMCAM, NAVCAM, etc.",
    annotations: { title: "NASA: Mars Rover Photos", readOnlyHint: true },
    parameters: z.object({
      rover: z.string().optional().describe("Rover name: curiosity (default), opportunity, spirit"),
      sol: z.number().int().optional().describe("Mars sol (day) number"),
      earth_date: z.string().optional().describe("Earth date (YYYY-MM-DD). Use sol OR earth_date."),
      camera: z.string().optional().describe("Camera: FHAZ, RHAZ, MAST, CHEMCAM, NAVCAM, etc."),
    }),
    execute: async ({ rover, sol, earth_date, camera }) => {
      const data = await getMarsPhotos({ rover, sol, earthDate: earth_date, camera });
      const photos = (data as any)?.photos;
      if (!Array.isArray(photos) || !photos.length) return emptyResponse("No Mars photos found.");
      return listResponse(`Mars ${rover ?? "curiosity"} photos: ${photos.length}`, { items: photos });
    },
  },
  {
    name: "nasa_eonet",
    description: "Get Earth natural events from NASA EONET.\nCategories: wildfires, severeStorms, volcanoes, seaLakeIce, earthquakes, floods, landslides, etc.",
    annotations: { title: "NASA: Earth Natural Events (EONET)", readOnlyHint: true },
    parameters: z.object({
      category: z.string().optional().describe("Event category: wildfires, severeStorms, volcanoes, etc."),
      status: z.string().optional().describe("Status: open (default) or closed"),
      limit: z.number().int().max(100).optional().describe("Max events (default 20)"),
    }),
    execute: async ({ category, status, limit }) => {
      const data = await getEONETEvents({ category, status, limit });
      const events = (data as any)?.events;
      if (!Array.isArray(events) || !events.length) return emptyResponse("No EONET events found.");
      return listResponse(`EONET events: ${events.length}`, { items: events });
    },
  },
];
