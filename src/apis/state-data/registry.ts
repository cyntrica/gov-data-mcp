/**
 * State Data Registry — maps US state codes to their open data portal URLs and dataset IDs.
 *
 * Adding a new state:
 *   1. Add an entry to STATE_REGISTRY with at minimum the state name and Socrata domain
 *   2. Populate dataset IDs for known categories (crime, health, education, etc.)
 *   3. Add GIS config if the state has an ArcGIS REST endpoint
 *
 * Dataset IDs can be found by browsing each state's Socrata portal and copying the
 * 4-character ID from the dataset URL (e.g., opendata.maryland.gov/resource/jwfa-fdxs).
 */

// ─── Types ──────────────────────────────────────────────────────────

/** Socrata dataset categories. Tools map to these keys. */
export type DatasetCategory =
  | "crime"
  | "crimeStatewide"
  | "crimeMunicipality"
  | "health"
  | "hospitalAlerts"
  | "education"
  | "economyStates"
  | "economyCounties"
  | "economyTaxes"
  | "businesses"
  | "mbeDirectory"
  | "jobsCreated"
  | "property"
  | "foreclosures"
  | "housingPermits"
  | "sewerOverflows"
  | "waterQuality"
  | "airViolations"
  | "waterViolations"
  | "vehicleRegistrations"
  | "evRegistrations";

/** GIS service names. Tools map to these keys. */
export type GISServiceName =
  | "parcels"
  | "boundaries"
  | "trafficAADT"
  | "schools"
  | "fireStations"
  | "policeStations"
  | "enterpriseZones"
  | "watersheds"
  | "wetlands";

/** Configuration for a single state's data portals. */
export interface StateConfig {
  /** Full state name. */
  name: string;
  /** Two-letter state code (uppercase). */
  code: string;
  /** Socrata open data portal config. */
  socrata?: {
    /** Domain name (e.g., "opendata.maryland.gov"). */
    domain: string;
    /** Map of category → Socrata 4-character dataset ID. */
    datasets: Partial<Record<DatasetCategory, string>>;
  };
  /** ArcGIS REST services config. */
  gis?: {
    /** Base URL for ArcGIS REST services (e.g., "https://mdgeodata.md.gov/imap/rest/services"). */
    baseUrl: string;
    /** Map of service name → service path (relative to baseUrl). */
    services: Partial<Record<GISServiceName, string>>;
  };
}

// ─── Registry ───────────────────────────────────────────────────────

/**
 * Master state registry. Keyed by uppercase two-letter state code.
 *
 * States with only a domain and empty datasets still work with `state_query`
 * (users can pass any dataset ID manually). Category-based tools require
 * the corresponding dataset ID to be populated.
 */
