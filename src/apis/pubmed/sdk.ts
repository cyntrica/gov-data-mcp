/**
 * PubMed (NCBI E-utilities) SDK — typed API client for biomedical literature search.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { search, summary, fetchAbstracts } from "us-gov-open-data-mcp/sdk/pubmed";
 *
 *   const ids = await search({ term: "CRISPR gene therapy" });
 *   const articles = await summary({ ids: ids.esearchresult.idlist });
 *   const abstracts = await fetchAbstracts({ ids: ["12345", "67890"] });
 *
 * API key optional (NCBI_API_KEY) — increases rate limit from 3/sec to 10/sec.
 * Docs: https://www.ncbi.nlm.nih.gov/books/NBK25500/
 */

import { createClient, qp, type Params } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://eutils.ncbi.nlm.nih.gov/entrez/eutils",
  name: "pubmed",
  cacheTtlMs: 60 * 60 * 1000, // 1 hour cache
  rateLimit: { perSecond: 3, burst: 5 }, // without API key; with key it's 10/sec
  auth: {
    type: "query",
    envParams: { api_key: "NCBI_API_KEY" },
  },
});

/** Common query params included in all E-utilities requests (NCBI best practice). */
const COMMON_PARAMS: Params = {
  tool: "us-gov-open-data-mcp",
  email: "mcp@example.com",
};

// ─── Types ───────────────────────────────────────────────────────────

/** ESearch response. */
export interface ESearchResult {
  esearchresult: {
    count: string;
    retmax: string;
    retstart: string;
    idlist: string[];
    querytranslation?: string;
    errorlist?: { phrasesnotfound?: string[]; fieldsnotfound?: string[] };
    warninglist?: { phrasesignored?: string[]; quotedphrasesnotfound?: string[]; outputmessages?: string[] };
  };
}

/** ESummary article record. */
export interface ArticleSummary {
  uid: string;
  pubdate: string;
  epubdate?: string;
  source: string;
  title: string;
  lastauthor?: string;
  sortfirstauthor?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  lang?: string[];
  issn?: string;
  essn?: string;
  pubtype?: string[];
  articleids?: Array<{ idtype: string; value: string }>;
  fulljournalname?: string;
  sortpubdate?: string;
  authors?: Array<{ name: string; authtype?: string }>;
  elocationid?: string;
}

/** ESummary response (raw shape from API). */
export interface ESummaryResult {
  result: {
    uids: string[];
    [pmid: string]: ArticleSummary | string[];
  };
}

/** EInfo database info. */
export interface EInfoResult {
  einforesult: {
    dbinfo?: {
      dbname: string;
      menuname: string;
      description: string;
      dbbuild?: string;
      count: string;
      lastupdate: string;
      fieldlist?: Array<{
        name: string;
        fullname: string;
        description: string;
        termcount?: string;
        isdate?: string;
        isnumerical?: string;
        singletoken?: string;
        hierarchy?: string;
        ishidden?: string;
      }>;
      linklist?: Array<{
        name: string;
        menu: string;
        description: string;
        dbto: string;
      }>;
    };
    dblist?: string[];
  };
}

