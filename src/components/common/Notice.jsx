import { Info } from "lucide-react";

export default function Notice({ children }) {
  return (
    <div className="notice" role="note">
      <Info size={16} aria-hidden="true" />
      <p>{children}</p>
    </div>
  );
}
