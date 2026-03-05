/**
 * fda MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchDrugEvents, searchDrugLabels, searchFoodRecalls, searchDeviceEvents, countDrugEvents, searchDrugRecalls, searchApprovedDrugs, searchFoodAdverseEvents, searchDeviceRecalls } from "./sdk.js";
import { tableResponse, listResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "fda_drug_events",
    description:
      "Search FDA adverse drug event reports — side effects, hospitalizations, deaths associated with drugs.\n" +
      "Over 20 million reports. Search by drug name, reaction, seriousness.\n\n" +
      "Example searches:\n" +
      "- 'patient.drug.openfda.brand_name:aspirin' — events involving aspirin\n" +
      "- 'patient.drug.openfda.generic_name:ibuprofen+AND+serious:1' — serious ibuprofen events\n" +
      "- 'patient.reaction.reactionmeddrapt:nausea' — events where nausea was reported",
    annotations: { title: "FDA: Drug Adverse Events", readOnlyHint: true },
    parameters: z.object({
      search: z.string().optional().describe("OpenFDA search query. Examples: 'patient.drug.openfda.brand_name:tylenol', 'serious:1+AND+seriousnessdeath:1'"),
      limit: z.number().int().max(100).optional().describe("Max results (default 10)"),
    }),
    execute: async ({ search, limit }) => {
      const data = await searchDrugEvents({ search, limit });
      if (!data.results?.length) return emptyResponse("No drug event reports found.");
      return listResponse(
        `FDA drug adverse events: ${data.meta?.results?.total ?? "?"} total reports, showing ${data.results.length}`,
        {
          total: data.meta?.results?.total,
          items: data.results.slice(0, 20).map((r: any) => ({
            reportId: r.safetyreportid,
            serious: r.serious === "1",
            death: r.seriousnessdeath === "1",
            receiveDate: r.receivedate,
            drugs: r.patient?.drug?.map((d: any) => d.medicinalproduct || d.openfda?.brand_name?.[0]).filter(Boolean),
            reactions: r.patient?.reaction?.map((rx: any) => rx.reactionmeddrapt).filter(Boolean),
          })),
        },
      );
    },
  },

  {
    name: "fda_drug_counts",
    description:
      "Aggregate/count FDA drug adverse event data by any field.\n" +
      "Great for finding: most reported drugs, most common side effects, trends over time.\n\n" +
      "Common count fields:\n" +
      "- 'patient.reaction.reactionmeddrapt.exact' — most common adverse reactions\n" +
      "- 'patient.drug.openfda.brand_name.exact' — most reported drug brands\n" +
      "- 'patient.drug.openfda.generic_name.exact' — most reported generic names\n" +
      "- 'receivedate' — reports over time\n" +
      "- 'primarysource.reportercountry.exact' — reports by country",
    annotations: { title: "FDA: Drug Event Counts", readOnlyHint: true },
    parameters: z.object({
      count_field: z.string().describe("Field to count/aggregate by. E.g. 'patient.reaction.reactionmeddrapt.exact'"),
      search: z.string().optional().describe("Optional search filter, e.g. 'patient.drug.openfda.brand_name:aspirin'"),
      limit: z.number().int().max(1000).optional().describe("Max count results (default 10)"),
    }),
    execute: async ({ count_field, search, limit }) => {
      const data = await countDrugEvents(count_field, { search, limit });
      if (!data.results?.length) return emptyResponse("No count data found.");
      return tableResponse(
        `FDA drug event counts by ${count_field}: ${data.results.length} categories`,
        {
          rows: data.results.slice(0, 50),
          meta: { field: count_field },
        },
      );
    },
  },

  {
    name: "fda_food_recalls",
    description:
      "Search FDA food recall enforcement reports.\n" +
      "Classifications: 'Class I' (most dangerous — may cause death), 'Class II' (may cause temporary health problems), 'Class III' (unlikely to cause health problems).\n\n" +
      "Example searches:\n" +
      "- 'classification:\"Class I\"' — most serious recalls\n" +
      "- 'recalling_firm:tyson' — recalls by a specific company\n" +
      "- 'reason_for_recall:listeria' — recalls due to listeria",
    annotations: { title: "FDA: Food Recalls", readOnlyHint: true },
    parameters: z.object({
      search: z.string().optional().describe("OpenFDA search: 'classification:\"Class I\"', 'reason_for_recall:salmonella', 'state:CA'"),
      limit: z.number().int().max(100).optional().describe("Max results (default 10)"),
    }),
    execute: async ({ search, limit }) => {
      const data = await searchFoodRecalls({ search, limit });
      if (!data.results?.length) return emptyResponse("No food recalls found.");
      return listResponse(
        `FDA food recalls: ${data.meta?.results?.total ?? "?"} total, showing ${data.results.length}`,
        {
          total: data.meta?.results?.total,
          items: data.results.slice(0, 20).map((r: any) => ({
            classification: r.classification,
            reason: r.reason_for_recall,
            firm: r.recalling_firm,
            state: r.state,
            status: r.status,
            productDescription: r.product_description?.substring(0, 200),
            recallDate: r.recall_initiation_date,
            distribution: r.distribution_pattern?.substring(0, 200),
          })),
        },
      );
    },
  },

  {
    name: "fda_device_events",
    description: "Search FDA medical device adverse event reports — injuries, malfunctions, deaths from medical devices.",
    annotations: { title: "FDA: Device Events", readOnlyHint: true },
    parameters: z.object({
      search: z.string().optional().describe("OpenFDA search: 'device.generic_name:pacemaker', 'event_type:death'"),
      limit: z.number().int().max(100).optional().describe("Max results (default 10)"),
    }),
    execute: async ({ search, limit }) => {
      const data = await searchDeviceEvents({ search, limit });
      if (!data.results?.length) return emptyResponse("No device event reports found.");
      return listResponse(
        `FDA device events: ${data.meta?.results?.total ?? "?"} total, showing ${data.results.length}`,
        {
          total: data.meta?.results?.total,
          items: data.results.slice(0, 20).map((r: any) => ({
            eventType: r.event_type,
            date: r.date_received,
            deviceName: r.device?.[0]?.generic_name,
            manufacturer: r.device?.[0]?.manufacturer_d_name,
            description: (r.mdr_text?.[0]?.text || "").substring(0, 300),
          })),
        },
      );
    },
  },

  // ─── New endpoints ──────────────────────────────────────────────

  {
    name: "fda_drug_recalls",
    description:
      "Search FDA drug recall enforcement reports.\n" +
      "Find recalled drugs by classification (Class I=most serious), company, or reason.",
    annotations: { title: "FDA: Drug Recalls", readOnlyHint: true },
    parameters: z.object({
      search: z.string().optional().describe("OpenFDA search: 'classification:\"Class I\"', 'recalling_firm:\"Pfizer\"'"),
      limit: z.number().int().max(100).optional().describe("Max results (default 10)"),
    }),
    execute: async ({ search, limit }) => {
      const data = await searchDrugRecalls({ search, limit });
      if (!data.results?.length) return emptyResponse("No drug recalls found.");
      return listResponse(
        `FDA drug recalls: ${data.meta?.results?.total ?? "?"} total, showing ${data.results.length}`,
        {
          total: data.meta?.results?.total,
          items: data.results.slice(0, 20).map((r: any) => ({
            recallNumber: r.recall_number, classification: r.classification,
            firm: r.recalling_firm, date: r.recall_initiation_date,
            reason: r.reason_for_recall, product: r.product_description?.substring(0, 200),
            status: r.status,
          })),
        },
      );
    },
  },

  {
    name: "fda_approved_drugs",
    description:
      "Search FDA-approved drugs (Drugs@FDA database).\n" +
      "Find approved drugs by brand name, sponsor/manufacturer, or application number.\n" +
      "Shows approval history, active ingredients, and marketing status.",
    annotations: { title: "FDA: Approved Drugs", readOnlyHint: true },
    parameters: z.object({
      search: z.string().optional().describe("OpenFDA search: 'openfda.brand_name:\"Ozempic\"', 'sponsor_name:\"Pfizer\"'"),
      limit: z.number().int().max(100).optional().describe("Max results (default 10)"),
    }),
    execute: async ({ search, limit }) => {
      const data = await searchApprovedDrugs({ search, limit });
      if (!data.results?.length) return emptyResponse("No approved drugs found.");
      return listResponse(
        `FDA approved drugs: ${data.meta?.results?.total ?? "?"} total, showing ${data.results.length}`,
        {
          total: data.meta?.results?.total,
          items: data.results.slice(0, 20).map((r: any) => ({
            applicationNumber: r.application_number, sponsor: r.sponsor_name,
            products: r.products?.map((p: any) => ({
              brandName: p.brand_name, route: p.route, dosageForm: p.dosage_form,
              activeIngredients: p.active_ingredients?.map((i: any) => `${i.name} ${i.strength}`).join(", "),
              marketingStatus: p.marketing_status,
            })),
            latestSubmission: r.submissions?.[0] ? {
              type: r.submissions[0].submission_type,
              status: r.submissions[0].submission_status,
              date: r.submissions[0].submission_status_date,
            } : undefined,
          })),
        },
      );
    },
  },

  {
    name: "fda_food_adverse_events",
    description:
      "Search FDA food adverse event reports (CAERS database).\n" +
      "Find reports of illnesses, allergic reactions, and injuries from foods and dietary supplements.",
    annotations: { title: "FDA: Food Adverse Events", readOnlyHint: true },
    parameters: z.object({
      search: z.string().optional().describe("OpenFDA search: 'products.industry_name:\"Dietary Supplements\"', 'reactions:\"hospitalization\"'"),
      limit: z.number().int().max(100).optional().describe("Max results (default 10)"),
    }),
    execute: async ({ search, limit }) => {
      const data = await searchFoodAdverseEvents({ search, limit });
      if (!data.results?.length) return emptyResponse("No food adverse event reports found.");
      return listResponse(
        `FDA food adverse events: ${data.meta?.results?.total ?? "?"} total, showing ${data.results.length}`,
        {
          total: data.meta?.results?.total,
          items: data.results.slice(0, 20).map((r: any) => ({
            reportNumber: r.report_number, date: r.date_created,
            outcomes: r.outcomes, reactions: r.reactions,
            products: r.products?.map((p: any) => `${p.name_brand ?? "?"} (${p.industry_name ?? "?"})`.trim()),
            consumer: r.consumer,
          })),
        },
      );
    },
  },

  {
    name: "fda_device_recalls",
    description:
      "Search FDA medical device recall reports.\n" +
      "Find recalled devices by name, manufacturer, or reason for recall.",
    annotations: { title: "FDA: Device Recalls", readOnlyHint: true },
    parameters: z.object({
      search: z.string().optional().describe("OpenFDA search: 'openfda.device_name:\"pacemaker\"', 'reason_for_recall:\"software\"'"),
      limit: z.number().int().max(100).optional().describe("Max results (default 10)"),
    }),
    execute: async ({ search, limit }) => {
      const data = await searchDeviceRecalls({ search, limit });
      if (!data.results?.length) return emptyResponse("No device recalls found.");
      return listResponse(
        `FDA device recalls: ${data.meta?.results?.total ?? "?"} total, showing ${data.results.length}`,
        {
          total: data.meta?.results?.total,
          items: data.results.slice(0, 20).map((r: any) => ({
            eventNumber: r.res_event_number,
            product: r.product_description?.substring(0, 200),
            reason: r.reason_for_recall?.substring(0, 300),
            rootCause: r.root_cause_description,
            deviceName: r.openfda?.device_name,
            deviceClass: r.openfda?.device_class,
          })),
        },
      );
    },
  },
];
