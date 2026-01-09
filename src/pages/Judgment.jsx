export default function Judgment({ result }) {
  if (!result || result.length === 0) return null;

  const riskHeavy = result.filter((r) => r.riskProfile === "risk-heavy").length;
  const riskAverse = result.filter(
    (r) => r.riskProfile === "risk-averse"
  ).length;
  const fast = result.filter((r) => r.timeResponse === "fast").length;
  const late = result.filter((r) => r.timeResponse === "late").length;

  let title = "Balanced Operator";
  let description = [];

  if (riskHeavy > riskAverse) {
    title = "Risk Carrier";
    description.push("You consistently accept instability for momentum.");
  }

  if (riskAverse > riskHeavy) {
    title = "Risk Minimizer";
    description.push("You prioritize predictability over upside.");
  }

  if (fast > late) {
    description.push("You close decisions early under pressure.");
  }

  if (late > fast) {
    description.push("You delay commitment when constrained.");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-xl space-y-6 text-center">
        <h2 className="text-2xl font-semibold">Decision Profile: {title}</h2>

        {description.map((line, idx) => (
          <p key={idx} className="text-sm text-muted">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
