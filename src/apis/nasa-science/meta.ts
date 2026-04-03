import type { ModuleMeta } from "../../shared/types.js";
export default {
  name: "nasa-science",
  displayName: "NASA Science (NEO, Space Weather, Mars, Exoplanets)",
  category: "Science",
  description: "NASA science APIs beyond imagery. Near-Earth Objects (asteroids/comets), space weather events (DONKI), Mars Rover photos, Earth natural events (EONET), and NASA TechPort projects. Uses api.nasa.gov (DEMO_KEY available, register for higher limits).",
  auth: { envVar: "NASA_API_KEY", signup: "https://api.nasa.gov/" },
  workflow: "nasa_neo → nasa_donki → nasa_mars_photos → nasa_eonet for different science domains.",
  tips: "DEMO_KEY works without registration (30 req/hr). Register for 1000 req/hr. NEO: search by date range for close approaches. DONKI: solar flares, CMEs, geomagnetic storms. Mars: photos by sol (Mars day) or Earth date.",
  domains: ["international"],
  reference: { docs: { "NASA APIs": "https://api.nasa.gov/" } },
} satisfies ModuleMeta;
