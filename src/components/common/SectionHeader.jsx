// Page title row. `side` is an optional slot for filters.
export default function SectionHeader({ tag, title, subtitle, side }) {
  return (
    <div className="title-row section-head">
      <div>
        <span className="eyebrow">{tag}</span>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      {side}
    </div>
  );
}
