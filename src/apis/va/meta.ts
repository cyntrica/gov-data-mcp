/**
 * va module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "va",
  displayName: "VA (Department of Veterans Affairs)",
  category: "Health",
  description:
    "Department of Veterans Affairs — search VA facilities including hospitals, clinics, " +
    "cemeteries, benefits offices, and vet centers by location and type. " +
    "Requires free API key from developer.va.gov.",
  auth: {
    envVar: "VA_API_KEY",
    signup: "https://developer.va.gov/",
  },
  workflow: "va_facilities to search facilities by state, type, and pagination",
  tips:
    "Facility types: 'health' (hospitals/clinics), 'benefits' (regional offices), " +
    "'cemetery' (national cemeteries), 'vet_center' (readjustment counseling). " +
    "Use two-letter state codes: 'CA', 'TX', 'NY'.",
  domains: ["health"],
  crossRef: [
    { question: "health", route: "va_facilities (VA hospitals, clinics, vet centers)" },
  ],
  reference: {
    docs: {
      "VA Developer Portal": "https://developer.va.gov/",
      "Facilities API": "https://developer.va.gov/explore/api/va-facilities",
    },
  },
} satisfies ModuleMeta;
