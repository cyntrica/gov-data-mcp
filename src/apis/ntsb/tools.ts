/**
 * ntsb MCP tools — aviation accidents and multi-mode investigation queries.
 *
 * Docs: https://data.ntsb.gov/carol-main-public/basic-search
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchAviation, queryInvestigations } from "./sdk.js";
import { listResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "ntsb_aviation_accidents",
    description:
      "Search NTSB aviation accident investigation data.\n" +
      "Find accident reports by aircraft type, location, date, or other keywords.\n" +
      "Returns event details, injuries, aircraft info, probable cause, and report status.\n\n" +
      "Example: query='Boeing 737 MAX', query='Cessna engine failure', query='helicopter New York'",
    annotations: { title: "NTSB: Aviation Accidents", readOnlyHint: true },
    parameters: z.object({
      query: z.string().describe("Search text (e.g. 'Boeing 737', 'Cessna engine failure', 'helicopter crash')"),
      limit: z.number().int().min(1).max(100).optional().describe("Max results (default 20)"),
      offset: z.number().int().min(0).optional().describe("Offset for pagination (default 0)"),
    }),
    execute: async ({ query, limit, offset }) => {
      const { records, total } = await searchAviation({ query, limit, offset });
      if (!records.length) return emptyResponse(`No aviation accidents found for '${query}'.`);
      return listResponse(
        `NTSB aviation accidents: ${records.length} of ${total} total for '${query}'`,
        {
          total,
          items: records.map(r => ({
            ntsbNumber: r.NtsbNumber,
            eventDate: r.EventDate,
            city: r.City,
            state: r.State,
            country: r.Country,
            eventType: r.EventType,
            highestInjury: r.HighestInjury,
            fatalInjuries: r.FatalInjuries,
            seriousInjuries: r.SeriousInjuries,
            make: r.Make,
            model: r.Model,
            aircraftCategory: r.AircraftCategory,
            probableCause: r.ProbableCause?.substring(0, 300),
            reportStatus: r.ReportStatus,
          })),
        },
      );
    },
  },

  {
    name: "ntsb_query",
    description:
      "Query any NTSB investigation dataset by transportation mode.\n" +
      "Modes: Aviation, Highway, Marine, Rail, Pipeline.\n" +
      "Returns investigation records with event details, injuries, and probable cause.\n\n" +
      "Example: mode='Highway', query='truck rollover'; mode='Marine', query='ferry collision'",
    annotations: { title: "NTSB: Investigation Query", readOnlyHint: true },
    parameters: z.object({
      mode: z.enum(["Aviation", "Highway", "Marine", "Rail", "Pipeline"]).describe("Transportation mode"),
      query: z.string().describe("Search text for the investigation"),
      limit: z.number().int().min(1).max(100).optional().describe("Max results (default 20)"),
      offset: z.number().int().min(0).optional().describe("Offset for pagination (default 0)"),
    }),
    execute: async ({ mode, query, limit, offset }) => {
      const { records, total } = await queryInvestigations({ mode, query, limit, offset });
      if (!records.length) return emptyResponse(`No ${mode} investigations found for '${query}'.`);
      return listResponse(
        `NTSB ${mode} investigations: ${records.length} of ${total} total for '${query}'`,
        {
          total,
          items: records.map(r => ({
            ntsbNumber: r.NtsbNumber,
            eventDate: r.EventDate,
            city: r.City,
            state: r.State,
            country: r.Country,
            eventType: r.EventType,
            highestInjury: r.HighestInjury,
            fatalInjuries: r.FatalInjuries,
            seriousInjuries: r.SeriousInjuries,
            probableCause: r.ProbableCause?.substring(0, 300),
            reportStatus: r.ReportStatus,
          })),
        },
      );
    },
  },
];
