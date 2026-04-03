/**
 * calfire MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getIncidents, type CalfireFeature } from "./sdk.js";
import { listResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "calfire_incidents",
    description:
      "Get California wildfire incidents from CAL FIRE — active fires or historical incidents by year.\n\n" +
      "Returns incident details including name, location, county, acres burned, containment %, " +
      "structures damaged/destroyed, injuries, fatalities, and GeoJSON boundaries.\n\n" +
      "Active fires update frequently during fire season (May-November).",
    annotations: { title: "CAL FIRE: Wildfire Incidents", readOnlyHint: true },
    parameters: z.object({
      active: z.boolean().optional().describe("true for active fires (default), false for historical"),
      year: z.number().int().min(2000).optional().describe(
        "Year for historical data (e.g., 2023). Only used when active=false.",
      ),
    }),
    execute: async ({ active, year }) => {
      const inactive = active === false;
      const res = await getIncidents({ inactive, year });
      const features = (res.features || []) as CalfireFeature[];

      if (!features.length) {
        const label = inactive ? `historical (${year || "all"})` : "active";
        return emptyResponse(`No CAL FIRE ${label} incidents found.`);
      }

      const items = features.map(f => {
        const p = f.properties || {};
        return {
          name: p.Name || "",
          location: p.Location || "",
          county: p.County || "",
          acresBurned: p.AcresBurned ?? null,
          percentContained: p.PercentContained ?? null,
          startDate: p.StartDate || "",
          extinguishedDate: p.ExtinguishedDate || null,
          structuresDamaged: p.StructuresDamaged ?? null,
          structuresDestroyed: p.StructuresDestroyed ?? null,
          injuries: p.Injuries ?? null,
          fatalities: p.Fatalities ?? null,
          personnelInvolved: p.PersonnelInvolved ?? null,
          status: p.Status || "",
          hasGeometry: !!(f.geometry && f.geometry.coordinates),
        };
      });

      const label = inactive ? `historical (${year || "all"})` : "active";
      return listResponse(
        `CAL FIRE ${label} incidents: ${items.length} fires`,
        {
          items,
          meta: { active: !inactive, year: year || null },
        },
      );
    },
  },
];
