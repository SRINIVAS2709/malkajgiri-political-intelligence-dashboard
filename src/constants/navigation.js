import { Activity, Building2, Globe2, Landmark, ShieldCheck } from "lucide-react";

export const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: Globe2 },
  { id: "parliament", label: "Parliamentary elections", icon: Landmark },
  { id: "assembly", label: "Assembly explorer", icon: Building2 },
  { id: "trends", label: "Electoral trends", icon: Activity },
  { id: "sources", label: "Sources", icon: ShieldCheck },
];

export const QUICK_NAV_ITEMS = NAV_ITEMS.slice(0, 4);
