export { num, percent } from "./formatters.js";

// Adds valid votes, vote shares, winner/runner-up, margin and turnout to a parliamentary result.
export function enrich(e) {
  // Valid votes exclude NOTA.
  const valid = e.votesPolled - (e.nota ?? 0);

  const candidates = [...(e.candidates ?? [])]
    .sort((a, b) => b.votes - a.votes)
    .map((x) => ({
      ...x,
      share: valid > 0 ? (100 * x.votes) / valid : null,
    }));

  const winner = candidates[0] || null;
  const runner = candidates[1] || null;

  return {
    ...e,
    valid,
    winner,
    runner,
    candidates,
    margin: winner && runner ? winner.votes - runner.votes : null,
    marginPct:
      valid > 0 && winner && runner
        ? (100 * (winner.votes - runner.votes)) / valid
        : null,
    // Falls back to the published turnout figure when electors are unknown.
    calculatedTurnout: e.electors > 0 ? (100 * e.votesPolled) / e.electors : e.turnout,
  };
}

// Adds the winning margin to an Assembly Constituency result.
export function assemblyMetrics(a) {
  return {
    ...a,
    margin: a.winner && a.runner ? a.winner.votes - a.runner.votes : null,
  };
}

// Value plotted on the trend chart for a given metric.
export function getTrendValue(election, metric) {
  if (metric === "margin") return election.marginPct;
  if (metric === "turnout") return election.calculatedTurnout;
  return election.winner?.share ?? null;
}

// Case-insensitive match on candidate name / party / short name.
export function filterCandidates(candidates, query) {
  const q = query.trim().toLowerCase();
  if (!q) return candidates;
  return candidates.filter((c) =>
    `${c.name ?? ""} ${c.party ?? ""} ${c.short ?? ""}`.toLowerCase().includes(q),
  );
}

// { BRS: 3, INC: 2, ... } counted over assemblies that have a winner.
export function countWinnersByParty(assemblies) {
  return assemblies.reduce((acc, a) => {
    const party = a.winner?.party;
    if (party) acc[party] = (acc[party] || 0) + 1;
    return acc;
  }, {});
}

export const hasResult = (a) => Boolean(a.winner && a.runner);
