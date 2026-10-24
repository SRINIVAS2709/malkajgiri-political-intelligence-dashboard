import { useEffect, useRef, useState } from "react";
import { StatusMessage } from "./components/common";
import { Footer, Hero, QuickNav, Sidebar, Topbar } from "./components/layout";
import { ConstituencySnapshot } from "./components/dashboard";
import { NAV_ITEMS, QUICK_NAV_ITEMS } from "./constants/navigation.js";
import {
  DashboardProvider,
  useDashboard,
} from "./context/DashboardContext.jsx";
import { useDataset } from "./hooks/useDataset.js";
import { PAGES } from "./pages";
import { downloadCsv, electionToCsvRows } from "./utils/csv.js";

function Dashboard() {
  const { data, page, setPage, latest, selected } = useDashboard();
  const [menuOpen, setMenuOpen] = useState(false);
  const Page = PAGES[page] ?? PAGES.overview;
  const pageRef = useRef(null);
  const lastNav = useRef({ page, navTick: 0 });
  const [navTick, setNavTick] = useState(0);
  const { constituency, number, state } = data.metadata;

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    const last = lastNav.current;
    lastNav.current = { page, navTick };
    if (last.page === page && last.navTick === navTick) return;
    const el = pageRef.current;
    if (!el) return;
    const frame = requestAnimationFrame(() => {
      const topbar = document.querySelector(".topbar");
      const offset = (topbar?.offsetHeight ?? 0) + 12;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      const reduceMotion = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      window.scrollTo({
        top: Math.max(0, top),
        behavior: reduceMotion ? "auto" : "smooth",
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [page, navTick]);

  const navigate = (id) => {
    setPage(id);
    setMenuOpen(false);
    setNavTick((t) => t + 1);
  };

  const exportCsv = () =>
    downloadCsv(
      `${constituency.toLowerCase()}-${selected.year}.csv`,
      electionToCsvRows(selected),
    );

  return (
    <div className="shell">
      <Sidebar
        items={NAV_ITEMS}
        activePage={page}
        open={menuOpen}
        onNavigate={navigate}
      />
      {menuOpen && (
        <button
          className="scrim"
          onClick={() => setMenuOpen(false)}
          aria-label="Close navigation"
        />
      )}
      <main className="main">
        <Topbar
          constituency={constituency}
          state={state}
          menuOpen={menuOpen}
          onToggleMenu={() => setMenuOpen((o) => !o)}
          onExport={exportCsv}
          canExport={Boolean(selected)}
        />
        <div className="content">
          <Hero constituency={constituency} number={number} state={state} />
          <ConstituencySnapshot latest={latest} />
          <QuickNav
            items={QUICK_NAV_ITEMS}
            activePage={page}
            onNavigate={navigate}
          />
          <div ref={pageRef}>
            <Page />
          </div>
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default function App() {
  const { data, error, loading, retry } = useDataset();

  if (error) {
    return (
      <StatusMessage
        variant="error"
        title="Could not load dataset"
        message={error}
        onRetry={retry}
      />
    );
  }
  if (loading || !data) return <StatusMessage variant="loading" />;

  return (
    <DashboardProvider data={data}>
      <Dashboard />
    </DashboardProvider>
  );
}
