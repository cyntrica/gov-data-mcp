/**
 * fda module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "fda",
  displayName: "FDA (OpenFDA)",
  category: "Health",
  description:
    "Comprehensive FDA data: drug adverse events, labels, NDC directory, shortages, approvals; " +
    "device events, 510(k) clearances, classification, PMA, UDI, recalls; " +
    "food recalls & adverse events; animal/vet adverse events; tobacco problem reports; " +
    "substance data, UNII, historical documents, and more. 25+ searchable endpoints.",
  auth: { envVar: "DATA_GOV_API_KEY", signup: "https://open.fda.gov/apis/authentication/" },
  workflow:
    "fda_drug_events/fda_drug_counts for adverse reactions → fda_drug_labels for prescribing info → " +
    "fda_drug_ndc to identify products → fda_approved_drugs for approval history → " +
    "fda_drug_shortages for supply issues → fda_drug_recalls for enforcement actions → " +
    "fda_device_510k/fda_device_pma for device approvals → fda_device_classification for device class → " +
    "fda_count for aggregation on any endpoint",
  tips:
    "API key optional but recommended — without key: 240 req/min, 1,000 req/day per IP; " +
    "with DATA_GOV_API_KEY: 240 req/min, 120,000 req/day. " +
    "Search syntax: 'field:value', 'field:\"Exact Phrase\"', '[20200101+TO+20231231]' for date ranges. " +
    "Combine with '+AND+', '+OR+', '+NOT+'. Use '_exists_:field' or '_missing_:field'. " +
    "For counts, use '.exact' suffix for full phrase counts (e.g. 'brand_name.exact'). " +
    "Without '.exact', multi-word values like 'Class III' count as separate words. " +
    "The fda_count tool works on ANY endpoint — drug, device, food, tobacco, etc.",
  reference: {
    drugEventFields: {
      "patient.drug.openfda.brand_name": "Drug brand name",
      "patient.drug.openfda.generic_name": "Generic drug name",
      "patient.reaction.reactionmeddrapt": "Adverse reaction term",
      "serious": "1=serious, 2=not serious",
      "seriousnessdeath": "1=resulted in death",
      "receivedate": "Date FDA received report (YYYYMMDD)",
    },
    foodRecallFields: {
      "classification": "Class I (most serious), Class II, Class III",
      "reason_for_recall": "Text description of reason",
      "recalling_firm": "Company name",
      "state": "State of recalling firm",
      "status": "Ongoing, Complete, Terminated",
    },
    docs: {
      "OpenFDA": "https://open.fda.gov/",
      "Authentication": "https://open.fda.gov/apis/authentication/",
      "Drug Events": "https://open.fda.gov/apis/drug/event/",
      "Drug Labels": "https://open.fda.gov/apis/drug/label/",
      "Drug NDC": "https://open.fda.gov/apis/drug/ndc/",
      "Drug Shortages": "https://open.fda.gov/apis/drug/drugshortages/",
      "Drugs@FDA": "https://open.fda.gov/apis/drug/drugsfda/",
      "Drug Enforcement": "https://open.fda.gov/apis/drug/enforcement/",
      "Device Events": "https://open.fda.gov/apis/device/event/",
      "Device 510(k)": "https://open.fda.gov/apis/device/510k/",
      "Device Classification": "https://open.fda.gov/apis/device/classification/",
      "Device PMA": "https://open.fda.gov/apis/device/pma/",
      "Device UDI": "https://open.fda.gov/apis/device/udi/",
      "Device Recalls": "https://open.fda.gov/apis/device/recall/",
      "Device Enforcement": "https://open.fda.gov/apis/device/enforcement/",
      "Device Registration": "https://open.fda.gov/apis/device/registrationlisting/",
      "COVID-19 Serology": "https://open.fda.gov/apis/device/covid19serology/",
      "Food Enforcement": "https://open.fda.gov/apis/food/enforcement/",
      "Food Events (CAERS)": "https://open.fda.gov/apis/food/event/",
      "Animal/Vet Events": "https://open.fda.gov/apis/animalandveterinary/event/",
      "Tobacco Problems": "https://open.fda.gov/apis/tobacco/problem/",
      "Historical Docs": "https://open.fda.gov/apis/other/historicaldocument/",
      "NSDE": "https://open.fda.gov/apis/other/nsde/",
      "Substance Data": "https://open.fda.gov/apis/other/substance/",
      "UNII": "https://open.fda.gov/apis/other/unii/",
    },
  },
} satisfies ModuleMeta;
