import { Card, CardHeader, FilterSelect, Notice, SectionHeader } from "../components/common";
import { AssemblyChart, HistoryChart } from "../components/charts";
import { PartyPerformanceTable } from "../components/dashboard";
import { TRACKED_PARTIES, TREND_METRICS } from "../constants/dashboard.js";
import { useDashboard } from "../context/DashboardContext.jsx";

export default function TrendsPage() {
  const { elections, assemblies, metric, setMetric } = useDashboard();
  const metricLabel = TREND_METRICS.find((m) => m.value === metric)?.label;

  return (
    <>
      <SectionHeader
        tag="MODULE 04"
        title="Electoral trends & summary indicators"
        subtitle="Explore aggregate shifts across parliamentary elections and compare Assembly-level margins."
        side={<FilterSelect label="Trend metric" value={metric} onChange={setMetric} options={TREND_METRICS} />}
      />
      <div className="two chart-row">
        <Card>
          <CardHeader tag="HISTORICAL PATTERN" title={`${metricLabel} by year`} />
          <HistoryChart rows={elections} metric={metric} />
        </Card>
        <Card>
          <CardHeader tag="ASSEMBLY COMPARISON" title="2023 winning margins" />
          <AssemblyChart rows={assemblies} />
        </Card>
      </div>
      <Card className="table-card">
        <CardHeader tag="PARTY PERFORMANCE" title="Leading candidate party share across election years" />
        <PartyPerformanceTable elections={elections} parties={TRACKED_PARTIES} />
        <p className="footnote">
          A dash means the party is not present in the top-three subset in that year, not that it
          received zero votes.
        </p>
      </Card>
    </>
  );
}
