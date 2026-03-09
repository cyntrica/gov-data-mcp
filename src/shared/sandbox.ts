/**
 * WASM-sandboxed JavaScript executor for code mode.
 *
 * Runs LLM-generated processing scripts against raw tool output in a QuickJS
 * WASM sandbox. The sandbox has NO filesystem or network access — only DATA
 * (the tool's response as a string) and console.log() for output.
 *
 * Usage:
 *   import { executeInSandbox } from "./sandbox.js";
 *   const result = await executeInSandbox(rawJsonString, userScript);
 *   // result.stdout contains only what the script console.log()'d
 *
 * The QuickJS WASM module is loaded once and reused across calls.
 * Each execution gets a fresh context (no state leakage between calls).
 */

import { getQuickJS, shouldInterruptAfterDeadline } from "quickjs-emscripten";
import type { QuickJSWASMModule } from "quickjs-emscripten";

// ─── Singleton ───────────────────────────────────────────────────────

let _quickJS: QuickJSWASMModule | null = null;

/** Load QuickJS once, reuse across all executions. */
async function getRuntime(): Promise<QuickJSWASMModule> {
  if (!_quickJS) _quickJS = await getQuickJS();
  return _quickJS;
}

// ─── Types ───────────────────────────────────────────────────────────

export interface SandboxResult {
  /** Script's console.log() output. */
  stdout: string;
  /** Size of the input data in bytes. */
  beforeBytes: number;
  /** Size of the script output in bytes. */
  afterBytes: number;
  /** Context reduction percentage (0-100). */
  reductionPct: number;
  /** Script error message, if execution failed. */
  error?: string;
}

// ─── Configuration ───────────────────────────────────────────────────

/** Max script execution time in milliseconds. */
const TIMEOUT_MS = 10_000;

/** Max DATA size we'll inject into the sandbox (10MB). */
const MAX_DATA_BYTES = 10 * 1024 * 1024;

// ─── Executor ────────────────────────────────────────────────────────

/**
 * Execute a JavaScript script in a WASM sandbox with DATA injected.
 *
 * The script can:
 *   - Read `DATA` (string — the raw tool response)
 *   - Use `JSON.parse(DATA)` to parse it
 *   - Use `console.log(...)` to produce output
 *   - Use standard JS: loops, map/filter/reduce, string ops, Math, etc.
 *
 * The script CANNOT:
 *   - Access the filesystem
 *   - Make network requests
 *   - Import modules
 *   - Access Node.js APIs
 *   - Leak state between calls
 *
 * @param data - Raw tool response string (injected as `DATA` global)
 * @param script - JavaScript code to execute
 * @returns SandboxResult with stdout and size metrics
 */
export async function executeInSandbox(data: string, script: string): Promise<SandboxResult> {
  const beforeBytes = Buffer.byteLength(data, "utf-8");

  // Guard against huge payloads
  if (beforeBytes > MAX_DATA_BYTES) {
    return {
      stdout: "",
      beforeBytes,
      afterBytes: 0,
      reductionPct: 0,
      error: `DATA too large: ${(beforeBytes / 1024 / 1024).toFixed(1)}MB exceeds ${MAX_DATA_BYTES / 1024 / 1024}MB limit.`,
    };
  }

  const qjs = await getRuntime();
  const runtime = qjs.newRuntime();

  // Set interrupt handler for timeout
  const deadline = Date.now() + TIMEOUT_MS;
  runtime.setInterruptHandler(shouldInterruptAfterDeadline(deadline));

  // Memory limit: 64MB (generous for JSON processing)
  runtime.setMemoryLimit(64 * 1024 * 1024);

  const vm = runtime.newContext();

  try {
    // ─── Inject DATA global ────────────────────────────────────────
    const dataHandle = vm.newString(data);
    vm.setProp(vm.global, "DATA", dataHandle);
    dataHandle.dispose();

    // ─── Capture console.log → stdout ──────────────────────────────
    let stdout = "";
    const logFn = vm.newFunction("log", (...args) => {
      const parts = args.map(a => {
        // Handle different QuickJS types
        const type = vm.typeof(a);
        if (type === "string") return vm.getString(a);
        // For numbers, booleans, objects — dump and stringify
        const dumped = vm.dump(a);
        return typeof dumped === "object" ? JSON.stringify(dumped) : String(dumped);
      });
      stdout += parts.join(" ") + "\n";
    });

    const consoleObj = vm.newObject();
    vm.setProp(consoleObj, "log", logFn);
    vm.setProp(vm.global, "console", consoleObj);
    logFn.dispose();
    consoleObj.dispose();

    // ─── Execute script ────────────────────────────────────────────
    const result = vm.evalCode(script);

    if (result.error) {
      const errDump = vm.dump(result.error);
      result.error.dispose();
      const errMsg = typeof errDump === "object" ? JSON.stringify(errDump) : String(errDump);
      return {
        stdout: "",
        beforeBytes,
        afterBytes: 0,
        reductionPct: 0,
        error: errMsg,
      };
    }

    result.value.dispose();

    // ─── Compute metrics ───────────────────────────────────────────
    const trimmed = stdout.trimEnd();
    const afterBytes = Buffer.byteLength(trimmed, "utf-8");
    const reductionPct = beforeBytes > 0 ? (1 - afterBytes / beforeBytes) * 100 : 0;

    return {
      stdout: trimmed,
      beforeBytes,
      afterBytes,
      reductionPct: Math.max(0, reductionPct),
    };
  } finally {
    vm.dispose();
    runtime.dispose();
  }
}
