/**
 * usajobs MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchJobs, getJobDetail } from "./sdk.js";
import { tableResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "usajobs_search",
    description:
      "Search federal job listings on USAJobs.gov by keyword, location, agency, and salary range.\n" +
      "Returns position titles, agencies, locations, salary ranges, and application deadlines.",
    annotations: { title: "USAJobs: Search Jobs", readOnlyHint: true },
    parameters: z.object({
      keyword: z.string().optional().describe("Search keyword (e.g. 'software engineer', 'data analyst', 'cybersecurity')"),
      location: z.string().optional().describe("Location name (e.g. 'Washington, DC', 'Remote', 'California')"),
      agency: z.string().optional().describe("Agency subelement code (e.g. 'HE00' for HHS, 'DJ00' for DOJ)"),
      minimumPay: z.number().optional().describe("Minimum annual salary"),
      maximumPay: z.number().optional().describe("Maximum annual salary"),
      limit: z.number().int().min(1).max(500).optional().describe("Max results (default 25)"),
    }),
    execute: async ({ keyword, location, agency, minimumPay, maximumPay, limit }) => {
      const data = await searchJobs({ keyword, location, agency, minimumPay, maximumPay, limit });
      const items = data.SearchResult?.SearchResultItems ?? [];
      if (!items.length) return emptyResponse(`No federal jobs found${keyword ? ` for '${keyword}'` : ""}${location ? ` in ${location}` : ""}.`);

      return tableResponse(
        `Federal jobs: ${data.SearchResult.SearchResultCount} results${keyword ? ` for '${keyword}'` : ""}${location ? ` in ${location}` : ""}`,
        {
          rows: items.map((item) => {
            const d = item.MatchedObjectDescriptor;
            const pay = d.PositionRemuneration?.[0];
            const loc = d.PositionLocation?.[0];
            return {
              controlNumber: item.MatchedObjectId,
              title: d.PositionTitle,
              organization: d.OrganizationName,
              department: d.DepartmentName,
              location: loc?.LocationName,
              salaryMin: pay?.MinimumRange,
              salaryMax: pay?.MaximumRange,
              payInterval: pay?.RateIntervalCode,
              closeDate: d.ApplicationCloseDate,
              url: d.PositionURI,
            };
          }),
          total: data.SearchResult.SearchResultCount,
        },
      );
    },
  },

  {
    name: "usajobs_detail",
    description:
      "Get full details of a federal job listing by its control number.\n" +
      "Returns duties, qualifications, salary, location, application instructions, and deadlines.",
    annotations: { title: "USAJobs: Job Detail", readOnlyHint: true },
    parameters: z.object({
      controlNumber: z.string().describe("Job control number from usajobs_search results"),
    }),
    execute: async ({ controlNumber }) => {
      const data = await getJobDetail(controlNumber);
      const items = data.SearchResult?.SearchResultItems ?? [];
      if (!items.length) return emptyResponse(`No job found with control number '${controlNumber}'.`);

      const item = items[0];
      const d = item.MatchedObjectDescriptor;
      const pay = d.PositionRemuneration?.[0];
      const loc = d.PositionLocation?.[0];
      const details = d.UserArea?.Details;

      return recordResponse(
        `${d.PositionTitle} — ${d.OrganizationName}`,
        {
          controlNumber: item.MatchedObjectId,
          title: d.PositionTitle,
          organization: d.OrganizationName,
          department: d.DepartmentName,
          location: loc?.LocationName,
          salary: pay ? { min: pay.MinimumRange, max: pay.MaximumRange, interval: pay.RateIntervalCode } : null,
          schedule: d.PositionSchedule?.[0]?.Name,
          offeringType: d.PositionOfferingType?.[0]?.Name,
          category: d.JobCategory?.[0]?.Name,
          openDate: d.PublicationStartDate,
          closeDate: d.ApplicationCloseDate,
          qualifications: d.QualificationSummary,
          majorDuties: details?.MajorDuties,
          agencyStatement: details?.AgencyMarketingStatement,
          url: d.PositionURI,
        },
      );
    },
  },
];
