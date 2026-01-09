export default function Judgment({ result }) {
  if (!result) return null;

  const { timeResponse, riskProfile, timeTaken } = result;

  let title = "Constraint Optimizer";
  let description = [];

  if (riskProfile === "risk-heavy") {
    title = "Risk Carrier";
    description.push("You accept instability to preserve momentum.");
  }

  if (riskProfile === "risk-averse") {
    title = "Risk Minimizer";
    description.push("You trade growth for predictability.");
  }

  if (timeResponse === "fast") {
    description.push("You close decisions early, before full certainty.");
  }

  if (timeResponse === "late") {
    description.push("You delay commitment under pressure.");
  }

  if (description.length === 0) {
    description.push("You maintain balance under constraint.");
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

        <p className="text-xs text-muted">Time taken: {timeTaken}s</p>
      </div>
    </div>
  );
}
