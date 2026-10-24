import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { COLORS } from "../../constants/theme.js";
import { percent } from "../../utils/formatters.js";

// Generic single-series line chart for percentage values.
// data: [{ [xKey]: "2024", [seriesName]: 52.1 }]
export default function TrendLineChart({ data, xKey = "year", seriesName, title }) {
  const summary = data.map((d) => `${d[xKey]}: ${percent(d[seriesName])}`).join(", ");
  return (
    <div className="chart" role="img" aria-label={`${title ?? seriesName}. ${summary}`}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 14, right: 15, left: 0, bottom: 3 }}>
          <CartesianGrid stroke={COLORS.grid} strokeDasharray="4 4" vertical={false} />
          <XAxis
            dataKey={xKey}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: COLORS.tickMuted }}
          />
          <YAxis
            unit="%"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: COLORS.tickMuted }}
          />
          <Tooltip
            formatter={(v) => [
              typeof v === "number" ? `${v.toFixed(2)}%` : "Unavailable",
              seriesName,
            ]}
          />
          <Line
            dataKey={seriesName}
            stroke={COLORS.primary}
            strokeWidth={3}
            dot={{ r: 5, fill: COLORS.primary, stroke: "#fff", strokeWidth: 2 }}
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
