import type { ModuleMeta } from "../../shared/types.js";
export default {
  name: "wmata",
  displayName: "WMATA (Washington DC Metro & Bus)",
  category: "State & Local",
  description:
    "Washington Metropolitan Area Transit Authority (WMATA) — real-time Metro rail predictions, " +
    "train positions, bus predictions, and service incidents for the DC/MD/VA metro area.",
  auth: { envVar: "WMATA_API_KEY", signup: "https://developer.wmata.com/" },
  workflow:
    "wmata_train_predictions for next arrivals → wmata_train_positions for live positions → " +
    "wmata_incidents for service disruptions → wmata_bus_predictions for bus arrivals.",
  tips:
    "Station codes are 3-letter codes (e.g., A01=Metro Center, C05=Rosslyn, F01=Gallery Place). " +
    "Use wmata_train_predictions with 'All' for all stations. " +
    "Incidents include rail delays, bus reroutes, and elevator/escalator outages.",
  domains: ["transportation"],
  crossRef: [
    { question: "transportation", route: "wmata_train_predictions, wmata_incidents (DC Metro real-time transit)" },
    { question: "state-level", route: "wmata_train_predictions (DC/MD/VA metro area transit)" },
  ],
  reference: { docs: { "WMATA API": "https://developer.wmata.com/apis" } },
} satisfies ModuleMeta;
