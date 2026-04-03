import type { ModuleMeta } from "../../shared/types.js";
export default {
  name: "sam-gov",
  displayName: "SAM.gov (Federal Procurement & Entities)",
  category: "Procurement",
  description: "Federal procurement data from SAM.gov. Search contract opportunities, entity registrations, exclusions (debarments), and federal hierarchy. Covers all federal contracting and grants.",
  auth: { envVar: "SAM_API_KEY", signup: "https://sam.gov/content/home" },
  workflow: "sam_opportunities → sam_entities → sam_exclusions for due diligence.",
  tips: "Opportunity search supports keyword, NAICS, set-aside, posted/due dates. Entity search by UEI, CAGE, name. Exclusions for debarment/suspension checks.",
  domains: ["spending", "finance"],
  crossRef: [
    { question: "procurement/contracting", route: "sam_opportunities, sam_entities, sam_exclusions (federal contracting & procurement)" },
  ],
  reference: { docs: { "SAM.gov API": "https://open.gsa.gov/api/get-opportunities-public-api/" } },
} satisfies ModuleMeta;
