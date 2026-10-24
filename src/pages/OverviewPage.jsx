import { MapPinned } from "lucide-react";
import { Card, CardHeader, Notice, SectionHeader } from "../components/common";
import { DemographicBar, SegmentList } from "../components/dashboard";
import { COLORS } from "../constants/theme.js";
import { useDashboard } from "../context/DashboardContext.jsx";
import { countWinnersByParty, hasResult } from "../utils/analytics.js";
import { getInitials, num, percent } from "../utils/formatters.js";
import { UNAVAILABLE } from "../constants/dashboard.js";

export default function OverviewPage() {
  const { data, latest, assemblies, setPage, openAssembly } = useDashboard();
  const { coverage, segments, demographics: demo } = data.overview;
  const winner = latest.winner;
  const partyCounts = Object.entries(countWinnersByParty(assemblies));

  const demographicRows = [
    ["Urban population", demo.urban, COLORS.primarySoft],
    ["Rural population", demo.rural, COLORS.primaryLight],
    ["Scheduled Castes", demo.sc, COLORS.green],
    ["Scheduled Tribes", demo.st, COLORS.amber],
    ["Literacy", demo.literacy, COLORS.sky],
  ];

  return (
    <>
      <SectionHeader
        tag="MODULE 01"
        title="Constituency overview"
        subtitle="Geography, assembly segments, and demographic context."
      />
      <div className="two">
        <Card>
          <CardHeader
            tag="GEOGRAPHICAL PROFILE"
            title={`1 parliamentary seat · ${segments.length === 7 ? "7" : segments.length} assembly segments`}
            icon={MapPinned}
          />
          <p className="body-copy">{coverage}</p>
          <SegmentList segments={segments} onSelect={openAssembly} />
          <button className="text-link" onClick={() => setPage("assembly")}>
            Explore assembly segments →
          </button>
        </Card>
        <Card>
          <CardHeader tag="DEMOGRAPHIC PROFILE" title="Population context" />
          <span className="year-tag">Census {demo.year}</span>
          <div className="population">
            <b>{num(demo.population)}</b>
            <small>Population · {demo.year}</small>
          </div>
          {demographicRows.map(([label, value, color]) => (
            <DemographicBar key={label} label={label} value={value} color={color} />
          ))}
          <p className="small-note">
            Gender distribution: unavailable in this constituency-level dataset.
          </p>
        </Card>
      </div>
      <div className="two below">
        <Card>
          <CardHeader tag="LATEST PARLIAMENTARY RESULT" title={`${latest.year} winner profile`} />
          <div className="winner">
            <div className="initials">{getInitials(winner?.name) || "—"}</div>
            <div>
              <b>{winner?.name ?? UNAVAILABLE}</b>
              <small>{winner?.party ?? UNAVAILABLE}</small>
            </div>
            <strong>
              {num(winner?.votes)}
              <small>votes received</small>
            </strong>
          </div>
          <div className="mini-kpis">
            <div>
              <span>Vote share</span>
              <b>{percent(winner?.share)}</b>
            </div>
            <div>
              <span>Runner-up</span>
              <b>{latest.runner?.name ?? UNAVAILABLE}</b>
            </div>
            <div>
              <span>Margin</span>
              <b>{num(latest.margin)}</b>
            </div>
          </div>
          <button className="text-link" onClick={() => setPage("parliament")}>
            Historical election analysis →
          </button>
        </Card>
        <Card>
          <CardHeader tag="ASSEMBLY COVERAGE" title="2023 segment results available" />
          <div className="big-count">
            <b>{assemblies.filter(hasResult).length}</b>
            <span>
              of {segments.length} segments have winner and runner-up records in this snapshot
            </span>
          </div>
          <div className="party-counts">
            {partyCounts.map(([party, n]) => (
              <div key={party}>
                <i /> <b>{party}</b>
                <span>{n} seats</span>
              </div>
            ))}
          </div>
          <button className="text-link" onClick={() => setPage("assembly")}>
            Open Assembly Explorer →
          </button>
        </Card>
      </div>
      <Notice>
        Population and demographic percentages use reference year {demo.year}. Electoral KPIs use the{" "}
        {latest.year} parliamentary election. Missing fields are labelled rather than estimated.
      </Notice>
    </>
  );
}
