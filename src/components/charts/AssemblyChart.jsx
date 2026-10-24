import { COLORS } from "../../constants/theme.js";
import HorizontalBarChart from "./HorizontalBarChart.jsx";

// Winning margin per assembly segment.
export default function AssemblyChart({ rows }) {
  const data = rows.map((r) => ({ name: r.name, margin: r.margin }));
  return (
    <HorizontalBarChart
      data={data}
      valueKey="margin"
      valueLabel="Winning margin"
      color={COLORS.green}
      title="Winning margin by assembly segment"
    />
  );
}
