/**
 * census module metadata.
 */


// ─── Metadata (server.ts reads these) ────────────────────────────────

export const name = "census";
export const displayName = "Census Bureau";
export const category = "Demographics";
export const description = "Population, demographics, income, housing, business data from ACS, Decennial Census";
export const auth = { envVar: "CENSUS_API_KEY", signup: "https://api.census.gov/data/key_signup.html" };
export const workflow = "census_search_variables to find variable codes → census_query with dataset, variables, geography";
export const tips = "Common variables: NAME, B01001_001E (population), B19013_001E (median income), B25077_001E (home value). Datasets: 2023/acs/acs1 (1yr), 2023/acs/acs5 (5yr), 2020/dec/pl (Decennial).";

export const reference = {
};

// ─── Helpers ─────────────────────────────────────────────────────────

/** Convert a row array + headers into an object, coercing numeric values. */
function rowToObject(headers: string[], row: string[]): Record<string, unknown> {
  const geoKeys = new Set(["NAME", "state", "county", "place", "tract", "block group", "zip code tabulation area"]);
  const obj: Record<string, unknown> = {};
  headers.forEach((h, i) => {
    const val = row[i];
    const num = Number(val);
    obj[h] = !geoKeys.has(h) && !isNaN(num) && val !== "" ? num : val;
  });
  return obj;
}

// ─── Tools ───────────────────────────────────────────────────────────

