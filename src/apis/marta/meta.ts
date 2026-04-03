/**
 * marta module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "marta",
  displayName: "MARTA (Metropolitan Atlanta Rapid Transit)",
  category: "State & Local",
  description:
    "Real-time MARTA rail arrival data for Atlanta, GA. Get train arrival predictions with station, line, direction, and GPS coordinates.",
  auth: {
    envVar: "MARTA_API_KEY",
    signup: "https://itsmarta.com/app-developer-resources.aspx",
  },
  workflow:
    "Use marta_train_arrivals to get real-time rail arrival predictions across the entire MARTA rail system.",
  tips:
    "Returns data for all stations at once. Filter client-side by STATION, LINE (RED, GOLD, BLUE, GREEN), or DIRECTION (N, S, E, W). WAITING_SECONDS shows time until arrival.",
  domains: ["transportation"],
  crossRef: [
    { question: "transportation", route: "marta_train_arrivals (Atlanta MARTA rail real-time arrivals)" },
    { question: "state-level", route: "marta_train_arrivals (Atlanta, GA transit data)" },
  ],
} satisfies ModuleMeta;
