import { useEffect, useState, useMemo } from "react";
import SystemMarker from "../components/ui/SystemMarker";

export default function Judgment({ result }) {
  const [initialized, setInitialized] = useState(false);
  const [revealed, setRevealed] = useState(false);

  // Generate stable IDs on mount
  const [recordId] = useState(() => `JDG-${Date.now().toString().slice(-8)}`);
  const [timestamp] = useState(() => new Date().toISOString());

  // Lock back navigation
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const handler = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  // Entrance animation
  useEffect(() => {
    const timer1 = setTimeout(() => setInitialized(true), 100);
    const timer2 = setTimeout(() => setRevealed(true), 1200);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Calculate profile using useMemo for stability
  const {
    title,
    description,
    classification,
    riskHeavy,
    riskAverse,
    fast,
    late,
  } = useMemo(() => {
    let computedTitle = "Balanced Operator";
    let computedDescription = [];
    let computedClassification = "STANDARD";

    const riskHeavyCount =
      result?.filter((r) => r.riskProfile === "risk-heavy").length || 0;
    const riskAverseCount =
      result?.filter((r) => r.riskProfile === "risk-averse").length || 0;
    const fastCount =
      result?.filter((r) => r.timeResponse === "fast").length || 0;
    const lateCount =
      result?.filter((r) => r.timeResponse === "late").length || 0;

    if (riskHeavyCount > riskAverseCount) {
      computedTitle = "Risk Carrier";
      computedClassification = "ELEVATED";
      computedDescription.push(
        "You consistently accept instability for momentum."
      );
    }

    if (riskAverseCount > riskHeavyCount) {
      computedTitle = "Risk Minimizer";
      computedClassification = "CONSERVATIVE";
      computedDescription.push("You prioritize predictability over upside.");
    }

    if (fastCount > lateCount) {
      computedDescription.push("You close decisions early under pressure.");
    }

    if (lateCount > fastCount) {
      computedDescription.push("You delay commitment when constrained.");
    }

    return {
      title: computedTitle,
      description: computedDescription,
      classification: computedClassification,
      riskHeavy: riskHeavyCount,
      riskAverse: riskAverseCount,
      fast: fastCount,
      late: lateCount,
    };
  }, [result]);

  // Send to backend
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

  if (!result || result.length === 0) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl">
        {/* System Header */}
        <div
          className={`
          flex items-center justify-between mb-8 pb-4 border-b border-border
          ${initialized ? "animate-fade-in" : "opacity-0"}
        `}
        >
          <div className="flex items-center gap-4">
            <span className="status-dot inactive" />
            <span className="text-system">Evaluation Complete</span>
          </div>
          <SystemMarker label="RECORD" value={recordId} />
        </div>

        {/* Processing State */}
        {!revealed && (
          <div
            className={`
            panel p-10 text-center
            ${initialized ? "animate-slide-up delay-200" : "opacity-0"}
          `}
          >
            <div className="flex flex-col items-center gap-6">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 border border-signal/30 animate-ping rounded-sm" />
                <div className="absolute inset-2 border border-signal animate-pulse rounded-sm" />
              </div>
              <div>
                <p className="font-mono text-sm text-muted tracking-wider uppercase">
                  Generating Judgment Profile
                </p>
                <p className="text-system opacity-50 mt-2">
                  Analyzing decision patterns...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Judgment Panel */}
        {revealed && (
          <div className="animate-fade-in">
            {/* Main Panel */}
            <div className="panel p-10">
              {/* Classification Banner */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
                <div className="flex items-center gap-4">
                  <div className="w-1 h-12 bg-signal" />
                  <div>
                    <p className="text-system text-signal mb-1">
                      Classification
                    </p>
                    <p className="font-mono text-2xl font-semibold tracking-wide text-fg">
                      {title}
                    </p>
                  </div>
                </div>
                <div
                  className={`
                  px-4 py-2 border
                  ${
                    classification === "ELEVATED"
                      ? "border-signal/50 text-signal bg-signal/10"
                      : classification === "CONSERVATIVE"
                      ? "border-muted/50 text-muted bg-muted/10"
                      : "border-border text-muted"
                  }
                `}
                >
                  <span className="font-mono text-xs tracking-widest">
                    {classification}
                  </span>
                </div>
              </div>

              {/* Analysis Lines */}
              <div className="space-y-4 mb-8">
                <p className="text-system opacity-50">Behavioral Analysis</p>
                {description.map((line, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 bg-surfaceAlt border-l-2 border-signal/30"
                  >
                    <span className="font-mono text-xs text-signal mt-0.5">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm text-muted leading-relaxed">{line}</p>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="divider mb-8" />

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <span className="text-system opacity-50">
                    Scenarios Evaluated
                  </span>
                  <p className="font-mono text-lg text-fg">
                    {String(result.length).padStart(2, "0")}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-system opacity-50">Risk Profile</span>
                  <p className="font-mono text-lg text-fg">
                    {riskHeavy > riskAverse
                      ? "Aggressive"
                      : riskAverse > riskHeavy
                      ? "Conservative"
                      : "Neutral"}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-system opacity-50">
                    Response Pattern
                  </span>
                  <p className="font-mono text-lg text-fg">
                    {fast > late
                      ? "Fast Closure"
                      : late > fast
                      ? "Delayed Closure"
                      : "Balanced"}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-system opacity-50">Generated</span>
                  <p className="font-mono text-xs text-muted mt-1">
                    {timestamp}
                  </p>
                </div>
              </div>
            </div>

            {/* Sealed Notice */}
            <div className="mt-6 p-4 border border-border bg-surface/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-critical/50" />
                <span className="text-system text-muted">
                  This judgment is final and cannot be modified
                </span>
              </div>
              <span className="text-system opacity-40">Session Locked</span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div
          className={`
          mt-6 flex items-center justify-between text-system opacity-40
          ${initialized ? "animate-fade-in delay-300" : "opacity-0"}
        `}
        >
          <span>DES.V1.0</span>
          <span>Record Sealed</span>
        </div>
      </div>
    </div>
  );
}