export const STATE_REGISTRY: Record<string, StateConfig> = {

  // ══════════════════════════════════════════════════════════════════
  // TIER 1 — Fully populated (Socrata datasets + GIS)
  // ══════════════════════════════════════════════════════════════════

  MD: {
    name: "Maryland",
    code: "MD",
    socrata: {
      domain: "opendata.maryland.gov",
      datasets: {
        crime: "jwfa-fdxs",
        crimeStatewide: "hyg2-hy98",
        crimeMunicipality: "2p5g-xrcb",
        health: "iyvb-gsn5",
        hospitalAlerts: "i384-2f2w",
        education: "9ju3-j8k6",
        economyStates: "gv8w-7mdg",
        economyCounties: "q7q7-usgm",
        economyTaxes: "9rx9-sduc",
        businesses: "ftgf-3uby",
        mbeDirectory: "djj3-7sjc",
        jobsCreated: "c72h-ye9b",
        property: "ed4q-f8tm",
        foreclosures: "w3bc-8mnv",
        housingPermits: "c7z9-v9mr",
        sewerOverflows: "3rgd-zjxx",
        waterQuality: "f8kb-whqm",
        airViolations: "rmgi-dnf3",
        waterViolations: "khga-kd77",
        vehicleRegistrations: "db8v-9ewn",
        evRegistrations: "tugr-unu9",
      },
    },
    gis: {
      baseUrl: "https://mdgeodata.md.gov/imap/rest/services",
      services: {
        parcels: "PlanningCadastre/MD_ParcelBoundaries/MapServer",
        boundaries: "Boundaries/MD_PoliticalBoundaries/MapServer",
        trafficAADT: "Transportation/MD_AnnualAverageDailyTraffic/FeatureServer",
        schools: "Education/MD_SchoolLocations/MapServer",
        fireStations: "PublicSafety/MD_FireStations/MapServer",
        policeStations: "PublicSafety/MD_PoliceStations/MapServer",
        enterpriseZones: "BusinessEconomy/MD_EnterpriseZones/MapServer",
        watersheds: "Hydrology/MD_Watersheds/MapServer",
        wetlands: "Environment/MD_Wetlands/MapServer",
      },
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // TIER 2 — Verified Socrata datasets populated + GIS where available
  // ══════════════════════════════════════════════════════════════════

  NY: {
    name: "New York",
    code: "NY",
    socrata: {
      domain: "data.ny.gov",
      datasets: {
        crime: "34dd-6g2j",                // Index, Violent, Property, Firearm Rates By County: 1990+
        crimeStatewide: "ca8h-8gjq",       // Index Crimes by County and Agency: 1990+
        education: "3cij-nwhw",            // SUNY Campus Locations with Enrollment
        economyStates: "shc7-xcbw",        // Quarterly Census of Employment and Wages Annual: 2000+
        economyCounties: "cwsm-2ns3",      // QCEW Quarterly Data: 2000+
        economyTaxes: "iq85-sdzs",         // Real Property Tax Rates By Municipality: 2004+
        businesses: "n9v6-gdp6",           // Active Corporations: 1800+
        property: "7vem-aaz7",             // Property Assessment Data from Local Rolls
        vehicleRegistrations: "w4pv-hbkt", // Vehicle, Snowmobile, Boat Registrations
        evRegistrations: "3vp6-cxmr",      // Electric Vehicle Registrations
        sewerOverflows: "ephi-ffu6",       // Combined Sewer Overflows: 2013+
        waterQuality: "2v6p-juki",         // Wastewater Treatment Plants (SPDES)
        airViolations: "7hs3-2njf",        // SPDES Multi-Sector General Permit Facilities
        // NOTE: Health data on separate domain health.data.ny.gov (dataset 54ci-sdfi)
      },
    },
    gis: {
      baseUrl: "https://gisservices.its.ny.gov/arcgis/rest/services",
      services: {
        parcels: "NYS_Tax_Parcels_Public/MapServer",
        boundaries: "NYS_Civil_Boundaries/MapServer",
        schools: "NYS_Schools/MapServer",
      },
    },
  },

  CT: {
    name: "Connecticut",
    code: "CT",
    socrata: {
      domain: "data.ct.gov",
      datasets: {
        crime: "7t99-gbjg",               // NIBRS crime data
        health: "rjrv-6g8e",              // Occupational Health Indicators
        education: "7uts-qap4",            // EdSight education data
        economyStates: "h44w-mqs3",        // Current Employment Statistics
        economyCounties: "tuxb-mfwd",      // County Unemployment Rates
        economyTaxes: "jpn6-58uh",         // Quarterly Real GDP
        businesses: "mk5y-yz6u",           // Business Registrations: 2018+
        property: "5mzw-sjtu",             // Real Estate Sales 2001-2023
        waterQuality: "fymp-3ygt",         // Water Quality
        waterViolations: "s9pr-6ptu",      // Water Pollution Control Facilities
        airViolations: "g6kk-cv2t",        // DEEP Enforcement Case Summaries
        evRegistrations: "y7ky-5wcz",      // Electric Vehicle Registration Data
      },
    },
    gis: {
      baseUrl: "https://www.ctgismaps2.ct.gov/arcgis/rest/services",
      services: {},
    },
  },

  WA: {
    name: "Washington",
    code: "WA",
    socrata: {
      domain: "data.wa.gov",
      datasets: {
        crime: "6njs-53y5",               // UCR Summary Reporting System
        crimeStatewide: "vvfu-ry7f",       // UCR NIBRS
        education: "dij7-mbxg",            // Report Card Enrollment 2022-23
        economyStates: "k6up-r824",        // Labor Market Information
        businesses: "4wur-kfnr",           // Business Lookup (Dept of Revenue)
        evRegistrations: "f6w7-q2d2",      // Electric Vehicle Population Data
        vehicleRegistrations: "rpr4-cgyd", // EV Title and Registration Activity
        airViolations: "39v6-dykg",        // Air Quality
      },
    },
    gis: {
      baseUrl: "https://data.wsdot.wa.gov/arcgis/rest/services",
      services: {
        boundaries: "Shared/WashingtonState/MapServer",
        trafficAADT: "FunctionalClass/WSDOTFunctionalClassMap/MapServer",
      },
    },
  },

  TX: {
    name: "Texas",
    code: "TX",
    socrata: {
      domain: "data.texas.gov",
      datasets: {
        crime: "2pv3-q62s",               // Annual Report on Texas Border Crime
        education: "nui6-x374",            // Statewide Accountability Ratings 2022-23
        economyStates: "karz-jr5v",        // Key Economic Indicators
        businesses: "7358-krk7",           // TDLR All Licenses
        vehicleRegistrations: "j5fk-64au", // Registered Vehicles by County
        waterViolations: "7fq8-wig2",      // TCEQ Water Quality Permits Active/Pending
        waterQuality: "6pm5-am5m",         // TCEQ Water Quality General Permits
      },
    },
    gis: {
      baseUrl: "https://feature.tnris.org/arcgis/rest/services",
      services: {
        parcels: "Parcels/Parcels/MapServer",
        boundaries: "City_Boundaries/City_Boundaries/MapServer",
      },
    },
  },

  PA: {
    name: "Pennsylvania",
    code: "PA",
    socrata: {
      domain: "data.pa.gov",
      datasets: {
        crime: "mnei-j72p",               // State Police CAID Dashboard
        health: "azzc-q64m",              // Estimated Drug Overdose Deaths by County
        education: "jpyb-rz7m",           // Public School Enrollment by County 2016+
        economyStates: "rqq6-7e5m",       // LAUS Unemployment CY 1990+
        businesses: "xvd7-5r2c",          // Registered Businesses by County
        waterQuality: "afhy-him4",        // Safe Drinking Water Facilities
        waterViolations: "f6wi-njzk",     // Safe Drinking Water Sample Results
      },
    },
    gis: {
      baseUrl: "https://gis.penndot.gov/arcgis/rest/services",
      services: {},
    },
  },

  NJ: {
    name: "New Jersey",
    code: "NJ",
    socrata: {
      domain: "data.nj.gov",
      datasets: {
        health: "q2dr-ycdm",              // Leading Causes of Death
        property: "ap65-fdqs",            // Property Tax Data
        housingPermits: "w9se-dmra",      // Construction Permit Data
        vehicleRegistrations: "gvur-kt7q", // Vehicle Inspection Data
      },
    },
    gis: {
      baseUrl: "https://maps.nj.gov/arcgis/rest/services",
      services: {
        boundaries: "Framework/Government_Boundaries/MapServer",
      },
    },
  },

  OR: {
    name: "Oregon",
    code: "OR",
    socrata: {
      domain: "data.oregon.gov",
      datasets: {
        businesses: "tckn-sxa6",           // Active Businesses - ALL
      },
    },
    gis: {
      baseUrl: "https://navigator.state.or.us/arcgis/rest/services",
      services: {},
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // TIER 3 — GIS only (no Socrata portal, or non-Socrata portal)
  // ══════════════════════════════════════════════════════════════════

  CA: {
    name: "California",
    code: "CA",
    // NOTE: CA uses CKAN (data.ca.gov), not Socrata. SODA API will not work.
    gis: {
      baseUrl: "https://services.gis.ca.gov/arcgis/rest/services",
      services: {
        boundaries: "Boundaries/Boundaries/MapServer",
      },
    },
  },

  VA: {
    name: "Virginia",
    code: "VA",
    // NOTE: VA uses CKAN (data.virginia.gov), not Socrata.
    gis: {
      baseUrl: "https://gismaps.vdem.virginia.gov/arcgis/rest/services",
      services: {
        parcels: "VA_Base_Layers/VA_Parcels/MapServer",
      },
    },
  },

  NC: {
    name: "North Carolina",
    code: "NC",
    // NOTE: data.nc.gov is not a standard Socrata portal.
    gis: {
      baseUrl: "https://services.nconemap.gov/secure/rest/services",
      services: {
        parcels: "NC1Map_Parcels/MapServer",
        boundaries: "NC1Map_Boundaries/MapServer",
        schools: "NC1Map_Education/MapServer",
        trafficAADT: "NC1Map_Transportation/MapServer",
      },
    },
  },

  OH: {
    name: "Ohio",
    code: "OH",
    // NOTE: OH uses custom DataOhio portal, not Socrata.
    gis: {
      baseUrl: "https://gis.dot.state.oh.us/arcgis/rest/services",
      services: {
        boundaries: "TIMS/Boundaries/MapServer",
      },
    },
  },

  GA: {
    name: "Georgia",
    code: "GA",
    // NOTE: GA uses custom portal (georgiadata.org), not Socrata.
    gis: {
      baseUrl: "https://egis.dot.ga.gov/arcgis/rest/services",
      services: {},
    },
  },

  FL: {
    name: "Florida",
    code: "FL",
    // NOTE: FL has no centralized Socrata portal. Data is fragmented across agencies.
    gis: {
      baseUrl: "https://ca.dep.state.fl.us/arcgis/rest/services",
      services: {},
    },
  },

  IL: {
    name: "Illinois",
    code: "IL",
    // NOTE: data.illinois.gov is hybrid CKAN/Socrata — Socrata catalog is nearly empty.
    gis: {
      baseUrl: "https://geoservices.epa.illinois.gov/arcgis/rest/services",
      services: {
        boundaries: "Political/IllinoisPoliticalBoundaries/MapServer",
      },
    },
  },

  MI: {
    name: "Michigan",
    code: "MI",
    socrata: { domain: "data.michigan.gov", datasets: {} },
    gis: {
      baseUrl: "https://gisago.mcgi.state.mi.us/arcgis/rest/services",
      services: {
        boundaries: "OpenData/boundaries/MapServer",
      },
    },
  },

  AZ: {
    name: "Arizona",
    code: "AZ",
    gis: {
      baseUrl: "https://azgeo.az.gov/arcgis/rest/services",
      services: {
        boundaries: "asld/Counties/MapServer",
        trafficAADT: "adot/FunctionalClass_Publish/MapServer",
      },
    },
  },

  CO: {
    name: "Colorado",
    code: "CO",
    socrata: { domain: "data.colorado.gov", datasets: {} },
    gis: {
      baseUrl: "https://gis.colorado.gov/public/rest/services",
      services: {
        parcels: "Address_and_Parcel/Address_and_Parcel/MapServer",
      },
    },
  },

  MN: {
    name: "Minnesota",
    code: "MN",
    socrata: { domain: "data.mn.gov", datasets: {} },
    gis: {
      baseUrl: "https://arcgis.dnr.state.mn.us/public/rest/services",
      services: {
        parcels: "lam/government_ownership_parcels/MapServer",
      },
    },
  },

  MA: {
    name: "Massachusetts",
    code: "MA",
    socrata: { domain: "data.mass.gov", datasets: {} },
    gis: {
      baseUrl: "https://arcgisserver.digital.mass.gov/arcgisserver/rest/services",
      services: {},
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // TIER 4 — Socrata domain only (datasets to be populated)
  // ══════════════════════════════════════════════════════════════════

  HI: {
    name: "Hawaii",
    code: "HI",
    socrata: { domain: "data.hawaii.gov", datasets: {} },
  },
  MO: {
    name: "Missouri",
    code: "MO",
    socrata: { domain: "data.mo.gov", datasets: {} },
  },
  OK: {
    name: "Oklahoma",
    code: "OK",
    socrata: { domain: "data.ok.gov", datasets: {} },
  },
  AL: {
    name: "Alabama",
    code: "AL",
    socrata: { domain: "open.alabama.gov", datasets: {} },
  },
  LA: {
    name: "Louisiana",
    code: "LA",
    socrata: { domain: "data.louisiana.gov", datasets: {} },
  },
  KY: {
    name: "Kentucky",
    code: "KY",
    socrata: { domain: "data.ky.gov", datasets: {} },
  },
  SC: {
    name: "South Carolina",
    code: "SC",
    socrata: { domain: "data.sc.gov", datasets: {} },
  },
  WI: {
    name: "Wisconsin",
    code: "WI",
    socrata: { domain: "data.wi.gov", datasets: {} },
  },
  IN: {
    name: "Indiana",
    code: "IN",
    socrata: { domain: "data.in.gov", datasets: {} },
  },
  IA: {
    name: "Iowa",
    code: "IA",
    socrata: { domain: "data.iowa.gov", datasets: {} },
  },
  UT: {
    name: "Utah",
    code: "UT",
    socrata: { domain: "opendata.utah.gov", datasets: {} },
  },
  NV: {
    name: "Nevada",
    code: "NV",
    socrata: { domain: "data.nv.gov", datasets: {} },
  },

  // ══════════════════════════════════════════════════════════════════
  // TIER 5 — GIS only (no Socrata portal found)
  // ══════════════════════════════════════════════════════════════════

  DC: {
    name: "District of Columbia",
    code: "DC",
    gis: {
      baseUrl: "https://maps2.dcgis.dc.gov/dcgis/rest/services",
      services: {},
    },
  },
  DE: {
    name: "Delaware",
    code: "DE",
    socrata: { domain: "data.delaware.gov", datasets: {} },
    gis: {
      baseUrl: "https://enterprise.firstmap.delaware.gov/arcgis/rest/services",
      services: {
        boundaries: "Boundaries/DE_Boundaries/MapServer",
        parcels: "PlanningCadastre/DE_Parcels/MapServer",
      },
    },
  },
  VT: {
    name: "Vermont",
    code: "VT",
    socrata: { domain: "data.vermont.gov", datasets: {} },
    gis: {
      baseUrl: "https://anrmaps.vermont.gov/arcgis/rest/services",
      services: {},
    },
  },
  TN: {
    name: "Tennessee",
    code: "TN",
    gis: {
      baseUrl: "https://tnmap.tn.gov/arcgis/rest/services",
      services: {
        boundaries: "ADMINISTRATIVE_BOUNDARIES/AdminBoundaries/MapServer",
      },
    },
  },
  AR: {
    name: "Arkansas",
    code: "AR",
    gis: {
      baseUrl: "https://gis.arkansas.gov/arcgis/rest/services",
      services: {},
    },
  },
  KS: {
    name: "Kansas",
    code: "KS",
    gis: {
      baseUrl: "https://services.kansasgis.org/arcgis/rest/services",
      services: {},
    },
  },
  ME: {
    name: "Maine",
    code: "ME",
    gis: {
      baseUrl: "https://gis.maine.gov/mapservices/rest/services",
      services: {},
    },
  },
  MS: {
    name: "Mississippi",
    code: "MS",
    gis: {
      baseUrl: "https://www.gis.ms.gov/arcgis/rest/services",
      services: {},
    },
  },
  MT: {
    name: "Montana",
    code: "MT",
    gis: {
      baseUrl: "https://gisservicemt.gov/arcgis/rest/services",
      services: {},
    },
  },
  ND: {
    name: "North Dakota",
    code: "ND",
    gis: {
      baseUrl: "https://ndgishub.nd.gov/arcgis/rest/services",
      services: {},
    },
  },
  NE: {
    name: "Nebraska",
    code: "NE",
    gis: {
      baseUrl: "https://giscat.ne.gov/enterprise/rest/services",
      services: {},
    },
  },
  NH: {
    name: "New Hampshire",
    code: "NH",
    gis: {
      baseUrl: "https://maps.dot.nh.gov/arcgis_server/rest/services",
      services: {},
    },
  },
  NM: {
    name: "New Mexico",
    code: "NM",
    gis: {
      baseUrl: "https://data-nmenv.opendata.arcgis.com",
      services: {},
    },
  },
  RI: {
    name: "Rhode Island",
    code: "RI",
    gis: {
      baseUrl: "https://gis.ri.gov/arcgis/rest/services",
      services: {},
    },
  },
  SD: {
    name: "South Dakota",
    code: "SD",
    gis: {
      baseUrl: "https://arcgis.sd.gov/arcgis/rest/services",
      services: {},
    },
  },
  WV: {
    name: "West Virginia",
    code: "WV",
    gis: {
      baseUrl: "https://gis.transportation.wv.gov/arcgis/rest/services",
      services: {},
    },
  },
  WY: {
    name: "Wyoming",
    code: "WY",
    gis: {
      baseUrl: "https://services.wygisc.org/HostGIS/rest/services",
      services: {},
    },
  },
};

// ─── Lookup Helpers ─────────────────────────────────────────────────

/**
 * Get state config by code. Throws descriptive error if not found.
 */
export function getStateConfig(stateCode: string): StateConfig {
  const code = stateCode.toUpperCase();
  const config = STATE_REGISTRY[code];
  if (!config) {
    const available = Object.keys(STATE_REGISTRY).sort().join(", ");
    throw new Error(
      `State '${code}' not found in registry. Available states: ${available}`,
    );
  }
  return config;
}

/**
 * Get Socrata dataset ID for a state and category.
 * Returns undefined if the state doesn't have that category mapped.
 */
export function getDatasetId(stateCode: string, category: DatasetCategory): string | undefined {
  const config = getStateConfig(stateCode);
  return config.socrata?.datasets[category];
}

/**
 * Get GIS service path for a state and service name.
 * Returns undefined if the state doesn't have that service mapped.
 */
export function getGISServicePath(stateCode: string, serviceName: GISServiceName): string | undefined {
  const config = getStateConfig(stateCode);
  return config.gis?.services[serviceName];
}

/**
 * List all states in the registry with their data coverage.
 */
export function listStates(): Array<{
  code: string;
  name: string;
  hasSocrata: boolean;
  socrataDatasets: number;
  hasGIS: boolean;
  gisServices: number;
}> {
  return Object.values(STATE_REGISTRY).map(s => ({
    code: s.code,
    name: s.name,
    hasSocrata: !!s.socrata,
    socrataDatasets: s.socrata ? Object.keys(s.socrata.datasets).length : 0,
    hasGIS: !!s.gis,
    gisServices: s.gis ? Object.keys(s.gis.services).length : 0,
  }));
}

/**
 * List available dataset categories for a state.
 */
export function listStateCategories(stateCode: string): string[] {
  const config = getStateConfig(stateCode);
  if (!config.socrata) return [];
  return Object.keys(config.socrata.datasets);
}

/**
 * List available GIS services for a state.
 */
export function listStateGISServices(stateCode: string): string[] {
  const config = getStateConfig(stateCode);
  if (!config.gis) return [];
  return Object.keys(config.gis.services);
}
