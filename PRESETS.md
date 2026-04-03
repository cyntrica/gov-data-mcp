# Gov Data MCP — Module Presets

Loading all 114 modules (562 tools) injects ~84,000 tokens of tool schemas into every message.
Use `--modules` to load only what you need. Each preset below is designed to be focused and token-efficient.

## Using Presets

```bash
# Load a specific preset
npx gov-data-mcp --modules fred,bls,bea,treasury,census,eia

# Combine presets (comma-separated, no spaces)
npx gov-data-mcp --modules fred,bls,bea,congress,fec,senate-lobbying
```

On **CynMCP**, create separate server entries with different `--modules` flags:
```json
{
  "name": "gov-econ",
  "displayName": "Gov Data: Economy",
  "command": "/opt/homebrew/bin/npx",
  "args": ["-y", "gov-data-mcp@latest", "--modules", "fred,bls,bea,treasury,census,eia,dol"],
  "autoStart": true
}
```

---

## Recommended Presets

### Economy & Fiscal (~40 tools)
```
fred,bls,bea,treasury,census,eia,dol
```
GDP, employment, CPI, inflation, energy prices, labor statistics, fiscal data.

### Health & Pharma (~75 tools)
```
fda,cdc,clinical-trials,cms,nih,pubmed,open-payments,samhsa,va
```
Drug safety, disease data, clinical trials, hospital quality, pharma payments, treatment facilities.

### Legislative & Policy (~95 tools)
```
congress,federal-register,govinfo,regulations,senate-lobbying,ecfr,openstates
```
Bills, votes, executive orders, regulations, lobbying, CFR text, state legislation.

### Government Contracting (GovCon) (~25 tools)
```
sam-gov,usaspending,gsa-calc,fmcsa
```
Contract opportunities, spending data, GSA rates, motor carrier safety.

### Finance & Elections (~45 tools)
```
fec,sec,fdic,cfpb,cfpb-hmda,cftc,ofac,senate-lobbying,opensecrets,followthemoney
```
Campaign finance, SEC filings, banking, consumer complaints, mortgages, sanctions, lobbying, state campaign finance.

### Environment & Weather (~85 tools)
```
epa,noaa,nws,usgs,nrel,calfire,cdec,co-water,wqp,fws,usace-cwms,md-bay,mn-lakes
```
Air/water quality, weather, earthquakes, wildfires, water rights, endangered species, reservoirs, Chesapeake Bay.

### Transportation & Transit (~15 tools)
```
transit,state-511,faa-weather,ntsb,bts
```
12 transit systems via unified dispatcher, 15-state traffic, aviation weather, accident investigations.
**Uses consolidated `transit` module (3 tools) instead of 12 individual modules (34 tools).**

### Education & Research (~25 tools)
```
naep,college-scorecard,urban-ed,nsf,doe-osti,smithsonian,loc,nara
```
K-12 scores, college data, research funding, scientific publications, museum collections, archives.

### Maryland Focus (~30 tools)
```
state-data,md-traffic,md-bay,md-transit,transit
```
MD open data, CHART traffic, Chesapeake Bay, MTA transit, plus WMATA via transit dispatcher.

### State Data (~25 tools)
```
state-data,state-511,transit,openstates,nc-linc
```
50-state Socrata/GIS, 15-state traffic, 12-system transit, state legislation.

### Security & Safety (~25 tools)
```
nvd,cisa-kev,nhtsa,fema,cpsc,fbi
```
Vulnerabilities, vehicle safety, disasters, product recalls, crime data.

### Science & Space (~20 tools)
```
nasa-science,nasa-images,jpl,nsf,doe-osti,smithsonian
```
NEO, Mars Rover, space weather, asteroids, research grants, museum collections.

### Trade & International (~15 tools)
```
usitc,ita-trade,world-bank,state-travel,ofac
```
Import/export statistics, tariff rates, trade events, travel advisories, sanctions.

### Justice & Law (~25 tools)
```
fbi,doj-news,courtlistener,foia,openstates
```
Crime data, DOJ actions, case law, FOIA reports, state legislation.

### Full Federal (no state/transit) (~430 tools)
```
bea,bls,bts,careeronestop,cdc,census,cfpb,cfpb-hmda,cftc,cisa-kev,clinical-trials,cms,college-scorecard,congress,courtlistener,cpsc,dap,data-gov,doe-osti,doj-news,dol,ecfr,eia,epa,epa-aqs,faa-weather,fbi,fcc,fda,fdic,fec,federal-register,fema,fmcsa,foia,followthemoney,fred,ftc,fws,govinfo,gsa-calc,hud,ita-trade,jpl,loc,naep,nara,nasa-images,nasa-science,nhtsa,nih,nps,nrel,nsf,ntsb,nvd,nws,ofac,open-payments,opensecrets,opm,pubmed,recreation,regulations,sam-gov,sbir,sec,senate-lobbying,smithsonian,ssa,state-travel,treasury,urban-ed,usace-cwms,usajobs,usaspending,uscis,usda-fooddata,usda-nass,usgs,usitc,uspto,va,wqp,world-bank
```

### Everything (~565 tools)
```
(no --modules flag — loads all)
```

---

## Token Cost Estimates

| Preset | Modules | ~Tools | ~Tokens/msg |
|--------|---------|--------|-------------|
| Economy | 7 | 40 | 6,000 |
| GovCon | 4 | 25 | 3,750 |
| Transit | 5 | 15 | 2,250 |
| Health | 9 | 75 | 11,250 |
| Legislative | 7 | 95 | 14,250 |
| State Data | 5 | 25 | 3,750 |
| Full Federal | 85 | 430 | 64,500 |
| Everything | 114 | 562 | 84,300 |

**Rule of thumb:** ~150 tokens per tool for schema injection.
