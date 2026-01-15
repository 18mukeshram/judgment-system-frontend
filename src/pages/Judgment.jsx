import { useEffect } from "react";

export default function Judgment({ result }) {
  // ✅ Hooks must come first
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    const handler = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  let title = "Balanced Operator";
  let description = [];

  const riskHeavy =
    result?.filter((r) => r.riskProfile === "risk-heavy").length || 0;
  const riskAverse =
    result?.filter((r) => r.riskProfile === "risk-averse").length || 0;
  const fast = result?.filter((r) => r.timeResponse === "fast").length || 0;
  const late = result?.filter((r) => r.timeResponse === "late").length || 0;

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

  useEffect(() => {
    if (!result || result.length === 0) return;

    fetch("http://localhost:5000/api/judgment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        profile: title,
        signals: result,
      }),
    }).catch(() => {});
  }, [result, title]);

  // ✅ Early return AFTER hooks
  if (!result || result.length === 0) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-xl bg-surface border border-border p-10 space-y-6">
        <h2 className="text-xl font-semibold tracking-tight">
          Decision Profile: {title}
        </h2>

        {description.map((line, idx) => (
          <p key={idx} className="text-sm text-muted leading-relaxed">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
