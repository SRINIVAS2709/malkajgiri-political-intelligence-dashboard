import { CalendarDays, Landmark, MapPinned } from "lucide-react";

export default function Hero({ constituency, number, state }) {
  return (
    <section className="hero">
      <div>
        <div className="eyebrow light">CONSTITUENCY INTELLIGENCE · REFERENCE 2024</div>
        <h1>
          {constituency} <em>Political Intelligence</em>
        </h1>
        <p>
          Election outcomes, Assembly-level performance, and electoral patterns for Parliamentary
          Constituency {number}, {state}.
        </p>
        <div className="hero-meta">
          <span>
            <MapPinned size={14} aria-hidden="true" /> {state}, India
          </span>
          <span>
            <Landmark size={14} aria-hidden="true" /> Parliamentary seat · General
          </span>
          <span>
            <CalendarDays size={14} aria-hidden="true" /> 2014—2024
          </span>
        </div>
      </div>
      <div className="seal" aria-hidden="true">
        <Landmark size={27} />
        <b>PC {String(number).padStart(2, "0")}</b>
        <small>{constituency.toUpperCase()}</small>
      </div>
    </section>
  );
}
