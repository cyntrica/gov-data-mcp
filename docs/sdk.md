---
layout: default
title: "SDK API Reference"
---

# SDK API Reference

All SDK functions can be imported directly — no MCP server required.

```typescript
import { getObservations } from "us-gov-open-data-mcp/sdk/fred";
```

Every function includes caching, retry, and rate limiting via `createClient`.

---

## Treasury Fiscal Data

```typescript
import { queryFiscalData, listDatasets, searchEndpoints, getEndpointFields } from "us-gov-open-data-mcp/sdk/treasury";
```

| Function | Description |
|----------|-------------|
| `queryFiscalData(endpoint, opts?)` | Query any Treasury endpoint with fields, filter, sort, pagination |
| `listDatasets()` | List all 53 datasets grouped by name |
| `searchEndpoints(keyword)` | Search 181 endpoints by keyword |
| `getEndpointFields(endpoint)` | Get field names, labels, and types for an endpoint |

## FRED

```typescript
import { searchSeries, getSeriesInfo, getObservations, getReleaseData } from "us-gov-open-data-mcp/sdk/fred";
```

| Function | Description |
|----------|-------------|
| `searchSeries(query, limit?)` | Search 800K+ series by keyword |
| `getSeriesInfo(seriesId)` | Get metadata: title, units, frequency, range |
| `getObservations(seriesId, opts?)` | Get date/value pairs. Options: start, end, limit, sort, frequency |
| `getReleaseData(releaseId, limit?)` | Bulk fetch all series in a release |

## BLS

```typescript
import { getSeriesData, searchPopularSeries } from "us-gov-open-data-mcp/sdk/bls";
```

| Function | Description |
|----------|-------------|
| `getSeriesData(seriesIds, startYear, endYear)` | Fetch BLS time series (POST API) |
| `searchPopularSeries(keyword)` | Local search across curated series catalog |

## BEA

```typescript
import { getNationalGdp, getGdpByState, getPersonalIncome, getGdpByIndustry } from "us-gov-open-data-mcp/sdk/bea";
```

| Function | Description |
|----------|-------------|
| `getNationalGdp(opts?)` | NIPA tables: GDP, consumption, investment |
| `getGdpByState(opts?)` | State-level GDP |
| `getPersonalIncome(opts?)` | Personal income by state |
| `getGdpByIndustry(opts?)` | GDP by NAICS industry |

## EIA

```typescript
import { getPetroleum, getElectricity, getNaturalGas, getStateEnergy, getTotalEnergy } from "us-gov-open-data-mcp/sdk/eia";
```

## Census

```typescript
import { queryCensus, searchVariables } from "us-gov-open-data-mcp/sdk/census";
```

| Function | Description |
|----------|-------------|
| `queryCensus(dataset, variables, geography)` | Query any Census dataset. Returns `{ headers, rows }` |
| `searchVariables(dataset, keyword)` | Find variable codes (B01001_001E = population) |

## FEC

```typescript
import { searchCandidates, getCandidateFinancials, getTopCandidates } from "us-gov-open-data-mcp/sdk/fec";
```

## Congress

```typescript
import { searchBills, getBillDetails, getRecentLaws, searchMembers, getHouseVotes, getSenateVotes } from "us-gov-open-data-mcp/sdk/congress";
```

| Function | Description |
|----------|-------------|
| `searchBills(query, opts?)` | Search bills by keyword, congress, type |
| `getBillDetails(congress, type, number)` | Full details with cosponsor party breakdown |
| `getRecentLaws(congress?, limit?)` | Recently enacted laws |
| `searchMembers(opts?)` | Search members by name, state, party |
| `getHouseVotes(opts?)` | House roll call votes with member-level breakdown. Primary: Congress.gov API (118th+). Fallback: clerk.house.gov XML (1990+). Accepts `year` or `congress`+`session`. |
| `getSenateVotes(opts?)` | Senate roll call votes from senate.gov XML (101st Congress / 1989+) with member-level breakdown |

## Federal Register

```typescript
import { searchExecutiveOrders, searchRules } from "us-gov-open-data-mcp/sdk/federal-register";
```

## USAspending

```typescript
import { searchAwards, spendingByAgency, spendingByState, spendingOverTime } from "us-gov-open-data-mcp/sdk/usaspending";
```

## SEC EDGAR

