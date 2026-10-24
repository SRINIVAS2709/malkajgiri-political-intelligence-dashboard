import { useCallback, useEffect, useState } from "react";
import { loadData } from "../services/dataService.js";

// Fetches the dataset; exposes loading / error state and a retry function.
export function useDataset() {
  const [state, setState] = useState({ data: null, error: "", loading: true });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState({ data: null, error: "", loading: true });
    loadData(controller.signal)
      .then((data) => setState({ data, error: "", loading: false }))
      .catch((e) => {
        if (e.name === "AbortError") return;
        setState({ data: null, error: e.message, loading: false });
      });
    return () => controller.abort();
  }, [attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  return { ...state, retry };
}
