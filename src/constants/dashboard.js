// Metric options for the Electoral Trends page.
export const TREND_METRICS = [
  { value: "share", label: "Winner vote share" },
  { value: "margin", label: "Winning margin (%)" },
  { value: "turnout", label: "Voter turnout (%)" },
];

export const ASSEMBLY_YEAR_OPTIONS = [
  { value: 2023, label: "2023 Assembly" },
  { value: 2018, label: "2018 · unavailable", disabled: true },
];

export const DEFAULT_ASSEMBLY = 44;
export const DEFAULT_ASSEMBLY_YEAR = 2023;

// Parties shown in the party-performance table.
export const TRACKED_PARTIES = ["BJP", "INC", "TRS", "BRS", "TDP"];

export const UNAVAILABLE = "Unavailable";