```typescript
import { getCompanySubmissions, getCompanyFacts, searchFilings } from "us-gov-open-data-mcp/sdk/sec";
```

## FBI Crime Data Explorer

```typescript
import {
  getAgenciesByState,
  getSummarizedCrime,
  getArrestData,
  getExpandedHomicide,
  getExpandedProperty,
  getHateCrime,
  getLawEnforcementEmployees,
  getLesdcData,
  getNibrsData,
  getUseOfForceFederal,
  getUseOfForceNational,
  SUMMARIZED_OFFENSES,
  ARREST_OFFENSES,
  NIBRS_OFFENSES,
  HATE_CRIME_BIAS_CODES,
} from "us-gov-open-data-mcp/sdk/fbi";

// Get national violent crime trends
await getSummarizedCrime({ level: "national", offense: "V", fromYear: 2018, toYear: 2023 });

// Get state-level arrest data
await getArrestData({ level: "state", state: "CA", offense: "all", type: "counts" });

// Get NIBRS incident data for aggravated assault
await getNibrsData({ level: "national", offense: "13A" });

// Get hate crime data filtered by bias
await getHateCrime({ level: "national", bias: "21", type: "totals" }); // Anti-Jewish

// Get expanded property details for burglary
await getExpandedProperty({ level: "state", state: "TX", offense: "NB" });
```

## GovInfo

```typescript
import { searchPublications, getBillText, searchCboReports } from "us-gov-open-data-mcp/sdk/govinfo";
```

## NOAA Climate

```typescript
import { getClimateData, searchStations, listDatasets } from "us-gov-open-data-mcp/sdk/noaa";
```

| Function | Description |
|----------|-------------|
| `getClimateData(opts)` | Get temperature, precipitation, snow, wind observations |
| `searchStations(opts?)` | Find weather stations by location or dataset |
| `searchLocations(opts?)` | Find NOAA location IDs (states, cities) |
| `listDatasets()` | List available climate datasets (GHCND, GSOM, etc.) |

## USDA NASS

```typescript
import { getCropProduction, getLivestockData, getPriceReceived, queryStats } from "us-gov-open-data-mcp/sdk/usda-nass";
```

| Function | Description |
|----------|-------------|
| `getCropProduction(commodity, opts?)` | Crop area, production, yield |
| `getLivestockData(commodity, opts?)` | Livestock inventory, production |
| `getPriceReceived(commodity, opts?)` | Prices received by farmers |
| `queryStats(params)` | Custom query with any NASS filters |

## World Bank

```typescript
import { getIndicator, compareCountries, searchIndicators, POPULAR_INDICATORS } from "us-gov-open-data-mcp/sdk/world-bank";
```

| Function | Description |
|----------|-------------|
| `getIndicator(id, opts?)` | Get indicator for a country (default: US) |
| `compareCountries(id, countries, opts?)` | Compare across countries |
| `searchIndicators(query)` | Find indicator codes by keyword |
| `listCountries()` | List all countries with metadata |

## College Scorecard

```typescript
import { searchSchools, getSchoolById, querySchools, getMostExpensive, getHighestEarners, getHighestGraduationRates } from "us-gov-open-data-mcp/sdk/college-scorecard";
```

| Function | Description |
|----------|-------------|
| `searchSchools(opts)` | Search by name, state, ownership, with sorting |
| `getSchoolById(id)` | Get a specific school by Scorecard ID |
| `querySchools(params)` | Advanced query with field filters and ranges |
| `getMostExpensive(opts?)` | Schools with highest tuition |
| `getHighestEarners(opts?)` | Schools with highest median earnings 10yr post-entry |
| `getHighestGraduationRates(opts?)` | Schools with highest completion rates |

## NREL (Clean Energy)

```typescript
import { searchAltFuelStations, getUtilityRates, getSolarResource } from "us-gov-open-data-mcp/sdk/nrel";
```

| Function | Description |
|----------|-------------|
| `searchAltFuelStations(opts)` | EV chargers, hydrogen, CNG, biodiesel stations by state/zip/fuel type |
| `getUtilityRates(lat, lon)` | Residential/commercial/industrial electricity rates by location |
| `getSolarResource(lat, lon)` | Solar irradiance (GHI, DNI) with monthly breakdowns |

## FDA (OpenFDA)

