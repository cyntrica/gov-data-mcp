/**
 * hud module metadata.
 */


// ─── Metadata ────────────────────────────────────────────────────────

export const name = "hud";
export const displayName = "HUD";
export const category = "Demographics";
export const description =
  "Department of Housing and Urban Development — Fair Market Rents (FMR) by bedroom count, Income Limits by household size for counties and metro areas. Essential for affordable housing, Section 8 vouchers, and housing cost analysis.";
export const auth = {
  envVar: "HUD_USER_TOKEN",
  signup: "https://www.huduser.gov/hudapi/public/register",
};
export const workflow =
  "Use hud_list_states to get state codes → hud_list_counties to find county FIPS codes → hud_fair_market_rents for rental data → hud_income_limits for income thresholds.";
export const tips =
  "Entity IDs are county FIPS codes (e.g. '0600000001' for a CA county). Use hud_list_counties to find them. State-level tools accept two-letter codes (CA, TX). FMR data shows HUD-determined fair rents used for Section 8 voucher amounts. Income Limits show Very Low, Extremely Low, and Low income thresholds by household size (1-8 persons).";

// ─── Helpers ─────────────────────────────────────────────────────────

function fmrToRecord(data: Record<string, unknown>): Record<string, unknown> {
  const basic = data.basicdata as Record<string, unknown> | undefined;
  const source = basic ?? data;

  return {
    area_name: source.area_name ?? source.county_name ?? source.metro_name ?? "Unknown area",
    year: source.year ?? data.year ?? null,
    efficiency: source.Efficiency ?? source.efficiency ?? source.rent_eff ?? null,
    oneBedroom: source["One-Bedroom"] ?? source.one_bedroom ?? source.rent_1br ?? null,
    twoBedroom: source["Two-Bedroom"] ?? source.two_bedroom ?? source.rent_2br ?? null,
    threeBedroom: source["Three-Bedroom"] ?? source.three_bedroom ?? source.rent_3br ?? null,
    fourBedroom: source["Four-Bedroom"] ?? source.four_bedroom ?? source.rent_4br ?? null,
  };
}

function incomeLimitsToRecord(data: Record<string, unknown>): Record<string, unknown> {
  return {
    area_name: data.area_name ?? data.county_name ?? data.metro_name ?? "Unknown area",
    year: data.year ?? null,
    median_income: data.median_income ?? data.median ?? null,
    very_low: data.very_low ?? null,
    extremely_low: data.extremely_low ?? null,
    low: data.low ?? null,
  };
}

// ─── Tools ───────────────────────────────────────────────────────────

