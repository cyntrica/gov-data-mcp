/**
 * pubmed MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { listResponse, recordResponse, emptyResponse } from "../../shared/response.js";
import * as sdk from "./sdk.js";
import type { ArticleSummary } from "./sdk.js";

// ─── Helpers ────────────────────────────────────────────────────────

function articleToRecord(a: ArticleSummary): Record<string, unknown> {
  const record: Record<string, unknown> = {
    pmid: a.uid,
    title: a.title ?? "Untitled",
    authors: a.authors?.map(au => au.name).join(", ") ?? null,
    journal: a.fulljournalname ?? a.source ?? null,
    pubdate: a.pubdate ?? null,
    volume: a.volume ?? null,
    issue: a.issue ?? null,
    pages: a.pages ?? null,
  };

  // Extract DOI from articleids if available
  const doi = a.articleids?.find(id => id.idtype === "doi");
  if (doi) record.doi = doi.value;

  // Extract PMC ID if available
  const pmc = a.articleids?.find(id => id.idtype === "pmc");
  if (pmc) record.pmc = pmc.value;

  if (a.elocationid) record.elocationid = a.elocationid;
  if (a.pubtype?.length) record.pubtypes = a.pubtype;
  if (a.lang?.length) record.languages = a.lang;

  return record;
}

function extractLinkedIds(
  linkResult: sdk.ELinkResult,
  linkname?: string,
  maxResults?: number,
): Array<{ id: string; score?: number }> {
  const items: Array<{ id: string; score?: number }> = [];
  if (!linkResult.linksets?.length) return items;

  for (const linkset of linkResult.linksets) {
    if (!linkset.linksetdbs?.length) continue;
    for (const ldb of linkset.linksetdbs) {
      if (linkname && ldb.linkname !== linkname) continue;
      if (!ldb.links?.length) continue;
      for (const link of ldb.links) {
        items.push({
          id: link.id,
          score: link.score ? Number(link.score) : undefined,
        });
      }
    }
  }

  // Sort by score descending if scores are present
  items.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

  if (maxResults && items.length > maxResults) {
    return items.slice(0, maxResults);
  }
  return items;
}

// ─── Tools ──────────────────────────────────────────────────────────

export const tools: Tool<any, any>[] = [
  {
    name: "pubmed_search",
    description:
      "Search PubMed for biomedical articles by keyword, MeSH term, author, or date range.\n" +
      "Returns PMIDs and search metadata. Use pubmed_summary to get full article details for the returned PMIDs.\n" +
      "Supports Boolean operators (AND, OR, NOT) and field tags like [MeSH Terms], [Author], [Journal].",
    annotations: { title: "PubMed: Search Articles", readOnlyHint: true },
    parameters: z.object({
      query: z.string().describe("Search query: 'breast cancer treatment', 'COVID-19 vaccine[MeSH Terms]', 'Smith J[Author] AND diabetes'"),
      max_results: z.number().int().min(1).max(500).optional().describe("Max results to return (default 20, max 500)"),
      offset: z.number().int().min(0).optional().describe("Starting offset for pagination (default 0)"),
      sort: z.enum(["relevance", "pub_date", "Author"]).optional().describe("Sort order (default: relevance)"),
      date_type: z.enum(["pdat", "edat"]).optional().describe("Date field: pdat=publication date, edat=Entrez date"),
      min_date: z.string().optional().describe("Start date (YYYY/MM/DD or YYYY/MM or YYYY)"),
      max_date: z.string().optional().describe("End date (YYYY/MM/DD or YYYY/MM or YYYY)"),
    }),
    execute: async (args) => {
      const data = await sdk.search({
        term: args.query,
        max_results: args.max_results,
        offset: args.offset,
        sort: args.sort,
        date_type: args.date_type,
        min_date: args.min_date,
        max_date: args.max_date,
      });

      const result = data.esearchresult;
      if (!result.idlist?.length) {
        return emptyResponse("No PubMed articles found matching the query.");
      }

      const total = parseInt(result.count, 10) || 0;
      const items = result.idlist.map(id => ({ pmid: id }));

      return listResponse(
        `${total.toLocaleString()} total articles found (showing ${items.length} PMIDs)` +
          (result.querytranslation ? ` | Query: ${result.querytranslation}` : ""),
        { items, total },
      );
    },
  },

  {
    name: "pubmed_summary",
    description:
      "Get article summaries (title, authors, journal, date, DOI) for one or more PMIDs.\n" +
      "Use after pubmed_search to get full metadata for returned PMIDs.\n" +
      "Accepts up to 200 PMIDs at once.",
    annotations: { title: "PubMed: Article Summaries", readOnlyHint: true },
    parameters: z.object({
      pmids: z.string().describe("Comma-separated PMIDs: '12345,67890,11111' or a single PMID: '12345'"),
    }),
    execute: async (args) => {
      const ids = args.pmids.split(",").map((s: string) => s.trim()).filter(Boolean);
      if (!ids.length) {
        return emptyResponse("No PMIDs provided.");
      }

      const articles = await sdk.summary({ ids });
      if (!articles.length) {
        return emptyResponse("No article data found for the provided PMIDs.");
      }

      const items = articles.map(articleToRecord);
      return listResponse(
        `${articles.length} article${articles.length === 1 ? "" : "s"} retrieved`,
        { items, total: articles.length },
      );
    },
  },

  {
    name: "pubmed_fetch",
    description:
      "Get full article abstracts as plain text or XML for one or more PMIDs.\n" +
      "Returns the complete abstract text including title, authors, affiliation, and abstract body.\n" +
      "Use for reading full abstracts when pubmed_summary metadata is not enough.",
    annotations: { title: "PubMed: Fetch Abstracts", readOnlyHint: true },
    parameters: z.object({
      pmids: z.string().describe("Comma-separated PMIDs: '12345,67890'"),
      format: z.enum(["text", "xml"]).optional().describe("Output format: text (default) or xml"),
    }),
    execute: async (args) => {
      const ids = args.pmids.split(",").map((s: string) => s.trim()).filter(Boolean);
      if (!ids.length) {
        return emptyResponse("No PMIDs provided.");
      }

      const text = await sdk.fetchAbstracts({ ids, format: args.format });
      if (!text.trim()) {
        return emptyResponse("No abstract text found for the provided PMIDs.");
      }

      return recordResponse(
        `Abstracts for ${ids.length} article${ids.length === 1 ? "" : "s"}`,
        { content: text, pmids: ids, format: args.format ?? "text" },
      );
    },
  },

  {
    name: "pubmed_info",
    description:
      "Get PubMed database statistics: total record count, last update, searchable fields, and available link types.\n" +
      "Useful for discovering which fields are available for targeted searches (e.g. [MeSH Terms], [Author], [Journal]).",
    annotations: { title: "PubMed: Database Info", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const data = await sdk.dbInfo();
      const info = data.einforesult?.dbinfo;

      if (!info) {
        return emptyResponse("Could not retrieve PubMed database info.");
      }

      const record: Record<string, unknown> = {
        database: info.dbname,
        name: info.menuname,
        description: info.description,
        total_records: info.count,
        last_update: info.lastupdate,
        build: info.dbbuild ?? null,
      };

      if (info.fieldlist?.length) {
        record.searchable_fields = info.fieldlist
          .filter(f => f.ishidden !== "Y")
          .map(f => ({
            name: f.name,
            fullname: f.fullname,
            description: f.description,
          }));
      }

      if (info.linklist?.length) {
        record.available_links = info.linklist.map(l => ({
          name: l.name,
          description: l.description,
          target_db: l.dbto,
        }));
      }

      return recordResponse("PubMed database info", record);
    },
  },

  {
    name: "pubmed_related",
    description:
      "Find articles related to a given PMID, ranked by relevance score.\n" +
      "Uses NCBI's pre-computed similarity scores based on shared MeSH terms, co-citations, and content overlap.\n" +
      "Great for literature discovery — finding similar papers to a known article.",
    annotations: { title: "PubMed: Related Articles", readOnlyHint: true },
    parameters: z.object({
      pmid: z.string().describe("Source PMID to find related articles for: '12345'"),
      max_results: z.number().int().min(1).max(500).optional().describe("Max related articles to return (default 20)"),
    }),
    execute: async (args) => {
      const data = await sdk.findRelated({
        pmid: args.pmid,
        max_results: args.max_results,
      });

      const items = extractLinkedIds(data, undefined, args.max_results ?? 20);
      if (!items.length) {
        return emptyResponse(`No related articles found for PMID ${args.pmid}.`);
      }

      return listResponse(
        `${items.length} articles related to PMID ${args.pmid}`,
        {
          items: items.map(i => ({
            pmid: i.id,
            relevance_score: i.score ?? null,
          })),
          total: items.length,
        },
      );
    },
  },

  {
    name: "pubmed_cited_by",
    description:
      "Find articles that cite a given PMID.\n" +
      "Useful for tracking the impact and influence of a paper — which subsequent papers reference it.\n" +
      "Use pubmed_summary on the returned PMIDs to get article details.",
    annotations: { title: "PubMed: Cited By", readOnlyHint: true },
    parameters: z.object({
      pmid: z.string().describe("PMID to find citing articles for: '12345'"),
    }),
    execute: async (args) => {
      const data = await sdk.findCitedBy({ pmid: args.pmid });

      const items = extractLinkedIds(data, "pubmed_pubmed_citedin");
      if (!items.length) {
        return emptyResponse(`No citing articles found for PMID ${args.pmid}.`);
      }

      return listResponse(
        `${items.length} articles cite PMID ${args.pmid}`,
        {
          items: items.map(i => ({ pmid: i.id })),
          total: items.length,
        },
      );
    },
  },

  {
    name: "pubmed_search_and_summarize",
    description:
      "Combined search + summary: searches PubMed and returns full article metadata in one call.\n" +
      "Convenience tool that chains pubmed_search → pubmed_summary.\n" +
      "Returns article titles, authors, journals, dates, and DOIs directly.",
    annotations: { title: "PubMed: Search & Summarize", readOnlyHint: true },
    parameters: z.object({
      query: z.string().describe("Search query: 'CRISPR gene therapy', 'COVID-19 mRNA vaccine efficacy'"),
      max_results: z.number().int().min(1).max(100).optional().describe("Max results (default 20, max 100 for combined call)"),
      offset: z.number().int().min(0).optional().describe("Starting offset for pagination"),
      sort: z.enum(["relevance", "pub_date", "Author"]).optional().describe("Sort order"),
      date_type: z.enum(["pdat", "edat"]).optional().describe("Date field: pdat=publication date, edat=Entrez date"),
      min_date: z.string().optional().describe("Start date (YYYY/MM/DD)"),
      max_date: z.string().optional().describe("End date (YYYY/MM/DD)"),
    }),
    execute: async (args) => {
      // Step 1: Search for PMIDs
      const searchData = await sdk.search({
        term: args.query,
        max_results: args.max_results,
        offset: args.offset,
        sort: args.sort,
        date_type: args.date_type,
        min_date: args.min_date,
        max_date: args.max_date,
      });

      const result = searchData.esearchresult;
      if (!result.idlist?.length) {
        return emptyResponse("No PubMed articles found matching the query.");
      }

      const total = parseInt(result.count, 10) || 0;

      // Step 2: Get summaries for the found PMIDs
      const articles = await sdk.summary({ ids: result.idlist });
      if (!articles.length) {
        return emptyResponse("Found PMIDs but could not retrieve article summaries.");
      }

      const items = articles.map(articleToRecord);
      return listResponse(
        `${total.toLocaleString()} total articles (showing ${articles.length})` +
          (result.querytranslation ? ` | Query: ${result.querytranslation}` : ""),
        { items, total },
      );
    },
  },

  {
    name: "pubmed_databases",
    description:
      "List all available NCBI Entrez databases (PubMed, PMC, Gene, Protein, etc.).\n" +
      "Useful for discovering which NCBI databases exist beyond PubMed.",
    annotations: { title: "PubMed: NCBI Databases", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const data = await sdk.listDatabases();
      const dblist = data.einforesult?.dblist;

      if (!dblist?.length) {
        return emptyResponse("Could not retrieve NCBI database list.");
      }

      const items = dblist.map(db => ({ database: db }));
      return listResponse(
        `${dblist.length} NCBI Entrez databases available`,
        { items, total: dblist.length },
      );
    },
  },
];
