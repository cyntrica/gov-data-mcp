/**
 * uscis MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getCaseStatus } from "./sdk.js";
import { recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "uscis_case_status",
    description:
      "Check the status of a USCIS immigration case by receipt number.\n" +
      "Returns the current case status, form type, and latest action taken.\n" +
      "Receipt numbers are 13 characters: 3-letter center code + 10 digits (e.g. 'EAC2190000001').",
    annotations: { title: "USCIS: Case Status", readOnlyHint: true },
    parameters: z.object({
      receipt_number: z.string().describe("USCIS receipt number (e.g. 'EAC2190000001')"),
    }),
    execute: async (args) => {
      const data = await getCaseStatus(args.receipt_number);
      if (!data || (!data.caseStatus && !data.formType)) {
        return emptyResponse(`No case found for receipt number '${args.receipt_number}'.`);
      }
      return recordResponse(
        `Case ${args.receipt_number}: ${data.caseStatus ?? "Unknown status"}`,
        data as Record<string, unknown>,
      );
    },
  },
];
