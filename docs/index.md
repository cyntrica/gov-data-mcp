---
layout: default
title: Documentation
---

# Documentation

Technical documentation for developers using or contributing to the MCP server and SDK.

---

## [SDK API Reference](sdk)

Complete reference for all 36 SDK modules — every exported function, parameter, and return type. Use the SDK directly in your TypeScript/JavaScript code without running the MCP server.

```typescript
import { getObservations } from "us-gov-open-data-mcp/sdk/fred";
const gdp = await getObservations("GDP", { sort: "desc", limit: 5 });
```

---

## [Architecture](architecture)

How the system works — the client factory, SDK layer, module layer, server bootstrap, caching, rate limiting, and how instructions/prompts are auto-generated.

---

## [Adding New Modules](adding-modules)

Step-by-step guide to adding a new government API. Create 2 files, add 2 lines of wiring, and you have a new module with typed SDK functions, MCP tools, caching, and rate limiting.

---

[← Back to Home](../)
