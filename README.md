<div align="center">

# Gov Data MCP

**MCP Server + TypeScript SDK for 96 Government Data APIs**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

508 tools covering federal, state, and international government data — economic, fiscal, health, education, energy, environment, legislative, financial, transportation, transit, traffic, safety, procurement, science, and more.

**40+ APIs require no key** · The rest use free keys that take under a minute to get

</div>

---

## Features

- **508 tools** across 96 government data modules — federal agencies, 30+ state portals, transit systems, energy grids, and international sources
- **50-state coverage** — generic Socrata + ArcGIS tools work across 30 states, plus 14-state real-time 511 traffic, 10 transit systems, and state-specific APIs
- **Cross-referencing** — built-in routing table guides the LLM to combine data from multiple agencies automatically
- **Code mode** — WASM-sandboxed JavaScript execution reduces context window usage by 98–100% for large responses
- **Selective loading** — load only what you need: `--modules fred,treasury,state-data,mbta`
- **Dual transport** — stdio for desktop clients, HTTP Stream for web/remote
- **TypeScript SDK** — every API is importable as a standalone typed client, no MCP required
- **Disk-backed caching** — responses cached to disk, survives restarts
- **Rate limiting + retry** — token-bucket rate limiter with exponential backoff on 429/503

## Quick Start

### MCP Server

```bash
npx gov-data-mcp
```

Add to Claude Desktop (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "gov-data": {
      "command": "npx",
      "args": ["-y", "gov-data-mcp"],
      "env": {
        "FRED_API_KEY": "your_key",
        "DATA_GOV_API_KEY": "your_key"
      }
    }
  }
}
```

Add to VS Code / Copilot (`.vscode/mcp.json`):

```json
{
  "servers": {
    "gov-data": {
      "command": "npx",
      "args": ["-y", "gov-data-mcp"],
      "env": {
        "FRED_API_KEY": "your_key",
        "DATA_GOV_API_KEY": "your_key"
      }
    }
  }
}
```

### Load Only Specific Modules

```bash
# Federal economic data only
npx gov-data-mcp --modules fred,treasury,bls,bea,eia

# State data only
npx gov-data-mcp --modules state-data,state-511,md-traffic,mbta,bart

# Everything (default)
npx gov-data-mcp
```

### HTTP Stream (for remote/web clients)

```bash
npx gov-data-mcp --transport httpStream --port 8080
```

## Example Prompts

> **Economic:** "What's the current state of the U.S. economy? Show me GDP, unemployment, inflation, and interest rates."

> **Health:** "Show me the adverse event profile for Ozempic including clinical trials, FDA reports, and pharma payments to doctors."

> **Legislative:** "What happened with the Inflation Reduction Act? Who sponsored it, how did the vote break down by party?"

> **State data:** "Compare Maryland and Virginia crime rates over the last 10 years."

> **Transit:** "What are the current MBTA delays in Boston? Any service alerts?"

> **Traffic:** "Show me current traffic incidents on Ohio highways."

> **Energy:** "What's the current fuel mix on the Texas ERCOT grid? How much is wind vs natural gas?"

> **Environment:** "What are the current reservoir levels in California? Any drought concerns?"

> **Cross-reference:** "How has federal spending on healthcare changed over the last 5 years, and what health outcomes has it produced?"

### TypeScript SDK

```bash
npm install gov-data-mcp
```

```typescript
import { getObservations } from "gov-data-mcp/sdk/fred";
import { searchBills } from "gov-data-mcp/sdk/congress";
import { queryStateDataset } from "gov-data-mcp/sdk/state-data";

