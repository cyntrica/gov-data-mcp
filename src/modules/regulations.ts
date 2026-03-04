/**
 * Regulations.gov MCP module — search regulatory documents, public comments, and dockets.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { keysEnum, describeEnum } from "../enum-utils.js";
import {
  searchDocuments,
  getDocument,
  searchComments,
  getComment,
  searchDockets,
  getDocket,
  DOCUMENT_TYPES,
} from "../sdk/regulations.js";

// ─── Metadata (server.ts reads these) ────────────────────────────────

export const name = "regulations";
export const displayName = "Regulations.gov";
export const description = "Federal rulemaking: proposed rules, final rules, public comments, and regulatory dockets from all federal agencies";
export const auth = { envVar: "DATA_GOV_API_KEY", signup: "https://api.data.gov/signup/" };
export const workflow = "regulations_search_documents to find rules → regulations_document_detail for full info → regulations_search_comments for public feedback";
export const tips = "Document types: 'Proposed Rule', 'Rule', 'Supporting & Related Material', 'Other'. Sort by '-postedDate' for newest first. Agency IDs: EPA, FDA, DOL, HHS, DOT, etc.";

export const reference = {
  documentTypes: {
    "Proposed Rule": "Notice of proposed rulemaking (NPRM)",
    "Rule": "Final rule",
    "Supporting & Related Material": "Supporting documents, analyses, studies",
    "Other": "Other documents",
  } as Record<string, string>,
  docketTypes: {
    "Rulemaking": "Rulemaking docket",
    "Nonrulemaking": "Nonrulemaking docket",
  } as Record<string, string>,
  docs: {
    "API Docs": "https://open.gsa.gov/api/regulationsgov/",
    "Regulations.gov": "https://www.regulations.gov/",
  },
};

// ─── Tools ───────────────────────────────────────────────────────────

export const tools: Tool<any, any>[] = [
  {
    name: "regulations_search_documents",
    description:
      "Search for federal regulatory documents — proposed rules, final rules, and supporting materials.\n" +
      "Filter by agency, docket, date, or keyword. Complements Federal Register data with rulemaking context.\n\n" +
      "Document types: 'Proposed Rule', 'Rule', 'Supporting & Related Material', 'Other'.\n" +
      "Sort: 'postedDate' (asc) or '-postedDate' (desc, newest first).",
    annotations: { title: "Regulations.gov: Search Documents", readOnlyHint: true },
    parameters: z.object({
      searchTerm: z.string().optional().describe("Full-text search keyword (e.g. 'water quality', 'emissions')"),
      agencyId: z.string().optional().describe("Agency abbreviation: 'EPA', 'FDA', 'DOL', 'HHS', 'DOT', 'OSHA'"),
      docketId: z.string().optional().describe("Docket ID (e.g. 'EPA-HQ-OAR-2003-0129')"),
      documentType: z.enum(keysEnum(DOCUMENT_TYPES)).optional().describe(`Document type: ${describeEnum(DOCUMENT_TYPES)}`),
      postedDate: z.string().optional().describe("Exact date: '2024-01-15'"),
      postedDateGe: z.string().optional().describe("Posted on or after date: '2024-01-01'"),
      postedDateLe: z.string().optional().describe("Posted on or before date: '2024-12-31'"),
      sort: z.enum(["postedDate", "-postedDate", "title", "-title"]).optional().describe("Sort order"),
      pageSize: z.number().int().max(250).optional().describe("Results per page (max 250, default 25)"),
      pageNumber: z.number().int().optional().describe("Page number (1-based)"),
    }),
    execute: async (args) => {
      const data = await searchDocuments(args);
      if (!data.data?.length) return `No documents found${args.searchTerm ? ` for '${args.searchTerm}'` : ""}.`;
      return JSON.stringify({
        summary: `Found ${data.meta?.totalElements ?? data.data.length} regulatory documents${args.agencyId ? ` from ${args.agencyId}` : ""}${args.searchTerm ? ` matching '${args.searchTerm}'` : ""}, showing ${data.data.length}`,
        total: data.meta?.totalElements,
        documents: data.data.map(d => ({
          documentId: d.id,
          title: d.attributes.title,
          agency: d.attributes.agencyId,
          type: d.attributes.documentType,
          docket: d.attributes.docketId,
          posted: d.attributes.postedDate,
          commentEndDate: d.attributes.commentEndDate,
          withdrawn: d.attributes.withdrawn,
        })),
      });
    },
  },

  {
    name: "regulations_document_detail",
    description: "Get detailed information for a specific regulatory document by its document ID (e.g. 'FDA-2009-N-0501-0012').",
    annotations: { title: "Regulations.gov: Document Detail", readOnlyHint: true },
    parameters: z.object({
      documentId: z.string().describe("Document ID (e.g. 'FDA-2009-N-0501-0012', 'EPA-HQ-OAR-2021-0208-0001')"),
    }),
    execute: async ({ documentId }) => {
      const data = await getDocument(documentId);
      return JSON.stringify(data.data);
    },
  },

  {
    name: "regulations_search_comments",
    description:
      "Search for public comments on federal regulations.\n" +
      "Filter by keyword, agency, docket, or date. Shows what the public said about proposed rules.\n\n" +
      "Sort: 'postedDate' (asc) or '-postedDate' (desc, newest first).",
    annotations: { title: "Regulations.gov: Search Comments", readOnlyHint: true },
    parameters: z.object({
      searchTerm: z.string().optional().describe("Keyword search in comments"),
      agencyId: z.string().optional().describe("Agency abbreviation: 'EPA', 'FDA', 'DOL'"),
      docketId: z.string().optional().describe("Docket ID to get comments for a specific rulemaking"),
      postedDateGe: z.string().optional().describe("Comments posted on or after date: '2024-01-01'"),
      postedDateLe: z.string().optional().describe("Comments posted on or before date: '2024-12-31'"),
      sort: z.enum(["-postedDate", "postedDate"]).optional().describe("Sort order (default: newest first)"),
      pageSize: z.number().int().max(250).optional().describe("Results per page (max 250, default 25)"),
      pageNumber: z.number().int().optional().describe("Page number (1-based)"),
    }),
    execute: async (args) => {
      const data = await searchComments(args);
      if (!data.data?.length) return `No comments found${args.searchTerm ? ` for '${args.searchTerm}'` : ""}.`;
      return JSON.stringify({
        summary: `Found ${data.meta?.totalElements ?? data.data.length} public comments${args.agencyId ? ` for ${args.agencyId}` : ""}${args.docketId ? ` on docket ${args.docketId}` : ""}, showing ${data.data.length}`,
        total: data.meta?.totalElements,
        comments: data.data.map(c => ({
          commentId: c.id,
          title: c.attributes.title,
          agency: c.attributes.agencyId,
          docket: c.attributes.docketId,
          posted: c.attributes.postedDate,
          comment: c.attributes.comment,
        })),
      });
    },
  },

  {
    name: "regulations_comment_detail",
    description: "Get detailed information for a specific public comment by its comment ID.",
    annotations: { title: "Regulations.gov: Comment Detail", readOnlyHint: true },
    parameters: z.object({
      commentId: z.string().describe("Comment ID (e.g. 'HHS-OCR-2018-0002-5313')"),
    }),
    execute: async ({ commentId }) => {
      const data = await getComment(commentId);
      return JSON.stringify(data.data);
    },
  },

  {
    name: "regulations_search_dockets",
    description:
      "Search for regulatory dockets — organizational folders containing related rules, comments, and documents.\n" +
      "Each docket represents a rulemaking or non-rulemaking action by a federal agency.\n\n" +
      "Sort: 'title', '-title'.",
    annotations: { title: "Regulations.gov: Search Dockets", readOnlyHint: true },
    parameters: z.object({
      searchTerm: z.string().optional().describe("Keyword search (e.g. 'clean air', 'food safety')"),
      agencyId: z.string().optional().describe("Agency abbreviation: 'EPA', 'FDA', 'DOL', 'HHS'. Comma-separate for multiple: 'EPA,FDA'"),
      docketType: z.enum(["Rulemaking", "Nonrulemaking"]).optional().describe("Docket type"),
      sort: z.enum(["title", "-title"]).optional().describe("Sort order"),
      pageSize: z.number().int().max(250).optional().describe("Results per page (max 250, default 25)"),
      pageNumber: z.number().int().optional().describe("Page number (1-based)"),
    }),
    execute: async (args) => {
      const data = await searchDockets(args);
      if (!data.data?.length) return `No dockets found${args.searchTerm ? ` for '${args.searchTerm}'` : ""}.`;
      return JSON.stringify({
        summary: `Found ${data.meta?.totalElements ?? data.data.length} dockets${args.agencyId ? ` from ${args.agencyId}` : ""}, showing ${data.data.length}`,
        total: data.meta?.totalElements,
        dockets: data.data.map(d => ({
          docketId: d.id,
          title: d.attributes.title,
          agency: d.attributes.agencyId,
          type: d.attributes.docketType,
          lastModified: d.attributes.lastModifiedDate,
        })),
      });
    },
  },

  {
    name: "regulations_docket_detail",
    description: "Get detailed information for a specific regulatory docket by its docket ID (e.g. 'EPA-HQ-OAR-2003-0129').",
    annotations: { title: "Regulations.gov: Docket Detail", readOnlyHint: true },
    parameters: z.object({
      docketId: z.string().describe("Docket ID (e.g. 'EPA-HQ-OAR-2003-0129')"),
    }),
    execute: async ({ docketId }) => {
      const data = await getDocket(docketId);
      return JSON.stringify(data.data);
    },
  },
];

export { clearCache } from "../sdk/regulations.js";