```typescript
import { searchDrugEvents, searchDrugLabels, searchFoodRecalls, searchDeviceEvents, countDrugEvents } from "us-gov-open-data-mcp/sdk/fda";
```

| Function | Description |
|----------|-------------|
| `searchDrugEvents(opts)` | Drug adverse event reports (20M+ records) |
| `searchDrugLabels(opts)` | Drug labels and package inserts |
| `searchFoodRecalls(opts)` | Food recall enforcement reports by classification |
| `searchDeviceEvents(opts)` | Medical device adverse event reports |
| `countDrugEvents(field, opts?)` | Aggregate drug events by any field (top reactions, drugs, etc.) |

## EPA

```typescript
import { getAirQuality, searchFacilities, getFacilityDetail, getUVIndex } from "us-gov-open-data-mcp/sdk/epa";
```

| Function | Description |
|----------|-------------|
| `getAirQuality(opts)` | County-level air quality measures by state |
| `searchFacilities(opts)` | EPA-regulated facilities: compliance, violations (ECHO) |
| `getFacilityDetail(id)` | Detailed compliance report for a facility |
| `getUVIndex(zip)` | UV index forecast by ZIP code |

## Senate Lobbying Disclosures

```typescript
import { searchFilings, getFilingDetail, searchContributions, searchRegistrants, searchClients } from "us-gov-open-data-mcp/sdk/senate-lobbying";
```

| Function | Description |
|----------|-------------|
| `searchFilings(opts)` | Search lobbying filings by registrant, client, issue, year |
| `getFilingDetail(uuid)` | Full filing detail: issues, bills lobbied, lobbyist names |
| `searchContributions(opts)` | Campaign contributions made by registered lobbyists |
| `searchRegistrants(opts)` | Search lobbying firms and organizations |
| `searchClients(opts)` | Search clients who hired lobbyists |

## NAEP (Nation's Report Card)

```typescript
import { getScores, getAchievementLevels, compareAcrossYears, compareAcrossJurisdictions, compareAcrossGroups } from "us-gov-open-data-mcp/sdk/naep";
```

| Function | Description |
|----------|-------------|
| `getScores(opts)` | Average scale scores by subject, grade, state, demographic group |
| `getAchievementLevels(opts)` | % Below Basic, Basic, Proficient, Advanced |
| `compareAcrossYears(opts)` | Compare scores across assessment years with significance testing |
| `compareAcrossJurisdictions(opts)` | Compare states/districts with significance testing |
| `compareAcrossGroups(opts)` | Achievement gaps by race, gender, poverty |

## CDC Health Data

```typescript
import {
  getLeadingCausesOfDeath, getLifeExpectancy, getMortalityRates,
  getPlacesHealth, getPlacesCityHealth, getWeeklyDeaths,
  getDisabilityData, getDrugOverdoseData, getNutritionObesityData,
  getHistoricalDeathRates, getBirthIndicators, getCovidData, queryDataset
} from "us-gov-open-data-mcp/sdk/cdc";
```

| Function | Description |
|----------|-------------|
| `getLeadingCausesOfDeath(opts?)` | By state and year (1999–2017) |
| `getLifeExpectancy(opts?)` | By race (All Races/Black/White), sex (1900–2018) |
| `getMortalityRates(opts?)` | Quarterly age-adjusted death rates by cause, sex, state (2020–present) |
| `getWeeklyDeaths(opts?)` | Weekly provisional deaths: COVID, pneumonia, influenza, total (updated weekly) |
| `getPlacesHealth(opts?)` | County-level PLACES: 40+ measures (obesity, diabetes, depression, etc.) |
| `getPlacesCityHealth(opts?)` | City-level PLACES: 30+ measures for cities with pop > 50K |
| `getDisabilityData(opts?)` | Disability prevalence by state and type (BRFSS) |
| `getDrugOverdoseData(opts?)` | Drug poisoning/overdose mortality by state (1999–2016) |
| `getNutritionObesityData(opts?)` | Obesity, physical inactivity, nutrition by state (BRFSS) |
| `getHistoricalDeathRates(opts?)` | Age-adjusted death rates for major causes since 1900 |
| `getBirthIndicators(opts?)` | Quarterly birth rates, teen births, preterm, cesarean by race |
| `getCovidData(opts?)` | Weekly COVID cases and deaths by state (through 2023) |
| `queryDataset(id, opts?)` | Custom SODA query against any of 1,485 CDC datasets |

