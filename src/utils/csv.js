const escapeCell = (x) => `"${String(x ?? "").replaceAll('"', '""')}"`;

export const toCsv = (rows) =>
  rows.map((r) => r.map(escapeCell).join(",")).join("\r\n");

export function downloadCsv(filename, rows) {
  const blob = new Blob([toCsv(rows)], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function electionToCsvRows(election) {
  return [
    ["Year", "Candidate", "Party", "Votes", "Vote share (%)"],
    ...election.candidates.map((c) => [
      election.year,
      c.name,
      c.party,
      c.votes,
      c.share?.toFixed(2) ?? "",
    ]),
  ];
}
