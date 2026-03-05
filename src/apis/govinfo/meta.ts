/**
 * govinfo module metadata.
 */


// ─── Metadata (server.ts reads these) ────────────────────────────────

export const name = "govinfo";
export const displayName = "GovInfo";
export const category = "Legislative";
export const description = "Full-text search across Congressional bills, laws, Federal Register, CFR, CBO reports, and more";
export const auth = { envVar: "DATA_GOV_API_KEY", signup: "https://api.data.gov/signup/", note: "Same key as FBI Crime Data" };
export const workflow = "govinfo_search to find publications → govinfo_bill_text for full legislative text";
export const tips = "Package ID format for bills: BILLS-{congress}{type}{number}{version}. Example: BILLS-117hr5376enr (Inflation Reduction Act).";

export const reference = {
};

// ─── Tools ───────────────────────────────────────────────────────────

