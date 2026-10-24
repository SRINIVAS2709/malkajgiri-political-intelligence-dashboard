import { Activity } from "lucide-react";

export default function Sidebar({ items, activePage, open, onNavigate }) {
  return (
    <aside id="sidebar" className={`sidebar ${open ? "open" : ""}`} aria-label="Primary navigation">
      <div className="brand">
        <div className="brand-icon">
          <Activity aria-hidden="true" />
        </div>
        <div>
          <b>Corporate Chanakya</b>
          <small>POLITICAL INTELLIGENCE</small>
        </div>
      </div>
      <div className="nav-caption">WORKSPACE</div>
      {items.map(({ id, label, icon: Icon }) => (
        <button
          className={"nav " + (activePage === id ? "active" : "")}
          key={id}
          aria-current={activePage === id ? "page" : undefined}
          onClick={() => onNavigate(id)}
        >
          <Icon size={18} aria-hidden="true" />
          <span>{label}</span>
        </button>
      ))}
      <div className="side-bottom">
        <span className="dot" /> Static source snapshot <small>2011–2024 reference years</small>
      </div>
    </aside>
  );
}
