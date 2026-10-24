export default function MiniCard({ label, value, detail }) {
  return (
    <div className="mini">
      <span>{label}</span>
      <b>{value}</b>
      <small>{detail}</small>
    </div>
  );
}
