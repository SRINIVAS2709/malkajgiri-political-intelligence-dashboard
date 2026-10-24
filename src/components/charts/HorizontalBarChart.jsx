import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { COLORS } from "../../constants/theme.js";
import { compact, num } from "../../utils/formatters.js";

// Generic horizontal bar chart.
// data: [{ [categoryKey]: "Medchal", [valueKey]: 33419 }]
export default function HorizontalBarChart({
  data,
  categoryKey = "name",
  valueKey,
  valueLabel,
  color = COLORS.primary,
  yAxisWidth = 140,
  margin = { top: 5, right: 18, left: 4, bottom: 5 },
  title,
}) {
  const summary = data.map((d) => `${d[categoryKey]}: ${num(d[valueKey])}`).join(", ");
  return (
    <div className="chart" role="img" aria-label={`${title ?? valueLabel}. ${summary}`}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={margin}>
          <CartesianGrid stroke={COLORS.grid} strokeDasharray="3 3" horizontal={false} />
          <XAxis
            type="number"
            tickFormatter={compact}
            tick={{ fontSize: 10, fill: COLORS.tickMuted }}
          />
          <YAxis
            type="category"
            dataKey={categoryKey}
            width={yAxisWidth}
            tick={{ fontSize: 10, fill: COLORS.tickDark }}
          />
          <Tooltip formatter={(v) => [num(v), valueLabel]} />
          <Bar dataKey={valueKey} fill={color} radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
