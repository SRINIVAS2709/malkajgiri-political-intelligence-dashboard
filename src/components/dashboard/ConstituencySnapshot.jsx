import { BarChart3, Landmark, Users, Vote } from "lucide-react";
import { KpiCard } from "../common";
import { num, percent } from "../../utils/formatters.js";
import { UNAVAILABLE } from "../../constants/dashboard.js";

// "At a glance" header + the four headline KPIs for the latest election.
export default function ConstituencySnapshot({ latest }) {
  const winner = latest.winner;
  return (
    <>
      <div className="title-row">
        <div>
          <span className="eyebrow">AT A GLANCE</span>
          <h2>Constituency snapshot</h2>
        </div>
        <span className="year-tag">● Reference year {latest.year}</span>
      </div>
      <div className="kpis">
        <KpiCard
          icon={Users}
          label="Registered electors"
          value={num(latest.electors)}
          note={`Lok Sabha · ${latest.year}`}
        />
        <KpiCard
          icon={Vote}
          label="Votes polled"
          value={num(latest.votesPolled)}
          note={`Turnout ${percent(latest.calculatedTurnout)}`}
          tone="blue"
        />
        <KpiCard
          icon={Landmark}
          label="Winning candidate"
          value={winner?.name ?? UNAVAILABLE}
          note={`${winner?.party ?? UNAVAILABLE} · ${latest.year}`}
          tone="green"
        />
        <KpiCard
          icon={BarChart3}
          label="Winning margin"
          value={num(latest.margin)}
          note={`Margin ${percent(latest.marginPct)} of valid votes`}
          tone="orange"
        />
      </div>
    </>
  );
}
