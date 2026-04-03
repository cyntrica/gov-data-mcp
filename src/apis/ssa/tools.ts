/**
 * SSA MCP tools — Social Security beneficiary data.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getBeneficiaryInfo } from "./sdk.js";
import { recordResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "ssa_beneficiaries",
    description:
      "Get SSA OASDI and SSI beneficiary data resources.\nReturns links to downloadable datasets for Social Security beneficiaries by state, county, and ZIP code.",
    annotations: { title: "SSA: Beneficiary Data", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const info = await getBeneficiaryInfo();
      return recordResponse(
        "SSA open data: OASDI and SSI beneficiary datasets available for download",
        info,
      );
    },
  },
];