/** ELink response. */
export interface ELinkResult {
  linksets?: Array<{
    dbfrom: string;
    ids: Array<{ id: string; value: string }>;
    linksetdbs?: Array<{
      dbto: string;
      linkname: string;
      links?: Array<{ id: string; score?: string }>;
    }>;
  }>;
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Search PubMed for articles matching a query.
 *
 * Examples:
 *   const res = await search({ term: "breast cancer treatment" });
 *   const res = await search({ term: "COVID-19 vaccine", sort: "pub_date", max_results: 50 });
 *   const res = await search({ term: "diabetes", min_date: "2023/01/01", max_date: "2024/12/31" });
 */
export async function search(opts: {
  term: string;
  max_results?: number;
  offset?: number;
  sort?: string;
  date_type?: string;
  min_date?: string;
  max_date?: string;
}): Promise<ESearchResult> {
  const params = qp({
    ...COMMON_PARAMS,
    db: "pubmed",
    term: opts.term,
    retmax: opts.max_results ?? 20,
    retstart: opts.offset,
    sort: opts.sort,
    datetype: opts.date_type,
    mindate: opts.min_date,
    maxdate: opts.max_date,
    retmode: "json",
  });
  return api.get<ESearchResult>("/esearch.fcgi", params);
}

/**
 * Get article summaries by PMID(s).
 *
 * Examples:
 *   const res = await summary({ ids: ["12345", "67890"] });
 */
export async function summary(opts: {
  ids: string[];
}): Promise<ArticleSummary[]> {
  if (!opts.ids.length) return [];

  const params = qp({
    ...COMMON_PARAMS,
    db: "pubmed",
    id: opts.ids.join(","),
    retmode: "json",
  });
  const raw = await api.get<ESummaryResult>("/esummary.fcgi", params);

  // Convert the keyed result object to an array
  const articles: ArticleSummary[] = [];
  if (raw.result?.uids) {
    for (const uid of raw.result.uids) {
      const article = raw.result[uid];
      if (article && typeof article === "object" && !Array.isArray(article)) {
        articles.push(article as ArticleSummary);
      }
    }
  }
  return articles;
}

/**
 * Fetch full article abstracts as plain text.
 * NOTE: EFetch does NOT support JSON for PubMed — returns plain text.
 * Uses native fetch() since the createClient expects JSON responses.
 *
 * Examples:
 *   const text = await fetchAbstracts({ ids: ["12345", "67890"] });
 */
export async function fetchAbstracts(opts: {
  ids: string[];
  format?: "text" | "xml";
}): Promise<string> {
  if (!opts.ids.length) return "";

  const apiKey = process.env.NCBI_API_KEY;
  const format = opts.format ?? "text";
  const retmode = format === "xml" ? "xml" : "text";
  const rettype = "abstract";

  const params = new URLSearchParams({
    db: "pubmed",
    id: opts.ids.join(","),
    rettype,
    retmode,
    tool: "us-gov-open-data-mcp",
    email: "mcp@example.com",
  });
  if (apiKey) params.set("api_key", apiKey);

  const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`PubMed EFetch failed: ${res.status} ${res.statusText}`);
  }
  return res.text();
}

/**
 * Get PubMed database info and field definitions.
 *
 * Example:
 *   const info = await dbInfo();
 */
export async function dbInfo(): Promise<EInfoResult> {
  const params = qp({
    ...COMMON_PARAMS,
    db: "pubmed",
    retmode: "json",
  });
  return api.get<EInfoResult>("/einfo.fcgi", params);
}

/**
 * List all available NCBI databases.
 *
 * Example:
 *   const dbs = await listDatabases();
 */
export async function listDatabases(): Promise<EInfoResult> {
  const params = qp({
    ...COMMON_PARAMS,
    retmode: "json",
  });
  return api.get<EInfoResult>("/einfo.fcgi", params);
}

/**
 * Find articles related to a given PMID (with relevance scores).
 *
 * Example:
 *   const related = await findRelated({ pmid: "12345", max_results: 10 });
 */
export async function findRelated(opts: {
  pmid: string;
  max_results?: number;
}): Promise<ELinkResult> {
  const params = qp({
    ...COMMON_PARAMS,
    db: "pubmed",
    dbfrom: "pubmed",
    id: opts.pmid,
    cmd: "neighbor_score",
    retmode: "json",
  });
  return api.get<ELinkResult>("/elink.fcgi", params);
}

/**
 * Find articles that cite a given PMID.
 *
 * Example:
 *   const citedBy = await findCitedBy({ pmid: "12345" });
 */
export async function findCitedBy(opts: {
  pmid: string;
}): Promise<ELinkResult> {
  const params = qp({
    ...COMMON_PARAMS,
    db: "pubmed",
    dbfrom: "pubmed",
    id: opts.pmid,
    cmd: "neighbor",
    linkname: "pubmed_pubmed_citedin",
    retmode: "json",
  });
  return api.get<ELinkResult>("/elink.fcgi", params);
}

/** Clear the cache. */
export function clearCache(): void {
  api.clearCache();
}
