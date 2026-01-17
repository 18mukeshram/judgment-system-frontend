import { useEffect, useState, useCallback } from "react";
import { SCENARIOS } from "../scenarios/scenarios";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Timer from "../components/ui/Timer";
import SystemMarker from "../components/ui/SystemMarker";
import { useDecisionStore } from "../store/decisionStore";
import { evaluateDecision } from "../scoring/evaluateDecision";

export default function Scenario({ onComplete }) {
  const {
    scenarioIndex,
    selectedOptions,
    locked,
    startTime,
    startScenario,
    setSelected,
    lockDecision,
  } = useDecisionStore();

  const scenario = SCENARIOS[scenarioIndex];
  const [timeLeft, setTimeLeft] = useState(scenario.timeLimit);
  const [initialized, setInitialized] = useState(false);

  // Generate stable ID on mount
  const [scenarioSessionId] = useState(() => Date.now().toString().slice(-6));

  // Memoized values
  const sequenceNumber = String(scenarioIndex + 1).padStart(2, "0");
  const totalScenarios = String(SCENARIOS.length).padStart(2, "0");
  const canSubmit = selectedOptions.length > 0 && !locked;

  // Define handleSubmit before useEffect that uses it
  const handleSubmit = useCallback(() => {
    lockDecision();
    const result = evaluateDecision({
      selectedOptions,
      scenario,
      startTime,
      endTime: Date.now(),
    });
    onComplete(result, scenarioIndex + 1 >= SCENARIOS.length);
  }, [
    lockDecision,
    selectedOptions,
    scenario,
    startTime,
    onComplete,
    scenarioIndex,
  ]);

  // Entrance animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setInitialized(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Warn on page leave
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  // Start scenario
  useEffect(() => {
    startScenario();
  }, [startScenario]);

  // Countdown
  useEffect(() => {
    if (locked || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft, locked]);

  // Auto-submit
  useEffect(() => {
    if (!locked && timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft, locked, handleSubmit]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-4xl">
        {/* System Header Bar */}
        <div
          className={`
          flex items-center justify-between mb-6 pb-4 border-b border-border
          ${initialized ? "animate-fade-in" : "opacity-0"}
        `}
        >
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <span
                className={`status-dot ${locked ? "inactive" : "active"}`}
              />
              <span className="text-system">
                {locked ? "Decision Locked" : "Recording Active"}
              </span>
            </div>
            <SystemMarker
              label="SCENARIO"
              value={`${sequenceNumber}/${totalScenarios}`}
              variant="active"
            />
          </div>
          <Timer value={timeLeft} total={scenario.timeLimit} />
        </div>

        {/* Main Panel */}
        <div
          className={`
          panel p-8
          ${initialized ? "animate-slide-up delay-100" : "opacity-0"}
        `}
        >
          {/* Panel Header */}
          <div className="panel-header">
            <h2 className="font-mono text-sm font-medium tracking-wider text-signal uppercase">
              {scenario.title}
            </h2>
          </div>

          {/* Scenario ID */}
          <div
            className={`
            inline-flex items-center gap-2 mb-6 px-3 py-1.5 
            bg-surfaceAlt border border-border
            ${initialized ? "animate-fade-in delay-200" : "opacity-0"}
          `}
          >
            <span className="font-mono text-xs tracking-widest text-muted">
              ID: SCN-{scenario.id || sequenceNumber}-{scenarioSessionId}
            </span>
          </div>

          {/* Description */}
          <p
            className={`
            text-sm text-muted leading-relaxed max-w-2xl mb-8
            ${initialized ? "animate-fade-in delay-300" : "opacity-0"}
          `}
          >
            {scenario.description}
          </p>

          {/* Divider */}
          <div
            className={`
            divider mb-8
            ${initialized ? "animate-reveal-line delay-400" : "w-0"}
          `}
          />

          {/* Options Label */}
          <div
            className={`
            flex items-center gap-3 mb-4
            ${initialized ? "animate-fade-in delay-400" : "opacity-0"}
          `}
          >
            <span className="text-system">Available Options</span>
            <span className="text-system opacity-40">
              Select to confirm choice
            </span>
          </div>

          {/* Option Cards */}
          <div
            className={`
            grid grid-cols-1 md:grid-cols-2 gap-4 mb-8
            ${initialized ? "animate-fade-in delay-500" : "opacity-0"}
          `}
          >
            {scenario.options.map((opt, idx) => (
              <Card
                key={opt.id}
                selected={selectedOptions.includes(opt.id)}
                disabled={locked}
              >
                <button
                  className="w-full text-left"
                  onClick={() => setSelected(opt.id)}
                  disabled={locked}
                >
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs text-muted mt-0.5">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    <span className="text-sm leading-relaxed">{opt.label}</span>
                  </div>
                </button>
              </Card>
            ))}
          </div>

          {/* Submit Area */}
          <div
            className={`
            flex items-center justify-between pt-6 border-t border-border
            ${initialized ? "animate-fade-in delay-600" : "opacity-0"}
          `}
          >
            <div className="flex items-center gap-4">
              {selectedOptions.length > 0 ? (
                <>
                  <span className="status-dot active" />
                  <span className="text-system text-signal">
                    Selection Confirmed
                  </span>
                </>
              ) : (
                <>
                  <span className="status-dot inactive" />
                  <span className="text-system text-muted">
                    Awaiting Selection
                  </span>
                </>
              )}
            </div>

            <Button
              label={locked ? "Processing..." : "Submit Decision"}
              disabled={!canSubmit}
              onClick={handleSubmit}
              variant={canSubmit ? "primary" : "default"}
            />
          </div>
        </div>

        {/* Footer */}
        <div
          className={`
          mt-6 flex items-center justify-between text-system opacity-40
          ${initialized ? "animate-fade-in delay-600" : "opacity-0"}
        `}
        >
          <span>All responses are final</span>
          <span>Session Active</span>
        </div>
      </div>
    </div>
  );
}
