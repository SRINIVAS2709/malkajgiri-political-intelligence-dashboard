import { Card, CardHeader, FilterSelect, MiniCard, Notice, SearchInput, SectionHeader } from "../components/common";
import { HistoryChart, VotesChart } from "../components/charts";
import { CandidateTable } from "../components/dashboard";
import { useDashboard } from "../context/DashboardContext.jsx";
import { filterCandidates } from "../utils/analytics.js";
import { num, percent } from "../utils/formatters.js";
import { UNAVAILABLE } from "../constants/dashboard.js";

export default function ParliamentPage() {
  const { elections, selected, setYear, search, setSearch } = useDashboard();
  const yearOptions = elections.map((e) => ({ value: e.year, label: String(e.year) }));
  const visibleCandidates = filterCandidates(selected.candidates, search);

  return (
    <>
      <SectionHeader
        tag="MODULE 02"
        title="Historical parliamentary election analysis"
        subtitle="Compare winning candidates, vote share, margins and turnout across election years."
        side={
          <FilterSelect label="Election year" value={selected.year} onChange={setYear} options={yearOptions} />
        }
      />
      <div className="four mini-cards">
        <MiniCard label="Winner" value={selected.winner?.name ?? UNAVAILABLE} detail={selected.winner?.party ?? UNAVAILABLE} />
        <MiniCard label="Valid votes used" value={num(selected.valid)} detail="Votes polled minus NOTA" />
        <MiniCard label="Registered electors" value={num(selected.electors)} detail={`Reference ${selected.year}`} />
        <MiniCard label="Turnout" value={percent(selected.calculatedTurnout)} detail="Votes polled ÷ electors" />
      </div>
      <div className="two chart-row">
        <Card>
          <CardHeader tag="HISTORICAL PATTERN" title="Winner vote share by year" />
          <HistoryChart rows={elections} metric="share" />
        </Card>
        <Card>
          <CardHeader tag="CANDIDATE COMPARISON" title={`${selected.year} leading candidates`} />
          <VotesChart election={selected} />
        </Card>
      </div>
      <Card className="table-card">
        <CardHeader tag="RESULTS DETAIL" title={`Candidate-wise results · ${selected.year}`} />
        <SearchInput value={search} onChange={setSearch} placeholder="Search candidate or party…" label="Search candidates" />
        <CandidateTable candidates={visibleCandidates} year={selected.year} />
      </Card>
      <Notice>
        Full candidates list is not included in the compact dataset. Showing Top three candidates only.
      </Notice>
    </>
  );
}
