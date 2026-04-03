/**
 * State 511 Traffic API Registry.
 *
 * Maps state codes to their 511 traffic API configuration.
 * Most states use the ibi511 platform with identical endpoint patterns.
 * Some states (OH, NC, CA, WA, PA) have unique APIs.
 */

export type TrafficPlatform = "ibi511" | "ohgo" | "ncdot" | "caltrans" | "wsdot" | "penndot" | "chart";

export interface Traffic511Config {
  name: string;
  code: string;
  platform: TrafficPlatform;
  baseUrl: string;
  authEnvVar?: string;
  authType: "query" | "header" | "basic" | "none";
  authParamName?: string;
  docs?: string;
}

/** Standard ibi511 endpoints (relative to baseUrl). */
export const IBI511_ENDPOINTS = {
  incidents: "event",
  cameras: "cameras",
  signs: "messagesigns",
  weather: "weatherstations",
  conditions: "roadconditions",
  alerts: "alerts",
  restAreas: "restareas",
  snowplows: "snowplows",
} as const;

export const TRAFFIC_REGISTRY: Record<string, Traffic511Config> = {
  // ── ibi511 platform states ───────────────────────────────────────
  AZ: {
    name: "Arizona", code: "AZ", platform: "ibi511",
    baseUrl: "https://api.az511.com/api/v2/get",
    authEnvVar: "AZ511_API_KEY", authType: "query", authParamName: "key",
    docs: "https://www.az511.com/developers/doc",
  },
  NV: {
    name: "Nevada", code: "NV", platform: "ibi511",
    baseUrl: "https://www.nvroads.com/api/v2/get",
    authEnvVar: "NV511_API_KEY", authType: "query", authParamName: "key",
    docs: "https://www.nvroads.com/developers/doc",
  },
  UT: {
    name: "Utah", code: "UT", platform: "ibi511",
    baseUrl: "https://prod-ut.ibi511.com/api/v2/get",
    authEnvVar: "UT511_API_KEY", authType: "query", authParamName: "key",
    docs: "https://prod-ut.ibi511.com/developers/doc",
  },
  AK: {
    name: "Alaska", code: "AK", platform: "ibi511",
    baseUrl: "https://511.alaska.gov/api/v2/get",
    authEnvVar: "AK511_API_KEY", authType: "query", authParamName: "key",
    docs: "https://511.alaska.gov/developers/doc",
  },
  ID: {
    name: "Idaho", code: "ID", platform: "ibi511",
    baseUrl: "https://511.idaho.gov/api/v2/get",
    authEnvVar: "ID511_API_KEY", authType: "query", authParamName: "key",
    docs: "https://511.idaho.gov/developers/doc",
  },
  NY: {
    name: "New York", code: "NY", platform: "ibi511",
    baseUrl: "https://511ny.org/api/v2/get",
    authEnvVar: "NY511_API_KEY", authType: "query", authParamName: "key",
    docs: "https://511ny.org/developers/doc",
  },
  CT: {
    name: "Connecticut", code: "CT", platform: "ibi511",
    baseUrl: "https://ctroads.org/api/v2/get",
    authEnvVar: "CT511_API_KEY", authType: "query", authParamName: "key",
    docs: "https://ctroads.org/developers/doc",
  },
  GA: {
    name: "Georgia", code: "GA", platform: "ibi511",
    baseUrl: "https://511ga.org/api/v2/get",
    authEnvVar: "GA511_API_KEY", authType: "query", authParamName: "key",
    docs: "https://511ga.org/developers/doc",
  },
  WI: {
    name: "Wisconsin", code: "WI", platform: "ibi511",
    baseUrl: "https://511wi.gov/api/v2/get",
    authEnvVar: "WI511_API_KEY", authType: "query", authParamName: "key",
    docs: "https://511wi.gov/developers/doc",
  },
  LA: {
    name: "Louisiana", code: "LA", platform: "ibi511",
    baseUrl: "https://511la.org/api/v2/get",
    authEnvVar: "LA511_API_KEY", authType: "query", authParamName: "key",
    docs: "https://www.511la.org/developers/doc",
  },
  AR: {
    name: "Arkansas", code: "AR", platform: "ibi511",
    baseUrl: "https://traveliq.ibi511.com/api/v2/get",
    authEnvVar: "AR511_API_KEY", authType: "query", authParamName: "key",
    docs: "https://traveliq.ibi511.com/developers/doc",
  },

  // ── Unique platform states ───────────────────────────────────────
  OH: {
    name: "Ohio", code: "OH", platform: "ohgo",
    baseUrl: "https://publicapi.ohgo.com/api/v1",
    authEnvVar: "OHGO_API_KEY", authType: "header", authParamName: "Authorization",
    docs: "https://publicapi.ohgo.com/",
  },
  NC: {
    name: "North Carolina", code: "NC", platform: "ncdot",
    baseUrl: "https://eapps.ncdot.gov/services/traffic-prod/v1",
    authType: "none",
    docs: "https://tims.ncdot.gov/tims/V2/webservices",
  },
  WA: {
    name: "Washington", code: "WA", platform: "wsdot",
    baseUrl: "https://wsdot.wa.gov/Traffic/api",
    authEnvVar: "WSDOT_ACCESS_CODE", authType: "query", authParamName: "AccessCode",
    docs: "https://wsdot.wa.gov/traffic/api/",
  },
  // MD already has its own md-traffic module (CHART)
};

export function getTrafficConfig(stateCode: string): Traffic511Config {
  const code = stateCode.toUpperCase();
  const config = TRAFFIC_REGISTRY[code];
  if (!config) {
    const available = Object.keys(TRAFFIC_REGISTRY).sort().join(", ");
    throw new Error(`State '${code}' not found in 511 traffic registry. Available: ${available}`);
  }
  return config;
}

export function listTrafficStates(): Array<{ code: string; name: string; platform: string }> {
  return Object.values(TRAFFIC_REGISTRY).map(c => ({ code: c.code, name: c.name, platform: c.platform }));
}
