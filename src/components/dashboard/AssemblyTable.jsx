import { DataTable } from "../common";
import { num } from "../../utils/formatters.js";
import { UNAVAILABLE } from "../../constants/dashboard.js";

const columns = [
  { key: "number", header: "AC no." },
  { key: "name", header: "Assembly constituency", render: (a) => <b>{a.name}</b> },
  { key: "winner", header: "Winner", render: (a) => a.winner?.name ?? UNAVAILABLE },
  { key: "party", header: "Party", render: (a) => a.winner?.party ?? UNAVAILABLE },
  { key: "votes", header: "Votes", align: "right", render: (a) => num(a.winner?.votes) },
  { key: "margin", header: "Margin", align: "right", render: (a) => num(a.margin) },
];

export default function AssemblyTable({ rows }) {
  return (
    <DataTable
      columns={columns}
      rows={rows}
      rowKey={(a) => `${a.number}-${a.year}`}
      ariaLabel="Assembly segment results"
      emptyMessage="No assembly results available."
    />
  );
}
