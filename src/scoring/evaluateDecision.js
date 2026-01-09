export function evaluateDecision({
  selectedOptions,
  scenario,
  startTime,
  endTime,
}) {
  const timeTaken = Math.floor((endTime - startTime) / 1000);
  const timeRatio = timeTaken / scenario.timeLimit;

  // --- TIME PRESSURE RESPONSE ---
  let timeResponse = "neutral";
  if (timeRatio < 0.4) timeResponse = "fast";
  else if (timeRatio > 0.85) timeResponse = "late";

  // --- RISK BIAS ---
  const totalRisk = scenario.options
    .filter((o) => selectedOptions.includes(o.id))
    .reduce((sum, o) => sum + o.risk, 0);

  let riskProfile = "balanced";
  if (totalRisk >= 6) riskProfile = "risk-heavy";
  else if (totalRisk <= 2) riskProfile = "risk-averse";

  return {
    timeTaken,
    timeResponse,
    riskProfile,
  };
}
