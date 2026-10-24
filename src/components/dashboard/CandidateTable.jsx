import { DataTable } from "../common";
import { num, percent } from "../../utils/formatters.js";

const columns = [
  { key: "rank", header: "Rank", render: (_, i) => i + 1 },
  { key: "name", header: "Candidate", render: (c) => <b>{c.name}</b> },
  {
    key: "party",
    header: "Party",
    render: (c) => (
      <>
        <span className="party">{c.short}</span>
        <small>{c.party}</small>
      </>
    ),
  },
  { key: "votes", header: "Votes", align: "right", render: (c) => num(c.votes) },
  { key: "share", header: "Vote share", align: "right", render: (c) => percent(c.share) },
];

export default function CandidateTable({ candidates, year }) {
  return (
    <DataTable
      columns={columns}
      rows={candidates}
      rowKey={(c) => c.name}
      ariaLabel={`Candidate-wise results ${year}`}
      emptyMessage="No candidates match your search."
    />
  );
}
