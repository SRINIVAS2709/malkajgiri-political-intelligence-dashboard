export default function SourceRow({ index, label, type, url }) {
  return (
    <div className="source-row">
      <span>{String(index + 1).padStart(2, "0")}</span>
      <div>
        <b>{label}</b>
        <small>{type}</small>
      </div>
      <a href={url} target="_blank" rel="noreferrer">
        Open source ↗
      </a>
    </div>
  );
}