const gdp = await getObservations("GDP", { sort: "desc", limit: 5 });
const mdCrime = await queryStateDataset("MD", "jwfa-fdxs", { where: "year = '2023'" });
```

No MCP server required. All functions include caching, retry, and rate limiting.

## Data Sources (96 Modules, 508 Tools)

### Federal — Economic (12 modules)
| Module | Tools | Auth | Data |
|--------|-------|------|------|
| `treasury` | 4 | — | Fiscal data, debt, interest rates |
| `fred` | 4 | Key | Federal Reserve economic time series |
| `bls` | 4 | Key | Employment, CPI, labor statistics |
| `bea` | 13 | Key | GDP, personal income, trade, I/O tables |
| `eia` | 5 | Key | Energy production, consumption, prices |
| `census` | 3 | Key | Population, demographics, ACS data |
| `dol` | 7 | Key | OSHA inspections, wage enforcement, UI claims |
| `usajobs` | 2 | Key | Federal job listings |
| `fcc` | 2 | — | Broadband coverage and providers |
| `uspto` | 10 | Key | Patents, applications, PTAB decisions |
| `sbir` | 1 | — | Small business innovation research awards |
| `gsa-calc` | 3 | — | GSA contract ceiling rates |

### Federal — Health (8 modules)
| Module | Tools | Auth | Data |
|--------|-------|------|------|
| `fda` | 25 | Key | Drugs, devices, food, tobacco (OpenFDA) |
| `cdc` | 13 | — | Mortality, disease, COVID, obesity, PLACES |
| `clinical-trials` | 10 | — | ClinicalTrials.gov studies |
| `cms` | 4 | — | Hospital/nursing home quality, Medicare |
| `open-payments` | 10 | — | Pharma payments to doctors (Sunshine Act) |
| `pubmed` | 8 | Key | Biomedical literature search |
| `nih` | 4 | — | NIH research projects and funding |
| `va` | 1 | Key | VA facilities (hospitals, clinics, cemeteries) |

### Federal — Legislative (6 modules)
| Module | Tools | Auth | Data |
|--------|-------|------|------|
| `congress` | 71 | Key | Bills, votes, members, committees, CRS reports |
| `federal-register` | 5 | — | Rules, executive orders, presidential docs |
| `govinfo` | 3 | Key | Congressional record, CBO reports |
| `regulations` | 6 | Key | Regulations.gov dockets and comments |
| `senate-lobbying` | 5 | — | Lobbying disclosures, registrants |
| `ecfr` | 3 | — | Code of Federal Regulations full text |

### Federal — Financial (7 modules)
| Module | Tools | Auth | Data |
|--------|-------|------|------|
| `fec` | 6 | Key | Campaign finance, candidates, committees |
| `sec` | 3 | — | EDGAR company filings and financials |
| `fdic` | 6 | — | Bank data, failures, financials |
| `cfpb` | 6 | — | Consumer complaints |
| `cfpb-hmda` | 6 | — | Home mortgage disclosure data |
| `cftc` | 5 | — | Futures trading positions |
| `ofac` | 5 | — | Sanctions and blocked persons |

### Federal — Spending & Procurement (3 modules)
| Module | Tools | Auth | Data |
|--------|-------|------|------|
| `usaspending` | 6 | — | Federal awards, recipients, agency budgets |
| `sam-gov` | 3 | Key | Contract opportunities, entities, exclusions |
| `gsa-calc` | 3 | — | GSA contract ceiling rates |

### Federal — Environment & Science (16 modules)
| Module | Tools | Auth | Data |
|--------|-------|------|------|
| `epa` | 9 | — | Facilities, enforcement, Superfund, TRI, GHG |
| `epa-aqs` | 3 | Key | Air quality monitoring stations |
| `noaa` | 4 | Key | Climate data, stations, weather history |
| `noaa-coops` | 10 | — | Tides, currents, water levels |
| `noaa-swpc` | 12 | — | Space weather, solar storms |
| `nws` | 15 | — | Forecasts, alerts, radar |
| `usgs` | 6 | — | Earthquakes, water data, stream gauges |
| `nrel` | 3 | Key | Solar, fuel stations, utility rates |
| `fws` | 2 | — | Endangered species listings |
| `nps` | 4 | Key | National parks, alerts, campgrounds |
| `recreation` | 3 | Key | Federal recreation facilities, campsites |
| `usace-cwms` | 3 | — | Corps dam/reservoir/river water levels |
| `nasa-images` | 2 | — | NASA image library |
| `nasa-science` | 5 | Key | NEO, DONKI, Mars Rover, EONET |
| `jpl` | 3 | — | Asteroid orbits, close approaches, fireballs |
| `nsf` | 2 | — | Research awards and funding |

### Federal — Safety (5 modules)
| Module | Tools | Auth | Data |
|--------|-------|------|------|
| `nhtsa` | 11 | — | Vehicle recalls, complaints, safety ratings |
| `fema` | 5 | — | Disaster declarations, assistance |
| `cpsc` | 4 | — | Product safety recalls |
| `ftc` | 2 | Key | FTC enforcement actions |
| `nvd` | 2 | Key | CVE vulnerabilities, CVSS scores |

### Federal — Other (9 modules)
| Module | Tools | Auth | Data |
|--------|-------|------|------|
| `ntsb` | 2 | — | Transportation accident investigations |
| `bts` | 2 | — | Border crossings, transport statistics |
| `faa-weather` | 4 | — | METARs, TAFs, SIGMETs, PIREPs |
| `smithsonian` | 2 | Key | 11M+ museum collection records |
| `doe-osti` | 1 | — | DOE scientific publications |
| `naep` | 9 | — | Nation's Report Card education scores |
| `college-scorecard` | 4 | Key | College costs, outcomes, earnings |
| `usda-fooddata` | 3 | Key | Food nutrition data |
| `usda-nass` | 4 | Key | Agricultural statistics |
| `world-bank` | 4 | — | International development indicators |

### State & Local — Open Data (1 module, 30 states)
| Module | Tools | Coverage |
|--------|-------|----------|
| `state-data` | 15 | 30 states via Socrata SODA API + ArcGIS REST. Crime, health, education, economy, property, environment, transportation. MD fully populated (21 datasets), NY (13), CT (12), WA (8), TX (7), PA (7), NJ (4), + 23 more with GIS and/or Socrata portals. |

### State & Local — Real-Time Traffic (2 modules, 15+ states)
| Module | Tools | Coverage |
|--------|-------|----------|
| `state-511` | 6 | 14 states: AZ, NV, UT, AK, ID, NY, CT, GA, WI, LA, OH, NC, WA. Incidents, cameras, signs, weather, conditions. |
| `md-traffic` | 7 | Maryland CHART: incidents, closures, cameras, speeds, weather, DMS, travel times |

### State & Local — Transit (11 modules)
| Module | Tools | Auth | City/Region |
|--------|-------|------|-------------|
| `mbta` | 4 | Key | Boston (subway, bus, commuter rail, ferry) |
| `septa` | 4 | — | Philadelphia (regional rail, bus, trolley) |
| `cta` | 2 | Key | Chicago (L trains, buses) |
| `bart` | 3 | Key | San Francisco Bay Area (BART rail) |
| `la-metro` | 3 | — | Los Angeles (bus, rail) |
| `trimet` | 1 | Key | Portland (bus, MAX light rail, streetcar) |
| `onebusaway` | 2 | Key | Seattle / Puget Sound (bus, light rail) |
| `wsdot-ferries` | 3 | Key | Washington State Ferries (schedules, vessels, terminals) |
| `marta` | 1 | Key | Atlanta (rail) |
| `path-train` | 1 | — | NYC/NJ PATH train |
| `md-transit` | 3 | Key | Maryland MTA (bus, light rail, metro, MARC) |

### State & Local — Energy Grids (3 modules)
| Module | Tools | Auth | Coverage |
|--------|-------|------|----------|
| `caiso` | 1 | Token | California ISO (rates, GHG, Flex Alerts) |
| `ercot` | 2 | Key | Texas grid (load, prices) |
| `iso-ne` | 2 | Auth | New England (CT, MA, ME, NH, RI, VT) |

### State & Local — Water & Environment (5 modules)
| Module | Tools | Auth | Data |
|--------|-------|------|------|
| `cdec` | 2 | — | California reservoirs, rivers, snowpack |
| `calfire` | 1 | — | Active CA wildfire incidents (GeoJSON) |
| `co-water` | 3 | Key | Colorado water rights, streamflow, diversions |
| `md-bay` | 3 | Key | Chesapeake Bay buoy water quality (CBIBS) |
| `mn-lakes` | 3 | — | Minnesota 4,500+ lakes, fish surveys |

### State & Local — Other (1 module)
| Module | Tools | Auth | Data |
|--------|-------|------|------|
| `nc-linc` | 2 | — | NC 900+ demographic/economic data items |

## API Keys

Most tools work without any API key. For those that need one, keys are free:

| Key | Used By | Get It |
|-----|---------|--------|
| `DATA_GOV_API_KEY` | FDA, Congress, FBI, FEC, GovInfo, Regulations, NREL, College Scorecard, USDA FoodData, FTC | [api.data.gov/signup](https://api.data.gov/signup/) |
| `FRED_API_KEY` | FRED | [fredaccount.stlouisfed.org/apikeys](https://fredaccount.stlouisfed.org/apikeys) |
| `SOCRATA_APP_TOKEN` | State open data (all Socrata states) | Register on any state portal |
| `CENSUS_API_KEY` | Census | [api.census.gov/data/key_signup.html](https://api.census.gov/data/key_signup.html) |
| `BEA_API_KEY` | BEA | [apps.bea.gov/API/signup](https://apps.bea.gov/API/signup/) |
| `NASA_API_KEY` | NASA Science | [api.nasa.gov](https://api.nasa.gov/) (DEMO_KEY works without signup) |
| `NPS_API_KEY` | National Park Service | [nps.gov/subjects/developer](https://www.nps.gov/subjects/developer/get-started.htm) |

See the full list with `npx gov-data-mcp --list-modules`.

## Disclaimer

This project integrates a significant number of government APIs, many of which have large, complex, or inconsistently documented schemas. AI is used as a tool throughout this project to help parse API documentation, generate type definitions, and scaffold tool implementations — making it possible to cover this much surface area and get people access to government data faster than would otherwise be feasible. While every effort has been made to ensure accuracy, some endpoints may return unexpected results, have incomplete parameter coverage, or behave differently than documented.

This is a community-driven effort — if you find something that's broken or could be improved, please open an issue or submit a PR. The goal is to make government data as accessible and reliable as possible, together.

All data is sourced from official U.S. government, state, and international APIs — the server does not generate, modify, or editorialize any data.

## License

MIT
