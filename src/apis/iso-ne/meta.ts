/**
 * iso-ne module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "iso-ne",
  displayName: "ISO New England",
  category: "Energy",
  description: "New England electric grid — current system load/demand and generation fuel mix breakdown",
  auth: { envVar: "ISO_NE_AUTH", signup: "https://www.iso-ne.com/markets-operations/iso-express" },
  workflow: "Choose data type → isone_load (system demand) or isone_fuel_mix (generation by fuel type)",
  tips: "ISO-NE covers CT, ME, MA, NH, RI, VT. Fuel mix shows real-time generation breakdown by source (natural gas, nuclear, hydro, wind, solar, etc.). Uses HTTP Basic Auth.",
  domains: ["energy"],
  crossRef: [
    { question: "energy/climate", route: "isone_load, isone_fuel_mix (New England grid demand and generation mix)" },
    { question: "state-level", route: "isone_load, isone_fuel_mix (New England regional energy data)" },
  ],
} satisfies ModuleMeta;
