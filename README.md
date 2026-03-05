# US Government Open Data MCP

An MCP server + TypeScript SDK for **39 U.S. government and international data APIs** — 219 tools covering economic, fiscal, health, education, energy, environment, lobbying, housing, patents, safety, banking, consumer protection, workplace safety, transportation, seismic, clinical trials, pharma payments, research funding, and legislative data.

**21 APIs require no key.** The rest use free keys that take under a minute to get.

## Quick Start

### MCP Server

```bash
npx us-gov-open-data-mcp
```

Add to `.vscode/mcp.json` for VS Code / Copilot:

```json
{
  "servers": {
    "us-gov-open-data": {
      "command": "npx",
      "args": ["-y", "us-gov-open-data-mcp"],
      "env": {
        "FRED_API_KEY": "your_key",
        "DATA_GOV_API_KEY": "your_key"
      }
    }
  }
}
```

### TypeScript SDK

```bash
npm install us-gov-open-data-mcp
```

```typescript
import { getObservations } from "us-gov-open-data-mcp/sdk/fred";
import { searchBills } from "us-gov-open-data-mcp/sdk/congress";

const gdp = await getObservations("GDP", { sort: "desc", limit: 5 });
```

No MCP server required. All functions include caching, retry, and rate limiting.

## Documentation

Full documentation at **[lzinga.github.io/us-gov-open-data-mcp](https://lzinga.github.io/us-gov-open-data-mcp/)**

| | |
|---|---|
| [Getting Started](https://lzinga.github.io/us-gov-open-data-mcp/guide/getting-started) | MCP setup, SDK install, client configs |
| [API Keys](https://lzinga.github.io/us-gov-open-data-mcp/guide/api-keys) | Which APIs need keys, where to get them |
| [Data Sources](https://lzinga.github.io/us-gov-open-data-mcp/guide/data-sources) | All 39 APIs grouped by category |
| [API Reference](https://lzinga.github.io/us-gov-open-data-mcp/api/) | Auto-generated from TypeScript — every function and type |
| [Examples](https://lzinga.github.io/us-gov-open-data-mcp/guide/sdk-usage) | SDK code, MCP prompts, analysis showcases |
| [Architecture](https://lzinga.github.io/us-gov-open-data-mcp/guide/architecture) | How the system works |
| [Adding Modules](https://lzinga.github.io/us-gov-open-data-mcp/guide/adding-modules) | Add a new API — just create a folder |

## Data Sources

| Category | APIs |
|----------|------|
| **Economic** | Treasury, FRED, BLS, BEA, EIA |
| **Legislative** | Congress.gov, Federal Register, GovInfo, Regulations.gov |
| **Financial** | FEC, Senate Lobbying, SEC, FDIC, CFPB |
| **Spending** | USAspending, Open Payments |
| **Health & Safety** | CDC, FDA, CMS, ClinicalTrials.gov, NIH, NHTSA, DOL |
| **Environment** | EPA, NOAA, NREL, USGS |
| **Justice** | FBI Crime Data, DOJ News |
| **Education** | NAEP, College Scorecard, USPTO |
| **Demographics** | Census, HUD, FEMA |
| **Other** | BTS, USDA NASS, USDA FoodData, World Bank |

## License

MIT
