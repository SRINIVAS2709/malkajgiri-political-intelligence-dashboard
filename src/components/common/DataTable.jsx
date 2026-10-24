// Generic table.
// columns: [{ key, header, align?: "right", render?: (row, index) => node }]
export default function DataTable({
  columns,
  rows,
  rowKey,
  ariaLabel,
  emptyMessage = "No records to display.",
}) {
  return (
    <div className="table-scroll">
      <table aria-label={ariaLabel}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} scope="col" className={c.align === "right" ? "right" : undefined}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>{emptyMessage}</td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr key={rowKey(row, i)}>
                {columns.map((c) => (
                  <td key={c.key} className={c.align === "right" ? "right" : undefined}>
                    {c.render ? c.render(row, i) : row[c.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
