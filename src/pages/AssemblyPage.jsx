import { Card, CardHeader, FilterSelect, MiniCard, Notice, SectionHeader, StatusMessage } from "../components/common";
import { AssemblyChart } from "../components/charts";
import { AssemblyTable, VoteComparisonBar } from "../components/dashboard";
import { ASSEMBLY_YEAR_OPTIONS, UNAVAILABLE } from "../constants/dashboard.js";
import { COLORS } from "../constants/theme.js";
import { useDashboard } from "../context/DashboardContext.jsx";
import { num } from "../utils/formatters.js";

function AssemblyDetail({ ac }) {
  const { winner, runner } = ac;
  
  if (!winner || !runner) {
    return (
      <StatusMessage
        title="No result in this dataset"
        message={`Winner and runner-up for ${ac.name} (${ac.year}) are unavailable.`}
      />
    );
  }
  return (
    <>
      <div className="ac-hero">
        <span>{ac.number}</span>
        <div>
          <small>ASSEMBLY CONSTITUENCY · {ac.year}</small>
          <h3>{ac.name}</h3>
          <p>Telangana Legislative Assembly · Result snapshot</p>
        </div>
        <div className="margin">
          <small>WINNING MARGIN</small>
          <b>{num(ac.margin)}</b>
          <small>votes</small>
        </div>
      </div>
      <div className="four mini-cards">
        <MiniCard label="Winner" value={winner.name} detail={winner.party} />
        <MiniCard label="Winner votes" value={num(winner.votes)} detail="Candidate total" />
        <MiniCard label="Runner-up" value={runner.name} detail={runner.party} />
        <MiniCard
          label="Registered electors"
          value={num(ac.electors)}
          detail={ac.electors ? "ECI summary report" : "Unavailable in this view"}
        />
      </div>
      <Card>
        <CardHeader tag="TOP-TWO COMPARISON" title={`${ac.name} · votes by candidate`} />
        <VoteComparisonBar label={winner.name} party={winner.party} votes={winner.votes} max={winner.votes} color={COLORS.primarySoft} />
        <VoteComparisonBar label={runner.name} party={runner.party} votes={runner.votes} max={winner.votes} color={COLORS.green} />
        <Notice>
          Full candidate list, turnout and valid-vote denominator are not included for this Assembly
          segment in the compact dataset.
        </Notice>
      </Card>
    </>
  );
}

export default function AssemblyPage() {
  const { data, assemblies, selectedAc, ac, acYear, setAc, setAcYear } = useDashboard();
  const segmentOptions = data.overview.segments.map((s) => ({
    value: s.number,
    label: `${s.number} · ${s.name}`,
  }));

  return (
    <>
      <SectionHeader
        tag="MODULE 03"
        title="Assembly Constituency explorer"
        subtitle="Inspect results for the seven Assembly segments within Malkajgiri."
        side={
          <div className="filters">
            <FilterSelect label="Assembly constituency" value={ac} onChange={setAc} options={segmentOptions} />
            <FilterSelect label="Election year" value={acYear} onChange={setAcYear} options={ASSEMBLY_YEAR_OPTIONS} />
          </div>
        }
      />
      {selectedAc ? (
        <AssemblyDetail ac={selectedAc} />
      ) : (
        <StatusMessage
          title="No result in this dataset"
          message={`Results for this constituency in ${acYear} are unavailable. Select 2023 to view the included snapshots.`}
        />
      )}
      <Card className="chart-row-single">
        <CardHeader tag="SEGMENT COMPARISON" title="2023 winning margins across assembly segments" />
        <AssemblyChart rows={assemblies} />
        <AssemblyTable rows={assemblies} />
      </Card>
    </>
  );
}
