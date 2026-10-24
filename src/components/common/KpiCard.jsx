export default function KpiCard({ icon: Icon, label, value, note, tone = "" }) {
  return (
    <article className="kpi">
      <div>
        <span>{label}</span>
        <i className={tone}>
          <Icon size={17} aria-hidden="true" />
        </i>
      </div>
      <b>{value}</b>
      <small>{note}</small>
    </article>
  );
}
