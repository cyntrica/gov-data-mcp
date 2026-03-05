/**
 * FRED module metadata — identity, auth, and reference data.
 *
 * Used by server.ts for instructions generation, resource registration,
 * API key validation, and selective module loading.
 */

export const name = "fred";
export const displayName = "FRED (Federal Reserve Economic Data)";
export const category = "Economic";
export const description = "800K+ economic time series: GDP, CPI, unemployment, interest rates, money supply, housing";
export const auth = { envVar: "FRED_API_KEY", signup: "https://fredaccount.stlouisfed.org/apikeys" };
export const workflow = "fred_search → fred_series_data to get values";
export const tips = "Popular: GDP, UNRATE, CPIAUCSL, FEDFUNDS, DGS10, MORTGAGE30US, M2SL, SP500";

export const reference = {
  popularSeries: {
    GDP: "Gross Domestic Product (quarterly, $B)", UNRATE: "Unemployment Rate (monthly, %)",
    CPIAUCSL: "CPI All Urban Consumers (monthly)", FEDFUNDS: "Fed Funds Rate (monthly, %)",
    DGS10: "10-Year Treasury (daily, %)", MORTGAGE30US: "30-Year Mortgage (weekly, %)",
    M2SL: "M2 Money Stock (monthly, $B)", SP500: "S&P 500 (daily)",
    PAYEMS: "Nonfarm Payrolls (monthly, K)", CIVPART: "Labor Participation (monthly, %)",
    MSPUS: "Median Home Price (quarterly, $)", MEHOINUSA672N: "Median Household Income (annual)",
  },
  docs: {
    "v1 API": "https://fred.stlouisfed.org/docs/api/fred/",
    "v2 API": "https://research.stlouisfed.org/docs/api/fred/v2/",
    "Get Key": "https://fredaccount.stlouisfed.org/apikeys",
  },
};
