import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent, within } from "@testing-library/react";
import App from "./App.jsx";
import { enrich, assemblyMetrics, filterCandidates, countWinnersByParty } from "./utils/analytics.js";
import { num, percent, getInitials } from "./utils/formatters.js";
import { toCsv } from "./utils/csv.js";
import { validateDataset } from "./services/dataService.js";
import ProgressBar from "./components/common/ProgressBar.jsx";
import DataTable from "./components/common/DataTable.jsx";
import StatusMessage from "./components/common/StatusMessage.jsx";

// Mock Recharts ResponsiveContainer to prevent width/height 0px warnings in jsdom
vi.mock("recharts", async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    ResponsiveContainer: ({ children }) => (
      <div style={{ width: 800, height: 600 }}>{children}</div>
    ),
  };
});


describe("calculation utilities", () => {
  it("calculates share and margin using valid votes", () => {
    const r = enrich({
      year: 2024,
      electors: 200,
      votesPolled: 170,
      nota: 10,
      candidates: [
        { name: "A", votes: 100 },
        { name: "B", votes: 60 },
      ],
    });
    expect(r.valid).toBe(160);
    expect(r.margin).toBe(40);
    expect(r.winner.share).toBe(62.5);
    expect(r.marginPct).toBe(25);
  });
  it("handles missing assembly values", () =>
    expect(assemblyMetrics({ winner: null, runner: null }).margin).toBeNull());
  it("handles an election with no candidates", () => {
    const r = enrich({ year: 2024, votesPolled: 10, nota: 0, candidates: [] });
    expect(r.winner).toBeNull();
    expect(r.margin).toBeNull();
  });
  it("filters candidates and counts winners safely", () => {
    const c = [{ name: "Alice", party: "X Party", short: "XP" }, { name: "Bob" }];
    expect(filterCandidates(c, "xp")).toHaveLength(1);
    expect(filterCandidates(c, "")).toHaveLength(2);
    expect(countWinnersByParty([{ winner: { party: "A" } }, { winner: null }])).toEqual({ A: 1 });
  });
});

describe("formatters and csv", () => {
  it("formats numbers, percentages and initials", () => {
    expect(num(1234567)).toBe("12,34,567");
    expect(num(null)).toBe("Unavailable");
    expect(percent(45.678)).toBe("45.68%");
    expect(getInitials("Eatala Rajender")).toBe("ER");
  });
  it("escapes quotes in CSV cells", () => {
    expect(toCsv([['a"b', 1]])).toBe('"a""b","1"');
  });
});

describe("dataset validation", () => {
  it("rejects malformed data", () => {
    expect(() => validateDataset({})).toThrow("Unexpected dataset format");
  });
});

describe("reusable components", () => {
  it("ProgressBar clamps and exposes progressbar semantics", () => {
    render(<ProgressBar value={150} max={100} label="Test" />);
    const bar = screen.getByRole("progressbar", { name: "Test" });
    expect(bar.firstChild.style.width).toBe("100%");
  });
  it("DataTable shows empty message", () => {
    render(<DataTable columns={[{ key: "a", header: "A" }]} rows={[]} rowKey={(r) => r.a} emptyMessage="Nothing here" />);
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });
  it("StatusMessage error exposes retry", () => {
    const retry = vi.fn();
    render(<StatusMessage variant="error" title="Oops" message="Bad" onRetry={retry} />);
    fireEvent.click(screen.getByRole("button", { name: "Retry" }));
    expect(retry).toHaveBeenCalled();
  });
});

const dataset = {
  metadata: { constituency: "Testville", number: 7, state: "Telangana", sources: [], notes: [] },
  overview: {
    coverage: "Coverage text",
    segments: [{ number: 44, name: "Seg A" }],
    demographics: { year: 2011, population: 1000, urban: 50, rural: 50, sc: 5, st: 2, literacy: 70 },
  },
  parliamentary: [
    { year: 2019, electors: 100, votesPolled: 60, nota: 0, turnout: 60, candidates: [{ name: "Old Winner", party: "Party A", short: "A", votes: 40 }, { name: "Old Second", party: "Party B", short: "B", votes: 20 }] },
    { year: 2024, electors: 100, votesPolled: 70, nota: 0, turnout: 70, candidates: [{ name: "New Winner", party: "Party A", short: "A", votes: 50 }, { name: "New Second", party: "Party B", short: "B", votes: 20 }] },
  ],
  assembly: [{ year: 2023, number: 44, name: "Seg A", electors: null, winner: { name: "AC Winner", party: "A", votes: 30 }, runner: { name: "AC Second", party: "B", votes: 10 } }],
};

describe("App", () => {
  beforeEach(() => {
    global.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
  });

  it("navigates and updates the filtered views", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => dataset }));
    render(<App />);
    await screen.findByText("Constituency snapshot");

    fireEvent.click(screen.getAllByRole("button", { name: /Parliamentary elections/ })[0]);
    expect(await screen.findByText(/Candidate-wise results · 2024/)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Election year"), { target: { value: "2019" } });
    await waitFor(() => expect(screen.getByText(/Candidate-wise results · 2019/)).toBeInTheDocument());

    fireEvent.change(screen.getByLabelText("Search candidates"), { target: { value: "zzz" } });
    expect(screen.getByText("No candidates match your search.")).toBeInTheDocument();
  });

});
