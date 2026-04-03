import { z } from "zod";
import type { Tool } from "fastmcp";
import {
  getTrainPredictions, getTrainPositions, getRailIncidents,
  getBusIncidents, getElevatorIncidents, getBusPredictions,
} from "./sdk.js";
import { listResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "wmata_train_predictions",
    description:
      "Get next train arrival predictions at a WMATA Metro station.\n" +
      "Station codes: A01=Metro Center, B01=Gallery Place, C05=Rosslyn, D02=Smithsonian, etc.\n" +
      "Use 'All' or omit for all stations.",
    annotations: { title: "WMATA: Train Predictions", readOnlyHint: true },
    parameters: z.object({
      station: z.string().optional().describe("Station code (e.g., 'A01') or 'All' for all stations"),
    }),
    execute: async ({ station }) => {
      const data = await getTrainPredictions(station);
      const trains = (data as any)?.Trains;
      if (!Array.isArray(trains) || !trains.length) return emptyResponse("No train predictions available.");
      return listResponse(`WMATA predictions: ${trains.length} trains`, { items: trains });
    },
  },
  {
    name: "wmata_train_positions",
    description: "Get real-time positions of all WMATA Metro trains on the system.",
    annotations: { title: "WMATA: Train Positions", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const data = await getTrainPositions();
      const trains = (data as any)?.TrainPositions;
      if (!Array.isArray(trains) || !trains.length) return emptyResponse("No train positions available.");
      return listResponse(`WMATA train positions: ${trains.length} trains`, { items: trains });
    },
  },
  {
    name: "wmata_incidents",
    description: "Get current WMATA service incidents — rail delays, bus disruptions, and elevator/escalator outages.",
    annotations: { title: "WMATA: Service Incidents", readOnlyHint: true },
    parameters: z.object({
      type: z.enum(["rail", "bus", "elevator"]).optional().describe("Incident type (default: all)"),
    }),
    execute: async ({ type }) => {
      if (type === "bus") {
        const data = await getBusIncidents();
        const items = (data as any)?.BusIncidents ?? [];
        if (!items.length) return emptyResponse("No bus incidents.");
        return listResponse(`WMATA bus incidents: ${items.length}`, { items });
      }
      if (type === "elevator") {
        const data = await getElevatorIncidents();
        const items = (data as any)?.ElevatorIncidents ?? [];
        if (!items.length) return emptyResponse("No elevator/escalator outages.");
        return listResponse(`WMATA elevator/escalator outages: ${items.length}`, { items });
      }
      // Default: rail incidents (or all if no type specified)
      const data = await getRailIncidents();
      const items = (data as any)?.Incidents ?? [];
      if (!items.length) return emptyResponse("No rail incidents.");
      return listResponse(`WMATA rail incidents: ${items.length}`, { items });
    },
  },
  {
    name: "wmata_bus_predictions",
    description: "Get next bus arrival predictions at a WMATA bus stop.\nRequires a 7-digit stop ID.",
    annotations: { title: "WMATA: Bus Predictions", readOnlyHint: true },
    parameters: z.object({
      stop_id: z.string().describe("WMATA bus stop ID (7-digit number)"),
    }),
    execute: async ({ stop_id }) => {
      const data = await getBusPredictions(stop_id);
      const preds = (data as any)?.Predictions;
      if (!Array.isArray(preds) || !preds.length) return emptyResponse(`No bus predictions for stop ${stop_id}.`);
      return listResponse(`WMATA bus predictions for stop ${stop_id}: ${preds.length}`, { items: preds });
    },
  },
];
