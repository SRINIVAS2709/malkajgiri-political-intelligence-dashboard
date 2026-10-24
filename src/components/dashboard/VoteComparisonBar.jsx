import { ProgressBar } from "../common";
import { num } from "../../utils/formatters.js";

// One candidate's votes drawn as a bar relative to `max`.
export default function VoteComparisonBar({ label, party, votes, max, color }) {
  return (
    <div className="compare">
      <div>
        <b>{label}</b>
        <span>{party}</span>
        <strong>{num(votes)}</strong>
      </div>
      <ProgressBar value={votes} max={max} color={color} label={`${label} votes`} />
    </div>
  );
}
