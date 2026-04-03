/**
 * path-train module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "path-train",
  displayName: "PATH Train (Port Authority Trans-Hudson)",
  category: "State & Local",
  description:
    "Real-time PATH train arrival times for the NY/NJ metropolitan area. No API key required.",
  workflow:
    "Use path_arrivals to get real-time arrival predictions for all PATH stations.",
  tips:
    "PATH connects Manhattan (NYC) to Jersey City, Hoboken, Harrison, and Newark in New Jersey. No API key required — data is publicly available.",
  domains: ["transportation"],
  crossRef: [
    { question: "transportation", route: "path_arrivals (PATH train real-time arrivals NY/NJ)" },
    { question: "state-level", route: "path_arrivals (New York / New Jersey PATH train data)" },
  ],
} satisfies ModuleMeta;
