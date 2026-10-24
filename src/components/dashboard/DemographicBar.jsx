import { ProgressBar } from "../common";
import { percent } from "../../utils/formatters.js";

export default function DemographicBar({ label, value, color }) {
  return (
    <div className="demobar">
      <div>
        <span>{label}</span>
        <b>{percent(value)}</b>
      </div>
      <ProgressBar value={value} color={color} label={label} />
    </div>
  );
}
