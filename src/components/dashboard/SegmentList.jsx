export default function SegmentList({ segments, onSelect }) {
  return (
    <div className="segments">
      {segments.map((s) => (
        <button key={s.number} onClick={() => onSelect(s.number)}>
          <strong>{s.number}</strong>
          <span>
            {s.name}
            <small>{s.reservation || "General"} assembly segment</small>
          </span>
          <b aria-hidden="true">↗</b>
        </button>
      ))}
    </div>
  );
}
