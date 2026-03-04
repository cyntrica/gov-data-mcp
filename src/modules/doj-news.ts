/**
 * DOJ News module — Department of Justice press releases and blog entries.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import {
  searchPressReleases,
  getPressRelease,
  searchBlogEntries,
  getBlogEntry,
  summarizePressRelease,
  COMPONENTS,
  TOPICS,
  clearCache as sdkClearCache,
  type DojPressRelease,
  type DojBlogEntry,
} from "../sdk/doj-news.js";

// ─── Metadata ────────────────────────────────────────────────────────

export const name = "doj-news";
export const displayName = "DOJ News";
export const description =
  "Department of Justice press releases (262K+) and blog entries (3,200+). " +
  "Search by title keyword, date, and DOJ component. Covers enforcement actions, " +
  "indictments, settlements, policy announcements across all DOJ divisions including FBI, DEA, ATF, USAO, and Civil Rights.";
export const workflow =
  "doj_press_releases to search/browse press releases → doj_press_release_detail for full text → " +
  "doj_blog_entries to search blog posts → doj_blog_detail for full text.";
export const tips =
  "Sort: 'date' or 'created'. Direction: 'DESC' (newest first), 'ASC' (oldest). " +
  "Max 50 results per page. Filter by title keyword: title='cybercrime'. " +
  "Date is a Unix timestamp in the response — the tool auto-converts to readable dates. " +
  "Components include: FBI, DEA, ATF, Civil Rights Division, Antitrust Division, USAO (U.S. Attorneys). " +
  "Topics include: Drug Trafficking, Cybercrime, National Security, Civil Rights, Financial Fraud, Public Corruption.";

export const reference = {
  components: COMPONENTS,
  topics: TOPICS,
  docs: {
    "API Documentation": "https://www.justice.gov/developer/api-documentation/api_v1",
    "DOJ Newsroom": "https://www.justice.gov/news",
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────

function parseUnixDate(unixStr: string | undefined): string {
  if (!unixStr) return "?";
  try {
    const ts = parseInt(unixStr, 10);
    if (isNaN(ts)) return unixStr;
    return new Date(ts * 1000).toISOString().slice(0, 10);
  } catch {
    return unixStr;
  }
}

function summarizeBlog(blog: DojBlogEntry): string {
  const parts: string[] = [];
  parts.push(blog.title ?? "Untitled");
  const date = parseUnixDate(blog.date);
  if (date !== "?") parts.push(`Date: ${date}`);
  const components = blog.component?.map(c => c.name).join(", ");
  if (components) parts.push(`Component: ${components}`);
  if (blog.topic) {
    const cleanTopic = String(blog.topic).replace(/<[^>]+>/g, "").trim();
    if (cleanTopic) parts.push(`Topic: ${cleanTopic}`);
  }
  if (blog.url) parts.push(`URL: ${blog.url}`);
  if (blog.teaser) {
    const cleanTeaser = String(blog.teaser).replace(/<[^>]+>/g, "").trim().slice(0, 300);
    if (cleanTeaser) parts.push(`Summary: ${cleanTeaser}`);
  }
  return parts.join("\n");
}

// ─── Tools ───────────────────────────────────────────────────────────

export const tools: Tool<any, any>[] = [
  {
    name: "doj_press_releases",
    description:
      "Search DOJ press releases (262K+ records covering all DOJ divisions).\n" +
      "Includes enforcement actions, indictments, settlements, and policy announcements.\n" +
      "Filter by title keyword and sort by date.\n" +
      "Components: FBI, DEA, ATF, Civil Rights Division, Antitrust, USAO, and more.\n" +
      "Topics: Drug Trafficking, Cybercrime, National Security, Civil Rights, Financial Fraud, etc.",
    annotations: { title: "DOJ: Press Releases", readOnlyHint: true },
    parameters: z.object({
      title: z.string().optional().describe("Filter by title keyword: 'cybercrime', 'antitrust', 'fentanyl', 'civil rights'"),
      sort: z.enum(["date", "created"]).optional().describe("Sort by: 'date' (press release date), 'created' (when added)"),
      direction: z.enum(["ASC", "DESC"]).optional().describe("Sort direction: 'DESC' (newest first, default), 'ASC' (oldest first)"),
      pagesize: z.number().int().max(50).optional().describe("Results per page (default 20, max 50)"),
      page: z.number().int().optional().describe("Page number (zero-indexed). Use with pagesize for pagination."),
    }),
    execute: async (args) => {
      const data = await searchPressReleases({
        title: args.title,
        sort: args.sort ?? "date",
        direction: args.direction ?? "DESC",
        pagesize: args.pagesize ?? 20,
        page: args.page,
      });
      const total = data.metadata?.resultset?.count ?? "?";
      const results = data.results ?? [];
      if (!results.length) return "No press releases found.";

      const summaries = results.map(summarizePressRelease);
      return `DOJ Press Releases: ${total} total, showing ${results.length} (page ${data.metadata?.resultset?.page ?? 0})\n\n${summaries.join("\n\n---\n\n")}`;
    },
  },

  {
    name: "doj_press_release_detail",
    description:
      "Get the full text of a specific DOJ press release by UUID.\n" +
      "Returns the complete body, component, topic, date, and URL.",
    annotations: { title: "DOJ: Press Release Detail", readOnlyHint: true },
    parameters: z.object({
      uuid: z.string().describe("UUID of the press release (from search results)"),
    }),
    execute: async ({ uuid }) => {
      const data = await getPressRelease(uuid);
      const results = data.results ?? [];
      if (!results.length) return `No press release found with UUID: ${uuid}`;
      const pr = results[0];
      const parts: string[] = [];
      parts.push(pr.title ?? "Untitled");
      parts.push(`Date: ${parseUnixDate(pr.date)}`);
      const components = pr.component?.map(c => c.name).join(", ");
      if (components) parts.push(`Component: ${components}`);
      const topics = Array.isArray(pr.topic)
        ? pr.topic.map(t => t.name).join(", ")
        : typeof pr.topic === "string" ? pr.topic : undefined;
      if (topics) parts.push(`Topic: ${topics}`);
      if (pr.url) parts.push(`URL: ${pr.url}`);
      if (pr.body) {
        const cleanBody = String(pr.body).replace(/<[^>]+>/g, "").replace(/&amp;/g, "&")
          .replace(/&nbsp;/g, " ").replace(/\n{3,}/g, "\n\n").trim();
        parts.push(`\n--- FULL TEXT ---\n${cleanBody}`);
      }
      return parts.join("\n");
    },
  },

  {
    name: "doj_blog_entries",
    description:
      "Search DOJ Office of Public Affairs blog entries (3,200+ records).\n" +
      "Blog entries often provide more context and analysis than press releases.\n" +
      "Covers policy discussions, division activities, and enforcement context.",
    annotations: { title: "DOJ: Blog Entries", readOnlyHint: true },
    parameters: z.object({
      sort: z.enum(["date", "created"]).optional().describe("Sort by"),
      direction: z.enum(["ASC", "DESC"]).optional().describe("Sort direction: 'DESC' (newest first), 'ASC'"),
      pagesize: z.number().int().max(50).optional().describe("Results per page (default 20, max 50)"),
      page: z.number().int().optional().describe("Page number (zero-indexed)"),
    }),
    execute: async (args) => {
      const data = await searchBlogEntries({
        sort: args.sort ?? "date",
        direction: args.direction ?? "DESC",
        pagesize: args.pagesize ?? 20,
        page: args.page,
      });
      const total = data.metadata?.resultset?.count ?? "?";
      const results = data.results ?? [];
      if (!results.length) return "No blog entries found.";

      const summaries = results.map(summarizeBlog);
      return `DOJ Blog Entries: ${total} total, showing ${results.length} (page ${data.metadata?.resultset?.page ?? 0})\n\n${summaries.join("\n\n---\n\n")}`;
    },
  },

  {
    name: "doj_blog_detail",
    description:
      "Get the full text of a specific DOJ blog entry by UUID.\n" +
      "Returns the complete body, component, topic, date, and URL.",
    annotations: { title: "DOJ: Blog Entry Detail", readOnlyHint: true },
    parameters: z.object({
      uuid: z.string().describe("UUID of the blog entry (from search results)"),
    }),
    execute: async ({ uuid }) => {
      const data = await getBlogEntry(uuid);
      const results = data.results ?? [];
      if (!results.length) return `No blog entry found with UUID: ${uuid}`;
      const blog = results[0];
      const parts: string[] = [];
      parts.push(blog.title ?? "Untitled");
      parts.push(`Date: ${parseUnixDate(blog.date)}`);
      const components = blog.component?.map(c => c.name).join(", ");
      if (components) parts.push(`Component: ${components}`);
      if (blog.topic) {
        const cleanTopic = String(blog.topic).replace(/<[^>]+>/g, "").trim();
        if (cleanTopic) parts.push(`Topic: ${cleanTopic}`);
      }
      if (blog.url) parts.push(`URL: ${blog.url}`);
      if (blog.body) {
        const cleanBody = String(blog.body).replace(/<[^>]+>/g, "").replace(/&amp;/g, "&")
          .replace(/&nbsp;/g, " ").replace(/\n{3,}/g, "\n\n").trim();
        parts.push(`\n--- FULL TEXT ---\n${cleanBody}`);
      }
      return parts.join("\n");
    },
  },
];

export { sdkClearCache as clearCache };
