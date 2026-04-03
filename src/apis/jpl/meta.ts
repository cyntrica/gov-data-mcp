/**
 * jpl module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "jpl",
  displayName: "JPL (Jet Propulsion Laboratory)",
  category: "Science",
  description:
    "NASA JPL Solar System Dynamics — asteroid/comet close approaches to Earth, " +
    "small body orbital data lookups, and reported fireball/bolide events. " +
    "No API key required.",
  workflow:
    "jpl_close_approaches to find near-Earth objects → jpl_small_body for detailed orbital data → " +
    "jpl_fireball for reported fireball events",
  tips:
    "Close approaches: use date ranges (YYYY-MM-DD), distances in AU (1 AU ≈ 150M km). " +
    "Small body lookup: search by name ('Apophis', 'Bennu'), designation ('2023 DW'), or SPK-ID. " +
    "Fireball data comes from US Government sensors (DoD/DoE).",
  domains: ["international"],
  reference: {
    docs: {
      "SSD API Overview": "https://ssd-api.jpl.nasa.gov/",
      "Close Approach Data (CAD)": "https://ssd-api.jpl.nasa.gov/doc/cad.html",
      "Small-Body Database (SBDB)": "https://ssd-api.jpl.nasa.gov/doc/sbdb.html",
      "Fireball Data": "https://ssd-api.jpl.nasa.gov/doc/fireball.html",
    },
  },
} satisfies ModuleMeta;
