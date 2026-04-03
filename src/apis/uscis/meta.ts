/**
 * uscis module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "uscis",
  displayName: "USCIS (U.S. Citizenship and Immigration Services)",
  category: "Legislative",
  description:
    "Check immigration case status by receipt number using the USCIS Case Status Online API. No API key required.",
  workflow:
    "Use uscis_case_status with a receipt number (e.g. 'EAC2190000001') to check the current status of an immigration case.",
  tips:
    "Receipt numbers are 13 characters: 3-letter center code + 10 digits (e.g. 'EAC2190000001', 'WAC2312345678'). Center codes: EAC (Vermont), WAC (California), LIN (Nebraska), SRC (Texas), IOE (online-filed).",
  domains: ["legislation"],
} satisfies ModuleMeta;
