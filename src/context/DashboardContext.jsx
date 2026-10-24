import { createContext, useContext, useMemo, useReducer } from "react";
import {
  DEFAULT_ASSEMBLY,
  DEFAULT_ASSEMBLY_YEAR,
} from "../constants/dashboard.js";
import { assemblyMetrics, enrich } from "../utils/analytics.js";

const DashboardContext = createContext(null);

// UI state: current page + every filter / selection
const initialState = {
  page: "overview",
  year: null, // null = latest election in the dataset
  ac: DEFAULT_ASSEMBLY,
  acYear: DEFAULT_ASSEMBLY_YEAR,
  metric: "share",
  search: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "page":
      return { ...state, page: action.value };
    case "year":
      return { ...state, year: Number(action.value) };
    case "ac":
      return { ...state, ac: Number(action.value) };
    case "acYear":
      return { ...state, acYear: Number(action.value) };
    case "metric":
      return { ...state, metric: action.value };
    case "search":
      return { ...state, search: action.value };
    case "openAssembly": // jump from the overview list to the explorer
      return { ...state, ac: Number(action.value), page: "assembly" };
    default:
      return state;
  }
}

// Holds the dataset + filters and exposes data derived from them.
export function DashboardProvider({ data, children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const elections = useMemo(() => data.parliamentary.map(enrich), [data]);
  const assemblies = useMemo(() => data.assembly.map(assemblyMetrics), [data]);

  const latest = elections.at(-1);
  const selected = useMemo(
    () => elections.find((e) => e.year === state.year) ?? latest,
    [elections, state.year, latest],
  );
  const selectedAc = useMemo(
    () => assemblies.find((a) => a.number === state.ac && a.year === state.acYear),
    [assemblies, state.ac, state.acYear],
  );

  const actions = useMemo(
    () => ({
      setPage: (value) => dispatch({ type: "page", value }),
      setYear: (value) => dispatch({ type: "year", value }),
      setAc: (value) => dispatch({ type: "ac", value }),
      setAcYear: (value) => dispatch({ type: "acYear", value }),
      setMetric: (value) => dispatch({ type: "metric", value }),
      setSearch: (value) => dispatch({ type: "search", value }),
      openAssembly: (value) => dispatch({ type: "openAssembly", value }),
    }),
    [],
  );

  const value = useMemo(
    () => ({
      data,
      ...state,
      ...actions,
      elections,
      assemblies,
      latest,
      selected,
      selectedAc,
    }),
    [data, state, actions, elections, assemblies, latest, selected, selectedAc],
  );

  return (
    <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used inside <DashboardProvider>");
  return ctx;
}
