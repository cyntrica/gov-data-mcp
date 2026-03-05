/**
 * uspto module metadata.
 */


// ─── Metadata ────────────────────────────────────────────────────────

export const name = "uspto";
export const displayName = "USPTO PatentsView";
export const category = "Research";
export const description =
  "U.S. Patent & Trademark Office patent data via PatentsView — search patents by keyword, assignee, inventor, date, or CPC class. Look up inventors and patent-holding organizations. Covers all U.S. utility, design, plant, and reissue patents.";
export const workflow =
  "Use uspto_search_patents to find patents by keyword, company, or inventor → uspto_patent_details for full details on a specific patent → uspto_search_assignees to find companies with the most patents in an area.";
export const tips =
  "Patent types: 'utility' (most common), 'design', 'plant', 'reissue'. CPC sections: A (Human Necessities), B (Operations/Transport), C (Chemistry), D (Textiles), E (Construction), F (Mechanical Engineering), G (Physics), H (Electricity). Use yearFrom/yearTo to filter by grant date. Patent numbers don't have commas (e.g. '11234567' not '11,234,567').";

// ─── Helpers ─────────────────────────────────────────────────────────

function patentToRecord(p: {
  patentNumber: string;
  patentTitle: string;
  patentDate: string;
  patentAbstract: string | null;
  patentType: string | null;
  numClaims: number | null;
  assigneeOrganization: string | null;
  inventorNames: string[];
  cpcGroup: string | null;
}): Record<string, unknown> {
  const record: Record<string, unknown> = {
    patentNumber: p.patentNumber,
    title: p.patentTitle,
    date: p.patentDate,
    type: p.patentType ?? null,
    claims: p.numClaims ?? null,
  };
  if (p.assigneeOrganization) record.assignee = p.assigneeOrganization;
  if (p.inventorNames.length) record.inventors = p.inventorNames;
  if (p.cpcGroup) record.cpc = p.cpcGroup;
  if (p.patentAbstract) record.abstract = p.patentAbstract;
  return record;
}

// ─── Tools ───────────────────────────────────────────────────────────

