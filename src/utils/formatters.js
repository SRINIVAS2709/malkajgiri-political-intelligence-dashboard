import { UNAVAILABLE } from "../constants/dashboard.js";

const indianNumber = new Intl.NumberFormat("en-IN");
const compactNumber = new Intl.NumberFormat("en", { notation: "compact" });

// 1234567 -> "12,34,567"; non-numbers -> "Unavailable".
export const num = (n) => (Number.isFinite(n) ? indianNumber.format(n) : UNAVAILABLE);

// 45.678 -> "45.68%"; non-numbers -> "Unavailable".
export const percent = (n) => (Number.isFinite(n) ? `${n.toFixed(2)}%` : UNAVAILABLE);

// 1200000 -> "1.2M" (chart axis ticks).
export const compact = (n) => compactNumber.format(n);

// "Eatala Rajender" -> "ER"
export const getInitials = (name = "") =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

export const truncate = (text = "", max = 23) =>
  text.length > max ? `${text.slice(0, max - 2)}…` : text;
