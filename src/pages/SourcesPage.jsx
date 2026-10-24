import { Card, CardHeader, Notice, SectionHeader } from "../components/common";
import { FormulaRow, SourceRow } from "../components/dashboard";
import { useDashboard } from "../context/DashboardContext.jsx";

const FORMULAS = [
  ["Vote share (%)", "Candidate votes ÷ total valid votes × 100"],
  ["Valid votes", "Total votes polled − NOTA votes"],
  ["Winning margin", "Winner votes − runner-up votes"],
  ["Winning margin (%)", "Margin ÷ total valid votes × 100"],
  ["Voter turnout (%)", "Total votes polled ÷ registered electors × 100"],
  ["Party performance", "Compare included party vote shares across years"],
];

const CENSUS_URL = "https://censusindia.mha.gov.in/census.website/en/data/population-finder";

export default function SourcesPage() {
  const { data } = useDashboard();
  const { sources = [], notes = [] } = data.metadata;

  return (
    <>
      <SectionHeader
        tag="DATA GOVERNANCE"
        title="Sources"
      />
      <Card className="table-card">
        <CardHeader tag="SOURCE REGISTER" title="References used" />
        {sources.map((s, i) => (
          <SourceRow key={s.url} index={i} label={s.label} type={s.type} url={s.url} />
        ))}
      </Card>
    </>
  );
}
