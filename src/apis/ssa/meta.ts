/**
 * SSA module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "ssa",
  displayName: "SSA (Social Security Administration)",
  category: "Health",
  description: "Social Security Administration open data — OASDI beneficiary statistics and program data",
  workflow: "ssa_beneficiaries → get beneficiary data links and summary info",
  tips: "SSA publishes aggregate statistics on Social Security beneficiaries, payments, and program participation",
  domains: ["health", "economy"],
} satisfies ModuleMeta;
