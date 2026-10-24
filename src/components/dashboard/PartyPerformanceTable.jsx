import { DataTable } from "../common";
import { percent } from "../../utils/formatters.js";

// Party vote share per election year (top-three candidates only).
export default function PartyPerformanceTable({ elections, parties }) {
  const columns = [
    { key: "party", header: "Party", render: (p) => <span className="party">{p}</span> },
    ...elections.map((e) => ({
      key: `y${e.year}`,
      header: `${e.year} share`,
      align: "right",
      render: (p) => {
        const c = e.candidates.find((c) => c.short === p);
        return c ? percent(c.share) : "—";
      },
    })),
    {
      key: "coverage",
      header: "Data coverage",
      render: (p) =>
        `${elections.filter((e) => e.candidates.some((c) => c.short === p)).length} of ${elections.length} years`,
    },
  ];
  return (
    <DataTable
      columns={columns}
      rows={parties}
      rowKey={(p) => p}
      ariaLabel="Party vote share by election year"
    />
  );
}
