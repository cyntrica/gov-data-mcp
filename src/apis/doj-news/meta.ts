/**
 * doj-news module metadata.
 */

import { COMPONENTS, TOPICS, type DojBlogEntry } from "./sdk.js";
// ─── Metadata ────────────────────────────────────────────────────────

export const name = "doj-news";
export const displayName = "DOJ News";
export const category = "Justice";
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

