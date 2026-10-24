// Horizontal bar. `value` is relative to `max` (default 100 = percentage).
export default function ProgressBar({ value, max = 100, color, label }) {
  const pct = max > 0 && Number.isFinite(value) ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
  return (
    <div
      className="track"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={Number.isFinite(value) ? value : undefined}
    >
      <i style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}
