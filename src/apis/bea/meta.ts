/**
 * bea module metadata.
 */


// ─── Metadata (server.ts reads these) ────────────────────────────────

export const name = "bea";
export const displayName = "Bureau of Economic Analysis";
export const category = "Economic";
export const description = "State-level GDP, GDP by industry, personal income by state, national accounts (NIPA)";
export const auth = { envVar: "BEA_API_KEY", signup: "https://apps.bea.gov/API/signup/" };
export const workflow = "Pick the geographic/industry dimension you need → query with state FIPS or industry code";
export const tips = "Key advantage over FRED: state-level GDP and income breakdowns, GDP by NAICS industry.";

export const reference = {
  nipaTables: {
    T10101: "Real GDP and components (percent change)",
    T10106: "Nominal GDP and components",
    T10111: "GDP percent change contributions",
    T20100: "Personal income and disposition",
    T30100: "Government receipts and expenditures",
  } as Record<string, string>,
  gdpIndustryTables: {
    1: "Value added by industry",
    5: "Contributions to percent change in real GDP",
    6: "Value added as percentage of GDP",
    25: "Real value added by industry",
  } as Record<number, string>,
  regionalTables: {
    SAGDP1: "State annual GDP summary",
    SAGDP9: "Real GDP by state",
    SQGDP1: "State quarterly GDP summary",
    SAINC1: "Personal income, population, per capita income",
    SAINC3: "Per capita personal income",
    SAINC4: "Personal income by major component",
  } as Record<string, string>,
  docs: {
    "User Guide": "https://apps.bea.gov/api/_pdf/bea_web_service_api_user_guide.pdf",
    "Developer Page": "https://apps.bea.gov/developers/",
    "Sign Up": "https://apps.bea.gov/API/signup/",
  },
};

// ─── Tools ───────────────────────────────────────────────────────────

