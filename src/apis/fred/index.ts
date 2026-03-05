/**
 * FRED API module — re-exports all pieces for server auto-discovery.
 *
 * Import pattern:
 *   import * as fred from "./apis/fred/index.js";
 *   // fred.meta, fred.tools, fred.prompts, fred.sdk, fred.clearCache
 */

export * from "./meta.js";
export { tools } from "./tools.js";
export { prompts } from "./prompts.js";
export { clearCache } from "./sdk.js";