## Regulations.gov

```typescript
import { searchDocuments, getDocument, searchComments, getComment, searchDockets, getDocket } from "us-gov-open-data-mcp/sdk/regulations";
```

| Function | Description |
|----------|-------------|
| `searchDocuments(opts)` | Search proposed rules, final rules, notices by keyword, agency, docket |
| `getDocument(documentId)` | Full document detail including CFR references |
| `searchComments(opts)` | Search public comments submitted on rules/documents |
| `getComment(commentId)` | Full comment detail |
| `searchDockets(opts)` | Search regulatory dockets by keyword or agency |
| `getDocket(docketId)` | Full docket detail |

## USDA FoodData Central

```typescript
import { searchFoods, getFood, listFoods } from "us-gov-open-data-mcp/sdk/usda-fooddata";
```

| Function | Description |
|----------|-------------|
| `searchFoods(opts)` | Search 300K+ foods by keyword, data type, brand |
| `getFood(fdcId)` | Full nutrient breakdown for a specific food |
| `listFoods(opts)` | List foods by data type with pagination |

## FEMA

```typescript
import { getDisasterDeclarations, getHousingAssistance, getPublicAssistance, getFemaRegions, queryDataset } from "us-gov-open-data-mcp/sdk/fema";
```

| Function | Description |
|----------|-------------|
| `getDisasterDeclarations(opts?)` | Disaster declarations by state, year, type (DR/EM/FM) |
| `getHousingAssistance(opts?)` | Individual housing assistance grants and amounts |
| `getPublicAssistance(opts?)` | Public infrastructure grants by disaster/state |
| `getFemaRegions()` | List all 10 FEMA regions with states |
| `queryDataset(opts)` | Query any OpenFEMA dataset with OData filters |

## NHTSA

```typescript
import { getRecalls, getComplaints, decodeVin, getAllMakes, getModelsForMake } from "us-gov-open-data-mcp/sdk/nhtsa";
```

| Function | Description |
|----------|-------------|
| `getRecalls(opts)` | Vehicle safety recalls by make, model, year |
| `getComplaints(opts)` | Consumer safety complaints with crash/fire/injury counts |
| `decodeVin(vin)` | Decode a VIN into make, model, year, engine, safety features |
| `getAllMakes()` | List all vehicle makes |
| `getModelsForMake(opts)` | Get models for a specific make and optional year |

## CMS Provider Data

```typescript
import { searchDatasets, getDatasetDetails, queryDataset, queryByKey } from "us-gov-open-data-mcp/sdk/cms";
```

| Function | Description |
|----------|-------------|
| `searchDatasets(keyword)` | Search CMS provider datasets by keyword |
| `getDatasetDetails(datasetId)` | Get dataset metadata and distribution UUID |
| `queryDataset(opts)` | Query hospital, nursing home, or other provider datasets |
| `queryByKey(key, opts?)` | Query a pre-cataloged dataset by short key (e.g. "hospital_info") |

## HUD

```typescript
import { listStates, listCounties, listMetroAreas, getFairMarketRents, getStateFairMarketRents, getIncomeLimits, getStateIncomeLimits } from "us-gov-open-data-mcp/sdk/hud";
```

| Function | Description |
|----------|-------------|
| `listStates()` | List all states with HUD state codes |
| `listCounties(stateId)` | List counties in a state with FIPS codes |
| `listMetroAreas()` | List all metropolitan/CBSA areas |
| `getFairMarketRents(entityId, year?)` | FMR for a county/metro area (efficiency through 4-bedroom) |
| `getStateFairMarketRents(stateCode, year?)` | State-wide FMR summary |
| `getIncomeLimits(entityId, year?)` | Income limits by household size for a county/metro area |
| `getStateIncomeLimits(stateCode, year?)` | State-wide income limits |

## USPTO PatentsView

```typescript
import { searchPatents, getPatent, searchInventors, searchAssignees } from "us-gov-open-data-mcp/sdk/uspto";
```

| Function | Description |
|----------|-------------|
| `searchPatents(params)` | Search patents by keyword, assignee, inventor, date, CPC class, type |
| `getPatent(patentNumber)` | Get full details for a specific patent |
| `searchInventors(params)` | Search inventors by name, state, country |
| `searchAssignees(params)` | Search assignees (companies/govt/universities) by name, state, country |
