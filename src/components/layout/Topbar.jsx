import { Download, Menu } from "lucide-react";

export default function Topbar({ constituency, state, menuOpen, onToggleMenu, onExport, canExport }) {
  return (
    <header className="topbar">
      <button
        className="menu"
        onClick={onToggleMenu}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
        aria-controls="sidebar"
      >
        <Menu aria-hidden="true" />
      </button>
      <div className="crumb">
        India <i>/</i> {state} <i>/</i> <b>{constituency}</b>
      </div>
      <div className="actions">
        <span className="snapshot">● DATA SNAPSHOT</span>
        <button className="export" onClick={onExport} disabled={!canExport}>
          <Download size={15} aria-hidden="true" /> Export CSV
        </button>
      </div>
    </header>
  );
}
