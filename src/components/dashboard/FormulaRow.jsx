export default function FormulaRow({ name, formula }) {
  return (
    <div className="formula">
      <b>{name}</b>
      <code>{formula}</code>
    </div>
  );
}
