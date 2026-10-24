import { truncate } from "../../utils/formatters.js";
import HorizontalBarChart from "./HorizontalBarChart.jsx";

// Votes per candidate for one election.
export default function VotesChart({ election }) {
  const data = election.candidates.map((c) => ({
    name: truncate(c.name),
    votes: c.votes,
  }));
  return (
    <HorizontalBarChart
      data={data}
      valueKey="votes"
      valueLabel="Votes"
      yAxisWidth={145}
      margin={{ top: 6, right: 15, left: 5, bottom: 4 }}
      title={`${election.year} votes by candidate`}
    />
  );
}
