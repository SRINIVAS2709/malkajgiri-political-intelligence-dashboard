import { COLORS } from "../../constants/theme.js";

export default function CardHeader({ tag, title, icon: Icon }) {
  return (
    <div className="card-head">
      <div>
        <span className="eyebrow">{tag}</span>
        <h3>{title}</h3>
      </div>
      {Icon && <Icon size={18} color={COLORS.primary} aria-hidden="true" />}
    </div>
  );
}
