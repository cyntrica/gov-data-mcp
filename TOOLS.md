# Gov Data MCP — Complete Tool Reference

**114 modules, 562 tools** covering federal, state, and international government data.

---

## Table of Contents

- [Economy](#economy)
  - [CareerOneStop (DOL Career Resources)](#careeronestop)
- [Health](#health)
  - [CDC Health Data](#cdc)
  - [ClinicalTrials.gov](#clinical-trials)
  - [CMS](#cms)
  - [FDA (OpenFDA)](#fda)
  - [NIH RePORTER](#nih)
  - [PubMed (NCBI E-utilities)](#pubmed)
  - [SAMHSA (Substance Abuse & Mental Health Services)](#samhsa)
  - [SSA (Social Security Administration)](#ssa)
  - [VA (Department of Veterans Affairs)](#va)
- [Finance](#finance)
  - [CFPB HMDA (Home Mortgage Disclosure Act)](#cfpb-hmda)
  - [FollowTheMoney (State Campaign Finance)](#followthemoney)
  - [ITA (International Trade Administration)](#ita-trade)
  - [OFAC (Office of Foreign Assets Control)](#ofac)
  - [OpenSecrets (Federal Campaign Finance)](#opensecrets)
  - [USITC (U.S. International Trade Commission)](#usitc)
- [Energy](#energy)
  - [California ISO (MIDAS API)](#caiso)
  - [ERCOT (Electric Reliability Council of Texas)](#ercot)
  - [ISO New England](#iso-ne)
- [Environment](#environment)
  - [EPA (Environmental Protection Agency)](#epa)
  - [EPA Air Quality System (AQS)](#epa-aqs)
  - [FWS ECOS (Endangered Species)](#fws)
  - [NOAA Climate Data Online](#noaa)
  - [NOAA Tides & Currents (CO-OPS)](#noaa-coops)
  - [NOAA Space Weather Prediction Center](#noaa-swpc)
  - [NREL (Clean Energy)](#nrel)
  - [National Weather Service](#nws)
  - [USACE CWMS (Corps Water Management System)](#usace-cwms)
  - [USGS (U.S. Geological Survey)](#usgs)
  - [WQP (Water Quality Portal)](#wqp)
- [Education](#education)
  - [College Scorecard](#college-scorecard)
  - [NAEP (Nation's Report Card)](#naep)
  - [NARA (National Archives)](#nara)
  - [Urban Institute Education Data Explorer](#urban-ed)
- [Spending](#spending)
  - [Open Payments (Sunshine Act)](#open-payments)
  - [USAspending](#usaspending)
- [Safety](#safety)
  - [CPSC (Consumer Product Safety Commission)](#cpsc)
  - [DOL (Department of Labor)](#dol)
  - [NHTSA](#nhtsa)
- [Agriculture](#agriculture)
  - [USDA FoodData Central](#usda-fooddata)
  - [USDA NASS QuickStats](#usda-nass)
- [Justice](#justice)
  - [CourtListener (Case Law)](#courtlistener)
  - [DOJ News](#doj-news)
  - [FBI Crime Data Explorer](#fbi)
- [Transportation](#transportation)
  - [BTS (Bureau of Transportation Statistics)](#bts)
  - [FAA Aviation Weather](#faa-weather)
  - [FMCSA (Federal Motor Carrier Safety Administration)](#fmcsa)
  - [NTSB (National Transportation Safety Board)](#ntsb)
- [State & Local](#state-local)
  - [BART (Bay Area Rapid Transit)](#bart)
  - [CAL FIRE Incidents](#calfire)
  - [California Data Exchange Center (CDEC)](#cdec)
  - [Colorado Division of Water Resources](#co-water)
  - [CTA (Chicago Transit Authority)](#cta)
  - [LA Metro (Los Angeles County Metropolitan Transportation Authority)](#la-metro)
  - [MARTA (Metropolitan Atlanta Rapid Transit)](#marta)
  - [MBTA (Massachusetts Bay Transportation Authority)](#mbta)
  - [Chesapeake Bay (CBIBS Buoy System)](#md-bay)
  - [Maryland CHART (Traffic & Road Conditions)](#md-traffic)
  - [Maryland MTA (Transit & MARC Train)](#md-transit)
  - [MN DNR LakeFinder](#mn-lakes)
  - [NC LINC (Log Into North Carolina)](#nc-linc)
  - [OneBusAway (Puget Sound Transit)](#onebusaway)
  - [PATH Train (Port Authority Trans-Hudson)](#path-train)
  - [SEPTA (Southeastern Pennsylvania Transportation Authority)](#septa)
  - [State 511 Traffic (Multi-State Real-Time Traffic)](#state-511)
  - [US State Open Data (50-State Socrata + GIS)](#state-data)
  - [TriMet (Portland Transit)](#trimet)
  - [WMATA (Washington DC Metro & Bus)](#wmata)
  - [WSDOT Ferries (Washington State Ferries)](#wsdot-ferries)
- [International](#international)
  - [State Department Travel Advisories](#state-travel)
  - [World Bank](#world-bank)
- [Infrastructure](#infrastructure)
  - [FCC Broadband Map](#fcc)
- [Procurement](#procurement)
  - [GSA CALC+ Ceiling Rates](#gsa-calc)
  - [SAM.gov (Federal Procurement & Entities)](#sam-gov)
- [Recreation](#recreation)
  - [National Park Service](#nps)
  - [Recreation.gov (RIDB)](#recreation)
- [Science](#science)
  - [DOE OSTI (Scientific Publications & Technical Reports)](#doe-osti)
  - [JPL (Jet Propulsion Laboratory)](#jpl)
  - [NASA Science (NEO, Space Weather, Mars, Exoplanets)](#nasa-science)
  - [NSF (National Science Foundation)](#nsf)
  - [SBIR/STTR](#sbir)
- [Security](#security)
  - [CISA KEV (Known Exploited Vulnerabilities)](#cisa-kev)
  - [NVD (National Vulnerability Database)](#nvd)
- [Culture](#culture)
  - [LOC (Library of Congress)](#loc)
  - [Smithsonian Institution](#smithsonian)
- [Employment](#employment)
  - [USAJobs (Federal Employment)](#usajobs)
- [Economic](#economic)
  - [Bureau of Economic Analysis](#bea)
  - [Bureau of Labor Statistics](#bls)
  - [Energy Information Administration](#eia)
  - [FRED (Federal Reserve Economic Data)](#fred)
  - [U.S. Treasury Fiscal Data](#treasury)
- [Demographics](#demographics)
  - [Census Bureau](#census)
  - [FEMA](#fema)
  - [HUD](#hud)
- [Financial](#financial)
  - [CFPB (Consumer Financial Protection Bureau)](#cfpb)
  - [CFTC (Commodity Futures Trading Commission)](#cftc)
  - [FDIC (Federal Deposit Insurance Corporation)](#fdic)
  - [OpenFEC (Federal Election Commission)](#fec)
  - [SEC EDGAR](#sec)
  - [Senate Lobbying Disclosures](#senate-lobbying)
- [Legislative](#legislative)
  - [Congress.gov](#congress)
  - [eCFR (Code of Federal Regulations)](#ecfr)
  - [Federal Register](#federal-register)
  - [FOIA.gov (Freedom of Information Act)](#foia)
  - [GovInfo](#govinfo)
  - [OpenStates (State Legislation)](#openstates)
  - [Regulations.gov](#regulations)
  - [USCIS (U.S. Citizenship and Immigration Services)](#uscis)
- [Government Operations](#government-operations)
  - [DAP (Digital Analytics Program)](#dap)
  - [OPM Operating Status](#opm)
- [Meta](#meta)
  - [Data.gov (CKAN Catalog)](#data-gov)
- [Consumer Protection](#consumer-protection)
  - [FTC (Federal Trade Commission)](#ftc)
- [Space](#space)
  - [NASA Image & Video Library](#nasa-images)
- [Research](#research)
  - [USPTO Open Data Portal](#uspto)

---

## Economy

### CareerOneStop (DOL Career Resources)

Search occupations by keyword and look up state licensing requirements from the Department of Labor's CareerOneStop API.

**Workflow:** Use cos_occupation_search to find occupations by keyword → cos_licensing to look up state licensing/certification requirements for a specific occupation.

**Tips:** Occupation searches return O*NET codes — use these codes for licensing lookups. Use 2-letter state codes for licensing (e.g. 'TX', 'NY'). The userId parameter is typically your registered user ID or API token.

| Tool | Description | · Auth: `CAREERONESTOP_TOKEN` |
|------|-------------|---|
| `cos_occupation_search` | Search occupations by keyword using the CareerOneStop API. |
| `cos_licensing` | Look up licensing and certification requirements for an occupation by state. |

#### `cos_occupation_search`

Search occupations by keyword using the CareerOneStop API.
Returns matching occupations with O*NET codes, titles, and descriptions.
Use O*NET codes from results for more specific lookups.

**Parameters:**
- `keyword` **(required)** — Occupation keyword (e.g. 'software developer', 'nurse', 'electrician')
- `location` — Location code (default 'US'; use state code like 'TX' for state-specific)

#### `cos_licensing`

Look up licensing and certification requirements for an occupation by state.
Returns license names, types, issuing agencies, and application URLs.
Useful for understanding state-specific professional requirements.

**Parameters:**
- `keyword` **(required)** — Occupation keyword (e.g. 'nurse', 'electrician', 'real estate')
- `state` **(required)** — 2-letter state code (e.g. 'TX', 'CA', 'NY')

---

## Health

### CDC Health Data

U.S. health statistics: leading causes of death, life expectancy, mortality rates, county/city health indicators, weekly death surveillance, disability, COVID-19

**Workflow:** cdc_causes_of_death for mortality, cdc_life_expectancy for longevity, cdc_places_health for county health indicators, cdc_mortality_rates for recent death rates

**Tips:** States use full names ('New York') for causes of death; abbreviations ('NY') for PLACES/COVID. Life expectancy data through 2018; use cdc_mortality_rates for 2020+.

| Tool | Description | · No auth required |
|------|-------------|---|
| `cdc_causes_of_death` | Get leading causes of death in the U.S. by state and year. |
| `cdc_life_expectancy` | Get U.S. life expectancy at birth by race and sex (1900–2018). |
| `cdc_mortality_rates` | Get provisional age-adjusted death rates by cause, sex, and state (quarterly, 2020–present). |
| `cdc_places_health` | Get county-level health indicators from CDC PLACES (BRFSS-based estimates). |
| `cdc_places_city` | Get city-level health indicators from CDC PLACES — obesity, diabetes, smoking, depression, sleep, blood pressure, mental health, and 30+ more measures for every U.S. city with population > 50,000. |
| `cdc_weekly_deaths` | Get weekly provisional death counts by state — COVID-19, pneumonia, influenza, and total deaths. |
| `cdc_disability` | Get disability prevalence by state and type from BRFSS survey. |
| `cdc_drug_overdose` | Get drug poisoning/overdose mortality by state (1999–2016).\nIncludes death rates by state, sex, race, and age group. Critical for opioid crisis analysis. |
| `cdc_nutrition_obesity` | Get adult obesity, physical inactivity, and fruit/vegetable consumption by state from BRFSS.\nTopics: 'Obesity', 'Physical Activity', 'Fruits and Vegetables'. Data by state, race, age, income, education. |
| `cdc_death_rates_historical` | Get age-adjusted death rates for major causes since 1900.\nCauses: 'Heart Disease', 'Cancer', 'Stroke', 'Unintentional injuries', 'CLRD' (chronic lower respiratory diseases).\nGreat for long-term trend analysis — 120+ years of data. |
| `cdc_birth_indicators` | Get quarterly provisional birth indicators: fertility rates, teen birth rates, \npreterm birth rates, cesarean delivery rates, low birthweight — by race/ethnicity.\nTopics: 'General Fertility', 'Teen Birth', 'Preterm', 'Cesarean', 'Low Birthweight', 'NICU', 'Medicaid' |
| `cdc_covid` | Get COVID-19 weekly case and death counts by state (data through early 2023). |
| `cdc_query` | Custom query against any CDC dataset using SODA syntax. |

#### `cdc_causes_of_death`

Get leading causes of death in the U.S. by state and year.
Data from 1999–2017. Causes include heart disease, cancer, kidney disease, etc.

**Parameters:**
- `state` — Full state name: 'New York', 'California', 'Texas'. Omit for all states
- `year` — Year (1999–2017). Omit for all years
- `limit` — Max records (default 200)

#### `cdc_life_expectancy`

Get U.S. life expectancy at birth by race and sex (1900–2018).
Races: 'All Races', 'Black', 'White'. Sex: 'Both Sexes', 'Male', 'Female'.
Note: Data goes through 2018. For more recent mortality trends, use cdc_mortality_rates.

**Parameters:**
- `year` — Year (1900–2018)
- `race` — Race filter
- `sex` — Sex filter
- `limit` — Max records (default 200)

#### `cdc_mortality_rates`

Get provisional age-adjusted death rates by cause, sex, and state (quarterly, 2020–present).
Causes: 'All causes', 'Heart disease', 'Cancer', 'COVID-19', 'Drug overdose', 'Suicide', etc.
Returns rate_overall, rate_sex_female, rate_sex_male, and per-state rates.

**Parameters:**
- `quarter` — Quarter: '2024 Q4', '2025 Q1'. Omit for all.
- `cause` — 'All causes', 'Heart disease', 'Cancer', 'COVID-19', 'Drug overdose', 'Suicide', 'Diabetes', 'Alzheimer disease'
- `rate_type` — Rate type (default: Age-adjusted)
- `limit` — Max records (default 200)

#### `cdc_places_health`

Get county-level health indicators from CDC PLACES (BRFSS-based estimates).
Measures: OBESITY, DIABETES, CSMOKING (smoking), BINGE (binge drinking), BPHIGH (high BP), DEPRESSION, SLEEP (short sleep), CHD (heart disease), COPD, CANCER, STROKE, ARTHRITIS, CASTHMA (asthma), MHLTH (mental distress), PHLTH (physical distress), LPA (physical inactivity), ACCESS2 (no health insurance), DENTAL, CHECKUP, KIDNEY, HIGHCHOL, TEETHLOST, FOODINSECU (food insecurity), LONELINESS, HOUSINSECU (housing insecurity)
Returns crude prevalence (%) by county.

**Parameters:**
- `state` — Two-letter state code: 'NY', 'CA', 'TX'. Omit for all.
- `measure` — Measure ID: 'OBESITY', 'DIABETES', 'CSMOKING', 'DEPRESSION', 'BINGE', 'SLEEP', 'BPHIGH', 'LPA', 'ACCESS2', 'FOODINSECU', 'LONELINESS', 'HOUSINSECU'
- `limit` — Max records (default 200)

#### `cdc_places_city`

Get city-level health indicators from CDC PLACES — obesity, diabetes, smoking, depression, sleep, blood pressure, mental health, and 30+ more measures for every U.S. city with population > 50,000.
Each row contains ALL measures for a city as separate columns (e.g. obesity_crudeprev, diabetes_crudeprev).

**Parameters:**
- `state` — Two-letter state code: 'NY', 'CA', 'TX'
- `city` — City name (partial match): 'Los Angeles', 'Chicago'
- `limit` — Max records (default 200)

#### `cdc_weekly_deaths`

Get weekly provisional death counts by state — COVID-19, pneumonia, influenza, and total deaths.
THIS IS THE MOST CURRENT CDC MORTALITY DATA — updated weekly, covers 2020–present.
Includes percent_of_expected_deaths to detect excess mortality.

**Parameters:**
- `state` — Full state name: 'New York', 'California'. Omit for all.
- `year` — Year (2020–present). Omit for all.
- `limit` — Max records (default 200)

#### `cdc_disability`

Get disability prevalence by state and type from BRFSS survey.
Types: 'Any Disability', 'Mobility Disability', 'Cognitive Disability', 'Hearing Disability', 'Vision Disability', 'Self-care Disability', 'Independent Living Disability', 'No Disability'

**Parameters:**
- `state` — Two-letter state code: 'NY', 'CA'. Omit for all.
- `disability_type` — 'Any Disability', 'Mobility Disability', 'Cognitive Disability', 'Hearing Disability', 'Vision Disability', 'Self-care Disability', 'Independent Living Disability'
- `limit` — Max records (default 200)

#### `cdc_drug_overdose`

Get drug poisoning/overdose mortality by state (1999–2016).\nIncludes death rates by state, sex, race, and age group. Critical for opioid crisis analysis.

**Parameters:**
- `state` — Full state name: 'West Virginia', 'Ohio', 'New Hampshire'. Omit for all.
- `year` — Year (1999–2016)
- `sex` — Sex filter
- `limit` — Max records (default 200)

#### `cdc_nutrition_obesity`

Get adult obesity, physical inactivity, and fruit/vegetable consumption by state from BRFSS.\nTopics: 'Obesity', 'Physical Activity', 'Fruits and Vegetables'. Data by state, race, age, income, education.

**Parameters:**
- `state` — Two-letter state code: 'NY', 'CA', 'TX'. Omit for all.
- `topic` — 'Obesity', 'Physical Activity', 'Fruits and Vegetables'
- `limit` — Max records (default 200)

#### `cdc_death_rates_historical`

Get age-adjusted death rates for major causes since 1900.\nCauses: 'Heart Disease', 'Cancer', 'Stroke', 'Unintentional injuries', 'CLRD' (chronic lower respiratory diseases).\nGreat for long-term trend analysis — 120+ years of data.

**Parameters:**
- `cause` — Cause of death. Omit for all causes.
- `start_year` — Start year (earliest: 1900)
- `end_year` — End year (latest: ~2017)
- `limit` — Max records (default 200)

#### `cdc_birth_indicators`

Get quarterly provisional birth indicators: fertility rates, teen birth rates, \npreterm birth rates, cesarean delivery rates, low birthweight — by race/ethnicity.\nTopics: 'General Fertility', 'Teen Birth', 'Preterm', 'Cesarean', 'Low Birthweight', 'NICU', 'Medicaid'

**Parameters:**
- `topic` — 'General Fertility', 'Teen Birth', 'Preterm', 'Cesarean', 'Low Birthweight', 'NICU', 'Medicaid'
- `race_ethnicity` — 'All races and origins', 'Hispanic', 'Non-Hispanic Black', 'Non-Hispanic White', 'Non-Hispanic Asian'
- `limit` — Max records (default 200)

#### `cdc_covid`

Get COVID-19 weekly case and death counts by state (data through early 2023).
States use two-letter abbreviations: 'NY', 'CA', 'TX'.

**Parameters:**
- `state` — Two-letter state abbreviation: 'NY', 'CA', 'TX'
- `limit` — Max records (default 200)

#### `cdc_query`

Custom query against any CDC dataset using SODA syntax.
Datasets: bi63-dtpu (death 1999–2017), w9j2-ggv5 (life expectancy), 489q-934x (mortality rates), swc5-untb (PLACES county), dxpw-cm5u (PLACES city), pwn4-m3yp (COVID), r8kw-7aab (weekly deaths), s2qv-b27b (disability), xbxb-epbu (drug overdose), hn4x-zwk7 (nutrition/obesity), 6rkc-nb2q (historical death rates), 76vv-a7x8 (birth indicators)

**Parameters:**
- `dataset_id` **(required)** — Dataset ID, e.g. 'bi63-dtpu'
- `where` — SODA $where clause: "year = '2021' AND state = 'New York'"
- `select` — SODA $select: 'year, state, deaths'
- `order` — SODA $order: 'year DESC'
- `group` — SODA $group: 'year'
- `limit` — Max rows (default 1000)

---

### ClinicalTrials.gov

Search 400K+ clinical trials: conditions, drugs, sponsors, phases, recruitment status, locations, results. Explore data model fields, enum values, and field statistics. Geo-search for trials near a location. Cross-reference with FDA, CDC, NIH, and lobbying data. No API key required.

**Workflow:** Use clinical_trials_search to find trials by condition/drug/sponsor → clinical_trials_detail for full protocol → clinical_trials_results for outcomes/adverse events on completed trials → clinical_trials_stats for enrollment breakdown → clinical_trials_field_values for analytics (top conditions, sponsors, phases).

**Tips:** Statuses: RECRUITING, COMPLETED, ACTIVE_NOT_RECRUITING, TERMINATED, SUSPENDED, WITHDRAWN, NOT_YET_RECRUITING, ENROLLING_BY_INVITATION. Phases: EARLY_PHASE1, PHASE1, PHASE2, PHASE3, PHASE4, NA. Study types: INTERVENTIONAL, OBSERVATIONAL, EXPANDED_ACCESS. Intervention types: DRUG, BIOLOGICAL, DEVICE, PROCEDURE, BEHAVIORAL, DIETARY_SUPPLEMENT, etc. Use geo filter with clinical_trials_by_location for 'find trials near me' queries. Use agg_filters for shorthand: 'results:with' (only trials with results), 'sex:f' (female only), 'healthy:y'. Use filter_advanced for Essie expression queries like 'AREA[StartDate]RANGE[2024-01-01,MAX]'. Search by sponsor name (e.g. 'Pfizer', 'NIH') to track industry vs. government research. Phase/studyType filtering uses aggFilters internally (not filter.* params — v2 API design).

| Tool | Description | · No auth required |
|------|-------------|---|
| `clinical_trials_search` | Search ClinicalTrials.gov for clinical trials by condition, drug/intervention, sponsor, status, phase, study type, location, title, or free text. |
| `clinical_trials_detail` | Get full details for a specific clinical trial by NCT ID. |
| `clinical_trials_results` | Get posted results for a completed clinical trial by NCT ID. |
| `clinical_trials_stats` | Get trial count breakdown by recruitment status for a condition or drug/intervention. |
| `clinical_trials_by_location` | Search for clinical trials near a geographic location. |
| `clinical_trials_field_values` | Get value statistics for study data fields — top values, counts, and distributions. |
| `clinical_trials_enums` | List all valid enum values for ClinicalTrials.gov data fields. |
| `clinical_trials_metadata` | Explore the ClinicalTrials.gov study data model — field names, types, and descriptions. |
| `clinical_trials_field_sizes` | Get statistics on list/array field sizes in the ClinicalTrials.gov database. |
| `clinical_trials_size_stats` | Get database statistics: total study count, average study JSON size, size distribution, and largest studies. |

#### `clinical_trials_search`

Search ClinicalTrials.gov for clinical trials by condition, drug/intervention, sponsor, status, phase, study type, location, title, or free text.
Returns trial ID, title, status, phase, sponsor, conditions, enrollment, and hasResults flag.
Use sponsor filter to track pharma company research (e.g. 'Pfizer', 'Moderna', 'NIH').
Use filter_advanced for Essie expressions like 'AREA[StartDate]RANGE[2024-01-01,MAX]'.
Use agg_filters for shorthand filters: 'results:with', 'sex:f', 'healthy:y'.

**Parameters:**
- `query` — Free-text search across all fields
- `condition` — Disease or condition: 'lung cancer', 'diabetes', 'Alzheimer'
- `intervention` — Drug, device, or procedure: 'pembrolizumab', 'insulin'
- `sponsor` — Sponsor/collaborator: 'Pfizer', 'NIH', 'Moderna'
- `titles` — Title/acronym search: 'KEYNOTE', 'SPRINT'
- `outcomes` — Outcome measure search: 'overall survival', 'HbA1c'
- `lead_sponsor` — Lead sponsor name only (not collaborators): 'National Cancer Institute'
- `study_id` — Study ID search: 'NCT04852770' or org study ID
- `location` — Location search: 'California', 'Germany', 'Mayo Clinic'
- `status` — Trial status. Pipe-delimited for multiple: 'RECRUITING' (Currently recruiting participants), 'NOT_YET_RECRUITING' (Approved but not yet recruiting), 'ACTIVE_NOT_RECRUITING' (Ongoing but no longer recruiting), 'COMPLETED' (Trial has concluded), 'ENROLLING_BY_INVITATION' (Recruiting by invitation only), ... (14 total)
- `phase` — Trial phase: 'EARLY_PHASE1' (Early Phase 1 (exploratory)), 'PHASE1' (Phase 1 (safety/dosage in small group)), 'PHASE2' (Phase 2 (efficacy/side effects in larger group)), 'PHASE3' (Phase 3 (large-scale efficacy confirmation)), 'PHASE4' (Phase 4 (post-market surveillance)), 'NA' (Not applicable (non-drug studies))
- `study_type` — Study type: 'INTERVENTIONAL' (Testing a drug, device, or procedure), 'OBSERVATIONAL' (Observing health outcomes without intervention), 'EXPANDED_ACCESS' (Making experimental treatment available outside trial)
- `filter_advanced` — Essie expression filter: 'AREA[MinimumAge]RANGE[MIN,18 years]'
- `agg_filters` — Aggregation filters: 'results:with,sex:f,healthy:y'
- `sort` — Sort field: '@relevance', 'LastUpdatePostDate', 'EnrollmentCount:desc'
- `page_size` — Results per page (default 10, max 100)
- `page_token` — Pagination token from previous response

#### `clinical_trials_detail`

Get full details for a specific clinical trial by NCT ID.
Returns protocol, eligibility, arms/interventions, design, locations, contacts, and oversight info.
Use the fields param to request only specific sections (reduces response size).

**Parameters:**
- `nct_id` **(required)** — ClinicalTrials.gov NCT ID: 'NCT06000000'
- `fields` — Pipe-separated fields to return: 'NCTId|BriefTitle|EligibilityModule'. Omit for full study.

#### `clinical_trials_results`

Get posted results for a completed clinical trial by NCT ID.
Returns outcome measures, adverse events (serious + other), participant flow, and baseline characteristics.
Only works for trials where hasResults=true. Use clinical_trials_search with agg_filters='results:with' to find them.

**Parameters:**
- `nct_id` **(required)** — ClinicalTrials.gov NCT ID: 'NCT00841061'

#### `clinical_trials_stats`

Get trial count breakdown by recruitment status for a condition or drug/intervention.
Shows how many trials are recruiting, active, completed, terminated, etc.
Works for diseases ('breast cancer') AND drug names ('semaglutide', 'pembrolizumab').
Queries 8 statuses in parallel for comprehensive breakdown.

**Parameters:**
- `condition` **(required)** — Disease, condition, or drug name: 'breast cancer', 'semaglutide'
- `search_as_drug` — Set true to search as drug/intervention instead of condition (for drug names like 'semaglutide')

#### `clinical_trials_by_location`

Search for clinical trials near a geographic location.
Uses the ClinicalTrials.gov geo-distance filter to find trials within a radius of a latitude/longitude point.
Combine with condition or intervention filters to find specific trials nearby.

**Parameters:**
- `latitude` **(required)** — Latitude of the search center: 38.9072 (Washington DC)
- `longitude` **(required)** — Longitude of the search center: -77.0369 (Washington DC)
- `distance` — Search radius with unit: '50mi' (default), '100km'
- `condition` — Filter by condition: 'diabetes', 'breast cancer'
- `intervention` — Filter by intervention: 'pembrolizumab'
- `status` — Filter by status (default: RECRUITING)
- `page_size` — Results per page (default 10)

#### `clinical_trials_field_values`

Get value statistics for study data fields — top values, counts, and distributions.
Powerful analytics tool: find top conditions, top sponsors, phase distributions, intervention type counts.
Examples: fields='Phase' shows trial count by phase; fields='Condition' shows top conditions.

**Parameters:**
- `fields` **(required)** — Pipe-separated field names: 'Phase', 'Condition', 'OverallStatus', 'LeadSponsorName'
- `types` — Filter by field type: 'ENUM' (Enumeration field), 'STRING' (Free-text string field), 'DATE' (Date field), 'INTEGER' (Integer numeric field), 'NUMBER' (Floating-point numeric field), 'BOOLEAN' (Boolean (true/false) field)

#### `clinical_trials_enums`

List all valid enum values for ClinicalTrials.gov data fields.
Returns every enum type (Status, Phase, StudyType, InterventionType, etc.) with all valid values.
Use as a reference when building search filters or understanding field values.

**Parameters:**
- `enum_type` — Filter to a specific enum type: 'Status', 'Phase', 'InterventionType'. Omit for all enums.

#### `clinical_trials_metadata`

Explore the ClinicalTrials.gov study data model — field names, types, and descriptions.
Use to discover available fields for the `fields` parameter in search/detail tools,
or to build advanced filter expressions with AREA[] syntax.

**Parameters:**
- `include_indexed_only` — Include indexed-only fields (default false)
- `include_historic_only` — Include fields only in historic data (default false)

#### `clinical_trials_field_sizes`

Get statistics on list/array field sizes in the ClinicalTrials.gov database.
Shows min/max/top sizes for array fields like Condition, Intervention, Phase.
Useful for understanding data distribution.

**Parameters:**
- `fields` — Pipe-separated field names: 'Phase|Condition|InterventionName'. Omit for all.

#### `clinical_trials_size_stats`

Get database statistics: total study count, average study JSON size, size distribution, and largest studies.
Quick overview of the ClinicalTrials.gov database scope and data volume.

---

### CMS

Centers for Medicare & Medicaid Services — hospital compare, nursing home ratings, home health agencies, hospice, dialysis, Medicare spending, HCAHPS patient surveys, quality measures. No API key required.

**Workflow:** Use cms_search to find datasets by keyword → cms_hospitals for hospital quality data → cms_nursing_homes for nursing home ratings → cms_query for any CMS provider dataset.

**Tips:** CMS has 100+ provider datasets. Use cms_search to discover them. Common dataset keys: hospital_info, nursing_home_info, hospital_mortality, hospital_readmissions, hospital_infections, hospital_timely_care, hospital_spending, hospital_patient_survey, nursing_home_health_citations. Filter by state using conditions like property='state' value='CA'.

| Tool | Description | · No auth required |
|------|-------------|---|
| `cms_search` | Search for CMS provider data datasets by keyword. Returns dataset IDs, titles, and descriptions. Use the ID with cms_query to fetch data. |
| `cms_hospitals` | Query CMS hospital data: general info, quality ratings, mortality, readmissions, infections, patient surveys, Medicare spending. Filter by state or city. |
| `cms_nursing_homes` | Query CMS nursing home data: provider info with five-star ratings, quality measures, health deficiencies/citations. Filter by state. |
| `cms_query` | General-purpose query against any CMS provider dataset by dataset identifier. Use cms_search to find available datasets and their IDs. Supports filtering by any field. |

#### `cms_search`

Search for CMS provider data datasets by keyword. Returns dataset IDs, titles, and descriptions. Use the ID with cms_query to fetch data.

**Parameters:**
- `keyword` **(required)** — Search keyword (e.g. 'hospital', 'nursing home', 'dialysis', 'hospice', 'readmission', 'infection')

#### `cms_hospitals`

Query CMS hospital data: general info, quality ratings, mortality, readmissions, infections, patient surveys, Medicare spending. Filter by state or city.

**Parameters:**
- `dataset` — Hospital dataset to query
- `state` — Two-letter state code (e.g. CA, TX, NY)
- `city` — City name
- `limit` — Max results (default 50)

#### `cms_nursing_homes`

Query CMS nursing home data: provider info with five-star ratings, quality measures, health deficiencies/citations. Filter by state.

**Parameters:**
- `dataset` — Nursing home dataset to query
- `state` — Two-letter state code
- `limit` — Max results (default 50)

#### `cms_query`

General-purpose query against any CMS provider dataset by dataset identifier. Use cms_search to find available datasets and their IDs. Supports filtering by any field.

**Parameters:**
- `dataset_id` **(required)** — CMS dataset identifier (e.g. 'xubh-q36u' for hospitals, '4pq5-n9py' for nursing homes) or catalog key
- `filter_field` — Field name to filter on (e.g. 'state', 'city', 'provider_name')
- `filter_value` — Value to filter for
- `limit` — Max results (default 50)
- `offset` — Offset for pagination

---

### FDA (OpenFDA)

Comprehensive FDA data: drug adverse events, labels, NDC directory, shortages, approvals; device events, 510(k) clearances, classification, PMA, UDI, recalls; food recalls & adverse events; animal/vet adverse events; tobacco problem reports; substance data, UNII, historical documents, and more. 25+ searchable endpoints.

**Workflow:** fda_drug_events/fda_drug_counts for adverse reactions → fda_drug_labels for prescribing info → fda_drug_ndc to identify products → fda_approved_drugs for approval history → fda_drug_shortages for supply issues → fda_drug_recalls for enforcement actions → fda_device_510k/fda_device_pma for device approvals → fda_device_classification for device class → fda_count for aggregation on any endpoint

**Tips:** API key optional but recommended — without key: 240 req/min, 1,000 req/day per IP; with DATA_GOV_API_KEY: 240 req/min, 120,000 req/day. Search syntax: 'field:value', 'field:"Exact Phrase"', '[20200101+TO+20231231]' for date ranges. Combine with '+AND+', '+OR+', '+NOT+'. Use '_exists_:field' or '_missing_:field'. For counts, use '.exact' suffix for full phrase counts (e.g. 'brand_name.exact'). Without '.exact', multi-word values like 'Class III' count as separate words. The fda_count tool works on ANY endpoint — drug, device, food, tobacco, etc.

| Tool | Description | · Auth: `DATA_GOV_API_KEY` |
|------|-------------|---|
| `fda_drug_events` | Search FDA adverse drug event reports (FAERS) — side effects, hospitalizations, deaths. |
| `fda_drug_counts` | Aggregate/count FDA drug adverse event data by any field. |
| `fda_drug_labels` | Search FDA drug product labeling (package inserts / prescribing information — SPL). |
| `fda_drug_ndc` | Search the NDC Directory — National Drug Code product listings (132K+ records). |
| `fda_drug_recalls` | Search FDA drug recall enforcement reports. |
| `fda_approved_drugs` | Search FDA-approved drugs (Drugs@FDA database). |
| `fda_drug_shortages` | Search FDA drug shortage listings — which drugs are in shortage and why. |
| `fda_device_events` | Search FDA medical device adverse event reports (MAUDE) — injuries, malfunctions, deaths. |
| `fda_device_510k` | Search 510(k) premarket clearance decisions (174K+ since 1976). |
| `fda_device_classification` | Search medical device classification — ~1,700 generic device types. |
| `fda_device_enforcement` | Search FDA device recall enforcement reports. |
| `fda_device_recalls` | Search FDA medical device recall reports (RES system). |
| `fda_device_pma` | Search Premarket Approval (PMA) decisions for Class III medical devices. |
| `fda_device_registrations` | Search medical device establishment registrations & listings (336K+ records). |
| `fda_device_udi` | Search the Global Unique Device Identification Database (GUDID). |
| `fda_covid_serology` | Search COVID-19 serology test evaluation results. |
| `fda_food_recalls` | Search FDA food recall enforcement reports. |
| `fda_food_adverse_events` | Search FDA food adverse event reports (CAERS database). |
| `fda_animal_events` | Search animal/veterinary adverse event reports (1.3M+ reports). |
| `fda_tobacco_problems` | Search tobacco product problem reports (~1.3K reports). |
| `fda_historical_docs` | Search historical FDA documents — press releases from 1913 to 2014 (OCR full-text search). |
| `fda_nsde` | Search NDC SPL Data Elements — comprehensive drug product data. |
| `fda_substance` | Search FDA substance data — molecular-level ingredient information. |
| `fda_unii` | Search UNII (Unique Ingredient Identifiers) — links ingredient names to unique chemical IDs. |
| `fda_count` | Count/aggregate any OpenFDA endpoint by a specific field. |

#### `fda_drug_events`

Search FDA adverse drug event reports (FAERS) — side effects, hospitalizations, deaths.
Over 20 million reports. Search by drug name, reaction, seriousness.

Example searches:
- 'patient.drug.openfda.brand_name:aspirin' — events involving aspirin
- 'patient.drug.openfda.generic_name:ibuprofen+AND+serious:1' — serious ibuprofen events
- 'patient.reaction.reactionmeddrapt:nausea' — events where nausea was reported

**Parameters:**
- `search` — OpenFDA search query. Examples: 'field:value', 'field:"Exact Phrase"', 'field:[20200101+TO+20231231]', '_exists_:field'. Combine with '+AND+', '+OR+', '+NOT+'.
- `limit` — Max results (default 10, max 100)

#### `fda_drug_counts`

Aggregate/count FDA drug adverse event data by any field.
For counting other endpoints, use fda_count instead.

Common count fields:
- 'patient.reaction.reactionmeddrapt.exact' — most common adverse reactions
- 'patient.drug.openfda.brand_name.exact' — most reported drug brands
- 'patient.drug.openfda.generic_name.exact' — most reported generic names
- 'receivedate' — reports over time
- 'primarysource.reportercountry.exact' — reports by country

**Parameters:**
- `count_field` **(required)** — Field to count by. Use '.exact' suffix for full phrase counts. E.g. 'patient.reaction.reactionmeddrapt.exact'
- `search` — Optional search filter, e.g. 'patient.drug.openfda.brand_name:aspirin'
- `limit` — Max count results (default 10)

#### `fda_drug_labels`

Search FDA drug product labeling (package inserts / prescribing information — SPL).
Contains indications, warnings, boxed warnings, adverse reactions, drug interactions, dosage.

Example searches:
- 'openfda.brand_name:"Tylenol"' — labeling for Tylenol
- '_exists_:boxed_warning' — all labels with a Black Box Warning
- 'effective_time:[20200101+TO+20231231]' — labels updated in date range
- 'openfda.product_type:"HUMAN PRESCRIPTION DRUG"' — prescription drug labels only

Count fields: openfda.product_type.exact, openfda.brand_name.exact, openfda.route.exact

**Parameters:**
- `search` — OpenFDA search query. Examples: 'field:value', 'field:"Exact Phrase"', 'field:[20200101+TO+20231231]', '_exists_:field'. Combine with '+AND+', '+OR+', '+NOT+'.
- `limit` — Max results (default 10, max 100)

#### `fda_drug_ndc`

Search the NDC Directory — National Drug Code product listings (132K+ records).
Find drugs by brand name, generic name, dosage form, DEA schedule, pharmacological class.
Each entry has product data, active ingredients, packaging info, and openfda annotations.

Example searches:
- 'brand_name:"Tylenol"' — Tylenol products
- 'dea_schedule:"CII"' — Schedule II controlled substances
- 'dosage_form:"LOTION"' — all lotions
- 'active_ingredients.name:"OXYCODONE"' — products containing oxycodone
- 'finished:true' — finished drug products only

Count fields: pharm_class.exact, dea_schedule, dosage_form.exact, route.exact

**Parameters:**
- `search` — OpenFDA search query. Examples: 'field:value', 'field:"Exact Phrase"', 'field:[20200101+TO+20231231]', '_exists_:field'. Combine with '+AND+', '+OR+', '+NOT+'.
- `limit` — Max results (default 10, max 100)

#### `fda_drug_recalls`

Search FDA drug recall enforcement reports.
Find recalled drugs by classification (Class I=most serious), company, or reason.

Example searches:
- 'classification:"Class I"' — most dangerous recalls
- 'recalling_firm:"Pfizer"' — recalls by Pfizer
- 'reason_for_recall:listeria' — recalls due to listeria

**Parameters:**
- `search` — OpenFDA search query. Examples: 'field:value', 'field:"Exact Phrase"', 'field:[20200101+TO+20231231]', '_exists_:field'. Combine with '+AND+', '+OR+', '+NOT+'.
- `limit` — Max results (default 10, max 100)

#### `fda_approved_drugs`

Search FDA-approved drugs (Drugs@FDA database).
Find approved drugs by brand name, sponsor/manufacturer, or application number.
Shows approval history, active ingredients, and marketing status.

Example searches:
- 'openfda.brand_name:"Ozempic"' — find Ozempic
- 'sponsor_name:"Pfizer"' — all Pfizer approvals
- 'products.active_ingredients.name:"SEMAGLUTIDE"' — by ingredient

**Parameters:**
- `search` — OpenFDA search query. Examples: 'field:value', 'field:"Exact Phrase"', 'field:[20200101+TO+20231231]', '_exists_:field'. Combine with '+AND+', '+OR+', '+NOT+'.
- `limit` — Max results (default 10, max 100)

#### `fda_drug_shortages`

Search FDA drug shortage listings — which drugs are in shortage and why.
Tracks status, dosage form, therapeutic category, company, and shortage reason.

Example searches:
- 'status:"Currently in Shortage"' — active shortages
- 'dosage_form:"Capsule"' — capsule shortages
- 'therapeutic_category:"Antiviral"' — antiviral shortages
- 'generic_name:"Adderall"' — specific drug

Count fields: update_type, status.exact, therapeutic_category.exact

**Parameters:**
- `search` — OpenFDA search query. Examples: 'field:value', 'field:"Exact Phrase"', 'field:[20200101+TO+20231231]', '_exists_:field'. Combine with '+AND+', '+OR+', '+NOT+'.
- `limit` — Max results (default 10, max 100)

#### `fda_device_events`

Search FDA medical device adverse event reports (MAUDE) — injuries, malfunctions, deaths.

Example searches:
- 'device.generic_name:pacemaker' — pacemaker events
- 'event_type:death' — events resulting in death

**Parameters:**
- `search` — OpenFDA search query. Examples: 'field:value', 'field:"Exact Phrase"', 'field:[20200101+TO+20231231]', '_exists_:field'. Combine with '+AND+', '+OR+', '+NOT+'.
- `limit` — Max results (default 10, max 100)

#### `fda_device_510k`

Search 510(k) premarket clearance decisions (174K+ since 1976).
A 510(k) demonstrates a device is substantially equivalent to a legally marketed device.

Example searches:
- 'advisory_committee:cv' — cardiovascular devices
- 'openfda.regulation_number:868.5895' — by regulation number
- 'device_name:"pacemaker"' — by device name
- 'applicant:"Medtronic"' — by company

Count fields: country_code, advisory_committee, clearance_type.exact, decision_code

**Parameters:**
- `search` — OpenFDA search query. Examples: 'field:value', 'field:"Exact Phrase"', 'field:[20200101+TO+20231231]', '_exists_:field'. Combine with '+AND+', '+OR+', '+NOT+'.
- `limit` — Max results (default 10, max 100)

#### `fda_device_classification`

Search medical device classification — ~1,700 generic device types.
Returns device class (1=Class I, 2=Class II, 3=Class III), product codes, definitions.

Example searches:
- 'regulation_number:872.6855' — by regulation number
- 'product_code:NOB' — by product code
- 'device_name:"pacemaker"' — by device name
- 'device_class:3' — Class III (highest risk) devices

Count fields: device_class, medical_specialty.exact

**Parameters:**
- `search` — OpenFDA search query. Examples: 'field:value', 'field:"Exact Phrase"', 'field:[20200101+TO+20231231]', '_exists_:field'. Combine with '+AND+', '+OR+', '+NOT+'.
- `limit` — Max results (default 10, max 100)

#### `fda_device_enforcement`

Search FDA device recall enforcement reports.
Same classification system as drug/food recalls: Class I (most dangerous) to Class III.
Note: Records before June 2012 may lack some fields.

Example searches:
- 'classification:"Class I"' — most dangerous recalls
- 'report_date:[20200101+TO+20231231]' — recalls in date range
- 'recalling_firm:"Medtronic"' — by company

Count fields: voluntary_mandated.exact, classification.exact, status.exact

**Parameters:**
- `search` — OpenFDA search query. Examples: 'field:value', 'field:"Exact Phrase"', 'field:[20200101+TO+20231231]', '_exists_:field'. Combine with '+AND+', '+OR+', '+NOT+'.
- `limit` — Max results (default 10, max 100)

#### `fda_device_recalls`

Search FDA medical device recall reports (RES system).
Find recalled devices by name, manufacturer, or reason for recall.

Example searches:
- 'openfda.device_name:"pacemaker"' — pacemaker recalls
- 'reason_for_recall:"software"' — software-related recalls

**Parameters:**
- `search` — OpenFDA search query. Examples: 'field:value', 'field:"Exact Phrase"', 'field:[20200101+TO+20231231]', '_exists_:field'. Combine with '+AND+', '+OR+', '+NOT+'.
- `limit` — Max results (default 10, max 100)

#### `fda_device_pma`

Search Premarket Approval (PMA) decisions for Class III medical devices.
PMA is required for high-risk devices — evaluates safety and effectiveness.

Example searches:
- 'decision_code:APPR' — approved PMAs
- 'product_code:LWP' — by product code
- 'advisory_committee:CV' — cardiovascular devices
- 'applicant:"Medtronic"' — by company

Count fields: advisory_committee, decision_code

**Parameters:**
- `search` — OpenFDA search query. Examples: 'field:value', 'field:"Exact Phrase"', 'field:[20200101+TO+20231231]', '_exists_:field'. Combine with '+AND+', '+OR+', '+NOT+'.
- `limit` — Max results (default 10, max 100)

#### `fda_device_registrations`

Search medical device establishment registrations & listings (336K+ records).
Where devices are manufactured and which devices are made at each establishment.

Example searches:
- 'products.product_code:HQY' — establishments making product code HQY
- 'products.openfda.regulation_number:886.5850' — by regulation number

Count fields: products.openfda.device_class

**Parameters:**
- `search` — OpenFDA search query. Examples: 'field:value', 'field:"Exact Phrase"', 'field:[20200101+TO+20231231]', '_exists_:field'. Combine with '+AND+', '+OR+', '+NOT+'.
- `limit` — Max results (default 10, max 100)

#### `fda_device_udi`

Search the Global Unique Device Identification Database (GUDID).
Detailed device records: description, MRI safety, product codes, sterilization.
Note: Booleans are stored as strings ('true'/'false').

Example searches:
- 'brand_name:"CoRoent"' — by brand
- 'is_rx:true' — prescription devices
- 'mri_safety:"MR Unsafe"' — MRI unsafe devices
- '_exists_:public_device_record_key' — records with a public key

Count fields: product_codes.openfda.device_class, is_rx, mri_safety.exact

**Parameters:**
- `search` — OpenFDA search query. Examples: 'field:value', 'field:"Exact Phrase"', 'field:[20200101+TO+20231231]', '_exists_:field'. Combine with '+AND+', '+OR+', '+NOT+'.
- `limit` — Max results (default 10, max 100)

#### `fda_covid_serology`

Search COVID-19 serology test evaluation results.
FDA's evaluation of antibody test performance (sensitivity/specificity).

Example searches:
- 'antibody_truth:"Positive"' — positive samples
- 'manufacturer:"Abbott"' — tests by manufacturer

Count fields: type (sample material), manufacturer.exact

**Parameters:**
- `search` — OpenFDA search query. Examples: 'field:value', 'field:"Exact Phrase"', 'field:[20200101+TO+20231231]', '_exists_:field'. Combine with '+AND+', '+OR+', '+NOT+'.
- `limit` — Max results (default 10, max 100)

#### `fda_food_recalls`

Search FDA food recall enforcement reports.
Class I (may cause death), Class II (temporary health problems), Class III (unlikely harm).

Example searches:
- 'classification:"Class I"' — most serious recalls
- 'recalling_firm:tyson' — recalls by a specific company
- 'reason_for_recall:listeria' — recalls due to listeria

**Parameters:**
- `search` — OpenFDA search query. Examples: 'field:value', 'field:"Exact Phrase"', 'field:[20200101+TO+20231231]', '_exists_:field'. Combine with '+AND+', '+OR+', '+NOT+'.
- `limit` — Max results (default 10, max 100)

#### `fda_food_adverse_events`

Search FDA food adverse event reports (CAERS database).
Reports of illnesses, allergic reactions, and injuries from foods and dietary supplements.

Example searches:
- 'products.industry_name:"Dietary Supplements"' — supplement events
- 'reactions:"hospitalization"' — events involving hospitalization

Count fields: reactions.exact, outcomes.exact, products.industry_name.exact

**Parameters:**
- `search` — OpenFDA search query. Examples: 'field:value', 'field:"Exact Phrase"', 'field:[20200101+TO+20231231]', '_exists_:field'. Combine with '+AND+', '+OR+', '+NOT+'.
- `limit` — Max results (default 10, max 100)

#### `fda_animal_events`

Search animal/veterinary adverse event reports (1.3M+ reports).
Reports of drug side effects in animals — dogs, cats, horses, cattle, etc.
Each report has: animal info (species, breed), drugs, reactions (VEDDRA terms), outcomes.
Note: Some fields may contain 'MSK' (masked) values for privacy.

Example searches:
- 'animal.species:"Dog"' — dog events
- 'original_receive_date:[20200101+TO+20231231]' — events in date range
- 'serious_ae:true' — serious adverse events only

Count fields: animal.species.exact, primary_reporter.exact, serious_ae

**Parameters:**
- `search` — OpenFDA search query. Examples: 'field:value', 'field:"Exact Phrase"', 'field:[20200101+TO+20231231]', '_exists_:field'. Combine with '+AND+', '+OR+', '+NOT+'.
- `limit` — Max results (default 10, max 100)

#### `fda_tobacco_problems`

Search tobacco product problem reports (~1.3K reports).
Reports about damaged, defective, or health-affecting tobacco products.
E-cigarettes/vaping products dominate (~60% of reports).

Example searches:
- 'date_submitted:[20180101+TO+20200723]' — reports in date range
- 'nonuser_affected:"Yes"' — reports where non-users were affected

Count fields: tobacco_products.exact, reported_health_problems.exact

**Parameters:**
- `search` — OpenFDA search query. Examples: 'field:value', 'field:"Exact Phrase"', 'field:[20200101+TO+20231231]', '_exists_:field'. Combine with '+AND+', '+OR+', '+NOT+'.
- `limit` — Max results (default 10, max 100)

#### `fda_historical_docs`

Search historical FDA documents — press releases from 1913 to 2014 (OCR full-text search).

Example searches:
- 'doc_type:pr+AND+text:"poison prevention packaging"' — press releases about poison prevention
- 'year:1920+AND+text:Botulism' — 1920s botulism references
- 'text:"thalidomide"' — mentions of thalidomide

**Parameters:**
- `search` — OpenFDA search query. Examples: 'field:value', 'field:"Exact Phrase"', 'field:[20200101+TO+20231231]', '_exists_:field'. Combine with '+AND+', '+OR+', '+NOT+'.
- `limit` — Max results (default 10, max 100)

#### `fda_nsde`

Search NDC SPL Data Elements — comprehensive drug product data.
Use '_missing_:marketing_end_date' for products still on market.
Use '_exists_:marketing_end_date' for discontinued products.

Example searches:
- 'package_ndc:"55700-019-60"' — by NDC
- '_missing_:"marketing_end_date"' — currently marketed products

**Parameters:**
- `search` — OpenFDA search query. Examples: 'field:value', 'field:"Exact Phrase"', 'field:[20200101+TO+20231231]', '_exists_:field'. Combine with '+AND+', '+OR+', '+NOT+'.
- `limit` — Max results (default 10, max 100)

#### `fda_substance`

Search FDA substance data — molecular-level ingredient information.
Search by name, CAS code, UNII, or molecular formula.

Example searches:
- 'names.name:"PARACETAMOL"' — by substance name
- 'codes.code:"220127-57-1"' — by CAS registry number
- 'unii:"09211A0HHL"' — by UNII
- 'structure.formula:"C6H12"' — by molecular formula

**Parameters:**
- `search` — OpenFDA search query. Examples: 'field:value', 'field:"Exact Phrase"', 'field:[20200101+TO+20231231]', '_exists_:field'. Combine with '+AND+', '+OR+', '+NOT+'.
- `limit` — Max results (default 10, max 100)

#### `fda_unii`

Search UNII (Unique Ingredient Identifiers) — links ingredient names to unique chemical IDs.

Example searches:
- 'unii:"L7V4I673D2"' — by UNII code
- 'substance_name:"ASPIRIN"' — by substance name

**Parameters:**
- `search` — OpenFDA search query. Examples: 'field:value', 'field:"Exact Phrase"', 'field:[20200101+TO+20231231]', '_exists_:field'. Combine with '+AND+', '+OR+', '+NOT+'.
- `limit` — Max results (default 10, max 100)

#### `fda_count`

Count/aggregate any OpenFDA endpoint by a specific field.
Returns top terms with counts. Works on ALL FDA endpoints.
IMPORTANT: Use '.exact' suffix for full phrase counts (e.g. 'brand_name.exact').
Without '.exact', multi-word values like 'Class III' are split into separate word counts.

Endpoints: drug/event, drug/label, drug/ndc, drug/enforcement, drug/drugsfda, drug/shortages,
device/event, device/510k, device/classification, device/enforcement, device/recall,
device/pma, device/udi, food/enforcement, food/event, animalandveterinary/event, tobacco/problem.

Example count_field values per endpoint:
- drug/ndc → pharm_class.exact, dea_schedule, dosage_form.exact
- drug/shortages → update_type, status.exact, therapeutic_category.exact
- device/510k → country_code, advisory_committee, clearance_type.exact
- tobacco/problem → tobacco_products.exact, reported_health_problems.exact
- food/event → reactions.exact, outcomes.exact
- animalandveterinary/event → animal.species.exact, primary_reporter.exact

**Parameters:**
- `endpoint` **(required)** — OpenFDA endpoint path (e.g. 'drug/ndc', 'device/510k', 'tobacco/problem')
- `count_field` **(required)** — Field to count. Use '.exact' for full phrases (e.g. 'pharm_class.exact')
- `search` — Optional search filter to narrow results before counting
- `limit` — Max count results (default: API default)

---

### NIH RePORTER

Search NIH-funded research projects by disease, investigator, institution, state, and funding amount. Track research spending by disease category (RCDC), institute, and grant type. Cross-reference with CDC (health outcomes), FDA (drug approvals), ClinicalTrials.gov (trials), and Open Payments (pharma influence). No API key required.

**Workflow:** Use nih_search_projects to find grants by topic/PI/org → nih_spending_by_category for disease funding trends → nih_projects_by_agency for institute breakdown → nih_search_publications for linked publications.

**Tips:** Agencies: NCI (cancer), NHLBI (heart/lung), NIDDK (diabetes/kidney), NIA (aging/Alzheimer's), NIAID (infectious diseases), NIMH (mental health), NIDA (drug abuse). Spending categories: 27=Cancer, 7=Alzheimer's, 41=Diabetes, 60=HIV/AIDS, 93=Opioids, 30=Cardiovascular, 85=Mental Health, 38=COVID-19. Use fiscal_years to track funding trends over time.

| Tool | Description | · No auth required |
|------|-------------|---|
| `nih_search_projects` | Search NIH-funded research projects by text, disease area, investigator, institution, state, agency, spending category, grant type, and funding amount. |
| `nih_search_publications` | Search for publications linked to NIH-funded projects. |
| `nih_spending_by_category` | Get NIH project counts and estimated funding for a disease/research area across fiscal years. |
| `nih_projects_by_agency` | Get project counts by NIH institute/center for a fiscal year. |

#### `nih_search_projects`

Search NIH-funded research projects by text, disease area, investigator, institution, state, agency, spending category, grant type, and funding amount.
Returns project number, title, PI, organization, award amount, agency, activity code, and dates.
Use to find research grants for any disease, track institutional funding, or identify PIs.

**Parameters:**
- `text` — Free-text search in titles, abstracts, and terms: 'breast cancer', 'CRISPR', 'opioid'
- `fiscal_years` — Fiscal years: [2024] or [2020,2021,2022,2023,2024]
- `agencies` — NIH institute codes: 'NCI' (National Cancer Institute), 'NHLBI' (National Heart, Lung, and Blood Institute), 'NIDDK' (National Institute of Diabetes and Digestive and Kidney Diseases), 'NINDS' (National Institute of Neurological Disorders and Stroke), 'NIA' (National Institute on Aging), 'NIAID' (National Institute of Allergy and Infectious Diseases), 'NIGMS' (National Institute of General Medical Sciences), 'NIMH' (National Institute of Mental Health), ... (32 total)
- `pi_name` — Principal investigator name (partial match): 'Fauci', 'Collins'
- `org_names` — Organization names (wildcard): ['JOHNS HOPKINS'], ['STANFORD']
- `org_states` — State abbreviations: ['CA','NY'], ['TX']
- `spending_categories` — RCDC category IDs: [27]=Cancer, [7]=Alzheimer's, [41]=Diabetes, [93]=Opioids, [60]=HIV/AIDS
- `activity_codes` — Grant types: 'R01' (Research Project Grant (most common independent investigator grant)), 'R21' (Exploratory/Developmental Research Grant (smaller, high-risk)), 'R43' (SBIR Phase I (Small Business Innovation Research)), 'R44' (SBIR Phase II), 'P01' (Research Program Project Grant (multi-investigator)), 'P30' (Center Core Grant), 'P50' (Specialized Center), 'U01' (Research Project Cooperative Agreement), ... (20 total)
- `funding_mechanism` — Mechanism codes: 'RG' (Research Grants), 'PC' (Research Centers), 'CT' (Clinical Trial or Study Cooperative Agreement), 'TN' (Research Training (Individual and Institutional)), 'CR' (Research Career Programs), 'SB' (Small Business Awards (SBIR/STTR)), 'OT' (Other Transactions)
- `award_amount_min` — Minimum award amount in dollars
- `award_amount_max` — Maximum award amount in dollars
- `covid_response` — COVID funding: ['All'], ['C3'] (CARES Act), ['C6'] (American Rescue Plan)
- `exclude_subprojects` — Exclude subprojects for cleaner counts (default: true)
- `limit` — Results per page (default 10, max 50)
- `offset` — Starting offset for pagination
- `sort_field` — Sort by: 'award_amount', 'project_start_date', 'fiscal_year'
- `sort_order` — Sort order

#### `nih_search_publications`

Search for publications linked to NIH-funded projects.
Search by PubMed IDs (PMIDs), application IDs, or core project numbers.
Returns PMID and linked project number.

**Parameters:**
- `pmids` — PubMed IDs: [33298401, 33105091]
- `core_project_nums` — Core project numbers: ['R01AG060942']
- `appl_ids` — Application IDs
- `limit` — Results per page (default 10)
- `offset` — Starting offset for pagination

#### `nih_spending_by_category`

Get NIH project counts and estimated funding for a disease/research area across fiscal years.
Uses RCDC spending categories with an agency-based fallback for more accurate counts.
Common category IDs: 27=Cancer, 7=Alzheimer's, 41=Diabetes, 60=HIV/AIDS, 93=Opioids, 30=Cardiovascular, 85=Mental Health, 38=COVID-19, 118=Stroke, 92=Obesity.
Note: For the most reliable counts by disease area, also try nih_projects_by_agency with the relevant institute.

**Parameters:**
- `category_id` **(required)** — RCDC spending category ID: 27=Cancer, 7=Alzheimer's, 41=Diabetes, 60=HIV/AIDS, 93=Opioids
- `fiscal_years` **(required)** — Fiscal years to compare: [2020,2021,2022,2023,2024]

#### `nih_projects_by_agency`

Get project counts by NIH institute/center for a fiscal year.
Shows which institutes fund the most research: NCI (cancer), NIAID (infectious diseases), etc.
Useful for understanding NIH budget allocation across disease areas.

**Parameters:**
- `fiscal_year` **(required)** — Fiscal year: 2024
- `agencies` — Specific agency codes to check (default: top 25)

---

### PubMed (NCBI E-utilities)

Search and retrieve biomedical literature from PubMed/MEDLINE — 36M+ citations, abstracts, MeSH terms, and citation links via NCBI E-utilities.

**Workflow:** pubmed_search to find articles → pubmed_summary for metadata → pubmed_fetch for full records

**Tips:** API key optional but increases rate limit from 3/sec to 10/sec. Use MeSH terms for precise searches. Combine with NIH Reporter for grant→publication links.

| Tool | Description | · Auth: `NCBI_API_KEY` |
|------|-------------|---|
| `pubmed_search` | Search PubMed for biomedical articles by keyword, MeSH term, author, or date range. |
| `pubmed_summary` | Get article summaries (title, authors, journal, date, DOI) for one or more PMIDs. |
| `pubmed_fetch` | Get full article abstracts as plain text or XML for one or more PMIDs. |
| `pubmed_info` | Get PubMed database statistics: total record count, last update, searchable fields, and available link types. |
| `pubmed_related` | Find articles related to a given PMID, ranked by relevance score. |
| `pubmed_cited_by` | Find articles that cite a given PMID. |
| `pubmed_search_and_summarize` | Combined search + summary: searches PubMed and returns full article metadata in one call. |
| `pubmed_databases` | List all available NCBI Entrez databases (PubMed, PMC, Gene, Protein, etc.). |

#### `pubmed_search`

Search PubMed for biomedical articles by keyword, MeSH term, author, or date range.
Returns PMIDs and search metadata. Use pubmed_summary to get full article details for the returned PMIDs.
Supports Boolean operators (AND, OR, NOT) and field tags like [MeSH Terms], [Author], [Journal].

**Parameters:**
- `query` **(required)** — Search query: 'breast cancer treatment', 'COVID-19 vaccine[MeSH Terms]', 'Smith J[Author] AND diabetes'
- `max_results` — Max results to return (default 20, max 500)
- `offset` — Starting offset for pagination (default 0)
- `sort` — Sort order (default: relevance)
- `date_type` — Date field: pdat=publication date, edat=Entrez date
- `min_date` — Start date (YYYY/MM/DD or YYYY/MM or YYYY)
- `max_date` — End date (YYYY/MM/DD or YYYY/MM or YYYY)

#### `pubmed_summary`

Get article summaries (title, authors, journal, date, DOI) for one or more PMIDs.
Use after pubmed_search to get full metadata for returned PMIDs.
Accepts up to 200 PMIDs at once.

**Parameters:**
- `pmids` **(required)** — Comma-separated PMIDs: '12345,67890,11111' or a single PMID: '12345'

#### `pubmed_fetch`

Get full article abstracts as plain text or XML for one or more PMIDs.
Returns the complete abstract text including title, authors, affiliation, and abstract body.
Use for reading full abstracts when pubmed_summary metadata is not enough.

**Parameters:**
- `pmids` **(required)** — Comma-separated PMIDs: '12345,67890'
- `format` — Output format: text (default) or xml

#### `pubmed_info`

Get PubMed database statistics: total record count, last update, searchable fields, and available link types.
Useful for discovering which fields are available for targeted searches (e.g. [MeSH Terms], [Author], [Journal]).

#### `pubmed_related`

Find articles related to a given PMID, ranked by relevance score.
Uses NCBI's pre-computed similarity scores based on shared MeSH terms, co-citations, and content overlap.
Great for literature discovery — finding similar papers to a known article.

**Parameters:**
- `pmid` **(required)** — Source PMID to find related articles for: '12345'
- `max_results` — Max related articles to return (default 20)

#### `pubmed_cited_by`

Find articles that cite a given PMID.
Useful for tracking the impact and influence of a paper — which subsequent papers reference it.
Use pubmed_summary on the returned PMIDs to get article details.

**Parameters:**
- `pmid` **(required)** — PMID to find citing articles for: '12345'

#### `pubmed_search_and_summarize`

Combined search + summary: searches PubMed and returns full article metadata in one call.
Convenience tool that chains pubmed_search → pubmed_summary.
Returns article titles, authors, journals, dates, and DOIs directly.

**Parameters:**
- `query` **(required)** — Search query: 'CRISPR gene therapy', 'COVID-19 mRNA vaccine efficacy'
- `max_results` — Max results (default 20, max 100 for combined call)
- `offset` — Starting offset for pagination
- `sort` — Sort order
- `date_type` — Date field: pdat=publication date, edat=Entrez date
- `min_date` — Start date (YYYY/MM/DD)
- `max_date` — End date (YYYY/MM/DD)

#### `pubmed_databases`

List all available NCBI Entrez databases (PubMed, PMC, Gene, Protein, etc.).
Useful for discovering which NCBI databases exist beyond PubMed.

---

### SAMHSA (Substance Abuse & Mental Health Services)

Find substance abuse and mental health treatment facilities nationwide via the FindTreatment.gov locator

**Workflow:** samhsa_treatment_search → find treatment facilities by location and service type

**Tips:** Service types: SA (substance abuse), MH (mental health), BOTH. Provide an address or city/state for location search.

| Tool | Description | · No auth required |
|------|-------------|---|
| `samhsa_treatment_search` | Find substance abuse and mental health treatment facilities by location. |

#### `samhsa_treatment_search`

Find substance abuse and mental health treatment facilities by location.
Service types: SA (substance abuse), MH (mental health), BOTH.

**Parameters:**
- `address` **(required)** — Address, city/state, or ZIP code (e.g. 'Washington, DC' or '20001')
- `serviceType` — SA=substance abuse, MH=mental health, BOTH (default)
- `limit` — Max results (default 25)

---

### SSA (Social Security Administration)

Social Security Administration open data — OASDI beneficiary statistics and program data

**Workflow:** ssa_beneficiaries → get beneficiary data links and summary info

**Tips:** SSA publishes aggregate statistics on Social Security beneficiaries, payments, and program participation

| Tool | Description | · No auth required |
|------|-------------|---|
| `ssa_beneficiaries` | Get SSA OASDI and SSI beneficiary data resources. |

#### `ssa_beneficiaries`

Get SSA OASDI and SSI beneficiary data resources.
Returns links to downloadable datasets for Social Security beneficiaries by state, county, and ZIP code.

---

### VA (Department of Veterans Affairs)

Department of Veterans Affairs — search VA facilities including hospitals, clinics, cemeteries, benefits offices, and vet centers by location and type. Requires free API key from developer.va.gov.

**Workflow:** va_facilities to search facilities by state, type, and pagination

**Tips:** Facility types: 'health' (hospitals/clinics), 'benefits' (regional offices), 'cemetery' (national cemeteries), 'vet_center' (readjustment counseling). Use two-letter state codes: 'CA', 'TX', 'NY'.

| Tool | Description | · Auth: `VA_API_KEY` |
|------|-------------|---|
| `va_facilities` | Search VA facilities (hospitals, clinics, cemeteries, benefits offices, vet centers) by state and type. |

#### `va_facilities`

Search VA facilities (hospitals, clinics, cemeteries, benefits offices, vet centers) by state and type.
Returns facility names, addresses, phone numbers, and services.

Facility types: 'health' (hospitals/clinics), 'benefits' (regional offices), 'cemetery' (national cemeteries), 'vet_center' (readjustment counseling).

Example: state='CA', type='health', limit=10

**Parameters:**
- `state` — Two-letter state code (e.g. 'CA', 'TX', 'NY')
- `type` — Facility type filter
- `limit` — Results per page (default 20, max 100)
- `page` — Page number (default 1)

---

## Finance

### CFPB HMDA (Home Mortgage Disclosure Act)

Home Mortgage Disclosure Act data from the CFPB/FFIEC. Nationwide and filtered mortgage lending aggregations by race, ethnicity, sex, loan type, and geography. Institution filers list, rate spread calculator, and ULI (Universal Loan Identifier) tools.

**Workflow:** hmda_filers to find institutions (LEIs) → hmda_nationwide_aggregations for national mortgage stats by year → hmda_filtered_aggregations for state/MSA/institution breakdowns → hmda_rate_spread to calculate rate spreads → hmda_check_digit / hmda_validate_uli for ULI operations

**Tips:** Year is required for aggregation queries (available years vary, typically 2018+). Filter params accept comma-separated values for multiple selections (e.g. races='White,Asian'). Geographic filters: states (FIPS codes like '06' for CA), msamds (MSA/MD codes), counties (FIPS). Institution filter: leis (Legal Entity Identifiers). Rate spread calculator requires specific action_taken_type (1-8), amortization_type ('FixedRate' or 'VariableRate'), and lock_in_date in MM/DD/YYYY format.

| Tool | Description | · No auth required |
|------|-------------|---|
| `hmda_nationwide_aggregations` | Get nationwide mortgage lending aggregation data from HMDA. |
| `hmda_filtered_aggregations` | Get mortgage lending aggregation data filtered by geography or institution. |
| `hmda_filers` | List financial institutions that filed HMDA data for a given year. |
| `hmda_rate_spread` | Calculate the rate spread for a mortgage loan using the CFPB rate spread calculator. |
| `hmda_check_digit` | Generate a ULI (Universal Loan Identifier) check digit from a loan ID. |
| `hmda_validate_uli` | Validate a Universal Loan Identifier (ULI) by verifying its check digit. |

#### `hmda_nationwide_aggregations`

Get nationwide mortgage lending aggregation data from HMDA.
Shows aggregate mortgage statistics across the entire U.S. for a given year.
Filter by demographics (race, ethnicity, sex), loan characteristics, and actions taken.
Useful for analyzing national mortgage lending trends and fair lending patterns.

**Parameters:**
- `year` **(required)** — Filing year (e.g. 2022). Required.
- `actions_taken` — Action taken codes (comma-separated): 1=originated, 2=approved not accepted, 3=denied, etc.
- `loan_types` — Loan type codes (comma-separated): 1=conventional, 2=FHA, 3=VA, 4=USDA
- `races` — Race filter (comma-separated): 'White', 'Asian', 'Black or African American', etc.
- `sexes` — Sex filter (comma-separated): 'Male', 'Female', 'Joint'

#### `hmda_filtered_aggregations`

Get mortgage lending aggregation data filtered by geography or institution.
Filter by state (FIPS code), MSA/MD, county, or institution (LEI).
Same demographic filters as nationwide. At least one geographic or institution filter recommended.

**Parameters:**
- `year` **(required)** — Filing year (e.g. 2022). Required.
- `states` — State FIPS codes (comma-separated): '06' (CA), '36' (NY), '48' (TX)
- `msamds` — MSA/MD codes (comma-separated)
- `leis` — Legal Entity Identifiers (comma-separated) to filter by institution
- `actions_taken` — Action taken codes (comma-separated)
- `loan_types` — Loan type codes (comma-separated)
- `races` — Race filter (comma-separated)
- `sexes` — Sex filter (comma-separated)

#### `hmda_filers`

List financial institutions that filed HMDA data for a given year.
Returns institution names, LEIs, and filing details.
Use to find LEIs for filtering aggregation queries by institution.

**Parameters:**
- `year` **(required)** — Filing year (e.g. 2022). Required.

#### `hmda_rate_spread`

Calculate the rate spread for a mortgage loan using the CFPB rate spread calculator.
Rate spread = difference between the loan APR and the average prime offer rate (APOR).
Used for HMDA reporting and fair lending analysis.

**Parameters:**
- `action_taken_type` **(required)** — Action taken type (1=originated, 2=approved not accepted, etc.)
- `loan_term` **(required)** — Loan term in months (e.g. '360' for 30-year)
- `amortization_type` **(required)** — Amortization type
- `apr` **(required)** — Annual percentage rate (e.g. '6.0')
- `lock_in_date` **(required)** — Rate lock-in date in MM/DD/YYYY format (e.g. '01/15/2023')
- `reverse_mortgage` **(required)** — Reverse mortgage flag (1=yes, 2=no)

#### `hmda_check_digit`

Generate a ULI (Universal Loan Identifier) check digit from a loan ID.
Appends the two-digit check digit to create a valid ULI.
Used for HMDA reporting compliance.

**Parameters:**
- `loan_id` **(required)** — Loan ID (LEI + institution-assigned loan identifier, without check digit)

#### `hmda_validate_uli`

Validate a Universal Loan Identifier (ULI) by verifying its check digit.
Returns whether the ULI is valid or invalid.
Used for HMDA reporting compliance verification.

**Parameters:**
- `uli` **(required)** — Full ULI to validate (loan ID + 2-digit check digit)

---

### FollowTheMoney (State Campaign Finance)

State-level campaign finance contributions — search by candidate, donor, state, and year

**Workflow:** ftm_contributions → search state campaign finance contributions

**Tips:** Search by state abbreviation (e.g. 'CA', 'NY'), year, candidate ID, or donor ID. Data covers all 50 states.

| Tool | Description | · Auth: `FTM_API_KEY` |
|------|-------------|---|
| `ftm_contributions` | Search state-level campaign finance contributions by candidate, donor, state, and year. |

#### `ftm_contributions`

Search state-level campaign finance contributions by candidate, donor, state, and year.
Covers all 50 states via the National Institute on Money in Politics.

**Parameters:**
- `state` — State abbreviation (e.g. 'CA', 'NY', 'TX')
- `candidateId` — Candidate entity ID
- `donorId` — Donor entity ID
- `year` — Election year (e.g. 2024)
- `limit` — Max results (default 50)

---

### ITA (International Trade Administration)

Search FTA (Free Trade Agreement) tariff rates by HTS code and partner country, and find international trade events from the International Trade Administration.

**Workflow:** Use ita_tariff_rates to look up FTA tariff rates for specific products and countries → ita_trade_events to find upcoming trade shows, missions, and events.

**Tips:** Tariff searches work with HTS subheading codes (6-digit). Partner countries use full names. Trade events can be filtered by country or keyword.

| Tool | Description | · Auth: `ITA_API_KEY` |
|------|-------------|---|
| `ita_tariff_rates` | Search Free Trade Agreement (FTA) tariff rates by HTS code, partner country, or keyword. |
| `ita_trade_events` | Search international trade events including trade shows, trade missions, and seminars. |

#### `ita_tariff_rates`

Search Free Trade Agreement (FTA) tariff rates by HTS code, partner country, or keyword.
Returns tariff lines, rates, base rates, final year, and rule text for products covered by U.S. FTAs.

**Parameters:**
- `query` — Keyword search (e.g. 'steel', 'automotive')
- `hts_subheading` — HTS subheading code (6-digit, e.g. '7206.10')
- `partner_country` — Partner country name (e.g. 'Korea', 'Colombia')
- `limit` — Max results (default 25)

#### `ita_trade_events`

Search international trade events including trade shows, trade missions, and seminars.
Find upcoming events by keyword or country to help U.S. businesses expand internationally.

**Parameters:**
- `query` — Keyword search (e.g. 'technology', 'agriculture')
- `country` — Country name (e.g. 'Japan', 'Germany')
- `limit` — Max results (default 25)

---

### OFAC (Office of Foreign Assets Control)

U.S. Treasury sanctions lists: SDN (Specially Designated Nationals), consolidated non-SDN lists, fuzzy name search, and filtered datasets by entity type, program, or country. No API key required.

**Workflow:** ofac_search to find sanctioned entities by name → ofac_sdn_list or ofac_consolidated_list for full lists → ofac_filter to narrow by entity type/program/country → ofac_exports for available data downloads.

**Tips:** Use ofac_search for fuzzy name matching against all sanctions lists. SDN list contains the primary sanctions targets. Consolidated list includes non-SDN programs (sectoral sanctions, foreign sanctions evaders, etc.).

| Tool | Description | · No auth required |
|------|-------------|---|
| `ofac_sdn_list` | Get the OFAC SDN (Specially Designated Nationals) list — primary U.S. sanctions targets. |
| `ofac_consolidated_list` | Get the consolidated non-SDN sanctions list (sectoral sanctions, foreign sanctions evaders, etc.). |
| `ofac_search` | Search OFAC SDN sanctions list by name or entity (case-insensitive substring match). |
| `ofac_filter` | Filter OFAC SDN list by program, entity type, or country (substring match). |
| `ofac_exports` | List available OFAC sanctions data export files and formats. |

#### `ofac_sdn_list`

Get the OFAC SDN (Specially Designated Nationals) list — primary U.S. sanctions targets.
Returns top entries. Large list; use limit to control size.

**Parameters:**
- `limit` — Max entries to return (default: 100)

#### `ofac_consolidated_list`

Get the consolidated non-SDN sanctions list (sectoral sanctions, foreign sanctions evaders, etc.).

**Parameters:**
- `limit` — Max entries to return (default: 100)

#### `ofac_search`

Search OFAC SDN sanctions list by name or entity (case-insensitive substring match).

**Parameters:**
- `name` **(required)** — Name or entity to search for
- `limit` — Max results (default: 50)

#### `ofac_filter`

Filter OFAC SDN list by program, entity type, or country (substring match).
At least one filter parameter should be provided.

**Parameters:**
- `entity_type` — Entity type filter (e.g. 'Individual', 'Entity', 'Vessel')
- `program` — Sanctions program filter (e.g. 'SDGT', 'IRAN', 'CYBER2')
- `country` — Country filter (e.g. 'Iran', 'Russia', 'Cuba')
- `limit` — Max results (default: 100)

#### `ofac_exports`

List available OFAC sanctions data export files and formats.

---

### OpenSecrets (Federal Campaign Finance)

Federal campaign finance analysis — candidate fundraising summaries, top contributors, and industry contributions

**Workflow:** os_candidate_summary → overview, os_top_contributors → top donors, os_industry_totals → industry breakdown

**Tips:** CID is the OpenSecrets candidate ID (e.g. N00007360 for Nancy Pelosi). Cycle is an even election year (e.g. 2024).

| Tool | Description | · Auth: `OPENSECRETS_API_KEY` |
|------|-------------|---|
| `os_candidate_summary` | Get a candidate's fundraising summary — total raised, spent, cash on hand, debt. |
| `os_top_contributors` | Get top contributors (organizations) to a candidate. |
| `os_industry_totals` | Get industry contribution totals for a candidate. |

#### `os_candidate_summary`

Get a candidate's fundraising summary — total raised, spent, cash on hand, debt.
Requires OpenSecrets CID (e.g. N00007360).

**Parameters:**
- `cid` **(required)** — OpenSecrets candidate ID (e.g. 'N00007360')
- `cycle` — Election cycle year (even year, e.g. 2024)

#### `os_top_contributors`

Get top contributors (organizations) to a candidate.
Shows PAC and individual contributions by organization.

**Parameters:**
- `cid` **(required)** — OpenSecrets candidate ID (e.g. 'N00007360')
- `cycle` — Election cycle year (even year, e.g. 2024)

#### `os_industry_totals`

Get industry contribution totals for a candidate.
Shows how much each industry sector contributed via PACs and individuals.

**Parameters:**
- `cid` **(required)** — OpenSecrets candidate ID (e.g. 'N00007360')
- `cycle` — Election cycle year (even year, e.g. 2024)

---

### USITC (U.S. International Trade Commission)

Query U.S. import/export trade statistics by HTS code, partner country, and year from the USITC DataWeb. No API key required.

**Workflow:** Use usitc_trade_data to query trade statistics by HTS code, partner country, year, and trade type (import/export/balance).

**Tips:** HTS codes are hierarchical: 2-digit = chapter, 4-digit = heading, 6-digit = subheading. Use ISO 3-letter country codes. Trade types: 'import', 'export', 'balance'.

| Tool | Description | · No auth required |
|------|-------------|---|
| `usitc_trade_data` | Query U.S. import/export trade statistics from the USITC DataWeb. |

#### `usitc_trade_data`

Query U.S. import/export trade statistics from the USITC DataWeb.
Search by HTS (Harmonized Tariff Schedule) code, partner country, year, and trade type.
Returns trade values, quantities, and product descriptions.

**Parameters:**
- `hts_code` — HTS code (e.g. '8471' for computers, '0901' for coffee)
- `country_code` — ISO 3-letter partner country code (e.g. 'CHN', 'MEX', 'CAN')
- `year` — Year (e.g. '2023')
- `trade_type` — Trade type (default: 'import')

---

## Energy

### California ISO (MIDAS API)

Real-time California electricity rates, GHG signals, and Flex Alert notifications via the MIDAS API

**Workflow:** Pick signal type (rates/GHG/FlexAlert) → caiso_signal

**Tips:** Rates and GHG signals are time-varying — useful for tracking California grid conditions and carbon intensity. Flex Alerts indicate grid stress events during peak demand.

| Tool | Description | · Auth: `CAISO_TOKEN` |
|------|-------------|---|
| `caiso_signal` | Get California ISO real-time grid signals — time-varying electricity rates, greenhouse gas (GHG) emission intensity, or Flex Alert demand response signals. |

#### `caiso_signal`

Get California ISO real-time grid signals — time-varying electricity rates, greenhouse gas (GHG) emission intensity, or Flex Alert demand response signals.

Signal types:
- rates: Time-varying electricity rates
- GHG: Greenhouse gas emission signal (carbon intensity)
- FlexAlert: Active Flex Alert signals (grid stress / demand response events)

**Parameters:**
- `signal_type` **(required)** — Signal type: 'rates' (electricity rates), 'GHG' (greenhouse gas intensity), 'FlexAlert' (demand response alerts)

---

### ERCOT (Electric Reliability Council of Texas)

Texas electric grid conditions — load forecasts, capacity, wind/solar generation, and settlement point prices

**Workflow:** Choose data type → ercot_grid_conditions (load/capacity) or ercot_prices (settlement prices)

**Tips:** ERCOT manages the Texas grid independently from the rest of the US. Wind and solar are major generation sources. Settlement point prices reflect real-time wholesale electricity costs.

| Tool | Description | · Auth: `ERCOT_API_KEY` |
|------|-------------|---|
| `ercot_grid_conditions` | Get current Texas (ERCOT) grid conditions — load forecasts by weather zone, including total system load, capacity, and wind/solar generation. |
| `ercot_prices` | Get Texas (ERCOT) settlement point prices — real-time wholesale electricity prices at specific nodes, zones, or hubs. |

#### `ercot_grid_conditions`

Get current Texas (ERCOT) grid conditions — load forecasts by weather zone, including total system load, capacity, and wind/solar generation.

ERCOT manages the Texas Interconnection, an independent grid covering ~90% of Texas.

**Parameters:**
- `delivery_date_from` — Start date (YYYY-MM-DD). Default: today
- `delivery_date_to` — End date (YYYY-MM-DD). Default: today
- `limit` — Max rows to return (default: 100)
- `offset` — Row offset for pagination

#### `ercot_prices`

Get Texas (ERCOT) settlement point prices — real-time wholesale electricity prices at specific nodes, zones, or hubs.

Common settlement points: HB_HOUSTON, HB_NORTH, HB_SOUTH, HB_WEST, HB_BUSAVG (hub average).

**Parameters:**
- `delivery_date_from` — Start date (YYYY-MM-DD). Default: today
- `delivery_date_to` — End date (YYYY-MM-DD). Default: today
- `settlement_point` — Settlement point name (e.g., 'HB_HOUSTON', 'HB_NORTH', 'HB_BUSAVG'). Omit for all.
- `limit` — Max rows to return (default: 100)
- `offset` — Row offset for pagination

---

### ISO New England

New England electric grid — current system load/demand and generation fuel mix breakdown

**Workflow:** Choose data type → isone_load (system demand) or isone_fuel_mix (generation by fuel type)

**Tips:** ISO-NE covers CT, ME, MA, NH, RI, VT. Fuel mix shows real-time generation breakdown by source (natural gas, nuclear, hydro, wind, solar, etc.). Uses HTTP Basic Auth.

| Tool | Description | · Auth: `ISO_NE_AUTH` |
|------|-------------|---|
| `isone_load` | Get current ISO New England system load (demand) — real-time 5-minute system load data. |
| `isone_fuel_mix` | Get current ISO New England generation fuel mix — breakdown of electricity generation by fuel type (natural gas, nuclear, hydro, wind, solar, oil, coal, etc.). |

#### `isone_load`

Get current ISO New England system load (demand) — real-time 5-minute system load data.

ISO-NE serves Connecticut, Maine, Massachusetts, New Hampshire, Rhode Island, and Vermont.

#### `isone_fuel_mix`

Get current ISO New England generation fuel mix — breakdown of electricity generation by fuel type (natural gas, nuclear, hydro, wind, solar, oil, coal, etc.).

Shows real-time megawatt output by fuel category for the New England region.

---

## Environment

### EPA (Environmental Protection Agency)

EPA environmental data: facility compliance and violations via ECHO, enforcement cases (civil/criminal), Superfund (CERCLA) contaminated sites, RCRA hazardous waste facilities, UV index forecasts, Toxics Release Inventory (TRI), Greenhouse Gas emissions (GHGRP), and Safe Drinking Water systems (SDWIS). No API key required. For air quality monitoring data (AQS), see the epa-aqs module.

**Workflow:** Use epa_facilities for compliance search -> epa_facility_detail for drill-down -> epa_enforcement for penalties/outcomes -> epa_superfund for contaminated sites -> epa_rcra for hazardous waste -> epa_toxic_releases for TRI -> epa_greenhouse_gas for GHG emissions -> epa_drinking_water for water systems -> epa_uv_index for UV forecasts.

**Tips:** ECHO media types: air (Clean Air Act), water (Clean Water Act). Enforcement: filter by law (CAA, CWA, RCRA, CERCLA). Superfund NPL statuses: F=Final, P=Proposed, D=Deleted. TRI covers 700+ chemicals from 20K+ facilities. GHG covers large emitters (25K+ tons CO2e/year). SDWIS system types: CWS (community), NTNCWS (non-transient), TNCWS (transient). UV index: 0-2 Low, 3-5 Moderate, 6-7 High, 8-10 Very High, 11+ Extreme.

| Tool | Description | · No auth required |
|------|-------------|---|
| `epa_facilities` | Search EPA-regulated facilities for environmental compliance and violations via ECHO. |
| `epa_facility_detail` | Get a detailed facility report from ECHO by registry ID. |
| `epa_uv_index` | Get UV index forecast for a U.S. location (ZIP code or city/state). |
| `epa_toxic_releases` | Get Toxics Release Inventory (TRI) data by state. |
| `epa_greenhouse_gas` | Get Greenhouse Gas (GHG) emissions data by state. |
| `epa_drinking_water` | Get Safe Drinking Water Information System (SDWIS) data by state. |
| `epa_enforcement` | Search EPA enforcement cases -- civil and criminal actions with penalties, settlements, and outcomes. |
| `epa_superfund` | Get Superfund (CERCLA) contaminated sites by state. |
| `epa_rcra` | Search RCRA hazardous waste facilities by state via ECHO. |

#### `epa_facilities`

Search EPA-regulated facilities for environmental compliance and violations via ECHO.
Find facilities with air or water permit violations, inspections, and enforcement actions.
Media types: 'air' (Clean Air Act (CAA) facilities via ICIS-Air), 'water' (Clean Water Act (CWA) facilities via ICIS-NPDES).

**Parameters:**
- `state` **(required)** — Two-letter state code: 'CA', 'TX', 'NY'
- `media_type` — Media type: 'air' (Clean Air Act (CAA) facilities via ICIS-Air), 'water' (Clean Water Act (CWA) facilities via ICIS-NPDES). Default: air
- `major_only` — Only show major facilities (true/false, default true)
- `active_only` — Only show active facilities (true/false, default true)
- `limit` — Max results (default 20)

#### `epa_facility_detail`

Get a detailed facility report from ECHO by registry ID.
Returns permits, enforcement actions, compliance summaries, NAICS/SIC codes, and inspection history.
Use epa_facilities first to find a RegistryID, then pass it here for the full report.

**Parameters:**
- `registry_id` **(required)** — ECHO Registry ID from epa_facilities results (e.g. '110071141730')

#### `epa_uv_index`

Get UV index forecast for a U.S. location (ZIP code or city/state).
UV Scale: 0-2 Low, 3-5 Moderate, 6-7 High, 8-10 Very High, 11+ Extreme.
Useful for health recommendations -- high UV correlates with skin cancer risk.

**Parameters:**
- `zip` — 5-digit ZIP code: '10001', '90210'. Use this OR city+state.
- `city` — City name: 'Los Angeles', 'Chicago'. Must be used with state.
- `state` — Two-letter state code: 'CA', 'IL'. Must be used with city.

#### `epa_toxic_releases`

Get Toxics Release Inventory (TRI) data by state.
TRI tracks chemical releases from industrial facilities reported under EPCRA Section 313.
Common sectors: 'Chemicals', 'Metal Mining', 'Electric Utilities', 'Petroleum', 'Food/Beverages/Tobacco', 'Paper', 'Primary Metals'.
Cross-reference with epa_facilities for compliance status and epa_greenhouse_gas for emissions.

**Parameters:**
- `state` **(required)** — Two-letter state code: 'CA', 'TX', 'NY'
- `county` — County name to filter by: 'LOS ANGELES', 'HARRIS'
- `rows` — Max results (default 100)

#### `epa_greenhouse_gas`

Get Greenhouse Gas (GHG) emissions data by state.
Returns large emitters reporting under EPA's Greenhouse Gas Reporting Program (GHGRP).
Includes CO2-equivalent emissions, facility name, sector, and location.
Cross-reference with EIA energy data and BLS CPI energy component.

**Parameters:**
- `state` **(required)** — Two-letter state code: 'CA', 'TX', 'NY'
- `rows` — Max results (default 100)

#### `epa_drinking_water`

Get Safe Drinking Water Information System (SDWIS) data by state.
Returns public water systems with population served, source type, and system type.
System types: 'CWS' (Community Water System (serves residents year-round)), 'NTNCWS' (Non-transient Non-community (serves 25+ of same people, e.g. schools)), 'TNCWS' (Transient Non-community (serves transient users, e.g. gas stations)).
Cross-reference with CDC health data and Census population for per-capita analysis.

**Parameters:**
- `state` **(required)** — Two-letter state code: 'CA', 'TX', 'NY'
- `rows` — Max results (default 100)

#### `epa_enforcement`

Search EPA enforcement cases -- civil and criminal actions with penalties, settlements, and outcomes.
Case types: 'JDC' (Judicial (court) case), 'AFR' (Administrative formal (EPA order)).
Returns case name, primary law violated, penalties, settlement dates, and outcomes.
Cross-reference with DOJ press releases, SEC financials, lobbying data, and FEC contributions.

**Parameters:**
- `state` **(required)** — Two-letter state code: 'CA', 'TX', 'NY'
- `law` — Filter by primary law: 'CAA' (Clean Air), 'CWA' (Clean Water), 'RCRA', 'CERCLA', 'TSCA', 'SDWA'
- `limit` — Max results (default 20)

#### `epa_superfund`

Get Superfund (CERCLA) contaminated sites by state.
Returns site name, location, NPL status, and cleanup progress.
NPL statuses: 'F' (Final NPL (active cleanup)), 'P' (Proposed NPL), 'D' (Deleted from NPL (cleanup completed)), 'N' (Not on NPL).
Cross-reference with Census demographics, CDC health data, HUD housing values, and USAspending cleanup funding.

**Parameters:**
- `state` **(required)** — Two-letter state code: 'NJ', 'CA', 'TX'
- `rows` — Max results (default 100)

#### `epa_rcra`

Search RCRA hazardous waste facilities by state via ECHO.
Returns generators, transporters, and treatment/storage/disposal (TSD) facilities regulated under RCRA Subtitle C.
Cross-reference with epa_toxic_releases (TRI) and epa_greenhouse_gas for multi-program facility analysis.

**Parameters:**
- `state` **(required)** — Two-letter state code: 'CA', 'TX', 'NY'
- `limit` — Max results (default 20)

---

### EPA Air Quality System (AQS)

Ambient air sample data from EPA's Air Quality System (AQS) — thousands of monitors nationwide. Criteria pollutants (ozone, PM2.5, PM10, SO2, CO, NO2, lead), annual/daily/quarterly summaries, and monitor metadata. Historical data only (6+ month lag). Requires AQS_API_KEY and AQS_EMAIL.

**Workflow:** Use epa_air_quality for annual/quarterly summaries by state -> epa_aqs_daily for daily data -> epa_aqs_monitors to find monitoring stations.

**Tips:** States use 2-digit FIPS codes (with leading zero): '01'=AL, '06'=CA, '37'=NC, '48'=TX. Parameters: 44201=Ozone, 88101=PM2.5, 42401=SO2, 42101=CO, 42602=NO2, 14129=Lead. bdate/edate must be in same year (YYYYMMDD). Max 5 param codes per request. Rate limit: 10 req/min with 5s pause. Cross-reference with epa_facilities (ECHO) for compliance data.

| Tool | Description | · Auth: `AQS_API_KEY, AQS_EMAIL` |
|------|-------------|---|
| `epa_air_quality` | Get air quality data from EPA's Air Quality System (AQS). |
| `epa_aqs_daily` | Get daily air quality summary data from EPA AQS. |
| `epa_aqs_monitors` | Find air quality monitoring stations from EPA AQS. |

#### `epa_air_quality`

Get air quality data from EPA's Air Quality System (AQS).
Returns annual summary data by state (county-level monitor readings for criteria pollutants).
Parameters: '14129' (Lead (Pb)), '42101' (CO (Carbon Monoxide)), '42401' (SO2 (Sulfur Dioxide)), '42602' (NO2 (Nitrogen Dioxide)), '44201' (Ozone), '81102' (PM10), '88101' (PM2.5 (FRM/FEM)), '88502' (PM2.5 (non-FRM, e.g. continuous)).
Services: 'annualData' (Annual summaries (yearly statistics per monitor)), 'dailyData' (Daily summaries (daily mean, max, etc.)), 'quarterlyData' (Quarterly summaries (quarterly statistics)), 'sampleData' (Raw sample data (hourly or finer grain)).
States use 2-digit FIPS codes: '01'=AL, '06'=CA, '37'=NC, '48'=TX. bdate/edate must be in same year (YYYYMMDD format).
Requires AQS_API_KEY and AQS_EMAIL. Signup: https://aqs.epa.gov/data/api/signup

**Parameters:**
- `state` **(required)** — 2-digit state FIPS code with leading zero: '06' (CA), '48' (TX), '37' (NC)
- `param` **(required)** — AQS parameter code: '14129' (Lead (Pb)), '42101' (CO (Carbon Monoxide)), '42401' (SO2 (Sulfur Dioxide)), '42602' (NO2 (Nitrogen Dioxide)), '44201' (Ozone), '81102' (PM10), '88101' (PM2.5 (FRM/FEM)), '88502' (PM2.5 (non-FRM, e.g. continuous)). Up to 5 comma-separated.
- `bdate` **(required)** — Begin date YYYYMMDD: '20240101'
- `edate` **(required)** — End date YYYYMMDD (must be same year as bdate): '20241231'
- `county` — 3-digit county FIPS code within the state: '183' (Wake Co, NC), '037' (Los Angeles)
- `service` — Data service: 'annualData', 'dailyData', 'quarterlyData', 'sampleData'. Default: annualData

#### `epa_aqs_daily`

Get daily air quality summary data from EPA AQS.
Returns daily mean, max, and observation count per monitor.
Parameters: '14129' (Lead (Pb)), '42101' (CO (Carbon Monoxide)), '42401' (SO2 (Sulfur Dioxide)), '42602' (NO2 (Nitrogen Dioxide)), '44201' (Ozone), '81102' (PM10), '88101' (PM2.5 (FRM/FEM)), '88502' (PM2.5 (non-FRM, e.g. continuous)).
Useful for tracking day-to-day pollution levels. Cross-reference with CDC health data.
Requires AQS_API_KEY and AQS_EMAIL.

**Parameters:**
- `state` **(required)** — 2-digit state FIPS code: '06' (CA), '48' (TX)
- `param` **(required)** — AQS parameter code: '14129' (Lead (Pb)), '42101' (CO (Carbon Monoxide)), '42401' (SO2 (Sulfur Dioxide)), '42602' (NO2 (Nitrogen Dioxide)), '44201' (Ozone), '81102' (PM10), '88101' (PM2.5 (FRM/FEM)), '88502' (PM2.5 (non-FRM, e.g. continuous))
- `bdate` **(required)** — Begin date YYYYMMDD
- `edate` **(required)** — End date YYYYMMDD (same year as bdate)
- `county` — 3-digit county FIPS code

#### `epa_aqs_monitors`

Find air quality monitoring stations from EPA AQS.
Returns monitor locations, operational dates, measurement types, and operating agencies.
Parameters: '14129' (Lead (Pb)), '42101' (CO (Carbon Monoxide)), '42401' (SO2 (Sulfur Dioxide)), '42602' (NO2 (Nitrogen Dioxide)), '44201' (Ozone), '81102' (PM10), '88101' (PM2.5 (FRM/FEM)), '88502' (PM2.5 (non-FRM, e.g. continuous)).
Useful for finding what is being measured and where. Requires AQS_API_KEY and AQS_EMAIL.

**Parameters:**
- `state` **(required)** — 2-digit state FIPS code: '06' (CA), '48' (TX)
- `param` **(required)** — AQS parameter code: '14129' (Lead (Pb)), '42101' (CO (Carbon Monoxide)), '42401' (SO2 (Sulfur Dioxide)), '42602' (NO2 (Nitrogen Dioxide)), '44201' (Ozone), '81102' (PM10), '88101' (PM2.5 (FRM/FEM)), '88502' (PM2.5 (non-FRM, e.g. continuous))
- `bdate` **(required)** — Begin date YYYYMMDD
- `edate` **(required)** — End date YYYYMMDD
- `county` — 3-digit county FIPS code

---

### FWS ECOS (Endangered Species)

US Fish & Wildlife Service Environmental Conservation Online System (ECOS). Search threatened and endangered species listings, critical habitat designations, and recovery plans. No API key required.

**Workflow:** fws_species for searching listed species by name, status, or state → fws_critical_habitat for habitat data.

**Tips:** Status codes: E=Endangered, T=Threatened, C=Candidate, PE=Proposed Endangered, PT=Proposed Threatened. Search by common or scientific name. Filter by state for regional listings.

| Tool | Description | · No auth required |
|------|-------------|---|
| `fws_species` | Search threatened and endangered species from the US Fish & Wildlife Service. |
| `fws_species_detail` | Get detailed information about a listed species by TSN (Taxonomic Serial Number). |

#### `fws_species`

Search threatened and endangered species from the US Fish & Wildlife Service.
Filter by name, status, state, or taxonomic group.
Status codes: E=Endangered, T=Threatened, C=Candidate, PE=Proposed Endangered, PT=Proposed Threatened.
Groups: Mammals, Birds, Reptiles, Amphibians, Fishes, Clams, Snails, Insects, Arachnids, Crustaceans, Flowering Plants, Ferns, etc.

**Parameters:**
- `query` — Species name (common or scientific)
- `status` — Listing status: E, T, C, PE, PT
- `state` — Two-letter state code
- `group` — Taxonomic group: Mammals, Birds, Fishes, etc.
- `limit` — Max results (default 25)

#### `fws_species_detail`

Get detailed information about a listed species by TSN (Taxonomic Serial Number).
Includes listing history, critical habitat, recovery plans, and range.

**Parameters:**
- `tsn` **(required)** — Taxonomic Serial Number from fws_species results

---

### NOAA Climate Data Online

Weather observations, temperature, precipitation, climate normals from NOAA stations across the U.S.

**Workflow:** noaa_stations to find a station → noaa_climate_data to get observations

**Tips:** Datasets: GHCND (daily), GSOM (monthly summary), GSOY (annual summary). Location IDs: FIPS:36 (NY), FIPS:06 (CA)

| Tool | Description | · Auth: `NOAA_API_KEY` |
|------|-------------|---|
| `noaa_datasets` | List available NOAA climate datasets (GHCND daily, GSOM monthly, GSOY annual, normals, etc.) |
| `noaa_stations` | Search for NOAA weather stations by location or dataset. |
| `noaa_climate_data` | Get climate observations (temperature, precipitation, snow, wind) from NOAA. |
| `noaa_locations` | Search NOAA location IDs (states, cities, countries) for use with other NOAA tools. |

#### `noaa_datasets`

List available NOAA climate datasets (GHCND daily, GSOM monthly, GSOY annual, normals, etc.)

#### `noaa_stations`

Search for NOAA weather stations by location or dataset.
Use location IDs like FIPS:36 (New York), FIPS:06 (California), CITY:US360019 (NYC).

**Parameters:**
- `dataset_id` — e.g. 'GHCND', 'GSOM'
- `location_id` — e.g. 'FIPS:36' (NY), 'FIPS:06' (CA)
- `limit` — Max results (default 25)

#### `noaa_climate_data`

Get climate observations (temperature, precipitation, snow, wind) from NOAA.
Requires dataset ID + date range. Optionally filter by station or location.

**Parameters:**
- `dataset_id` **(required)** — Dataset: GHCND=daily, GSOM=monthly, GSOY=annual
- `start_date` **(required)** — Start date YYYY-MM-DD
- `end_date` **(required)** — End date YYYY-MM-DD
- `station_id` — Station ID, e.g. 'GHCND:USW00094728' (Central Park, NYC)
- `location_id` — Location ID, e.g. 'FIPS:36' (NY state)
- `datatype_id` — Data type: TMAX, TMIN, TAVG, PRCP, SNOW, SNWD, AWND
- `limit` — Max observations (default 1000)

#### `noaa_locations`

Search NOAA location IDs (states, cities, countries) for use with other NOAA tools.

**Parameters:**
- `category` — Location category: ST=states, CITY, CNTRY=countries, CLIM_REG=climate regions
- `dataset_id` — Filter by dataset, e.g. 'GHCND'
- `limit` — Max results (default 50)

---

### NOAA Tides & Currents (CO-OPS)

Real-time and historical water levels, tide predictions, currents, meteorological data, and water quality from NOAA CO-OPS stations.

**Workflow:** coops_stations to find stations → coops_water_level or coops_tide_predictions for data

**Tips:** Use station IDs (e.g. 8454000 for Providence, 9414290 for San Francisco). Date format: YYYYMMDD. Products: water_level, predictions, air_temperature, wind, etc.

| Tool | Description | · No auth required |
|------|-------------|---|
| `coops_water_level` | Get observed water levels from a NOAA CO-OPS station. |
| `coops_tide_predictions` | Get tide predictions for a NOAA CO-OPS station. |
| `coops_high_low` | Get observed high/low tide data from a NOAA CO-OPS station. |
| `coops_currents` | Get current speed/direction observations from a NOAA CO-OPS station. |
| `coops_current_predictions` | Get current predictions for a NOAA CO-OPS station. |
| `coops_meteorological` | Get meteorological data from a NOAA CO-OPS station. |
| `coops_water_quality` | Get conductivity/salinity (water quality) data from a NOAA CO-OPS station. |
| `coops_air_gap` | Get air gap (bridge clearance) data from a NOAA CO-OPS station. |
| `coops_station_metadata` | Get detailed metadata for a specific NOAA CO-OPS station. |
| `coops_stations` | List/search NOAA CO-OPS stations. |

#### `coops_water_level`

Get observed water levels from a NOAA CO-OPS station.
Provide station ID + date range (YYYYMMDD) or date shortcut (today/latest/recent).

**Parameters:**
- `station` **(required)** — Station ID, e.g. '8454000' (Providence), '9414290' (San Francisco)
- `begin_date` — Start date YYYYMMDD
- `end_date` — End date YYYYMMDD
- `date` — Date shortcut (alternative to begin_date/end_date)
- `datum` — Vertical datum (default STND)
- `units` — Units: english or metric (default metric)
- `time_zone` — Time zone: gmt, lst (local standard), lst_ldt (local daylight) (default gmt)

#### `coops_tide_predictions`

Get tide predictions for a NOAA CO-OPS station.
Provide station ID + date range (YYYYMMDD) or date shortcut. Use interval='hilo' for high/low only.

**Parameters:**
- `station` **(required)** — Station ID, e.g. '8454000' (Providence), '9414290' (San Francisco)
- `begin_date` — Start date YYYYMMDD
- `end_date` — End date YYYYMMDD
- `date` — Date shortcut (alternative to begin_date/end_date)
- `datum` — Vertical datum (default STND)
- `units` — Units: english or metric (default metric)
- `time_zone` — Time zone: gmt, lst (local standard), lst_ldt (local daylight) (default gmt)
- `interval` — Interval: h=hourly, hilo=high/low only, 1=1-min, 6=6-min

#### `coops_high_low`

Get observed high/low tide data from a NOAA CO-OPS station.
Returns verified high and low water level observations.

**Parameters:**
- `station` **(required)** — Station ID, e.g. '8454000' (Providence), '9414290' (San Francisco)
- `begin_date` — Start date YYYYMMDD
- `end_date` — End date YYYYMMDD
- `date` — Date shortcut (alternative to begin_date/end_date)
- `datum` — Vertical datum (default STND)
- `units` — Units: english or metric (default metric)

#### `coops_currents`

Get current speed/direction observations from a NOAA CO-OPS station.
Requires a currents-capable station.

**Parameters:**
- `station` **(required)** — Station ID, e.g. '8454000' (Providence), '9414290' (San Francisco)
- `begin_date` — Start date YYYYMMDD
- `end_date` — End date YYYYMMDD
- `date` — Date shortcut (alternative to begin_date/end_date)
- `units` — Units: english or metric (default metric)
- `time_zone` — Time zone: gmt, lst (local standard), lst_ldt (local daylight) (default gmt)
- `bin` — Bin number for multi-bin current stations

#### `coops_current_predictions`

Get current predictions for a NOAA CO-OPS station.
Returns predicted current speed/direction.

**Parameters:**
- `station` **(required)** — Station ID, e.g. '8454000' (Providence), '9414290' (San Francisco)
- `begin_date` — Start date YYYYMMDD
- `end_date` — End date YYYYMMDD
- `date` — Date shortcut (alternative to begin_date/end_date)
- `units` — Units: english or metric (default metric)
- `time_zone` — Time zone: gmt, lst (local standard), lst_ldt (local daylight) (default gmt)
- `interval` — Interval: h=hourly, 1=1-min, 6=6-min, MAX_SLACK=max flood/ebb and slack
- `bin` — Bin number for multi-bin current stations

#### `coops_meteorological`

Get meteorological data from a NOAA CO-OPS station.
Products: air_temperature, water_temperature, wind, air_pressure, humidity, visibility.

**Parameters:**
- `station` **(required)** — Station ID, e.g. '8454000' (Providence), '9414290' (San Francisco)
- `begin_date` — Start date YYYYMMDD
- `end_date` — End date YYYYMMDD
- `date` — Date shortcut (alternative to begin_date/end_date)
- `product` **(required)** — Meteorological product to retrieve
- `units` — Units: english or metric (default metric)
- `time_zone` — Time zone: gmt, lst (local standard), lst_ldt (local daylight) (default gmt)

#### `coops_water_quality`

Get conductivity/salinity (water quality) data from a NOAA CO-OPS station.

**Parameters:**
- `station` **(required)** — Station ID, e.g. '8454000' (Providence), '9414290' (San Francisco)
- `begin_date` — Start date YYYYMMDD
- `end_date` — End date YYYYMMDD
- `date` — Date shortcut (alternative to begin_date/end_date)
- `units` — Units: english or metric (default metric)

#### `coops_air_gap`

Get air gap (bridge clearance) data from a NOAA CO-OPS station.
Measures the distance between a bridge and the water surface.

**Parameters:**
- `station` **(required)** — Station ID, e.g. '8454000' (Providence), '9414290' (San Francisco)
- `begin_date` — Start date YYYYMMDD
- `end_date` — End date YYYYMMDD
- `date` — Date shortcut (alternative to begin_date/end_date)
- `datum` — Vertical datum (default STND)
- `units` — Units: english or metric (default metric)

#### `coops_station_metadata`

Get detailed metadata for a specific NOAA CO-OPS station.
Returns location, sensors, datums, products available, etc.

**Parameters:**
- `station_id` **(required)** — Station ID, e.g. '8454000'

#### `coops_stations`

List/search NOAA CO-OPS stations.
Optionally filter by station type (waterlevels, currentpredictions, etc.) and/or 2-letter state code.

**Parameters:**
- `type` — Station type filter: waterlevels, currentpredictions, etc.
- `state` — 2-letter state code, e.g. 'CA', 'NY'

---

### NOAA Space Weather Prediction Center

Space weather alerts, solar activity, geomagnetic indices, solar wind, aurora forecasts, and GOES satellite data from NOAA SWPC.

**Workflow:** swpc_alerts for current warnings → swpc_kp_index or swpc_solar_wind for conditions

**Tips:** Data is near-real-time JSON files updated every few minutes. Kp index ranges 0-9 (5+ = geomagnetic storm). Solar flux F10.7 > 100 = elevated activity.

| Tool | Description | · No auth required |
|------|-------------|---|
| `swpc_alerts` | Get current space weather alerts and warnings from NOAA SWPC. |
| `swpc_scales` | Get current NOAA space weather scale levels. |
| `swpc_kp_index` | Get recent planetary Kp index values. |
| `swpc_dst_index` | Get Dst (disturbance storm time) index. |
| `swpc_solar_flux` | Get F10.7 cm solar radio flux data. |
| `swpc_sunspots` | Get monthly sunspot numbers. |
| `swpc_solar_wind` | Get 7-day solar wind data. |
| `swpc_goes_xray` | Get GOES satellite X-ray flux data. |
| `swpc_goes_particles` | Get GOES satellite energetic particle flux data. |
| `swpc_aurora_forecast` | Get 24-hour northern hemisphere aurora probability forecast. |
| `swpc_solar_cycle` | Get predicted solar cycle progression. |
| `swpc_forecast` | Get 3-day space weather forecast text from NOAA SWPC. |

#### `swpc_alerts`

Get current space weather alerts and warnings from NOAA SWPC.
Includes watches, warnings, and alerts for geomagnetic storms, solar radiation, and radio blackouts.

#### `swpc_scales`

Get current NOAA space weather scale levels.
Shows R (radio blackout), S (solar radiation), and G (geomagnetic storm) scale levels from 0-5.

#### `swpc_kp_index`

Get recent planetary Kp index values.
Kp ranges 0-9: 0-3 = quiet, 4 = unsettled, 5+ = geomagnetic storm (G1-G5).

#### `swpc_dst_index`

Get Dst (disturbance storm time) index.
Negative Dst indicates geomagnetic disturbance. Below -50 nT = moderate storm, below -100 nT = intense storm.

#### `swpc_solar_flux`

Get F10.7 cm solar radio flux data.
F10.7 is a key indicator of solar activity. Values > 100 SFU = elevated activity, > 150 = high activity.

#### `swpc_sunspots`

Get monthly sunspot numbers.
Tracks the ~11-year solar cycle. Higher sunspot counts correlate with more solar activity and space weather events.

#### `swpc_solar_wind`

Get 7-day solar wind data.
Plasma data includes density, speed, temperature. Magnetic field data includes Bz, Bt components. Southward Bz (negative) drives geomagnetic storms.

**Parameters:**
- `type` — Data type: 'plasma' (density/speed/temperature) or 'mag' (magnetic field Bz/Bt). Default: plasma

#### `swpc_goes_xray`

Get GOES satellite X-ray flux data.
X-ray flares classified as A, B, C, M, X (increasing intensity). M and X class flares can cause radio blackouts.

#### `swpc_goes_particles`

Get GOES satellite energetic particle flux data.
Elevated particle flux indicates solar energetic particle (SEP) events that can affect satellites and polar aviation.

#### `swpc_aurora_forecast`

Get 24-hour northern hemisphere aurora probability forecast.
Returns OVATION model predictions. Higher probability at higher latitudes during geomagnetic activity.

#### `swpc_solar_cycle`

Get predicted solar cycle progression.
Shows observed and predicted sunspot numbers and F10.7 flux for the current solar cycle (~11-year cycle).

#### `swpc_forecast`

Get 3-day space weather forecast text from NOAA SWPC.
Includes solar activity, geomagnetic, and radiation environment forecasts.

---

### NREL (Clean Energy)

EV charging stations, alt fuel stations, electricity rates, solar resource data from the National Renewable Energy Laboratory

**Workflow:** nrel_fuel_stations to find EV chargers/alt fuel → nrel_utility_rates for electricity costs → nrel_solar for solar potential

**Tips:** Fuel types: ELEC (EV), E85 (ethanol), CNG (natural gas), LPG (propane), BD (biodiesel), HY (hydrogen). Status: E=open, P=planned, T=temporarily unavailable.

| Tool | Description | · Auth: `DATA_GOV_API_KEY` |
|------|-------------|---|
| `nrel_fuel_stations` | Search for EV charging stations, hydrogen stations, biodiesel, CNG, and other alternative fuel stations. |
| `nrel_utility_rates` | Get residential, commercial, and industrial electricity rates for any U.S. location. |
| `nrel_solar` | Get solar energy resource data for any U.S. location — monthly and annual solar irradiance. |

#### `nrel_fuel_stations`

Search for EV charging stations, hydrogen stations, biodiesel, CNG, and other alternative fuel stations.
Covers all U.S. alt fuel infrastructure. Filter by state, zip, fuel type, radius.

Fuel types: 'ELEC' (EV), 'HY' (hydrogen), 'CNG' (natural gas), 'LPG' (propane), 'BD' (biodiesel), 'E85' (ethanol)

**Parameters:**
- `state` — Two-letter state code: 'CA', 'TX', 'NY'
- `zip` — ZIP code to search near
- `fuel_type` — Fuel type: 'ELEC' (Electric), 'E85' (Ethanol (E85)), 'CNG' (Compressed Natural Gas), 'LPG' (Propane (LPG)), 'BD' (Biodiesel (B20 and above)), 'HY' (Hydrogen), 'LNG' (Liquefied Natural Gas), 'RD' (Renewable Diesel)
- `radius` — Search radius in miles from zip (default 25)
- `limit` — Max results (default 20)
- `status` — Station status: 'E' (Open (available)), 'P' (Planned (not yet open)), 'T' (Temporarily unavailable)

#### `nrel_utility_rates`

Get residential, commercial, and industrial electricity rates for any U.S. location.
Provide latitude/longitude to get the local utility and their rates ($/kWh).

**Parameters:**
- `lat` **(required)** — Latitude (e.g. 40.7128 for NYC, 34.0522 for LA)
- `lon` **(required)** — Longitude (e.g. -74.0060 for NYC, -118.2437 for LA)

#### `nrel_solar`

Get solar energy resource data for any U.S. location — monthly and annual solar irradiance.
Shows potential for solar panels at a given location.

**Parameters:**
- `lat` **(required)** — Latitude
- `lon` **(required)** — Longitude

---

### National Weather Service

Weather forecasts, alerts, observations, and station data from the National Weather Service API. Covers all U.S. locations with point-based forecast resolution.

**Workflow:** nws_point_lookup (lat,lon → grid) → nws_forecast or nws_forecast_hourly for predictions. nws_alerts_active for current warnings.

**Tips:** Two-step workflow: first resolve lat/lon to a grid point, then get forecasts for that grid. Alerts can be searched by state, zone, or area. User-Agent header is required by NWS.

| Tool | Description | · No auth required |
|------|-------------|---|
| `nws_point_lookup` | Resolve latitude/longitude to an NWS forecast grid point. |
| `nws_forecast` | Get 7-day weather forecast. |
| `nws_forecast_hourly` | Get hourly weather forecast. |
| `nws_alerts_active` | Get active weather alerts (warnings, watches, advisories). |
| `nws_alerts_by_state` | Get all active weather alerts for a specific state. |
| `nws_alert_detail` | Get full details for a specific weather alert by ID. |
| `nws_observation_latest` | Get the latest weather observation from a station. |
| `nws_observation_history` | Get recent observation history from a weather station. |
| `nws_stations` | Find weather observation stations. |
| `nws_zone_forecast` | Get text forecast for a specific NWS forecast zone. |
| `nws_zones` | List NWS forecast zones. |
| `nws_radar_stations` | List NWS radar stations across the U.S. |
| `nws_text_products` | Get NWS text products like Area Forecast Discussions (AFD), Hazardous Weather Outlooks (HWO), etc. |
| `nws_aviation_sigmets` | Get current aviation SIGMETs (Significant Meteorological Information). |
| `nws_glossary` | Get NWS weather glossary — definitions of weather terms and abbreviations. |

#### `nws_point_lookup`

Resolve latitude/longitude to an NWS forecast grid point.
Returns grid office, gridX, gridY needed for forecast calls, plus timezone and county info.
This is the essential first step before getting forecasts.

**Parameters:**
- `latitude` **(required)** — Latitude (e.g. 40.7128)
- `longitude` **(required)** — Longitude (e.g. -74.006)

#### `nws_forecast`

Get 7-day weather forecast.
Provide EITHER (office + grid_x + grid_y) from a point lookup, OR (latitude + longitude) to auto-resolve.
Returns forecast periods with temperature, wind, and conditions.

**Parameters:**
- `office` — NWS office code (e.g. 'OKX', 'LAX'). Required if not using lat/lon.
- `grid_x` — Grid X coordinate from point lookup
- `grid_y` — Grid Y coordinate from point lookup
- `latitude` — Latitude — auto-resolves grid if office not provided
- `longitude` — Longitude — auto-resolves grid if office not provided

#### `nws_forecast_hourly`

Get hourly weather forecast.
Provide EITHER (office + grid_x + grid_y) from a point lookup, OR (latitude + longitude) to auto-resolve.
Returns hourly periods with temperature, wind, and conditions.

**Parameters:**
- `office` — NWS office code (e.g. 'OKX', 'LAX')
- `grid_x` — Grid X coordinate from point lookup
- `grid_y` — Grid Y coordinate from point lookup
- `latitude` — Latitude — auto-resolves grid if office not provided
- `longitude` — Longitude — auto-resolves grid if office not provided

#### `nws_alerts_active`

Get active weather alerts (warnings, watches, advisories).
Filter by state, event type, severity, urgency, or certainty.

**Parameters:**
- `area` — State code(s), comma-separated (e.g. 'CA', 'NY,NJ')
- `event` — Event type (e.g. 'Tornado Warning', 'Flash Flood Watch')
- `severity` — Severity level
- `urgency` — Urgency: Immediate, Expected, Future, Past, Unknown
- `certainty` — Certainty: Observed, Likely, Possible, Unlikely, Unknown
- `limit` — Max alerts (default 50)

#### `nws_alerts_by_state`

Get all active weather alerts for a specific state.
Returns warnings, watches, and advisories currently in effect.

**Parameters:**
- `state` **(required)** — 2-letter state code (e.g. 'CA', 'NY', 'TX')

#### `nws_alert_detail`

Get full details for a specific weather alert by ID.
Includes complete description, instruction text, affected areas, and timing.

**Parameters:**
- `alert_id` **(required)** — Alert ID (e.g. 'urn:oid:2.49.0.1.840.0...')

#### `nws_observation_latest`

Get the latest weather observation from a station.
Returns temperature, wind, humidity, pressure, visibility, and conditions.
Station IDs are ICAO codes (e.g. KJFK, KLAX, KORD).

**Parameters:**
- `station_id` **(required)** — Station ICAO code (e.g. 'KJFK', 'KLAX', 'KORD')

#### `nws_observation_history`

Get recent observation history from a weather station.
Returns multiple observations with temperature, wind, humidity, etc.
Optionally filter by date range.

**Parameters:**
- `station_id` **(required)** — Station ICAO code (e.g. 'KJFK', 'KLAX')
- `start` — Start date/time ISO 8601 (e.g. '2025-01-01T00:00:00Z')
- `end` — End date/time ISO 8601
- `limit` — Max observations (default 24)

#### `nws_stations`

Find weather observation stations.
Search by state code, or provide latitude + longitude to find nearby stations.
Station IDs can be used with observation tools.

**Parameters:**
- `state` — 2-letter state code (e.g. 'NY', 'CA')
- `latitude` — Latitude — find nearest stations to this point
- `longitude` — Longitude — find nearest stations to this point
- `limit` — Max stations (default 50, ignored for lat/lon lookup)

#### `nws_zone_forecast`

Get text forecast for a specific NWS forecast zone.
Zone IDs look like 'NYZ072', 'CAZ006', etc.

**Parameters:**
- `zone_id` **(required)** — Zone ID (e.g. 'NYZ072', 'CAZ006')

#### `nws_zones`

List NWS forecast zones.
Filter by zone type (forecast, fire, county, coastal) and/or state.

**Parameters:**
- `type` — Zone type (default: forecast)
- `area` — State code (e.g. 'NY', 'CA')
- `limit` — Max zones (default 50)

#### `nws_radar_stations`

List NWS radar stations across the U.S.
Returns station IDs, names, types, and coordinates.

#### `nws_text_products`

Get NWS text products like Area Forecast Discussions (AFD), Hazardous Weather Outlooks (HWO), etc.
Requires a product type code. Optionally filter by WFO location.

**Parameters:**
- `type` **(required)** — Product type code (e.g. 'AFD' for Area Forecast Discussion, 'HWO' for Hazardous Weather Outlook)
- `location` — WFO office code (e.g. 'OKX', 'LAX')

#### `nws_aviation_sigmets`

Get current aviation SIGMETs (Significant Meteorological Information).
Returns active SIGMETs with phenomenon type, timing, and affected areas.

#### `nws_glossary`

Get NWS weather glossary — definitions of weather terms and abbreviations.

---

### USACE CWMS (Corps Water Management System)

US Army Corps of Engineers Consolidated Water Management System — real-time water levels, dam/reservoir data, streamflow for Corps-managed waterways (Mississippi, Ohio, Tennessee rivers, etc.). No API key required.

**Workflow:** Use usace_locations to find monitoring locations by name/office/type → usace_timeseries to get time-series data (water level, flow, storage, precipitation) → usace_levels for water level data.

**Tips:** Corps district offices: SWL (Little Rock), LRL (Louisville), MVS (St. Louis), NWK (Kansas City), MVP (St. Paul), etc. Use wildcard patterns in name searches (e.g. 'Mississippi*'). Time-series names follow the format 'Location.Parameter.Type.Interval.Duration.Version'.

| Tool | Description | · No auth required |
|------|-------------|---|
| `usace_locations` | Search CWMS monitoring locations by name, office, or type. |
| `usace_timeseries` | Get USACE time-series data: water level, flow, storage, precipitation. |
| `usace_levels` | Get water level data for USACE locations. |

#### `usace_locations`

Search CWMS monitoring locations by name, office, or type.
Corps district offices: SWL (Little Rock), LRL (Louisville), MVS (St. Louis), NWK (Kansas City), MVP (St. Paul).
Returns location name, coordinates, type, state, and county.

**Parameters:**
- `office` — Corps district office code: 'SWL', 'LRL', 'MVS', 'NWK', 'MVP'
- `names` — Location name pattern (supports wildcards): 'Mississippi*', 'Lock and Dam*'
- `location_type` — Location type filter

#### `usace_timeseries`

Get USACE time-series data: water level, flow, storage, precipitation.
Time-series names follow the format 'Location.Parameter.Type.Interval.Duration.Version'.
Use usace_locations first to find location names.

**Parameters:**
- `name` **(required)** — Time-series ID (e.g. 'Keys.Flow.Inst.1Hour.0.Ccp-Rev')
- `office` — Corps district office code: 'SWL', 'LRL', 'MVS'
- `begin` — Start date/time ISO 8601: '2024-01-01T00:00:00Z'
- `end` — End date/time ISO 8601: '2024-01-31T00:00:00Z'

#### `usace_levels`

Get water level data for USACE locations.
Returns level IDs, dates, constant values, and units.
Use a level-id-mask pattern to filter (supports wildcards).

**Parameters:**
- `office` — Corps district office code: 'SWL', 'LRL', 'MVS'
- `level_id_mask` — Level ID pattern (supports wildcards): 'Mississippi*', 'Lock*'

---

### USGS (U.S. Geological Survey)

Earthquake events (magnitude, location, depth, tsunami risk) and water resources monitoring (streamflow, water levels, temperature) from 13,000+ stations nationwide. No API key required.

**Workflow:** Use usgs_earthquakes to search for earthquakes by magnitude/location/date → usgs_significant for recent notable events → usgs_water_data for streamflow and water levels at monitoring sites → usgs_water_sites to find stations.

**Tips:** Earthquake magnitudes: 2.5+ felt by people, 4.0+ moderate, 5.0+ significant, 7.0+ major. Water parameter codes: 00060=discharge, 00065=gage height, 00010=water temp. Use state codes (CA, TX) for water site searches.

| Tool | Description | · No auth required |
|------|-------------|---|
| `usgs_earthquakes` | Search for earthquakes by magnitude, location, date range, and more. |
| `usgs_significant` | Get significant earthquakes from the past 30 days (typically M4.5+ or felt/damaging events). |
| `usgs_earthquake_count` | Count earthquakes matching criteria without fetching full details. |
| `usgs_water_data` | Get real-time water data (streamflow, gage height, temperature) from USGS monitoring sites. |
| `usgs_water_sites` | Search for USGS water monitoring sites by state, county, or hydrologic unit. |
| `usgs_daily_water_data` | Get USGS daily value water data (historical daily averages). |

#### `usgs_earthquakes`

Search for earthquakes by magnitude, location, date range, and more.
Returns magnitude, location, depth, time, alert level, tsunami risk, and felt reports.
Magnitude scale: 2.5+ felt by people, 4.0+ moderate, 5.0+ significant, 7.0+ major.

**Parameters:**
- `starttime` — Start date ISO format: '2024-01-01'
- `endtime` — End date ISO format: '2024-12-31'
- `minmagnitude` — Minimum magnitude (e.g. 4.0, 5.0, 6.0)
- `maxmagnitude` — Maximum magnitude
- `latitude` — Center latitude for radius search
- `longitude` — Center longitude for radius search
- `maxradiuskm` — Search radius in km (requires lat/lon)
- `alertlevel` — PAGER alert level: 'green' (Limited impact — no damage expected), 'yellow' (Regional impact — some damage possible), 'orange' (National/international impact — significant damage likely), 'red' (Massive impact — extensive damage and casualties expected)
- `limit` — Max results (default 20, max 200)
- `orderby` — Sort order (default: time)

#### `usgs_significant`

Get significant earthquakes from the past 30 days (typically M4.5+ or felt/damaging events).
Quick way to see the latest notable seismic activity worldwide.

#### `usgs_earthquake_count`

Count earthquakes matching criteria without fetching full details.
Useful for statistics: 'How many M5+ earthquakes occurred in 2024?'

**Parameters:**
- `starttime` — Start date: '2024-01-01'
- `endtime` — End date: '2024-12-31'
- `minmagnitude` — Minimum magnitude
- `maxmagnitude` — Maximum magnitude
- `latitude` — Center latitude for radius search
- `longitude` — Center longitude for radius search
- `maxradiuskm` — Search radius in km

#### `usgs_water_data`

Get real-time water data (streamflow, gage height, temperature) from USGS monitoring sites.
13,000+ stations nationwide. Parameter codes: 00060=discharge (cfs), 00065=gage height (ft), 00010=water temp (°C).
Query by site ID, state, county, or hydrologic unit code (HUC).

**Parameters:**
- `sites` — USGS site number(s), comma-separated: '01646500' or '01646500,01647000'
- `state_cd` — Two-letter state code: 'CA', 'TX', 'NY'
- `parameter_cd` — Parameter code: '00060' (discharge), '00065' (gage height), '00010' (temp). Default: 00060
- `period` — ISO 8601 duration: 'P1D' (1 day, default), 'P7D' (7 days), 'P30D' (30 days)
- `start_dt` — Start date: '2024-01-01' (overrides period)
- `end_dt` — End date: '2024-01-31'

#### `usgs_water_sites`

Search for USGS water monitoring sites by state, county, or hydrologic unit.
Site types: ST=stream, GW=groundwater, LK=lake, SP=spring.

**Parameters:**
- `state_cd` — Two-letter state code: 'CA', 'TX'
- `county_cd` — County FIPS code
- `site_type` — Site type: ST (stream), GW (groundwater), LK (lake), SP (spring)

#### `usgs_daily_water_data`

Get USGS daily value water data (historical daily averages).
Unlike real-time instantaneous values, these are aggregated daily means — better for trend analysis.
Parameter codes: 00060=discharge (cfs), 00065=gage height (ft), 00010=water temp (°C).

**Parameters:**
- `sites` — USGS site number(s): '01646500'
- `state_cd` — Two-letter state code: 'CA', 'TX'
- `parameter_cd` — Parameter code: '00060' (discharge), '00065' (gage height). Default: 00060
- `period` — ISO 8601 duration: 'P30D' (default), 'P90D', 'P365D'
- `start_dt` — Start date: '2024-01-01' (overrides period)
- `end_dt` — End date: '2024-12-31'

---

### WQP (Water Quality Portal)

Unified access to water quality data from USGS, EPA, and 400+ state agencies — monitoring stations and sample results

**Workflow:** wqp_stations → find monitoring stations, then wqp_results → get water quality sample data

**Tips:** Search by state FIPS code (e.g. US:06 for California). Common parameters: Temperature, pH, Dissolved oxygen, Nitrogen, Phosphorus

| Tool | Description | · No auth required |
|------|-------------|---|
| `wqp_stations` | Search water quality monitoring stations by state, county, or HUC code. |
| `wqp_results` | Get water quality sample results by station ID and/or parameter name. |

#### `wqp_stations`

Search water quality monitoring stations by state, county, or HUC code.
Data from USGS, EPA, and 400+ state agencies.

**Parameters:**
- `stateCode` — 2-digit state FIPS code (e.g. '06' for CA, '36' for NY)
- `countyCode` — 3-digit county FIPS code (requires stateCode)
- `huc` — Hydrologic Unit Code (2-12 digits)
- `siteType` — e.g. 'Stream', 'Lake', 'Well', 'Spring'
- `limit` — Max results (default 50)

#### `wqp_results`

Get water quality sample results by station ID and/or parameter name.
Common parameters: 'Temperature, water', 'pH', 'Dissolved oxygen', 'Nitrogen', 'Phosphorus'.

**Parameters:**
- `siteId` — Monitoring location ID (e.g. 'USGS-01646500')
- `characteristicName` — Parameter name (e.g. 'Temperature, water', 'pH')
- `stateCode` — 2-digit state FIPS code
- `startDate` — Start date (MM-DD-YYYY)
- `endDate` — End date (MM-DD-YYYY)
- `limit` — Max results (default 50)

---

## Education

### College Scorecard

College costs, graduation rates, post-graduation earnings, student debt, admission rates for every U.S. college and university

**Workflow:** scorecard_search to find schools → scorecard_compare for side-by-side → scorecard_top for rankings

**Tips:** Ownership: 1=Public, 2=Private nonprofit, 3=Private for-profit. Degree types: 1=Certificate, 2=Associate, 3=Bachelor's, 4=Graduate. Use state abbreviations for filtering: 'CA', 'NY', 'TX'. Sort by cost, earnings, or graduation rate to find best/worst schools.

| Tool | Description | · Auth: `DATA_GOV_API_KEY` |
|------|-------------|---|
| `scorecard_search` | Search U.S. colleges and universities from the College Scorecard. |
| `scorecard_compare` | Compare specific colleges side-by-side on cost, graduation rate, earnings, and debt. |
| `scorecard_top` | Get top-ranked colleges by earnings, graduation rate, or lowest cost. |
| `scorecard_query` | Advanced College Scorecard query with custom field filters and ranges. |

#### `scorecard_search`

Search U.S. colleges and universities from the College Scorecard.
Returns tuition, admission rate, graduation rate, median earnings after graduation, student debt.

Search by name, state, or school type. Sort by cost, earnings, or graduation rate.

**Parameters:**
- `name` — School name (partial match): 'Harvard', 'community college', 'MIT'
- `state` — Two-letter state code: 'CA', 'NY', 'TX'
- `ownership` — 1=Public, 2=Private nonprofit, 3=Private for-profit
- `sort` — Sort field: 'latest.cost.tuition.out_of_state:desc', 'latest.earnings.10_yrs_after_entry.median:desc', 'latest.completion.rate_suppressed.overall:desc'
- `per_page` — Results per page (default 20, max 100)

#### `scorecard_compare`

Compare specific colleges side-by-side on cost, graduation rate, earnings, and debt.
Provide school names to search and compare.

**Parameters:**
- `schools` **(required)** — Comma-separated school names to compare: 'Harvard,MIT,Stanford' or 'Ohio State,Michigan'

#### `scorecard_top`

Get top-ranked colleges by earnings, graduation rate, or lowest cost.
Rankings: 'earnings' (highest median pay 10yr after entry), 'graduation' (highest completion rate), 'expensive' (highest tuition)

**Parameters:**
- `ranking` **(required)** — Ranking metric
- `state` — Filter to state: 'CA', 'NY', 'TX'
- `ownership` — 1=Public, 2=Private nonprofit, 3=Private for-profit
- `per_page` — Number of schools (default 20)

#### `scorecard_query`

Advanced College Scorecard query with custom field filters and ranges.

Filter examples:
- 'latest.admissions.admission_rate.overall__range=0..0.10' (schools with <10% admission rate)
- 'latest.cost.tuition.in_state__range=..5000' (tuition under $5K)
- 'school.degrees_awarded.predominant=3' (bachelor's-granting)
- 'latest.earnings.10_yrs_after_entry.median__range=80000..' (high-earning graduates)

**Parameters:**
- `filters` **(required)** — Semicolon-separated filter params: 'school.state=CA;latest.admissions.admission_rate.overall__range=0..0.20;school.degrees_awarded.predominant=3'
- `sort` — Sort: 'latest.earnings.10_yrs_after_entry.median:desc'
- `per_page` — Results per page (default 20)

---

### NAEP (Nation's Report Card)

National Assessment of Educational Progress: 10 subjects (reading, math, science, writing, civics, history, geography, economics, TEL, music) by state, grade, race, gender, poverty. Subscale breakdowns, achievement levels, significance testing across years/states/groups, district-level data for 30 urban districts.

**Workflow:** naep_scores for current data (supports subscales, crosstabs, district codes) → naep_achievement_levels for proficiency % → naep_compare_years for trends → naep_compare_states for state rankings → naep_compare_groups for achievement gaps

**Tips:** Subjects: 'reading', 'math', 'science', 'writing', 'civics', 'history', 'geography', 'economics', 'tel', 'music'. Aliases accepted: 'mathematics', 'ela', 'us history', 'social studies', 'econ', 'technology'. Grades: 4, 8, 12 (math: 4,8 only; economics/tel/music: 8 or 12 only). Jurisdictions: 'NP' (national), state codes (CA, TX), district codes (XN=NYC, XC=Chicago, XL=LA, XB=Boston). Variables: 'TOTAL', 'SDRACE' (race), 'GENDER', 'SLUNCH3' (poverty). Crosstab: 'SDRACE+GENDER'. Subscales: each subject has subscales (e.g. math: MRPS1=numbers, MRPS3=geometry). Years: '2022', 'Current', 'Prior', 'Base'. Append R2 for non-accommodated sample.

| Tool | Description | · No auth required |
|------|-------------|---|
| `naep_scores` | Get NAEP test scores (Nation's Report Card) — the gold standard for measuring U.S. student achievement. |
| `naep_achievement_levels` | Get the percentage of students at each NAEP achievement level: Below Basic, Basic, Proficient, Advanced. |
| `naep_compare_years` | Compare NAEP scores across assessment years with significance testing. |
| `naep_compare_states` | Compare NAEP scores across states/jurisdictions with significance testing. |
| `naep_compare_groups` | Compare NAEP scores across demographic groups (race, gender, poverty) with significance testing. |
| `naep_gap_year_jurisdiction` | Compare how score changes between years differ across jurisdictions. |
| `naep_gap_variable_years` | Compare how achievement gaps between demographic groups change over time. |
| `naep_gap_variable_jurisdiction` | Compare how achievement gaps between demographic groups differ across states. |
| `naep_available_variables` | List available independent variables for a NAEP subject, cohort, and year. |

#### `naep_scores`

Get NAEP test scores (Nation's Report Card) — the gold standard for measuring U.S. student achievement.
Returns average scale scores by subject, grade, state, and demographic group.

Subjects: 'reading', 'math', 'science', 'writing', 'civics', 'history', 'geography', 'economics', 'tel', 'music'
Grades: 4, 8, 12 (math: 4,8 only; economics/tel/music: 8 or 12 only)
Variables: 'TOTAL' (all students), 'SDRACE' (race), 'GENDER', 'SLUNCH3' (school lunch/poverty), 'PARED' (parent education)
Jurisdiction: 'NP' (national public), or state codes ('CA', 'TX', 'NY', 'MS')

**Parameters:**
- `subject` **(required)** — Subject: 'reading', 'math', 'science', 'writing', 'civics', 'history', 'geography', 'economics', 'tel', 'music'. Aliases: 'mathematics', 'ela', 'us history', 'social studies', 'econ', 'technology'
- `grade` **(required)** — Grade: 4, 8, or 12. Math: 4,8 only. Economics/TEL/Music: grade 8 or 12 only.
- `variable` — 'TOTAL' (default), 'SDRACE' (race), 'GENDER', 'SLUNCH3' (poverty), 'PARED' (parent ed), 'IEP' (disability), 'LEP' (English learners). Crosstab: 'SDRACE+GENDER'
- `jurisdiction` — 'NP' (national public, default), or state/district codes: 'CA', 'TX', 'XN' (NYC), 'XC' (Chicago). Comma-separate for multiple.
- `year` — Assessment year: '2022', '2019', '2017'. Default: most recent. Use 'Current' for latest. Append R2 for non-accommodated: '2019R2'.
- `stat_type` — Statistic type: 'MN:MN' (Average scale score (mean)), 'RP:RP' (Row percent), 'ALC:BB' (% Below Basic (cumulative)), 'ALC:AB' (% At or Above Basic (cumulative)), 'ALC:AP' (% At or Above Proficient (cumulative)), 'ALC:AD' (% At Advanced (cumulative)), 'ALD:BA' (% At Basic (discrete)), 'ALD:PR' (% At Proficient (discrete)), ... (15 total)
- `subscale` — Override the default composite subscale. E.g. math: 'MRPS1' (numbers), 'MRPS3' (geometry). See reference for all codes.
- `categoryindex` — Filter specific categories. E.g. for SDRACE: '1' (White), '2' (Black), '3' (Hispanic). For crosstab: '1+1,1+2' (White/Male, White/Female)

#### `naep_achievement_levels`

Get the percentage of students at each NAEP achievement level: Below Basic, Basic, Proficient, Advanced.
THIS IS THE KEY LITERACY/NUMERACY METRIC — shows what % of students can read/do math at grade level.
Example: '37% of 4th graders scored Below Basic in reading' comes from this data.

**Parameters:**
- `subject` **(required)** — Subject: 'reading', 'math', 'science', 'writing', 'civics', 'history', 'geography', 'economics', 'tel', 'music'. Aliases accepted.
- `grade` **(required)** — Grade: 4, 8, or 12. Math: 4,8 only. Economics/TEL/Music: 8 or 12 only.
- `variable` — 'TOTAL' (default), 'SDRACE' (race), 'GENDER', 'SLUNCH3' (poverty)
- `jurisdiction` — 'NP' (national, default), or state codes
- `year` — Year: '2022', '2019'. Default: most recent

#### `naep_compare_years`

Compare NAEP scores across assessment years with significance testing.
Shows whether score changes between years are statistically significant.
Great for tracking the COVID learning loss and recovery.

**Parameters:**
- `subject` **(required)** — Subject: 'reading', 'math', 'science', 'writing', 'civics', 'history', 'geography', 'economics', 'tel', 'music'. Aliases accepted.
- `grade` **(required)** — Grade: 4, 8, or 12. Math: 4,8 only. Economics/TEL/Music: 8 or 12 only.
- `years` **(required)** — Comma-separated years to compare: '2022,2019' or '2022,2019,2017'
- `variable` — 'TOTAL' (default), 'SDRACE', 'GENDER', 'SLUNCH3'
- `jurisdiction` — 'NP' (default), or state codes

#### `naep_compare_states`

Compare NAEP scores across states/jurisdictions with significance testing.
Shows which states score significantly higher or lower than others.
Example: Compare Massachusetts vs Mississippi reading scores.

**Parameters:**
- `subject` **(required)** — Subject: 'reading', 'math', 'science', 'writing', 'civics', 'history', 'geography', 'economics', 'tel', 'music'. Aliases accepted.
- `grade` **(required)** — Grade: 4, 8, or 12. Math: 4,8 only. Economics/TEL/Music: 8 or 12 only.
- `jurisdictions` **(required)** — Comma-separated jurisdiction codes: 'NP,CA,TX,MS,MA' or 'NP,NY'
- `variable` — 'TOTAL' (default), 'SDRACE', 'GENDER'
- `year` — Year: '2022'. Default: most recent

#### `naep_compare_groups`

Compare NAEP scores across demographic groups (race, gender, poverty) with significance testing.
Shows achievement gaps between groups (e.g., White vs Black, Male vs Female, eligible vs not eligible for free lunch).

**Parameters:**
- `subject` **(required)** — Subject: 'reading', 'math', 'science', 'writing', 'civics', 'history', 'geography', 'economics', 'tel', 'music'. Aliases accepted.
- `grade` **(required)** — Grade: 4, 8, or 12. Math: 4,8 only. Economics/TEL/Music: 8 or 12 only.
- `variable` **(required)** — 'SDRACE' (race gap), 'GENDER' (gender gap), 'SLUNCH3' (poverty gap), 'IEP' (disability gap), 'LEP' (ELL gap)
- `jurisdiction` — 'NP' (default), or state codes
- `year` — Year: '2022'. Default: most recent

#### `naep_gap_year_jurisdiction`

Compare how score changes between years differ across jurisdictions.
Example: Did the COVID learning loss hit California harder than Massachusetts?
Returns innerdiff1 (year gap for focal jurisdiction), innerdiff2 (year gap for target), and the gap between them.

**Parameters:**
- `subject` **(required)** — Subject: 'reading', 'math', 'science', etc. Aliases accepted.
- `grade` **(required)** — Grade: 4, 8, or 12.
- `years` **(required)** — Exactly 2 years comma-separated: '2022,2019'
- `jurisdictions` **(required)** — 2+ jurisdiction codes comma-separated: 'CA,MA' or 'NP,TX'
- `variable` — 'TOTAL' (default), 'SDRACE', 'GENDER', 'SLUNCH3'

#### `naep_gap_variable_years`

Compare how achievement gaps between demographic groups change over time.
Example: Is the racial achievement gap in reading getting bigger or smaller since 2017?
Returns innerdiff1 (group gap for focal year), innerdiff2 (group gap for target year), and the gap between them.

**Parameters:**
- `subject` **(required)** — Subject: 'reading', 'math', 'science', etc. Aliases accepted.
- `grade` **(required)** — Grade: 4, 8, or 12.
- `variable` **(required)** — Non-TOTAL variable with 2+ categories: 'SDRACE', 'GENDER', 'SLUNCH3'
- `years` **(required)** — 2+ years comma-separated: '2022,2019' or '2022,2017'
- `jurisdiction` — 'NP' (default), or state/district code

#### `naep_gap_variable_jurisdiction`

Compare how achievement gaps between demographic groups differ across states.
Example: Is the poverty gap in math bigger in Mississippi than Massachusetts?
Returns innerdiff1 (group gap for focal jurisdiction), innerdiff2 (group gap for target), and the gap between them.

**Parameters:**
- `subject` **(required)** — Subject: 'reading', 'math', 'science', etc. Aliases accepted.
- `grade` **(required)** — Grade: 4, 8, or 12.
- `variable` **(required)** — Non-TOTAL variable with 2+ categories: 'SDRACE', 'GENDER', 'SLUNCH3'
- `jurisdictions` **(required)** — 2+ jurisdiction codes comma-separated: 'MA,MS' or 'NP,CA,TX'
- `year` — Year: '2022'. Default: most recent.

#### `naep_available_variables`

List available independent variables for a NAEP subject, cohort, and year.
Use this to discover what demographic/survey variables are available before querying scores.
Returns variable names (Varname), short labels, and long labels.

**Parameters:**
- `subject` **(required)** — Subject: 'reading', 'math', 'science', etc. Aliases accepted.
- `cohort` **(required)** — Cohort: 1 (grade 4/age 9), 2 (grade 8/age 13), 3 (grade 12/age 17)
- `years` **(required)** — Comma-separated years: '2022' or '2019,2022'

---

### NARA (National Archives)

Search the National Archives catalog — millions of historical records, documents, photographs, and government publications. Includes metadata, descriptions, and links to digitized content.

**Workflow:** nara_search to search the National Archives catalog by keyword → nara_record to get full record details by NARA ID.

**Tips:** Rate limited to 10,000 queries/month. Search returns brief metadata; use nara_record for full details. Results include descriptions, dates, creators, and links to digitized content when available. Limit max 100, offset for pagination.

| Tool | Description | · No auth required |
|------|-------------|---|
| `nara_search` | Search the National Archives catalog for historical records, documents, photographs, and government publications. |
| `nara_record` | Get full details for a specific National Archives record by NARA ID. |

#### `nara_search`

Search the National Archives catalog for historical records, documents, photographs, and government publications.
Returns record metadata including titles, descriptions, dates, and links to digitized content.
Rate limited to 10,000 queries/month.

**Parameters:**
- `query` **(required)** — Search keywords: 'civil war', 'moon landing', 'constitution', 'executive order'
- `limit` — Results to return (default 20, max 100)
- `offset` — Offset for pagination (default 0)

#### `nara_record`

Get full details for a specific National Archives record by NARA ID.
Returns complete metadata, descriptions, creators, and links to digitized content when available.

**Parameters:**
- `nara_id` **(required)** — NARA record ID (from search results)

---

### Urban Institute Education Data Explorer

K-12, higher ed, and school finance data across all 50 states — schools, districts, and colleges from the Urban Institute

**Workflow:** urban_ed_schools / urban_ed_districts / urban_ed_colleges → query enrollment data by year and state

**Tips:** Use 2-digit state FIPS codes (e.g. 06=CA, 36=NY, 48=TX). Year is required. Data covers CCD (K-12) and IPEDS (higher ed).

| Tool | Description | · No auth required |
|------|-------------|---|
| `urban_ed_schools` | Query school-level enrollment data from the CCD (Common Core of Data). |
| `urban_ed_districts` | Query district-level enrollment data from the CCD. |
| `urban_ed_colleges` | Query college/university enrollment data (FTE) from IPEDS. |

#### `urban_ed_schools`

Query school-level enrollment data from the CCD (Common Core of Data).
Covers all public schools in the US.

**Parameters:**
- `year` **(required)** — School year (e.g. 2022)
- `stateFips` — 2-digit state FIPS code (e.g. 6 for CA, 36 for NY)
- `grade` — Grade level (-1=PK, 0=K, 1-12)
- `limit` — Max results (default 50)
- `offset` — Pagination offset (default 0)

#### `urban_ed_districts`

Query district-level enrollment data from the CCD.
Covers all public school districts in the US.

**Parameters:**
- `year` **(required)** — School year (e.g. 2022)
- `stateFips` — 2-digit state FIPS code (e.g. 6 for CA, 36 for NY)
- `limit` — Max results (default 50)
- `offset` — Pagination offset (default 0)

#### `urban_ed_colleges`

Query college/university enrollment data (FTE) from IPEDS.
Covers all Title IV postsecondary institutions.

**Parameters:**
- `year` **(required)** — Academic year (e.g. 2022)
- `stateFips` — 2-digit state FIPS code (e.g. 6 for CA, 36 for NY)
- `limit` — Max results (default 50)
- `offset` — Pagination offset (default 0)

---

## Spending

### Open Payments (Sunshine Act)

CMS Open Payments — tracks payments from pharmaceutical and medical device companies to doctors and teaching hospitals. 15M+ payment records per year. Search by company, doctor, state, or specialty. No API key required.

**Workflow:** Use open_payments_search to find payments by company/doctor/state → open_payments_top for highest payments → open_payments_top_doctors for aggregate totals per doctor → cross-reference with fda_drug_events for the same company's drugs → lobbying_search for the company's lobbying spend → clinical_trials_search for their clinical trials.

**Tips:** Company names: 'Pfizer', 'Novo Nordisk', 'Johnson & Johnson'. States: 'CA', 'TX', 'NY'. Specialties: 'Cardiology', 'Orthopedic', 'Psychiatry'. Years: 2018-2024 available. Dataset IDs are auto-discovered from the CMS metastore — new years are picked up automatically.

| Tool | Description | · No auth required |
|------|-------------|---|
| `open_payments_search` | Search CMS Open Payments (Sunshine Act) data — payments from pharma/device companies to doctors. |
| `open_payments_top` | Find the HIGHEST pharma payments to doctors — sorted by amount descending.\nUse this to find the biggest consulting fees, royalties, and speaking fees in a state or specialty.\nSupports sorting by payment amount — unlike the basic search which returns results in default order. |
| `open_payments_top_doctors` | Find the HIGHEST-PAID doctors by TOTAL payments received — aggregates all individual payments per doctor. |
| `open_payments_by_company` | Get payment summary data grouped by pharmaceutical/device company (all years combined). |
| `open_payments_summary` | Get national-level Open Payment totals and averages across all years. |
| `open_payments_research` | Search Open Payments RESEARCH payment data — grants, clinical research funding from pharma to doctors. |
| `open_payments_ownership` | Search Open Payments OWNERSHIP data — doctors with ownership or investment stakes in pharma/device companies. |
| `open_payments_by_physician` | Get payments grouped by individual physician across all years. |
| `open_payments_by_hospital` | Get payments grouped by teaching hospital. |
| `open_payments_by_specialty` | Get national payment totals and averages by medical specialty. |

#### `open_payments_search`

Search CMS Open Payments (Sunshine Act) data — payments from pharma/device companies to doctors.
15M+ records per year. Shows exact dollar amounts, payment type, doctor name/specialty, and which drugs/devices are involved.
Cross-reference with FDA (drug safety), lobbying (company influence), and clinical trials.

**Parameters:**
- `company` — Company name (partial match): 'Pfizer', 'Novo Nordisk', 'Johnson & Johnson'
- `doctor` — Doctor last name: 'Smith', 'Jones' (case-insensitive)
- `state` — Two-letter state: 'CA', 'TX', 'NY'
- `specialty` — Medical specialty (partial match): 'Cardiology', 'Orthopedic', 'Psychiatry'
- `year` — Payment year (auto-discovers latest if omitted). Available: 2018-2024+, new years added automatically when CMS publishes.
- `limit` — Max results (default 20)

#### `open_payments_top`

Find the HIGHEST pharma payments to doctors — sorted by amount descending.\nUse this to find the biggest consulting fees, royalties, and speaking fees in a state or specialty.\nSupports sorting by payment amount — unlike the basic search which returns results in default order.

**Parameters:**
- `company` — Company name: 'Pfizer', 'Stryker', 'Medtronic'
- `doctor` — Doctor last name
- `state` — Two-letter state: 'WA', 'CA', 'TX'
- `specialty` — Specialty: 'Orthopaedic', 'Cardio', 'Neurology'
- `year` — Year (auto-discovers latest)
- `limit` — Number of top results (default 20)

#### `open_payments_top_doctors`

Find the HIGHEST-PAID doctors by TOTAL payments received — aggregates all individual payments per doctor.
Groups by doctor and sums all their payments, sorted by total descending.
This is the key tool for finding doctors with the biggest pharma relationships.

**Parameters:**
- `state` — Two-letter state: 'WA', 'CA', 'TX'
- `specialty` — Specialty: 'Orthopaedic', 'Cardio', 'Neurology'
- `company` — Company name: 'Pfizer', 'Stryker'
- `year` — Year (auto-discovers latest)
- `limit` — Number of top doctors (default 20)

#### `open_payments_by_company`

Get payment summary data grouped by pharmaceutical/device company (all years combined).
Shows total amounts and number of payments per company.

**Parameters:**
- `limit` — Number of companies to return (default 20)

#### `open_payments_summary`

Get national-level Open Payment totals and averages across all years.
Shows how much money flows from pharma to doctors nationally.

#### `open_payments_research`

Search Open Payments RESEARCH payment data — grants, clinical research funding from pharma to doctors.
Separate from general payments. Shows research funding amounts, sponsors, and principal investigators.

**Parameters:**
- `company` — Company name: 'Pfizer', 'Novo Nordisk'
- `doctor` — Doctor last name: 'Smith'
- `state` — Two-letter state: 'CA', 'WA'
- `year` — Year (auto-discovers latest if omitted)
- `limit` — Max results (default 20)

#### `open_payments_ownership`

Search Open Payments OWNERSHIP data — doctors with ownership or investment stakes in pharma/device companies.
The deepest form of conflict of interest. Shows which doctors have financial interests in the companies whose products they prescribe.

**Parameters:**
- `company` — Company name: 'Pfizer', 'Johnson & Johnson'
- `doctor` — Doctor last name
- `state` — Two-letter state: 'CA', 'WA'
- `year` — Year (auto-discovers latest if omitted)
- `limit` — Max results (default 20)

#### `open_payments_by_physician`

Get payments grouped by individual physician across all years.
Pre-aggregated totals — shows how much each doctor received from pharma overall.

**Parameters:**
- `limit` — Number of physicians (default 20)

#### `open_payments_by_hospital`

Get payments grouped by teaching hospital.
Shows total pharma payments to teaching hospitals — useful for identifying institutional conflicts of interest.

**Parameters:**
- `limit` — Number of hospitals (default 20)

#### `open_payments_by_specialty`

Get national payment totals and averages by medical specialty.
Shows which specialties receive the most pharma money — cardiologists, orthopedic surgeons, psychiatrists, etc.

**Parameters:**
- `limit` — Number of specialties (default 30)

---

### USAspending

Federal contracts, grants, loans, direct payments — who got the money and where

**Workflow:** search awards by keyword/agency/state → drill into recipients or trends

**Tips:** No API key required. Data updates nightly. Earliest data: FY2008 (2007-10-01).

| Tool | Description | · No auth required |
|------|-------------|---|
| `usa_spending_by_award` | Search federal spending awards (contracts, grants, loans, direct payments). Filter by keyword, agency, recipient, date range, award type, and amount. |
| `usa_spending_by_agency` | Get total federal spending broken down by awarding agency. Shows which agencies are spending the most. |
| `usa_spending_by_state` | Get federal spending by state or territory. Shows total awards and per-capita spending. |
| `usa_spending_by_recipient` | Get the top recipients (companies, organizations) of federal spending. Use state and agency filters to narrow results. |
| `usa_spending_over_time` | Get federal spending aggregated by time period (monthly, quarterly, or fiscal year). Useful for identifying trends. |
| `usa_agency_overview` | Get an overview of a federal agency's spending, including budgetary resources and obligations. |

#### `usa_spending_by_award`

Search federal spending awards (contracts, grants, loans, direct payments). Filter by keyword, agency, recipient, date range, award type, and amount.

Award type groups: 'contracts', 'grants', 'loans', 'direct_payments'. Or use codes: 'A,B,C,D' (contracts), '02,03,04,05' (grants), '07,08' (loans), '06,10' (direct payments)

**Parameters:**
- `keyword` — Keyword to search across award descriptions and recipient names
- `award_type` — Award type filter
- `agency` — Awarding agency name, e.g. 'Department of Defense'
- `recipient` — Recipient/company name to search for
- `state` — Two-letter state code, e.g. 'CA', 'TX'
- `start_date` — Start date YYYY-MM-DD (default: current FY). Earliest: 2007-10-01
- `end_date` — End date YYYY-MM-DD (default: today)
- `min_amount` — Minimum award amount in dollars
- `max_amount` — Maximum award amount in dollars
- `limit` — Results per page (default: 25)
- `page` — Page number (default: 1)
- `sort_field` — Sort by: 'Award Amount' (default), 'Recipient Name', 'Start Date', 'End Date'

#### `usa_spending_by_agency`

Get total federal spending broken down by awarding agency. Shows which agencies are spending the most.

**Parameters:**
- `fiscal_year` — Fiscal year (default: current)
- `state` — Two-letter state code, e.g. 'CA', 'TX'
- `keyword` — Keyword to filter spending
- `award_type` — Award type filter
- `limit` — Number of agencies (default: 20)

#### `usa_spending_by_state`

Get federal spending by state or territory. Shows total awards and per-capita spending.

**Parameters:**
- `state` — Two-letter state code (e.g. 'CA'). Omit for all states.
- `fiscal_year` — Fiscal year (default: most recent)

#### `usa_spending_by_recipient`

Get the top recipients (companies, organizations) of federal spending. Use state and agency filters to narrow results.

**Parameters:**
- `fiscal_year` — Fiscal year (default: current)
- `award_type` — Award type filter
- `state` — Two-letter state code, e.g. 'CA', 'TX'
- `agency` — Awarding agency name, e.g. 'Department of Energy'
- `limit` — Number of recipients (default: 25)

#### `usa_spending_over_time`

Get federal spending aggregated by time period (monthly, quarterly, or fiscal year). Useful for identifying trends.

**Parameters:**
- `group` — Time grouping (default: month)
- `start_date` — Start date YYYY-MM-DD (default: 3 years ago)
- `end_date` — End date YYYY-MM-DD (default: today)
- `agency` — Filter to specific agency name
- `award_type` — Award type filter
- `state` — Two-letter state code, e.g. 'CA', 'TX'
- `keyword` — Keyword to filter spending

#### `usa_agency_overview`

Get an overview of a federal agency's spending, including budgetary resources and obligations.

Common codes: '097' (DOD), '075' (HHS), '069' (Treasury), '089' (DOE), '012' (USDA), '015' (Justice), '036' (VA), '070' (DHS), '080' (NASA)

**Parameters:**
- `agency_code` **(required)** — Toptier agency code. Common: '097' (DOD), '075' (HHS), '069' (Treasury), '089' (DOE), '036' (VA), '070' (DHS), '080' (NASA), '091' (Education), '016' (Labor)
- `fiscal_year` — Fiscal year (default: current)

---

## Safety

### CPSC (Consumer Product Safety Commission)

Consumer Product Safety Commission — product recalls, civil/criminal penalties, and company/product penalty lookups via the SaferProducts.gov API. No API key required.

**Workflow:** cpsc_recall_search to find recalls by product/manufacturer/date → cpsc_recall_detail for full recall info → cpsc_penalty_companies to list penalized companies → cpsc_penalty_search for penalty details

**Tips:** Use broad search terms for product names (e.g. 'stroller', 'battery', 'toy'). Date parameters use MM/DD/YYYY format. Penalty searches accept penaltytype 'civil' or 'criminal'. The API returns JSON arrays directly without an envelope wrapper.

| Tool | Description | · No auth required |
|------|-------------|---|
| `cpsc_recall_search` | Search CPSC consumer product recalls by product name, manufacturer, hazard, date range, or recall number. |
| `cpsc_recall_detail` | Get full CPSC recall details by RecallID. |
| `cpsc_penalty_search` | Search CPSC penalty records by type, company, product, fiscal year, or ID. |
| `cpsc_penalty_companies` | List companies that have CPSC penalties (civil or criminal). |

#### `cpsc_recall_search`

Search CPSC consumer product recalls by product name, manufacturer, hazard, date range, or recall number.
All parameters are optional — use at least one to filter results.
Date parameters use MM/DD/YYYY format.

Example: product_name='stroller', manufacturer='Fisher-Price', hazard='choking'

**Parameters:**
- `recall_number` — Recall number (e.g. '23-123')
- `recall_date_start` — Start date for recall date range (MM/DD/YYYY)
- `recall_date_end` — End date for recall date range (MM/DD/YYYY)
- `last_publish_date_start` — Start date for last publish date range (MM/DD/YYYY)
- `last_publish_date_end` — End date for last publish date range (MM/DD/YYYY)
- `recall_title` — Search within recall titles
- `product_name` — Product name keyword: 'stroller', 'battery', 'toy'
- `product_type` — Product type/category
- `manufacturer` — Manufacturer name: 'Fisher-Price', 'IKEA'
- `hazard` — Hazard keyword: 'choking', 'fire', 'burn', 'laceration'

#### `cpsc_recall_detail`

Get full CPSC recall details by RecallID.
Returns complete information including description, products, manufacturers,
hazards, remedies, injuries, retailers, images, and consumer contact info.
Use cpsc_recall_search first to find RecallIDs.

**Parameters:**
- `recall_id` **(required)** — Recall ID from search results

#### `cpsc_penalty_search`

Search CPSC penalty records by type, company, product, fiscal year, or ID.
Penalty type (civil or criminal) is required.
Use cpsc_penalty_companies to discover valid company names.

Example: penalty_type='civil', company='IKEA'

**Parameters:**
- `penalty_type` **(required)** — Penalty type: 'civil' or 'criminal'
- `company` — Company name
- `product` — Product type
- `fiscal_year` — Fiscal year (e.g. '2023')
- `id` — Specific penalty record ID

#### `cpsc_penalty_companies`

List companies that have CPSC penalties (civil or criminal).
Use the company names from results with cpsc_penalty_search.

**Parameters:**
- `penalty_type` **(required)** — Penalty type: 'civil' or 'criminal'

---

### DOL (Department of Labor)

OSHA workplace safety inspections, violations, and accident investigations. WHD wage theft enforcement (back wages, penalties, FLSA/FMLA violations). Unemployment Insurance weekly claims (national and state).

**Workflow:** dol_osha_inspections to find inspections → dol_osha_violations for violations found → dol_osha_accidents for accident investigations → dol_whd_enforcement for wage theft cases → dol_ui_claims_national for unemployment trends

**Tips:** OSHA inspection types: A=Accident, B=Complaint, C=Referral, H=Planned, L=Programmed high-hazard. Violation types: S=Serious, W=Willful, R=Repeat, O=Other. States use two-letter codes (CA, TX, NY). WHD covers FLSA (minimum wage/overtime), FMLA (family leave), Davis-Bacon (prevailing wage), SCA (service contracts). Sort uses sort_by (field name) + sort_order ('asc' or 'desc').

| Tool | Description | · Auth: `DOL_API_KEY` |
|------|-------------|---|
| `dol_osha_inspections` | Search OSHA workplace inspections. |
| `dol_osha_violations` | Search OSHA violations found during workplace inspections. |
| `dol_osha_accidents` | Search OSHA accident and fatality investigations. |
| `dol_osha_accident_injuries` | Get injury details from OSHA accident investigations. |
| `dol_whd_enforcement` | Search WHD (Wage and Hour Division) enforcement cases. |
| `dol_ui_claims_national` | Get national weekly Unemployment Insurance (UI) initial and continued claims. |
| `dol_ui_claims_state` | Get state-level weekly Unemployment Insurance (UI) claims. |

#### `dol_osha_inspections`

Search OSHA workplace inspections.
Find inspections by state, establishment name, industry (SIC/NAICS), or type.
Inspection types: A=Accident, B=Complaint, C=Referral, H=Planned, L=Programmed high-hazard.
Returns site details, inspection type/scope, open/close dates.

**Parameters:**
- `state` — Two-letter state code: 'CA', 'TX', 'NY'
- `estab_name` — Establishment name: 'Amazon', 'Walmart', 'Tesla'
- `naics_code` — NAICS industry code: '236220' (commercial construction)
- `sic_code` — SIC industry code
- `insp_type` — Inspection type: A=Accident, B=Complaint, C=Referral, H=Planned, L=High-hazard
- `sort_by` — Field to sort by: 'open_date' (default), 'close_case_date'
- `sort_order` — Sort direction (default: desc)
- `limit` — Max results (default 25)
- `offset` — Pagination offset

#### `dol_osha_violations`

Search OSHA violations found during workplace inspections.
Violation types: S=Serious, W=Willful, R=Repeat, O=Other, U=Unclassified, F=Failure to abate.
Returns standard cited, penalty amounts (initial and current), abatement status.
Link to inspections via activity_nr.

**Parameters:**
- `activity_nr` — Inspection activity number (links to specific inspection)
- `viol_type` — Violation type: S=Serious, W=Willful, R=Repeat, O=Other
- `standard` — OSHA standard cited: '19100147' (control of hazardous energy)
- `sort_by` — Field to sort by: 'issuance_date' (default), 'current_penalty'
- `sort_order` — Sort direction (default: desc)
- `limit` — Max results (default 25)
- `offset` — Pagination offset

#### `dol_osha_accidents`

Search OSHA accident and fatality investigations.
Returns event descriptions, dates, locations, and industry codes.
Use dol_osha_accident_injuries to get injury details for a specific accident.

**Parameters:**
- `state` — Two-letter state code: 'CA', 'TX', 'NY'
- `sic_code` — SIC industry code
- `event_keyword` — Event keyword: 'fall', 'electrocution', 'struck', 'caught'
- `sort_by` — Field to sort by: 'event_date' (default)
- `sort_order` — Sort direction (default: desc)
- `limit` — Max results (default 25)
- `offset` — Pagination offset

#### `dol_osha_accident_injuries`

Get injury details from OSHA accident investigations.
Returns demographics (age, sex), nature of injury, body part, source, degree of injury.
Degree of injury: 1=Fatality, 2=Hospitalized, 3=Non-hospitalized.
Link to accidents via summary_nr.

**Parameters:**
- `summary_nr` — Accident summary number (links to specific accident)
- `degree_of_inj` — Degree of injury: 1=Fatality, 2=Hospitalized, 3=Non-hospitalized
- `limit` — Max results (default 25)
- `offset` — Pagination offset

#### `dol_whd_enforcement`

Search WHD (Wage and Hour Division) enforcement cases.
Covers wage theft investigations: back wages owed, penalties assessed, violation counts.
Laws enforced: FLSA (minimum wage/overtime), FMLA (family leave), Davis-Bacon (prevailing wage), SCA (service contracts).
Data available since FY2005.

**Parameters:**
- `state` — Two-letter state code: 'CA', 'TX', 'NY'
- `trade_nm` — Business/trade name: 'McDonald\'s', 'Subway', 'Walmart'
- `naics_code` — NAICS industry code: '722511' (full-service restaurants)
- `sort_by` — Field to sort by: 'findings_end_date' (default), 'bw_atp_amt' (back wages)
- `sort_order` — Sort direction (default: desc)
- `limit` — Max results (default 25)
- `offset` — Pagination offset

#### `dol_ui_claims_national`

Get national weekly Unemployment Insurance (UI) initial and continued claims.
Includes insured unemployment rate and covered employment.
Key economic indicator — spikes indicate labor market stress.

**Parameters:**
- `limit` — Number of weekly records (default 25, use 52 for 1 year)
- `offset` — Pagination offset
- `sort_by` — Field to sort by: 'rptdate' (default)
- `sort_order` — Sort direction (default: desc)

#### `dol_ui_claims_state`

Get state-level weekly Unemployment Insurance (UI) claims.
Compare initial claims, continued claims, and insured unemployment rate across states.

**Parameters:**
- `state` — Two-letter state code: 'CA', 'TX', 'NY'. Omit for all states.
- `limit` — Number of records (default 25)
- `offset` — Pagination offset
- `sort_by` — Field to sort by: 'rptdate' (default)
- `sort_order` — Sort direction (default: desc)

---

### NHTSA

National Highway Traffic Safety Administration — vehicle recalls (1949–present), consumer complaints, 5-star safety ratings (NCAP), VIN decoding, product browsing, and car seat inspection station finder. No API key required.

**Workflow:** nhtsa_models to discover models for a make → nhtsa_recalls for recalls → nhtsa_recall_detail for campaign details → nhtsa_complaints for consumer complaints → nhtsa_complaint_detail for ODI detail → nhtsa_safety_ratings + nhtsa_safety_rating_detail for crash test ratings → nhtsa_decode_vin for VIN lookup → nhtsa_car_seat_stations for inspection locations

**Tips:** Use common make names: 'honda', 'toyota', 'ford', 'chevrolet', 'tesla'. Model names match official names: 'civic', 'camry', 'f-150', 'model 3'. Recalls/complaints require make + model + modelYear (all three). Use nhtsa_models with issue_type='r' to find models that have recalls before querying. VINs are 17 characters. Campaign numbers look like '23V838000'.

| Tool | Description | · No auth required |
|------|-------------|---|
| `nhtsa_recalls` | Search NHTSA vehicle recalls by make, model, and model year. |
| `nhtsa_recall_detail` | Get recall details by NHTSA campaign number. |
| `nhtsa_complaints` | Search NHTSA vehicle complaints by make, model, and model year. |
| `nhtsa_complaint_detail` | Get a specific complaint by its ODI number. |
| `nhtsa_model_years` | List model years that have recalls or complaints in the NHTSA database. |
| `nhtsa_makes` | List vehicle makes for a model year that have recalls or complaints. |
| `nhtsa_models` | List vehicle models for a make and year that have recalls or complaints. |
| `nhtsa_decode_vin` | Decode a Vehicle Identification Number (VIN) to get specifications. |
| `nhtsa_safety_ratings` | Search NHTSA 5-star safety ratings (NCAP) by make, model, and year. |
| `nhtsa_safety_rating_detail` | Get detailed NHTSA 5-star safety ratings for a specific vehicle variant. |
| `nhtsa_car_seat_stations` | Find car seat inspection stations near a location. |

#### `nhtsa_recalls`

Search NHTSA vehicle recalls by make, model, and model year.
All three parameters are required by the NHTSA API.
Use nhtsa_models to find valid models for a make, or nhtsa_recall_detail for a specific campaign.

Example: make='tesla', model='model 3', model_year=2024

**Parameters:**
- `make` **(required)** — Vehicle make: 'toyota', 'ford', 'tesla', 'honda'
- `model` **(required)** — Vehicle model: 'camry', 'f-150', 'model 3', 'civic'
- `model_year` **(required)** — Model year: 2020, 2023, 2024

#### `nhtsa_recall_detail`

Get recall details by NHTSA campaign number.
Campaign numbers look like '23V838000' or '12V176000'.
Returns full recall information including affected vehicles, summary, consequence, and remedy.

**Parameters:**
- `campaign_number` **(required)** — NHTSA campaign number (e.g. '23V838000', '12V176000')

#### `nhtsa_complaints`

Search NHTSA vehicle complaints by make, model, and model year.
All three parameters are required by the NHTSA API.
Use nhtsa_models to find valid models for a make.

Example: make='tesla', model='model 3', model_year=2023

**Parameters:**
- `make` **(required)** — Vehicle make: 'toyota', 'ford', 'tesla'
- `model` **(required)** — Vehicle model: 'camry', 'f-150', 'model 3'
- `model_year` **(required)** — Model year

#### `nhtsa_complaint_detail`

Get a specific complaint by its ODI number.
ODI numbers are in complaint search results (e.g. 11184030).

**Parameters:**
- `odi_number` **(required)** — ODI complaint number (e.g. 11184030)

#### `nhtsa_model_years`

List model years that have recalls or complaints in the NHTSA database.
Use issue_type='r' for recalls (1949–present), 'c' for complaints.
Useful for discovering available data before querying.

**Parameters:**
- `issue_type` **(required)** — 'r' for recalls, 'c' for complaints

#### `nhtsa_makes`

List vehicle makes for a model year that have recalls or complaints.
Use issue_type='r' for recalls, 'c' for complaints.

Example: model_year=2024, issue_type='r'

**Parameters:**
- `model_year` **(required)** — Model year
- `issue_type` **(required)** — 'r' for recalls, 'c' for complaints

#### `nhtsa_models`

List vehicle models for a make and year that have recalls or complaints.
Or list all models for a make from the vPIC database (omit issue_type).

Example: make='tesla', model_year=2024, issue_type='r'

**Parameters:**
- `make` **(required)** — Vehicle make: 'toyota', 'ford', 'tesla'
- `model_year` — Model year (optional for vPIC lookup)
- `issue_type` — 'r' for recalls, 'c' for complaints. Omit for general model list.

#### `nhtsa_decode_vin`

Decode a Vehicle Identification Number (VIN) to get specifications.
Returns make, model, year, engine, body class, drive type, plant info.
VINs are 17 characters.

**Parameters:**
- `vin` **(required)** — Vehicle Identification Number (17 characters)

#### `nhtsa_safety_ratings`

Search NHTSA 5-star safety ratings (NCAP) by make, model, and year.
Returns vehicle variants with VehicleId. Use the VehicleId with nhtsa_safety_rating_detail.

Ratings: 5 stars = highest, 1 star = lowest. Data from 1990 to present.

**Parameters:**
- `make` **(required)** — Vehicle make: 'honda', 'toyota', 'ford'
- `model` **(required)** — Vehicle model: 'civic', 'camry', 'f-150'
- `model_year` **(required)** — Model year

#### `nhtsa_safety_rating_detail`

Get detailed NHTSA 5-star safety ratings for a specific vehicle variant.
Requires a VehicleId from nhtsa_safety_ratings search results.
Returns crash test ratings, rollover risk, and safety technology assessments.

**Parameters:**
- `vehicle_id` **(required)** — VehicleId from safety ratings search (e.g. 19950)

#### `nhtsa_car_seat_stations`

Find car seat inspection stations near a location.
Search by ZIP code, state, or geographic coordinates.
Car seat inspection stations help parents verify proper installation.

Example: state='CA', or zip='90210', or lat=30.18 + long=-96.39 + miles=50

**Parameters:**
- `zip` — ZIP code (e.g. '90210')
- `state` — Two-letter state code (e.g. 'CA', 'TX')
- `lat` — Latitude for geo search
- `long` — Longitude for geo search
- `miles` — Search radius in miles (default 25, used with lat/long)

---

## Agriculture

### USDA FoodData Central

Nutritional data for 300K+ foods: calories, macros, vitamins, minerals. Covers branded products, standard reference foods, and survey foods.

**Workflow:** fooddata_search to find foods → fooddata_detail for full nutrient breakdown

**Tips:** Data types: 'Foundation' (minimally processed), 'SR Legacy' (historical reference), 'Branded' (commercial products), 'Survey' (FNDDS dietary studies). Use Foundation or SR Legacy for generic foods, Branded for specific products.

| Tool | Description | · Auth: `DATA_GOV_API_KEY` |
|------|-------------|---|
| `fooddata_search` | Search the USDA FoodData Central database for foods by keyword. |
| `fooddata_detail` | Get complete nutritional details for a specific food by its FDC ID. |
| `fooddata_list` | Browse a paged list of foods from the USDA database. |

#### `fooddata_search`

Search the USDA FoodData Central database for foods by keyword.
Returns matching foods with basic nutrient info. Covers 300K+ foods including branded products.

Data types: 'Foundation' (generic whole foods), 'SR Legacy' (historical USDA reference), 'Branded' (commercial products with UPC), 'Survey' (FNDDS dietary studies).

**Parameters:**
- `query` **(required)** — Food search term (e.g. 'chicken breast', 'cheddar cheese', 'apple')
- `dataType` — Filter by data type
- `brandOwner` — Filter by brand owner for branded foods (e.g. 'Kraft', 'General Mills')
- `pageSize` — Results per page (default 25, max 200)
- `pageNumber` — Page number (1-based)
- `sortBy` — Sort field
- `sortOrder` — Sort direction

#### `fooddata_detail`

Get complete nutritional details for a specific food by its FDC ID.
Returns full nutrient breakdown: calories, protein, fat, carbs, vitamins, minerals, amino acids.
Use fooddata_search first to find FDC IDs.

**Parameters:**
- `fdcId` **(required)** — FoodData Central ID (get from fooddata_search results)

#### `fooddata_list`

Browse a paged list of foods from the USDA database.
Useful for exploring available foods by data type without a specific search term.

**Parameters:**
- `dataType` — Filter by data type
- `pageSize` — Results per page (default 25, max 200)
- `pageNumber` — Page number (1-based)
- `sortBy` — Sort field
- `sortOrder` — Sort direction

---

### USDA NASS QuickStats

Agricultural production, crop prices, farm income, livestock, Census of Agriculture data

**Workflow:** usda_crop_data or usda_livestock for specific commodities, usda_prices for price trends, usda_ag_query for custom queries

**Tips:** Commodities: CORN, SOYBEANS, WHEAT, COTTON, CATTLE, HOGS, MILK. States: IA, IL, TX, CA, NE

| Tool | Description | · Auth: `USDA_NASS_API_KEY` |
|------|-------------|---|
| `usda_crop_data` | Get crop production data — area planted, harvested, production, yield. |
| `usda_livestock` | Get livestock data — inventory, slaughter, production. |
| `usda_prices` | Get prices received by farmers for agricultural commodities. |
| `usda_ag_query` | Custom query to USDA NASS QuickStats — any combination of filters. |

#### `usda_crop_data`

Get crop production data — area planted, harvested, production, yield.
Commodities: CORN, SOYBEANS, WHEAT, COTTON, RICE, SORGHUM

**Parameters:**
- `commodity` **(required)** — Crop name: CORN, SOYBEANS, WHEAT, COTTON, RICE
- `state` — State code: IA, IL, CA, TX. Omit for national
- `year` — Year (omit for all recent years)
- `category` — PRODUCTION (default), AREA PLANTED, AREA HARVESTED, YIELD

#### `usda_livestock`

Get livestock data — inventory, slaughter, production.
Commodities: CATTLE, HOGS, CHICKENS, MILK, EGGS

**Parameters:**
- `commodity` **(required)** — CATTLE, HOGS, CHICKENS, MILK, EGGS
- `state` — State code. Omit for national
- `year` — Year
- `category` — INVENTORY, PRODUCTION, SALES

#### `usda_prices`

Get prices received by farmers for agricultural commodities.
Works for any commodity: CORN, WHEAT, SOYBEANS, CATTLE, MILK, etc.

**Parameters:**
- `commodity` **(required)** — Any commodity: CORN, WHEAT, SOYBEANS, CATTLE, HOGS, MILK
- `state` — State code. Omit for national average
- `year` — Year

#### `usda_ag_query`

Custom query to USDA NASS QuickStats — any combination of filters.
Max 50,000 records. Use usda_ag_count first for large queries.

**Parameters:**
- `commodity_desc` — Commodity: CORN, WHEAT, CATTLE, etc.
- `source_desc` — SURVEY or CENSUS
- `sector_desc` — CROPS, ANIMALS & PRODUCTS, ECONOMICS, ENVIRONMENTAL
- `statisticcat_desc` — AREA PLANTED, PRODUCTION, YIELD, PRICE RECEIVED, INVENTORY
- `state_alpha` — State code: IA, IL, CA or US for national
- `year` — Year
- `agg_level_desc` — NATIONAL, STATE, COUNTY
- `freq_desc` — ANNUAL, MONTHLY, WEEKLY

---

## Justice

### CourtListener (Case Law)

Search and retrieve federal and state court opinions from CourtListener's database of millions of case law documents. Includes full opinion text, court, date filed, and citation information.

**Workflow:** courtlistener_search to find opinions by keyword, court, or date range → courtlistener_opinion to get the full opinion text by ID.

**Tips:** Court codes: 'scotus' (Supreme Court), 'ca1'-'ca11' (Circuit Courts), 'cadc' (DC Circuit), 'cafc' (Federal Circuit). Dates use YYYY-MM-DD format. Search returns opinion metadata; use courtlistener_opinion for full text. Page size max 20.

| Tool | Description | · Auth: `COURTLISTENER_API_KEY` |
|------|-------------|---|
| `courtlistener_search` | Search case law opinions across federal and state courts. |
| `courtlistener_opinion` | Get the full text of a court opinion by its CourtListener ID. |

#### `courtlistener_search`

Search case law opinions across federal and state courts.
Find opinions by keyword, court, or date range.
Court codes: 'scotus' (Supreme Court), 'ca1'-'ca11' (Circuit Courts), 'cadc' (DC Circuit), 'cafc' (Federal Circuit).
Returns opinion metadata including case name, court, date filed, and citation.

**Parameters:**
- `query` — Search keywords: 'first amendment', 'qualified immunity', 'antitrust'
- `court` — Court code: 'scotus', 'ca1', 'ca9', 'cadc', 'cafc'
- `filed_after` — Filed after date (YYYY-MM-DD)
- `filed_before` — Filed before date (YYYY-MM-DD)
- `limit` — Results per page (default 20, max 20)

#### `courtlistener_opinion`

Get the full text of a court opinion by its CourtListener ID.
Returns the complete opinion text, case name, court, date filed, and citations.

**Parameters:**
- `id` **(required)** — CourtListener opinion ID (from search results)

---

### DOJ News

Department of Justice press releases (262K+) and blog entries (3,200+). Search by title keyword, date, and DOJ component. Covers enforcement actions, indictments, settlements, policy announcements across all DOJ divisions including FBI, DEA, ATF, USAO, and Civil Rights.

**Workflow:** doj_press_releases to search/browse press releases → doj_press_release_detail for full text → doj_blog_entries to search blog posts → doj_blog_detail for full text.

**Tips:** Sort: 'date' or 'created'. Direction: 'DESC' (newest first), 'ASC' (oldest). Max 50 results per page. Filter by title keyword: title='cybercrime'. Date is a Unix timestamp in the response — the tool auto-converts to readable dates. Components include: FBI, DEA, ATF, Civil Rights Division, Antitrust Division, USAO (U.S. Attorneys). Topics include: Drug Trafficking, Cybercrime, National Security, Civil Rights, Financial Fraud, Public Corruption.

| Tool | Description | · No auth required |
|------|-------------|---|
| `doj_press_releases` | Search DOJ press releases (262K+ records covering all DOJ divisions). |
| `doj_press_release_detail` | Get the full text of a specific DOJ press release by UUID. |
| `doj_blog_entries` | Search DOJ Office of Public Affairs blog entries (3,200+ records). |
| `doj_blog_detail` | Get the full text of a specific DOJ blog entry by UUID. |

#### `doj_press_releases`

Search DOJ press releases (262K+ records covering all DOJ divisions).
Includes enforcement actions, indictments, settlements, and policy announcements.
Filter by title keyword and sort by date.
Components: FBI, DEA, ATF, Civil Rights Division, Antitrust, USAO, and more.
Topics: Drug Trafficking, Cybercrime, National Security, Civil Rights, Financial Fraud, etc.

**Parameters:**
- `title` — Filter by title keyword: 'cybercrime', 'antitrust', 'fentanyl', 'civil rights'
- `sort` — Sort by: 'date' (press release date), 'created' (when added)
- `direction` — Sort direction: 'DESC' (newest first, default), 'ASC' (oldest first)
- `pagesize` — Results per page (default 20, max 50)
- `page` — Page number (zero-indexed). Use with pagesize for pagination.

#### `doj_press_release_detail`

Get the full text of a specific DOJ press release by UUID.
Returns the complete body, component, topic, date, and URL.

**Parameters:**
- `uuid` **(required)** — UUID of the press release (from search results)

#### `doj_blog_entries`

Search DOJ Office of Public Affairs blog entries (3,200+ records).
Blog entries often provide more context and analysis than press releases.
Covers policy discussions, division activities, and enforcement context.

**Parameters:**
- `sort` — Sort by
- `direction` — Sort direction: 'DESC' (newest first), 'ASC'
- `pagesize` — Results per page (default 20, max 50)
- `page` — Page number (zero-indexed)

#### `doj_blog_detail`

Get the full text of a specific DOJ blog entry by UUID.
Returns the complete body, component, topic, date, and URL.

**Parameters:**
- `uuid` **(required)** — UUID of the blog entry (from search results)

---

### FBI Crime Data Explorer

National/state/agency crime statistics, arrests, hate crimes, law enforcement employees, expanded homicide data, and use of force from the FBI CDE API

**Workflow:** fbi_agencies → fbi_crime_summarized or fbi_arrest_data → fbi_hate_crime for detail

**Tips:** State codes: two-letter abbreviations (CA, TX, NY). Data typically available up to 1-2 years ago. Summarized offense codes: V (violent), P (property), HOM, RPE, ROB, ASS, BUR, LAR, MVT, ARS. Arrest offense codes are numeric: 'all', '11' (murder), '20' (rape), '30' (robbery), '50' (assault), '150' (drug abuse).

| Tool | Description | · Auth: `DATA_GOV_API_KEY` |
|------|-------------|---|
| `fbi_agencies` | List law enforcement agencies in a U.S. state from the FBI CDE. Returns agencies grouped by county with ORI codes, coordinates, and NIBRS participation dates. Use ORI codes from this tool to query agency-level data in other FBI tools. |
| `fbi_crime_summarized` | Get summarized UCR crime data from the FBI at national, state, or agency level. Covers 10 offense categories: V (violent crime), P (property crime), HOM (homicide), RPE (rape), ROB (robbery), ASS (aggravated assault), BUR (burglary), LAR (larceny/theft), MVT (motor vehicle theft), ARS (arson). Returns year-by-year data with counts and rates. |
| `fbi_arrest_data` | Get arrest statistics from the FBI at national, state, or agency level. Offense codes are numeric: 'all' (all offenses), '11' (murder), '20' (rape), '30' (robbery), '50' (aggravated assault), '150' (drug abuse), and 40+ more. Returns counts or totals broken down by year, age, sex, race, ethnicity. |
| `fbi_expanded_homicide` | Get expanded homicide (Supplementary Homicide Report) data from the FBI. Includes victim/offender demographics, weapons used, and circumstances. Available at national, state, or agency level. |
| `fbi_hate_crime` | Get hate crime data from the FBI at national, state, or agency level. Returns incidents broken down by bias category (race, religion, sexual orientation, etc.), offense type, victim type, offender demographics, and location type. Optionally filter by bias code (e.g., '12'=Anti-Black, '14'=Anti-Jewish, '22'=Anti-Islamic, '41'=Anti-Gay). |
| `fbi_law_enforcement_employees` | Get law enforcement employee data (sworn officers, civilian employees) at national, state, or agency level. Shows staffing levels over time. |
| `fbi_lesdc` | Get Law Enforcement Suicide Data Collection (LESDC) statistics. Chart types: race, demographics, manner, location, employment, occupation, military, totals, duty, exp, experience, suffered, prior, investigation, wellness. |
| `fbi_use_of_force` | Get Use of Force data from the FBI. Covers incidents where law enforcement use of force resulted in death, serious injury, or firearm discharge. Available at federal (all federal agencies) or national (all participating agencies) level. Use scope='federal' for federal agencies, 'national' for all agencies participation data. |
| `fbi_nibrs` | Get NIBRS (National Incident-Based Reporting System) data from the FBI. More detailed than summarized UCR data — includes victim/offender demographics, relationships, weapons, location, and time of day for 71 offense types. Offense codes use NIBRS format: '13A' (aggravated assault), '09A' (murder), '23H' (all other larceny), '35A' (drug violations), '220' (burglary), etc. |
| `fbi_expanded_property` | Get expanded property crime details from the FBI (Supplemental Return / Return A data). Provides additional breakdowns beyond summarized counts: value of stolen/recovered property, type of property, premises involved. Available for burglary (NB), larceny (NL), motor vehicle theft (NMVT), and robbery (NROB). |

#### `fbi_agencies`

List law enforcement agencies in a U.S. state from the FBI CDE. Returns agencies grouped by county with ORI codes, coordinates, and NIBRS participation dates. Use ORI codes from this tool to query agency-level data in other FBI tools.

**Parameters:**
- `state` **(required)** — Two-letter state abbreviation (e.g., 'CA', 'TX', 'WA')

#### `fbi_crime_summarized`

Get summarized UCR crime data from the FBI at national, state, or agency level. Covers 10 offense categories: V (violent crime), P (property crime), HOM (homicide), RPE (rape), ROB (robbery), ASS (aggravated assault), BUR (burglary), LAR (larceny/theft), MVT (motor vehicle theft), ARS (arson). Returns year-by-year data with counts and rates.

**Parameters:**
- `offense` **(required)** — UCR offense code: 'V' (Violent Crime), 'P' (Property Crime), 'HOM' (Homicide), 'RPE' (Rape), 'ROB' (Robbery), 'ASS' (Aggravated Assault), 'BUR' (Burglary), 'LAR' (Larceny/Theft), 'MVT' (Motor Vehicle Theft), 'ARS' (Arson)
- `state` — Two-letter state abbreviation for state-level data
- `ori` — Agency ORI code for agency-level data (e.g., 'WASPD0000')
- `from_year` — Start year (default: 5 years ago)
- `to_year` — End year (default: current year)

#### `fbi_arrest_data`

Get arrest statistics from the FBI at national, state, or agency level. Offense codes are numeric: 'all' (all offenses), '11' (murder), '20' (rape), '30' (robbery), '50' (aggravated assault), '150' (drug abuse), and 40+ more. Returns counts or totals broken down by year, age, sex, race, ethnicity.

**Parameters:**
- `offense` **(required)** — Arrest offense code: '11' (Murder), '12' (Simple Assault), '20' (Rape), '23' (Larceny-Theft), '30' (Robbery), '50' (Aggravated Assault), ... (48 total)
- `state` — Two-letter state abbreviation for state-level data
- `ori` — Agency ORI code for agency-level data
- `type` — Data type: 'counts' (default) or 'totals'
- `from_year` — Start year (default: 5 years ago)
- `to_year` — End year (default: current year)

#### `fbi_expanded_homicide`

Get expanded homicide (Supplementary Homicide Report) data from the FBI. Includes victim/offender demographics, weapons used, and circumstances. Available at national, state, or agency level.

**Parameters:**
- `state` — Two-letter state abbreviation for state-level data
- `ori` — Agency ORI code for agency-level data
- `type` — Data type (default: counts)
- `from_year` — Start year
- `to_year` — End year

#### `fbi_hate_crime`

Get hate crime data from the FBI at national, state, or agency level. Returns incidents broken down by bias category (race, religion, sexual orientation, etc.), offense type, victim type, offender demographics, and location type. Optionally filter by bias code (e.g., '12'=Anti-Black, '14'=Anti-Jewish, '22'=Anti-Islamic, '41'=Anti-Gay).

**Parameters:**
- `state` — Two-letter state abbreviation for state-level data
- `ori` — Agency ORI code for agency-level data
- `bias` — Bias code filter: '11' (Anti-White), '12' (Anti-Black or African American), '13' (Anti-American Indian or Alaska Native), '14' (Anti-Asian), '15' (Anti-Multiple Races, Group), '16' (Anti-Native Hawaiian or Other Pacific Islander), ... (35 total)
- `type` — Data type
- `from_year` — Start year
- `to_year` — End year

#### `fbi_law_enforcement_employees`

Get law enforcement employee data (sworn officers, civilian employees) at national, state, or agency level. Shows staffing levels over time.

**Parameters:**
- `state` — Two-letter state abbreviation for state-level data
- `ori` — Agency ORI code (requires state param too)
- `from_year` — Start year (default: 5 years ago)
- `to_year` — End year (default: current year)

#### `fbi_lesdc`

Get Law Enforcement Suicide Data Collection (LESDC) statistics. Chart types: race, demographics, manner, location, employment, occupation, military, totals, duty, exp, experience, suffered, prior, investigation, wellness.

**Parameters:**
- `chart_type` **(required)** — LESDC chart type
- `year` **(required)** — Year to query

#### `fbi_use_of_force`

Get Use of Force data from the FBI. Covers incidents where law enforcement use of force resulted in death, serious injury, or firearm discharge. Available at federal (all federal agencies) or national (all participating agencies) level. Use scope='federal' for federal agencies, 'national' for all agencies participation data.

**Parameters:**
- `scope` **(required)** — 'federal' = federal UoF by year, 'national' = national UoF participation by year
- `year` **(required)** — Year to query (2019-present)
- `quarter` — Quarter (default: 4 = full year cumulative)

#### `fbi_nibrs`

Get NIBRS (National Incident-Based Reporting System) data from the FBI. More detailed than summarized UCR data — includes victim/offender demographics, relationships, weapons, location, and time of day for 71 offense types. Offense codes use NIBRS format: '13A' (aggravated assault), '09A' (murder), '23H' (all other larceny), '35A' (drug violations), '220' (burglary), etc.

**Parameters:**
- `offense` **(required)** — NIBRS offense code: '100' (Kidnapping/Abduction), '101' (Treason), '103' (Espionage), '120' (Robbery), '200' (Arson), '210' (Extortion/Blackmail), ... (72 total)
- `state` — Two-letter state abbreviation for state-level data
- `ori` — Agency ORI code for agency-level data
- `type` — Data type (default: counts)
- `from_year` — Start year
- `to_year` — End year

#### `fbi_expanded_property`

Get expanded property crime details from the FBI (Supplemental Return / Return A data). Provides additional breakdowns beyond summarized counts: value of stolen/recovered property, type of property, premises involved. Available for burglary (NB), larceny (NL), motor vehicle theft (NMVT), and robbery (NROB).

**Parameters:**
- `offense` **(required)** — Offense code: 'NB' (Burglary), 'NL' (Larceny), 'NMVT' (Motor Vehicle Theft), 'NROB' (Robbery)
- `state` — Two-letter state abbreviation for state-level data
- `ori` — Agency ORI code for agency-level data
- `type` — Data type (default: counts)
- `from_year` — Start year
- `to_year` — End year

---

## Transportation

### BTS (Bureau of Transportation Statistics)

Monthly Transportation Statistics (50+ indicators): airline traffic & on-time %, transit ridership, rail freight, truck tonnage, fuel prices, vehicle sales, safety fatalities, Transportation Services Index, and border crossing data at U.S. ports of entry. No API key required.

**Workflow:** Use bts_transport_stats for national monthly transportation indicators (airlines, transit, rail, fuel, safety) → bts_border_crossings for port-of-entry volumes (trucks, vehicles, pedestrians).

**Tips:** Transport stats are monthly time series — use limit=24 for 2 years of trend data. Border crossing states use full names ('Texas', 'California'). Measures: 'Trucks', 'Personal Vehicles', 'Pedestrians'. Borders: 'US-Mexico Border', 'US-Canada Border'.

| Tool | Description | · No auth required |
|------|-------------|---|
| `bts_transport_stats` | Get Monthly Transportation Statistics — 50+ national indicators including: |
| `bts_border_crossings` | Get border crossing data at U.S. ports of entry: trucks, personal vehicles, pedestrians, train passengers, containers. |

#### `bts_transport_stats`

Get Monthly Transportation Statistics — 50+ national indicators including:
• Airline passenger traffic and on-time performance %
• Transit ridership, highway vehicle miles
• Rail freight, Amtrak ridership and on-time %
• Truck tonnage, fuel prices, vehicle sales
• Transportation Services Index (freight, passenger, combined)
• Border crossing summaries (trucks, persons)
• Safety fatalities (air, rail)
Monthly data going back to 1947 for some series.

**Parameters:**
- `start_date` — Start date: '2020-01-01'
- `end_date` — End date: '2024-12-31'
- `limit` — Months of data (default 24 = 2 years)

#### `bts_border_crossings`

Get border crossing data at U.S. ports of entry: trucks, personal vehicles, pedestrians, train passengers, containers.
Covers U.S.-Mexico and U.S.-Canada borders. Monthly data by port, state, and measure type.

**Parameters:**
- `state` — State full name: 'Texas', 'California', 'New York'
- `border` — Border
- `port_name` — Port of entry name: 'El Paso', 'San Ysidro', 'Detroit'
- `measure` — Measure type: 'Trucks' (Commercial trucks), 'Personal Vehicles' (Personal vehicles (cars)), 'Pedestrians' (Foot traffic), 'Train Passengers' (Rail passengers), 'Rail Containers Loaded' (Rail freight containers (loaded)), 'Rail Containers Empty' (Rail freight containers (empty)), 'Buses' (Bus crossings)
- `limit` — Max results (default 20)

---

### FAA Aviation Weather

Aviation weather data from the FAA Aviation Weather Center — METARs (current observations), TAFs (terminal forecasts), SIGMETs (significant weather advisories), and PIREPs (pilot reports). Essential for aviation safety and flight planning.

**Workflow:** faa_metar for current airport weather → faa_taf for forecasts → faa_sigmet for hazardous weather areas → faa_pirep for pilot observations.

**Tips:** Station IDs are 4-letter ICAO codes (e.g. KJFK, KLAX, EGLL). Multiple stations can be comma-separated. METAR and TAF are station-specific; SIGMETs and PIREPs cover broader areas. All data is returned in JSON format.

| Tool | Description | · No auth required |
|------|-------------|---|
| `faa_metar` | Get METAR weather observations for airports. |
| `faa_taf` | Get TAF (Terminal Aerodrome Forecast) for airports. |
| `faa_sigmet` | Get active SIGMETs (Significant Meteorological Information). |
| `faa_pirep` | Get pilot reports (PIREPs). |

#### `faa_metar`

Get METAR weather observations for airports.
Returns current conditions: temperature, dewpoint, wind, visibility, ceiling, flight category.
Station IDs are ICAO codes (e.g. KJFK, KLAX, KORD). Multiple stations can be comma-separated.

**Parameters:**
- `ids` **(required)** — ICAO station ID(s), comma-separated (e.g. 'KJFK', 'KJFK,KLAX,KORD')
- `hours` — Hours of observations to retrieve (default: most recent)

#### `faa_taf`

Get TAF (Terminal Aerodrome Forecast) for airports.
Returns forecast periods with expected conditions, wind, visibility, and clouds.
Station IDs are ICAO codes. Multiple stations can be comma-separated.

**Parameters:**
- `ids` **(required)** — ICAO station ID(s), comma-separated (e.g. 'KJFK', 'KJFK,KLAX')

#### `faa_sigmet`

Get active SIGMETs (Significant Meteorological Information).
Returns hazardous weather advisories including turbulence, icing, convection, and volcanic ash.
Covers all active SIGMETs across the national airspace.

#### `faa_pirep`

Get pilot reports (PIREPs).
Returns pilot-reported weather conditions including turbulence, icing, and weather phenomena.
Optionally filter by recency (hours).

**Parameters:**
- `hours` — Hours of PIREPs to retrieve (default: recent)

---

### FMCSA (Federal Motor Carrier Safety Administration)

Search and retrieve motor carrier safety data including carrier profiles, safety ratings, inspections, and crash data for trucking and bus companies registered with the DOT.

**Workflow:** Use fmcsa_carrier_search to find carriers by name, DOT number, or state → fmcsa_carrier_detail to get the full safety profile for a specific carrier.

**Tips:** Search by company name for partial matches. Use 2-letter state codes (e.g. 'TX', 'CA'). DOT numbers are numeric identifiers assigned to each carrier.

| Tool | Description | · Auth: `FMCSA_API_KEY` |
|------|-------------|---|
| `fmcsa_carrier_search` | Search motor carriers registered with FMCSA by company name, DOT number, or state. |
| `fmcsa_carrier_detail` | Get the full safety profile for a motor carrier by DOT number. |

#### `fmcsa_carrier_search`

Search motor carriers registered with FMCSA by company name, DOT number, or state.
Returns carrier profiles including legal name, DBA, state, driver count, power units, and safety rating.
Use to find trucking companies, bus companies, and other motor carriers.

**Parameters:**
- `name` — Carrier legal name or partial name (e.g. 'Swift', 'Werner')
- `state` — 2-letter state code (e.g. 'TX', 'CA')
- `dot_number` — DOT number for a specific carrier

#### `fmcsa_carrier_detail`

Get the full safety profile for a motor carrier by DOT number.
Returns detailed information including safety rating, inspection results, crash data, driver counts, and operational details.

**Parameters:**
- `dot_number` **(required)** — DOT number of the carrier

---

### NTSB (National Transportation Safety Board)

National Transportation Safety Board — search accident and incident investigation data across aviation, highway, marine, rail, and pipeline modes. Uses the public CAROL query system. No API key required.

**Workflow:** ntsb_aviation_accidents for aviation-specific searches → ntsb_query for any transportation mode (highway, marine, rail, pipeline)

**Tips:** Aviation queries work best with location, aircraft type, or date keywords. Modes: Aviation, Highway, Marine, Rail, Pipeline. Use offset and limit for pagination through large result sets.

| Tool | Description | · No auth required |
|------|-------------|---|
| `ntsb_aviation_accidents` | Search NTSB aviation accident investigation data. |
| `ntsb_query` | Query any NTSB investigation dataset by transportation mode. |

#### `ntsb_aviation_accidents`

Search NTSB aviation accident investigation data.
Find accident reports by aircraft type, location, date, or other keywords.
Returns event details, injuries, aircraft info, probable cause, and report status.

Example: query='Boeing 737 MAX', query='Cessna engine failure', query='helicopter New York'

**Parameters:**
- `query` **(required)** — Search text (e.g. 'Boeing 737', 'Cessna engine failure', 'helicopter crash')
- `limit` — Max results (default 20)
- `offset` — Offset for pagination (default 0)

#### `ntsb_query`

Query any NTSB investigation dataset by transportation mode.
Modes: Aviation, Highway, Marine, Rail, Pipeline.
Returns investigation records with event details, injuries, and probable cause.

Example: mode='Highway', query='truck rollover'; mode='Marine', query='ferry collision'

**Parameters:**
- `mode` **(required)** — Transportation mode
- `query` **(required)** — Search text for the investigation
- `limit` — Max results (default 20)
- `offset` — Offset for pagination (default 0)

---

## State & Local

### BART (Bay Area Rapid Transit)

Real-time transit data for San Francisco Bay Area's BART system: departure estimates by station, station listings, and service advisories. Free demo key available (MW9S-E7SL-26DU-VV8V).

**Workflow:** Use bart_stations to list all stations and get abbreviations → bart_departures for real-time departure estimates at a station → bart_advisories for service alerts.

**Tips:** Station abbreviations are 4 letters (e.g. 'EMBR' for Embarcadero, '12TH' for 12th St Oakland). Use 'ALL' for all stations. Demo key MW9S-E7SL-26DU-VV8V works for testing. Response is in root.station array.

| Tool | Description | · Auth: `BART_API_KEY` |
|------|-------------|---|
| `bart_departures` | Get real-time departure estimates for a BART (San Francisco Bay Area) station. |
| `bart_stations` | List all BART (San Francisco Bay Area) stations. |
| `bart_advisories` | Get service advisories for BART (San Francisco Bay Area). |

#### `bart_departures`

Get real-time departure estimates for a BART (San Francisco Bay Area) station.
Returns estimated departure times, platform, direction, train length, and color.
Station abbreviations are 4 letters (e.g. 'EMBR' for Embarcadero, '12TH' for 12th St Oakland, 'ALL' for all stations).

**Parameters:**
- `station` **(required)** — Station abbreviation (e.g. 'EMBR', '12TH', 'POWL', 'MONT', or 'ALL' for all stations)

#### `bart_stations`

List all BART (San Francisco Bay Area) stations.
Returns station names, abbreviations, addresses, and coordinates.

#### `bart_advisories`

Get service advisories for BART (San Francisco Bay Area).
Returns current service alerts, delays, and planned disruptions.

---

### CAL FIRE Incidents

Active and historical California wildfire incidents with location, acreage, containment, and GeoJSON boundaries

**Workflow:** calfire_incidents → filter by active/historical, optionally by year

**Tips:** Returns GeoJSON feature collections. Active fires update frequently during fire season. Historical data available by year. Includes acreage burned, containment percentage, structures damaged/destroyed, injuries, and fatalities.

| Tool | Description | · No auth required |
|------|-------------|---|
| `calfire_incidents` | Get California wildfire incidents from CAL FIRE — active fires or historical incidents by year. |

#### `calfire_incidents`

Get California wildfire incidents from CAL FIRE — active fires or historical incidents by year.

Returns incident details including name, location, county, acres burned, containment %, structures damaged/destroyed, injuries, fatalities, and GeoJSON boundaries.

Active fires update frequently during fire season (May-November).

**Parameters:**
- `active` — true for active fires (default), false for historical
- `year` — Year for historical data (e.g., 2023). Only used when active=false.

---

### California Data Exchange Center (CDEC)

Real-time California water data — reservoir levels, river flows, snow surveys, and environmental sensors

**Workflow:** cdec_stations (find stations) → cdec_sensor_data (get readings for a station + sensor)

**Tips:** CDEC monitors California's water supply infrastructure. Key sensor numbers: 15=storage (reservoirs), 6=reservoir elevation, 20=flow, 3=snow water content, 30=temperature. Use station IDs like SHA (Shasta), ORO (Oroville), FOL (Folsom).

| Tool | Description | · No auth required |
|------|-------------|---|
| `cdec_sensor_data` | Get real-time sensor data from California Data Exchange Center (CDEC) monitoring stations. |
| `cdec_stations` | Get metadata for CDEC monitoring stations — location, operator, river basin, and available sensors. Use this to find station IDs before querying sensor data. |

#### `cdec_sensor_data`

Get real-time sensor data from California Data Exchange Center (CDEC) monitoring stations.

Common sensor numbers:
- 15: Storage (acre-feet, for reservoirs)
- 6: Reservoir elevation (feet)
- 20: Flow (CFS — cubic feet per second)
- 3: Snow water content (inches)
- 30: Temperature (degrees F)
- 2: Precipitation (accumulated inches)

Common station IDs: SHA (Shasta), ORO (Oroville), FOL (Folsom), DNP (Don Pedro), NML (New Melones), BUL (Lake Bullards Bar)

**Parameters:**
- `station_id` **(required)** — Station ID (e.g., 'SHA' for Shasta Dam, 'ORO' for Oroville)
- `sensor_num` **(required)** — Sensor number (e.g., 15=storage, 6=elevation, 20=flow, 3=snow)
- `dur_code` — Duration code: 'E' (event/real-time, default), 'H' (hourly), 'D' (daily), 'M' (monthly)
- `start` — Start date (YYYY-MM-DD). Default: 7 days ago
- `end` — End date (YYYY-MM-DD). Default: today

#### `cdec_stations`

Get metadata for CDEC monitoring stations — location, operator, river basin, and available sensors. Use this to find station IDs before querying sensor data.

**Parameters:**
- `station_id` **(required)** — Station ID to look up (e.g., 'SHA', 'ORO', 'FOL')

---

### Colorado Division of Water Resources

Colorado water data — telemetry stations, real-time streamflow/reservoir readings, and water rights/structures

**Workflow:** co_water_stations (find stations) → co_water_readings (get data) | co_water_rights (search water rights)

**Tips:** API key is optional (1000 calls/day without). Parameters: DISCHRG (discharge/flow), GAGE_HT (gage height), AIRTEMP (air temp), STORAGE (reservoir storage). Water rights data includes adjudication dates, appropriation amounts, and water sources.

| Tool | Description | · Auth: `CO_WATER_API_KEY` |
|------|-------------|---|
| `co_water_stations` | Search Colorado telemetry stations — find monitoring stations by county, water district, or division. |
| `co_water_readings` | Get real-time Colorado streamflow, reservoir, and weather telemetry readings. |
| `co_water_rights` | Search Colorado water rights and structures — adjudicated water rights, diversions, wells, and reservoirs with appropriation dates and decreed amounts. |

#### `co_water_stations`

Search Colorado telemetry stations — find monitoring stations by county, water district, or division.

Returns station abbreviations needed for co_water_readings, plus location, parameter type, and station metadata.

**Parameters:**
- `county` — County name (e.g., 'Boulder', 'Denver', 'El Paso')
- `water_district` — Water district number
- `division` — Water division number (1-7)
- `limit` — Max results (default: 100)

#### `co_water_readings`

Get real-time Colorado streamflow, reservoir, and weather telemetry readings.

Parameters (measurement types):
- DISCHRG: Discharge/streamflow (CFS)
- GAGE_HT: Gage height (feet)
- AIRTEMP: Air temperature (degrees F)
- STORAGE: Reservoir storage (acre-feet)
- PRECIP: Precipitation (inches)
- WIND_SPEED: Wind speed (mph)

Use co_water_stations first to find station abbreviations.

**Parameters:**
- `abbrev` **(required)** — Station abbreviation (from co_water_stations)
- `parameter` — Measurement parameter: 'DISCHRG' (default), 'GAGE_HT', 'AIRTEMP', 'STORAGE', 'PRECIP', 'WIND_SPEED'
- `start` — Start date (MM/DD/YYYY or YYYY-MM-DD)
- `end` — End date (MM/DD/YYYY or YYYY-MM-DD)
- `limit` — Max rows to return (default: 500)

#### `co_water_rights`

Search Colorado water rights and structures — adjudicated water rights, diversions, wells, and reservoirs with appropriation dates and decreed amounts.

Filter by county and/or water source name.

**Parameters:**
- `county` — County name (e.g., 'Boulder', 'Weld')
- `water_source` — Water source name (e.g., 'South Platte River', 'Clear Creek')
- `water_district` — Water district number
- `limit` — Max results (default: 100)

---

### CTA (Chicago Transit Authority)

Real-time transit data for Chicago's CTA system: L train arrival predictions by station and bus arrival predictions by stop. Requires free API key.

**Workflow:** Use cta_train_arrivals for L train predictions at a station → cta_bus_arrivals for bus predictions at a stop.

**Tips:** Train stations use numeric mapid (e.g. 40380 for Clark/Lake). Bus stops use numeric stpid. Train response is in ctatt.eta array. The bus tracker uses a different base URL than the train tracker.

| Tool | Description | · Auth: `CTA_API_KEY` |
|------|-------------|---|
| `cta_train_arrivals` | Get L train arrival predictions for a CTA (Chicago) station. |
| `cta_bus_arrivals` | Get bus arrival predictions for a CTA (Chicago) bus stop. |

#### `cta_train_arrivals`

Get L train arrival predictions for a CTA (Chicago) station.
Returns predicted arrival times, destination, run number, direction, and delay status.
Station IDs are numeric (e.g. 40380 for Clark/Lake, 40530 for Washington/Wabash).

**Parameters:**
- `station_id` **(required)** — Station map ID (numeric, e.g. '40380' for Clark/Lake, '40530' for Washington/Wabash)

#### `cta_bus_arrivals`

Get bus arrival predictions for a CTA (Chicago) bus stop.
Returns predicted arrival times, route, direction, destination, and delay status.
Stop IDs are numeric (find them on CTA bus stop signs or the CTA website).

**Parameters:**
- `stop_id` **(required)** — Bus stop ID (numeric, e.g. '1836')

---

### LA Metro (Los Angeles County Metropolitan Transportation Authority)

Real-time transit data for Los Angeles Metro: live bus and rail vehicle positions, route listings, and stop information. No API key required.

**Workflow:** Use la_metro_routes to list all routes → la_metro_stops to find stops on a route → la_metro_vehicles for real-time bus/rail positions.

**Tips:** Route codes are numeric (e.g. 720 for Wilshire Rapid). Vehicle positions include lat/lon coordinates. All endpoints return JSON arrays or objects directly.

| Tool | Description | · No auth required |
|------|-------------|---|
| `la_metro_vehicles` | Get real-time bus and rail vehicle positions for LA Metro (Los Angeles). |
| `la_metro_routes` | List all LA Metro (Los Angeles) transit routes. |
| `la_metro_stops` | List stops for an LA Metro (Los Angeles) route. |

#### `la_metro_vehicles`

Get real-time bus and rail vehicle positions for LA Metro (Los Angeles).
Returns GPS coordinates, route, trip, stop, and status for all active vehicles.

#### `la_metro_routes`

List all LA Metro (Los Angeles) transit routes.
Returns route IDs, names, types, and colors for bus and rail lines.

#### `la_metro_stops`

List stops for an LA Metro (Los Angeles) route.
Returns stop IDs, names, and coordinates. Optionally filter by route code.

**Parameters:**
- `route` — Route code to filter stops (e.g. '720' for Wilshire Rapid)

---

### MARTA (Metropolitan Atlanta Rapid Transit)

Real-time MARTA rail arrival data for Atlanta, GA. Get train arrival predictions with station, line, direction, and GPS coordinates.

**Workflow:** Use marta_train_arrivals to get real-time rail arrival predictions across the entire MARTA rail system.

**Tips:** Returns data for all stations at once. Filter client-side by STATION, LINE (RED, GOLD, BLUE, GREEN), or DIRECTION (N, S, E, W). WAITING_SECONDS shows time until arrival.

| Tool | Description | · Auth: `MARTA_API_KEY` |
|------|-------------|---|
| `marta_train_arrivals` | Get real-time MARTA rail arrival predictions for all stations in Atlanta, GA. |

#### `marta_train_arrivals`

Get real-time MARTA rail arrival predictions for all stations in Atlanta, GA.
Returns train destination, direction (N/S/E/W), line (RED, GOLD, BLUE, GREEN),
station name, next arrival time, wait seconds, and GPS coordinates.
Data covers all active trains across the entire MARTA rail network.

---

### MBTA (Massachusetts Bay Transportation Authority)

Real-time transit data for Boston's MBTA system: arrival predictions, live vehicle positions, service alerts, and route information for subway, bus, commuter rail, and ferry. Requires free API key.

**Workflow:** Use mbta_routes to find route IDs → mbta_predictions for real-time arrivals at a stop → mbta_vehicles for live vehicle positions → mbta_alerts for service disruptions.

**Tips:** Route types: 0=Light Rail (Green Line), 1=Heavy Rail (Red/Orange/Blue), 2=Commuter Rail, 3=Bus, 4=Ferry. Stop IDs are like 'place-north' (North Station). Response is JSON:API format with data[] and included[] arrays.

| Tool | Description | · Auth: `MBTA_API_KEY` |
|------|-------------|---|
| `mbta_predictions` | Get real-time arrival/departure predictions for MBTA (Boston) transit. |
| `mbta_vehicles` | Get live vehicle positions for MBTA (Boston) transit. |
| `mbta_alerts` | Get service alerts for MBTA (Boston) transit. |
| `mbta_routes` | List MBTA (Boston) transit routes. |

#### `mbta_predictions`

Get real-time arrival/departure predictions for MBTA (Boston) transit.
Filter by stop ID and/or route ID. Returns predicted arrival and departure times.
Covers subway (Red, Orange, Blue, Green Lines), commuter rail, bus, and ferry.

**Parameters:**
- `stop` — Stop ID (e.g. 'place-north' for North Station, 'place-sstat' for South Station)
- `route` — Route ID (e.g. 'Red', 'Orange', 'Green-B', 'CR-Fitchburg', '1' for bus)
- `limit` — Max predictions to return (default 10)

#### `mbta_vehicles`

Get live vehicle positions for MBTA (Boston) transit.
Returns GPS coordinates, speed, bearing, and current status for active vehicles.
Optionally filter by route.

**Parameters:**
- `route` — Route ID to filter (e.g. 'Red', 'Green-B', 'CR-Worcester')
- `limit` — Max vehicles to return (default 20)

#### `mbta_alerts`

Get service alerts for MBTA (Boston) transit.
Returns active alerts including delays, suspensions, detours, and planned service changes.
Optionally filter by route.

**Parameters:**
- `route` — Route ID to filter (e.g. 'Red', 'Orange', 'CR-Fitchburg')
- `limit` — Max alerts to return (default 20)

#### `mbta_routes`

List MBTA (Boston) transit routes.
Optionally filter by type: 0=Light Rail (Green Line), 1=Heavy Rail (Red/Orange/Blue), 2=Commuter Rail, 3=Bus, 4=Ferry.

**Parameters:**
- `type` — Route type: 0=Light Rail, 1=Heavy Rail, 2=Commuter Rail, 3=Bus, 4=Ferry
- `limit` — Max routes to return (default 50)

---

### Chesapeake Bay (CBIBS Buoy System)

Chesapeake Bay Interpretive Buoy System (CBIBS) operated by NOAA. Real-time and historical water quality data from 10+ buoy stations across the Chesapeake Bay. Parameters: water temperature, salinity, dissolved oxygen, pH, turbidity, chlorophyll, wind speed/direction, wave height/period, and water currents (19+ variables). API key required (free).

**Workflow:** md_bay_stations for station list → md_bay_latest for current readings → md_bay_historical for time-series data by date range and variable.

**Tips:** Station codes: UP (Upper Potomac), GR (Gooses Reef), J (Jamestown), FL (First Landing), SR (Stingray Point), PL (Point Lookout), AN (Annapolis), YS (York Spit), N (Norfolk), SN (Susquehanna), S (South). Common variables: water_temp, salinity, dissolved_oxygen, ph, turbidity, chlorophyll, wind_speed, wind_direction, wave_height, sea_netcurrent_speed. Historical data available from 2007-present depending on station.

| Tool | Description | · Auth: `CBIBS_API_KEY` |
|------|-------------|---|
| `md_bay_stations` | List all Chesapeake Bay CBIBS buoy stations with their locations and current status. |
| `md_bay_latest` | Get latest readings from a CBIBS buoy station. |
| `md_bay_historical` | Get historical time-series data from a CBIBS buoy station. |

#### `md_bay_stations`

List all Chesapeake Bay CBIBS buoy stations with their locations and current status.
Stations: 'UP' (Upper Potomac), 'GR' (Gooses Reef), 'J' (Jamestown), 'FL' (First Landing), 'SR' (Stingray Point), 'PL' (Point Lookout), 'AN' (Annapolis), 'YS' (York Spit), 'N' (Norfolk), 'SN' (Susquehanna), 'S' (South).

#### `md_bay_latest`

Get latest readings from a CBIBS buoy station.
Returns current water temperature, salinity, dissolved oxygen, pH, wind, waves, and more.
Stations: 'UP' (Upper Potomac), 'GR' (Gooses Reef), 'J' (Jamestown), 'FL' (First Landing), 'SR' (Stingray Point), 'PL' (Point Lookout), 'AN' (Annapolis), 'YS' (York Spit), 'N' (Norfolk), 'SN' (Susquehanna), 'S' (South).

**Parameters:**
- `station` **(required)** — Station code

#### `md_bay_historical`

Get historical time-series data from a CBIBS buoy station.
Query specific variable over a date range for trend analysis.
Variables: 'water_temp' (Water Temperature (°C)), 'salinity' (Salinity (PSU)), 'dissolved_oxygen' (Dissolved Oxygen (mg/L)), 'ph' (pH), 'turbidity' (Turbidity (NTU)), 'chlorophyll' (Chlorophyll (µg/L)), 'wind_speed' (Wind Speed (m/s)), 'wind_direction' (Wind Direction (degrees)), ... (13 total).
Stations: 'UP' (Upper Potomac), 'GR' (Gooses Reef), 'J' (Jamestown), 'FL' (First Landing), 'SR' (Stingray Point), 'PL' (Point Lookout), 'AN' (Annapolis), 'YS' (York Spit), 'N' (Norfolk), 'SN' (Susquehanna), 'S' (South).

**Parameters:**
- `station` **(required)** — Station code
- `variable` **(required)** — Measurement variable: 'water_temp' (Water Temperature (°C)), 'salinity' (Salinity (PSU)), 'dissolved_oxygen' (Dissolved Oxygen (mg/L)), 'ph' (pH), 'turbidity' (Turbidity (NTU)), 'chlorophyll' (Chlorophyll (µg/L)), 'wind_speed' (Wind Speed (m/s)), 'wind_direction' (Wind Direction (degrees)), ... (13 total)
- `start_date` **(required)** — Start date (YYYY-MM-DD), e.g. '2024-06-01'
- `end_date` **(required)** — End date (YYYY-MM-DD), e.g. '2024-06-30'

---

### Maryland CHART (Traffic & Road Conditions)

Real-time Maryland traffic data from CHART (Coordinated Highways Action Response Team) operated by MDOT SHA. Live feeds for traffic incidents, road closures, camera locations, speed sensor data, weather station readings (RWIS), dynamic message signs, and travel time routes. No API key required. Data updates continuously.

**Workflow:** md_traffic_incidents for current incidents → md_traffic_closures for road closures → md_traffic_speeds for speed sensor data → md_traffic_weather for road weather conditions → md_traffic_cameras for camera locations → md_traffic_signs for DMS messages → md_traffic_travel_times for route travel times.

**Tips:** All feeds are real-time with no authentication required. Speed sensor data includes average speed, volume, and occupancy. RWIS stations provide road surface temperature, precipitation, and visibility. Combine with md_gis_traffic_counts for historical AADT data.

| Tool | Description | · No auth required |
|------|-------------|---|
| `md_traffic_incidents` | Get active traffic incidents on Maryland highways in real-time. |
| `md_traffic_closures` | Get active road closures on Maryland highways. |
| `md_traffic_cameras` | Get traffic camera locations across Maryland highways. |
| `md_traffic_speeds` | Get speed sensor data from Maryland highways. |
| `md_traffic_weather` | Get road weather data from RWIS (Road Weather Information System) stations. |
| `md_traffic_signs` | Get dynamic message sign (DMS) content on Maryland highways. |
| `md_traffic_travel_times` | Get travel time data for major Maryland highway routes. |

#### `md_traffic_incidents`

Get active traffic incidents on Maryland highways in real-time.
Includes accidents, disabled vehicles, debris, construction, and other events.
Data from CHART (MDOT SHA) — updates continuously.

#### `md_traffic_closures`

Get active road closures on Maryland highways.
Includes planned and emergency closures with start/end times.

#### `md_traffic_cameras`

Get traffic camera locations across Maryland highways.
Returns camera IDs, locations, and image URLs for real-time visual monitoring.

#### `md_traffic_speeds`

Get speed sensor data from Maryland highways.
Includes average speed, traffic volume, and lane occupancy from detector stations.
Useful for identifying congestion and travel conditions.

#### `md_traffic_weather`

Get road weather data from RWIS (Road Weather Information System) stations.
Includes air/surface temperature, humidity, wind, precipitation, and visibility.
Critical for winter weather road condition assessment.

#### `md_traffic_signs`

Get dynamic message sign (DMS) content on Maryland highways.
Shows current messages displayed on electronic highway signs — alerts, travel times, events.

#### `md_traffic_travel_times`

Get travel time data for major Maryland highway routes.
Shows current travel time vs free-flow time, average speed, and route distance.

---

### Maryland MTA (Transit & MARC Train)

Maryland Transit Administration (MTA) data. Provides GTFS static feed URLs for schedule data (Local Bus, Light Rail, Metro Subway, MARC Train, Commuter Bus), plus real-time service alerts. MARC train real-time trip updates and vehicle positions are available as public protobuf feeds. Swiftly API key (free) required for real-time bus/rail data.

**Workflow:** md_transit_feeds for GTFS feed URLs → md_transit_alerts for active service alerts → md_transit_marc_status for MARC train real-time status.

**Tips:** GTFS static feeds are ZIP archives containing schedule CSVs — use the feed URLs to download and parse. Service alerts are available without authentication. MARC train real-time data (trip updates, vehicle positions) is available as protobuf at public S3 URLs. For bus/rail real-time, a Swiftly API key is required (free, request via Google Form on MTA developer page). Swiftly agency keys: mta-maryland, mta-maryland-light-rail, mta-maryland-metro, mta-maryland-commuter-bus.

| Tool | Description | · Auth: `SWIFTLY_API_KEY` |
|------|-------------|---|
| `md_transit_feeds` | Get Maryland MTA GTFS feed URLs for all transit modes. |
| `md_transit_vehicles` | Get real-time vehicle positions for Maryland MTA transit. |
| `md_transit_trip_updates` | Get real-time trip updates (delays, cancellations) for Maryland MTA transit. |

#### `md_transit_feeds`

Get Maryland MTA GTFS feed URLs for all transit modes.
Returns download URLs for static schedule data (ZIP archives containing GTFS CSVs).
Modes: Local Bus, Light Rail, Metro Subway, MARC Train, Commuter Bus.
Also includes real-time feed URLs (protobuf format) for MARC train and service alerts.

#### `md_transit_vehicles`

Get real-time vehicle positions for Maryland MTA transit.
Requires SWIFTLY_API_KEY environment variable (free, request from MTA).
Agencies: 'mta-maryland' (Local Bus), 'mta-maryland-light-rail' (Light Rail), 'mta-maryland-metro' (Metro Subway), 'mta-maryland-commuter-bus' (Commuter Bus).

**Parameters:**
- `agency` **(required)** — Swiftly agency key

#### `md_transit_trip_updates`

Get real-time trip updates (delays, cancellations) for Maryland MTA transit.
Requires SWIFTLY_API_KEY environment variable (free, request from MTA).
Agencies: 'mta-maryland' (Local Bus), 'mta-maryland-light-rail' (Light Rail), 'mta-maryland-metro' (Metro Subway), 'mta-maryland-commuter-bus' (Commuter Bus).

**Parameters:**
- `agency` **(required)** — Swiftly agency key

---

### MN DNR LakeFinder

Minnesota DNR LakeFinder — data for 4,500+ lakes including surveys, depth maps, water quality, fish species, and consumption guidance. No API key required.

**Workflow:** Use mn_lake_search to find lakes by name → mn_lake_detail to get full details including fish species and surveys. Use mn_lake_nearby to find lakes near a coordinate.

**Tips:** Search by partial name (e.g. 'Mille Lacs', 'Superior'). Lake IDs are numeric. The by-point endpoint uses radius in miles (default 5). Detail results include fish species lists, survey data, and water quality info.

| Tool | Description | · No auth required |
|------|-------------|---|
| `mn_lake_search` | Search Minnesota lakes by name. |
| `mn_lake_nearby` | Find Minnesota lakes near a latitude/longitude point. |
| `mn_lake_detail` | Get full details for a Minnesota lake by ID. |

#### `mn_lake_search`

Search Minnesota lakes by name.
Returns matching lakes with IDs, names, counties, acreage, and max depth.
Use the lake ID from results with mn_lake_detail for full information.

**Parameters:**
- `name` **(required)** — Lake name or partial name: 'Mille Lacs', 'Superior', 'Minnetonka'

#### `mn_lake_nearby`

Find Minnesota lakes near a latitude/longitude point.
Returns lakes within the specified radius (in miles, default 5).

**Parameters:**
- `lat` **(required)** — Latitude (e.g. 46.2)
- `lon` **(required)** — Longitude (e.g. -94.3)
- `radius` — Search radius in miles (default 5)

#### `mn_lake_detail`

Get full details for a Minnesota lake by ID.
Includes fish species, surveys, water quality, depth, and consumption guidance.
Use mn_lake_search or mn_lake_nearby to find lake IDs.

**Parameters:**
- `id` **(required)** — Lake ID (DOW number) from search results (e.g. '21005700')

---

### NC LINC (Log Into North Carolina)

NC OSBM LINC — 900+ data items covering demographics, employment, income, education, transportation, agriculture, vital statistics, and government data at state, county, and municipal level. No API key required.

**Workflow:** Use nc_linc_search to find datasets by keyword → nc_linc_query to query a specific dataset with filters.

**Tips:** Search broadly first (e.g. 'employment', 'population') to discover dataset IDs. Common datasets: 'employment-and-income-linc', 'census-population-and-housing-linc', 'vehicle-registration', 'government', 'nc-transportation-linc'. Use the where parameter for SQL-style filters in nc_linc_query.

| Tool | Description | · No auth required |
|------|-------------|---|
| `nc_linc_search` | Search across all NC LINC datasets by keyword. |
| `nc_linc_query` | Query a specific NC LINC dataset with optional filters. |

#### `nc_linc_search`

Search across all NC LINC datasets by keyword.
Returns matching datasets with IDs, titles, descriptions, and record counts.
Use the dataset ID from results with nc_linc_query to fetch actual data.

**Parameters:**
- `query` **(required)** — Search keyword: 'employment', 'population', 'income', 'education', 'transportation'
- `limit` — Max datasets to return (default 10, max 100)

#### `nc_linc_query`

Query a specific NC LINC dataset with optional filters.
Use nc_linc_search first to find dataset IDs.
Common datasets: 'employment-and-income-linc', 'census-population-and-housing-linc', 'vehicle-registration', 'government', 'nc-transportation-linc'.

**Parameters:**
- `dataset_id` **(required)** — Dataset identifier from nc_linc_search results (e.g. 'employment-and-income-linc')
- `where` — SQL-style filter expression (e.g. "county='Wake'", "year>2020")
- `limit` — Max records to return (default 20, max 100)
- `offset` — Offset for pagination (default 0)

---

### OneBusAway (Puget Sound Transit)

Real-time transit data for Puget Sound (Seattle area). Get arrival predictions by stop and list routes by agency using the OneBusAway API.

**Workflow:** Use oba_routes to discover routes for an agency → oba_arrivals to get real-time arrival predictions at a stop.

**Tips:** Default agency ID '1' is King County Metro (Seattle). Stop IDs are agency-specific. The API returns both real-time predictions and scheduled times.

| Tool | Description | · Auth: `OBA_API_KEY` |
|------|-------------|---|
| `oba_arrivals` | Get real-time arrival and departure predictions for a Puget Sound (Seattle area) transit stop. |
| `oba_routes` | List transit routes for a Puget Sound agency. |

#### `oba_arrivals`

Get real-time arrival and departure predictions for a Puget Sound (Seattle area) transit stop.
Returns predicted and scheduled times, route info, vehicle tracking, and distance from stop.
Covers King County Metro, Sound Transit, Pierce Transit, Community Transit, and more.

**Parameters:**
- `stop_id` **(required)** — OneBusAway stop ID (e.g. '1_75403')

#### `oba_routes`

List transit routes for a Puget Sound agency.
Default agency '1' is King County Metro (Seattle). Returns route names, types, and descriptions.

**Parameters:**
- `agency_id` — Agency ID (default '1' for King County Metro)

---

### PATH Train (Port Authority Trans-Hudson)

Real-time PATH train arrival times for the NY/NJ metropolitan area. No API key required.

**Workflow:** Use path_arrivals to get real-time arrival predictions for all PATH stations.

**Tips:** PATH connects Manhattan (NYC) to Jersey City, Hoboken, Harrison, and Newark in New Jersey. No API key required — data is publicly available.

| Tool | Description | · No auth required |
|------|-------------|---|
| `path_arrivals` | Get real-time PATH train arrival times for all stations in the NY/NJ metro area. |

#### `path_arrivals`

Get real-time PATH train arrival times for all stations in the NY/NJ metro area.
Returns station names, line info, projected arrival times, and train status.
PATH connects Manhattan to Jersey City, Hoboken, Harrison, and Newark. No API key required.

---

### SEPTA (Southeastern Pennsylvania Transportation Authority)

Real-time transit data for Philadelphia's SEPTA system: regional rail train positions, next-to-arrive predictions between stations, bus/trolley positions by route, and service alerts. No API key required.

**Workflow:** Use septa_train_view for all regional rail positions → septa_next_to_arrive for trip planning between stations → septa_bus_view for bus/trolley tracking → septa_alerts for service disruptions.

**Tips:** Station names use official SEPTA names (e.g. '30th Street Station', 'Suburban Station', 'Temple University'). TrainView returns all active regional rail trains. NextToArrive count defaults to 4 results.

| Tool | Description | · No auth required |
|------|-------------|---|
| `septa_train_view` | Get all active SEPTA (Philadelphia) regional rail train positions. |
| `septa_next_to_arrive` | Get next trains arriving between two SEPTA (Philadelphia) regional rail stations. |
| `septa_bus_view` | Get real-time bus/trolley positions for a SEPTA (Philadelphia) route. |
| `septa_alerts` | Get service alerts for all SEPTA (Philadelphia) transit routes. |

#### `septa_train_view`

Get all active SEPTA (Philadelphia) regional rail train positions.
Returns real-time GPS coordinates, line, destination, current/next stop, and delay minutes for every active train.

#### `septa_next_to_arrive`

Get next trains arriving between two SEPTA (Philadelphia) regional rail stations.
Returns departure/arrival times, delays, line info, and connection details.

**Parameters:**
- `start` **(required)** — Origin station name (e.g. 'Suburban Station', '30th Street Station', 'Temple University')
- `end` **(required)** — Destination station name (e.g. 'Bryn Mawr', 'Trenton', 'Airport Terminal E-F')
- `count` — Number of results (default 4)

#### `septa_bus_view`

Get real-time bus/trolley positions for a SEPTA (Philadelphia) route.
Returns GPS coordinates, vehicle ID, direction, destination, and delay for all active vehicles on the route.

**Parameters:**
- `route` **(required)** — Route number (e.g. '17', '34', '101', 'LUCYGO')

#### `septa_alerts`

Get service alerts for all SEPTA (Philadelphia) transit routes.
Returns current messages, advisories, detour information, and snow alerts.

---

### State 511 Traffic (Multi-State Real-Time Traffic)

Real-time traffic data from state 511 systems across 14+ states. Covers incidents, road closures, cameras, speed data, weather stations (RWIS), dynamic message signs, travel times, and road conditions. Many states use the ibi511 platform with identical API patterns. Also includes OHGO (Ohio), NCDOT TIMS, Caltrans CWWP2, WSDOT, and PennDOT RCRS. Free API key required for most states.

**Workflow:** traffic_511_incidents for active incidents → traffic_511_cameras for camera locations → traffic_511_signs for DMS messages → traffic_511_weather for road weather → traffic_511_conditions for road conditions.

**Tips:** Most 511 APIs share the same endpoint pattern. Rate limit: 10 calls/60 seconds per state. Use traffic_511_list to see available states. States on the ibi511 platform: AZ, NV, UT, AK, ID, NY, CT, GA, WI, LA. OHGO (Ohio) has its own REST API. NCDOT TIMS has no auth required. Caltrans CWWP2 organizes by district (d1-d12). WSDOT requires an Access Code.

| Tool | Description | · No auth required |
|------|-------------|---|
| `traffic_511_list` | List all states with 511 traffic data available in the registry. |
| `traffic_511_incidents` | Get active traffic incidents (accidents, closures, construction) for a state. |
| `traffic_511_cameras` | Get traffic camera locations for a state. |
| `traffic_511_signs` | Get dynamic message sign content for a state. |
| `traffic_511_weather` | Get road weather station (RWIS) data for a state. |
| `traffic_511_conditions` | Get road conditions (construction, speed data, traffic flow) for a state. |

#### `traffic_511_list`

List all states with 511 traffic data available in the registry.

#### `traffic_511_incidents`

Get active traffic incidents (accidents, closures, construction) for a state.
Covers 14+ states. Use traffic_511_list to see available states.

**Parameters:**
- `state` **(required)** — Two-letter state code: AZ, NV, UT, AK, ID, NY, CT, GA, WI, LA, AR, OH, NC, WA

#### `traffic_511_cameras`

Get traffic camera locations for a state.

**Parameters:**
- `state` **(required)** — Two-letter state code: AZ, NV, UT, AK, ID, NY, CT, GA, WI, LA, AR, OH, NC, WA

#### `traffic_511_signs`

Get dynamic message sign content for a state.

**Parameters:**
- `state` **(required)** — Two-letter state code: AZ, NV, UT, AK, ID, NY, CT, GA, WI, LA, AR, OH, NC, WA

#### `traffic_511_weather`

Get road weather station (RWIS) data for a state.
Includes surface temperature, precipitation, visibility, wind.

**Parameters:**
- `state` **(required)** — Two-letter state code: AZ, NV, UT, AK, ID, NY, CT, GA, WI, LA, AR, OH, NC, WA

#### `traffic_511_conditions`

Get road conditions (construction, speed data, traffic flow) for a state.

**Parameters:**
- `state` **(required)** — Two-letter state code: AZ, NV, UT, AK, ID, NY, CT, GA, WI, LA, AR, OH, NC, WA

---

### US State Open Data (50-State Socrata + GIS)

Generic tools for querying US state open data portals. Supports Socrata SODA API (used by 30+ states) and ArcGIS REST services for GIS/mapping data. A single state registry maps state codes to portal URLs and dataset IDs. Maryland is fully populated with 22 Socrata datasets and 8 GIS services. Other states have portal URLs ready — use state_query with any dataset ID, or state_list to see what categories are pre-mapped. One SOCRATA_APP_TOKEN works across all state portals (optional, increases rate limits).

**Workflow:** state_list for coverage overview → state_query for any dataset by ID → state_crime / state_health / state_education / state_economy for category queries → state_property / state_housing / state_environment / state_transportation for more categories → state_gis_services to discover GIS layers → state_gis_query / state_gis_parcels / state_gis_boundaries for spatial data.

**Tips:** App token optional but recommended (higher rate limits). One token works across ALL Socrata state portals. Use state_list to see which states have data and how many categories are mapped. state_query works for ANY state with a Socrata portal even without category mappings — just pass a dataset ID. For state-specific systems (Maryland CHART traffic, CBIBS bay data, MTA transit), use the md-traffic, md-bay, md-transit modules. Combine with federal tools (BEA, BLS, Census, EPA, FBI) for state-vs-national comparisons. SoQL syntax: $where, $select, $order, $group, $q (full-text), $limit, $offset.

| Tool | Description | · Auth: `SOCRATA_APP_TOKEN` |
|------|-------------|---|
| `state_list` | List all US states in the registry with their data coverage. |
| `state_query` | Query any state's Socrata open data dataset by its 4-character ID. |
| `state_crime` | Query crime statistics for a US state. |
| `state_health` | Query health indicator data for a US state. |
| `state_education` | Query education data for a US state. |
| `state_economy` | Query economic data for a US state. |
| `state_businesses` | Query business data for a US state. |
| `state_property` | Query property assessment/tax data for a US state. |
| `state_housing` | Query housing data for a US state. |
| `state_environment` | Query environmental data for a US state. |
| `state_transportation` | Query transportation data for a US state. |
| `state_gis_query` | Query any ArcGIS REST service layer for a US state. |
| `state_gis_parcels` | Query property parcel boundaries for a US state via ArcGIS. |
| `state_gis_boundaries` | Query political boundaries for a US state via ArcGIS. |
| `state_gis_services` | Discover available GIS services for a US state. |

#### `state_list`

List all US states in the registry with their data coverage.
Shows which states have Socrata portals, how many dataset categories are mapped, and whether GIS services are available.
Use this to see what data is available before querying a specific state.

**Parameters:**
- `state` — Optional: show detailed coverage for a specific state code

#### `state_query`

Query any state's Socrata open data dataset by its 4-character ID.
Works for ANY state in the registry, even without category mappings.
Find dataset IDs by browsing the state's portal (e.g., data.ny.gov, opendata.maryland.gov).
Supports full SoQL: $select, $where, $order, $group, $q (full-text), $limit, $offset.

**Parameters:**
- `state` **(required)** — Two-letter state code
- `dataset_id` **(required)** — Socrata 4-character dataset ID, e.g. 'jwfa-fdxs'
- `select` — SoQL $select: columns to return
- `where` — SoQL $where: filter condition
- `order` — SoQL $order: sort clause
- `group` — SoQL $group: group-by clause
- `q` — Full-text search
- `limit` — Max results (default 100)
- `offset` — Offset for pagination

#### `state_crime`

Query crime statistics for a US state.
Data varies by state: may include violent crime, property crime, arrests, by county/jurisdiction.
Filter by year, jurisdiction, or use full-text search.

**Parameters:**
- `state` **(required)** — Two-letter state code, e.g. 'MD', 'NY', 'CA'
- `q` — Full-text search across all fields
- `where` — SoQL $where filter, e.g. "year = '2023'"
- `limit` — Max results (default 100)
- `year` — Filter by year, e.g. '2023'
- `county` — Filter by county/jurisdiction name

#### `state_health`

Query health indicator data for a US state.
May include: disease rates, overdose deaths, infant mortality, immunization, hospital data.
Data availability varies by state.

**Parameters:**
- `state` **(required)** — Two-letter state code, e.g. 'MD', 'NY', 'CA'
- `q` — Full-text search across all fields
- `where` — SoQL $where filter, e.g. "year = '2023'"
- `limit` — Max results (default 100)

#### `state_education`

Query education data for a US state.
May include: school enrollment, assessment scores, graduation rates, demographics.
Filter by county, year, or search by keyword.

**Parameters:**
- `state` **(required)** — Two-letter state code, e.g. 'MD', 'NY', 'CA'
- `q` — Full-text search across all fields
- `where` — SoQL $where filter, e.g. "year = '2023'"
- `limit` — Max results (default 100)
- `county` — Filter by county name
- `year` — Filter by year

#### `state_economy`

Query economic data for a US state.
May include: GDP, employment, workforce metrics, tax comparisons, income data.
Cross-reference with federal BEA/BLS tools for national context.

**Parameters:**
- `state` **(required)** — Two-letter state code, e.g. 'MD', 'NY', 'CA'
- `q` — Full-text search across all fields
- `where` — SoQL $where filter, e.g. "year = '2023'"
- `limit` — Max results (default 100)

#### `state_businesses`

Query business data for a US state.
May include: business counts, registrations, licenses, industry breakdowns.

**Parameters:**
- `state` **(required)** — Two-letter state code, e.g. 'MD', 'NY', 'CA'
- `q` — Full-text search across all fields
- `where` — SoQL $where filter, e.g. "year = '2023'"
- `limit` — Max results (default 100)

#### `state_property`

Query property assessment/tax data for a US state.
May include: assessed values, owner info, property details, land use codes.
Filter by county, city, ZIP, or search by address/owner.

**Parameters:**
- `state` **(required)** — Two-letter state code, e.g. 'MD', 'NY', 'CA'
- `q` — Full-text search across all fields
- `where` — SoQL $where filter, e.g. "year = '2023'"
- `limit` — Max results (default 100)
- `county` — Filter by county name
- `city` — Filter by city name
- `zip` — Filter by ZIP code

#### `state_housing`

Query housing data for a US state.
May include: building permits, housing units authorized, foreclosure filings.
Cross-reference with HUD tools for federal housing data.

**Parameters:**
- `state` **(required)** — Two-letter state code, e.g. 'MD', 'NY', 'CA'
- `q` — Full-text search across all fields
- `where` — SoQL $where filter, e.g. "year = '2023'"
- `limit` — Max results (default 100)
- `county` — Filter by county name
- `year` — Filter by year

#### `state_environment`

Query environmental data for a US state.
May include: air quality violations, water quality assessments, sewer overflows, permits.
Cross-reference with federal EPA tools for national context.

**Parameters:**
- `state` **(required)** — Two-letter state code, e.g. 'MD', 'NY', 'CA'
- `q` — Full-text search across all fields
- `where` — SoQL $where filter, e.g. "year = '2023'"
- `limit` — Max results (default 100)
- `county` — Filter by county name

#### `state_transportation`

Query transportation data for a US state.
May include: vehicle registrations, EV adoption, traffic data.
For real-time traffic, use state-specific traffic modules (e.g., md_traffic_*).

**Parameters:**
- `state` **(required)** — Two-letter state code, e.g. 'MD', 'NY', 'CA'
- `q` — Full-text search across all fields
- `where` — SoQL $where filter, e.g. "year = '2023'"
- `limit` — Max results (default 100)
- `county` — Filter by county name
- `year` — Filter by year

#### `state_gis_query`

Query any ArcGIS REST service layer for a US state.
Supports attribute and spatial queries with SQL-like where clauses.
Use state_gis_services to discover available services and layer IDs.
Not all states have GIS services in the registry — use state_list to check.

**Parameters:**
- `state` **(required)** — Two-letter state code
- `service` **(required)** — Service path, e.g. 'PlanningCadastre/MD_ParcelBoundaries/MapServer'
- `layer_id` — Layer index (default 0)
- `where` — SQL where clause, e.g. "COUNTY = 'MONTGOMERY'"
- `out_fields` — Comma-separated field names (default '*')
- `return_geometry` — Include geometry (default false)
- `limit` — Max features (default 50)

#### `state_gis_parcels`

Query property parcel boundaries for a US state via ArcGIS.
Returns parcel ID, owner name, address, land area, and use codes.
Filter by county, owner name, address, or ZIP using SQL where clause.

**Parameters:**
- `state` **(required)** — Two-letter state code
- `where` — SQL where clause, e.g. "COUNTY = 'MONTGOMERY'"
- `limit` — Max parcels (default 50)

#### `state_gis_boundaries`

Query political boundaries for a US state via ArcGIS.
May include: counties, municipalities, congressional districts, state legislative districts.
Layer IDs vary by state — use state_gis_services to check available layers.

**Parameters:**
- `state` **(required)** — Two-letter state code
- `layer_id` — Layer index (default 0, varies by state)
- `where` — SQL where clause
- `limit` — Max features (default 50)

#### `state_gis_services`

Discover available GIS services for a US state.
Lists service folders and layers available on the state's ArcGIS REST endpoint.
Use the results to find service paths for state_gis_query.

**Parameters:**
- `state` **(required)** — Two-letter state code
- `folder` — Service folder to explore, e.g. 'Boundaries', 'Transportation'

---

### TriMet (Portland Transit)

Real-time transit arrivals for TriMet (Portland, OR). Get upcoming bus and rail arrival predictions by stop location ID.

**Workflow:** Use trimet_arrivals with a stop location ID to get real-time arrival predictions for buses and MAX light rail at that stop.

**Tips:** Stop location IDs can be found on TriMet's website or trip planner. Example stop IDs: 8989 (Pioneer Square), 7787 (Gateway TC). Results include estimated and scheduled arrival times.

| Tool | Description | · Auth: `TRIMET_APP_ID` |
|------|-------------|---|
| `trimet_arrivals` | Get real-time arrival predictions for TriMet (Portland, OR) buses and MAX light rail at a specific stop. |

#### `trimet_arrivals`

Get real-time arrival predictions for TriMet (Portland, OR) buses and MAX light rail at a specific stop.
Returns estimated and scheduled arrival times, route info, and vehicle status.

**Parameters:**
- `stop_id` **(required)** — TriMet stop location ID (e.g. '8989' for Pioneer Square)

---

### WMATA (Washington DC Metro & Bus)

Washington Metropolitan Area Transit Authority (WMATA) — real-time Metro rail predictions, train positions, bus predictions, and service incidents for the DC/MD/VA metro area.

**Workflow:** wmata_train_predictions for next arrivals → wmata_train_positions for live positions → wmata_incidents for service disruptions → wmata_bus_predictions for bus arrivals.

**Tips:** Station codes are 3-letter codes (e.g., A01=Metro Center, C05=Rosslyn, F01=Gallery Place). Use wmata_train_predictions with 'All' for all stations. Incidents include rail delays, bus reroutes, and elevator/escalator outages.

| Tool | Description | · Auth: `WMATA_API_KEY` |
|------|-------------|---|
| `wmata_train_predictions` | Get next train arrival predictions at a WMATA Metro station. |
| `wmata_train_positions` | Get real-time positions of all WMATA Metro trains on the system. |
| `wmata_incidents` | Get current WMATA service incidents — rail delays, bus disruptions, and elevator/escalator outages. |
| `wmata_bus_predictions` | Get next bus arrival predictions at a WMATA bus stop. |

#### `wmata_train_predictions`

Get next train arrival predictions at a WMATA Metro station.
Station codes: A01=Metro Center, B01=Gallery Place, C05=Rosslyn, D02=Smithsonian, etc.
Use 'All' or omit for all stations.

**Parameters:**
- `station` — Station code (e.g., 'A01') or 'All' for all stations

#### `wmata_train_positions`

Get real-time positions of all WMATA Metro trains on the system.

#### `wmata_incidents`

Get current WMATA service incidents — rail delays, bus disruptions, and elevator/escalator outages.

**Parameters:**
- `type` — Incident type (default: all)

#### `wmata_bus_predictions`

Get next bus arrival predictions at a WMATA bus stop.
Requires a 7-digit stop ID.

**Parameters:**
- `stop_id` **(required)** — WMATA bus stop ID (7-digit number)

---

### WSDOT Ferries (Washington State Ferries)

Washington State Ferries real-time data: sailing schedules, vessel positions, and terminal wait times. Covers the largest ferry system in the U.S.

**Workflow:** Use wsdot_ferry_schedule for sailing times by date → wsdot_ferry_vessels for real-time vessel locations → wsdot_ferry_terminals for terminal wait times and space availability.

**Tips:** Schedule dates use YYYY-MM-DD format. Vessel positions update frequently. Terminal sailing space shows current vehicle capacity at each terminal.

| Tool | Description | · Auth: `WSDOT_ACCESS_CODE` |
|------|-------------|---|
| `wsdot_ferry_schedule` | Get Washington State Ferries sailing schedules for a specific date. |
| `wsdot_ferry_vessels` | Get real-time positions of all Washington State Ferry vessels. |
| `wsdot_ferry_terminals` | Get current terminal wait times and vehicle space availability at Washington State Ferry terminals. |

#### `wsdot_ferry_schedule`

Get Washington State Ferries sailing schedules for a specific date.
Returns route descriptions, crossing times, and individual sailing times.

**Parameters:**
- `date` **(required)** — Schedule date in YYYY-MM-DD format (e.g. '2026-04-02')

#### `wsdot_ferry_vessels`

Get real-time positions of all Washington State Ferry vessels.
Returns vessel names, GPS coordinates, speed, heading, dock status, and departure/arrival terminals.

#### `wsdot_ferry_terminals`

Get current terminal wait times and vehicle space availability at Washington State Ferry terminals.
Shows how full each sailing is and estimated wait times for drive-up customers.

---

## International

### State Department Travel Advisories

U.S. State Department travel advisories for all countries. Includes advisory levels (1-4), description, date published, and country information.

**Workflow:** travel_advisories to get all travel advisories or filter by country.

**Tips:** Advisory levels: 1 = Exercise Normal Precautions, 2 = Exercise Increased Caution, 3 = Reconsider Travel, 4 = Do Not Travel. Returns all advisories by default; filter by country_code (ISO 2-letter, e.g. 'AF', 'CN', 'RU').

| Tool | Description | · No auth required |
|------|-------------|---|
| `travel_advisories` | Get U.S. State Department travel advisories for all countries or a specific country. |

#### `travel_advisories`

Get U.S. State Department travel advisories for all countries or a specific country.
Advisory levels: 1 = Exercise Normal Precautions, 2 = Exercise Increased Caution, 3 = Reconsider Travel, 4 = Do Not Travel.
Includes advisory text, date published, and country information.

**Parameters:**
- `country_code` — ISO 2-letter country code to filter: 'AF', 'CN', 'RU', 'MX', 'UA'
- `level` — Filter by advisory level: 1, 2, 3, or 4

---

### World Bank

International economic indicators for 200+ countries: GDP, population, health spending, life expectancy, trade, inequality

**Workflow:** wb_indicator for a single country, wb_compare to compare countries, wb_search to find indicator IDs

**Tips:** Countries: US, GB, DE, JP, CN, IN, BR. Indicators: NY.GDP.MKTP.CD (GDP), SP.POP.TOTL (population), SP.DYN.LE00.IN (life expectancy)

| Tool | Description | · No auth required |
|------|-------------|---|
| `wb_indicator` | Get a World Bank indicator for a country. |
| `wb_compare` | Compare a World Bank indicator across multiple countries. |
| `wb_search` | Search World Bank indicators by keyword. |
| `wb_countries` | List World Bank countries with region, income level, and capital city. |

#### `wb_indicator`

Get a World Bank indicator for a country.
Popular: NY.GDP.MKTP.CD (GDP), SP.DYN.LE00.IN (life expectancy), SH.XPD.CHEX.PC.CD (health spend/capita), SL.UEM.TOTL.ZS (unemployment)

**Parameters:**
- `indicator` **(required)** — Indicator code, e.g. 'NY.GDP.MKTP.CD'
- `country` — ISO2 code: US, GB, DE, JP, CN. Default: US
- `date_range` — Year range: '2015:2024' or single year '2024'. Default: last 10 years

#### `wb_compare`

Compare a World Bank indicator across multiple countries.
Great for 'How does US compare to...' questions.

**Parameters:**
- `indicator` **(required)** — Indicator code
- `countries` **(required)** — Semicolon-separated ISO2 codes: 'US;GB;DE;JP;CN'
- `date_range` — Year range: '2015:2024'. Default: last 5 years

#### `wb_search`

Search World Bank indicators by keyword.
Examples: 'GDP', 'health expenditure', 'life expectancy', 'CO2 emissions'

**Parameters:**
- `query` **(required)** — Keywords to search for

#### `wb_countries`

List World Bank countries with region, income level, and capital city.

---

## Infrastructure

### FCC Broadband Map

Federal Communications Commission Broadband Map — search broadband providers by location or state, and check broadband coverage for specific coordinates or addresses. Useful for digital divide analysis and infrastructure planning.

**Workflow:** fcc_broadband_providers to find ISPs serving an area → fcc_broadband_coverage to check coverage at a specific location.

**Tips:** Use state FIPS codes or 2-letter abbreviations for state-level queries. Latitude/longitude give the most precise coverage results. Provider searches can be filtered by technology type (fiber, cable, DSL, etc.).

| Tool | Description | · No auth required |
|------|-------------|---|
| `fcc_broadband_providers` | Search broadband providers by location or state. |
| `fcc_broadband_coverage` | Check broadband coverage at a specific location. |

#### `fcc_broadband_providers`

Search broadband providers by location or state.
Returns ISP names, technology types (fiber, cable, DSL), and advertised speeds.
Provide a state code, lat/lon, or both to filter results.

**Parameters:**
- `state` — State FIPS code or 2-letter abbreviation (e.g. 'CA', 'NY')
- `latitude` — Latitude for location-based search
- `longitude` — Longitude for location-based search
- `technology` — Technology code filter (e.g. '50' for fiber, '40' for cable)
- `limit` — Max results (default 50)

#### `fcc_broadband_coverage`

Check broadband coverage at a specific location.
Returns available providers, technology types, and advertised speeds.
Provide latitude/longitude or an address.

**Parameters:**
- `latitude` — Latitude (e.g. 40.7128)
- `longitude` — Longitude (e.g. -74.006)
- `address` — Street address to check coverage for
- `technology` — Technology code filter
- `speed_download` — Minimum download speed filter (Mbps)
- `speed_upload` — Minimum upload speed filter (Mbps)

---

## Procurement

### GSA CALC+ Ceiling Rates

GSA CALC+ (Contract-Awarded Labor Category) ceiling rates - awarded hourly rates on GSA MAS professional services contracts. Covers 10,000+ contracts with labor category, vendor, price, education, experience, worksite, business size, security clearance, and SIN data. Useful for market research, IGCEs, and competitive pricing analysis.

**Workflow:** Use calc_search_rates to find rates by keyword, labor category, vendor, or filters -> calc_suggest for autocomplete on labor categories, vendors, or contract numbers -> calc_contract_rates to see all rates under a specific contract.

**Tips:** Search modes: 'keyword' for wildcard (2 char min), 'search' for exact field match (field:value). Filters: education_level (HS/AA/BA/MA/PHD, pipe for multiple), experience_range (min,max), price_range (min,max), worksite (Contractor/Customer/Both), business_size (S=small/O=other), security_clearance (yes/no), sin, category, subcategory. Ordering: current_price (default), labor_category, vendor_name, education_level, min_years_experience. Data refreshed daily.

| Tool | Description | · No auth required |
|------|-------------|---|
| `calc_search_rates` | Search GSA CALC+ ceiling rates for federal labor categories. Find awarded hourly rates on GSA MAS professional services contracts. Search by keyword (wildcard across labor category, vendor, contract), exact field match, or browse with filters. Useful for market research, IGCEs, and competitive pricing. Data refreshed daily. |
| `calc_suggest` | Autocomplete/suggest values for labor categories, vendor names, or contract numbers in GSA CALC+ data. Useful for finding exact values to use in calc_search_rates. Uses 'contains' matching (2 char min). |
| `calc_contract_rates` | Get all ceiling rates for a specific GSA MAS contract by its contract number (IDV PIID). Shows all labor categories and rates awarded under that contract. |

#### `calc_search_rates`

Search GSA CALC+ ceiling rates for federal labor categories. Find awarded hourly rates on GSA MAS professional services contracts. Search by keyword (wildcard across labor category, vendor, contract), exact field match, or browse with filters. Useful for market research, IGCEs, and competitive pricing. Data refreshed daily.

**Parameters:**
- `keyword` — Wildcard keyword search across labor category, vendor name, and contract number (2 char min) - e.g. 'software engineer', 'Booz', 'GS10F'
- `search` — Exact field match as 'field:value' - e.g. 'labor_category:Engineer II', 'vendor_name:Deloitte', 'idv_piid:GS10F0303V'
- `education_level` — Education filter: 'HS', 'AA', 'BA', 'MA', 'PHD'. Use pipe for multiple: 'BA|MA'
- `experience_range` — Experience range as 'min,max' years - e.g. '3,10' or '5,20'
- `min_years_experience` — Exact minimum years - e.g. '5'
- `price_range` — Hourly rate range as 'min,max' dollars - e.g. '50,150'
- `worksite` — Worksite: 'Contractor', 'Customer', 'Both'
- `business_size` — Business size: 'S' (Small Business), 'O' (Other than Small Business)
- `security_clearance` — Security clearance required: 'yes' or 'no'
- `sin` — GSA SIN (Special Item Number) - e.g. '541330ENG', '541620'
- `category` — Service category - e.g. 'Professional Services', 'Facilities'
- `subcategory` — Service subcategory - e.g. 'IT Services', 'Engineering'
- `ordering` — Sort field: 'labor_category', 'current_price', 'education_level', 'keywords', 'certifications', 'min_years_experience', 'vendor_name', 'schedule'. Default: current_price
- `sort` — Sort direction (default: asc)
- `page` — Page number (default 1)
- `page_size` — Results per page (default 20)

#### `calc_suggest`

Autocomplete/suggest values for labor categories, vendor names, or contract numbers in GSA CALC+ data. Useful for finding exact values to use in calc_search_rates. Uses 'contains' matching (2 char min).

**Parameters:**
- `field` **(required)** — Field to suggest values for
- `prefix` **(required)** — Search prefix (2 character minimum) - e.g. 'soft' for software categories, 'Booz' for Booz Allen

#### `calc_contract_rates`

Get all ceiling rates for a specific GSA MAS contract by its contract number (IDV PIID). Shows all labor categories and rates awarded under that contract.

**Parameters:**
- `contract_number` **(required)** — GSA contract number (IDV PIID) - e.g. 'GS10F0303V', 'GS35F0581X'
- `page_size` — Max results (default 100)

---

### SAM.gov (Federal Procurement & Entities)

Federal procurement data from SAM.gov. Search contract opportunities, entity registrations, exclusions (debarments), and federal hierarchy. Covers all federal contracting and grants.

**Workflow:** sam_opportunities → sam_entities → sam_exclusions for due diligence.

**Tips:** Opportunity search supports keyword, NAICS, set-aside, posted/due dates. Entity search by UEI, CAGE, name. Exclusions for debarment/suspension checks.

| Tool | Description | · Auth: `SAM_API_KEY` |
|------|-------------|---|
| `sam_opportunities` | Search federal contract opportunities on SAM.gov. |
| `sam_entities` | Search registered entities (businesses/orgs) on SAM.gov. |
| `sam_exclusions` | Search SAM.gov exclusions (debarments/suspensions). |

#### `sam_opportunities`

Search federal contract opportunities on SAM.gov.
Filter by keyword, NAICS code, set-aside type, and posted date range.

**Parameters:**
- `keyword` — Search keyword
- `naics` — NAICS code filter, e.g. '541511'
- `posted_from` — Posted after (MM/DD/YYYY)
- `posted_to` — Posted before (MM/DD/YYYY)
- `set_aside` — Set-aside type: SBA, 8A, HUBZone, SDVOSBC, WOSB, etc.
- `limit` — Max results (default 25)

#### `sam_entities`

Search registered entities (businesses/orgs) on SAM.gov.
Lookup by UEI, CAGE code, business name, or state.

**Parameters:**
- `uei` — Unique Entity ID (UEI)
- `cage_code` — CAGE code
- `name` — Legal business name
- `state` — Two-letter state code
- `limit` — Max results (default 25)

#### `sam_exclusions`

Search SAM.gov exclusions (debarments/suspensions).
Check if an entity is excluded from federal contracting.

**Parameters:**
- `name` — Entity or individual name
- `uei` — UEI of excluded entity
- `classification` — Type: Individual, Firm, Special Entity, Vessel
- `limit` — Max results (default 25)

---

## Recreation

### National Park Service

National Park Service API — search parks, get alerts (closures, dangers), find campgrounds, and discover upcoming events across the U.S. national park system.

**Workflow:** nps_parks to find parks by state or keyword → nps_alerts for current conditions → nps_campgrounds for camping options → nps_events for scheduled activities.

**Tips:** Park codes are short abbreviations (e.g. 'yose' for Yosemite, 'grca' for Grand Canyon, 'yell' for Yellowstone). Use nps_parks to discover park codes. State codes are 2-letter abbreviations (e.g. 'CA', 'WY'). Alerts include closures, dangers, cautions, and general info.

| Tool | Description | · Auth: `NPS_API_KEY` |
|------|-------------|---|
| `nps_parks` | Search national parks by state, name, or keyword. |
| `nps_alerts` | Get current park alerts including closures, dangers, cautions, and general information. |
| `nps_campgrounds` | Search campgrounds in national parks. |
| `nps_events` | Get upcoming events at national parks. |

#### `nps_parks`

Search national parks by state, name, or keyword.
Returns park names, descriptions, states, designations, coordinates, and weather info.
Use this to discover park codes needed by other NPS tools.

**Parameters:**
- `state` — 2-letter state code (e.g. 'CA', 'WY', 'CO')
- `query` — Search keyword (e.g. 'canyon', 'glacier', 'volcano')
- `park_code` — Specific park code (e.g. 'yose', 'grca', 'yell')
- `limit` — Max results (default 25)

#### `nps_alerts`

Get current park alerts including closures, dangers, cautions, and general information.
Optionally filter by park code. Useful for checking conditions before visiting.

**Parameters:**
- `park_code` — Park code (e.g. 'yose', 'grca'). Omit for all parks.
- `limit` — Max results (default 25)

#### `nps_campgrounds`

Search campgrounds in national parks.
Returns campground names, descriptions, reservation info, site counts, and coordinates.
Filter by park code, state, or keyword.

**Parameters:**
- `park_code` — Park code (e.g. 'yose', 'grca')
- `state` — 2-letter state code (e.g. 'CA', 'WY')
- `query` — Search keyword
- `limit` — Max results (default 25)

#### `nps_events`

Get upcoming events at national parks.
Returns event titles, dates, locations, categories, and registration info.
Optionally filter by park code.

**Parameters:**
- `park_code` — Park code (e.g. 'yose', 'grca'). Omit for all parks.
- `limit` — Max results (default 25)

---

### Recreation.gov (RIDB)

Search federal recreation facilities, campgrounds, parks, trails, and available campsites via the Recreation Information Database (RIDB)

**Workflow:** rec_areas or rec_facilities to find locations → rec_campsites to check available campsites at a facility

**Tips:** Use two-letter state codes (e.g. 'CO', 'CA') for state filters. Activity names are freetext (e.g. 'camping', 'hiking', 'fishing'). Facility IDs from search results are needed for campsite lookups.

| Tool | Description | · Auth: `RECREATION_API_KEY` |
|------|-------------|---|
| `rec_facilities` | Search federal recreation facilities — campgrounds, parks, trails, lakes, and more. Filter by keyword, state, or activity type. |
| `rec_campsites` | Search available campsites at a specific recreation facility. Use rec_facilities first to find facility IDs. |
| `rec_areas` | Search federal recreation areas by keyword or state. Recreation areas are larger regions that may contain multiple facilities. |

#### `rec_facilities`

Search federal recreation facilities — campgrounds, parks, trails, lakes, and more. Filter by keyword, state, or activity type.

Returns facility names, types, locations, and IDs (use IDs with rec_campsites).

**Parameters:**
- `query` — Search keyword (e.g. 'Yellowstone', 'beach camping')
- `state` — Two-letter state code (e.g. 'CO', 'CA', 'WY')
- `activity` — Activity filter (e.g. 'camping', 'hiking', 'fishing', 'boating')
- `limit` — Max results (default: 20, max: 50)
- `offset` — Starting offset for pagination (default: 0)

#### `rec_campsites`

Search available campsites at a specific recreation facility. Use rec_facilities first to find facility IDs.

Returns campsite names, types, loops, and accessibility info.

**Parameters:**
- `facility_id` **(required)** — Facility ID from rec_facilities search results
- `limit` — Max campsites to return (default: 50, max: 100)

#### `rec_areas`

Search federal recreation areas by keyword or state. Recreation areas are larger regions that may contain multiple facilities.

Returns area names, descriptions, and locations.

**Parameters:**
- `query` — Search keyword (e.g. 'national forest', 'wilderness')
- `state` — Two-letter state code (e.g. 'CO', 'CA', 'WY')
- `limit` — Max results (default: 20, max: 50)
- `offset` — Starting offset for pagination (default: 0)

---

## Science

### DOE OSTI (Scientific Publications & Technical Reports)

Department of Energy Office of Scientific and Technical Information. Search DOE-funded scientific publications, technical reports, and research metadata via DOE PAGES and OSTI.gov. No API key required.

**Workflow:** doe_publications for searching DOE-funded research by keyword, author, or subject.

**Tips:** Covers DOE-funded research from national labs and universities. Use subject facets to narrow results. Date ranges in YYYY format.

| Tool | Description | · No auth required |
|------|-------------|---|
| `doe_publications` | Search DOE-funded scientific publications and technical reports. |

#### `doe_publications`

Search DOE-funded scientific publications and technical reports.
Covers research from national labs and universities funded by the Department of Energy.
Filter by keyword, author, title, subject, and date range.

**Parameters:**
- `query` — Full-text search query
- `author` — Author name
- `title` — Title search
- `subject` — Subject area filter
- `date_start` — Publication date start (YYYY or YYYY-MM-DD)
- `date_end` — Publication date end (YYYY or YYYY-MM-DD)
- `limit` — Max results (default 25)

---

### JPL (Jet Propulsion Laboratory)

NASA JPL Solar System Dynamics — asteroid/comet close approaches to Earth, small body orbital data lookups, and reported fireball/bolide events. No API key required.

**Workflow:** jpl_close_approaches to find near-Earth objects → jpl_small_body for detailed orbital data → jpl_fireball for reported fireball events

**Tips:** Close approaches: use date ranges (YYYY-MM-DD), distances in AU (1 AU ≈ 150M km). Small body lookup: search by name ('Apophis', 'Bennu'), designation ('2023 DW'), or SPK-ID. Fireball data comes from US Government sensors (DoD/DoE).

| Tool | Description | · No auth required |
|------|-------------|---|
| `jpl_close_approaches` | Get asteroid/comet close approaches to Earth. |
| `jpl_small_body` | Look up asteroid/comet orbital data by name, designation, or SPK-ID. |
| `jpl_fireball` | Get reported fireball/bolide events from US Government sensors. |

#### `jpl_close_approaches`

Get asteroid/comet close approaches to Earth.
Filter by date range, maximum distance (in AU), and result limit.
1 AU ≈ 150 million km (Earth-Sun distance). 0.05 AU ≈ 7.5 million km.

Example: date_min='2024-01-01', date_max='2024-12-31', dist_max='0.05'

**Parameters:**
- `date_min` — Start date (YYYY-MM-DD). Default: now
- `date_max` — End date (YYYY-MM-DD). Default: +60 days
- `dist_max` — Max distance in AU (e.g. '0.05' for ~7.5M km). Default: '0.05'
- `limit` — Max results (default 20)

#### `jpl_small_body`

Look up asteroid/comet orbital data by name, designation, or SPK-ID.
Returns object identity, orbital elements, physical parameters, and close approach data.

Example: name='Apophis', name='2023 DW', name='Bennu'

**Parameters:**
- `name` **(required)** — Object name, designation, or SPK-ID (e.g. 'Apophis', '2023 DW', '2099942')

#### `jpl_fireball`

Get reported fireball/bolide events from US Government sensors.
Fireballs are very bright meteors — detected by DoD/DoE satellite sensors.
Data includes date, location, velocity, energy, and altitude.

Example: date_min='2024-01-01', date_max='2024-12-31'

**Parameters:**
- `date_min` — Start date (YYYY-MM-DD)
- `date_max` — End date (YYYY-MM-DD)
- `limit` — Max results (default 20)

---

### NASA Science (NEO, Space Weather, Mars, Exoplanets)

NASA science APIs beyond imagery. Near-Earth Objects (asteroids/comets), space weather events (DONKI), Mars Rover photos, Earth natural events (EONET), and NASA TechPort projects. Uses api.nasa.gov (DEMO_KEY available, register for higher limits).

**Workflow:** nasa_neo → nasa_donki → nasa_mars_photos → nasa_eonet for different science domains.

**Tips:** DEMO_KEY works without registration (30 req/hr). Register for 1000 req/hr. NEO: search by date range for close approaches. DONKI: solar flares, CMEs, geomagnetic storms. Mars: photos by sol (Mars day) or Earth date.

| Tool | Description | · Auth: `NASA_API_KEY` |
|------|-------------|---|
| `nasa_neo` | Search Near-Earth Objects (asteroids/comets) by date range. |
| `nasa_neo_detail` | Get detailed information about a specific Near-Earth Object by asteroid ID. |
| `nasa_donki` | Get space weather events from NASA DONKI. |
| `nasa_mars_photos` | Get Mars Rover photos by sol (Mars day) or Earth date. |
| `nasa_eonet` | Get Earth natural events from NASA EONET. |

#### `nasa_neo`

Search Near-Earth Objects (asteroids/comets) by date range.
Returns close approach data, estimated diameter, velocity, and hazard assessment.

**Parameters:**
- `start_date` — Start date (YYYY-MM-DD), default today
- `end_date` — End date (YYYY-MM-DD), max 7 days from start

#### `nasa_neo_detail`

Get detailed information about a specific Near-Earth Object by asteroid ID.

**Parameters:**
- `asteroid_id` **(required)** — NEO asteroid ID from nasa_neo results

#### `nasa_donki`

Get space weather events from NASA DONKI.
Types: CME, CMEAnalysis, GST (geomagnetic storm), IPS, FLR (solar flare), SEP, MPC, RBE, HSS, notifications.

**Parameters:**
- `type` — Event type: CME, GST, FLR, SEP, notifications (default)
- `start_date` — Start date (YYYY-MM-DD)
- `end_date` — End date (YYYY-MM-DD)

#### `nasa_mars_photos`

Get Mars Rover photos by sol (Mars day) or Earth date.
Rovers: curiosity, opportunity, spirit. Cameras: FHAZ, RHAZ, MAST, CHEMCAM, NAVCAM, etc.

**Parameters:**
- `rover` — Rover name: curiosity (default), opportunity, spirit
- `sol` — Mars sol (day) number
- `earth_date` — Earth date (YYYY-MM-DD). Use sol OR earth_date.
- `camera` — Camera: FHAZ, RHAZ, MAST, CHEMCAM, NAVCAM, etc.

#### `nasa_eonet`

Get Earth natural events from NASA EONET.
Categories: wildfires, severeStorms, volcanoes, seaLakeIce, earthquakes, floods, landslides, etc.

**Parameters:**
- `category` — Event category: wildfires, severeStorms, volcanoes, etc.
- `status` — Status: open (default) or closed
- `limit` — Max events (default 20)

---

### NSF (National Science Foundation)

NSF research award data — search grants by keyword, PI name, institution, and program. Get award details including funding amounts, abstracts, and investigator info. No API key required.

**Workflow:** nsf_awards_search to find research grants → nsf_award_detail for full award info

**Tips:** Use piName for PI searches (last name or 'last, first'). Institution name supports partial matches. fundProgramName filters by NSF program (e.g. 'Computer and Information Science and Engineering').

| Tool | Description | · No auth required |
|------|-------------|---|
| `nsf_awards_search` | Search NSF research awards by keyword, principal investigator, institution, or program. |
| `nsf_award_detail` | Get full details of an NSF research award by award ID. |

#### `nsf_awards_search`

Search NSF research awards by keyword, principal investigator, institution, or program.
Returns award titles, PI names, institutions, funding amounts, and dates.

**Parameters:**
- `keyword` — Search keyword (e.g. 'machine learning', 'climate change', 'quantum computing')
- `piName` — Principal investigator name (last name or 'last, first')
- `institution` — Awardee institution name (e.g. 'MIT', 'Stanford University')
- `program` — NSF fund program name (e.g. 'Computer and Information Science and Engineering')
- `offset` — Result offset for pagination (default 0)
- `limit` — Max results (default 25)

#### `nsf_award_detail`

Get full details of an NSF research award by award ID.
Returns title, PI info, institution, funding, abstract, program, and co-PIs.

**Parameters:**
- `awardId` **(required)** — NSF award ID number (e.g. '2401234')

---

### SBIR/STTR

Small Business Innovation Research (SBIR) and Small Business Technology Transfer (STTR) — search awarded grants and contracts for small business innovation research across federal agencies. No API key required.

**Workflow:** sbir_awards_search to find awards by keyword, agency, company, or year

**Tips:** Search by keyword for technology areas, agency abbreviation (e.g. 'DOD', 'NASA', 'NIH', 'NSF', 'DOE'), company name, or award year. Combine filters to narrow results. Use offset for pagination through large result sets.

| Tool | Description | · No auth required |
|------|-------------|---|
| `sbir_awards_search` | Search SBIR/STTR small business innovation research awards. |

#### `sbir_awards_search`

Search SBIR/STTR small business innovation research awards.
Find government-funded R&D awards by keyword, agency, company, or year.
Covers all federal agencies that participate in SBIR/STTR programs.

Common agencies: DOD, NASA, NIH, NSF, DOE, USDA, EPA, DOT.

Example: keyword='quantum computing', agency='DOD', limit=10

**Parameters:**
- `keyword` — Search keyword (e.g. 'artificial intelligence', 'cybersecurity')
- `agency` — Agency abbreviation (e.g. 'DOD', 'NASA', 'NIH', 'NSF', 'DOE')
- `company` — Company name to search
- `year` — Award year (e.g. 2024)
- `limit` — Number of results (default 20, max 100)
- `offset` — Offset for pagination (default 0)

---

## Security

### CISA KEV (Known Exploited Vulnerabilities)

CISA Known Exploited Vulnerabilities catalog — mandatory remediation deadlines for actively exploited CVEs. Includes vendor, product, description, required action, due date, and ransomware campaign usage.

**Workflow:** cisa_kev_list to get all known exploited vulnerabilities with filtering options.

**Tips:** Returns the full catalog. Filter client-side by vendor, product, or date. Each vulnerability includes cveID, vendorProject, product, vulnerabilityName, dateAdded, shortDescription, requiredAction, dueDate, and knownRansomwareCampaignUse (Known/Unknown).

| Tool | Description | · No auth required |
|------|-------------|---|
| `cisa_kev_list` | Get CISA Known Exploited Vulnerabilities with mandatory federal remediation deadlines. |

#### `cisa_kev_list`

Get CISA Known Exploited Vulnerabilities with mandatory federal remediation deadlines.
Returns all actively exploited CVEs in the catalog.
Each entry includes CVE ID, vendor, product, description, required action, due date, and ransomware usage.
Optional filters narrow results by vendor, product, or date range.

**Parameters:**
- `vendor` — Filter by vendor/project name (case-insensitive partial match): 'Microsoft', 'Apache', 'Cisco'
- `product` — Filter by product name (case-insensitive partial match): 'Windows', 'Chrome', 'Exchange'
- `date_added_after` — Only vulnerabilities added after this date (YYYY-MM-DD)
- `date_added_before` — Only vulnerabilities added before this date (YYYY-MM-DD)
- `ransomware_only` — Only show vulnerabilities with known ransomware campaign use

---

### NVD (National Vulnerability Database)

CVE vulnerability data from NIST's National Vulnerability Database — search and retrieve vulnerability details including CVSS scores, descriptions, affected products, and references. API key optional but recommended for higher rate limits.

**Workflow:** nvd_cve_search to find vulnerabilities by keyword/severity/date → nvd_cve_detail for full CVE details

**Tips:** CVSS severity values: LOW, MEDIUM, HIGH, CRITICAL. Date parameters use ISO 8601 format (e.g. '2024-01-01T00:00:00.000'). Without an API key, rate limit is ~5 requests per 30 seconds. With a key, ~50 per 30 seconds.

| Tool | Description | · Auth: `NVD_API_KEY` |
|------|-------------|---|
| `nvd_cve_search` | Search CVE vulnerabilities in the National Vulnerability Database by keyword, CVSS severity, and date range. |
| `nvd_cve_detail` | Get full details of a CVE vulnerability by its CVE ID. |

#### `nvd_cve_search`

Search CVE vulnerabilities in the National Vulnerability Database by keyword, CVSS severity, and date range.
Returns CVE IDs, descriptions, CVSS scores, severity levels, and publication dates.

Severity values: LOW, MEDIUM, HIGH, CRITICAL

**Parameters:**
- `keyword` — Search keyword (e.g. 'buffer overflow', 'log4j', 'remote code execution')
- `severity` — CVSS V3 severity level
- `pubStartDate` — Publication start date in ISO 8601 (e.g. '2024-01-01T00:00:00.000')
- `pubEndDate` — Publication end date in ISO 8601 (e.g. '2024-12-31T23:59:59.999')
- `limit` — Max results (default 20)

#### `nvd_cve_detail`

Get full details of a CVE vulnerability by its CVE ID.
Returns CVSS scores, attack vectors, affected products (CPE), weaknesses (CWE), and references.

**Parameters:**
- `cveId` **(required)** — CVE identifier (e.g. 'CVE-2021-44228', 'CVE-2024-1234')

---

## Culture

### LOC (Library of Congress)

Library of Congress digital collections: 40M+ items including books, maps, photos, newspapers, manuscripts, audio, film, legislation, and web archives. Includes Chronicling America historical newspaper search. No API key required.

**Workflow:** loc_search for global keyword search → loc_item_detail for full metadata on a specific item → loc_collections to browse collections → loc_browse_format to explore by media type → loc_newspaper_search for historical newspaper full-text search.

**Tips:** Use facets to narrow searches (e.g. by date, subject, location). Collection slugs can be found via loc_collections. Chronicling America covers newspapers from 1777–1963. Format options: audio, books, film-and-videos, maps, photos, newspapers, manuscripts, notated-music, web-archives.

| Tool | Description | · No auth required |
|------|-------------|---|
| `loc_search` | Search the Library of Congress across 40M+ items: books, maps, photos, manuscripts, audio, film, legislation. |
| `loc_collections` | List all Library of Congress digital collections. |
| `loc_collection_browse` | Browse a specific Library of Congress collection. |
| `loc_browse_format` | Browse Library of Congress items by format/media type. |
| `loc_item_detail` | Get full metadata for a Library of Congress item. |
| `loc_newspaper_search` | Full-text search of historical U.S. newspaper pages (Chronicling America, 1777–1963). |
| `loc_newspaper_titles` | Search newspaper titles in Chronicling America. |

#### `loc_search`

Search the Library of Congress across 40M+ items: books, maps, photos, manuscripts, audio, film, legislation.
Examples: 'civil war', 'baseball cards', 'declaration of independence'

**Parameters:**
- `q` **(required)** — Search query
- `facet` — Facet filter (e.g. 'subject:geography', 'location:virginia')
- `page_size` — Results per page (default 25)
- `page` — Page number
- `sort` — Sort order

#### `loc_collections`

List all Library of Congress digital collections.
Returns collection names, descriptions, and item counts.

#### `loc_collection_browse`

Browse a specific Library of Congress collection.
Use loc_collections first to find collection slugs.

**Parameters:**
- `slug` **(required)** — Collection slug (e.g. 'civil-war-maps', 'baseball-cards')
- `q` — Search within the collection
- `page` — Page number

#### `loc_browse_format`

Browse Library of Congress items by format/media type.
Formats: audio, books, film-and-videos, legislation, manuscripts, maps, newspapers, photos, notated-music, web-archives.

**Parameters:**
- `format` **(required)** — Format to browse
- `q` — Search within the format
- `page` — Page number

#### `loc_item_detail`

Get full metadata for a Library of Congress item.
Returns title, subjects, dates, contributors, digital file links, and more.

**Parameters:**
- `id` **(required)** — Item identifier (from search results)

#### `loc_newspaper_search`

Full-text search of historical U.S. newspaper pages (Chronicling America, 1777–1963).
Searches OCR text from digitized newspaper pages.

**Parameters:**
- `text` **(required)** — Full-text search query
- `date_from` — Start date (YYYY or YYYY-MM-DD)
- `date_to` — End date (YYYY or YYYY-MM-DD)
- `state` — U.S. state name (e.g. 'Virginia', 'New York')
- `rows` — Results per page (default 20)
- `page` — Page number

#### `loc_newspaper_titles`

Search newspaper titles in Chronicling America.
Find newspapers by name, state, or city.

**Parameters:**
- `terms` — Search terms for newspaper name
- `state` — U.S. state name
- `city` — City name

---

### Smithsonian Institution

Search 11M+ records across Smithsonian museums and collections, including images, artifacts, and specimens

**Workflow:** smithsonian_search to find records → smithsonian_detail for full record with images

**Tips:** Search supports filtering by museum unit_code (e.g. NASM, NMAH, NMNH). Use freetext queries for broad searches, or filter by date range. Detail view includes high-res image URLs when available.

| Tool | Description | · Auth: `SMITHSONIAN_API_KEY` |
|------|-------------|---|
| `smithsonian_search` | Search Smithsonian Institution collections (11M+ records across all museums). Filter by keyword, museum, date. Returns matching records with basic metadata. |
| `smithsonian_detail` | Get full details of a Smithsonian collection record by ID, including images, provenance, dimensions, and extended metadata. Use smithsonian_search first to find record IDs. |

#### `smithsonian_search`

Search Smithsonian Institution collections (11M+ records across all museums). Filter by keyword, museum, date. Returns matching records with basic metadata.

Covers: National Air and Space Museum, American History, Natural History, American Art, and more.

**Parameters:**
- `query` **(required)** — Search query — keywords, object name, artist, topic. Supports museum unit codes in query (e.g. 'unit_code:NASM airplane')
- `limit` — Max results to return (default: 10, max: 100)
- `offset` — Starting offset for pagination (default: 0)

#### `smithsonian_detail`

Get full details of a Smithsonian collection record by ID, including images, provenance, dimensions, and extended metadata. Use smithsonian_search first to find record IDs.

**Parameters:**
- `id` **(required)** — Smithsonian record ID (from search results)

---

## Employment

### USAJobs (Federal Employment)

Federal job listings from USAJobs.gov — search openings by keyword, location, agency, and salary range. Get full job details including duties, qualifications, and application info.

**Workflow:** usajobs_search to find federal job listings → usajobs_detail for full job posting details

**Tips:** Use agency subelement codes for precise filtering (e.g. 'HE00' for HHS). Salary values are annual. LocationName accepts city/state names. ResultsPerPage max is 500.

| Tool | Description | · Auth: `USAJOBS_API_KEY` |
|------|-------------|---|
| `usajobs_search` | Search federal job listings on USAJobs.gov by keyword, location, agency, and salary range. |
| `usajobs_detail` | Get full details of a federal job listing by its control number. |

#### `usajobs_search`

Search federal job listings on USAJobs.gov by keyword, location, agency, and salary range.
Returns position titles, agencies, locations, salary ranges, and application deadlines.

**Parameters:**
- `keyword` — Search keyword (e.g. 'software engineer', 'data analyst', 'cybersecurity')
- `location` — Location name (e.g. 'Washington, DC', 'Remote', 'California')
- `agency` — Agency subelement code (e.g. 'HE00' for HHS, 'DJ00' for DOJ)
- `minimumPay` — Minimum annual salary
- `maximumPay` — Maximum annual salary
- `limit` — Max results (default 25)

#### `usajobs_detail`

Get full details of a federal job listing by its control number.
Returns duties, qualifications, salary, location, application instructions, and deadlines.

**Parameters:**
- `controlNumber` **(required)** — Job control number from usajobs_search results

---

## Economic

### Bureau of Economic Analysis

U.S. economic statistics: GDP (national/state/industry), personal income, international transactions, fixed assets, multinational enterprises, input-output tables, and more. Covers NIPA, Regional, GDPbyIndustry, ITA, IIP, MNE, FixedAssets, IntlServTrade, InputOutput datasets.

**Workflow:** Use bea_dataset_info to discover datasets/parameters/valid values → then call the appropriate dataset tool (bea_gdp_national, bea_gdp_by_state, etc.)

**Tips:** Key advantages: state-level GDP and income, GDP by NAICS industry, international transactions/investment positions, fixed assets, input-output tables. Rate limit: 100 req/min with 1-hour lockout if exceeded. Use 'LAST5' or specific years instead of 'ALL' to limit data volume.

| Tool | Description | · Auth: `BEA_API_KEY` |
|------|-------------|---|
| `bea_gdp_national` | Get U.S. national GDP data from the NIPA tables. Shows GDP, GDP growth, components (consumption, investment, government, net exports), and deflators. |
| `bea_gdp_by_state` | Get gross domestic product for U.S. states from BEA Regional dataset. |
| `bea_personal_income` | Get personal income data by state from BEA Regional dataset. |
| `bea_gdp_by_industry` | Get GDP contribution by industry sector nationally from BEA GDPbyIndustry dataset. |
| `bea_dataset_info` | Discover BEA datasets, parameters, and valid parameter values. Essential for exploring the BEA API before making data requests. |
| `bea_nipa_underlying_detail` | Get NIPA underlying detail data — more granular national account breakdowns. |
| `bea_fixed_assets` | Get Fixed Assets data — net stock, depreciation, and investment tables. |
| `bea_international_transactions` | Get U.S. international transactions (balance of payments) data. |
| `bea_international_investment` | Get U.S. international investment position (IIP) data. |
| `bea_intl_services_trade` | Get U.S. international trade in services data (annual). |
| `bea_multinational_enterprises` | Get data on Direct Investment (DI) and Activities of Multinational Enterprises (AMNE). |
| `bea_input_output` | Get Input-Output statistics — Make Tables, Use Tables, and Requirements tables. |
| `bea_underlying_gdp_by_industry` | Get Underlying GDP by Industry — more industry detail than the main GDPbyIndustry dataset. |

#### `bea_gdp_national`

Get U.S. national GDP data from the NIPA tables. Shows GDP, GDP growth, components (consumption, investment, government, net exports), and deflators.

Common table names:
- T10101: GDP and major components (real)
- T10106: GDP and major components (nominal)
- T10111: GDP percent change
- T20100: Personal income and its disposition
- T30100: Government receipts and expenditures

**Parameters:**
- `table_name` — NIPA table name (default: T10101 — Real GDP). Other: T10106 (nominal GDP), T10111 (% change), T20100 (personal income)
- `frequency` — Frequency: Q=quarterly (default), A=annual, M=monthly
- `year` — Year(s) to fetch. Use 'X' for all, 'LAST5' for last 5, or specific year. Default: LAST5

#### `bea_gdp_by_state`

Get gross domestic product for U.S. states from BEA Regional dataset.

Table options:
- SAGDP1: State annual GDP summary (default)
- SAGDP9: Real GDP by state
- SQGDP1: State quarterly GDP summary

GeoFips: 'STATE' for all states, or 5-digit FIPS (e.g. '06000' for CA)

**Parameters:**
- `table_name` — Regional table: 'SAGDP1' (annual GDP summary, default), 'SAGDP9' (real GDP), 'SQGDP1' (quarterly GDP summary)
- `geo_fips` — Geography: 'STATE' (all states, default), or state FIPS + '000' (e.g. '06000' for CA, '48000' for TX)
- `line_code` — Line code: '1' (all industry, default), '2' (private), '3' (government)
- `year` — Year(s): 'LAST5' (default), 'LAST10', 'ALL', or comma-separated years

#### `bea_personal_income`

Get personal income data by state from BEA Regional dataset.

Table options:
- SAINC1: Personal income summary (income, population, per capita) — default
- SAINC3: Per capita personal income only
- SAINC4: Personal income by major component (wages, dividends, transfers)

LineCode for SAINC1: 1=personal income, 2=population, 3=per capita income (default)
LineCode for SAINC4: 1=total, 50=wages, 45=dividends/interest/rent, 47=transfer receipts

**Parameters:**
- `table_name` — 'SAINC1' (personal income summary, default), 'SAINC3' (per capita only), 'SAINC4' (by component)
- `geo_fips` — 'STATE' (all states, default), or state FIPS + '000'. 'COUNTY' for all counties, 'MSA' for all metro areas.
- `line_code` — SAINC1: '3' (per capita, default), '1' (personal income), '2' (population). SAINC4: '50' (wages), '45' (property income), '47' (transfers)
- `year` — Year(s): 'LAST5' (default), 'ALL', or comma-separated years

#### `bea_gdp_by_industry`

Get GDP contribution by industry sector nationally from BEA GDPbyIndustry dataset.

TableID options:
- 1: Value added by industry (default)
- 5: Contributions to percent change in real GDP
- 6: Value added percent shares
- 25: Real value added by industry

Industry='ALL' returns all sectors.

**Parameters:**
- `table_id` — Table ID: '1' (value added, default), '5' (contributions to GDP growth), '6' (% shares), '25' (real value added)
- `frequency` — Frequency: A=annual (default), Q=quarterly (not all tables)
- `year` — Year(s): comma-separated or 'ALL'. Default: last 3 complete years
- `industry` — 'ALL' (default), or specific NAICS codes: '11' (agriculture), '21' (mining), '23' (construction), '31-33' (manufacturing), '42' (wholesale), '44-45' (retail), '51' (information), '52' (finance)

#### `bea_dataset_info`

Discover BEA datasets, parameters, and valid parameter values. Essential for exploring the BEA API before making data requests.

Actions:
- list_datasets: List all available BEA datasets
- list_parameters: List parameters for a dataset (requires dataset_name)
- get_values: Get valid values for a parameter (requires dataset_name + parameter_name)
- get_filtered_values: Get values filtered by other params (requires dataset_name + target_parameter + filters)

Datasets: NIPA, NIUnderlyingDetail, FixedAssets, MNE, GDPbyIndustry, Regional, ITA, IIP, InputOutput, UnderlyingGDPbyIndustry, IntlServTrade

**Parameters:**
- `action` **(required)** — What to retrieve: 'list_datasets', 'list_parameters', 'get_values', or 'get_filtered_values'
- `dataset_name` — Dataset name (required except for list_datasets). E.g. 'Regional', 'NIPA', 'GDPbyIndustry', 'ITA', 'IIP', 'MNE', 'FixedAssets', 'IntlServTrade', 'InputOutput'
- `parameter_name` — Parameter name (required for get_values). E.g. 'TableName', 'Year', 'GeoFips', 'LineCode', 'Frequency', 'Indicator'
- `target_parameter` — Target parameter for filtered values (required for get_filtered_values). E.g. 'LineCode' to discover line codes for a given TableName
- `filters` — JSON object of filter params for get_filtered_values. E.g. '{"TableName":"SAINC1"}' to get LineCode values for table SAINC1

#### `bea_nipa_underlying_detail`

Get NIPA underlying detail data — more granular national account breakdowns.

BEA caution: these detailed estimates are lower quality than published aggregates.

Common tables: U20305 (PCE current $), U70205S (auto sales/production monthly), U001A (GDP), U20304 (PCE by type). Use bea_dataset_info to discover all tables.

**Parameters:**
- `table_name` — NIUnderlyingDetail table (default: 'U20305'). Use bea_dataset_info to discover tables.
- `frequency` — A=annual (default), Q=quarterly, M=monthly
- `year` — Year(s): 'LAST5' (default), 'ALL', 'X', or comma-separated years

#### `bea_fixed_assets`

Get Fixed Assets data — net stock, depreciation, and investment tables.

Covers private/government fixed assets, equipment, structures, and IP products.
Annual data only, updated once per year (late August – early October).

Common tables: FAAt101 (current-cost net stock by type), FAAt201 (private equipment), FAAt401 (private nonresidential by industry), FAAt801 (current-cost depreciation).
Use bea_dataset_info to discover all table names.

**Parameters:**
- `table_name` — FixedAssets table name (default: 'FAAt101'). Use bea_dataset_info to discover.
- `year` — Year(s): 'LAST5' (default), 'ALL', 'X', or comma-separated years

#### `bea_international_transactions`

Get U.S. international transactions (balance of payments) data.

Tracks all transactions between U.S. and foreign residents: goods/services trade, current account, financial account, capital transfers.

Indicator examples:
- BalGds: Balance on goods (default)
- BalServ: Balance on services
- BalCurAcct: Current account balance
- ExpGds/ImpGds: Exports/Imports of goods
- PfInvAssets: Portfolio investment assets

Frequency: A=annual, QSA=quarterly seasonally adjusted, QNSA=not adjusted

**Parameters:**
- `indicator` — Transaction type: 'BalGds' (default), 'BalServ', 'BalCurAcct', 'ExpGds', 'ImpGds'. Use bea_dataset_info for full list.
- `area_or_country` — 'AllCountries' (default total), or specific: 'China', 'Canada', 'Mexico', 'Japan', 'Germany'. 'All' for all area/country breakdowns.
- `frequency` — 'A' (annual, default), 'QSA' (quarterly SA), 'QNSA' (quarterly NSA)
- `year` — Year(s): 'ALL' (default), or comma-separated years

#### `bea_international_investment`

Get U.S. international investment position (IIP) data.

Shows end-of-period accumulated stocks of U.S. financial assets and liabilities.

TypeOfInvestment examples:
- FinAssetsExclFinDeriv: U.S. assets excl derivatives (default)
- FinLiabsExclFinDeriv: U.S. liabilities excl derivatives
- DirInvAssets: Direct investment assets
- FinLiabsFoa: Liabilities to foreign official agencies

Component: 'Pos' (position), 'ChgPosTrans' (change from transactions), 'ChgPosPrice' (from price changes), 'ChgPosXRate' (from exchange rates)

**Parameters:**
- `type_of_investment` — 'FinAssetsExclFinDeriv' (default). Use bea_dataset_info for full list.
- `component` — 'Pos' (position, default), 'ChgPosTrans', 'ChgPosPrice', 'ChgPosXRate', or 'All'
- `frequency` — 'A' (annual, default), 'QNSA' (quarterly not seasonally adjusted)
- `year` — Year(s): 'ALL' (default), or comma-separated years

#### `bea_intl_services_trade`

Get U.S. international trade in services data (annual).

IMPORTANT: BEA requires either a specific TypeOfService or a specific AreaOrCountry.
You cannot use 'All' for both simultaneously.

TypeOfService: 'All' (default), or specific: 'Telecom', 'Travel', 'Transport', 'Insurance', 'Financial', 'Comp', 'ChargesForTheUseOfIpNie', etc.
Use bea_dataset_info to discover all values.

TradeDirection: 'All' (default), 'Exports', 'Imports', 'Balance', 'SupplementalIns'

Affiliation: 'All' (default), 'AllAffiliations', 'Affiliated', 'Unaffiliated', 'UsParents', 'UsAffiliates'

**Parameters:**
- `type_of_service` — 'All' (default — all types). Or specific: 'Telecom', 'Travel', 'Transport', etc. Use bea_dataset_info.
- `trade_direction` — 'All' (default), 'Exports', 'Imports', 'Balance', 'SupplementalIns'
- `affiliation` — 'All' (default), 'AllAffiliations', 'Affiliated', 'Unaffiliated', 'UsParents', 'UsAffiliates'
- `area_or_country` — 'AllCountries' (default total), specific country name, or 'All' for all breakdowns.
- `year` — Year(s): 'All' (default for all years), or comma-separated years

#### `bea_multinational_enterprises`

Get data on Direct Investment (DI) and Activities of Multinational Enterprises (AMNE).

DirectionOfInvestment (required):
- 'Outward': U.S. investment abroad / foreign affiliates
- 'Inward': Foreign investment in U.S. / U.S. affiliates
- 'State': U.S. affiliates at state level (AMNE only)
- 'Parent': U.S. parent enterprises (AMNE only)

Classification (required): 'Country', 'Industry', 'CountryByIndustry'

For AMNE stats, also set ownership_level ('0'=majority-owned, '1'=all) and non_bank_affiliates_only ('0'=both, '1'=nonbank only).

**Parameters:**
- `direction_of_investment` **(required)** — 'Outward', 'Inward', 'State', or 'Parent'
- `classification` **(required)** — 'Country', 'Industry', or 'CountryByIndustry'
- `year` **(required)** — Year(s): comma-separated or 'ALL'
- `ownership_level` — '0' (majority-owned only), '1' (all affiliates). Required for AMNE stats.
- `non_bank_affiliates_only` — '0' (bank and nonbank), '1' (nonbank only). Required for AMNE stats.
- `series_id` — Series IDs (comma-separated) or '0' for all. Use bea_dataset_info for list.
- `country` — 3-digit country code(s) or 'all'. '000' for total of all countries.
- `industry` — 4-digit NAICS industry code(s) or 'all'. '0000' for all-industries total.
- `state` — 2-digit state FIPS or 'all'. Only for Direction='State'.

#### `bea_input_output`

Get Input-Output statistics — Make Tables, Use Tables, and Requirements tables.

Shows interrelationships between U.S. producers and users.

Use bea_dataset_info (action='get_values', dataset_name='InputOutput', parameter_name='TableID') to discover available table IDs.

**Parameters:**
- `table_id` **(required)** — Table ID (required). Use bea_dataset_info to discover available tables.
- `year` **(required)** — Year(s): comma-separated or 'ALL'

#### `bea_underlying_gdp_by_industry`

Get Underlying GDP by Industry — more industry detail than the main GDPbyIndustry dataset.

Annual data only, starting from 1997.
BEA caution: quality of these detailed estimates is lower than published aggregates.

Use bea_dataset_info to discover valid TableIDs and Industry codes.

**Parameters:**
- `table_id` — Table ID (default: '210' for value added). Use bea_dataset_info to discover.
- `year` — Year(s): comma-separated, 'ALL', or default last 3 years
- `industry` — 'ALL' (default) or specific NAICS industry codes

---

### Bureau of Labor Statistics

Employment, wages, CPI components, PPI, JOLTS, labor productivity

**Workflow:** bls_search_series to find series IDs → bls_series_data to fetch values

**Tips:** Key advantage over FRED: granular breakdowns (CPI by food/shelter/gas/medical, employment by industry, wages by sector). API key optional but recommended (25 req/day without, 500 with).

| Tool | Description | · Auth: `BLS_API_KEY` |
|------|-------------|---|
| `bls_series_data` | Fetch time series data from the Bureau of Labor Statistics. Returns monthly/quarterly/annual observations for employment, wages, prices, and more. |
| `bls_search_series` | Look up popular BLS series IDs by topic. BLS doesn't have a search API, so this provides curated series IDs for common topics. |
| `bls_cpi_breakdown` | Get a breakdown of Consumer Price Index by component — food, shelter, energy, medical care, transportation, etc. Shows which categories are driving inflation. |
| `bls_employment_by_industry` | Get employment numbers broken down by major industry sector. Shows which sectors are growing or shrinking. |

#### `bls_series_data`

Fetch time series data from the Bureau of Labor Statistics. Returns monthly/quarterly/annual observations for employment, wages, prices, and more.

Popular series IDs:
- CES0000000001: Total nonfarm employment (thousands)
- LNS14000000: Unemployment rate
- CUUR0000SA0: CPI-U All Items
- CES0500000003: Average hourly earnings, total private
- JTS000000000000000JOR: Job openings rate (JOLTS)
- PRS85006092: Nonfarm business labor productivity

Series ID prefixes: CES (jobs by industry), LNS (unemployment), CU (CPI), WP (PPI), OE (wages), JT (JOLTS)

**Parameters:**
- `series_ids` **(required)** — Comma-separated BLS series IDs (max 50). Example: 'CES0000000001,LNS14000000,CUUR0000SA0'
- `start_year` — Start year (default: 3 years ago). Max 20 year range with API key, 10 without.
- `end_year` — End year (default: current year)

#### `bls_search_series`

Look up popular BLS series IDs by topic. BLS doesn't have a search API, so this provides curated series IDs for common topics.

Topics: employment, unemployment, wages, cpi, cpi_components, ppi, productivity, jolts, state_employment

**Parameters:**
- `topic` **(required)** — Topic to look up: 'employment', 'unemployment', 'wages', 'cpi', 'cpi_components', 'ppi', 'productivity', 'jolts', 'state_employment'
- `state` — Two-letter state code for state-level data (e.g., 'CA', 'TX')

#### `bls_cpi_breakdown`

Get a breakdown of Consumer Price Index by component — food, shelter, energy, medical care, transportation, etc. Shows which categories are driving inflation.

**Parameters:**
- `start_year` — Start year (default: 2 years ago)
- `end_year` — End year (default: current year)

#### `bls_employment_by_industry`

Get employment numbers broken down by major industry sector. Shows which sectors are growing or shrinking.

**Parameters:**
- `start_year` — Start year (default: 3 years ago)
- `end_year` — End year (default: current year)

---

### Energy Information Administration

Petroleum, electricity, natural gas prices; state energy profiles; total energy overview

**Workflow:** Pick energy type (petroleum/electricity/gas/state/total) → query with optional state/sector filters

**Tips:** Energy prices drive inflation (BLS CPI energy component), affect policy (Federal Register EOs), and vary hugely by state. Key advantage: granular energy data by fuel, sector, and state.

| Tool | Description | · Auth: `EIA_API_KEY` |
|------|-------------|---|
| `eia_petroleum` | Get petroleum/oil prices — crude oil spot prices (WTI, Brent), retail gasoline prices, diesel, heating oil. |
| `eia_electricity` | Get electricity retail prices, generation, or consumption by state and sector. |
| `eia_natural_gas` | Get natural gas prices — Henry Hub spot price, citygate, residential, commercial, industrial, electric power. |
| `eia_state_energy` | Get state-level energy data from the State Energy Data System (SEDS). Covers production, consumption, expenditures, and prices by energy source for all 50 states. |
| `eia_total_energy` | Get the monthly/annual U.S. energy overview — total production, consumption, imports, exports, and prices across all energy sources. |

#### `eia_petroleum`

Get petroleum/oil prices — crude oil spot prices (WTI, Brent), retail gasoline prices, diesel, heating oil.

Product codes:
- EPCBRENT: Brent crude oil spot price
- EPCWTI: WTI crude oil spot price
- EMM_EPMRU_PTE_NUS_DPG: US regular gasoline retail
- EMM_EPMPU_PTE_NUS_DPG: US premium gasoline retail
- EMD_EPD2D_PTE_NUS_DPG: US diesel retail
- EER_EPJK_PF4_RGC_DPG: US jet fuel spot price

**Parameters:**
- `product` — Product type: 'crude' (default — WTI), 'gasoline', 'diesel', 'all'. Or a specific series ID like 'EPCWTI'
- `frequency` — Frequency (default: monthly)
- `start` — Start date (YYYY-MM or YYYY-MM-DD). Default: 2 years ago
- `end` — End date (YYYY-MM or YYYY-MM-DD). Default: latest available
- `length` — Max rows to return (API max: 5000). Omit to let date range control volume.
- `offset` — Row offset for pagination (use with length)

#### `eia_electricity`

Get electricity retail prices, generation, or consumption by state and sector.

Sectors: residential (RES), commercial (COM), industrial (IND), transportation (TRA), all (ALL).
Data types: 'price' (cents/kWh), 'revenue' (M$), 'sales' (MWh), 'customers'

**Parameters:**
- `state` — Two-letter state code (e.g., 'CA', 'TX'). Omit for national.
- `sector` — Sector: RES=residential, COM=commercial, IND=industrial, ALL=default
- `data_type` — Data type (default: price in cents/kWh)
- `frequency` — Frequency (default: monthly)
- `start` — Start date (YYYY-MM or YYYY). Default: 2 years ago
- `end` — End date (YYYY-MM or YYYY). Default: latest available
- `length` — Max rows (API max: 5000). Omit to let date range control volume.
- `offset` — Row offset for pagination

#### `eia_natural_gas`

Get natural gas prices — Henry Hub spot price, citygate, residential, commercial, industrial, electric power.

Process codes: PRS (citygate), PRP (electric power), PRC (commercial), PRI (industrial), PRR (residential), PNG (Henry Hub spot)

**Parameters:**
- `process` — Price type: 'PRS' (citygate), 'PRP' (electric power), 'PRC' (commercial), 'PRI' (industrial), 'PRR' (residential). Default shows all.
- `frequency` — Frequency (default: monthly)
- `start` — Start date (YYYY-MM). Default: 2 years ago
- `end` — End date (YYYY-MM). Default: latest available
- `length` — Max rows (API max: 5000). Omit to let date range control volume.
- `offset` — Row offset for pagination

#### `eia_state_energy`

Get state-level energy data from the State Energy Data System (SEDS). Covers production, consumption, expenditures, and prices by energy source for all 50 states.

MSN codes (energy data codes):
- TETCB: Total energy consumption (trillion BTU)
- TETCD: Total energy consumption per capita
- TEPRB: Total energy production (trillion BTU)
- ESTCB: Electricity total consumption
- CLTCB: Coal consumption
- NNTCB: Natural gas consumption
- PATCB: Petroleum consumption
- RETCB: Renewable energy consumption
- NUETB: Nuclear energy consumption

**Parameters:**
- `state` — Two-letter state code (e.g., 'CA'). Omit for all states.
- `msn` — MSN energy data code. 'TETCB' (total consumption, default), 'TETCD' (per capita), 'TEPRB' (production), 'RETCB' (renewables), 'PATCB' (petroleum)
- `start` — Start year (YYYY). Default: 5 years ago
- `end` — End year (YYYY). Default: latest available
- `length` — Max rows (API max: 5000). Omit to let date range control volume.
- `offset` — Row offset for pagination

#### `eia_total_energy`

Get the monthly/annual U.S. energy overview — total production, consumption, imports, exports, and prices across all energy sources.

MSN codes:
- ELETPUS: Electricity net generation
- ELNIPUS: Electricity net imports
- CLTCPUS: Coal consumption
- NNTCPUS: Natural gas consumption
- PATCPUS: All petroleum consumption
- RETCPUS: Renewable energy consumption
- NUETPUS: Nuclear electric power

**Parameters:**
- `msn` — MSN code to filter by. Omit for overview of major categories.
- `frequency` — Frequency (default: monthly)
- `start` — Start date (YYYY-MM or YYYY). Default: 2 years ago
- `end` — End date (YYYY-MM or YYYY). Default: latest available
- `length` — Max rows (API max: 5000). Omit to let date range control volume.
- `offset` — Row offset for pagination

---

### FRED (Federal Reserve Economic Data)

800K+ economic time series: GDP, CPI, unemployment, interest rates, money supply, housing

**Workflow:** fred_search → fred_series_data to get values

**Tips:** Popular: GDP, UNRATE, CPIAUCSL, FEDFUNDS, DGS10, MORTGAGE30US, M2SL, SP500

| Tool | Description | · Auth: `FRED_API_KEY` |
|------|-------------|---|
| `fred_search` | Search FRED series by keyword. |
| `fred_series_info` | Get metadata for a FRED series — title, units, frequency, range, notes. |
| `fred_series_data` | Get observations for a FRED series. |
| `fred_release_data` | Bulk fetch a FRED release. |

#### `fred_search`

Search FRED series by keyword.
Examples: 'GDP', 'unemployment', 'CPI', 'mortgage rate'

**Parameters:**
- `query` **(required)** — Keywords
- `limit` — Max results (default 20)

#### `fred_series_info`

Get metadata for a FRED series — title, units, frequency, range, notes.

**Parameters:**
- `series_id` **(required)** — e.g. 'GDP', 'UNRATE', 'CPIAUCSL'

#### `fred_series_data`

Get observations for a FRED series.
Popular: GDP, UNRATE, CPIAUCSL, FEDFUNDS, DGS10, MORTGAGE30US

**Parameters:**
- `series_id` **(required)** — Series ID
- `limit` — Max obs (default 1000)
- `sort_order` — default: desc
- `frequency` — d, w, bw, m, q, sa, a
- `start_date` — YYYY-MM-DD
- `end_date` — YYYY-MM-DD

#### `fred_release_data`

Bulk fetch a FRED release.
Common: 53 (GDP), 50 (Employment), 10 (CPI), 18 (Rates)

**Parameters:**
- `release_id` **(required)** — e.g. 53 (GDP)
- `limit` — Max obs

---

### U.S. Treasury Fiscal Data

National debt, revenue, spending, interest rates, exchange rates, savings bonds, auctions, trust funds — 53 datasets, 181 endpoints

**Workflow:** search_datasets → get_endpoint_fields → query_fiscal_data

**Tips:** No API key required. Use search_datasets to find endpoints by keyword. Use get_endpoint_fields to discover field names before querying. Sort by -record_date for latest data. Use page_size=1 for most recent record. Filter syntax: field:operator:value.

| Tool | Description | · No auth required |
|------|-------------|---|
| `list_datasets` | List all 53 U.S. Treasury Fiscal Data API datasets and their 181 endpoints. Returns dataset name, data table name, API endpoint path, and description. |
| `search_datasets` | Search for Treasury Fiscal Data datasets and endpoints by keyword. Searches across all 53 datasets (181 endpoints) by name, table name, endpoint path, and description. |
| `get_endpoint_fields` | Get field names, data types, and formats for a specific Treasury Fiscal Data API endpoint. This helps you discover what fields are available before querying data. |
| `query_fiscal_data` | Query the U.S. Treasury Fiscal Data API. Supports field selection, filtering, sorting, and pagination. |

#### `list_datasets`

List all 53 U.S. Treasury Fiscal Data API datasets and their 181 endpoints. Returns dataset name, data table name, API endpoint path, and description.

#### `search_datasets`

Search for Treasury Fiscal Data datasets and endpoints by keyword. Searches across all 53 datasets (181 endpoints) by name, table name, endpoint path, and description.

**Parameters:**
- `query` **(required)** — The keyword or phrase to search for (case-insensitive). Examples: 'debt', 'exchange rate', 'gold', 'auction'

#### `get_endpoint_fields`

Get field names, data types, and formats for a specific Treasury Fiscal Data API endpoint. This helps you discover what fields are available before querying data.

**Parameters:**
- `endpoint` **(required)** — The API endpoint path, e.g. '/v2/accounting/od/debt_to_penny' or '/v1/accounting/dts/operating_cash_balance'

#### `query_fiscal_data`

Query the U.S. Treasury Fiscal Data API. Supports field selection, filtering, sorting, and pagination.

Filter operators: eq (equal), gt, gte, lt, lte, in.
Example filter: 'record_date:gte:2024-01-01'
Example sort: '-record_date' (descending)
Multiple filters: 'country_currency_desc:in:(Canada-Dollar,Mexico-Peso),record_date:gte:2024-01-01'

**Parameters:**
- `endpoint` **(required)** — The API endpoint path, e.g. '/v2/accounting/od/debt_to_penny'
- `fields` — Comma-separated list of field names to return. If omitted, all fields are returned. Example: 'record_date,tot_pub_debt_out_amt'
- `filter` — Filter expression. Format: field:operator:value. Multiple: field1:op1:val1,field2:op2:val2. Example: 'record_date:gte:2024-01-01,security_type_desc:eq:Treasury Bills'
- `sort` — Comma-separated list of fields to sort by. Prefix with '-' for descending. Example: '-record_date'
- `page_number` — Page number (1-indexed). Default: 1
- `page_size` — Number of records per page (1-10000). Default: 100

---

## Demographics

### Census Bureau

Population, demographics, income, housing, business data from ACS, Decennial Census

**Workflow:** census_search_variables to find variable codes → census_query with dataset, variables, geography

**Tips:** Common variables: NAME, B01001_001E (population), B19013_001E (median income), B25077_001E (home value). Datasets: 2023/acs/acs1 (1yr), 2023/acs/acs5 (5yr), 2020/dec/pl (Decennial).

| Tool | Description | · Auth: `CENSUS_API_KEY` |
|------|-------------|---|
| `census_query` | Query the U.S. Census Bureau Data API. Supports ACS, Decennial Census, Population Estimates, Economic Census, and more. Returns data for specified variables and geography. |
| `census_population` | Get population data for U.S. states using the American Community Survey. Quick shortcut — for more flexibility use census_query directly. |
| `census_search_variables` | Search for Census variable names/codes by keyword. Helps discover what data is available in a given dataset. Returns variable IDs you can use with census_query. |

#### `census_query`

Query the U.S. Census Bureau Data API. Supports ACS, Decennial Census, Population Estimates, Economic Census, and more. Returns data for specified variables and geography.

Common datasets: '2023/acs/acs1' (1yr), '2023/acs/acs5' (5yr), '2020/dec/pl' (Decennial), '2023/pep/population'
Common variables: NAME, B01001_001E (population), B19013_001E (median income), B25077_001E (home value), B01002_001E (median age)

**Parameters:**
- `dataset` **(required)** — Census dataset path, e.g. '2023/acs/acs1', '2023/acs/acs5', '2020/dec/pl'
- `variables` **(required)** — Comma-separated variable names. Always include NAME. Example: 'NAME,B01001_001E,B19013_001E'
- `for_geo` **(required)** — Geography level and filter. Examples: 'state:*' (all states), 'state:06' (CA), 'county:*'
- `in_geo` — Parent geography for nested queries. Example: 'state:06' to get counties in CA

#### `census_population`

Get population data for U.S. states using the American Community Survey. Quick shortcut — for more flexibility use census_query directly.

**Parameters:**
- `year` — ACS year (default: 2023). Range: 2005-2023.
- `state` — Two-digit FIPS state code, e.g. '06' (CA), '48' (TX), '36' (NY). Omit or '*' for all.

#### `census_search_variables`

Search for Census variable names/codes by keyword. Helps discover what data is available in a given dataset. Returns variable IDs you can use with census_query.

**Parameters:**
- `dataset` **(required)** — Census dataset path, e.g. '2023/acs/acs1'
- `keyword` **(required)** — Keyword to search for, e.g. 'income', 'poverty', 'housing', 'education'
- `max_results` — Maximum results (default: 20)

---

### FEMA

Federal Emergency Management Agency — disaster declarations, emergency/major disaster assistance, NFIP flood insurance claims, housing assistance, public assistance grants. Data since 1953.

**Workflow:** Use fema_disaster_declarations to find disasters by state/year/type → fema_housing_assistance for individual assistance details → fema_public_assistance for PA grants → fema_query for NFIP claims or any other dataset.

**Tips:** State codes are two-letter uppercase (TX, FL, CA). Incident types include Hurricane, Flood, Fire, Severe Storm(s), Tornado, Earthquake, Snow, Biological. Declaration types: DR (Major Disaster), EM (Emergency), FM (Fire Management). Use fema_query with dataset 'nfip_claims' to analyze flood insurance data.

| Tool | Description | · No auth required |
|------|-------------|---|
| `fema_disaster_declarations` | Search FEMA disaster declarations (since 1953). Filter by state, year, incident type, or declaration type. Returns disaster name, type, affected area, programs declared. |
| `fema_housing_assistance` | Get FEMA Individual Housing Program (IHP) assistance data for homeowners. Shows approved assistance amounts, inspections, and damage by county/zip for a disaster. |
| `fema_public_assistance` | Get FEMA Public Assistance (PA) grant awards. Shows project-level grants to state/local/tribal governments and nonprofits for debris removal, emergency work, and permanent repair. |
| `fema_regions` | Get FEMA region boundaries and associated states. 10 FEMA regions cover all U.S. states and territories. |
| `fema_query` | General-purpose query against any OpenFEMA v2 dataset. Use this for NFIP flood insurance claims/policies, hazard mitigation grants, mission assignments, IHP registrations, etc. Supports OData $filter syntax. |

#### `fema_disaster_declarations`

Search FEMA disaster declarations (since 1953). Filter by state, year, incident type, or declaration type. Returns disaster name, type, affected area, programs declared.

**Parameters:**
- `state` — Two-letter state code (e.g. TX, FL, CA)
- `year` — Filter by year of declaration
- `incident_type` — Incident type: Hurricane, Flood, Fire, Severe Storm(s), Tornado, Earthquake, Snow, Biological
- `declaration_type` — DR=Major Disaster, EM=Emergency, FM=Fire Management
- `top` — Max results (default 50)
- `skip` — Number of records to skip for pagination

#### `fema_housing_assistance`

Get FEMA Individual Housing Program (IHP) assistance data for homeowners. Shows approved assistance amounts, inspections, and damage by county/zip for a disaster.

**Parameters:**
- `disaster_number` — FEMA disaster number (from disaster declarations)
- `state` — Two-letter state code
- `county` — County name
- `top` — Max results (default 50)
- `skip` — Number of records to skip

#### `fema_public_assistance`

Get FEMA Public Assistance (PA) grant awards. Shows project-level grants to state/local/tribal governments and nonprofits for debris removal, emergency work, and permanent repair.

**Parameters:**
- `disaster_number` — FEMA disaster number
- `state` — Two-letter state code
- `top` — Max results (default 50)
- `skip` — Number of records to skip

#### `fema_regions`

Get FEMA region boundaries and associated states. 10 FEMA regions cover all U.S. states and territories.

#### `fema_query`

General-purpose query against any OpenFEMA v2 dataset. Use this for NFIP flood insurance claims/policies, hazard mitigation grants, mission assignments, IHP registrations, etc. Supports OData $filter syntax.

**Parameters:**
- `dataset` **(required)** — Dataset key (disaster_declarations, housing_owners, housing_renters, public_assistance, nfip_claims, nfip_policies, hazard_mitigation, mission_assignments, fema_regions, registrations) or raw endpoint name
- `filter` — OData $filter expression (e.g. "state eq 'TX' and yearOfLoss eq '2017'")
- `select` — Comma-separated fields to return (OData $select)
- `order_by` — OData $orderby expression (e.g. 'dateOfLoss desc')
- `top` — Max results (default 50)
- `skip` — Offset for pagination

---

### HUD

Department of Housing and Urban Development — Fair Market Rents (FMR) by bedroom count, Income Limits by household size for counties and metro areas. Essential for affordable housing, Section 8 vouchers, and housing cost analysis.

**Workflow:** Use hud_list_states to get state codes → hud_list_counties to find county FIPS codes → hud_fair_market_rents for rental data → hud_income_limits for income thresholds.

**Tips:** Entity IDs are county FIPS codes (e.g. '0600000001' for a CA county). Use hud_list_counties to find them. State-level tools accept two-letter codes (CA, TX). FMR data shows HUD-determined fair rents used for Section 8 voucher amounts. Income Limits show Very Low, Extremely Low, and Low income thresholds by household size (1-8 persons).

| Tool | Description | · Auth: `HUD_USER_TOKEN` |
|------|-------------|---|
| `hud_fair_market_rents` | Get HUD Fair Market Rents (FMR) for a county, metro area, or entire state. Shows monthly rent by bedroom count (efficiency through 4-bedroom). FMR determines Section 8 voucher amounts. |
| `hud_income_limits` | Get HUD Income Limits for a county, metro area, or entire state. Shows Very Low, Extremely Low, and Low income thresholds by household size (1-8 persons). Used for affordable housing eligibility. |
| `hud_list_states` | List all U.S. states with their HUD state codes. Use these codes with other HUD tools. |
| `hud_list_counties` | List counties in a state with their FIPS codes. Use FIPS codes as entity_id in hud_fair_market_rents and hud_income_limits. |
| `hud_list_metro_areas` | List metropolitan/CBSA areas. CBSA codes can be used as entity_id in HUD tools. |

#### `hud_fair_market_rents`

Get HUD Fair Market Rents (FMR) for a county, metro area, or entire state. Shows monthly rent by bedroom count (efficiency through 4-bedroom). FMR determines Section 8 voucher amounts.

**Parameters:**
- `state` — Two-letter state code for state-wide FMR data (e.g. CA, TX)
- `entity_id` — County FIPS or CBSA code for specific area FMR (get from hud_list_counties)
- `year` — Fiscal year (e.g. 2024). Defaults to current year.

#### `hud_income_limits`

Get HUD Income Limits for a county, metro area, or entire state. Shows Very Low, Extremely Low, and Low income thresholds by household size (1-8 persons). Used for affordable housing eligibility.

**Parameters:**
- `state` — Two-letter state code for state-wide income limits
- `entity_id` — County FIPS or CBSA code (get from hud_list_counties)
- `year` — Fiscal year (e.g. 2024). Defaults to current year.

#### `hud_list_states`

List all U.S. states with their HUD state codes. Use these codes with other HUD tools.

#### `hud_list_counties`

List counties in a state with their FIPS codes. Use FIPS codes as entity_id in hud_fair_market_rents and hud_income_limits.

**Parameters:**
- `state` **(required)** — Two-letter state code (e.g. CA, TX, NY)

#### `hud_list_metro_areas`

List metropolitan/CBSA areas. CBSA codes can be used as entity_id in HUD tools.

---

## Financial

### CFPB (Consumer Financial Protection Bureau)

Consumer complaint database with 13M+ complaints against financial companies. Search by company, product, state, issue, date. Track complaint trends and company response patterns.

**Workflow:** cfpb_suggest_company to find exact name → cfpb_search_complaints for individual complaints → cfpb_complaint_aggregations for counts by field → cfpb_complaint_trends (with lens: overview/product/issue/tags) for time series → cfpb_state_complaints for geographic breakdown → cfpb_complaint_detail for a specific complaint by ID

**Tips:** Products: 'Mortgage', 'Credit reporting...', 'Debt collection', 'Credit card or prepaid card', 'Checking or savings account', 'Student loan', 'Vehicle loan or lease'. States: two-letter codes (CA, TX, NY). Sort: 'created_date_desc' (newest), 'created_date_asc', 'relevance_desc', 'relevance_asc'. Date format: YYYY-MM-DD. Use has_narrative=true for complaints with consumer stories. Trends: lens='overview' for totals, 'product'/'issue'/'tags' for breakdowns. sub_lens for drill-down. Filters: submitted_via (Web/Phone/Postal mail), timely (Yes/No), zip_code. Company names auto-retry with fuzzy search if exact match fails.

| Tool | Description | · No auth required |
|------|-------------|---|
| `cfpb_search_complaints` | Search the CFPB consumer complaint database (13M+ records). |
| `cfpb_complaint_aggregations` | Get complaint counts grouped by a field (product, company, state, issue, etc.). |
| `cfpb_complaint_trends` | Get complaint trends over time using the CFPB Trends API. |
| `cfpb_complaint_detail` | Get full details for a specific complaint by its Complaint ID. |
| `cfpb_state_complaints` | Get complaint information broken down by state (geographic view). |
| `cfpb_suggest_company` | Autocomplete/suggest company names from the CFPB complaint database. |

#### `cfpb_search_complaints`

Search the CFPB consumer complaint database (13M+ records).
Find complaints by company, product, state, issue, date, or keyword.
Returns individual complaints with company responses.
Company names auto-retry with fuzzy search if exact match fails (e.g. 'Wells Fargo' will find 'WELLS FARGO & COMPANY').
Products: 'Mortgage', 'Debt collection', 'Credit card or prepaid card', 'Checking or savings account', 'Student loan', 'Vehicle loan or lease', 'Credit reporting, credit repair services, or other personal consumer reports'.

**Parameters:**
- `search_term` — Free-text search across complaint narratives
- `product` — Financial product: 'Mortgage', 'Debt collection', 'Credit card or prepaid card', etc.
- `company` — Company name: 'Wells Fargo', 'Bank of America', 'Equifax', etc.
- `state` — Two-letter state code: 'CA', 'TX', 'NY'
- `issue` — Issue type: 'Incorrect information on your report', 'Loan modification', etc.
- `date_received_min` — Start date (YYYY-MM-DD): '2020-01-01'
- `date_received_max` — End date (YYYY-MM-DD): '2024-12-31'
- `has_narrative` — Only complaints with consumer narrative text (true/false)
- `submitted_via` — Submission channel
- `timely` — Whether company responded timely
- `zip_code` — Filter by ZIP code
- `tags` — Tag filter
- `size` — Results per page (default 10, max 100)
- `sort` — Sort order

#### `cfpb_complaint_aggregations`

Get complaint counts grouped by a field (product, company, state, issue, etc.).
Useful for ranking companies by complaint volume, identifying top issues, or comparing states.
Aggregation fields: 'product', 'company', 'state', 'issue', 'company_response', 'timely', 'submitted_via', 'tags'.

**Parameters:**
- `field` **(required)** — Field to group by
- `product` — Filter by product: 'Mortgage', 'Debt collection', etc.
- `company` — Filter by company: 'Wells Fargo', 'Bank of America', etc.
- `state` — Filter by state: 'CA', 'TX', 'NY'
- `issue` — Filter by issue type
- `date_received_min` — Start date (YYYY-MM-DD)
- `date_received_max` — End date (YYYY-MM-DD)

#### `cfpb_complaint_trends`

Get complaint trends over time using the CFPB Trends API.
Uses dedicated /trends endpoint with lens-based aggregation.
REQUIRED: trend_interval ('month', 'quarter', or 'year') — the API rejects requests without it.
Lens options: 'overview' (total counts), 'product' (by product), 'issue' (by issue), 'tags' (by tag).
Sub-lens allows drilling into sub-categories within the lens.

**Parameters:**
- `lens` — Trend lens (default: overview)
- `trend_interval` **(required)** — Time bucket size for trend aggregation: 'month', 'quarter', or 'year'
- `sub_lens` — Sub-lens drill-down
- `sub_lens_depth` — Top N sub-aggregations to return (default 10)
- `focus` — Focus charts on a specific product or company name
- `product` — Financial product: 'Mortgage', 'Debt collection', etc.
- `company` — Company name: 'Wells Fargo', 'Equifax', etc.
- `state` — Two-letter state code: 'CA', 'TX', 'NY'
- `issue` — Issue type filter
- `date_received_min` — Start date (YYYY-MM-DD)
- `date_received_max` — End date (YYYY-MM-DD)

#### `cfpb_complaint_detail`

Get full details for a specific complaint by its Complaint ID.
Returns all fields: product, issue, company, narrative (if consented), response, dates, etc.

**Parameters:**
- `complaint_id` **(required)** — CFPB Complaint ID number

#### `cfpb_state_complaints`

Get complaint information broken down by state (geographic view).
Returns complaint counts and data for each state. Useful for maps and state comparisons.
Applies the same filters as search (product, company, date, etc.).

**Parameters:**
- `product` — Filter by product: 'Mortgage', 'Debt collection', etc.
- `company` — Filter by company: 'Wells Fargo', etc.
- `issue` — Filter by issue type
- `date_received_min` — Start date (YYYY-MM-DD)
- `date_received_max` — End date (YYYY-MM-DD)
- `tags` — Tag filter

#### `cfpb_suggest_company`

Autocomplete/suggest company names from the CFPB complaint database.
Useful for finding the exact company name before searching complaints.

**Parameters:**
- `text` **(required)** — Partial company name to search: 'wells', 'bank of', 'equi'
- `size` — Max suggestions (default 10)

---

### CFTC (Commodity Futures Trading Commission)

Commitments of Traders (COT) reports from the CFTC. Weekly position data for futures and options markets: commercial vs speculative positions, producer/merchant/processor/user breakdowns, asset manager and leveraged fund positions. Covers all U.S. futures exchanges.

**Workflow:** cftc_products to find available markets/commodities → cftc_cot_legacy for traditional commercial/non-commercial breakdown → cftc_cot_disaggregated for producer/merchant/swap dealer/managed money breakdown → cftc_cot_tff for financial futures (asset manager/leveraged/dealer) → cftc_cot_cit for supplemental commodity index trader data

**Tips:** Data updates weekly (Tuesday snapshot, Friday release). Use market_name to filter by commodity/market (e.g. 'WHEAT', 'CRUDE OIL', 'S&P 500'). futures_only=true for futures-only reports, false for combined futures+options. Legacy report is simplest (commercial vs non-commercial). Disaggregated breaks out producer/merchant, swap dealer, managed money, other reportables. TFF is for financial futures only. CIT supplements legacy with commodity index trader positions. Limit defaults to 100, max 50000.

| Tool | Description | · No auth required |
|------|-------------|---|
| `cftc_cot_legacy` | Get Legacy Commitments of Traders (COT) report data from CFTC. |
| `cftc_cot_disaggregated` | Get Disaggregated Commitments of Traders (COT) report data from CFTC. |
| `cftc_cot_tff` | Get Traders in Financial Futures (TFF) report data from CFTC. |
| `cftc_cot_cit` | Get Supplemental Commodity Index Trader (CIT) report data from CFTC. |
| `cftc_products` | List available products and markets tracked by CFTC. |

#### `cftc_cot_legacy`

Get Legacy Commitments of Traders (COT) report data from CFTC.
Shows commercial vs non-commercial (speculative) positions in futures markets.
Covers all U.S. futures exchanges: commodities, financials, currencies.
Use futures_only=true for futures-only, false for combined futures+options.

**Parameters:**
- `futures_only` — true = futures only (default), false = combined futures+options
- `market_name` — Filter by market/commodity name: 'WHEAT', 'CRUDE OIL', 'S&P 500', 'GOLD'
- `limit` — Max rows to return (default 100, max 50000)
- `offset` — Offset for pagination

#### `cftc_cot_disaggregated`

Get Disaggregated Commitments of Traders (COT) report data from CFTC.
Breaks positions into: Producer/Merchant/Processor/User, Swap Dealers, Managed Money, Other Reportables.
More granular than Legacy report. Covers physical commodities (not financial futures).

**Parameters:**
- `futures_only` — true = futures only (default), false = combined futures+options
- `market_name` — Filter by market/commodity: 'NATURAL GAS', 'CORN', 'SOYBEANS'
- `limit` — Max rows (default 100, max 50000)
- `offset` — Offset for pagination

#### `cftc_cot_tff`

Get Traders in Financial Futures (TFF) report data from CFTC.
Covers financial futures only: Dealer/Intermediary, Asset Manager/Institutional, Leveraged Funds, Other Reportables.
Use for S&P 500, Treasury bonds, Eurodollars, VIX, currency futures.

**Parameters:**
- `futures_only` — true = futures only (default), false = combined futures+options
- `market_name` — Filter by market: 'S&P 500', 'UST 10Y NOTE', 'VIX', 'EURO FX'
- `limit` — Max rows (default 100, max 50000)
- `offset` — Offset for pagination

#### `cftc_cot_cit`

Get Supplemental Commodity Index Trader (CIT) report data from CFTC.
Supplements the Legacy report with positions of Commodity Index Traders.
Covers 13 selected agricultural commodity markets only.

**Parameters:**
- `market_name` — Filter by market: 'WHEAT', 'CORN', 'SOYBEANS', 'COTTON', 'SUGAR'
- `limit` — Max rows (default 100, max 50000)
- `offset` — Offset for pagination

#### `cftc_products`

List available products and markets tracked by CFTC.
Use to discover market names before querying COT reports.
Search by keyword to find specific commodities, currencies, or financial instruments.

**Parameters:**
- `search` — Search keyword: 'wheat', 'crude', 'treasury', 'euro'

---

### FDIC (Federal Deposit Insurance Corporation)

Bank data for 5,000+ FDIC-insured institutions — search banks, failures since 1934, quarterly financials, branch-level deposits, merger/charter history. Filter by state, assets, charter type.

**Workflow:** fdic_search_institutions to find banks → fdic_financials for Call Report data → fdic_failures for failed banks → fdic_deposits for branch deposits

**Tips:** Filter syntax: STALP:"CA" (state), ACTIVE:1 (active), ASSET:[1000000 TO *] (assets > $1B in thousands), INSTNAME:"Wells Fargo" (name). Combine with AND: STALP:"TX" AND ACTIVE:1. Assets/deposits are in thousands of dollars. Sort by ASSET DESC for largest banks.

| Tool | Description | · No auth required |
|------|-------------|---|
| `fdic_search_institutions` | Search FDIC-insured banks and savings institutions. |
| `fdic_failures` | Get FDIC-insured bank failures — all failures since 1934. |
| `fdic_financials` | Get quarterly Call Report financial data for FDIC-insured banks. |
| `fdic_summary` | Get aggregate banking statistics — industry totals by state or charter type. |
| `fdic_deposits` | Get Summary of Deposits — branch-level deposit data from annual survey (June 30). |
| `fdic_history` | Get institution event history — mergers, acquisitions, name changes, charter conversions. |

#### `fdic_search_institutions`

Search FDIC-insured banks and savings institutions.
Filter by state, name, charter type, asset size, active status.
Filters: STALP:"CA", ACTIVE:1, ASSET:[1000000 TO *], INSTNAME:"Wells Fargo", CHARTER_CLASS:"N".
Assets and deposits are in thousands of dollars.

**Parameters:**
- `filters` — Lucene-style filter: 'STALP:"CA" AND ACTIVE:1', 'ASSET:[1000000 TO *]'
- `search` — Free-text search across institution names
- `fields` — Comma-separated fields to return: 'INSTNAME,STALP,ASSET,DEP,NETINC'
- `sort_by` — Sort field: 'ASSET', 'DEP', 'INSTNAME', 'NETINC'
- `sort_order` — Sort direction
- `limit` — Max results (default 25, max 100)
- `offset` — Pagination offset

#### `fdic_failures`

Get FDIC-insured bank failures — all failures since 1934.
Includes failure date, estimated cost to FDIC, resolution type, and acquiring institution.
Filter by state: PSTALP:"GA", by year range, or combine filters.

**Parameters:**
- `filters` — Lucene-style filter: 'PSTALP:"GA"', 'FAILDATE:[2008-01-01 TO 2010-12-31]'
- `sort_by` — Sort field: 'FAILDATE' (default), 'COST', 'QBFASSET'
- `sort_order` — Sort direction
- `limit` — Max results (default 25, max 100)
- `offset` — Pagination offset

#### `fdic_financials`

Get quarterly Call Report financial data for FDIC-insured banks.
Includes assets, deposits, net income, ROA, ROE, loan loss reserves.
Filter by CERT number (specific bank) or STALP (state). Dollar values in thousands.

**Parameters:**
- `filters` — Filter: 'CERT:3511' (specific bank), 'STALP:"CA"', 'REPDTE:20240331' (quarter)
- `fields` — Fields: 'CERT,INSTNAME,REPDTE,ASSET,DEP,NETINC,ROA,ROE'
- `sort_by` — Sort field: 'REPDTE' (default), 'ASSET', 'NETINC'
- `sort_order` — Sort direction
- `limit` — Max results (default 25)
- `offset` — Pagination offset

#### `fdic_summary`

Get aggregate banking statistics — industry totals by state or charter type.
Useful for overview metrics: total banks, deposits, assets by state/year.

**Parameters:**
- `filters` — Filter: 'STALP:"TX"', 'YEAR:2023'
- `fields` — Fields to return
- `sort_by` — Sort field
- `sort_order` — Sort direction
- `limit` — Max results (default 25)
- `offset` — Pagination offset

#### `fdic_deposits`

Get Summary of Deposits — branch-level deposit data from annual survey (June 30).
Shows deposit amounts at each bank branch. Filter by state or institution.
Useful for market share analysis and banking access by geography.

**Parameters:**
- `filters` — Filter: 'STALP:"NY"', 'CERT:3511', 'CITY:"New York"'
- `sort_by` — Sort field: 'DEPSUMBR' (branch deposits), 'INSTNAME'
- `sort_order` — Sort direction
- `limit` — Max results (default 25)
- `offset` — Pagination offset

#### `fdic_history`

Get institution event history — mergers, acquisitions, name changes, charter conversions.
Filter by CERT number to trace a specific bank's history.

**Parameters:**
- `filters` — Filter: 'CERT:3511', 'PSTALP:"CA"'
- `sort_by` — Sort field: 'EFFDATE' (effective date)
- `sort_order` — Sort direction
- `limit` — Max results (default 25)
- `offset` — Pagination offset

---

### OpenFEC (Federal Election Commission)

Campaign finance: candidates, committees, contributions, expenditures

**Workflow:** fec_search_candidates → fec_candidate_financials for PAC totals → fec_search_committees(committee_type='Q', name='Company Name') to find industry PACs → fec_committee_disbursements(committee_id, recipient_name='Politician Last Name') for direct money trail

**Tips:** Office codes: 'H' (House), 'S' (Senate), 'P' (President). Party: 'DEM', 'REP', 'LIB', 'GRE'. To trace industry money to politicians: (1) search committees by company name with type Q to find PAC IDs, (2) query disbursements with recipient_name filter. Try multiple cycles. Common banking PACs: C00004275 (ABA), C00034595 (Wells Fargo), C00008474 (Citigroup), C00350744 (Goldman Sachs), C00364778 (Bank of America). Common pharma PACs: C00016683 (Pfizer), C00097485 (Merck).

| Tool | Description | · Auth: `DATA_GOV_API_KEY` |
|------|-------------|---|
| `fec_search_candidates` | Search for federal election candidates by name, state, party, office, or election year. Data from the Federal Election Commission (FEC). |
| `fec_search_committees` | Search for political committees (PACs, campaign committees, party committees) by name, state, or type. |
| `fec_candidate_financials` | Get financial summary for a candidate — total raised, spent, cash on hand, debt. Requires a candidate_id (use fec_search_candidates to find one). |
| `fec_committee_financials` | Get financial totals for a committee (PAC, campaign, party). Requires a committee_id (use fec_search_committees to find one). |
| `fec_top_candidates` | Get top candidates ranked by total money raised for a given office and election cycle. |
| `fec_committee_disbursements` | Get itemized disbursements from a PAC or committee — shows exactly which candidates and committees received money, how much, and when. |

#### `fec_search_candidates`

Search for federal election candidates by name, state, party, office, or election year. Data from the Federal Election Commission (FEC).

**Parameters:**
- `name` — Candidate name to search for
- `state` — Two-letter state code, e.g. 'CA', 'TX', 'NY'
- `party` — Three-letter party code: 'DEM', 'REP', 'LIB', 'GRE', etc.
- `office` — Office: H=House, S=Senate, P=President
- `election_year` — Election year, e.g. 2024
- `page` — Page number (default: 1)
- `per_page` — Results per page (default: 20, max: 100)

#### `fec_search_committees`

Search for political committees (PACs, campaign committees, party committees) by name, state, or type.
CRITICAL for investigations: Use committee_type='Q' (Qualified PAC) + name='Company Name' to find corporate PAC IDs.
Example: name='Wells Fargo', committee_type='Q' returns C00034595 (Wells Fargo Employee PAC).
Then use fec_committee_disbursements with the committee_id to trace money to specific politicians.

**Parameters:**
- `name` — Committee name to search for
- `state` — Two-letter state code
- `committee_type` — Committee type: 'P' (Presidential), 'H' (House), 'S' (Senate), 'N' (PAC - Nonqualified), 'Q' (PAC - Qualified), 'X' (Party - Nonqualified), 'Y' (Party - Qualified), 'I' (Independent Expenditor), 'O' (Super PAC)
- `cycle` — Two-year election cycle, e.g. 2024
- `page` — Page number (default: 1)
- `per_page` — Results per page (default: 20)

#### `fec_candidate_financials`

Get financial summary for a candidate — total raised, spent, cash on hand, debt. Requires a candidate_id (use fec_search_candidates to find one).

**Parameters:**
- `candidate_id` **(required)** — FEC candidate ID, e.g. 'P80001571' (Trump), 'P80000722' (Harris)
- `cycle` — Two-year election cycle, e.g. 2024

#### `fec_committee_financials`

Get financial totals for a committee (PAC, campaign, party). Requires a committee_id (use fec_search_committees to find one).

**Parameters:**
- `committee_id` **(required)** — FEC committee ID, e.g. 'C00703975'
- `cycle` — Two-year election cycle, e.g. 2024

#### `fec_top_candidates`

Get top candidates ranked by total money raised for a given office and election cycle.

**Parameters:**
- `office` **(required)** — Office: H=House, S=Senate, P=President
- `election_year` **(required)** — Election year, e.g. 2024
- `state` — Two-letter state code to filter by
- `per_page` — Number of results (default: 20)

#### `fec_committee_disbursements`

Get itemized disbursements from a PAC or committee — shows exactly which candidates and committees received money, how much, and when.
This is the KEY tool for conflict-of-interest investigations: trace direct money from named industry PACs to named politicians.
Example: fec_committee_disbursements(committee_id='C00004275', cycle=2018, recipient_name='Crapo') shows ABA BankPAC donations to Sen. Crapo.
WORKFLOW: (1) fec_search_committees(name='Company', committee_type='Q') to find PAC ID, (2) this tool with recipient_name filter.
Try multiple cycles (election year ± 1 cycle) since PACs often give early.
Common PAC IDs: ABA BankPAC=C00004275, Wells Fargo=C00034595, Citigroup=C00008474, Goldman Sachs=C00350744, Pfizer=C00016683, Merck=C00097485.

**Parameters:**
- `committee_id` **(required)** — FEC committee ID (e.g. 'C00016683' for Pfizer PAC). Get from fec_search_committees.
- `cycle` — Election cycle year (e.g. 2024, 2026). Must be even year.
- `recipient_name` — Filter to specific recipient: 'Pelosi', 'McConnell', 'NRCC', 'DSCC'
- `per_page` — Results per page (default 20)

---

### SEC EDGAR

Company filings, financial data (XBRL), and full-text search across SEC EDGAR

**Workflow:** sec_filing_search to find companies/CIKs → sec_company_search for details → sec_company_financials for XBRL data

**Tips:** No API key required. Rate limit: 10 req/sec. CIK numbers must be looked up first — use sec_filing_search to find them by company name.

| Tool | Description | · No auth required |
|------|-------------|---|
| `sec_company_search` | Look up a company on SEC EDGAR by CIK number. Returns company name, tickers, SIC code, state, and recent filings list. |
| `sec_company_financials` | Get financial data (revenue, net income, assets, etc.) from SEC XBRL filings for a company. Returns standardized financial data extracted from 10-K and 10-Q filings. |
| `sec_filing_search` | Full-text search across all SEC EDGAR filings. Search by company name, keyword, or topic. |

#### `sec_company_search`

Look up a company on SEC EDGAR by CIK number. Returns company name, tickers, SIC code, state, and recent filings list.

Common CIK numbers:
- Apple: 0000320193
- Microsoft: 0000789019
- Amazon: 0001018724
- Lockheed Martin: 0000936468
- Raytheon (RTX): 0000101829
- Boeing: 0000012927

To find CIK: search by company name using sec_filing_search.

**Parameters:**
- `cik` **(required)** — 10-digit CIK number (e.g., '0000320193' for Apple). Leading zeros optional.

#### `sec_company_financials`

Get financial data (revenue, net income, assets, etc.) from SEC XBRL filings for a company. Returns standardized financial data extracted from 10-K and 10-Q filings.

Requires CIK number. Use sec_company_search to look up filings first.

Common XBRL concepts: Revenues, NetIncomeLoss, Assets, Liabilities, StockholdersEquity, EarningsPerShareBasic, CashAndCashEquivalentsAtCarryingValue

**Parameters:**
- `cik` **(required)** — 10-digit CIK number (e.g., '0000320193' for Apple)
- `metric` — Specific XBRL concept to retrieve (e.g., 'Revenues', 'NetIncomeLoss', 'Assets'). Omit to get a summary of available key metrics.

#### `sec_filing_search`

Full-text search across all SEC EDGAR filings. Search by company name, keyword, or topic.

Form types: 10-K (annual), 10-Q (quarterly), 8-K (current events), DEF 14A (proxy), S-1 (IPO registration)

**Parameters:**
- `query` **(required)** — Search query — company name, keyword, or topic
- `forms` — Comma-separated form types to filter: '10-K', '10-Q', '8-K', 'DEF 14A', 'S-1'
- `start_date` — Start date YYYY-MM-DD
- `end_date` — End date YYYY-MM-DD

---

### Senate Lobbying Disclosures

Lobbying filings, expenditures, activities, and campaign contributions — who is lobbying Congress, on what issues, and how much they're spending

**Workflow:** lobbying_search to find filings by company/issue → lobbying_detail for specific bills lobbied → lobbying_contributions for campaign donations by lobbyists. For conflict-of-interest investigations: search by trade group AND individual companies to get total industry lobbying spend across 3+ years around a vote.

**Tips:** Search by registrant_name (lobbying firm or self-filer like 'Pfizer'), client_name (who hired the lobbyist), or issue_code (TAX, HCR, DEF, etc.). Filing types: Q1-Q4 (quarterly), RN (new registration). Expenses are in dollars. No API key required. KEY TRADE GROUPS: 'American Bankers Association' (banking), 'PhRMA' or 'Pharmaceutical Research' (pharma), 'American Petroleum Institute' (oil/gas), 'National Association of Realtors' (real estate). Always search BOTH the trade group AND individual companies for a complete lobbying picture.

| Tool | Description | · No auth required |
|------|-------------|---|
| `lobbying_search` | Search lobbying disclosure filings — find out who is lobbying Congress, on what issues, and how much they're spending. |
| `lobbying_detail` | Get full detail on a specific lobbying filing — shows every issue lobbied, specific bills mentioned, and lobbyist names. |
| `lobbying_contributions` | Search campaign contributions made by lobbyists — shows which lobbyists donated to which politicians. |
| `lobbying_registrants` | Search lobbying firms and organizations registered to lobby Congress. |
| `lobbying_lobbyists` | Search individual lobbyists by name or firm. |

#### `lobbying_search`

Search lobbying disclosure filings — find out who is lobbying Congress, on what issues, and how much they're spending.

Search by:
- registrant_name: lobbying firm or self-filing org ('Pfizer', 'Amazon', 'National Rifle Association')
- client_name: who hired the lobbyist ('Google', 'ExxonMobil')
- issue_code: policy area ('TAX', 'HCR' health, 'DEF' defense, 'ENV' environment, 'ENG' energy, 'IMM' immigration)
- filing_year: year of filing (2020-2026)

Returns expenses/income amounts, issues lobbied, and registrant/client info.

**Parameters:**
- `registrant_name` — Lobbying firm or organization: 'Pfizer', 'Amazon', 'US Chamber of Commerce'
- `client_name` — Client who hired the lobbyist: 'Google', 'Meta', 'Boeing'
- `issue_code` — Issue area code: 'HCR' (Health Issues), 'MMM' (Medicare/Medicaid), 'TAX' (Taxation/Internal Revenue Code), 'BUD' (Budget/Appropriations), 'DEF' (Defense), 'ENV' (Environment/Superfund), 'ENG' (Energy/Nuclear), 'TRD' (Trade (Domestic/Foreign)), ... (20 total)
- `filing_year` — Year: 2020-2026
- `filing_type` — Filing type: 'Q1' (1st Quarter Report), 'Q2' (2nd Quarter Report), 'Q3' (3rd Quarter Report), 'Q4' (4th Quarter Report), 'MM' (Mid-Year Report), 'MY' (Year-End Report), 'RN' (Registration (New)), 'RA' (Registration Amendment), 'RR' (Registration Renewal), 'TE' (Termination)
- `page_size` — Results per page (default 20)

#### `lobbying_detail`

Get full detail on a specific lobbying filing — shows every issue lobbied, specific bills mentioned, and lobbyist names.
Use the filing UUID from lobbying_search results.

**Parameters:**
- `filing_uuid` **(required)** — Filing UUID from lobbying_search results

#### `lobbying_contributions`

Search campaign contributions made by lobbyists — shows which lobbyists donated to which politicians.
Required under the LDA to disclose political contributions by registered lobbyists.

**Parameters:**
- `filing_year` — Year: 2020-2026
- `registrant_name` — Lobbying firm name
- `lobbyist_name` — Individual lobbyist name
- `page_size` — Results per page (default 20)

#### `lobbying_registrants`

Search lobbying firms and organizations registered to lobby Congress.

**Parameters:**
- `name` **(required)** — Registrant name: 'Amazon', 'Pfizer', 'National Rifle Association'
- `page_size` — Results per page (default 20)

#### `lobbying_lobbyists`

Search individual lobbyists by name or firm.
Find specific people who lobby Congress and which firms they work for.

**Parameters:**
- `name` — Lobbyist name (partial match): 'Smith', 'Johnson'
- `firm` — Lobbying firm name: 'Akin Gump', 'K Street'
- `page_size` — Results per page (default 20)

---

## Legislative

### Congress.gov

Bills, votes, members, laws, amendments, committee data, hearings, reports, prints, meetings, nominations, treaties, CRS reports, Congressional Record (daily & bound), and House/Senate communications from Congress.gov. House votes use Congress.gov API (118th+) with clerk.house.gov fallback (1990+). Senate votes from senate.gov (101st/1989+).

**Workflow:** congress_search_bills → congress_bill_details for sponsors/cosponsors/status → congress_house_votes or congress_senate_votes for party-line breakdown → congress_hearings or congress_committee_meetings for oversight activity → congress_committee_reports for committee analysis → cross-reference with FEC (donors), lobbying_search (who lobbied), and FRED (economic impact)

**Tips:** Congress numbers: 119th (2025-2026), 118th (2023-2024), 117th (2021-2022). Bill types: hr, s, hjres, sjres, hconres, sconres, hres, sres. House votes: use year param for historical (1990+). Senate votes: 101st Congress (1989) to present. Report types: hrpt (House), srpt (Senate), erpt (Executive). House communication types: ec, ml, pm, pt. Senate communication types: ec, pm, pom. Always compare House and Senate votes on the same bill to reveal bicameral differences. For accountability investigations: use congress_member_details to get committee assignments, congress_hearings for oversight activity, congress_committee_reports for legislative record, then cross-reference with FEC disbursements and lobbying spend.

| Tool | Description | · Auth: `DATA_GOV_API_KEY` |
|------|-------------|---|
| `congress_search_bills` | Search for bills in Congress by keyword, congress number, or bill type. Returns bill number, title, sponsor, latest action, and status. |
| `congress_bill_details` | Get detailed information about a specific bill including sponsors, cosponsors with party breakdown, actions, committees, and current status. |
| `congress_search_members` | Search for members of Congress by state, congress number, district, or get all current members. Supports: /member (all), /member/{stateCode} (by state), /member/{stateCode}/{district} (by district), /member/congress/{congress} (by congress), /member/congress/{congress}/{stateCode}/{district} (combined). |
| `congress_house_votes` | Get House of Representatives roll call vote results with member-level party breakdown. Primary source: Congress.gov API (118th-119th Congress); falls back to clerk.house.gov XML for older congresses. Coverage: 1990 to present. Use year param for historical votes. Cross-reference with: congress_senate_votes (same bill's Senate vote), FEC (congress_member donors via fec_candidate_financials), lobbying_search (who lobbied on the bill), FRED (economic impact 1-3 years after passage). For Senate votes, use congress_senate_votes. |
| `congress_senate_votes` | Get Senate roll call vote results from senate.gov XML. Shows how senators voted by party on specific legislation, nominations, and procedural motions. Coverage: 101st Congress (1989) to present. Cross-reference with: congress_house_votes (same bill's House vote), FEC (senator donors via fec_candidate_financials), lobbying_search (who lobbied on the bill), congress_member_bills (senator's voting vs sponsoring patterns). For House votes, use congress_house_votes. |
| `congress_recent_laws` | Get recently enacted laws (bills signed by the President). Optionally filter by law type (public or private). Shows what legislation has become law. |
| `congress_member_bills` | Get bills sponsored or cosponsored by a specific member of Congress. Requires the member's BioGuide ID (use congress_search_members to find it). |
| `congress_bill_actions` | Get the full action history / timeline for a bill — every step from introduction through committee, floor votes, amendments, and signing. Shows recorded roll-call vote numbers when available. |
| `congress_bill_amendments` | Get amendments filed on a specific bill. Shows amendment sponsors, purposes, and status. Critical for tracking how bills are modified (e.g., 'gutted and replaced'). |
| `congress_bill_summaries` | Get CRS (Congressional Research Service) summaries of a bill. These are plain-English, non-partisan summaries written by CRS analysts. Multiple versions may exist (as introduced, as reported, as passed). |
| `congress_bill_text` | Get available text versions for a bill (e.g., introduced, reported, engrossed, enrolled). Returns version types and format URLs. For full bill text content, use govinfo_bill_text. |
| `congress_bill_related` | Find related/companion bills. Identifies House-Senate companion bills, identical bills, and bills with related provisions. Useful for tracking legislation across chambers. |
| `congress_bill_subjects` | Get legislative subjects tagged on a bill, plus the primary policy area. Useful for finding all bills on a topic and for cross-referencing with lobbying data. |
| `congress_bill_committees` | Get committees a bill was referred to, with activity dates. Shows which committees had jurisdiction and what actions they took (referral, hearings, markup, reporting). |
| `congress_bill_titles` | Get all titles for a bill — short titles, official titles, display titles, and titles as they appeared in different text versions. Useful for finding the popular name of legislation (e.g., 'Inflation Reduction Act'). |
| `congress_bill_cosponsors` | Get the full list of cosponsors for a bill with party affiliation and sponsorship dates. Returns individual cosponsor details unlike congress_bill_details which only provides a party breakdown summary. |
| `congress_member_details` | Get detailed information about a specific member of Congress by BioGuide ID. Returns full bio, party history, all terms served, committee assignments, photo URL, and official website. |
| `congress_committees` | List congressional committees. Filter by congress number and/or chamber (house, senate, joint). Returns committee name, system code, and chamber. |
| `congress_committee_bills` | Get bills referred to a specific committee. Use congress_committees to find the committee system code. Useful for tracking which bills die in committee vs. get reported out. |
| `congress_committee_details` | Get detailed information about a specific congressional committee by chamber and committee code. Returns full history, website URL, subcommittees, bill/report counts, and related communications. |
| `congress_amendments` | Search/list amendments by congress and optional type (hamdt = House, samdt = Senate, suamdt = Senate Unnumbered). Returns amendment number, type, sponsor, purpose, and status. |
| `congress_amendment_details` | Get detailed information about a specific amendment, including its actions/timeline. Requires congress number, amendment type (hamdt/samdt), and amendment number. |
| `congress_nominations` | List presidential nominations to federal offices (judges, cabinet, ambassadors, agency heads). Shows nominee name, position, organization, and confirmation status. |
| `congress_nomination_details` | Get detailed information about a specific presidential nomination, including all actions (committee referral, hearing, vote, confirmation/rejection). |
| `congress_treaties` | List treaties submitted to the Senate. Shows treaty topic, date transmitted, and ratification status. |
| `congress_treaty_details` | Get detailed information about a specific treaty, including all Senate actions (committee referral, hearings, ratification vote). |
| `congress_crs_reports` | Get Congressional Research Service reports — authoritative, nonpartisan analysis on legislative topics. CRS reports are considered the gold standard for policy research. |
| `congress_crs_report_details` | Get detailed information about a specific CRS report by report number/ID. Returns full summary, authors, topics, related legislation, and format links (PDF, etc.). |
| `congress_summaries_search` | Search bill summaries across all bills and congresses. Unlike congress_bill_summaries (which requires a specific bill), this searches CRS summaries across the entire collection. Filter by congress, bill type, and date range. Sorted by last update date. Results include the associated bill reference. |
| `congress_info` | Get information about congresses and their sessions — start/end dates, session numbers, and chambers. Use to look up when a congress was in session, or get current congress details. |
| `congress_congressional_record` | Get Congressional Record issues — the official daily record of debate, speeches, and proceedings in Congress. Filter by year, month, and day. |
| `congress_law_details` | Get detailed information about a specific public or private law, including sponsors, CBO cost estimates, committee reports, and constitutional authority statement. Requires congress number, law type, and law number. |
| `congress_committee_reports` | List committee reports — formal reports accompanying legislation reported out of committee. Filter by congress, report type (hrpt/srpt/erpt), and conference report flag. Critical for understanding committee intent and legislative history. |
| `congress_committee_report_details` | Get detailed information about a specific committee report, including associated bills, title, issue date, and text versions. |
| `congress_committee_prints` | List committee prints — publications ordered by committees that are not committee reports. Often include Rules Committee prints with bill text for floor consideration. |
| `congress_committee_print_details` | Get details about a specific committee print by congress, chamber, and jacket number. |
| `congress_committee_meetings` | List committee meetings (hearings, markups, etc.) with dates, locations, and topics. Filter by congress and chamber. |
| `congress_committee_meeting_details` | Get detailed information about a specific committee meeting including title, committees, witnesses, meeting documents, related bills, and video links. |
| `congress_hearings` | List congressional hearings. Filter by congress and chamber. Hearings are formal proceedings where committees gather testimony from witnesses. |
| `congress_hearing_details` | Get detailed information about a specific hearing including title, date, committees, associated meeting, citation, and available text formats. |
| `congress_daily_congressional_record` | Get daily Congressional Record issues with sections (Senate, House, Extensions of Remarks, Daily Digest). Filter by volume and issue number for specific issues, or list recent issues. |
| `congress_bound_congressional_record` | Get bound Congressional Record issues — the permanent, final publication of proceedings. Filter by year, month, and day. |
| `congress_house_communications` | List House communications — executive communications, memorials, presidential messages, and petitions referred to House committees. Types: ec (Executive Communication), ml (Memorial), pm (Presidential Message), pt (Petition). |
| `congress_house_communication_details` | Get detailed information about a specific House communication including abstract, committees, submitting agency, and legal authority. |
| `congress_house_requirements` | List House requirements — recurring reporting obligations from executive agencies to Congress. Shows requirement number, frequency, and matching communications count. |
| `congress_house_requirement_details` | Get detailed information about a specific House requirement including legal authority, frequency, nature, and matching communications count. |
| `congress_senate_communications` | List Senate communications — executive communications, presidential messages, and petitions/memorials referred to Senate committees. Types: ec (Executive Communication), pm (Presidential Message), pom (Petition or Memorial). |
| `congress_senate_communication_details` | Get detailed information about a specific Senate communication including abstract, committees, and congressional record date. |
| `congress_nomination_committees` | Get committees associated with a nomination. Shows committee activities (referral, hearing, discharge). |
| `congress_nomination_hearings` | Get printed hearings associated with a nomination. Shows hearing dates, citations, and chambers. |
| `congress_treaty_committees` | Get committees associated with a treaty. Typically the Senate Foreign Relations Committee. |
| `congress_amendment_text` | Get text versions for a specific amendment (from 117th Congress onwards). Returns version types and format URLs (PDF, HTML). |
| `congress_amendment_cosponsors` | Get cosponsors of a specific amendment. Shows party affiliation and sponsorship details. |
| `congress_amendment_amendments` | Get sub-amendments to a specific amendment. Shows amendments that modify the parent amendment. |
| `congress_committee_details_by_congress` | Get detailed information about a committee filtered by a specific congress number. Shows membership for that specific congress vs. all-time details from congress_committee_details. |
| `congress_committee_reports_for_committee` | Get reports published by a specific committee. Shows formal committee reports accompanying legislation — use congress_committees to find the committee system code. |
| `congress_committee_nominations_for_committee` | Get nominations referred to a specific committee. Useful for tracking judicial or agency head nominations before a particular Senate committee. |
| `congress_committee_house_communications` | Get House communications referred to a specific House committee. |
| `congress_committee_senate_communications` | Get Senate communications referred to a specific Senate committee. |
| `congress_committee_report_text` | Get text versions for a committee report. Returns formatted text and PDF URLs. |
| `congress_committee_print_text` | Get text versions for a committee print. Returns formatted text and PDF URLs. |
| `congress_nomination_nominees` | Get the list of nominees for a specific position within a nomination. Some nominations contain multiple positions (ordinals). Use congress_nomination_details first to see the ordinal numbers. |
| `congress_house_requirement_matching_communications` | Get communications that match a specific House requirement. Shows agency submissions fulfilling a recurring reporting obligation. |
| `congress_treaty_partitioned_details` | Get details about a partitioned treaty (one with a suffix letter like A, B, etc.). Some treaties are divided into parts, each identified by a suffix. |
| `congress_treaty_partitioned_actions` | Get actions on a partitioned treaty (one with a suffix letter). Shows committee referral, hearings, and ratification votes for a specific treaty partition. |
| `congress_bill_full_profile` | Get a COMPLETE bill profile in ONE call — combines bill details, all cosponsors (with party breakdown), full action timeline, CRS summaries, committees, legislative subjects, text versions, related bills, and all titles. Fetches 8 endpoints in parallel. Use this instead of calling congress_bill_details + congress_bill_actions + congress_bill_summaries + congress_bill_committees + congress_bill_subjects + congress_bill_text + congress_bill_related + congress_bill_titles individually. |
| `congress_member_full_profile` | Get a COMPLETE member of Congress profile in ONE call — combines bio/details, recent sponsored legislation, and recent cosponsored legislation (3 endpoints in parallel). Returns party history, terms served, committee assignments, photo, website, plus legislative activity. |
| `congress_nomination_full_profile` | Get a COMPLETE presidential nomination profile in ONE call — combines nomination details, full action timeline, committee referrals/activity, and associated hearings (4 endpoints in parallel). Use this instead of calling congress_nomination_details + congress_nomination_committees + congress_nomination_hearings individually. |
| `congress_treaty_full_profile` | Get a COMPLETE treaty profile in ONE call — combines treaty details, full action timeline, and committee assignments (3 endpoints in parallel). Use this instead of calling congress_treaty_details + congress_treaty_committees individually. |
| `congress_committee_full_profile` | Get a COMPLETE committee profile in ONE call — combines committee details (history, subcommittees, website), recent bills referred, recent reports published, and recent nominations referred (4 endpoints in parallel). Use this instead of calling congress_committee_details + congress_committee_bills + congress_committee_reports_for_committee + congress_committee_nominations_for_committee individually. |
| `congress_bill_votes` | Find ALL roll-call votes on a specific bill and fetch the party-line breakdowns — the KEY tool for 'follow the money' investigations. Scans the bill's action timeline for recorded vote references, then fetches each House and Senate vote with member-level results and party tallies. |

#### `congress_search_bills`

Search for bills in Congress by keyword, congress number, or bill type. Returns bill number, title, sponsor, latest action, and status.

Congress numbers: 118th (2023-2024), 119th (2025-2026), 117th (2021-2022).
Bill types: hr (House), s (Senate), hjres, sjres, hconres, sconres, hres, sres

**Parameters:**
- `query` — Keyword/text search across bill titles and summaries (e.g., 'infrastructure', 'tax reform', 'climate')
- `congress` — Congress number (e.g., 119 for 2025-2026, 118 for 2023-2024). Omit to list bills across all congresses
- `bill_type` — Bill type
- `limit` — Max results (default: 20)
- `offset` — Results offset for pagination (default: 0)
- `fromDateTime` — Filter by update date from this timestamp. Format: YYYY-MM-DDT00:00:00Z
- `toDateTime` — Filter by update date to this timestamp. Format: YYYY-MM-DDT00:00:00Z
- `sort` — Sort order. Value can be updateDate+asc or updateDate+desc (default: updateDate+desc)

#### `congress_bill_details`

Get detailed information about a specific bill including sponsors, cosponsors with party breakdown, actions, committees, and current status.

**Parameters:**
- `congress` **(required)** — Congress number (e.g., 119, 118, 117)
- `bill_type` **(required)** — Bill type
- `bill_number` **(required)** — Bill number (e.g., 1, 25, 3076)

#### `congress_search_members`

Search for members of Congress by state, congress number, district, or get all current members. Supports: /member (all), /member/{stateCode} (by state), /member/{stateCode}/{district} (by district), /member/congress/{congress} (by congress), /member/congress/{congress}/{stateCode}/{district} (combined).

**Parameters:**
- `congress` — Congress number. When used with state+district, filters to that congress. Use alone to list all members of a congress.
- `state` — Two-letter state code to filter by, e.g. 'CA', 'TX'. Can be used alone or with district.
- `district` — House district number (use with state). Returns all historical members for that seat.
- `currentMember` — Filter by current member status. true = current members only, false = former only
- `fromDateTime` — Filter by update date start (YYYY-MM-DDT00:00:00Z)
- `toDateTime` — Filter by update date end (YYYY-MM-DDT00:00:00Z)
- `limit` — Max results (default: 50)

#### `congress_house_votes`

Get House of Representatives roll call vote results with member-level party breakdown. Primary source: Congress.gov API (118th-119th Congress); falls back to clerk.house.gov XML for older congresses. Coverage: 1990 to present. Use year param for historical votes. Cross-reference with: congress_senate_votes (same bill's Senate vote), FEC (congress_member donors via fec_candidate_financials), lobbying_search (who lobbied on the bill), FRED (economic impact 1-3 years after passage). For Senate votes, use congress_senate_votes.

**Parameters:**
- `congress` — Congress number (default: current). Used with session to determine year.
- `session` — Session (1 or 2). Default: current session
- `year` — Calendar year (e.g. 2024). Overrides congress+session if provided.
- `vote_number` — Specific roll call vote number. Omit to list recent votes.
- `limit` — Max results when listing votes (default: 20)

#### `congress_senate_votes`

Get Senate roll call vote results from senate.gov XML. Shows how senators voted by party on specific legislation, nominations, and procedural motions. Coverage: 101st Congress (1989) to present. Cross-reference with: congress_house_votes (same bill's House vote), FEC (senator donors via fec_candidate_financials), lobbying_search (who lobbied on the bill), congress_member_bills (senator's voting vs sponsoring patterns). For House votes, use congress_house_votes.

**Parameters:**
- `congress` — Congress number (default: current). Coverage: 101st (1989) to present
- `session` — Session (1 or 2). Default: current session (1 for odd years, 2 for even)
- `vote_number` — Specific roll call vote number. Omit to list recent votes.
- `limit` — Max results when listing votes (default: 20)

#### `congress_recent_laws`

Get recently enacted laws (bills signed by the President). Optionally filter by law type (public or private). Shows what legislation has become law.

**Parameters:**
- `congress` — Congress number (default: current)
- `law_type` — Law type: pub (public law) or priv (private law). Default: all
- `limit` — Max results (default: 20)

#### `congress_member_bills`

Get bills sponsored or cosponsored by a specific member of Congress. Requires the member's BioGuide ID (use congress_search_members to find it).

**Parameters:**
- `bioguide_id` **(required)** — Member's BioGuide ID (e.g., 'S000033' for Bernie Sanders, 'C001098' for Ted Cruz)
- `type` — Bill relationship type (default: sponsored)
- `limit` — Max results (default: 20)

#### `congress_bill_actions`

Get the full action history / timeline for a bill — every step from introduction through committee, floor votes, amendments, and signing. Shows recorded roll-call vote numbers when available.

Use congress_search_bills first to find the congress number, bill type, and bill number.

**Parameters:**
- `congress` **(required)** — Congress number (e.g., 118)
- `bill_type` **(required)** — Bill type
- `bill_number` **(required)** — Bill number
- `limit` — Max actions to return (default: 100)

#### `congress_bill_amendments`

Get amendments filed on a specific bill. Shows amendment sponsors, purposes, and status. Critical for tracking how bills are modified (e.g., 'gutted and replaced').

**Parameters:**
- `congress` **(required)** — Congress number
- `bill_type` **(required)** — Bill type
- `bill_number` **(required)** — Bill number
- `limit` — Max results (default: 50)

#### `congress_bill_summaries`

Get CRS (Congressional Research Service) summaries of a bill. These are plain-English, non-partisan summaries written by CRS analysts. Multiple versions may exist (as introduced, as reported, as passed).

**Parameters:**
- `congress` **(required)** — Congress number
- `bill_type` **(required)** — Bill type
- `bill_number` **(required)** — Bill number

#### `congress_bill_text`

Get available text versions for a bill (e.g., introduced, reported, engrossed, enrolled). Returns version types and format URLs. For full bill text content, use govinfo_bill_text.

**Parameters:**
- `congress` **(required)** — Congress number
- `bill_type` **(required)** — Bill type
- `bill_number` **(required)** — Bill number

#### `congress_bill_related`

Find related/companion bills. Identifies House-Senate companion bills, identical bills, and bills with related provisions. Useful for tracking legislation across chambers.

**Parameters:**
- `congress` **(required)** — Congress number
- `bill_type` **(required)** — Bill type
- `bill_number` **(required)** — Bill number
- `limit` — Max results (default: 50)

#### `congress_bill_subjects`

Get legislative subjects tagged on a bill, plus the primary policy area. Useful for finding all bills on a topic and for cross-referencing with lobbying data.

**Parameters:**
- `congress` **(required)** — Congress number
- `bill_type` **(required)** — Bill type
- `bill_number` **(required)** — Bill number
- `limit` — Max results (default: 100)

#### `congress_bill_committees`

Get committees a bill was referred to, with activity dates. Shows which committees had jurisdiction and what actions they took (referral, hearings, markup, reporting).

**Parameters:**
- `congress` **(required)** — Congress number
- `bill_type` **(required)** — Bill type
- `bill_number` **(required)** — Bill number

#### `congress_bill_titles`

Get all titles for a bill — short titles, official titles, display titles, and titles as they appeared in different text versions. Useful for finding the popular name of legislation (e.g., 'Inflation Reduction Act').

**Parameters:**
- `congress` **(required)** — Congress number
- `bill_type` **(required)** — Bill type
- `bill_number` **(required)** — Bill number
- `limit` — Max results (default: 100)

#### `congress_bill_cosponsors`

Get the full list of cosponsors for a bill with party affiliation and sponsorship dates. Returns individual cosponsor details unlike congress_bill_details which only provides a party breakdown summary.

**Parameters:**
- `congress` **(required)** — Congress number
- `bill_type` **(required)** — Bill type
- `bill_number` **(required)** — Bill number
- `limit` — Max results (default: 250)
- `sort` — Sort order. Value can be updateDate+asc or updateDate+desc

#### `congress_member_details`

Get detailed information about a specific member of Congress by BioGuide ID. Returns full bio, party history, all terms served, committee assignments, photo URL, and official website.

Use congress_search_members first to find the BioGuide ID.

**Parameters:**
- `bioguide_id` **(required)** — BioGuide ID (e.g., 'P000197' for Pelosi, 'M000355' for McConnell)

#### `congress_committees`

List congressional committees. Filter by congress number and/or chamber (house, senate, joint). Returns committee name, system code, and chamber.

**Parameters:**
- `congress` — Congress number (e.g., 119). Default: current
- `chamber` — Chamber
- `limit` — Max results (default: 50)
- `fromDateTime` — Filter by update date from. Format: YYYY-MM-DDT00:00:00Z
- `toDateTime` — Filter by update date to. Format: YYYY-MM-DDT00:00:00Z

#### `congress_committee_bills`

Get bills referred to a specific committee. Use congress_committees to find the committee system code. Useful for tracking which bills die in committee vs. get reported out.

**Parameters:**
- `chamber` **(required)** — Chamber
- `committee_code` **(required)** — Committee system code (e.g., 'hsba00' for House Financial Services, 'ssfi00' for Senate Finance)
- `limit` — Max results (default: 20)

#### `congress_committee_details`

Get detailed information about a specific congressional committee by chamber and committee code. Returns full history, website URL, subcommittees, bill/report counts, and related communications.

**Parameters:**
- `chamber` **(required)** — Chamber
- `committee_code` **(required)** — Committee system code (e.g., 'hspw00' for House Transportation, 'ssju00' for Senate Judiciary)

#### `congress_amendments`

Search/list amendments by congress and optional type (hamdt = House, samdt = Senate, suamdt = Senate Unnumbered). Returns amendment number, type, sponsor, purpose, and status.

**Parameters:**
- `congress` — Congress number (default: current)
- `amendment_type` — Amendment type
- `limit` — Max results (default: 20)
- `fromDateTime` — Filter by update date from. Format: YYYY-MM-DDT00:00:00Z
- `toDateTime` — Filter by update date to. Format: YYYY-MM-DDT00:00:00Z

#### `congress_amendment_details`

Get detailed information about a specific amendment, including its actions/timeline. Requires congress number, amendment type (hamdt/samdt), and amendment number.

**Parameters:**
- `congress` **(required)** — Congress number
- `amendment_type` **(required)** — Amendment type
- `amendment_number` **(required)** — Amendment number

#### `congress_nominations`

List presidential nominations to federal offices (judges, cabinet, ambassadors, agency heads). Shows nominee name, position, organization, and confirmation status.

**Parameters:**
- `congress` — Congress number (default: current)
- `limit` — Max results (default: 20)
- `fromDateTime` — Filter by update date from. Format: YYYY-MM-DDT00:00:00Z
- `toDateTime` — Filter by update date to. Format: YYYY-MM-DDT00:00:00Z

#### `congress_nomination_details`

Get detailed information about a specific presidential nomination, including all actions (committee referral, hearing, vote, confirmation/rejection).

**Parameters:**
- `congress` **(required)** — Congress number
- `nomination_number` **(required)** — Nomination number (PN number)

#### `congress_treaties`

List treaties submitted to the Senate. Shows treaty topic, date transmitted, and ratification status.

**Parameters:**
- `congress` — Congress number (default: all)
- `limit` — Max results (default: 20)
- `fromDateTime` — Filter by update date from. Format: YYYY-MM-DDT00:00:00Z
- `toDateTime` — Filter by update date to. Format: YYYY-MM-DDT00:00:00Z

#### `congress_treaty_details`

Get detailed information about a specific treaty, including all Senate actions (committee referral, hearings, ratification vote).

**Parameters:**
- `congress` **(required)** — Congress in which the treaty was received
- `treaty_number` **(required)** — Treaty document number

#### `congress_crs_reports`

Get Congressional Research Service reports — authoritative, nonpartisan analysis on legislative topics. CRS reports are considered the gold standard for policy research.

**Parameters:**
- `limit` — Max results (default: 20)
- `fromDateTime` — Filter by update date from. Format: YYYY-MM-DDT00:00:00Z
- `toDateTime` — Filter by update date to. Format: YYYY-MM-DDT00:00:00Z

#### `congress_crs_report_details`

Get detailed information about a specific CRS report by report number/ID. Returns full summary, authors, topics, related legislation, and format links (PDF, etc.).

**Parameters:**
- `report_number` **(required)** — The report number or ID (e.g., 'R47175', 'RL33110', 'IF12345')

#### `congress_summaries_search`

Search bill summaries across all bills and congresses. Unlike congress_bill_summaries (which requires a specific bill), this searches CRS summaries across the entire collection. Filter by congress, bill type, and date range. Sorted by last update date. Results include the associated bill reference.

**Parameters:**
- `congress` — Congress number to filter by (omit for all congresses)
- `bill_type` — Bill type to filter by
- `limit` — Max results (default: 20)
- `fromDateTime` — Filter by update date from. Format: YYYY-MM-DDT00:00:00Z
- `toDateTime` — Filter by update date to. Format: YYYY-MM-DDT00:00:00Z
- `sort` — Sort order: updateDate+asc or updateDate+desc

#### `congress_info`

Get information about congresses and their sessions — start/end dates, session numbers, and chambers. Use to look up when a congress was in session, or get current congress details.

**Parameters:**
- `congress` — Specific congress number (e.g., 118). Omit to list recent congresses
- `current` — Set true to get the current congress info
- `limit` — Max results when listing (default: 20)

#### `congress_congressional_record`

Get Congressional Record issues — the official daily record of debate, speeches, and proceedings in Congress. Filter by year, month, and day.

**Parameters:**
- `year` — Year (e.g., 2024)
- `month` — Month (1-12)
- `day` — Day of month
- `limit` — Max results (default: 20)

#### `congress_law_details`

Get detailed information about a specific public or private law, including sponsors, CBO cost estimates, committee reports, and constitutional authority statement. Requires congress number, law type, and law number.

**Parameters:**
- `congress` **(required)** — Congress number (e.g., 118, 119)
- `law_type` **(required)** — Law type: 'pub' (Public Law), 'priv' (Private Law)
- `law_number` **(required)** — Law number (e.g., 274 for Public Law 118-274)

#### `congress_committee_reports`

List committee reports — formal reports accompanying legislation reported out of committee. Filter by congress, report type (hrpt/srpt/erpt), and conference report flag. Critical for understanding committee intent and legislative history.

**Parameters:**
- `congress` — Congress number
- `report_type` — Report type: 'hrpt' (House Report), 'srpt' (Senate Report), 'erpt' (Executive Report)
- `conference` — Filter to conference reports only
- `limit` — Max results (default: 20)
- `fromDateTime` — Filter by update date from. Format: YYYY-MM-DDT00:00:00Z
- `toDateTime` — Filter by update date to. Format: YYYY-MM-DDT00:00:00Z

#### `congress_committee_report_details`

Get detailed information about a specific committee report, including associated bills, title, issue date, and text versions.

**Parameters:**
- `congress` **(required)** — Congress number
- `report_type` **(required)** — Report type: 'hrpt' (House Report), 'srpt' (Senate Report), 'erpt' (Executive Report)
- `report_number` **(required)** — Report number (e.g., 617)

#### `congress_committee_prints`

List committee prints — publications ordered by committees that are not committee reports. Often include Rules Committee prints with bill text for floor consideration.

**Parameters:**
- `congress` — Congress number
- `chamber` — Chamber
- `limit` — Max results (default: 20)
- `fromDateTime` — Filter by update date from. Format: YYYY-MM-DDT00:00:00Z
- `toDateTime` — Filter by update date to. Format: YYYY-MM-DDT00:00:00Z

#### `congress_committee_print_details`

Get details about a specific committee print by congress, chamber, and jacket number.

**Parameters:**
- `congress` **(required)** — Congress number
- `chamber` **(required)** — Chamber
- `jacket_number` **(required)** — Jacket number (e.g., 48144)

#### `congress_committee_meetings`

List committee meetings (hearings, markups, etc.) with dates, locations, and topics. Filter by congress and chamber.

**Parameters:**
- `congress` — Congress number
- `chamber` — Chamber
- `limit` — Max results (default: 20)
- `fromDateTime` — Filter by update date from. Format: YYYY-MM-DDT00:00:00Z
- `toDateTime` — Filter by update date to. Format: YYYY-MM-DDT00:00:00Z

#### `congress_committee_meeting_details`

Get detailed information about a specific committee meeting including title, committees, witnesses, meeting documents, related bills, and video links.

**Parameters:**
- `congress` **(required)** — Congress number
- `chamber` **(required)** — Chamber
- `event_id` **(required)** — Event ID (e.g., '115538')

#### `congress_hearings`

List congressional hearings. Filter by congress and chamber. Hearings are formal proceedings where committees gather testimony from witnesses.

**Parameters:**
- `congress` — Congress number
- `chamber` — Chamber
- `limit` — Max results (default: 20)

#### `congress_hearing_details`

Get detailed information about a specific hearing including title, date, committees, associated meeting, citation, and available text formats.

**Parameters:**
- `congress` **(required)** — Congress number
- `chamber` **(required)** — Chamber
- `jacket_number` **(required)** — Hearing jacket number

#### `congress_daily_congressional_record`

Get daily Congressional Record issues with sections (Senate, House, Extensions of Remarks, Daily Digest). Filter by volume and issue number for specific issues, or list recent issues.

**Parameters:**
- `volume_number` — Volume number (e.g., 171)
- `issue_number` — Issue number (requires volume_number)
- `limit` — Max results (default: 20)

#### `congress_bound_congressional_record`

Get bound Congressional Record issues — the permanent, final publication of proceedings. Filter by year, month, and day.

**Parameters:**
- `year` — Year (e.g., 1990)
- `month` — Month (1-12)
- `day` — Day of month
- `limit` — Max results (default: 20)

#### `congress_house_communications`

List House communications — executive communications, memorials, presidential messages, and petitions referred to House committees. Types: ec (Executive Communication), ml (Memorial), pm (Presidential Message), pt (Petition).

**Parameters:**
- `congress` — Congress number
- `communication_type` — Communication type: 'ec' (Executive Communication), 'ml' (Memorial), 'pm' (Presidential Message), 'pt' (Petition)
- `limit` — Max results (default: 20)

#### `congress_house_communication_details`

Get detailed information about a specific House communication including abstract, committees, submitting agency, and legal authority.

**Parameters:**
- `congress` **(required)** — Congress number
- `communication_type` **(required)** — Communication type: 'ec' (Executive Communication), 'ml' (Memorial), 'pm' (Presidential Message), 'pt' (Petition)
- `communication_number` **(required)** — Communication number

#### `congress_house_requirements`

List House requirements — recurring reporting obligations from executive agencies to Congress. Shows requirement number, frequency, and matching communications count.

**Parameters:**
- `limit` — Max results (default: 20)

#### `congress_house_requirement_details`

Get detailed information about a specific House requirement including legal authority, frequency, nature, and matching communications count.

**Parameters:**
- `requirement_number` **(required)** — Requirement number (e.g., 8070)

#### `congress_senate_communications`

List Senate communications — executive communications, presidential messages, and petitions/memorials referred to Senate committees. Types: ec (Executive Communication), pm (Presidential Message), pom (Petition or Memorial).

**Parameters:**
- `congress` — Congress number
- `communication_type` — Communication type: 'ec' (Executive Communication), 'pm' (Presidential Message), 'pom' (Petition or Memorial)
- `limit` — Max results (default: 20)

#### `congress_senate_communication_details`

Get detailed information about a specific Senate communication including abstract, committees, and congressional record date.

**Parameters:**
- `congress` **(required)** — Congress number
- `communication_type` **(required)** — Communication type: 'ec' (Executive Communication), 'pm' (Presidential Message), 'pom' (Petition or Memorial)
- `communication_number` **(required)** — Communication number

#### `congress_nomination_committees`

Get committees associated with a nomination. Shows committee activities (referral, hearing, discharge).

**Parameters:**
- `congress` **(required)** — Congress number
- `nomination_number` **(required)** — Nomination number

#### `congress_nomination_hearings`

Get printed hearings associated with a nomination. Shows hearing dates, citations, and chambers.

**Parameters:**
- `congress` **(required)** — Congress number
- `nomination_number` **(required)** — Nomination number

#### `congress_treaty_committees`

Get committees associated with a treaty. Typically the Senate Foreign Relations Committee.

**Parameters:**
- `congress` **(required)** — Congress number
- `treaty_number` **(required)** — Treaty document number

#### `congress_amendment_text`

Get text versions for a specific amendment (from 117th Congress onwards). Returns version types and format URLs (PDF, HTML).

**Parameters:**
- `congress` **(required)** — Congress number (117th onwards)
- `amendment_type` **(required)** — Amendment type
- `amendment_number` **(required)** — Amendment number

#### `congress_amendment_cosponsors`

Get cosponsors of a specific amendment. Shows party affiliation and sponsorship details.

**Parameters:**
- `congress` **(required)** — Congress number
- `amendment_type` **(required)** — Amendment type
- `amendment_number` **(required)** — Amendment number
- `limit` — Max results (default: 250)

#### `congress_amendment_amendments`

Get sub-amendments to a specific amendment. Shows amendments that modify the parent amendment.

**Parameters:**
- `congress` **(required)** — Congress number
- `amendment_type` **(required)** — Amendment type
- `amendment_number` **(required)** — Amendment number
- `limit` — Max results (default: 50)

#### `congress_committee_details_by_congress`

Get detailed information about a committee filtered by a specific congress number. Shows membership for that specific congress vs. all-time details from congress_committee_details.

**Parameters:**
- `congress` **(required)** — Congress number (e.g., 119)
- `chamber` **(required)** — Chamber
- `committee_code` **(required)** — Committee system code (e.g., 'hspw00')

#### `congress_committee_reports_for_committee`

Get reports published by a specific committee. Shows formal committee reports accompanying legislation — use congress_committees to find the committee system code.

**Parameters:**
- `chamber` **(required)** — Chamber
- `committee_code` **(required)** — Committee system code (e.g., 'hsju00')
- `limit` — Max results (default: 20)
- `fromDateTime` — Filter by update date from. Format: YYYY-MM-DDT00:00:00Z
- `toDateTime` — Filter by update date to. Format: YYYY-MM-DDT00:00:00Z

#### `congress_committee_nominations_for_committee`

Get nominations referred to a specific committee. Useful for tracking judicial or agency head nominations before a particular Senate committee.

**Parameters:**
- `chamber` **(required)** — Chamber (usually 'senate' for nominations)
- `committee_code` **(required)** — Committee system code (e.g., 'ssju00' for Senate Judiciary)
- `limit` — Max results (default: 20)

#### `congress_committee_house_communications`

Get House communications referred to a specific House committee.

**Parameters:**
- `committee_code` **(required)** — House committee system code (e.g., 'hsgo00')
- `limit` — Max results (default: 20)

#### `congress_committee_senate_communications`

Get Senate communications referred to a specific Senate committee.

**Parameters:**
- `committee_code` **(required)** — Senate committee system code (e.g., 'ssfr00')
- `limit` — Max results (default: 20)

#### `congress_committee_report_text`

Get text versions for a committee report. Returns formatted text and PDF URLs.

**Parameters:**
- `congress` **(required)** — Congress number
- `report_type` **(required)** — Report type: 'hrpt' (House Report), 'srpt' (Senate Report), 'erpt' (Executive Report)
- `report_number` **(required)** — Report number

#### `congress_committee_print_text`

Get text versions for a committee print. Returns formatted text and PDF URLs.

**Parameters:**
- `congress` **(required)** — Congress number
- `chamber` **(required)** — Chamber
- `jacket_number` **(required)** — Jacket number

#### `congress_nomination_nominees`

Get the list of nominees for a specific position within a nomination. Some nominations contain multiple positions (ordinals). Use congress_nomination_details first to see the ordinal numbers.

**Parameters:**
- `congress` **(required)** — Congress number
- `nomination_number` **(required)** — Nomination number
- `ordinal` **(required)** — Position ordinal (typically 1)
- `limit` — Max results (default: 20)

#### `congress_house_requirement_matching_communications`

Get communications that match a specific House requirement. Shows agency submissions fulfilling a recurring reporting obligation.

**Parameters:**
- `requirement_number` **(required)** — Requirement number (e.g., 8070)
- `limit` — Max results (default: 20)

#### `congress_treaty_partitioned_details`

Get details about a partitioned treaty (one with a suffix letter like A, B, etc.). Some treaties are divided into parts, each identified by a suffix.

**Parameters:**
- `congress` **(required)** — Congress number
- `treaty_number` **(required)** — Treaty document number
- `treaty_suffix` **(required)** — Treaty partition letter (e.g., 'A', 'B')

#### `congress_treaty_partitioned_actions`

Get actions on a partitioned treaty (one with a suffix letter). Shows committee referral, hearings, and ratification votes for a specific treaty partition.

**Parameters:**
- `congress` **(required)** — Congress number
- `treaty_number` **(required)** — Treaty document number
- `treaty_suffix` **(required)** — Treaty partition letter (e.g., 'A', 'B')
- `limit` — Max results (default: 50)

#### `congress_bill_full_profile`

Get a COMPLETE bill profile in ONE call — combines bill details, all cosponsors (with party breakdown), full action timeline, CRS summaries, committees, legislative subjects, text versions, related bills, and all titles. Fetches 8 endpoints in parallel. Use this instead of calling congress_bill_details + congress_bill_actions + congress_bill_summaries + congress_bill_committees + congress_bill_subjects + congress_bill_text + congress_bill_related + congress_bill_titles individually.

Ideal for: Complete legislative analysis, bill research, accountability investigations, or getting everything needed to cross-reference with FEC (who funded the sponsors), lobbying_search (who lobbied), and FRED (economic impact after passage).

**Parameters:**
- `congress` **(required)** — Congress number (e.g., 119, 118, 117)
- `bill_type` **(required)** — Bill type
- `bill_number` **(required)** — Bill number (e.g., 1, 25, 3076)

#### `congress_member_full_profile`

Get a COMPLETE member of Congress profile in ONE call — combines bio/details, recent sponsored legislation, and recent cosponsored legislation (3 endpoints in parallel). Returns party history, terms served, committee assignments, photo, website, plus legislative activity.

Use this instead of calling congress_member_details + congress_member_bills (sponsored) + congress_member_bills (cosponsored) individually.

Ideal for: Accountability research — cross-reference with FEC (fec_candidate_financials) for donors, lobbying_search for industry lobbying, and congress_house_votes / congress_senate_votes for voting record.

**Parameters:**
- `bioguide_id` **(required)** — Member's BioGuide ID (e.g., 'P000197' for Pelosi, 'M000355' for McConnell). Use congress_search_members to find it.
- `bill_limit` — Max bills to return per category (default: 20)

#### `congress_nomination_full_profile`

Get a COMPLETE presidential nomination profile in ONE call — combines nomination details, full action timeline, committee referrals/activity, and associated hearings (4 endpoints in parallel). Use this instead of calling congress_nomination_details + congress_nomination_committees + congress_nomination_hearings individually.

Ideal for: Tracking judicial and executive nominations from submission through confirmation/rejection. Cross-reference with lobbying_search for industry interest in the nominee.

**Parameters:**
- `congress` **(required)** — Congress number
- `nomination_number` **(required)** — Nomination number (PN number)

#### `congress_treaty_full_profile`

Get a COMPLETE treaty profile in ONE call — combines treaty details, full action timeline, and committee assignments (3 endpoints in parallel). Use this instead of calling congress_treaty_details + congress_treaty_committees individually.

Ideal for: International agreement research and Senate Foreign Relations Committee tracking.

**Parameters:**
- `congress` **(required)** — Congress in which the treaty was received
- `treaty_number` **(required)** — Treaty document number

#### `congress_committee_full_profile`

Get a COMPLETE committee profile in ONE call — combines committee details (history, subcommittees, website), recent bills referred, recent reports published, and recent nominations referred (4 endpoints in parallel). Use this instead of calling congress_committee_details + congress_committee_bills + congress_committee_reports_for_committee + congress_committee_nominations_for_committee individually.

Ideal for: Understanding a committee's jurisdiction, workload, and oversight activity. Cross-reference committee chair (from congress_member_details) with FEC donors and lobbying_search.

**Parameters:**
- `chamber` **(required)** — Chamber
- `committee_code` **(required)** — Committee system code (e.g., 'hsba00' for House Financial Services, 'ssju00' for Senate Judiciary)
- `limit` — Max items per sub-resource (default: 10)

#### `congress_bill_votes`

Find ALL roll-call votes on a specific bill and fetch the party-line breakdowns — the KEY tool for 'follow the money' investigations. Scans the bill's action timeline for recorded vote references, then fetches each House and Senate vote with member-level results and party tallies.

This is the critical bridge between legislation and accountability:
• Bill → Votes (this tool)
• Votes → Who voted how (party tallies returned here)
• Who voted → Who funded them (fec_candidate_financials / fec_committee_disbursements)
• Who lobbied → lobbying_search

Returns all House and Senate roll-call votes associated with the bill, with full party breakdowns.

**Parameters:**
- `congress` **(required)** — Congress number
- `bill_type` **(required)** — Bill type
- `bill_number` **(required)** — Bill number

---

### eCFR (Code of Federal Regulations)

Search and read the electronic Code of Federal Regulations — full text of all federal regulations organized by title, part, and section

**Workflow:** ecfr_search to find relevant regulations → ecfr_title_structure to browse a title's organization → ecfr_section for full text of a specific section

**Tips:** CFR is organized into 50 titles by subject (e.g. Title 21 = Food and Drugs, Title 26 = Internal Revenue, Title 40 = Environment). Use today's date for current regulations or a past date for historical versions.

| Tool | Description | · No auth required |
|------|-------------|---|
| `ecfr_search` | Search the Code of Federal Regulations (CFR) by keyword. Returns matching regulation sections with titles, parts, and context snippets. |
| `ecfr_title_structure` | Get the organizational structure of a CFR title — shows all parts, subparts, and sections. Useful for browsing what regulations exist within a title before reading specific sections. |
| `ecfr_section` | Get the full text of a specific CFR section or part. Returns the rendered regulation content. |

#### `ecfr_search`

Search the Code of Federal Regulations (CFR) by keyword. Returns matching regulation sections with titles, parts, and context snippets.

The CFR contains all federal regulations organized into 50 titles by subject area (e.g. Title 21 = Food and Drugs, Title 26 = Internal Revenue, Title 40 = Environment).

**Parameters:**
- `query` **(required)** — Search keywords (e.g. 'clean water discharge', 'food labeling requirements')
- `limit` — Max results per page (default: 20, max: 50)
- `page` — Page number for pagination (default: 1)

#### `ecfr_title_structure`

Get the organizational structure of a CFR title — shows all parts, subparts, and sections. Useful for browsing what regulations exist within a title before reading specific sections.

Common titles: 7 (Agriculture), 12 (Banks), 14 (Aviation), 21 (Food & Drugs), 26 (Internal Revenue), 29 (Labor), 40 (Environment), 42 (Public Health), 47 (Telecommunications).

**Parameters:**
- `title` **(required)** — CFR title number (1-50)
- `date` — Date for version (YYYY-MM-DD format, default: today). Use past dates for historical versions.

#### `ecfr_section`

Get the full text of a specific CFR section or part. Returns the rendered regulation content.

Use ecfr_search or ecfr_title_structure first to find the title, part, and section numbers.

**Parameters:**
- `title` **(required)** — CFR title number (1-50)
- `part` **(required)** — Part number within the title (e.g. '314', '58', '131')
- `section` — Section number within the part (e.g. '50', '1', '3'). Omit to get the entire part.
- `date` — Date for version (YYYY-MM-DD format, default: today)

---

### Federal Register

Executive orders, presidential documents, rules, agency notices

**Workflow:** fr_executive_orders or fr_search_rules → review results

**Tips:** Use president slugs: 'donald-trump', 'joe-biden', 'barack-obama', 'george-w-bush', 'william-j-clinton'. No API key required.

| Tool | Description | · No auth required |
|------|-------------|---|
| `fr_executive_orders` | Search for presidential executive orders. Filter by president, year, or keyword. Covers all executive orders since 1994. |
| `fr_presidential_documents` | Search all presidential documents: executive orders, memoranda, proclamations, and other presidential actions. |
| `fr_search_rules` | Search for proposed rules, final rules, and agency notices in the Federal Register. Use to track regulatory activity by agencies. |
| `fr_document_detail` | Get full details for a specific Federal Register document by document number. |
| `fr_agencies` | List all federal agencies that publish in the Federal Register. |

#### `fr_executive_orders`

Search for presidential executive orders. Filter by president, year, or keyword. Covers all executive orders since 1994.

**Parameters:**
- `keyword` — Search keyword in title/abstract, e.g. 'tariff', 'immigration', 'climate'
- `president` — President slug: 'donald-trump', 'joe-biden', 'barack-obama', 'george-w-bush', 'william-j-clinton'
- `year` — Year to filter by, e.g. 2025
- `per_page` — Results per page (default: 20)
- `page` — Page number (default: 1)

#### `fr_presidential_documents`

Search all presidential documents: executive orders, memoranda, proclamations, and other presidential actions.

**Parameters:**
- `keyword` — Search keyword
- `doc_type` — Document subtype
- `president` — President slug: 'donald-trump', 'joe-biden', 'barack-obama', 'george-w-bush', 'william-j-clinton'
- `start_date` — Start date YYYY-MM-DD
- `end_date` — End date YYYY-MM-DD
- `per_page` — Results per page (default: 20)

#### `fr_search_rules`

Search for proposed rules, final rules, and agency notices in the Federal Register. Use to track regulatory activity by agencies.

**Parameters:**
- `keyword` — Search keyword, e.g. 'tariff', 'emissions', 'banking'
- `doc_type` — Rule type
- `agency` — Agency slug, e.g. 'environmental-protection-agency', 'securities-and-exchange-commission'
- `start_date` — Start date YYYY-MM-DD
- `end_date` — End date YYYY-MM-DD
- `per_page` — Results per page (default: 20)
- `significant` — Only show significant/major rules (true/false)

#### `fr_document_detail`

Get full details for a specific Federal Register document by document number.
Returns title, abstract, full text URL, agencies, CFR references, and more.

**Parameters:**
- `document_number` **(required)** — Federal Register document number: '2024-00001'

#### `fr_agencies`

List all federal agencies that publish in the Federal Register.
Returns agency names, short names, slugs (for filtering), and URLs. 470+ agencies.

---

### FOIA.gov (Freedom of Information Act)

Federal FOIA data — agency contact information and annual FOIA report statistics. Lists all federal agencies with FOIA offices, request processing stats, and compliance data.

**Workflow:** foia_agencies to list all federal agencies with FOIA contact info → foia_report to get annual FOIA processing statistics for a specific agency.

**Tips:** Agency abbreviations are standard federal abbreviations (e.g. 'DOJ', 'DOD', 'DHS', 'EPA'). Annual reports include request volumes, processing times, backlog data, and exemption usage. Use foia_agencies first to discover available agency abbreviations.

| Tool | Description | · No auth required |
|------|-------------|---|
| `foia_agencies` | List all federal agencies with FOIA offices and contact information. |
| `foia_report` | Get annual FOIA report statistics for a specific federal agency. |

#### `foia_agencies`

List all federal agencies with FOIA offices and contact information.
Returns agency names, abbreviations, FOIA request submission details, and websites.
Use this to discover agency abbreviations for the foia_report tool.

**Parameters:**
- `search` — Filter agencies by name (case-insensitive partial match): 'defense', 'justice', 'energy'

#### `foia_report`

Get annual FOIA report statistics for a specific federal agency.
Includes request volumes, processing times, backlog data, exemption usage, and compliance metrics.
Use foia_agencies first to find the correct agency abbreviation.

**Parameters:**
- `agency_abbreviation` **(required)** — Federal agency abbreviation: 'DOJ', 'DOD', 'DHS', 'EPA', 'DOE'

---

### GovInfo

Full-text search across Congressional bills, laws, Federal Register, CFR, CBO reports, and more

**Workflow:** govinfo_search to find publications → govinfo_bill_text for full legislative text

**Tips:** Package ID format for bills: BILLS-{congress}{type}{number}{version}. Example: BILLS-117hr5376enr (Inflation Reduction Act).

| Tool | Description | · Auth: `DATA_GOV_API_KEY` |
|------|-------------|---|
| `govinfo_search` | Search across all government publications — bills, laws, CBO reports, Congressional Record, Federal Register, committee reports, and more. |
| `govinfo_bill_text` | Get the FULL legislative text of a bill from GovInfo — the actual law language with section numbers, dollar amounts, legal citations, and provisions. |
| `govinfo_cbo_reports` | Search for Congressional Budget Office reports published through GovInfo. CBO scores tax bills with distributional analysis showing impact by income group. |

#### `govinfo_search`

Search across all government publications — bills, laws, CBO reports, Congressional Record, Federal Register, committee reports, and more.

Collections: BILLS, PLAW (public laws), CRPT (committee reports), CREC (Congressional Record), BUDGET, FR (Federal Register), CRECB (bound CR)

**Parameters:**
- `query` **(required)** — Search query — bill name, topic, or keyword
- `collection` — Collection: 'BILLS', 'PLAW' (public laws), 'CRPT' (committee reports), 'CREC' (Congressional Record), 'BUDGET', 'FR' (Federal Register)
- `congress` — Filter by Congress number (e.g., 119)
- `page_size` — Results per page (default: 10, max: 100)

#### `govinfo_bill_text`

Get the FULL legislative text of a bill from GovInfo — the actual law language with section numbers, dollar amounts, legal citations, and provisions.

IMPORTANT: Try congress_bill_summaries first for a quick CRS summary (~500-2000 chars). Only use this tool when the user needs exact legislative language, specific provisions, or dollar amounts from the bill text.

Use preview_only=true first to check bill size before loading. Bills range from 5k chars (simple resolutions) to 500k+ (omnibus/appropriations). Default limit is 100k chars.

Version suffixes: enr (enrolled/signed), eh (engrossed House), es (engrossed Senate), ih (introduced House), is (introduced Senate)

**Parameters:**
- `congress` **(required)** — Congress number (e.g., 119, 118, 117)
- `bill_type` **(required)** — Bill type
- `bill_number` **(required)** — Bill number (e.g., 1, 5376)
- `version` — Bill version: 'enr' (enrolled/signed, default), 'eh' (engrossed House), 'es' (engrossed Senate), 'ih' (introduced House), 'is' (introduced Senate)
- `max_length` — Maximum characters to return (default: 100000). Most bills fit within 100k. Set higher (e.g. 500000) for large omnibus bills, or 0 for no limit.
- `preview_only` — When true, returns only metadata (title, pages, character count, estimated tokens) WITHOUT the actual text. Use this to check bill size before loading. Default: false.

#### `govinfo_cbo_reports`

Search for Congressional Budget Office reports published through GovInfo. CBO scores tax bills with distributional analysis showing impact by income group.

**Parameters:**
- `query` **(required)** — Search query — bill name or topic (e.g., 'Tax Cuts and Jobs Act', 'reconciliation')
- `page_size` — Results per page (default: 10)

---

### OpenStates (State Legislation)

Search bills and legislators across all 50 state legislatures. Track state-level legislation, sponsors, and voting records via the OpenStates API.

**Workflow:** openstates_bills to search bills by state and keyword → openstates_bill_detail for full bill info by OpenStates ID → openstates_legislators to find state legislators by name or jurisdiction.

**Tips:** Jurisdiction uses state abbreviation lowercase (e.g. 'ca', 'tx', 'ny'). Session is the legislative session identifier (e.g. '2023-2024'). Page starts at 1. Per_page max is 50. Bill IDs are OpenStates UUIDs from search results.

| Tool | Description | · Auth: `OPENSTATES_API_KEY` |
|------|-------------|---|
| `openstates_bills` | Search bills across all 50 state legislatures. |
| `openstates_bill_detail` | Get full details for a specific state bill by its OpenStates ID. |
| `openstates_legislators` | Search state legislators across all 50 states. |

#### `openstates_bills`

Search bills across all 50 state legislatures.
Filter by state (jurisdiction), keyword query, and legislative session.
Returns bill identifiers, titles, sessions, and sponsors.

**Parameters:**
- `jurisdiction` — State abbreviation lowercase: 'ca', 'tx', 'ny', 'fl'
- `query` — Search term: 'climate', 'housing', 'education'
- `session` — Legislative session: '2023-2024', '2023'
- `page` — Page number (default 1)
- `limit` — Results per page (default 20, max 50)

#### `openstates_bill_detail`

Get full details for a specific state bill by its OpenStates ID.
Returns complete bill information including sponsors, actions, votes, and documents.

**Parameters:**
- `openstates_id` **(required)** — OpenStates bill ID (e.g. 'ocd-bill/abc123-def456') from search results

#### `openstates_legislators`

Search state legislators across all 50 states.
Filter by state (jurisdiction) and name.
Returns legislator names, parties, chambers, districts, and contact info.

**Parameters:**
- `jurisdiction` — State abbreviation lowercase: 'ca', 'tx', 'ny'
- `name` — Legislator name to search: 'Smith', 'Garcia'
- `page` — Page number (default 1)
- `limit` — Results per page (default 20, max 50)

---

### Regulations.gov

Federal rulemaking: proposed rules, final rules, public comments, and regulatory dockets from all federal agencies

**Workflow:** regulations_search_documents to find rules → regulations_document_detail for full info → regulations_search_comments for public feedback

**Tips:** Document types: 'Proposed Rule', 'Rule', 'Supporting & Related Material', 'Other'. Sort by '-postedDate' for newest first. Agency IDs: EPA, FDA, DOL, HHS, DOT, etc.

| Tool | Description | · Auth: `DATA_GOV_API_KEY` |
|------|-------------|---|
| `regulations_search_documents` | Search for federal regulatory documents — proposed rules, final rules, and supporting materials. |
| `regulations_document_detail` | Get detailed information for a specific regulatory document by its document ID (e.g. 'FDA-2009-N-0501-0012'). |
| `regulations_search_comments` | Search for public comments on federal regulations. |
| `regulations_comment_detail` | Get detailed information for a specific public comment by its comment ID. |
| `regulations_search_dockets` | Search for regulatory dockets — organizational folders containing related rules, comments, and documents. |
| `regulations_docket_detail` | Get detailed information for a specific regulatory docket by its docket ID (e.g. 'EPA-HQ-OAR-2003-0129'). |

#### `regulations_search_documents`

Search for federal regulatory documents — proposed rules, final rules, and supporting materials.
Filter by agency, docket, date, or keyword. Complements Federal Register data with rulemaking context.

Document types: 'Proposed Rule', 'Rule', 'Supporting & Related Material', 'Other'.
Sort: 'postedDate' (asc) or '-postedDate' (desc, newest first).

**Parameters:**
- `searchTerm` — Full-text search keyword (e.g. 'water quality', 'emissions')
- `agencyId` — Agency abbreviation: 'EPA', 'FDA', 'DOL', 'HHS', 'DOT', 'OSHA'
- `docketId` — Docket ID (e.g. 'EPA-HQ-OAR-2003-0129')
- `documentType` — Document type: 'Proposed Rule' (Proposed Rule), 'Rule' (Final Rule), 'Supporting & Related Material' (Supporting & Related Material), 'Other' (Other)
- `postedDate` — Exact date: '2024-01-15'
- `postedDateGe` — Posted on or after date: '2024-01-01'
- `postedDateLe` — Posted on or before date: '2024-12-31'
- `sort` — Sort order
- `pageSize` — Results per page (max 250, default 25)
- `pageNumber` — Page number (1-based)

#### `regulations_document_detail`

Get detailed information for a specific regulatory document by its document ID (e.g. 'FDA-2009-N-0501-0012').

**Parameters:**
- `documentId` **(required)** — Document ID (e.g. 'FDA-2009-N-0501-0012', 'EPA-HQ-OAR-2021-0208-0001')

#### `regulations_search_comments`

Search for public comments on federal regulations.
Filter by keyword, agency, docket, or date. Shows what the public said about proposed rules.

Sort: 'postedDate' (asc) or '-postedDate' (desc, newest first).

**Parameters:**
- `searchTerm` — Keyword search in comments
- `agencyId` — Agency abbreviation: 'EPA', 'FDA', 'DOL'
- `docketId` — Docket ID to get comments for a specific rulemaking
- `postedDateGe` — Comments posted on or after date: '2024-01-01'
- `postedDateLe` — Comments posted on or before date: '2024-12-31'
- `sort` — Sort order (default: newest first)
- `pageSize` — Results per page (max 250, default 25)
- `pageNumber` — Page number (1-based)

#### `regulations_comment_detail`

Get detailed information for a specific public comment by its comment ID.

**Parameters:**
- `commentId` **(required)** — Comment ID (e.g. 'HHS-OCR-2018-0002-5313')

#### `regulations_search_dockets`

Search for regulatory dockets — organizational folders containing related rules, comments, and documents.
Each docket represents a rulemaking or non-rulemaking action by a federal agency.

Sort: 'title', '-title'.

**Parameters:**
- `searchTerm` — Keyword search (e.g. 'clean air', 'food safety')
- `agencyId` — Agency abbreviation: 'EPA', 'FDA', 'DOL', 'HHS'. Comma-separate for multiple: 'EPA,FDA'
- `docketType` — Docket type
- `sort` — Sort order
- `pageSize` — Results per page (max 250, default 25)
- `pageNumber` — Page number (1-based)

#### `regulations_docket_detail`

Get detailed information for a specific regulatory docket by its docket ID (e.g. 'EPA-HQ-OAR-2003-0129').

**Parameters:**
- `docketId` **(required)** — Docket ID (e.g. 'EPA-HQ-OAR-2003-0129')

---

### USCIS (U.S. Citizenship and Immigration Services)

Check immigration case status by receipt number using the USCIS Case Status Online API. No API key required.

**Workflow:** Use uscis_case_status with a receipt number (e.g. 'EAC2190000001') to check the current status of an immigration case.

**Tips:** Receipt numbers are 13 characters: 3-letter center code + 10 digits (e.g. 'EAC2190000001', 'WAC2312345678'). Center codes: EAC (Vermont), WAC (California), LIN (Nebraska), SRC (Texas), IOE (online-filed).

| Tool | Description | · No auth required |
|------|-------------|---|
| `uscis_case_status` | Check the status of a USCIS immigration case by receipt number. |

#### `uscis_case_status`

Check the status of a USCIS immigration case by receipt number.
Returns the current case status, form type, and latest action taken.
Receipt numbers are 13 characters: 3-letter center code + 10 digits (e.g. 'EAC2190000001').

**Parameters:**
- `receipt_number` **(required)** — USCIS receipt number (e.g. 'EAC2190000001')

---

## Government Operations

### DAP (Digital Analytics Program)

GSA Digital Analytics Program — government-wide web analytics data including site visits, traffic sources, devices, browsers, operating systems, and downloads. Supports government-wide, agency-specific, and domain-specific reports. Requires DATA_GOV_API_KEY.

**Workflow:** dap_gov_wide_report for government-wide analytics → dap_agency_report for agency-specific data → dap_domain_report for domain-specific data

**Tips:** Report types include: site, domain, second-level-domain, download, traffic-source, device, device-model, os, browser, os-browser, windows, windows-browser, language. Use after/before params (YYYY-MM-DD) to filter by date range. Maximum 10000 results per request. Use page for pagination.

| Tool | Description | · Auth: `DATA_GOV_API_KEY` |
|------|-------------|---|
| `dap_gov_wide_report` | Get a government-wide web analytics report from the Digital Analytics Program. |
| `dap_agency_report` | Get an agency-specific web analytics report from the Digital Analytics Program. |
| `dap_domain_report` | Get a domain-specific web analytics report from the Digital Analytics Program. |

#### `dap_gov_wide_report`

Get a government-wide web analytics report from the Digital Analytics Program.
Returns aggregate data across all federal government websites.
Report types include site visits, traffic sources, devices, browsers, OS, downloads, and more.

Example: report='site', limit=50, after='2025-01-01'

**Parameters:**
- `report` **(required)** — Report type: site, domain, second-level-domain, download, traffic-source, device, device-model, os, browser, os-browser, windows, windows-browser, language
- `limit` — Max results to return (default 100, max 10000)
- `page` — Page number for pagination
- `after` — Start date filter (YYYY-MM-DD)
- `before` — End date filter (YYYY-MM-DD)

#### `dap_agency_report`

Get an agency-specific web analytics report from the Digital Analytics Program.
Returns analytics data for a specific federal agency's websites.

Example: agency='interior', report='traffic-source', limit=50

**Parameters:**
- `agency` **(required)** — Agency identifier (e.g. 'interior', 'nasa', 'usda', 'commerce')
- `report` **(required)** — Report type: site, domain, second-level-domain, download, traffic-source, device, device-model, os, browser, os-browser, windows, windows-browser, language
- `limit` — Max results to return (default 100, max 10000)
- `page` — Page number for pagination
- `after` — Start date filter (YYYY-MM-DD)
- `before` — End date filter (YYYY-MM-DD)

#### `dap_domain_report`

Get a domain-specific web analytics report from the Digital Analytics Program.
Returns analytics data for a specific government website domain.

Example: domain='nasa.gov', report='browser', limit=50

**Parameters:**
- `domain` **(required)** — Website domain (e.g. 'nasa.gov', 'irs.gov', 'cdc.gov')
- `report` **(required)** — Report type: site, domain, second-level-domain, download, traffic-source, device, device-model, os, browser, os-browser, windows, windows-browser, language
- `limit` — Max results to return (default 100, max 10000)
- `page` — Page number for pagination
- `after` — Start date filter (YYYY-MM-DD)
- `before` — End date filter (YYYY-MM-DD)

---

### OPM Operating Status

Office of Personnel Management federal government operating status for the Washington, DC area. Current status, historical status records, and all possible status types (Open, Closed, Delayed, etc.). Covers weather closures, emergencies, and other events affecting federal office operations.

**Workflow:** opm_current_status for today's federal operating status -> opm_status_history for historical records -> opm_status_types for reference list of all status categories.

**Tips:** Current status returns the latest DC-area federal operating status. History supports pagination with startrow and count (max 5000). Date format for current status query is MM/DD/YYYY. Status types include Open, Closed, various Delayed/Early Departure options.

| Tool | Description | · No auth required |
|------|-------------|---|
| `opm_current_status` | Get the current federal government operating status for the Washington, DC area. |
| `opm_status_history` | Get historical federal government operating status records. |
| `opm_status_types` | List all possible federal government operating status types. |

#### `opm_current_status`

Get the current federal government operating status for the Washington, DC area.
Returns status title, summary, messages, and posting date.
Covers weather closures, emergencies, and other events affecting federal offices.
Optionally query a specific date's status using MM/DD/YYYY format.

**Parameters:**
- `date` — Specific date to query (MM/DD/YYYY format). Omit for current status.
- `useutc` — Return times in UTC (default: false, returns Eastern time)

#### `opm_status_history`

Get historical federal government operating status records.
Returns past status changes including closures, delays, and early departures.
Supports pagination with startrow and count parameters (max 5000 per request).

**Parameters:**
- `startrow` — Starting row for pagination (zero-indexed)
- `count` — Number of records to return (default varies, max 5000)

#### `opm_status_types`

List all possible federal government operating status types.
Returns reference data for status categories: Open, Closed, Delayed Arrival, Early Departure, etc.

---

## Meta

### Data.gov (CKAN Catalog)

Search and explore the Data.gov federal open data catalog — 400K+ datasets from hundreds of federal agencies. Find datasets by topic, agency, format, or keyword. Get full metadata including download URLs, update frequency, and data dictionaries. No API key required.

**Workflow:** Use datagov_search_datasets to discover datasets by keyword/topic/agency → datagov_dataset_detail for full metadata and resource download URLs → datagov_list_organizations to browse federal agencies publishing data.

**Tips:** Use fq (filter query) for precise filtering: 'organization:nasa' or 'res_format:CSV'. Combine q (free text) with fq for targeted searches. facet.field can be 'organization', 'tags', 'res_format', 'groups' for aggregations. Sort options: 'relevance asc', 'metadata_modified desc', 'name asc'. The id param in dataset_detail accepts either the dataset name (slug) or UUID.

| Tool | Description | · No auth required |
|------|-------------|---|
| `datagov_search_datasets` | Search the Data.gov federal open data catalog (400K+ datasets). |
| `datagov_dataset_detail` | Get full metadata for a Data.gov dataset by name (slug) or UUID. |
| `datagov_list_organizations` | List federal agencies publishing data on Data.gov. |

#### `datagov_search_datasets`

Search the Data.gov federal open data catalog (400K+ datasets).
Find datasets by keyword, topic, agency, or format.
Use fq for precise filtering: 'organization:nasa-gov', 'res_format:CSV', 'tags:climate'.
Returns dataset name, title, organization, description, resource count, and tags.

**Parameters:**
- `q` — Free-text search query: 'climate change', 'census', 'air quality'
- `fq` — Filter query (Solr syntax): 'organization:nasa-gov', 'res_format:CSV', 'tags:health'
- `sort` — Sort order: 'relevance asc' (default), 'metadata_modified desc', 'name asc'
- `rows` — Number of results (default 20, max 1000)
- `start` — Offset for pagination (default 0)
- `facet_field` — Field to facet on: 'organization', 'tags', 'res_format', 'groups'

#### `datagov_dataset_detail`

Get full metadata for a Data.gov dataset by name (slug) or UUID.
Returns title, description, organization, resources (with download URLs and formats), tags, license, author, maintainer, and modification dates.

**Parameters:**
- `id` **(required)** — Dataset name (slug) or UUID: 'annual-enterprise-survey' or 'a1b2c3d4-...'

#### `datagov_list_organizations`

List federal agencies publishing data on Data.gov.
Returns agency name, title, description, and dataset count.
Sorted by dataset count (most prolific first) by default.

**Parameters:**
- `sort` — Sort order: 'package_count desc' (default), 'name asc', 'title asc'
- `limit` — Number of results (default 50, max 1000)
- `offset` — Offset for pagination (default 0)

---

## Consumer Protection

### FTC (Federal Trade Commission)

Federal Trade Commission — Do Not Call complaint data and HSR merger early termination notices. Requires DATA_GOV_API_KEY.

**Workflow:** ftc_dnc_complaints to search Do Not Call complaints by state/city/subject → ftc_hsr_notices to search Hart-Scott-Rodino merger early termination notices

**Tips:** DNC complaints can be filtered by state (2-letter code), city, subject, and robocall flag. HSR notices can be searched by company title or transaction number. Both endpoints use pagination — use page and page_size to navigate results.

| Tool | Description | · Auth: `DATA_GOV_API_KEY` |
|------|-------------|---|
| `ftc_dnc_complaints` | Search FTC Do Not Call (DNC) telemarketing complaints. |
| `ftc_hsr_notices` | Search FTC Hart-Scott-Rodino (HSR) merger early termination notices. |

#### `ftc_dnc_complaints`

Search FTC Do Not Call (DNC) telemarketing complaints.
Filter by consumer state, city, subject, or robocall flag.
Returns complaint records with phone numbers, dates, and violation details.

Example: consumer_state='CA', is_robocall=true

**Parameters:**
- `consumer_state` — 2-letter state code (e.g. 'CA', 'NY', 'TX')
- `consumer_city` — Consumer city name
- `subject` — Complaint subject keyword
- `is_robocall` — Filter to robocall/recorded message complaints only
- `page_size` — Results per page (default 25, max 100)
- `page` — Page number (default 1)

#### `ftc_hsr_notices`

Search FTC Hart-Scott-Rodino (HSR) merger early termination notices.
Filter by company title or transaction number.
Returns notices with transaction details and dates.

Example: title='Google'

**Parameters:**
- `title` — Company or transaction title to search
- `transaction_number` — Specific HSR transaction number
- `page_size` — Results per page (default 25, max 100)
- `page` — Page number (default 0, zero-indexed)

---

## Space

### NASA Image & Video Library

Search and retrieve NASA's media archive — images, videos, and audio from missions, telescopes, events, and more.

**Workflow:** nasa_image_search to find media → nasa_image_asset to get rendition URLs → nasa_image_metadata or nasa_image_captions for details

**Tips:** Use media_type to filter by image/video/audio. Keywords and center (e.g. 'JSC', 'KSC', 'JPL') help narrow results. Year range filters are useful for historical queries.

| Tool | Description | · No auth required |
|------|-------------|---|
| `nasa_image_search` | Search NASA's image, video, and audio library. |
| `nasa_image_asset` | Get all rendition URLs (original, large, medium, small, thumbnail) for a NASA media asset. |
| `nasa_image_metadata` | Get the URL to the full EXIF/XMP/IPTC metadata JSON file for a NASA media asset. |
| `nasa_image_captions` | Get the URL to the SRT subtitle/captions file for a NASA video asset. |

#### `nasa_image_search`

Search NASA's image, video, and audio library.
Filter by keyword, center (JSC, KSC, JPL, GSFC, etc.), media type, year range, and more.

**Parameters:**
- `q` — Free-text search query
- `center` — NASA center code, e.g. 'JSC', 'KSC', 'JPL'
- `description` — Search within description field
- `keywords` — Comma-separated keywords to match
- `location` — Location filter, e.g. 'Kennedy Space Center'
- `media_type` — Filter by media type
- `nasa_id` — Exact NASA ID to search for
- `photographer` — Photographer name
- `title` — Search within title field
- `year_start` — Start year, e.g. '1969'
- `year_end` — End year, e.g. '1972'
- `page` — Page number (default 1)
- `page_size` — Results per page (default 100, max 100)

#### `nasa_image_asset`

Get all rendition URLs (original, large, medium, small, thumbnail) for a NASA media asset.
Use a nasa_id from search results.

**Parameters:**
- `nasa_id` **(required)** — NASA media ID, e.g. 'as11-40-5874' (Apollo 11 moonwalk)

#### `nasa_image_metadata`

Get the URL to the full EXIF/XMP/IPTC metadata JSON file for a NASA media asset.

**Parameters:**
- `nasa_id` **(required)** — NASA media ID

#### `nasa_image_captions`

Get the URL to the SRT subtitle/captions file for a NASA video asset.

**Parameters:**
- `nasa_id` **(required)** — NASA video ID

---

## Research

### USPTO Open Data Portal

U.S. Patent & Trademark Office Open Data Portal (ODP) -- search patent applications, get prosecution history, assignments, continuity, documents, PTAB trial proceedings/decisions, petition decisions, and bulk datasets. Covers all U.S. patent application data via api.uspto.gov.

**Workflow:** Use uspto_search_applications to find applications by keyword, type, or date -> uspto_application_details for full data on a specific application -> uspto_application_continuity for parent/child chains -> uspto_application_transactions for prosecution history -> uspto_ptab_proceedings for PTAB trials -> uspto_ptab_decisions for trial decisions.

**Tips:** Query syntax: boolean operators (AND, OR, NOT), wildcards (*), exact phrases, field:value (e.g. applicationNumberText:14412875), range [2021-01-01 TO 2021-12-31], comparison (>600). Application type codes: UTL=Utility, DES=Design. Rate limit: burst=1 (sequential only), 4-15 req/sec, 5M metadata calls/week, weekly reset Sunday midnight UTC. On HTTP 429 wait 5+ seconds. PTAB trial types: IPR (Inter Partes Review), PGR (Post Grant Review), CBM (Covered Business Method).

| Tool | Description | · Auth: `USPTO_API_KEY` |
|------|-------------|---|
| `uspto_search_applications` | Search USPTO patent applications using ODP query syntax (POST). The q param supports opensearch DSL: boolean (AND/OR/NOT), wildcards (* ?), exact phrases (""), field:value, ranges ([from TO to]), comparisons (>=600). Filters narrow results by field value. Range filters narrow by date/number range. All params are optional -- an empty search returns recent applications. |
| `uspto_application_details` | Get full patent application data by application number. Returns all metadata including filing date, grant date, status, inventors, applicant, patent number, type, and prosecution details. |
| `uspto_application_continuity` | Get continuity (parent/child application chain) data for a patent application. Shows parent applications (continuations, divisionals, CIPs) and child applications. |
| `uspto_application_assignments` | Get assignment (ownership transfer) records for a patent application. Shows conveyance type, assignor, assignee, and dates. |
| `uspto_application_transactions` | Get transaction (prosecution history) events for a patent application. Shows office actions, responses, examiner actions, and status changes with dates. |
| `uspto_application_documents` | List documents filed in a patent application (office actions, amendments, drawings, etc.). Filter by document code or date range. |
| `uspto_ptab_proceedings` | Search PTAB (Patent Trial and Appeal Board) trial proceedings - IPR, PGR, CBM, and derivation proceedings. Search by trial number, patent owner, petitioner, technology center, status, or date range. |
| `uspto_ptab_proceeding_details` | Get details for a specific PTAB trial proceeding by trial number (e.g. 'IPR2025-01319'). |
| `uspto_ptab_decisions` | Search PTAB trial decisions. Find institution decisions, final written decisions, and other PTAB rulings. Search by trial type, outcome, patent owner, grant date range. |
| `uspto_petition_decisions` | Search USPTO petition decisions - petitions for extension of time, revival, suspension, etc. Search by applicant name, decision type, technology center, date range. |

#### `uspto_search_applications`

Search USPTO patent applications using ODP query syntax (POST). The q param supports opensearch DSL: boolean (AND/OR/NOT), wildcards (* ?), exact phrases (""), field:value, ranges ([from TO to]), comparisons (>=600). Filters narrow results by field value. Range filters narrow by date/number range. All params are optional -- an empty search returns recent applications.

**Parameters:**
- `q` — Search query - e.g. 'applicationMetaData.applicationTypeLabelName:Utility', 'applicationNumberText:14412875', free text 'machine learning', or 'applicationMetaData.filingDate:[2024-01-01 TO 2024-12-31]'
- `filters` — Array of filters as 'field value1,value2' strings - e.g. ['applicationMetaData.applicationTypeCode UTL,DES', 'applicationMetaData.entityStatusData.businessEntityStatusCategory Small']. Each entry adds an AND-combined filter; multiple values within a filter act as OR.
- `range_filters` — Array of range filters as 'field from:to' strings - e.g. ['applicationMetaData.grantDate 2020-01-01:2024-12-31', 'applicationMetaData.applicationStatusCode 150:200']. Valid for date and number fields only.
- `sort` — Sort as 'field order' - e.g. 'applicationMetaData.filingDate desc'. Default: filingDate desc. Text fields cannot be sorted.
- `fields` — Fields to include in response - e.g. ['applicationNumberText', 'applicationMetaData.patentNumber', 'applicationMetaData.filingDate']. Omit for all fields. Supports wildcards like '*Date*'.
- `offset` — Starting position (default 0)
- `limit` — Results per page (default 25)
- `facets` — Fields to aggregate - e.g. ['applicationMetaData.applicationTypeLabelName', 'applicationMetaData.applicationStatusCode']. Text fields not supported.

#### `uspto_application_details`

Get full patent application data by application number. Returns all metadata including filing date, grant date, status, inventors, applicant, patent number, type, and prosecution details.

**Parameters:**
- `application_number` **(required)** — Application number (e.g. '14412875'). For PCT, use encoded format (e.g. 'PCTUS0719317')

#### `uspto_application_continuity`

Get continuity (parent/child application chain) data for a patent application. Shows parent applications (continuations, divisionals, CIPs) and child applications.

**Parameters:**
- `application_number` **(required)** — Application number

#### `uspto_application_assignments`

Get assignment (ownership transfer) records for a patent application. Shows conveyance type, assignor, assignee, and dates.

**Parameters:**
- `application_number` **(required)** — Application number

#### `uspto_application_transactions`

Get transaction (prosecution history) events for a patent application. Shows office actions, responses, examiner actions, and status changes with dates.

**Parameters:**
- `application_number` **(required)** — Application number

#### `uspto_application_documents`

List documents filed in a patent application (office actions, amendments, drawings, etc.). Filter by document code or date range.

**Parameters:**
- `application_number` **(required)** — Application number
- `document_codes` — Comma-separated document codes  e.g. 'WFEE' (fee worksheet), 'SRFW,SRNT' (search forward/notice)
- `date_from` — Official date from (yyyy-MM-dd)
- `date_to` — Official date to (yyyy-MM-dd)

#### `uspto_ptab_proceedings`

Search PTAB (Patent Trial and Appeal Board) trial proceedings - IPR, PGR, CBM, and derivation proceedings. Search by trial number, patent owner, petitioner, technology center, status, or date range.

**Parameters:**
- `q` — Search query - e.g. 'trialMetaData.trialTypeCode:IPR', 'patentOwnerData.patentOwnerName:Apple'
- `filters` — Array of filters as 'field value' - e.g. ['trialMetaData.trialTypeCode IPR', 'patentOwnerData.technologyCenterNumber 3700']
- `range_filters` — Array of range filters as 'field from:to' - e.g. ['trialMetaData.petitionFilingDate 2023-01-01:2024-12-31']
- `sort` — Sort as 'field order' - e.g. 'patentOwnerData.technologyCenterNumber desc'
- `fields` — Fields to include in response
- `offset` — Starting position (default 0)
- `limit` — Results per page (default 25)

#### `uspto_ptab_proceeding_details`

Get details for a specific PTAB trial proceeding by trial number (e.g. 'IPR2025-01319').

**Parameters:**
- `trial_number` **(required)** — Trial number (e.g. 'IPR2025-01319')

#### `uspto_ptab_decisions`

Search PTAB trial decisions. Find institution decisions, final written decisions, and other PTAB rulings. Search by trial type, outcome, patent owner, grant date range.

**Parameters:**
- `q` — Search query - e.g. 'trialMetaData.trialTypeCode:IPR AND patentOwnerData.groupArtUnitNumber:2884'
- `filters` — Array of filters as 'field value' - e.g. ['trialMetaData.trialTypeCode IPR']
- `range_filters` — Array of range filters as 'field from:to' - e.g. ['respondentData.grantDate 2023-01-01:2024-12-31']
- `sort` — Sort as 'field order'
- `fields` — Fields to include in response
- `offset` — Starting position (default 0)
- `limit` — Results per page (default 25)

#### `uspto_petition_decisions`

Search USPTO petition decisions - petitions for extension of time, revival, suspension, etc. Search by applicant name, decision type, technology center, date range.

**Parameters:**
- `q` — Search query - e.g. 'firstApplicantName:BRANT*', 'decisionTypeCodeDescriptionText:Denied'
- `filters` — Array of filters as 'field value' - e.g. ['technologyCenter 3600', 'businessEntityStatusCategory Small']
- `range_filters` — Array of range filters as 'field from:to' - e.g. ['petitionMailDate 2021-01-01:2025-01-01']
- `sort` — Sort as 'field order' - e.g. 'petitionMailDate desc'
- `fields` — Fields to include in response
- `offset` — Starting position (default 0)
- `limit` — Results per page (default 25)

---

