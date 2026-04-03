import type { ModuleMeta } from "../../shared/types.js";
export default {
  name: "doe-osti",
  displayName: "DOE OSTI (Scientific Publications & Technical Reports)",
  category: "Science",
  description: "Department of Energy Office of Scientific and Technical Information. Search DOE-funded scientific publications, technical reports, and research metadata via DOE PAGES and OSTI.gov. No API key required.",
  workflow: "doe_publications for searching DOE-funded research by keyword, author, or subject.",
  tips: "Covers DOE-funded research from national labs and universities. Use subject facets to narrow results. Date ranges in YYYY format.",
  domains: ["education", "energy"],
  crossRef: [
    { question: "energy/climate", route: "doe_publications (DOE-funded energy and climate research)" },
  ],
  reference: { docs: { "OSTI API": "https://www.osti.gov/api/v1/docs" } },
} satisfies ModuleMeta;
