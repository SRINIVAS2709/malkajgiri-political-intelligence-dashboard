export default function QuickNav({ items, activePage, onNavigate }) {
  return (
    <div className="quick">
      {items.map(({ id, label, icon: Icon }) => (
        <button
          className={activePage === id ? "chosen" : ""}
          key={id}
          aria-current={activePage === id ? "page" : undefined}
          onClick={() => onNavigate(id)}
        >
          <Icon size={15} aria-hidden="true" />
          {label} ↗
        </button>
      ))}
    </div>
  );
}
