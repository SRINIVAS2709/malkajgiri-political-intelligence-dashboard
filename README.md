# Malkajgiri Political Intelligence Dashboard

Responsive React dashboard covering all assignment modules: Constituency Overview, Historical Parliamentary Election Analysis, Assembly Constituency Explorer, Electoral Trends.

## Live URL
https://political-intelligence-dashboard-umber.vercel.app/

## Run locally
Requires Node.js 18+ and npm. Run `npm install`, `npm run dev`. Run tests with `npm run test`; production build with `npm run build`.

## Features
- Overview with PC number/state, seven Assembly segments, Census 2011 demographic indicators and 2024 KPIs.
- Parliamentary election year filter (2014, 2019, 2024), candidate vote shares, margins, turnout, candidate table and charts.
- Assembly selector for all seven segments, 2023 winner/runner-up comparisons, margins and clear missing-data messaging.
- Trend selector for winner share, margin and turnout; party performance table and assembly margin chart.
- Responsive layout, interactive navigation, candidate search, CSV export, loading/error states.

## Project structure
```
src/
  App.jsx                    Data loading gate + layout + page switching
  context/DashboardContext   Dashboard state (page, filters) via useReducer + derived data
  hooks/useDataset           Fetch with loading / error / retry / abort
  services/dataService       JSON loading + dataset validation
  utils/                     analytics (calculations), formatters, csv  - pure functions
  constants/                 navigation, dashboard options, chart colours
  components/
    common/                  Card, CardHeader, SectionHeader, KpiCard, MiniCard, Notice,
                             FilterSelect, SearchInput, ProgressBar, DataTable, StatusMessage
    charts/                  TrendLineChart, HorizontalBarChart (generic) + HistoryChart,
                             VotesChart, AssemblyChart
    layout/                  Sidebar, Topbar, Hero, QuickNav, Footer
    dashboard/               ConstituencySnapshot, SegmentList, CandidateTable, AssemblyTable,
                             PartyPerformanceTable, DemographicBar, VoteComparisonBar, SourceRow, FormulaRow
  pages/                     Overview, Parliament, Assembly, Trends, Sources
```
Data flow: `service -> useDataset -> DashboardProvider (filters + derived data) -> pages -> components`.

## Data approach
`public/data/political-data.json` is loaded through `src/services/dataService.js`; it is a static local snapshot, not a live API. Candidate tables include leading three parliamentary candidates only. Assembly 2023 snapshots include winners and runner-ups; missing electors/turnout fields remain unavailable.

## Source URLs
- ECI results: https://results.eci.gov.in/
- ECI 2014 detailed results: https://www.eci.gov.in/eci-backend/public/api/download?url=LMAhAK6sOPBp%2FNFF0iRfXbEB1EVSLT41NNLRjYNJJP1KivrUxbfqkDatmHy12e%2FzVx8fLfn2ReU7TfrqYobgIhF%2FZR0A1hI1LugemKEAHBUkKsDmSKlr%2BORN5EjX%2BX%2FP44987Vx6Oc50gQpI6P4je5YJD2JjKrjaK3Vzxw1dTTB1gfiU%2BxnVaxMZ%2BnbWDNR%2B
- ECI Telangana 2023 detailed results: https://www.eci.gov.in/eci-backend/public/all_files/full-statistical-reports/telangana/2023/Detailed_Results.pdf
- ECI Telangana 2023 constituency summary: https://www.eci.gov.in/eci-backend/public/all_files/full-statistical-reports/telangana/2023/Constituency_Data_Summery_Report.pdf
- Census of India Population Finder 2011: https://censusindia.mha.gov.in/census.website/en/data/population-finder
- Constituency factbook demographic cross-reference: https://www.indiastatpublications.com/Constituency_Factbook/Telangana/Malkajgiri
- Assembly segment reference: https://www.hindustantimes.com/india-news/lok-sabha-elections-2019-malkajgiri-constituency-in-telangana/story-DKS3Irx05auAJKtUbrZ32K.html

## Methodology
- Valid votes = votes polled minus NOTA votes.
- Vote share (%) = candidate votes / valid votes * 100.
- Winning margin = winner votes - runner-up votes; NOTA is not ranked as a candidate.
- Margin (%) = margin / valid votes * 100.
- Turnout (%) = votes polled / registered electors * 100; a published turnout figure is retained as fallback.
- Missing fields are shown as unavailable, not imputed. Party values absent from the top-three subset are not interpreted as zero. Demographics use reference year 2011, not current estimates.

## Test and manual QA
`npm test` checks analytics calculations (vote shares, margins, empty candidate pools, and party winner counts), Indian formatting rules (lakh/crore comma grouping and percentage rounding), CSV escaping, dataset schema validation, component behaviors (ProgressBar clamping, DataTable empty states, and error retries), and filtered view updates (year switching and candidate searching). Manually verified CSV download payloads, responsive layouts, and `npm run build`.

