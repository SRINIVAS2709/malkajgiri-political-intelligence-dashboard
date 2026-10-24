import { TREND_METRICS } from "../../constants/dashboard.js";
import { getTrendValue } from "../../utils/analytics.js";
import TrendLineChart from "./TrendLineChart.jsx";

// Metric-by-election-year line chart.
export default function HistoryChart({ rows, metric }) {
  const label = TREND_METRICS.find((m) => m.value === metric)?.label ?? TREND_METRICS[0].label;
  const data = rows.map((e) => ({
    year: String(e.year),
    [label]: getTrendValue(e, metric),
  }));
  return <TrendLineChart data={data} seriesName={label} title={`${label} by year`} />;
}
